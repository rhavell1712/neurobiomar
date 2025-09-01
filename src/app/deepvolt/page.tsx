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
      title: '🌊 DeepVolt – Energia inspirada pelo oceano',
      content: (
        <>
          <p>
            O <strong>DeepVolt</strong> é um projeto tecnológico inovador inspirado em animais marinhos. 
            Ele propõe a criação de um robô subaquático autossuficiente, capaz de gerar e armazenar sua própria energia, 
            usando princípios da biomimética — ciência que imita a natureza para criar novas tecnologias.
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
      title: '🔹 Como o DeepVolt gera energia?',
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            <strong>⚡ Bioeletricidade Artificial (Enguia e Arraia Elétrica)</strong><br />
            As enguias e arraias produzem descargas elétricas através de células chamadas eletrócitos. 
            O DeepVolt usa materiais especiais que imitam esse processo, convertendo íons da água do mar em eletricidade, 
            armazenada em baterias internas para alimentar motores e sensores.
          </li>
          <li>
            <strong>🌊 Energia das Correntes Oceânicas (Baleia e Tubarão)</strong><br />
            Nadadeiras flexíveis captam o movimento da água, transformando-o em energia mecânica e depois em eletricidade, como uma mini turbina.
          </li>
          <li>
            <strong>☀️ Energia Solar (camada externa)</strong><br />
            Na superfície, “asas solares” retráteis recarregam as baterias com luz do sol, garantindo energia mesmo fora da água.
          </li>
        </ul>
      ),
    },
    {
      title: '🔹 Como ele se move?',
      content: (
        <p>
          Corpo hidrodinâmico inspirado no formato do tubarão, nadadeiras flexíveis como arraias, 
          e propulsão híbrida combinando energia elétrica gerada e correntes oceânicas.
        </p>
      ),
    },
    {
      title: '🔹 O que o DeepVolt pode fazer?',
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>✅ Nadar de forma autônoma por longos períodos sem precisar recarga.</li>
          <li>✅ Coletar dados ambientais (temperatura, salinidade, poluição, correntes).</li>
          <li>✅ Transmitir informações em tempo real para centros de pesquisa.</li>
          <li>✅ Formar redes de monitoramento com outros DeepVolts, criando um “enxame inteligente”.</li>
        </ul>
      ),
    },
    {
      title: '🔹 Por que o DeepVolt é importante?',
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>🌍 Ajuda no combate às mudanças climáticas monitorando o oceano.</li>
          <li>🌊 Auxilia na proteção da vida marinha contra poluição e pesca ilegal.</li>
          <li>⚡ Mostra como criar tecnologias limpas e sustentáveis inspiradas na natureza.</li>
        </ul>
      ),
    },
    {
      title: '📌 Resumo simples',
      content: (
        <p>
          O DeepVolt é um robô inspirado em tubarões, baleias e enguias que gera energia de três formas: descargas elétricas, correntes oceânicas e energia solar. 
          Ele pode se mover sozinho, monitorar os oceanos e trabalhar em rede com outros robôs sem precisar de recarga externa.
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
