'use client';

import { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Pegando rota atual
  const navRef = useRef<HTMLDivElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const links = [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre o Projeto" },
    { href: "/tecnologia", label: "Tecnologias Inspiradas" },
    { href: "/impacto", label: "Impacto Ambiental" },
    { href: "/blog", label: "Blog" },
    { href: "/fqa", label: "FQA" },
    { href: "/jogos", label: "Jogos" },
    { href: "/deepvolt", label: "DeepVolt" },
  ];

  // Atualiza underline quando muda de rota
  useEffect(() => {
    if (!navRef.current) return;

    const activeLink = Array.from(navRef.current.querySelectorAll('a')).find(a => {
      return (a as HTMLAnchorElement).getAttribute('href') === pathname;
    }) as HTMLElement | undefined;

    if (activeLink) {
      const rect = activeLink.getBoundingClientRect();
      const parentRect = navRef.current.getBoundingClientRect();
      setUnderlineStyle({
        left: rect.left - parentRect.left,
        width: rect.width
      });
    }
  }, [pathname, menuOpen]);

  // Função para definir cor do link ativo
  const linkClass = (href: string, mobile = false) => {
    const base = mobile ? "border-b border-cyan-800 pb-2 transition" : "hover:text-cyan-400 transition";
    return pathname === href
      ? `${base} text-cyan-500 font-semibold`
      : `${base} text-white`;
  };

  return (
    <>
      {/* Estilo da animação 3D */}
      <style>
        {`
          @keyframes spin-3d {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
          .animate-spin-3d {
            animation: spin-3d 14s linear infinite;
          }
        `}
      </style>

      {/* Header */}
      <header data-aos="fade-down" className="bg-[#050d1c] border-b border-cyan-800 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between px-3 py-3 w-full">
          {/* Logo e Nome */}
          <div className="flex items-center gap-2 ml-2">
            <Image
              src="/neurobiomar.jpg"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full border border-cyan-400 animate-spin-3d"
              priority
            />
            <h1 className="text-2xl font-bold whitespace-nowrap">
              <span className="text-cyan-400">NEURO</span>
              <span className="text-[#00f5d4]">BIOMAR</span>
            </h1>
          </div>

          {/* Menu desktop */}
          <nav ref={navRef} className="hidden md:flex absolute left-[50%] transform -translate-x-1/2 whitespace-nowrap">
            <div className="flex gap-8 text-sm font-medium px-4 relative">
              {links.map(link => (
                <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
              {/* Underline animado */}
              <span
                className="absolute bottom-0 h-[2px] bg-cyan-500 transition-all duration-300"
                style={{ left: underlineStyle.left, width: underlineStyle.width }}
              />
            </div>
          </nav>

          {/* Botão menu mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none relative w-8 h-8 mr-2 z-50"
            aria-label="Toggle menu"
          >
            <span className={`block absolute h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${menuOpen ? 'rotate-45 top-3.5' : 'top-2'}`} />
            <span className={`block absolute h-0.5 w-full bg-white transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-0' : 'top-4'}`} />
            <span className={`block absolute h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${menuOpen ? '-rotate-45 bottom-3.5' : 'bottom-2'}`} />
          </button>
        </div>
      </header>

      {/* Menu Mobile */}
      <div className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div onClick={toggleMenu} className="absolute inset-0 bg-black/30 backdrop-blur-md" />

        <div className={`fixed right-0 top-[66px] h-[calc(100vh-66px)] w-1/2 bg-[#0a1a2f] border-l border-cyan-800 shadow-[0_0_20px_#00f5d4aa] transition-transform duration-500 ease-in-out z-50 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col p-6 gap-4 text-sm font-medium">
            {links.map(link => (
              <Link key={link.href} href={link.href} onClick={toggleMenu} className={linkClass(link.href, true)}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );  
}
