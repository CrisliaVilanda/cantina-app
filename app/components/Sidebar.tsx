import { BarChart3, ClipboardList, LayoutDashboard, Menu, Package, UserCog, Utensils } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-blue-950 text-white p-6 space-y-3">
      <div className="flex items-center gap-2">
        <h2 className="font-semibold">Menu administrativo</h2>
      </div>

      <nav className="flex flex-col space-x-y mb-5 p-4 text-left">
        <ul className="flex-gap-4">
          <li>
            <Link
              href="/admin/dashboard"
              className="flex gap-3 p-3 rounded-md hover:bg-blue-800  transition">
              <LayoutDashboard /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/admin/estoque"
              className="flex gap-3 p-3 rounded-md hover:bg-blue-800  transition">
              <Package />Estoque
            </Link>
          </li>
          <li>
            <Link
              href="/admin/cardapio"
              className="flex gap-3 p-3 rounded-md hover:bg-blue-800  transition">
              <Utensils />Gerenciar cardápio
            </Link>
          </li>
          <li>
            <Link
              href="/admin/painel"
              className="flex gap-3 p-3 rounded-md hover:bg-blue-800  transition">
              <ClipboardList /> Painel de pedidos
            </Link>
          </li>
          <li>
            <Link
              href="/admin/painel"
              className="flex gap-3 p-3 rounded-md hover:bg-blue-800  transition">
              <BarChart3 /> Relatório de venda
            </Link>
          </li>
          <li>
            <Link
              href="/admin/perfil"
              className="flex gap-3 p-3 rounded-md hover:bg-blue-800  transition">
              <UserCog />Configurações
            </Link>
          </li>

        </ul>


      </nav>
    </aside>
  )

}