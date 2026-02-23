import Header from './components/Header';

export default function Home() {
  return (  
    <>
    <Header />
    <div className="flex flex-col items-center justify-center min-h-screen py-2">      
      <main className="flex flex-col items-center justify-center p-5 w-full flex-1 px-20 text-center">
        <h1 className="flex flex-col items-center text-4xl font-bold">Bem-vindo à Cantina José</h1>
        <div className="flex flex-col p-2 space-y-4">
          <p className="text-2xl">Quero fazer meu pedido na cantina.</p>
          <button type="button" className="bg-blue-500 focus:bg-blue-700 text-white font-bold py-4 px-4 rounded">Fazer Pedido</button>
          </div>
            <div className="flex flex-wrap items-center justify-around h-4 max-w-6xl mt-50 sm:w-full">
              <div className="space-y-6 mt-6">
                <p className="text-1xl">Sou um integrante da equipe.</p>
                  <button type="button" className="bg-blue-500 focus:bg-blue-700 text-white font-bold py-4 px-4 rounded">Fazer login</button>
              </div>
              <div className="space-y-6 mt-6"> 
                <p className="text-1xl">Sou um integrante da equipe e não tenho acesso ao painel de pedidos.</p>
                  <button type="button" className="bg-blue-500 focus:bg-blue-700 text-white font-bold py-4 px-4 rounded">Falar com o administrador</button>
              </div>
            </div>
      </main>
    </div>
    </>  
  );
}
