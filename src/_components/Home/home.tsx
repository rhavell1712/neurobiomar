'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HomeComponent() {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // Partículas (SEM ALTERAÇÃO)
    const particles = document.querySelectorAll('.particle');
    particles.forEach((p) => {
      const move = () => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 4 + 2;
        (p as HTMLElement).style.left = `${x}px`;
        (p as HTMLElement).style.top = `${y}px`;
        (p as HTMLElement).style.width = `${size}px`;
        (p as HTMLElement).style.height = `${size}px`;
      };
      move();
      setInterval(move, 3000);
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#050d1c] to-[#0a1a2f] overflow-hidden text-white">

      {/* Partículas (SEM ALTERAÇÃO) */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="particle absolute bg-cyan-400 rounded-full opacity-20 transition-all duration-[3000ms] ease-linear"
        />
      ))}

      {/* Logo */}
      <div className="mb-6" data-aos="zoom-in">
        <img
          src="/neurobiomar.jpg"
          alt="Logo do NeuroBioMar"
          className="w-24 h-24 object-cover rounded-full shadow-lg border-3 border-cyan-400"
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        />
      </div>

      {/* Título */}
      <h1
        translate="no"
        className="text-5xl font-extrabold drop-shadow-lg mb-4 tracking-tight"
        data-aos="fade-up"
      >
        <span className="text-cyan-400 glow-neuro">NEURO</span>
        <span className="text-[#00f5d4] glow-biomar">BIOMAR</span>
      </h1>

      <div
        className="w-full max-w-4xl h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg mb-8"
        data-aos="fade-left"
        data-aos-delay="300"
      />

      {/* Frase */}
      <p
        className="text-gray-300 text-lg text-center px-6 max-w-md"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        Conectando tecnologia e saúde para transformar o amanhã.
      </p>

      {/* Botão */}
      <Link href="/sobre">
        <button
          onClick={() => router.push('/about')}
          className="mt-10 px-10 py-3 rounded-full font-semibold transition-all duration-300 bg-cyan-400 text-black shadow-lg hover:-translate-y-1 active:translate-y-1 hover:bg-[#00f5d4] focus:outline-none focus:ring-2 focus:ring-[#00f5d4] animate-buttonPulse"
          data-aos="zoom-in"
          data-aos-delay="700"
        >
          EXPLORAR
        </button>
      </Link>
    </div>
  );
}
