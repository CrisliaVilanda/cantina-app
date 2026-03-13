import Link from "next/link";


export default function ClientPage() {
  return (
  <div className="flex flex-col items-center justify-center py-2 min-h-screen">      
      <main className="flex flex-col items-center justify-center p-5 w-full flex-1 px-10 text-center">
        <h1 className="flex flex-col items-center text-4xl font-bold">Bem-vindo à Cantina José</h1>
        <div className="flex flex-wrap items-center justify-around max-w-2xl mt-10 sm:w-full">
          <div className="flex flex-col p-2 space-y-8">
            <div className="space-y-8">
            <p className="text-2xl">Como você se chama?</p>
            <input className="bg-secondary border rounded-md place-self-center" type="text" placeholder="Seu nome" />
            </div>
            <Link 
              href="/cliente/menu" 
              className="bg-blue-500 focus:bg-blue-700 text-white font-bold py-4 px-4 rounded-md">
              Fazer Pedido
            </Link>
            </div>
        </div>
      </main>
    </div>
  )
}
