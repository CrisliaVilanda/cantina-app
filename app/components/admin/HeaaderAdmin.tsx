"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/app/components/ThemeTogle";

type HeaderProps = {
  toggleSidebar?: () => void;
};

export default function Header({ toggleSidebar }: HeaderProps) {
  // const {
  //   nomeCliente,
  //   carrinho,
  // } = useClient();


  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {toggleSidebar &&
            <li className="list-none" >
              <Button variant="ghost" size="icon" onClick={() => toggleSidebar?.()}>
                <Menu size={16} />
              </Button>
            </li>
          }

          <Link href="/cliente/menu" className="text-xl font-bold" >
            Cantina José
          </Link>
        </div>


        <div className="flex items-center gap-6">
          <div className="hidden text-right sm:block">

            <p className="text-sm text-neutral-50-foreground">
              Olá, usuário tetendente
            </p>

          </div>

          {/* THEME TOGGLE */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}