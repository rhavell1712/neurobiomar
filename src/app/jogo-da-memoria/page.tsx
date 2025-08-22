"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Card = {
  id: number;
  label: string;
  matched: boolean;
};

const labels = Array.from({ length: 15 }, (_, i) => String.fromCharCode(65 + i));

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [firstChoice, setFirstChoice] = useState<Card | null>(null);
  const [secondChoice, setSecondChoice] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [shuffling, setShuffling] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [matches, setMatches] = useState(0);
  const [combo, setCombo] = useState(0);
  const [feedbacks, setFeedbacks] = useState<React.ReactNode[]>([]);
  const [specialEffects, setSpecialEffects] = useState<React.ReactNode[]>([]);
  const [showEndScreen, setShowEndScreen] = useState(false);

  const initializeCards = () => {
    const duplicated: Card[] = labels.flatMap((label) => [
      { label, matched: false, id: Math.random() },
      { label, matched: false, id: Math.random() },
    ]);
    setCards(duplicated.sort(() => Math.random() - 0.5));
    setShuffling(true);
    setFirstChoice(null);
    setSecondChoice(null);
    setAttempts(0);
    setMatches(0);
    setCombo(0);
    setShowEndScreen(false);
    setTimeout(() => setShuffling(false), 500);
  };

  useEffect(() => {
    initializeCards();
  }, []);

  const handleChoice = (card: Card) => {
    if (disabled || card.matched || shuffling) return;
    if (!firstChoice) setFirstChoice(card);
    else if (!secondChoice && card !== firstChoice) setSecondChoice(card);
  };

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      setAttempts((prev) => prev + 1);

      if (firstChoice.label === secondChoice.label) {
        setCards((prev) =>
          prev.map((c) => (c.label === firstChoice.label ? { ...c, matched: true } : c))
        );
        setMatches((prev) => prev + 1);
        setCombo((prev) => prev + 1);
        showFeedback(true); // Perfeito
        showConfetes(); // Estrelinhas
        if (combo + 1 > 1) showCombo(combo + 1); // Combo animação
        setTimeout(() => resetTurn(), 1000);
      } else {
        showFeedback(false); // Erro
        setCombo(0);
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    if (matches === labels.length) {
      setTimeout(() => setShowEndScreen(true), 600);
    }
  }, [matches]);

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  const restartGame = () => {
    initializeCards();
  };

  const flipped = (card: Card) =>
    card === firstChoice || card === secondChoice || card.matched;

  const showFeedback = (correct: boolean) => {
    const id = Math.random();
    const message = correct ? "Perfeito!" : "Erro!";
    const color = correct ? "#00FF00" : "#FF3333";
    const fontSize = correct ? "4rem" : "3.5rem";

    const newFeedback = (
      <motion.div
        key={id}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1.5 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 300 }}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize,
          color,
          fontWeight: "bold",
          textShadow: "0 0 15px rgba(0,0,0,0.8)",
          zIndex: 999,
          pointerEvents: "none",
          textAlign: "center",
        }}
      >
        {message}
      </motion.div>
    );

    setFeedbacks((prev) => [...prev, newFeedback]);
    setTimeout(() => setFeedbacks((prev) => prev.filter((f) => f !== newFeedback)), 1500);
  };

  const showConfetes = () => {
    const colors = ["#FF004F", "#00FFEA", "#FFEC00", "#FF00F5", "#00FF4F"];
    const newConfetes: React.ReactNode[] = [];
    for (let i = 0; i < 20; i++) {
      const id = Math.random();
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      newConfetes.push(
        <motion.div
          key={id}
          initial={{ y: -50, opacity: 1, rotate: 0 }}
          animate={{ y: 600, rotate: 360, opacity: 0 }}
          transition={{ duration: 2 + Math.random(), ease: "easeOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: `${left}%`,
            width: "8px",
            height: "8px",
            backgroundColor: color,
            borderRadius: "50%",
            zIndex: 998,
            pointerEvents: "none",
          }}
        />
      );
    }
    setSpecialEffects((prev) => [...prev, ...newConfetes]);
    setTimeout(
      () => setSpecialEffects((prev) => prev.filter((f) => !newConfetes.includes(f))),
      2500
    );
  };

  const showCombo = (comboCount: number) => {
    const id = Math.random();
    const newCombo = (
      <motion.div
        key={id}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 2 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 300 }}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "5rem",
          color: "#00FFFF",
          fontWeight: "bold",
          textShadow: "0 0 15px rgba(0,0,0,0.8)",
          zIndex: 999,
          pointerEvents: "none",
          textAlign: "center",
        }}
      >
        Combo x{comboCount}!
      </motion.div>
    );
    setSpecialEffects((prev) => [...prev, newCombo]);
    showConfetes(); // combo também tem estrelinhas
    setTimeout(() => setSpecialEffects((prev) => prev.filter((f) => f !== newCombo)), 1500);
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#050d1c] to-[#0a1a2f] flex flex-col items-center justify-start overflow-hidden p-4">
      {!showEndScreen && (
        <>
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 text-center mb-6 drop-shadow-lg">
            Jogo da Memória Oceânica
          </h2>

          <div className="flex gap-4 mb-4">
            <motion.button
              onClick={restartGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-cyan-400 px-4 py-2 rounded-md text-cyan-400 hover:bg-cyan-500 hover:text-white transition-colors"
            >
              Reiniciar
            </motion.button>
            <motion.button
              onClick={() => console.log("Voltar aos jogos")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-cyan-400 px-4 py-2 rounded-md text-cyan-400 hover:bg-cyan-500 hover:text-white transition-colors"
            >
              Voltar aos jogos
            </motion.button>
          </div>

          <div className="text-cyan-300 text-lg md:text-xl mb-4 text-center">
            Tentativas: {attempts} | Pares: {matches}/{labels.length} | Restantes: {labels.length - matches}
          </div>

          <div className="grid grid-cols-6 md:grid-cols-6 gap-4 justify-center items-center w-full max-w-[650px]">
            <AnimatePresence>
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  className="relative w-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <motion.div
                    className="relative w-full pt-[100%] cursor-pointer"
                    onClick={() => handleChoice(card)}
                    whileHover={{ scale: flipped(card) ? 1 : 1.05 }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      animate={{ rotateY: flipped(card) ? 180 : 0 }}
                      transition={{ duration: 0.5 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div
                        className="absolute w-full h-full bg-[#0a1a2f] border-2 border-cyan-400 rounded-lg flex items-center justify-center text-2xl font-bold text-cyan-400"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        ?
                      </div>
                      <div
                        className="absolute w-full h-full rounded-lg flex items-center justify-center border-2 border-cyan-400 text-4xl font-bold text-cyan-400"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        {card.label}
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}

      {/* Tela final */}
      {showEndScreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-0 left-0 w-full h-full bg-[#0a1a2f] flex flex-col items-center justify-center gap-6 z-50 text-center text-cyan-200 p-4"
        >
          <h2 className="text-4xl font-bold">Fim de Jogo!</h2>
          <p className="text-2xl">Tentativas: {attempts}</p>
          <p className="text-2xl">Acertos: {matches}</p>
          <p className="text-xl mt-2">
            {matches === labels.length
              ? "Parabéns! Você encontrou todos os pares!"
              : "Tente melhorar da próxima vez!"}
          </p>
          <div className="flex gap-4 mt-6">
            <motion.button
              onClick={restartGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-cyan-400 px-4 py-2 rounded-md text-cyan-400 hover:bg-cyan-500 hover:text-white transition-colors"
            >
              Jogar de novo
            </motion.button>
            <motion.button
              onClick={() => console.log("Voltar aos jogos")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-cyan-400 px-4 py-2 rounded-md text-cyan-400 hover:bg-cyan-500 hover:text-white transition-colors"
            >
              Voltar aos jogos
            </motion.button>
          </div>
        </motion.div>
      )}

      <AnimatePresence>{feedbacks}</AnimatePresence>
      <AnimatePresence>{specialEffects}</AnimatePresence>

      <style jsx>{`
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
