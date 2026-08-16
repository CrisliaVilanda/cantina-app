"use server";

import { signIn } from "@/lib/auth";

export async function login(data: {
  usuario: string;

  senha: string;
}) {
  await signIn("credentials", {
    usuario: data.usuario,

    senha: data.senha,

    redirectTo: "/admin/dashboard",
  });
}
