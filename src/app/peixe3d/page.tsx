"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page3D() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setLoading(false); // Termina o loading, botão aparece
          return 100;
        }
        return oldProgress + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#050d1c] to-[#0a1a2f] text-white px-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/neurobiomar.jpg"
            alt="Logo"
            width={100}
            height={100}
            className="rounded-full border border-cyan-400 shadow-lg mb-6 animate-spin-slow"
          />
          <p className="text-lg text-cyan-400 font-semibold mb-2">
            Carregando... {progress}%
          </p>
          <div className="w-full max-w-xs h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-200 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <Link
          href="https://www.meshy.ai/3d-models/Crie-um-modelo-3D-em-AR-de-um-peixe-robtico-futurista-com-corpo-branco-liso-em-formato-oval-um-olho-grande-com-lente-preta-brilhante-pequenas-aletas-superiores-e-traseiras-e-detalhes-sutis-em-cobre-no-topo-O-design-deve-parecer-tecnolgico-e-minimalista-com-aparncia-limpa-e-realista-pronto-para-ser-visualizado-em-realidade-aumentada-v2-0198c71d-2425-7312-889b-a7fbbc545b40" // Substitua pelo link real
          className="px-8 py-4 bg-cyan-400 text-[#050d1c] font-bold rounded-xl shadow-lg
                     transform transition-all duration-500 ease-out
                     hover:bg-cyan-300 hover:scale-105
                     animate-fade-in-scale"
        >
          Visitar Peixe em 3D
        </Link>
      )}

      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.6s ease-out forwards;
        }

        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
