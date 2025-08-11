'use client';

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from 'next/link';
import Image from 'next/image';

function ParticleBackground() {
  const [particles, setParticles] = useState<
    { size: number; top: number; left: number; duration: string; delay: string; }[]
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
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
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

export default function Impacto() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    let percent = 0;
    const interval = setInterval(() => {
      percent += 5;
      setProgress(percent);
      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 300);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const sections = [
    {
      title: '🌊 Impactos Positivos da Tecnologia Inspirada no Oceano',
      description: `A inspiração no oceano tem impulsionado inovações tecnológicas que não só ampliam nossa capacidade
      de explorar e proteger o planeta, mas também promovem um futuro mais sustentável e conectado com a natureza.
      Confira algumas das principais conquistas dessa sinergia entre ciência e mar.`,
      image: '/images/oceano-positivo.jpg', // Sugestão: turbinas de energia das ondas, robôs marinhos sustentáveis, sensores marinhos modernos
      points: [
        { text: 'Energia limpa e renovável gerada pelas marés e ondas.', icon: '⚡' },
        { text: 'Materiais biodegradáveis e resistentes inspirados em organismos marinhos.', icon: '♻️' },
        { text: 'Robótica subaquática para monitoramento e pesquisa não invasiva.', icon: '🤖' },
        { text: 'Sensores naturais que aprimoram o monitoramento ambiental.', icon: '📡' }
      ]
    },
    {
      title: '⚠️ Impactos Negativos e Desafios',
      description: `Mesmo com as vantagens, a interação entre tecnologia e oceano traz desafios significativos,
      como o impacto ambiental decorrente da exploração inadequada e a poluição gerada por resíduos tecnológicos.
      É fundamental reconhecer essas questões para buscar soluções responsáveis.`,
      image: '/images/oceano-negativo.jpg', // Sugestão: imagens de poluição marinha, lixo plástico, equipamentos tecnológicos abandonados
      points: [
        { text: 'Acúmulo de resíduos eletrônicos e plásticos nos ecossistemas marinhos.', icon: '🗑️' },
        { text: 'Ruídos submarinos que perturbam a comunicação e o comportamento dos animais.', icon: '🔊' },
        { text: 'Exploração excessiva que ameaça a biodiversidade marinha.', icon: '⛏️' },
        { text: 'Desigualdade no acesso a tecnologias sustentáveis entre países.', icon: '🌍' }
      ]
    }
  ];

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <ParticleBackground />

      {loading ? (
              <div
                className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#050d1c] to-[#0a1a2f] text-white px-4"
                data-aos="fade-in"
              >
                <Image
                  src="/neurobiomar.jpg"
                  alt="Logo"
                  width={80}  // w-20 = 20*4=80px
                  height={80}
                  className="rounded-full border border-cyan-400 shadow-lg mb-6"
                  data-aos="flip-left"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                />
                <p
                  className="text-lg text-cyan-400 font-semibold mb-2"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  Carregando... {progress}%
                </p>
                <div
                  className="w-full max-w-xs h-2 bg-gray-700 rounded-full overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div
                    className="h-full bg-cyan-400 transition-all duration-200 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
        <>
          {/* Header */}
          <header className="bg-[#050d1c] border-b border-cyan-800 shadow-md fixed top-0 left-0 w-full z-50" data-aos="fade-down">
            <div className="flex items-center justify-between px-3 py-3 w-full">
              <div className="flex items-center gap-2 ml-2">
                <Image src="/neurobiomar.jpg" alt="Logo" width={40} height={40} className="rounded-full border border-cyan-400" />
                <h1 className="text-2xl font-bold whitespace-nowrap">
                  <span className="text-cyan-400">NEURO</span><span className="text-[#00f5d4]">BIOMAR</span>
                </h1>
              </div>
              <nav className="hidden md:flex absolute left-[49%] transform -translate-x-1/2">
                <div className="flex gap-8 text-sm font-medium text-white overflow-x-auto scrollbar-hide px-4">
                  <Link href="/" className="hover:text-cyan-400 transition">Início</Link>
                  <Link href="/sobre" className="hover:text-cyan-400 transition">Sobre o Projeto</Link>
                  <Link href="/tecnologia" className="hover:text-cyan-400 transition">Tecnologias Inspiradas</Link>
                  <Link href="/impacto" className="text-cyan-400 font-semibold">Impacto Ambiental</Link>
                  <Link href="/blog" className="hover:text-cyan-400 transition">Blog</Link>
                  <Link href="/jogos" className="hover:text-cyan-400 transition">Jogos</Link>
                </div>
              </nav>
              <button onClick={toggleMenu} className="md:hidden focus:outline-none relative w-8 h-8 mr-2 z-50">
                <span className={`block absolute h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${menuOpen ? 'rotate-45 top-3.5' : 'top-2'}`} />
                <span className={`block absolute h-0.5 w-full bg-white transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-0' : 'top-4'}`} />
                <span className={`block absolute h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${menuOpen ? '-rotate-45 bottom-3.5' : 'bottom-2'}`} />
              </button>
            </div>
          </header>

          {/* Menu Mobile */}
          {menuOpen && (
            <div className="fixed inset-0 z-40">
              <div onClick={toggleMenu} className="absolute inset-0 bg-black/30 backdrop-blur-md" />
              <div className="fixed right-0 top-[66px] h-[calc(100vh-66px)] w-1/2 bg-[#0a1a2f] border-l border-cyan-800">
                <div className="flex flex-col p-6 gap-4 text-white text-sm font-medium">
                  <Link href="/" onClick={toggleMenu}>Início</Link>
                  <Link href="/sobre" onClick={toggleMenu}>Sobre o Projeto</Link>
                  <Link href="/tecnologia" onClick={toggleMenu}>Tecnologias Inspiradas</Link>
                  <Link href="/impacto" onClick={toggleMenu} className="text-cyan-400 font-semibold">Impacto Ambiental</Link>
                  <Link href="/blog" onClick={toggleMenu}>Blog</Link>
                  <Link href="/jogos" onClick={toggleMenu}>Jogos</Link>
                </div>
              </div>
            </div>
          )}

          {/* Conteúdo */}
          <main className="flex flex-col items-center px-4 pt-32 pb-20 max-w-6xl mx-auto gap-10">
            {sections.map((sec, i) => (
              <section
                key={i}
                className="bg-[#0f223a]/80 backdrop-blur-sm rounded-xl shadow-xl border-t-4 border-cyan-400 p-6 w-full max-w-[800px]"
                aria-label={sec.title}
                tabIndex={0}
              >
                <h2 className="text-3xl font-bold mb-4" data-aos="fade-right">{sec.title}</h2>
                <p className="mb-6 text-gray-300" data-aos="fade-left">{sec.description}</p>

                <div className="mb-8" data-aos="zoom-in">
                  <Image src={sec.image} alt={sec.title} width={800} height={400} className="rounded-lg border border-cyan-500" />
                </div>

                <ul className="space-y-4" data-aos="fade-up">
                  {sec.points.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-gray-300">
                      <span className="text-3xl">{p.icon}</span>
                      <span>{p.text}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {/* Frase de impacto */}
            <div
              className="bg-gradient-to-r from-cyan-600 to-blue-800 p-6 rounded-xl shadow-lg text-center max-w-[800px] transition transform duration-500 hover:-translate-y-1 "
              data-aos="zoom-in"
            >
              <p className="text-xl font-semibold text-white">
                "A tecnologia inspirada no oceano é uma ponte entre inovação e preservação."
              </p>
            </div>

            {/* Call-to-action */}
            <div
            className="bg-[#112a45] p-6 rounded-xl shadow-lg text-center max-w-[800px] transition transform duration-200 hover:-translate-y-1 "
            data-aos="fade-up"
            >
                <h3 className="text-2xl font-bold mb-3 text-cyan-400">Junte-se à missão!</h3>
                <p className="mb-4 text-gray-300">
                    Participe de iniciativas, compartilhe conhecimento e ajude a transformar a relação entre tecnologia e oceano.
                </p>

            <Link href='/blog'>
                <button className="px-5 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-400 transition transform duration-200 hover:-translate-y-1 active:translate-y-1">
                Saiba Mais
                </button>
            </Link>
            </div>

          </main>
        </>
      )}
    </div>
  );
}
