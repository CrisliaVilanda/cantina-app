import {
  LayoutDashboard,
  ShoppingCart,
  Utensils,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  AlertTriangle,
  History,
  Receipt,
  BarChart3,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

export type MenuItem = {
  title: string;
  href?: string;
  icon: LucideIcon;
  children?: MenuItem[];
};

export const adminMenu: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Pedidos",
    href: "/admin/pedidos",
    icon: ShoppingCart,
  },

  {
    title: "Cardápio",
    href: "/admin/cardapio",
    icon: Utensils,
  },

  {
    title: "Estoque",
    icon: Package,
    children: [
      {
        title: "Dispensa - visão geral",
        href: "/admin/estoque/dispensa",
        icon: Package,
      },
      {
        title: "Produtos",
        href: "/admin/estoque/produtos",
        icon: Package,
      },
      {
        title: "Entradas",
        href: "/admin/estoque/entradas",
        icon: ArrowDownToLine,
      },
      {
        title: "Movimentações",
        href: "/admin/estoque/movimentacoes",
        icon: ArrowUpFromLine,
      },
      {
        title: "Estoque baixo",
        href: "/admin/estoque/baixo",
        icon: AlertTriangle,
      },
      {
        title: "Histórico",
        href: "/admin/estoque/historico",
        icon: History,
      },
    ],
  },

  {
    title: "Vendas",
    href: "/admin/vendas",
    icon: Receipt,
  },

  {
    title: "Relatórios",
    href: "/admin/relatorios",
    icon: BarChart3,
  },

  {
    title: "Configurações",
    icon: Settings,
    children: [
      {
        title: "Usuários",
        href: "/admin/configuracoes/usuarios",
        icon: Users,
      },
    ],
  },
];