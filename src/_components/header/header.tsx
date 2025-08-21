'use client';

import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Header */}
      <header
        className="bg-[#050d1c] border-b border-cyan-800 shadow-md fixed top-0 left-0 w-full z-50"
      >
        <div className="flex items-center justify-between px-3 py-3 w-full">
          {/* Logo e Nome fixos à esquerda */}
          <div className="flex items-center gap-2 ml-2">
            <Image
              src="/neurobiomar.jpg"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full border border-cyan-400"
            />
            <h1 className="text-2xl font-bold whitespace-nowrap">
              <span className="text-cyan-400">NEURO</span>
              <span className="text-[#00f5d4]">BIOMAR</span>
            </h1>
          </div>

          {/* Menu desktop centralizado */}
          <nav className="hidden md:flex absolute left-[49%] transform -translate-x-1/2">
            <div className="flex gap-8 text-sm font-medium text-white overflow-x-auto scrollbar-hide px-4">
              <Link href="/" className="hover:text-cyan-400 transition whitespace-nowrap">Início</Link>
              <Link href="/sobre" className="text-cyan-400 font-semibold whitespace-nowrap">Sobre o Projeto</Link>
              <Link href="/tecnologia" className="hover:text-cyan-400 transition whitespace-nowrap">Tecnologias Inspiradas</Link>
              <Link href="/impacto" className="hover:text-cyan-400 transition whitespace-nowrap">Impacto Ambiental</Link>
              <Link href="/blog" className="hover:text-cyan-400 transition whitespace-nowrap">Blog</Link>
              <Link href="/jogos" className="hover:text-cyan-400 transition whitespace-nowrap">Jogos</Link>
            </div>
          </nav>

          {/* Botão menu mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none relative w-8 h-8 mr-2 z-50"
            aria-label="Toggle menu"
          >
            <span
              className={`block absolute h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
                menuOpen ? 'rotate-45 top-3.5' : 'top-2'
              }`}
            />
            <span
              className={`block absolute h-0.5 w-full bg-white transition-all duration-300 ease-in-out ${
                menuOpen ? 'opacity-0' : 'top-4'
              }`}
            />
            <span
              className={`block absolute h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
                menuOpen ? '-rotate-45 bottom-3.5' : 'bottom-2'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Menu Mobile */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Fundo com blur e transparência */}
        <div
          onClick={toggleMenu}
          className="absolute inset-0 bg-black/30 backdrop-blur-md"
        />

        {/* Painel lateral com animação */}
        <div 
          className={`fixed right-0 top-[66px] h-[calc(100vh-66px)] w-1/2 bg-[#0a1a2f] border-l border-cyan-800 shadow-[0_0_20px_#00f5d4aa] transition-transform duration-500 ease-in-out z-50 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col p-6 gap-4 text-white text-sm font-medium">
            <Link href="/" onClick={toggleMenu} className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2">Início</Link>
            <Link href="/sobre" onClick={toggleMenu} className="text-cyan-400 font-semibold border-b border-cyan-800 pb-2">Sobre o Projeto</Link>
            <Link href="/tecnologia" onClick={toggleMenu} className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2">Tecnologias Inspiradas</Link>
            <Link href="/impacto" onClick={toggleMenu} className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2">Impacto Ambiental</Link>
            <Link href="/blog" onClick={toggleMenu} className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2">Blog</Link>
            <Link href="/jogos" onClick={toggleMenu} className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2">Jogos</Link>
          </div>
        </div>
      </div>
    </>
  );
}
