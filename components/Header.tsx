"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Mic2 } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Transcribe", href: "/transcribe" },
    { name: "Templates", href: "/templates" },
    { name: "History", href: "/history" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600/90 via-pink-500/90 to-indigo-600/90 backdrop-blur-xl border-b border-white/30 shadow-xl shadow-purple-500/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Mic2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white drop-shadow-lg">
              VoiceToText AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all font-medium backdrop-blur-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white/90 hover:bg-white/10 backdrop-blur-sm transition-all"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 bg-white/5 backdrop-blur-xl rounded-b-lg">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/90 hover:text-white hover:bg-white/10 transition-all font-medium px-4 py-2 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
