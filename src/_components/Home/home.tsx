'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HomeComponent() {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const particles = document.querySelectorAll('.particle');
    const intervals: NodeJS.Timeout[] = [];

    particles.forEach((p) => {
      const move = () => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 4 + 2;
        (p as HTMLElement).style.left = ` ${x}px`;
        (p as HTMLElement).style.top = ` ${y}px`;
        (p as HTMLElement).style.width =`${size}px`;
        (p as HTMLElement).style.height = `${size}px`;
      };
      move();
      const interval = setInterval(move, 3000);
      intervals.push(interval);
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#050d1c] to-[#0a1a2f] overflow-hidden text-white">

      {/* Partículas de fundo */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="particle absolute bg-cyan-400 rounded-full opacity-20 transition-all duration-[3000ms] ease-linear"
        />
      ))}

      {/* Logo girando 3D */}
      <div className="mb-6" data-aos="zoom-in">
        <div className="logo-spin">
          <Image
            src="/neurobiomar.jpg"
            alt="Logo do NeuroBioMar"
            width={96}
            height={96}
            className="object-cover rounded-full shadow-lg border-3 border-cyan-400"
            priority={true}
          />
        </div>
      </div>

      {/* Nome do site */}
      <h1
        translate="no"
        className="text-5xl font-extrabold drop-shadow-lg mb-4 tracking-tight"
        data-aos="fade-up"
      >
        <span className="text-cyan-400 glow-neuro">NEURO</span>
        <span className="text-[#00f5d4] glow-biomar">BIOMAR</span>
      </h1>

      {/* Linha decorativa */}
      <div
        className="w-full max-w-4xl h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg mb-8"
        data-aos="fade-left"
        data-aos-delay="300"
      />

      {/* Descrição */}
      <p
        className="text-gray-300 text-lg text-center px-6 max-w-md"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        Conectando tecnologia e saúde para transformar o amanhã.
      </p>

      {/* Botão explorar */}
      <Link href="/sobre">
        <button
          className="mt-10 px-10 py-3 rounded-full font-semibold transition-all duration-300 bg-cyan-400 text-black shadow-lg hover:-translate-y-1 active:translate-y-1 hover:bg-[#00f5d4] focus:outline-none focus:ring-2 focus:ring-[#00f5d4] animate-buttonPulse"
          data-aos="zoom-in"
          data-aos-delay="700"
        >
          EXPLORAR
        </button>
      </Link>

      {/* CSS para giro da logo */}
      <style jsx>{`
        .logo-spin {
          display: inline-block;
          transform-style: preserve-3d;
          animation: spinLogo 6s linear infinite; /* 5s por volta, linear, infinito */
        }

        @keyframes spinLogo {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 6px;
          }
        }

        @media (max-width: 480px) {
          .grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
}
