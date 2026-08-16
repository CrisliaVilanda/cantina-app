"use client";

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { login } from "@/app/actions/auth.actions";

const formSchema = z.object({
  usuario: z
    .string()
    .min(3, "Informe o usuário"),

  senha: z
    .string()
    .min(6, "Informe a senha"),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      usuario: "",
      senha: "",
    },
  });

  async function onSubmit(data: FormValues) {
    await login(data);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

      {/* LADO ESQUERDO */}

      <div className="hidden md:flex items-center justify-center bg-primary">

        <Image
          src="/globe.svg"
          alt="Logo"
          width={280}
          height={280}
          priority
        />

      </div>

      {/* LADO DIREITO */}

      <div className="flex items-center justify-center p-8">

        <Card className="w-full max-w-md">

          <CardTitle className="text-center text-2xl pt-6">

            Painel Administrativo

          </CardTitle>

          <CardContent>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >

              <div>

                <Label htmlFor="usuario">
                  Usuário
                </Label>

                <Input
                  id="usuario"
                  placeholder="Digite seu usuário"
                  {...form.register("usuario")}
                />

                {form.formState.errors.usuario && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.usuario.message}
                  </p>
                )}

              </div>

              <div>

                <Label htmlFor="senha">
                  Senha
                </Label>

                <Input
                  id="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  {...form.register("senha")}
                />

                {form.formState.errors.senha && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.senha.message}
                  </p>
                )}

              </div>

              <Button
                className="w-full"
                type="submit"
              >
                Entrar
              </Button>

            </form>

          </CardContent>

          <CardFooter className="justify-center text-sm text-muted-foreground">

            Sistema de gerenciamento da cantina

          </CardFooter>

        </Card>

      </div>

    </div>
  );
}