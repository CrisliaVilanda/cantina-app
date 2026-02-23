import Link from "next/link";

export default function LoginAtendente(){
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Página de Login do Atendente</h1>
      <Link href="/admin" className="bg-blue-500 focus:bg-blue-700 text-white font-bold py-4 px-4 rounded">
        Ir para Admin
      </Link>
    </div>
  )
}