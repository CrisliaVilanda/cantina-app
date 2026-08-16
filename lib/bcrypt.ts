import bcrypt from "bcryptjs";

export async function gerarHash(senha: string) {
  return bcrypt.hash(senha, 12);
}

export async function compararSenha(senha: string, hash: string) {
  return bcrypt.compare(senha, hash);
}
