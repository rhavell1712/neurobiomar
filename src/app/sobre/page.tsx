'use client';

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from 'next/link';
import Image from 'next/image';  // IMPORTAÇÃO ADICIONADA

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

export default function Sobre() {
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
      title: '🧠 Sobre o Projeto NeuroBioMar',
      content: (
        <>
          <p>
            O <strong>NeuroBioMar</strong> é um projeto que une ciência, tecnologia e imaginação para explorar as conexões entre o oceano e o cérebro humano. Inspirado por descobertas reais nas áreas de bioquímica marinha, neurologia e biotecnologia, o projeto propõe uma nova visão de futuro:
          </p>
          <p className="mt-2 text-cyan-400 font-semibold">
            Este projeto une o vasto mundo da tecnologia com a complexidade da vida marinha,
            propondo uma nova forma de criar soluções: através da inspiração na natureza.
            Diferente de iniciativas que apenas usam a tecnologia para explorar, o NeuroBioMar propõe algo inverso: 
            observar, entender e aprender com o oceano, para desenvolver ferramentas que protejam, conectem e inovem.
          </p>
        </>
      ),
    },
    {
      title: '🌊 Por que "NeuroBioMar"?',
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Neuro → em referência à neurologia e às redes neurais, tanto biológicas quanto artificiais;</li>
          <li>Bio → simboliza a vida, a biologia marinha, os comportamentos naturais que podem ser traduzidos em algoritmos, sensores e robôs.</li>
          <li>Mar → é o palco de tudo. O oceano é o maior sistema natural do planeta — e o menos compreendido. É ali que estão os códigos ocultos que podem transformar a tecnologia como conhecemos.</li>
        </ul>
      ),
    },
    {
      title: '💡 O que defendemos?',
      content: (
        <>
          <p>
           O NeuroBioMar defende que as maiores revoluções tecnológicas do futuro virão da observação da natureza,
           especialmente dos oceanos. Defendemos que, ao estudar a forma como a vida marinha se adapta,
           se comunica e reage ao ambiente, é possível criar soluções tecnológicas sustentáveis e altamente eficientes.
           A partir desse princípio, buscamos desenvolver:
          </p>
          
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li className="mt-3"><strong>🧠 Inteligência artificial mais natural</strong><br/>
            Inspirada na forma como organismos marinhos processam e respondem a estímulos.</li>
            
            <li className="mt-3" ><strong>📡 Redes de comunicação descentralizadas</strong><br/>
            Baseadas na troca de informações entre cardumes e corais.</li>
            
            <li className="mt-3"><strong>🤖 Robôs subaquáticos bioinspirados </strong><br/>
            Com movimentos ágeis e adaptáveis, como os de animais marinhos.</li>
            
            <li className="mt-3"><strong>💡 Novas ideias sustentáveis</strong><br/>
            Inovações que unem tecnologia e conservação dos oceanos.</li>
          </ul>
          
          <p className="mt-4">
           Esse projeto não se limita à inteligência artificial.
           Ele se expande para qualquer tecnologia que possa emergir da relação entre cérebro biológico e mar,
           seja através de comportamentos de animais, estruturas de corais, reflexos sensoriais,
           ou sistemas coletivos de organização natural.
          </p>
         
        </>
      ),
    },
    {
      title: 'Qual é o propósito?',
      content: (
        <>
          <p>
            Nosso propósito é transformar o conhecimento sobre os oceanos em soluções reais,L, usando a ciência para inspirar inovações tecnológicas, promover a educação ambiental e proteger a inteligência natural dos mares.

            Acreditamos que o oceano não é apenas um recurso, mas uma fonte viva de ideias, cura e conexão com o futuro.
          </p>
        </>
      ),
    },
    {
      title: '🌊 Uma nova consciência',
      content: (
        <p>
          Em tempos em que a natureza é frequentemente negligenciada, o NeuroBioMar surge como um lembrete poderoso:
          <br />
          <span className="text-cyan-400 font-semibold">
            a solução para muitos desafios humanos pode estar onde menos esperamos — nas profundezas do mar.
          </span>
        </p>
      ),
    },
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
            width={80}
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
          <div className="w-full max-w-xs h-2 bg-gray-700 rounded-full overflow-hidden" data-aos="fade-up" data-aos-delay="300">
            <div
              className="h-full bg-cyan-400 transition-all duration-300 ease-linear"
              style={{ width:`${progress}% `}}
            />
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <header
            className="bg-[#050d1c] border-b border-cyan-800 shadow-md fixed top-0 left-0 w-full z-50"
            data-aos="fade-down"
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
                data-aos="fade-right"
                data-aos-delay="100"
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

          {/* Conteúdo principal */}
          <main className="flex flex-col items-center px-4 pt-32 pb-20 max-w-6xl mx-auto gap-8">
            {sections.map(({ title, content }, i) => (
              <section
                key={i}
                tabIndex={0}
                className="bg-[#0f223a]/80 backdrop-blur-sm rounded-xl shadow-xl border-t-4 border-cyan-400 p-8 cursor-pointer transition-transform duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03] focus:scale-[1.03] focus:shadow-2xl
                w-full max-w-[700px]
                md:max-w-none
                md:flex-1
                md:min-w-[350px]"
                aria-label={title}
                data-aos="zoom-in-down"
              >
                <h2 className="text-3xl font-extrabold mb-5">{title}</h2>
                <div className="text-gray-300 leading-relaxed">{content}</div>
              </section>
            ))}
          </main>
        </>
      )}
    </div>
  );
}
