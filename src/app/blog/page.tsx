"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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

export default function Blog() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Simula o carregamento aumentando progress até 100%
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return oldProgress + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [loading]);

  // Artigos reais com fonte externa
  const articles = [
    {
      title: "Robôs submarinos em cardume: inspirados em peixes para explorar e monitorar oceanos",
      description:
        "Pesquisadores da Harvard SEAS desenvolveram o Bluebot, um robô subaquático que imita o comportamento de cardume de peixes por meio de LEDs e câmeras de visão artificial. Em vez de coordenar a movimentação centralmente, cada robô reage ao que vê nos vizinhos, permitindo comportamentos coletivos autônomos, como agregação, dispersão e formação de círculos. Essa tecnologia descentralizada visa futura aplicação em ambientes frágeis como recifes de coral para monitoramento ambiental e exploração de maneira menos invasiva e mais eficiente",
      image: "/images/peixe1.jpg",
      link: "https://seas.harvard.edu/news/2021/01/robotic-swarm-swims-school-fish",
      sourceName: "Leah Burrows – Harvard SEAS",
    },
    {
      title: "Caracol marinho inspira robô que pode limpar oceanos",
      description:
        "Pesquisadores da Universidade da Califórnia, Davis (UC Davis), criaram um protótipo de robô inspirado no caracol-de-maçã havaiano (Pomacea canaliculata). Esse robô utiliza um mecanismo ondulante semelhante ao movimento do pé do caracol para criar correntes na água, ideal para coletar microplásticos da superfície de oceanos, rios e lagos. A solução é uma alternativa inovadora aos métodos tradicionais de limpeza, como redes de arrasto, especialmente eficiente para partículas minúsculas.",
      image: "/images/caracol.jpg",
      link: "https://www.terra.com.br/byte/caracol-marinho-inspira-robo-que-pode-limpar-oceanos,562956446f4f3186f91a0139be562bdewekybw5c.html",
      sourceName: "Universidade da Califórnia",
    },
    {
      title: "Águas-vivas biônicas: tecnologia inspirada na natureza para explorar os oceanos",
      description:
        "Pesquisadores da Caltech desenvolveram águas-vivas biônicas que combinam estruturas naturais com engenharia de ponta para explorar os oceanos de forma mais eficiente e sustentável. Essas criaturas artificiais foram projetadas para nadar como águas-vivas reais, aproveitando sua biomecânica para consumir menos energia durante o deslocamento subaquático. A inovação pode ser usada no futuro para coletar dados de ecossistemas marinhos frágeis sem causar distúrbios ambientais, além de contribuir para a pesquisa em robótica suave e bioengenharia.",
      image: "/images/agua-viva.jpg",
      link: "https://www.caltech.edu/about/news/building-bionic-jellyfish-for-ocean-exploration",
      sourceName: "Caltech (Instituto de Tecnologia da Califórnia)",
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
          <img
            src="/neurobiomar.jpg"
            alt="Logo"
            className="w-20 h-20 rounded-full border border-cyan-400 shadow-lg mb-6"
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
          <header   data-aos="fade-down" className="bg-[#050d1c] border-b border-cyan-800 shadow-md fixed top-0 left-0 w-full z-50">
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

              <nav className="hidden md:flex absolute left-[49%] transform -translate-x-1/2">
                <div className="flex gap-8 text-sm font-medium text-white overflow-x-auto scrollbar-hide px-4">
                  <a
                    href="/"
                    className="hover:text-cyan-400 transition whitespace-nowrap"
                  >
                    Início
                  </a>
                  <a
                    href="/sobre"
                    className="hover:text-cyan-400 transition whitespace-nowrap"
                  >
                    Sobre o Projeto
                  </a>
                  <a
                    href="/tecnologia"
                    className="hover:text-cyan-400 transition whitespace-nowrap"
                  >
                    Tecnologias Inspiradas
                  </a>
                  <a
                    href="/impacto"
                    className="hover:text-cyan-400 transition whitespace-nowrap"
                  >
                    Impacto Ambiental
                  </a>
                  <a
                    href="/blog"
                    className="text-cyan-400 font-semibold whitespace-nowrap"
                  >
                    Blog
                  </a>
                  <a
                    href="/jogos"
                    className="hover:text-cyan-400 transition whitespace-nowrap"
                  >
                    Jogos
                  </a>
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
            <div
              onClick={toggleMenu}
              className="absolute inset-0 bg-black/30 backdrop-blur-md"
            />

            <div
              className={`fixed right-0 top-[66px] h-[calc(100vh-66px)] w-1/2 bg-[#0a1a2f] border-l border-cyan-800 shadow-[0_0_20px_#00f5d4aa] transition-transform duration-500 ease-in-out z-50 ${
                menuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex flex-col p-6 gap-4 text-white text-sm font-medium">
                <a
                  href="/"
                  onClick={toggleMenu}
                  className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2"
                >
                  Início
                </a>
                <a
                  href="/sobre"
                  onClick={toggleMenu}
                  className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2"
                >
                  Sobre o Projeto
                </a>
                <a
                  href="/tecnologia"
                  onClick={toggleMenu}
                  className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2"
                >
                  Tecnologias Inspiradas
                </a>
                <a
                  href="/impacto"
                  onClick={toggleMenu}
                  className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2"
                >
                  Impacto Ambiental
                </a>
                <a
                  href="/blog"
                  onClick={toggleMenu}
                  className="text-cyan-400 font-semibold border-b border-cyan-800 pb-2"
                >
                  Blog
                </a>
                <a
                  href="/jogos"
                  onClick={toggleMenu}
                  className="hover:text-cyan-400 transition border-b border-cyan-800 pb-2"
                >
                  Jogos
                </a>
              </div>
            </div>
          </div>

          {/* Conteúdo principal */}
          <main className="pt-24 px-6 pb-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(({ title, description, image, link, sourceName }, i) => (
              <article
                key={i}
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg border border-cyan-600 overflow-hidden
                cursor-pointer
                transition-transform duration-300
                hover:scale-[1.03] hover:shadow-2xl
                focus:scale-[1.03] focus:shadow-2xl
                active:scale-[1.02] active:shadow-xl
                flex flex-col"
                tabIndex={0}
                data-aos="zoom-in"
              >
                <div className="relative w-full h-48 md:h-56 shadow-lg rounded-t-xl overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={i === 0}
                  />
                  {/* Overlay degradê do preto para transparente na parte inferior */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-20
                    bg-gradient-to-t from-black/70 to-transparent"
                  />
                  {/* Título sobre o degradê */}
                  <h2
                    className="absolute bottom-3 left-3 right-3 text-white text-lg md:text-xl font-bold
                    drop-shadow-md"
                  >
                    {title}
                  </h2>
                </div>
                {/* Conteúdo e link fixados no final do card */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-black flex-1 mb-4">{description}</p>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500 hover:text-cyan-300 font-semibold mt-auto"
                    aria-label={`Leia o artigo original: ${title}`}
                  >
                    Fonte: {sourceName} ↗
                  </a>
                </div>
              </article>
            ))}
          </main>
        </>
      )}
    </div>
  );
}
