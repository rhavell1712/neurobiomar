'use client';

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from 'next/image';
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

export default function DeepVolt() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

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

  const sections = [
    {
      title: '🌊 DeepVolt – Robô Subaquático Autossuficiente',
      content: (
        <>
          <p>
            O <strong>DeepVolt</strong> é um robô inspirado em animais marinhos, projetado para explorar e monitorar os oceanos de forma autônoma e sustentável.
            Ele combina princípios da biomimética com tecnologias inovadoras para operar de maneira eficiente e limpa.
          </p>

          {/* Vídeo incorporado */}
          <div className="mt-6 flex justify-center">
            <video
              src="/images/drone.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-w-2xl rounded-xl border-4 border-cyan-400 shadow-lg"
            />
          </div>
        </>
      ),
    },
    {
      title: '🔹 Como ele gera energia?',
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            <strong>💧 Células de Combustível a Hidrogênio</strong><br />
            Convertem hidrogênio e oxigênio da água do mar em eletricidade limpa, permitindo autonomia prolongada mesmo em profundidade.
          </li>
          <li>
            <strong>🌊 Hidrogeradores Integrados</strong><br />
            Turbinas nas nadadeiras aproveitam o movimento do robô e das correntes oceânicas para gerar energia adicional.
          </li>
          <li>
            <strong>☀️ Painéis Solares Retráteis</strong><br />
            Quando na superfície, painéis flexíveis captam a luz solar, recarregando rapidamente as baterias.
          </li>
        </ul>
      ),
    },
    {
      title: '🔹 Como ele se move?',
      content: (
        <p>
          Corpo hidrodinâmico inspirado em tubarões, nadadeiras flexíveis como arraias, 
          e propulsão híbrida que combina energia das células de hidrogênio e das correntes oceânicas, garantindo movimento eficiente e silencioso.
        </p>
      ),
    },
    {
      title: '🔹 O que o DeepVolt pode fazer?',
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>✅ Operar autonomamente por longos períodos sem necessidade de recarga externa.</li>
          <li>✅ Coletar dados ambientais: temperatura, salinidade, poluição, correntes e oxigênio.</li>
          <li>✅ Formar redes inteligentes com outros DeepVolts, criando um “enxame” de monitoramento.</li>
          <li>✅ Explorar ecossistemas frágeis sem causar danos.</li>
        </ul>
      ),
    },
    {
      title: '🔹 Por que o DeepVolt é importante?',
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>🌍 Auxilia no estudo das mudanças climáticas e preservação dos oceanos.</li>
          <li>♻️ Demonstra como tecnologias limpas podem ser inspiradas na natureza e aplicadas de forma prática.</li>
          <li>⚡ Proporciona um modelo viável de robô subaquático autossuficiente.</li>
        </ul>
      ),
    },
    {
      title: '📌 Resumo simples',
      content: (
        <p>
          O DeepVolt é um robô inspirado em tubarões e arraias que gera energia a partir de <strong>células de hidrogênio, turbinas internas e luz solar</strong>, permitindo monitoramento autônomo e sustentável dos oceanos.
        </p>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <ParticleBackground />
      <Header />

      {loading ? (
        <div
          className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#050d1c] to-[#0a1a2f] text-white px-4"
          data-aos="fade-in"
        >
          <Image
            src="/images/neurobiomar2.jpg"
            alt="logo"
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
      )}
    </div>
  );
}
