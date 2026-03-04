import Image from "next/image";
import Link from "next/link";


// items-center justify-center p-5 w-full flex-1 px-10 text-center
// grid grid-cols-1 md:grid-cols-2
export default function LoginAtendente(){
  return (
    <main className="grid grid-cols-2 min-h-screen">
      <div className="flex justify-center items-center bg-black">
          <Image className="justify-center items-center"
          src="/globe.svg"
          alt="Logo"
          height="300"
          width="300"
         />
      </div>
      
       <div className="flex flex-wrap max-w-5xl sm:w-full">
        <div className="ml-8 top-50 relative mb-5">
          <h1 className="text-3xl text-center font-bold ">Acessar painel de gerenciamento de pedidos</h1>
        </div>
        <div className="flex flex-col p-10 space-y-8 ml-3">
        <label htmlFor="inputLogin">
             Login
             <input className="bg-accent-foreground rounded-2xl ml-2" type="text" name="inputLogin" />
          </label>
       
           <label htmlFor="inputPwd">
             Senha
             <input className="bg-accent-foreground rounded-2xl ml-2" type="text" name="inputPwd" />
          </label>

          <Link href="/atendente" className="bg-blue-500 focus:bg-blue-700 text-white font-bold py-3 px-4 rounded-2xl self-center">
            Fazer login
          </Link>
          </div>
       </div>
    </main>
  
  )
}