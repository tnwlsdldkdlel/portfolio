"use client";

export default function Header() {
  return (
    <header className="border-b border-black">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-bold">오수진</h1>
          <ul className="flex gap-6">
            <li>
              <a href="#about" className="hover:underline">About</a>
            </li>
            <li>
              <a href="#career" className="hover:underline">Career</a>
            </li>
            <li>
              <a href="#projects" className="hover:underline">Projects</a>
            </li>
            <li>
              <a href="#writing" className="hover:underline">Writing</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

