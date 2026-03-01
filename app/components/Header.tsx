import { ThemeToggle } from "./ThemeTogle";

export default function Header() {

  return (
    <header className="sticky top-0 z-50 bg-background/80 border-b shadow-sm">
      <nav className="container max-auto px-6 py-3">
        <ul className="flex justify-around py-3">
          <li>
            Image
            {/* <img src="" alt="Logo da Cantina José" /> */}
            </li>
          <li className="text-xl font-bold text-foreground">Client name</li>
          <li>
            <ThemeToggle/>
          </li>
        </ul>
      </nav>
    </header>
  );
}