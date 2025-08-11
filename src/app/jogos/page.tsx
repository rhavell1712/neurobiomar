"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * Games index page
 * - Header + ParticleBackground + Loading
 * - Cards list (each card links to the game's route)
 *
 * Save as: app/games/page.tsx
 */

function ParticleBackground() {
  const [particles, setParticles] = useState<
    { size: number; top: number; left: number; duration: string; delay: string }[]
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map(() => ({
      size: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: (Math.random() * 3 + 3).toFixed(2),
      delay: (Math.random() * 5).toFixed(2),
    }));
    setParticles(newParticles);
  }, []);

  if (!particles.length) return null;

  return (
    <>
      <style>{`
        .particle-container {
          position: fixed; inset:0;
          width:100vw;height:100vh;
          pointer-events:none; overflow:hidden; z-index:-10;
          background: linear-gradient(to bottom, #050d1c, #0a1a2f);
        }
        .particle { position:absolute; background:#00f5d4; border-radius:50%; opacity:0.6;
          animation-name:float; animation-timing-function:ease-in-out; animation-iteration-count:infinite;
        }
        @keyframes float {
          0%,100%{ transform:translateY(0); }
          50% { transform:translateY(-18px); }
        }
      `}</style>

      <div className="particle-container">
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: `${p.top}%`,
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}

function Header({ toggleMenu, menuOpen }: { toggleMenu: () => void; menuOpen: boolean }) {
  return (
    <>
      <header
        data-aos="fade-down"
        className="bg-[#050d1c] border-b border-cyan-800 shadow-md fixed top-0 left-0 w-full z-50"
      >
        <div className="flex items-center justify-between px-3 py-3 w-full">
          <div className="flex items-center gap-2 ml-2">
            <Image
              src="/neurobiomar.jpg"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full border border-cyan-400"
              priority
            />
            <h1 className="text-2xl font-bold whitespace-nowrap">
              <span className="text-cyan-400">NEURO</span>
              <span className="text-[#00f5d4]">BIOMAR</span>
            </h1>
          </div>

          <nav className="hidden md:flex absolute left-[49%] transform -translate-x-1/2">
            <div className="flex gap-8 text-sm font-medium text-white overflow-x-auto scrollbar-hide px-4">
              <Link href="/" className="hover:text-cyan-400 transition whitespace-nowrap">
                Início
              </Link>
              <Link href="/sobre" className="hover:text-cyan-400 transition whitespace-nowrap">
                Sobre o Projeto
              </Link>
              <Link href="/tecnologia" className="hover:text-cyan-400 transition whitespace-nowrap">
                Tecnologias Inspiradas
              </Link>
              <Link href="/impacto" className="hover:text-cyan-400 transition whitespace-nowrap">
                Impacto Ambiental
              </Link>
              <Link href="/blog" className="text-cyan-400 font-semibold whitespace-nowrap">
                Blog
              </Link>
              <Link href="/jogos" className="hover:text-cyan-400 transition whitespace-nowrap">
                Jogos
              </Link>
            </div>
          </nav>

          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none relative w-8 h-8 mr-2 z-50"
            aria-label="Toggle menu"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <span
              className={`block absolute h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
                menuOpen ? "rotate-45 top-3.5" : "top-2"
              }`}
            />
            <span
              className={`block absolute h-0.5 w-full bg-white transition-all duration-300 ease-in-out ${
                menuOpen ? "opacity-0" : "top-4"
              }`}
            />
            <span
              className={`block absolute h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
                menuOpen ? "-rotate-45 bottom-3.5" : "bottom-2"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Menu Mobile */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div onClick={toggleMenu} className="absolute inset-0 bg-black/30 backdrop-blur-md" />

        <div
          className={`fixed right-0 top-[66px] h-[calc(100vh-66px)] w-1/2 bg-[#0a1a2f] border-l border-cyan-800 shadow-[0_0_20px_#00f5d4aa] transition-transform duration-500 ease-in-out z-50 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col p-6 gap-4 text-white text-sm font-medium">
            <Link
              href="/"
              onClick={toggleMenu}
              className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2"
            >
              Início
            </Link>
            <Link
              href="/sobre"
              onClick={toggleMenu}
              className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2"
            >
              Sobre o Projeto
            </Link>
            <Link
              href="/tecnologia"
              onClick={toggleMenu}
              className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2"
            >
              Tecnologias Inspiradas
            </Link>
            <Link
              href="/impacto"
              onClick={toggleMenu}
              className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2"
            >
              Impacto Ambiental
            </Link>
            <Link
              href="/blog"
              onClick={toggleMenu}
              className="text-cyan-400 font-semibold border-b border-cyan-800 pb-2"
            >
              Blog
            </Link>
            <Link
              href="/jogos"
              onClick={toggleMenu}
              className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2"
            >
              Jogos
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default function GamesIndex() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      p += 7;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(t);
        setTimeout(() => setLoading(false), 250);
      }
    }, 40);
    return () => clearInterval(t);
  }, []);

  const toggleMenu = () => setMenuOpen((s) => !s);

  const games = [
    {
      id: "ocean-quiz",
      title: "Quiz: Tecnologias inspiradas no oceano",
      subtitle: "10 perguntas rápidas sobre descobertas e inovações marinhas",
      image: "/images/imgquiz.jpg",
      href: "/quiz",
    },
    {
      id: "memory",
      title: "Memory Marinho (coming soon)",
      subtitle: "Jogo de memória com espécies marinhas",
      image: "/imagens/jogos/memory-cover.jpg",
      href: "/peixe",
    },
    {
      id: "labirinto",
      title: "Labirinto Marinho (coming soon)",
      subtitle: "labirinto",
      image: "/imagens/jogos/memory-cover.jpg",
      href: "/labirinto",
    },
  ];

  return (
    <div className="relative min-h-screen text-white">
      <ParticleBackground />

      <Header toggleMenu={toggleMenu} menuOpen={menuOpen} />

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#050d1c] to-[#0a1a2f] px-4">
          <img
            src="/neurobiomar.jpg"
            alt="logo"
            className="w-20 h-20 rounded-full border border-cyan-400 mb-6"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          />
          <p   data-aos="fade-up" data-aos-delay="200" className="text-cyan-400 font-semibold mb-3">Carregando Jogos... {progress}%</p>
          <div data-aos="fade-up" data-aos-delay="300" className="w-full max-w-xs h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 transition-all duration-200" style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : (
        <>
          {/* espaço pro header fixo */}
          <div className="h-20" />

          <main className="max-w-7xl mx-auto px-6 py-10">
            <h2 data-aos="zoom-out-right" className="text-3xl font-bold text-cyan-300 mb-2">Jogos — NeuroBioMar</h2>
            <p data-aos="zoom-out-right" className="text-gray-300 mb-6">
              Brinque e aprenda: exercícios rápidos sobre tecnologia inspirada no oceano.
            </p>

            <div  data-aos="zoom-in" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((g) => (
                <Link key={g.id} href={g.href} className="group">
                  <article className="bg-white bg-opacity-5 backdrop-blur-md rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-[1.03] cursor-pointer">
                    <div className="relative w-full h-44">
                      {/* Ajustado para Next Image com layout responsivo */}
                      <Image
                        src={g.image}
                        alt={g.title}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                      <h3 className="absolute bottom-3 left-4 right-4 text-white font-bold text-lg">
                        {g.title}
                      </h3>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-300 mb-4">{g.subtitle}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-400 font-semibold">Jogar</span>
                        <span className="text-xs text-gray-400">Clique para abrir</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </main>
        </>
      )}
    </div>
  );
}
