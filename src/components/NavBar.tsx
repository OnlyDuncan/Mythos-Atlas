"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/graph", label: "Graph" },
  { href: "/dream-journal", label: "Dream Journal" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#080810]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-widest text-white">
            🌙 MYTHOS<span className="text-violet-400"> ATLAS</span>
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                pathname === href
                  ? "bg-violet-600/30 text-violet-300"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
