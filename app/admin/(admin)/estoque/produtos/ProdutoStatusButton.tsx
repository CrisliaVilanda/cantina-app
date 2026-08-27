"use client";

import { useState } from "react";
import { alternarProdutoAtivo } from "@/app/actions/estoque/produtos.actions";

type ProdutoStatusButtonProps = {
  id: string;
  ativo: boolean;
};

export default function ProdutoStatusButton({
  id,
  ativo,
}: ProdutoStatusButtonProps) {
  const [carregando, setCarregando] = useState(false);

  async function handleToggle() {
    setCarregando(true);

    try {
      const resultado = await alternarProdutoAtivo(id);

      if (!resultado.success) {
        alert(resultado.error ?? "Não foi possível alterar o status.");
      }
    } catch {
      alert("Não foi possível alterar o status do produto.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={carregando}
      className="rounded-md border px-3 py-2 text-xs font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
    >
      {carregando
        ? "Aguarde..."
        : ativo
          ? "Desativar"
          : "Ativar"}
    </button>
  );
}