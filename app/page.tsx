import Link from 'next/link';

export default function Home() {
  return (  
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">      
      <main className="flex flex-col items-center justify-center p-5 w-full flex-1 px-10 text-center">
        <h1 className="flex flex-col items-center text-4xl font-bold">Bem-vindo à Cantina José</h1>
        <div className="flex flex-wrap items-center justify-around max-w-2xl mt-10 sm:w-full">
          <div className="flex flex-col p-2 space-y-4">
            <p className="text-2xl">Quero fazer meu pedido na cantina.</p>
            <Link href="/cliente" className="bg-blue-500 focus:bg-blue-700 text-white font-bold py-4 px-4 rounded">
              Fazer Pedido
            </Link>
            </div>
        </div>
      </main>
    </div>
  );
}
