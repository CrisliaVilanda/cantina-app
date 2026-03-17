import { ThemeToggle } from "./ThemeTogle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

type HeaderProps = {
  toggleSidebar: () => void;
};

export default function Header({ toggleSidebar }: HeaderProps) {

  return (
    <header className="sticky top-0 z-50 bg-background/80 border-b shadow-sm">
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            {toggleSidebar &&
              <li>
                <Button
                  onClick={toggleSidebar}>
                  <Menu />
                </Button>
              </li>
            }

          </div>
          <div className="flex items-center gap-4">
            <li className="text-xl font-bold text-foreground">Client name</li>
            <li>
              <ThemeToggle />
            </li>
          </div>

        </ul>
      </nav>
    </header>
  );
}