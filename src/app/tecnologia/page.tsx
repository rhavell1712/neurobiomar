"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../../_components/header/header";

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

export default function Technology() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

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

  const technologies = [
    {
      title: "🧠 Redes Neurais Bioinspiradas",
      img: "/images/redes neurais.jpeg",
      content: (
        <>
          <p>
            Redes neurais bioinspiradas são sistemas computacionais que se inspiram no funcionamento
            do cérebro de organismos marinhos, como polvos e lulas. Diferentemente das redes tradicionais,
            que seguem uma estrutura centralizada, essas redes são descentralizadas, permitindo que cada “unidade” 
            do sistema processe informações e tome decisões de forma independente.
          </p>
          <p className="mt-2">
            Por exemplo, assim como um polvo controla cada braço separadamente, essas redes podem reagir a estímulos 
            locais sem depender de um comando central. Isso torna os algoritmos altamente adaptativos,
            capazes de lidar com situações novas ou imprevisíveis.
          </p>
          <p className="mt-2 text-cyan-400 font-semibold">
           Aplicações práticas: essas redes são ideais para robôs subaquáticos que precisam explorar 
           ambientes complexos, detectar obstáculos e reagir rapidamente, garantindo maior autonomia,
           precisão e flexibilidade em missões submersas ou em cenários dinâmicos.
          </p>
        </>
      ),
    },
   {
  title: "🌐 Comunicação em Cardumes",
  img: "/images/cardumes.jpg",
  content: (
    <>
      <p>
        Sistemas de comunicação inspirados em cardumes de peixes reproduzem como
        os animais trocam informações rapidamente e coordenam movimentos coletivos
        sem precisar de um líder central. Cada unidade responde aos vizinhos mais
        próximos, criando um comportamento emergente eficiente.
      </p>
      <p className="mt-2">
        Essa ideia foi incorporada em algoritmos de inteligência artificial conhecidos
        como <strong>Swarm Intelligence</strong>, que otimizam decisões distribuídas
        e ajudam sistemas a resolver problemas complexos de forma colaborativa.
      </p>
      <p className="mt-2 text-cyan-400 font-semibold">
        Aplicação prática: plataformas de inteligência artificial, como o ChatGPT,
        utilizam redes neurais profundas que se beneficiam de princípios semelhantes,
        onde milhares de neurônios artificiais interagem para gerar respostas rápidas
        e eficientes. Outros exemplos incluem drones colaborativos e robôs que
        exploram ambientes de forma coordenada.
      </p>
    </>
  ),
},

    {
      title: "🤖 Robótica Subaquática",
      img: "/images/underwater-robot.jpg",
      content: (
        <>
          <p>
            Inspirada em animais como lulas e peixes, a robótica subaquática
            busca desenvolver máquinas que imitam movimentos naturais.
          </p>
          <p className="mt-2">
            Isso garante maior mobilidade e eficiência energética, permitindo
            explorar ambientes de difícil acesso sem danificá-los.
          </p>
          <p className="mt-2 text-cyan-400 font-semibold">
            Aplicação prática: robôs com tentáculos flexíveis capazes de estudar
            ecossistemas frágeis sem causar impactos.
          </p>
        </>
      ),
    },
    {
      title: "💡 Materiais Sustentáveis",
      img: "/images/coral.jpg",
      content: (
        <>
          <p>
            Pesquisadores se inspiram na estrutura dos corais para criar materiais
            resistentes e ao mesmo tempo sustentáveis.
          </p>
          <p className="mt-2">
            Esses materiais podem substituir opções poluentes na construção civil,
            promovendo durabilidade e respeito ao meio ambiente.
          </p>
          <p className="mt-2 text-cyan-400 font-semibold">
            Aplicação prática: blocos de construção feitos a partir do carbonato
            de cálcio, mais duráveis e com baixa emissão de carbono.
          </p>
        </>
      ),
    },
    {
      title: "🔋 Energia Renovável Marinha",
      img: "/images/marine-energy.jpg",
      content: (
        <>
          <p>
            Inspirada no movimento das algas e das ondas, essa tecnologia busca
            transformar a energia do mar em eletricidade limpa.
          </p>
          <p className="mt-2">
            O grande diferencial é a produção constante de energia, já que as
            correntes marítimas nunca param.
          </p>
          <p className="mt-2 text-cyan-400 font-semibold">
            Aplicação prática: dispositivos que convertem o balanço das ondas em
            energia elétrica renovável.
          </p>
        </>
      ),
    },
    {
      title: "🌊 Sensores Ambientais",
      img: "/images/biosensor.jpg",
      content: (
        <>
          <p>
            Sensores biológicos imitam a sensibilidade de moluscos e outros
            organismos marinhos para detectar mudanças no ambiente.
          </p>
          <p className="mt-2">
            Eles são capazes de identificar toxinas e variações químicas na água
            em tempo real, ajudando na preservação dos ecossistemas.
          </p>
          <p className="mt-2 text-cyan-400 font-semibold">
            Aplicação prática: biossensores inspirados em mexilhões que detectam
            poluentes com alta precisão.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <ParticleBackground />
      <Header />

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#050d1c] to-[#0a1a2f] text-white px-4">
          <Image
            src="/neurobiomar.jpg"
            alt="Logo"
            width={80}
            height={80}
            className="rounded-full border border-cyan-400 shadow-lg mb-6 animate-pulse"
          />
          <p className="text-lg text-cyan-400 font-semibold mb-2">
            Carregando... {progress}%
          </p>
          <div className="w-full max-w-xs h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <main className="flex flex-col items-center px-4 pt-32 pb-20 max-w-7xl mx-auto gap-8">
          <h1
            data-aos="zoom-in"
            className="text-4xl font-extrabold mb-8 text-center select-none"
          >
            Tecnologias Inspiradas no Oceano
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {technologies.map(({ title, content, img }, i) => (
              <section
                key={i}
                data-aos="zoom-in-down"
                className="bg-[#0f223a]/90 backdrop-blur-md rounded-xl shadow-xl border-t-4 border-cyan-400 p-6 transition-transform duration-300 hover:shadow-2xl hover:scale-[1.05] cursor-pointer text-gray-300 flex flex-col"
              >
                <h2 className="text-2xl font-extrabold mb-4 text-white">
                  {title}
                </h2>
                <Image
                  src={img}
                  alt={title}
                  width={500}
                  height={300}
                  className="rounded-xl border border-cyan-400 shadow-md mb-4 object-cover"
                />
                <div className="leading-relaxed text-justify">{content}</div>
              </section>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
