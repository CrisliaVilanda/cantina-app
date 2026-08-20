"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { adminMenu, type MenuItem, } from "@/app/components/admin/adminMenu";

type SidebarProps = {
  sidebarOpen: boolean;
};

export default function Sidebar({
  sidebarOpen,
}: SidebarProps) {
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState<string[]>([]);

  function toggleMenu(title: string) {
    setOpenMenus((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title]
    );
  }

  function isActive(href?: string) {
    if (!href) {
      return false;
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  function menuContainsCurrentRoute(item: MenuItem) {
    return (
      item.children?.some(
        (child) =>
          child.href &&
          (
            pathname === child.href ||
            pathname.startsWith(`${child.href}/`)
          )
      ) ?? false
    );
  }

  return (
    <aside
      className={[
        "flex h-full flex-col",
        "border-r border-border",
        "bg-background",
        "transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16",
      ].join(" ")}
    >
      {/* HEADER */}
      <div
        className={[
          "flex h-16 items-center border-b border-border",
          sidebarOpen
            ? "px-6"
            : "justify-center",
        ].join(" ")}
      >
        {sidebarOpen ? (
          <h1 className="text-lg font-bold">
            Cantina José
          </h1>
        ) : (
          <span className="text-lg font-bold">
            CJ
          </span>
        )}
      </div>

      {/* MENU */}
      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-1">
          {adminMenu.map((item) => (
            <SidebarItem
              key={item.title}
              item={item}
              pathname={pathname}
              openMenus={openMenus}
              toggleMenu={toggleMenu}
              isActive={isActive}
              sidebarOpen={sidebarOpen}
              menuContainsCurrentRoute={
                menuContainsCurrentRoute
              }
            />
          ))}
        </div>
      </nav>
    </aside>
  );
}

type SidebarItemProps = {
  item: MenuItem;
  pathname: string;
  openMenus: string[];
  toggleMenu: (title: string) => void;
  isActive: (href?: string) => boolean;
  sidebarOpen: boolean;
  menuContainsCurrentRoute: (
    item: MenuItem
  ) => boolean;
};

function SidebarItem({
  item,
  pathname,
  openMenus,
  toggleMenu,
  isActive,
  sidebarOpen,
  menuContainsCurrentRoute,
}: SidebarItemProps) {
  const Icon = item.icon;

  const hasChildren =
    !!item.children &&
    item.children.length > 0;

  const manuallyOpen =
    openMenus.includes(item.title);

  const currentRouteIsInside =
    menuContainsCurrentRoute(item);

  const isOpen =
    manuallyOpen || currentRouteIsInside;

  const hasActiveChild =
    item.children?.some(
      (child) =>
        child.href &&
        (
          pathname === child.href ||
          pathname.startsWith(`${child.href}/`)
        )
    ) ?? false;

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          onClick={() =>
            toggleMenu(item.title)
          }
          title={
            !sidebarOpen
              ? item.title
              : undefined
          }
          className={[
            "flex w-full items-center rounded-md",
            "py-2.5 text-sm font-medium",
            "transition-colors",
            sidebarOpen
              ? "justify-between px-3"
              : "justify-center px-2",
            hasActiveChild
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          ].join(" ")}
        >
          <span
            className={[
              "flex items-center",
              sidebarOpen
                ? "gap-3"
                : "justify-center",
            ].join(" ")}
          >
            <Icon className="h-4 w-4 shrink-0" />

            {sidebarOpen && (
              <span>
                {item.title}
              </span>
            )}
          </span>

          {sidebarOpen && (
            <ChevronDown
              className={[
                "h-4 w-4 transition-transform",
                isOpen
                  ? "rotate-180"
                  : "",
              ].join(" ")}
            />
          )}
        </button>

        {sidebarOpen && isOpen && (
          <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
            {item.children?.map(
              (child) => (
                <SidebarItem
                  key={child.title}
                  item={child}
                  pathname={pathname}
                  openMenus={openMenus}
                  toggleMenu={toggleMenu}
                  isActive={isActive}
                  sidebarOpen={sidebarOpen}
                  menuContainsCurrentRoute={
                    menuContainsCurrentRoute
                  }
                />
              )
            )}
          </div>
        )}
      </div>
    );
  }

  if (!item.href) {
    return null;
  }

  const active = isActive(item.href);

  return (
    <Link
      href={item.href}
      title={
        !sidebarOpen
          ? item.title
          : undefined
      }
      className={[
        "flex items-center rounded-md",
        "py-2.5 text-sm font-medium",
        "transition-colors",
        sidebarOpen
          ? "gap-3 px-3"
          : "justify-center px-2",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      ].join(" ")}
    >
      <Icon className="h-4 w-4 shrink-0" />

      {sidebarOpen && (
        <span>{item.title}</span>
      )}
    </Link>
  );
}