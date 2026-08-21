import BotaoDeAcao from "@/app/components/BotaoDeLink";
import { listarEstoque, EstoqueItem } from "@/app/services/estoque.services";

function formatarData(data: Date | string | null | undefined): string {
  if (!data) return "—";

  const date = new Date(data);
  if (isNaN(date.getTime())) return "Data inválida";

  return date.toLocaleDateString("pt-BR");
}

function numeroSeguro(valor: number | null | undefined): number {
  if (typeof valor !== "number" || isNaN(valor)) return 0;
  return valor;
}

export default async function EstoquePage() {
  let itens: EstoqueItem[] = [];
  let erro = false;

  try {
    itens = await listarEstoque();
  } catch (e) {
    console.error("Erro ao buscar estoque:", e);
    erro = true;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Entradas</h1>
          <h3 className="text-xl font-light">Controle de estoque</h3>
        </div>

        <BotaoDeAcao
          textoBotao="Adicionar produto à dispensa"
          linkBotao="/admin/estoque/new"
        />
      </div>

      {erro && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          Erro ao carregar os dados do estoque.
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-100 rounded-lg">
          <thead className="bg-blue-800 text-white text-left">
            <tr>
              <th className="p-3">Produto</th>
              <th className="p-3">Unidade</th>
              <th className="p-3">Preço</th>
              <th className="p-3">Qtd. adquirida</th>
              <th className="p-3">Data</th>
              <th className="p-3">Saídas</th>
              <th className="p-3">Restante</th>
            </tr>
          </thead>

          <tbody>
            {!erro && itens.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  Nenhum item cadastrado
                </td>
              </tr>
            )}

            {!erro &&
              itens.map((item) => {
                const adquirida = numeroSeguro(item.quantidadeAdquirida);
                const saidas = numeroSeguro(item.quantidadeSaidas);
                const restante =
                  numeroSeguro(item.quantidadeRestante);

                return (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{item.produto || "—"}</td>
                    <td className="p-3">{item.unidadeMedida || "—"}</td>
                    <td className="p-3">
                      {item.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="p-3">{adquirida}</td>
                    <td className="p-3">
                      {formatarData(item.dataAquisicao)}
                    </td>
                    <td className="p-3">{saidas}</td>
                    <td className="p-3 font-semibold">
                      {restante}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}