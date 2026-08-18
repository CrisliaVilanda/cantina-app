"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { ThemeToggle } from "./ThemeTogle";
import { useClient } from "@/app/cliente/(cliente)/context/ClientContext";

export default function Header() {
  const {
    nomeCliente,
    carrinho,
  } = useClient();

  const quantidadeItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* LOGO */}
        <Link
          href="/cliente/menu"
          className="text-xl font-bold"
        >
          Cantina José
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden text-right sm:block">
            {nomeCliente && (
              <p className="text-xs text-muted-foreground">
                Olá, {nomeCliente}
              </p>
            )}
          </div>
          <Link
            href="/cliente/carrinho"
            className="relative rounded-md p-2 hover:bg-muted"
          >
            <ShoppingCart className="h-6 w-6" />

            {quantidadeItens > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {quantidadeItens}
              </span>
            )}
          </Link>
          {/* THEME TOGGLE */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}