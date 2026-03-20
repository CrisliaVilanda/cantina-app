import CardapioForm from "@/app/components/forms/CardapioForm";

export default function NewCardápioItem() {
  return (
    <div className="container mx-auto px-4 py-8 w-full">
          <h1 className="text-3xl font-semibold mb-6">
            Adicionar item ao cardápio
          </h1>
          <div className="mt-10 border rounded-2xl p-5">
          {/* formulário */}
          <CardapioForm />

          </div>
        </div>
  )
};
