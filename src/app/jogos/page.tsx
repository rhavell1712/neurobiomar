"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../_components/header/header";

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
          width:100vw; height:100vh;
          pointer-events:none; overflow:hidden; z-index:-10;
          background: linear-gradient(to bottom, #050d1c, #0a1a2f);
        }
        .particle { 
          position:absolute; 
          background:#00f5d4; 
          border-radius:50%; 
          opacity:0.6;
          animation-name:float; 
          animation-timing-function:ease-in-out; 
          animation-iteration-count:infinite;
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

export default function GamesIndex() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

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

  const games = [
    {
      id: "ocean-quiz",
      title: "Quiz: Tecnologias inspiradas no oceano",
      subtitle: "10 perguntas rápidas sobre descobertas e inovações marinhas",
      image: "/images/quiz-logo.png",
      href: "/quiz",
    },
    {
      id: "EcoFish",
      title: "EcoFish",
      subtitle: "EcoFish - O desafio de proteger o fundo do mar",
      image: "/images/icon-peixe.jpg",
      href: "/peixe",
    },
    {
      id: "Peixe 3D - Demonstração",
      title: "Peixe 3D - Demonstração",
      subtitle: "Veja a demonstração realizada por IA do peixe BlueBot, criado pela universidade de Havard",
      image: "/images/Captura de Tela (38).png",
      href: "/peixe3d",
    },
     {
      id: "jogo-da-memoria",
      title: "EcoFish",
      subtitle: "EcoFish - O desafio de proteger o fundo do mar",
      image: "/images/img-memory-game.jpg",
      href: "/jogo-da-memoria",
    },
     {
      id: "forca",
      title: "Forca-Oceânica",
      subtitle: "Desafie sua mente com o jogo da forca inspirado no oceano!",
      image: "/images/capa-forca.png",
      href: "/forca-oceanica",
    },
  ];

  return (
    <div className="relative min-h-screen text-white">
      <ParticleBackground />
      <Header/>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#050d1c] to-[#0a1a2f] px-4">
          <Image
            src="/neurobiomar.jpg"
            alt="logo"
            width={80}
            height={80}
            className="rounded-full border border-cyan-400 mb-6"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            priority
          />
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-cyan-400 font-semibold mb-3"
          >
            Carregando Jogos... {progress}%
          </p>
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="w-full max-w-xs h-2 bg-gray-700 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-cyan-400 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="h-20" />

          <main className="max-w-7xl mx-auto px-6 py-10">
            <h2 data-aos="zoom-out-right" className="text-3xl font-bold text-cyan-300 mb-2">
              Jogos — NeuroBioMar
            </h2>
            <p data-aos="zoom-out-right" className="text-gray-300 mb-6">
              Brinque e aprenda: exercícios rápidos sobre tecnologia inspirada no oceano.
            </p>

            <div data-aos="zoom-in" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((g) => (
                <Link key={g.id} href={g.href} className="group">
                  <article
                    className="
                      bg-white bg-opacity-5 backdrop-blur-md rounded-xl overflow-hidden
                      border-2 border-cyan-400 shadow-[0_4px_15px_rgba(0,245,212,0.6)]
                      transition-transform transform hover:scale-[1.03] cursor-pointer
                      flex flex-col h-[360px] 
                    "
                  >
                    <div className="relative w-full flex-shrink-0 h-[220px]">
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
                    <div className="p-4 flex flex-col flex-grow justify-between">
                      <p className="text-md text-gray-600 mb-4">{g.subtitle}</p>
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
