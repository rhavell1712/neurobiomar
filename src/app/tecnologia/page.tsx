"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";  // Import para Next.js Image
import AOS from "aos";
import "aos/dist/aos.css";

function ParticleBackground() {
  const [particles, setParticles] = useState<
    {
      size: number;
      top: number;
      left: number;
      duration: string;
      delay: string;
    }[]
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map(() => ({
      size: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: (Math.random() * 1 + 1).toFixed(2),
      delay: (Math.random() * 5).toFixed(2),
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <>
      <style>{`
        .particle-container {
          position: fixed;
          top: 0; left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          overflow: hidden;
          z-index: -10;
          background: linear-gradient(to bottom, #050d1c, #0a1a2f);
        }

        .particle {
          position: absolute;
          background: #00f5d4;
          border-radius: 50%;
          opacity: 0.6;
          animation-name: float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }
      `}</style>

      <div className="particle-container">
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: p.size + "px",
              height: p.size + "px",
              top: p.top + "%",
              left: p.left + "%",
              animationDuration: p.duration + "s",
              animationDelay: p.delay + "s",
            }}
          />
        ))}
      </div>
    </>
  );
}

export default function Technology() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
  }, []);

  useEffect(() => {
    let percent = 0;
    const interval = setInterval(() => {
      percent += 4;
      setProgress(percent);
      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const technologies = [
    {
      title: "🧠 Redes Neurais Bioinspiradas",
      content: (
        <>
          <p>
            Redes neurais artificiais que se inspiram no funcionamento do cérebro de organismos marinhos, como o polvo, para criar algoritmos mais flexíveis e adaptativos.
          </p>
          <p className="mt-2 text-cyan-400 font-semibold">
            Exemplo: Pesquisadores desenvolveram algoritmos baseados no sistema nervoso descentralizado do polvo, que permitem que robôs tenham maior autonomia e capacidade de adaptação em ambientes subaquáticos.
          </p>
        </>
      ),
    },
    {
      title: "🌐 Comunicação em Rede por Inspiração em Cardumes",
      content: (
        <>
          <p>
            Sistemas de comunicação que imitam a forma como cardumes de peixes trocam informações para coordenar movimentos coletivos, resultando em redes descentralizadas e resilientes.
          </p>
          <p className="mt-2 text-cyan-400 font-semibold">
            Exemplo: Redes de sensores ambientais que utilizam protocolos inspirados em cardumes para detectar poluição de forma colaborativa e sem dependência de um centro único.
          </p>
        </>
      ),
    },
    {
      title: "🤖 Robótica Subaquática Bioinspirada",
      content: (
        <>
          <p>
            Desenvolvimento de robôs subaquáticos que reproduzem o movimento e a flexibilidade de animais marinhos, como peixes e lulas, para navegação eficiente em ambientes complexos.
          </p>
          <p className="mt-2 text-cyan-400 font-semibold">
            Exemplo: Robôs exploradores equipados com tentáculos flexíveis que conseguem se adaptar a terrenos irregulares e estudar ecossistemas sensíveis sem causar danos.
          </p>
        </>
      ),
    },
    {
      title: "💡 Materiais Sustentáveis Inspirados em Corais",
      content: (
        <>
          <p>
            Pesquisas que buscam criar materiais biodegradáveis e resistentes baseados na estrutura dos corais, promovendo inovação sustentável na construção civil e engenharia.
          </p>
          <p className="mt-2 text-cyan-400 font-semibold">
            Exemplo: Projetos que fabricam blocos de construção com base no carbonato de cálcio dos corais, reduzindo a emissão de carbono e aumentando a durabilidade.
          </p>
        </>
      ),
    },
    {
      title: "🔋 Energia Renovável Inspirada em Movimento Marinho",
      content: (
        <>
          <p>
            Tecnologias que capturam energia das ondas e correntes marítimas, inspiradas no movimento de organismos marinhos, para gerar eletricidade limpa e constante.
          </p>
          <p className="mt-2 text-cyan-400 font-semibold">
            Exemplo: Dispositivos que imitam o balanço das algas para converter movimentos suaves da água em energia elétrica, com alta eficiência e baixo impacto ambiental.
          </p>
        </>
      ),
    },
    {
      title: "🌊 Sensores Biológicos para Monitoramento Ambiental",
      content: (
        <>
          <p>
            Sensores que imitam a sensibilidade de organismos marinhos para detectar mudanças químicas e físicas no oceano em tempo real, auxiliando na preservação dos ecossistemas.
          </p>
          <p className="mt-2 text-cyan-400 font-semibold">
            Exemplo: Biossensores baseados em percepções de mexilhões e outros moluscos, capazes de detectar toxinas e poluentes com alta precisão.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <ParticleBackground />

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#050d1c] to-[#0a1a2f] text-white px-4">
          <Image
            src="/neurobiomar.jpg"
            alt="Logo"
            width={80}
            height={80}
            className="rounded-full border border-cyan-400 shadow-lg mb-6 animate-pulse"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          />
          <p data-aos="fade-up" data-aos-delay="200" className="text-lg text-cyan-400 font-semibold mb-2">
            Carregando... {progress}%
          </p>
          <div data-aos="fade-up" data-aos-delay="300" className="w-full max-w-xs h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <header data-aos="fade-down" className="bg-[#050d1c] border-b border-cyan-800 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="flex items-center justify-between px-3 py-3 w-full">
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

              {/* Menu desktop */}
              <nav className="hidden md:flex absolute left-[49%] transform -translate-x-1/2">
                <div className="flex gap-8 text-sm font-medium text-white">
                  <Link href="/" className="hover:text-cyan-400 transition">Início</Link>
                  <Link href="/sobre" className="hover:text-cyan-400 transition">Sobre o Projeto</Link>
                  <Link href="/tecnologia" className="text-cyan-400 font-semibold">Tecnologias Inspiradas</Link>
                  <Link href="/impacto" className="hover:text-cyan-400 transition">Impacto Ambiental</Link>
                  <Link href="/blog" className="hover:text-cyan-400 transition">Blog</Link>
                  <Link href="/jogo" className="hover:text-cyan-400 transition">Jogos</Link>
                </div>
              </nav>

              {/* Botão menu mobile */}
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
            {/* Fundo com blur */}
            <div
              onClick={toggleMenu}
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
            />

            {/* Painel lateral */}
            <div
              className={`fixed right-0 top-[66px] h-[calc(100vh-66px)] w-2/3 max-w-xs bg-[#0a1a2f] border-l border-cyan-800 shadow-lg transition-transform duration-300 ease-in-out z-50 ${
                menuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <nav className="flex flex-col p-6 gap-4 text-white text-sm font-medium">
                <Link href="/" onClick={toggleMenu} className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2">Início</Link>
                <Link href="/sobre" onClick={toggleMenu} className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2">Sobre o Projeto</Link>
                <Link href="/tecnologia" onClick={toggleMenu} className="text-cyan-400 font-semibold border-b border-cyan-800 pb-2">Tecnologias Inspiradas</Link>
                <Link href="/impacto" onClick={toggleMenu} className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2">Impacto Ambiental</Link>
                <Link href="/blog" onClick={toggleMenu} className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2">Blog</Link>
                <Link href="/jogo" onClick={toggleMenu} className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2">Jogos</Link>
              </nav>
            </div>
          </div>

          {/* Conteúdo principal */}
          <main className="flex flex-col items-center px-4 pt-32 pb-20 max-w-7xl mx-auto gap-8">
            <h1
              data-aos="zoom-in"
              className="text-4xl font-extrabold mb-8 text-center select-none"
            >
              Tecnologias Inspiradas no Oceano
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {technologies.map(({ title, content }, i) => (
                <section
                  key={i}
                  data-aos="zoom-in-down"
                  className="
                    bg-[#0f223a]/90
                    backdrop-blur-md
                    rounded-xl
                    shadow-xl
                    border-t-4 border-cyan-400
                    p-6
                    transition-transform duration-300 ease-in-out
                    hover:shadow-2xl hover:scale-[1.05]
                    cursor-pointer
                    text-gray-300
                    flex flex-col
                  "
                >
                  <h2 className="text-2xl font-extrabold mb-4 text-white">{title}</h2>
                  <div className="leading-relaxed">{content}</div>
                </section>
              ))}
            </div>
          </main>
        </>
      )}
    </div>
  );
}
