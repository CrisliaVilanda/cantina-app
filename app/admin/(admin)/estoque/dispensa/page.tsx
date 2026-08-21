
export default function DispensaInsumos() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Dispensa de Alimentos</h1>
          <h3 className="text-xl font-light">Controle de estoque</h3>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Adicionar Produto à dispensa
        </button>
      </div>
    </div>
  )
}
