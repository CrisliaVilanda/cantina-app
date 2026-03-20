import EstoqueForm from "@/app/components/forms/EstoqueForm";


export default function NewEstoquePage () {
  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl font-semibold mb-6">
        Adicionaralimentos ao estoque
      </h1>
      <div className="mt-10 border rounded-2xl p-5">
        <EstoqueForm />
      </div>
    </div>
  )
}