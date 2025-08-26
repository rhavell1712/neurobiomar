'use client';

import { useState, useEffect } from "react";
import Header from "../../_components/header/header";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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

const faqs = [
  {
    question: "Qual é o real objetivo do Neurobiomar além de criar robôs marinhos?",
    answer:
      "O Neurobiomar une ciência, tecnologia e educação ambiental, promovendo monitoramento inteligente dos oceanos e conscientização sobre preservação marinha.",
  },
  {
    question: "O que acontece se um peixe robótico for atacado por predadores?",
    answer:
      "Os peixes robóticos são projetados para resistir e flutuar. Caso se danifiquem, existem sistemas de recolhimento ou materiais biodegradáveis que minimizam impactos ambientais.",
  },
  {
    question: "Como o projeto garante que os robôs não prejudiquem o ecossistema?",
    answer:
      "A tecnologia é desenvolvida com sensores avançados e materiais sustentáveis, evitando interferência na fauna e flora marinha.",
  },
  {
    question: "Como o público pode interagir sem prejudicar os oceanos?",
    answer:
      "A interação é virtual, via site ou app, com visualizações de dados e informações educativas, sem contato direto com os robôs ou ecossistemas.",
  },
  {
    question: "Como os dados coletados contribuem para pesquisas ambientais?",
    answer:
      "Os dados monitoram cardumes, qualidade da água e comportamento de espécies, ajudando cientistas a tomar decisões precisas sobre conservação marinha.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            className="rounded-full border border-cyan-400 shadow-lg mb-6 animate-spin-slow"
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
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <main className="flex flex-col items-center px-4 pt-32 pb-20 max-w-6xl mx-auto gap-8">
          <h1 className="text-4xl font-extrabold mb-8 text-center">Perguntas Frequentes</h1>

          {faqs.map((faq, i) => (
            <section
              key={i}
              className="bg-[#0f223a]/80 backdrop-blur-sm rounded-xl shadow-xl border-t-4 border-cyan-400 p-6 w-full max-w-[700px] cursor-pointer transition-transform duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03]"
              onClick={() => toggleFAQ(i)}
              data-aos="zoom-in-down"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{faq.question}</h2>
                <span
                  className={`transform transition-transform duration-300 ${openIndex === i ? "rotate-180" : "rotate-0"}`}
                >
                  ▼
                </span>
              </div>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.p
                    className="mt-4 text-gray-300 leading-relaxed"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }} // animação mais lenta
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </section>
          ))}
        </main>
      )}
    </div>
  );
}
