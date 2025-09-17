"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

type WordItem = { word: string; hints: string[] };

export default function ForcaOceania() {
  const maxAttempts = 6;

  // Teclado por linhas
  const rows = [
    "qwertyuiop".split(""),
    "asdfghjkl".split(""),
    "zxcvbnmç".split(""),
  ];

  const initialWords: WordItem[] = [
    { word: "SUBMARINO", hints: ["Veículo que navega abaixo da superfície", "Usado para explorar o fundo do mar"] },
    { word: "HIDROGENIO", hints: ["Elemento usado em células de combustível", "Pode gerar energia limpa"] },
    { word: "ELETROCITO", hints: ["Célula que gera eletricidade em peixes", "Inspira microgeradores subaquáticos"] },
    { word: "TURBINA", hints: ["Gera energia com o movimento da água", "Presente em usinas e correntes oceânicas"] },
    { word: "CORAL", hints: ["Estrutura marinha formada por pólipos", "Pode formar recifes"] },
    { word: "ALGAS", hints: ["Plantas aquáticas que aproveitam luz solar", "Podem gerar biocombustível"] },
    { word: "NADADEIRA", hints: ["Permite movimentos suaves na água", "Inspira propulsão de robôs subaquáticos"] },
    { word: "MOLUSCO", hints: ["Animais como mexilhões e polvos", "Servem de modelo para sensores naturais"] },
    { word: "BIOMIMETICA", hints: ["Copia soluções da natureza para tecnologia", "Base de robôs inspirados em animais marinhos"] },
    { word: "ENGUIA", hints: ["Peixe que gera eletricidade naturalmente", "Inspira sistemas de energia limpa"] },
    { word: "SENSORES", hints: ["Detectam mudanças invisíveis no ambiente", "Inspirados em organismos marinhos"] },
    { word: "PLANCTON", hints: ["Organismos microscópicos que flutuam no oceano", "Inspiram microtecnologias ambientais"] },
    { word: "CORRENTEZA", hints: ["Movimento contínuo da água no oceano", "Fonte de energia mecânica para turbinas"] },
    { word: "LAGOSTA", hints: ["Crustáceo marinho", "Comestível e apreciado"] },
    { word: "RECIFE", hints: ["Formação natural no oceano", "Pode ser de corais"] },
  ];

  const shuffleArray = (array: WordItem[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const [words, setWords] = useState<WordItem[]>(shuffleArray(initialWords));
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<WordItem | null>(words[0]);
  const [hintHistory, setHintHistory] = useState<string[]>([]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showWordModal, setShowWordModal] = useState<{ type: "win" | "lose"; message: string } | null>(null);
  const [showErrorX, setShowErrorX] = useState<boolean>(false);
  const [showWordEffect, setShowWordEffect] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const startNewWord = (index: number) => {
    const word = words[index];
    setCurrentWord(word);
    setHintHistory([word.hints[0]]);
    setGuessedLetters([]);
    setWrongLetters([]);
    setWrongAttempts(0);
    setShowWordModal(null);
    setShowErrorX(false);
    setShowWordEffect(false);
  };

  const handleGuess = (letter: string) => {
    if (!currentWord) return;
    const upperLetter = letter.toUpperCase();
    if (guessedLetters.includes(upperLetter)) return;

    setGuessedLetters((prev) => [...prev, upperLetter]);

    if (!currentWord.word.includes(upperLetter)) {
      setWrongLetters((prev) => [...prev, upperLetter]);
      setWrongAttempts((prev) => {
        const newWrong = prev + 1;
        setShowErrorX(true);
        setTimeout(() => setShowErrorX(false), 800);
        if (newWrong >= maxAttempts) {
          setWrongCount((prev) => prev + 1);
          setShowWordModal({ type: "lose", message: `Você errou! A palavra era: ${currentWord.word}` });
        }
        return newWrong;
      });
    } else {
      const allGuessed = currentWord.word.split("").every((l) => guessedLetters.includes(l) || l === upperLetter);
      if (allGuessed) {
        setScore((prev) => prev + 10);
        setCorrectCount((prev) => prev + 1);
        setShowWordEffect(true);
        setTimeout(() => {
          setShowWordEffect(false);
          setShowWordModal({ type: "win", message: `Parabéns! Você acertou: ${currentWord.word}` });
        }, 800);
      }
    }
  };

  const nextHint = () => {
    if (!currentWord) return;
    if (hintHistory.length < currentWord.hints.length) {
      setHintHistory((prev) => [...prev, currentWord.hints[prev.length]]);
      setWrongAttempts((prev) => prev + 1);
    }
  };

  const nextWord = () => {
    if (currentWordIndex + 1 >= words.length) {
      setGameOver(true);
    } else {
      const nextIndex = currentWordIndex + 1;
      setCurrentWordIndex(nextIndex);
      startNewWord(nextIndex);
    }
  };

  const resetGame = () => {
    const newWords = shuffleArray(initialWords);
    setWords(newWords);
    setCurrentWordIndex(0);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setGameOver(false);
    startNewWord(0);
  };

  useEffect(() => {
    startNewWord(currentWordIndex);
  }, []);

  return (
    <>
      <Head>
        <title>Forca Oceânica</title>
      </Head>

      <div className="font-['Poppins'] ocean-gradient min-h-screen text-white relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 relative z-10">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">FORCA OCEÂNICA</h1>
            <p className="text-xl md:text-2xl">Adivinhe palavras relacionadas ao mar e suas tecnologias</p>
            <div className="mt-4 h-4 bg-blue-900/30 rounded-full border border-blue-400 overflow-hidden shadow-inner w-1/2 mx-auto">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${((currentWordIndex + 1) / words.length) * 100}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm">{`Palavra ${currentWordIndex + 1} de ${words.length}`}</p>
          </header>

          <main className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border-2 border-blue-400 relative">
              <div className="flex justify-between items-center mb-4 text-lg font-bold">
                <div>Tentativas restantes: <span className="text-yellow-400">{maxAttempts - wrongAttempts}</span></div>
                <div>Pontuação: <span className="text-green-400">{score}</span></div>
              </div>

              <div className="mb-6 h-5 bg-blue-900/30 rounded-full border border-blue-400 overflow-hidden shadow-inner">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{
                    width: `${currentWord ? (currentWord.word.split("").filter((l) => guessedLetters.includes(l)).length / currentWord.word.length) * 100 : 0}%`,
                  }}
                ></div>
              </div>

              <div className="mb-6 p-4 bg-blue-900/30 rounded-lg border border-blue-400 space-y-2">
                {hintHistory.map((hint, idx) => (
                  <p key={idx} className="animate-fade-in">{hint}</p>
                ))}
              </div>

              {/* Palavra */}
              <div className="mb-12 flex justify-center gap-2 flex-wrap relative">
                {currentWord?.word.split("").map((letter, idx) => {
                  const isGuessed = guessedLetters.includes(letter);
                  return (
                    <div
                      key={idx}
                      className={`w-14 h-16 border-b-4 border-blue-300 flex items-center justify-center text-3xl font-bold transition-all duration-500
                        ${isGuessed ? "text-green-400 animate-slide-in" : ""}
                        ${showWordEffect ? "animate-blink" : ""}`}
                    >
                      {isGuessed ? letter : ""}
                    </div>
                  );
                })}
                {showWordEffect &&
                  currentWord?.word.split("").map((_, idx) => (
                    <span
                      key={idx}
                      className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-bounce-fast"
                      style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                    ></span>
                  ))}
              </div>

              {/* Teclado responsivo */}
              <div className="flex flex-col gap-2 items-center">
                {rows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className={`flex gap-2 justify-center ${rowIndex === 1 ? "pl-1 md:pl-2" : ""} ${rowIndex === 2 ? "pl-2 md:pl-6" : ""}`}
                  >
                    {row.map((letter) => {
                      const upperLetter = letter.toUpperCase();
                      return (
                        <button
                          key={letter}
                          className={`letter-tile bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm md:text-lg transition-all
                            ${guessedLetters.includes(upperLetter) ? "cursor-not-allowed" : ""}
                            ${wrongLetters.includes(upperLetter) ? "bg-red-600 text-white" : ""}
                            ${guessedLetters.includes(upperLetter) && !wrongLetters.includes(upperLetter) ? "bg-green-600 text-white" : ""}`}
                          onClick={() => handleGuess(letter)}
                          disabled={guessedLetters.includes(upperLetter)}
                        >
                          {upperLetter}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center gap-2">
                {hintHistory.length < (currentWord?.hints.length ?? 0) && (
                  <button
                    onClick={nextHint}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-full transition-all animate-pulse"
                  >
                    Explorar dica (-1 tentativa)
                  </button>
                )}
              </div>

              {showErrorX && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl md:text-9xl text-red-500 font-extrabold animate-pop drop-shadow-lg">
                  ❌
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Modal por palavra */}
        {showWordModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white text-black p-6 md:p-8 rounded-xl text-center animate-[scale-up_0.5s_ease-out]">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {showWordModal.type === "win" ? "🎉 Palavra Correta!" : "💀 Palavra Errada!"}
              </h2>
              <p className="mb-4">{showWordModal.message}</p>
              <button
                onClick={() => {
                  setShowWordModal(null);
                  nextWord();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-full transition-all"
              >
                Próxima Palavra
              </button>
            </div>
          </div>
        )}

        {/* Modal de fim de jogo */}
        {gameOver && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
            <div className="bg-white text-black p-8 rounded-xl text-center animate-[scale-up_0.5s_ease-out]">
              <h2 className="text-3xl font-bold mb-4">🏁 Fim do Jogo!</h2>
              <p className="mb-2">Acertos: {correctCount}</p>
              <p className="mb-4">Erros: {wrongCount}</p>
              <p className="mb-6">Parabéns por completar a rodada!</p>
              <button
                                onClick={resetGame}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all"
              >
                Jogar Novamente
              </button>
            </div>
          </div>
        )}

      </div>

      <style jsx>{`
        @keyframes scale-up {0% { transform: scale(0); opacity: 0; }100% { transform: scale(1); opacity: 1; }}
        @keyframes fade-in {0% { opacity: 0; transform: translateY(-10px); }100% { opacity: 1; transform: translateY(0); }}
        @keyframes pop {0% { transform: scale(0); opacity: 0; }50% { transform: scale(1.2); opacity: 1; }100% { transform: scale(1); opacity: 0; }}
        @keyframes slide-in {0% { opacity: 0; transform: translateY(-20px); }100% { opacity: 1; transform: translateY(0); }}
        @keyframes blink {0%, 100% { opacity: 1; } 50% { opacity: 0.2; }}
        @keyframes bounce-fast {0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); }}
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-pop { animation: pop 0.8s ease-in-out; }
        .animate-slide-in { animation: slide-in 0.5s ease-out; }
        .animate-blink { animation: blink 0.5s linear 2; }
        .animate-bounce-fast { animation: bounce-fast 0.6s linear infinite; }
      `}</style>
    </>
  );
}
