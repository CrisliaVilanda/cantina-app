import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
// import router from "next/router";
// import { useState } from "react";


export default function AtendenteLogin() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const {login} = useAuth();
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (login(username, password)) {
  //     router.push("/atendente");
  //   } else {
  //     alert("Login ou senha incorretos");
  //   }
  // }

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex self-center justify-center items-center bg-black">
        <Image className="justify-center items-center"
          src="/globe.svg"
          alt="Logo"
          height="300"
          width="300"
        />
      </div>
      <div className="flex-row self-center b-5 space-y-10">
        <div className="flex items-center justify-center">
          <Card className="max-w-fit  p-5">
            <CardTitle className="text-2xl">
              <h1>Acessar painel de gerenciamento de pedidos</h1>
            </CardTitle>
            <CardContent>
              <form className="space-y-4 justify-around">
                <div className="space-y-4">
                  <Label htmlFor="inputLogin">
                    Login
                    <Input
                      id="userName"
                      type="text"
                      placeholder="Digite seu nome de usuário"
                      // value={username}
                      // onChange={(e) => setUsername(e.target.value)}
                      className="bg-accent-foreground rounded-2xl ml-2"
                      required
                    />
                  </Label>
                </div>
                <div className="space-y-4">
                  <Label htmlFor="inputPwd">
                    Senha
                    <Input
                      id="password"
                      type="password"
                      placeholder="Digite sua senha"
                      // value={password}
                      // onChange={(e) => setPassword(e.target.value)}
                      className="bg-accent-foreground rounded-2xl ml-2"
                      required
                    />
                  </Label>
                </div>

              </form>
            </CardContent>
            <CardFooter className="mt-auto items-center justify-center">
              <Link href="/atendente" className="bg-blue-500 focus:bg-blue-700 text-white font-bold py-3 px-4 rounded-2xl self-center">
                Fazer login
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>

  )
};
