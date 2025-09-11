"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

type WordItem = { word: string; hints: string[] };

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
    { word: "MENTIRA", hints: ["Palavra que significa falsidade", "Usada em expressões como 'contar uma ...'"] },
    { word: "MARINHO", hints: ["Relacionado ao mar", "Ex: vida ..."] },
    { word: "LAGOSTA", hints: ["Crustáceo marinho", "Comestível e apreciado"] },
    { word: "RECIFE", hints: ["Formação natural no oceano", "Pode ser de corais"] },
  ];

  const [currentWord, setCurrentWord] = useState<string>("");
  const [currentHints, setCurrentHints] = useState<string[]>([]);
  const [hintHistory, setHintHistory] = useState<string[]>([]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showModal, setShowModal] = useState<{ type: "win" | "lose"; message: string } | null>(null);
  const [lastGuess, setLastGuess] = useState<{ letter: string; correct: boolean } | null>(null);
  const [wordAnimation, setWordAnimation] = useState<boolean>(false);
  const [showErrorX, setShowErrorX] = useState<boolean>(false);

  const randomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    setCurrentWord(word.word);
    setCurrentHints(word.hints);
    setHintHistory([word.hints[0]]); // primeira dica sempre aparece
    setGuessedLetters([]);
    setWrongLetters([]);
    setWrongAttempts(0);
    setLastGuess(null);
    setWordAnimation(false);
    setShowErrorX(false);
  };

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters((prev) => [...prev, letter]);

    if (!currentWord.includes(letter)) {
      setWrongLetters((prev) => [...prev, letter]); // mantém a letra errada marcada
      setWrongAttempts((prev) => {
        const newWrong = prev + 1;
        setLastGuess({ letter, correct: false });
        setShowErrorX(true);
        setTimeout(() => setShowErrorX(false), 800);
        if (newWrong >= maxAttempts) {
          setShowModal({ type: "lose", message: `Você errou! A palavra era: ${currentWord}` });
        }
        return newWrong;
      });
    } else {
      setLastGuess({ letter, correct: true });

      const allGuessed = currentWord
        .split("")
        .every((l) => guessedLetters.includes(l) || l === letter);

      if (allGuessed) {
        setWordAnimation(true);
        setTimeout(() => {
          setScore((prev) => prev + 10);
          setShowModal({ type: "win", message: "Parabéns! Você acertou a palavra!" });
          setWordAnimation(false);
        }, 800);
      }
    }
  };

  const nextHint = () => {
    if (hintHistory.length < currentHints.length) {
      const next = currentHints[hintHistory.length];
      setHintHistory((prev) => [...prev, next]);
      setWrongAttempts((prev) => prev + 1);
    }
  };

  useEffect(() => {
    randomWord();
  }, []);

  return (
    <>
      <Head>
        <title>Forca Oceânica</title>
      </Head>

      <div className="font-['Poppins'] ocean-gradient min-h-screen text-white relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 relative z-10">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">FORCA OCEÂNICA</h1>
            <p className="text-xl md:text-2xl">Adivinhe palavras relacionadas ao mar e suas culturas</p>
          </header>

          <main className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border-2 border-blue-400">
              {/* Tentativas e Pontuação */}
              <div className="flex justify-between items-center mb-4 text-lg font-bold">
                <div>
                  Tentativas restantes: <span className="text-yellow-400">{maxAttempts - wrongAttempts}</span>
                </div>
                <div>
                  Pontuação: <span className="text-green-400">{score}</span>
                </div>
              </div>

              {/* Barra de progresso */}
              <div className="mb-6 h-5 bg-blue-900/30 rounded-full border border-blue-400 overflow-hidden shadow-inner">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{
                    width: `${(currentWord.split("").filter((l) => guessedLetters.includes(l)).length / currentWord.length) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Dicas */}
              <div className="mb-6 p-4 bg-blue-900/30 rounded-lg border border-blue-400 space-y-2">
                {hintHistory.map((hint, idx) => (
                  <p key={idx} className="animate-fade-in">{hint}</p>
                ))}
              </div>

              {/* Palavra */}
              <div className="mb-12 flex justify-center gap-2 flex-wrap">
                {currentWord.split("").map((letter, idx) => {
                  const isGuessed = guessedLetters.includes(letter);

                  return (
                    <div
                      key={idx}
                      className={`w-12 h-14 border-b-4 border-blue-300 flex items-center justify-center text-2xl font-bold transition-all duration-500
                        ${isGuessed && !wordAnimation ? "text-green-400 animate-slide-in" : ""}
                        ${isGuessed && wordAnimation ? "text-green-400 animate-bounce-once" : ""}`}
                    >
                      {isGuessed ? letter : ""}
                    </div>
                  );
                })}
              </div>

              {/* Keyboard */}
              <div className="grid grid-cols-7 gap-2">
                {letters.map((letter) => (
                  <button
                    key={letter}
                    className={`letter-tile bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded transition-all
                      ${guessedLetters.includes(letter) ? "cursor-not-allowed" : ""}
                      ${wrongLetters.includes(letter) ? "bg-red-600 text-white" : ""}
                      ${guessedLetters.includes(letter) && !wrongLetters.includes(letter) ? "bg-green-600 text-white" : ""}`}
                    onClick={() => handleGuess(letter)}
                    disabled={guessedLetters.includes(letter)}
                  >
                    {letter}
                  </button>
                ))}
              </div>

              {/* Novo Jogo e Dica */}
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={randomWord}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all"
                >
                  Novo Jogo
                </button>
                {hintHistory.length < currentHints.length && (
                  <button
                    onClick={nextHint}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full transition-all animate-pulse"
                  >
                    Explorar dica (-1 tentativa)
                  </button>
                )}
              </div>

              {/* Ícone de X ao errar letra */}
              {showErrorX && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl text-red-500 animate-pop">
                  ❌
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Modal */}
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
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        @keyframes bounce-once {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        @keyframes slide-in {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        .animate-bounce-once { animation: bounce-once 0.8s ease-out; }
        .animate-slide-in { animation: slide-in 0.5s ease-out; }
        .animate-pop { animation: pop 0.8s ease-in-out; }
      `}</style>
    </>
  );
}
