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

export default function Sobre() {
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
            <li className="mt-3"><strong>📡 Redes de comunicação descentralizadas</strong><br/>
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
            Nosso propósito é transformar o conhecimento sobre os oceanos em soluções reais, usando a ciência para inspirar inovações tecnológicas, promover a educação ambiental e proteger a inteligência natural dos mares.
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
      <Header />

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
