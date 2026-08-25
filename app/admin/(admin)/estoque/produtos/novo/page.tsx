"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { criarProduto } from "@/app/actions/estoque/produtos.actions";

export default function NovoProdutoPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [unidadeMedida, setUnidadeMedida] = useState("kg");
  const [estoqueMinimo, setEstoqueMinimo] = useState("0");

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");
    setSalvando(true);

    try {
      const resultado = await criarProduto({
        nome,
        categoria,
        unidadeMedida,
        estoqueMinimo: Number(estoqueMinimo),
      });

      if (!resultado.success) {
        setErro(resultado.error ?? "");
        return;
      }

      router.push("/admin/estoque/produtos");
    } catch {
      setErro("Não foi possível cadastrar o produto.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          href="/admin/estoque/produtos"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Voltar para produtos
        </Link>

        <h1 className="mt-4 text-3xl font-bold">
          Novo produto
        </h1>

        <p className="mt-1 text-muted-foreground">
          Cadastre um produto utilizado pela cantina.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border bg-card p-6"
      >
        <div className="space-y-2">
          <label
            htmlFor="nome"
            className="text-sm font-medium"
          >
            Nome do produto
          </label>

          <input
            id="nome"
            value={nome}
            onChange={(event) =>
              setNome(event.target.value)
            }
            placeholder="Ex.: Arroz"
            required
            className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="categoria"
            className="text-sm font-medium"
          >
            Categoria
          </label>

          <input
            id="categoria"
            value={categoria}
            onChange={(event) =>
              setCategoria(event.target.value)
            }
            placeholder="Ex.: Grãos"
            required
            className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="unidade"
            className="text-sm font-medium"
          >
            Unidade de medida
          </label>

          <select
            id="unidade"
            value={unidadeMedida}
            onChange={(event) =>
              setUnidadeMedida(event.target.value)
            }
            className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="kg">Quilograma (kg)</option>
            <option value="g">Grama (g)</option>
            <option value="L">Litro (L)</option>
            <option value="ml">Mililitro (ml)</option>
            <option value="unidade">Unidade</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="estoqueMinimo"
            className="text-sm font-medium"
          >
            Estoque mínimo
          </label>

          <input
            id="estoqueMinimo"
            type="number"
            min="0"
            step="0.001"
            value={estoqueMinimo}
            onChange={(event) =>
              setEstoqueMinimo(event.target.value)
            }
            required
            className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          />

          <p className="text-xs text-muted-foreground">
            Quando o estoque chegar nesse valor, o sistema irá sinalizar estoque baixo.
          </p>
        </div>

        {erro && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {erro}
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/admin/estoque/produtos"
            className="rounded-lg border px-5 py-3 text-center text-sm font-semibold hover:bg-muted"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={salvando}
            className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {salvando
              ? "Cadastrando..."
              : "Cadastrar produto"}
          </button>
        </div>
      </form>
    </div>
  );
}