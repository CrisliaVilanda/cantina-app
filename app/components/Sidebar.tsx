import { BarChart3, ClipboardList, LayoutDashboard, Package, UserCog, Utensils } from "lucide-react";
import Link from "next/link";

type SidebarProps = {
  sidebarOpen: boolean;
};

export default function Sidebar( {sidebarOpen} : SidebarProps) {

  const menu = [
    {title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard"},
    {title: "Estoque", icon: Package, path: "/admin/estoque"},
    {title: "Gerenciar cardápio", icon: Utensils, path: "/admin/cardapio"},
    {title: "Painel de pedidos", icon: ClipboardList, path: "/admin/painel"},
    {title: "Relatório de vendas", icon: BarChart3, path: "/admin/relatorios"},
    {title: "Configurações", icon: UserCog, path: "/admin/perfil"},
  ]

  return (
    <aside className="flex flex-col h-full bg-blue-950 text-white p-6 space-y-3 px-5">
      <div className="flex items-center justify-center h-20">
        {sidebarOpen ? "imagem" : "I"}
      </div>

      <nav className="flex-1 p-3">
        <ul className="flex- flex-col gap-2">
       {menu.map((item) => {
        const Icon = item.icon
        return (
          <li key={item.title} className={`${sidebarOpen ? "" : "flex items-center justify-center"}`}>
            <Link 
            href={item.path}
            className={`flex items-center p-3 rounded-md hover:bg-blue-700 tezt-white transition ease-in-out ${sidebarOpen ? "justify-start gap-3 p-3" : "justify-center"}`}
            >
            <Icon size={20} className="shrink-0" />
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>{item.title}</span>
            </Link>

          </li>
        )
       })}
        </ul>


      </nav>
    </aside>
  )

}