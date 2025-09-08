"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

type WordItem = { word: string; hints: string[] };
type OceanElement = { icon: string; name: string };

export default function ForcaOceania() {
  const maxAttempts = 6;
  const letters = "ABCDEFGHIJLMNOPQRSTUVWXYZ".split("");

  const words: WordItem[] = [
    { word: "CORAL", hints: ["Estrutura marinha formada por pólipos", "Pode formar recifes"] },
    { word: "TSUNAMI", hints: ["Onda gigante causada por atividade sísmica", "Destrutiva e rápida"] },
    { word: "BALEIA", hints: ["Maior mamífero marinho", "Alimenta-se de krill"] },
    { word: "TRIDENTE", hints: ["Arma associada a Poseidon/Netuno", "Tem três pontas"] },
    { word: "JANGADA", hints: ["Embarcação tradicional de pesca", "Feita de madeira"] },
    { word: "SURF", hints: ["Esporte praticado com prancha nas ondas", "Popular em praias tropicais"] },
  ];

  const oceanElements: OceanElement[] = [
    { icon: "anchor", name: "Âncora" },
    { icon: "fish", name: "Peixe" },
    { icon: "octagon", name: "Estrela-do-mar" },
    { icon: "droplet", name: "Gota d'água" },
    { icon: "compass", name: "Bússola" },
    { icon: "wind", name: "Vento" },
  ];

  const [currentWord, setCurrentWord] = useState<string>("");
  const [currentHints, setCurrentHints] = useState<string[]>([]);
  const [hintIndex, setHintIndex] = useState<number>(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showModal, setShowModal] = useState<{ type: "win" | "lose"; message: string } | null>(null);

  // Escolhe uma palavra aleatória
  const randomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    setCurrentWord(word.word);
    setCurrentHints(word.hints);
    setHintIndex(0);
    setGuessedLetters([]);
    setWrongAttempts(0);
  };

  // Lógica ao clicar em uma letra
  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters((prev) => [...prev, letter]);

    if (!currentWord.includes(letter)) {
      setWrongAttempts((prev) => {
        const newWrong = prev + 1;
        if (newWrong >= maxAttempts) {
          setShowModal({ type: "lose", message: `Você errou! A palavra era: ${currentWord}` });
        }
        return newWrong;
      });
    } else {
      const allGuessed = currentWord
        .split("")
        .every((l) => guessedLetters.includes(l) || l === letter);
      if (allGuessed) {
        setScore((prev) => prev + 10);
        setShowModal({ type: "win", message: "Parabéns! Você acertou a palavra!" });
      }
    }
  };

  // Mostrar nova dica
  const nextHint = () => {
    if (hintIndex < currentHints.length - 1) {
      setHintIndex(hintIndex + 1);
      setWrongAttempts((prev) => prev + 1); // Perde uma tentativa ao usar dica extra
    }
  };

  // Feather Icons via CDN
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js";
      script.onload = () => {
        // @ts-ignore
        feather.replace();
      };
      document.body.appendChild(script);
    }
  }, [wrongAttempts]);

  useEffect(() => {
    randomWord();
  }, []);

  return (
    <>
      <Head>
        <title>Forca Oceânica</title>
      </Head>

      <div className="font-['Poppins'] ocean-gradient min-h-screen text-white relative overflow-hidden">
        {/* Waves */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-blue-400 animate-[wave_8s_ease-in-out_infinite_alternate]"></div>
          <div className="absolute bottom-8 left-0 right-0 h-16 bg-blue-300 opacity-70 animate-[wave_8s_ease-in-out_infinite_alternate]"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">FORCA OCEÂNICA</h1>
            <p className="text-xl md:text-2xl">Adivinhe palavras relacionadas ao mar e suas culturas</p>
          </header>

          <main className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Game Area */}
            <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <div className="text-lg">
                  Tentativas restantes: <span className="font-bold">{maxAttempts - wrongAttempts}</span>
                </div>
                <div className="text-lg">Pontuação: <span className="font-bold">{score}</span></div>
              </div>

              {/* Hangman / Ocean Element */}
              <div className="relative h-48 mb-8 flex justify-center text-center">
                {wrongAttempts > 0 && wrongAttempts <= oceanElements.length && (
                  <div className="animate-bounce">
                    <i data-feather={oceanElements[wrongAttempts - 1].icon} className="w-16 h-16 mx-auto"></i>
                    <p className="mt-2 text-sm">{oceanElements[wrongAttempts - 1].name}</p>
                  </div>
                )}
              </div>

              {/* Word display */}
              <div className="mb-12 flex justify-center gap-2 flex-wrap">
                {currentWord.split("").map((letter, idx) => (
                  <div
                    key={idx}
                    className={`w-10 h-12 border-b-4 border-blue-300 flex items-center justify-center text-2xl font-bold transition-transform duration-500 ${
                      guessedLetters.includes(letter) ? "scale-110 text-green-400" : ""
                    }`}
                  >
                    {guessedLetters.includes(letter) ? letter : ""}
                  </div>
                ))}
              </div>

              {/* Keyboard */}
              <div className="grid grid-cols-7 gap-2">
                {letters.map((letter) => (
                  <button
                    key={letter}
                    className={`letter-tile bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded transition-all ${
                      guessedLetters.includes(letter) ? "bg-blue-900 cursor-not-allowed" : ""
                    }`}
                    onClick={() => handleGuess(letter)}
                    disabled={guessedLetters.includes(letter)}
                  >
                    {letter}
                  </button>
                ))}
              </div>

              {/* Novo Jogo */}
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={randomWord}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all"
                >
                  Novo Jogo
                </button>
                {currentHints.length > 1 && hintIndex < currentHints.length - 1 && (
                  <button
                    onClick={nextHint}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full transition-all"
                  >
                    Explorar dica (-1 tentativa)
                  </button>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="w-full bg-blue-900/30 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full transition-all"
                    style={{ width: `${(currentWord.split("").filter((l) => guessedLetters.includes(l)).length / currentWord.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Info Panel */}
            <div className="md:w-80 bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-4">Dica</h2>
              <div className="mb-6 p-4 bg-blue-900/30 rounded-lg transition-all">
                <p>{currentHints[hintIndex]}</p>
              </div>
            </div>
          </main>
        </div>

        {/* Modal de vitória/derrota */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white text-black p-8 rounded-xl text-center animate-[scale-up_0.5s_ease-out]">
              <h2 className="text-2xl font-bold mb-4">{showModal.type === "win" ? "🎉 Vitória!" : "💀 Derrota!"}</h2>
              <p className="mb-6">{showModal.message}</p>
              <button
                onClick={() => {
                  setShowModal(null);
                  randomWord();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all"
              >
                Continuar
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scale-up {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
