export default function Header() {

  return (
    <header className="bg-white text-black">
      <nav className="container max-auto px-6 py-3">
        <ul className="flex justify-around py-3">
          <li>
            Image
            {/* <img src="" alt="Logo da Cantina José" /> */}
            </li>
          <li className="text-xl font-bold">Client name</li>
        </ul>
      </nav>
    </header>
  );
}