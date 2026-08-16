"use client";
import { ThemeToggle } from "./ThemeTogle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useClient } from "@/app/cliente/context/ClientContext";

type HeaderProps = {
  toggleSidebar?: () => void;
};

export default function Header({ toggleSidebar }: HeaderProps) {
  const {
    nomeCliente,
    quantidadeItensCarrinho,
  } = useClient();

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
        {toggleSidebar &&
          <li>
            <Button
              onClick={() => toggleSidebar?.()}>
              {/* <Menu /> */}
            </Button>
          </li>
        }

        {/* CLIENTE + CARRINHO */}
        <div className="flex items-center gap-6">
          {/* NOME */}
          <div className="hidden text-right sm:block">
            <p className="text-xs text-muted-foreground">
              Olá,
            </p>

            <p className="font-semibold">
              {nomeCliente || "Cliente"}
            </p>
          </div>

          {/* CARRINHO */}
          <Link
            href="/cliente/carrinho"
            className="relative flex items-center justify-center rounded-lg p-2 transition hover:bg-muted"
            aria-label="Carrinho"
          >
            <ShoppingCart className="h-6 w-6" />

            {quantidadeItensCarrinho > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {quantidadeItensCarrinho}
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