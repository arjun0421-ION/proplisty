"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function Navbar({ user }: { user: User | null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-amber-700">
          Proplisty
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/search" className="text-gray-600 hover:text-amber-700">
            Search
          </Link>
          <Link href="/projects" className="text-gray-600 hover:text-amber-700">
            Projects
          </Link>
          <Link
            href="/listings/new"
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Post Listing
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-amber-700"
            >
              Logout
            </button>
          ) : (
            <Link href="/auth/login" className="text-gray-600 hover:text-amber-700">
              Login
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-amber-50 bg-white px-4 pb-4 space-y-3">
          <Link href="/search" className="block py-2 text-gray-600" onClick={() => setMenuOpen(false)}>
            Search
          </Link>
          <Link href="/projects" className="block py-2 text-gray-600" onClick={() => setMenuOpen(false)}>
            Projects
          </Link>
          <Link href="/listings/new" className="block py-2 text-amber-700 font-medium" onClick={() => setMenuOpen(false)}>
            Post Listing
          </Link>
          {user ? (
            <button
              onClick={() => { setMenuOpen(false); handleLogout(); }}
              className="block py-2 text-gray-600 w-full text-left"
            >
              Logout
            </button>
          ) : (
            <Link href="/auth/login" className="block py-2 text-gray-600" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
