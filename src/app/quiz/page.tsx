"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* Fundo animado */
function ParticleBackground() {
  const [particles, setParticles] = useState<
    { size: number; top: number; left: number; duration: string; delay: string }[]
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map(() => ({
      size: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: (Math.random() * 3 + 3).toFixed(2),
      delay: (Math.random() * 5).toFixed(2),
    }));
    setParticles(newParticles);
  }, []);

  if (!particles.length) return null;

  return (
    <>
      <style>{`
        .particle-container { 
          position: fixed; 
          inset: 0; 
          z-index: -10; 
          background: linear-gradient(to bottom, #050d1c, #0a1a2f); 
          pointer-events: none; 
        }
        .particle { 
          position: absolute; 
          background: #00f5d4; 
          border-radius: 50%; 
          opacity: 0.6; 
          animation: float 6s ease-in-out infinite; 
        }
        @keyframes float { 
          0% { transform: translateY(0) } 
          50% { transform: translateY(-18px) } 
          100% { transform: translateY(0) } 
        }
        /* Animação para piscar mais rápido */
        .blink-fast {
          animation: blink-fast 0.3s ease-in-out 3;
        }
        @keyframes blink-fast {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
      <div className="particle-container" aria-hidden="true">
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: `${p.top}%`,
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}

/* Header fixo */
function Header() {
  return (
    <header
      className="bg-[#050d1c] border-b border-cyan-800 shadow-md fixed top-0 left-0 w-full z-50"
      role="banner"
    >
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <Image
          src="/neurobiomar.jpg"
          alt="Logo NeuroBioMar"
          className="rounded-full border border-cyan-400"
          loading="lazy"
          width={40}
          height={40}
        />
        <h1 className="text-white text-2xl font-bold">
          <span className="text-cyan-400">NEURO</span>
          <span className="text-[#00f5d4]">BIOMAR</span>
        </h1>
        <nav className="hidden md:block" aria-label="Menu principal">
          <Link
            href="/jogos"
            className="text-cyan-400 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
          >
            Voltar aos Jogos
          </Link>
        </nav>
      </div>
    </header>
  );
}

type Question = {
  id: number;
  image: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
  sourceName: string;
  sourceUrl: string;
};

const questions: Question[] = [
  {
    id: 1,
    image: "/imagens/jogos/q1_cardumes.jpg",
    question: "Robôs cardume imitam qual comportamento natural?",
    choices: ["Formigas", "Cardumes de peixes", "Algas", "Migrar pássaros"],
    answerIndex: 1,
    explanation:
      "Eles seguem regras simples locais, como cardumes fazem, evitando colisões enquanto se movem juntos.",
    sourceName: "Harvard SEAS",
    sourceUrl: "https://seas.harvard.edu/news/2021/01/robotic-swarm-swims-school-fish",
  },
  {
    id: 2,
    image: "/imagens/jogos/q2_ai.jpg",
    question: "O que é inteligência artificial?",
    choices: [
      "Máquinas que pensam como humanos",
      "Processo de aprendizado natural",
      "Regras matemáticas simples",
      "Sistema de computação básico",
    ],
    answerIndex: 0,
    explanation:
      "IA são máquinas/programas que simulam capacidades cognitivas humanas, como aprender e resolver problemas.",
    sourceName: "IBM AI",
    sourceUrl: "https://www.ibm.com/topics/artificial-intelligence",
  },
  {
    id: 3,
    image: "/imagens/jogos/q3_robotica.jpg",
    question: "Qual o principal objetivo da robótica?",
    choices: [
      "Substituir humanos em todas as tarefas",
      "Construir máquinas para execução de tarefas automatizadas",
      "Ensinar humanos a programar",
      "Criar jogos digitais",
    ],
    answerIndex: 1,
    explanation:
      "Robótica busca construir máquinas capazes de executar tarefas de forma automatizada para facilitar o trabalho humano.",
    sourceName: "Robotics Online",
    sourceUrl: "https://www.robotics.org/",
  },
];

/* Barra de progresso */
function ProgressBar({ currentIndex, total }: { currentIndex: number; total: number }) {
  const progressPercent = useMemo(() => ((currentIndex + 1) / total) * 100, [currentIndex, total]);
  return (
    <div className="mb-4" aria-label={`Pergunta ${currentIndex + 1} de ${total}`}>
      <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-cyan-400 transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <p className="text-cyan-300 mt-1 text-sm font-medium">{`Pergunta ${currentIndex + 1} de ${total}`}</p>
    </div>
  );
}

/* Card da pergunta e alternativas com animação piscando */
function QuizCard({
  question,
  selected,
  feedbackVisible,
  onSelectChoice,
  answerIndex,
}: {
  question: Question;
  selected: number | null;
  feedbackVisible: boolean;
  onSelectChoice: (choiceIndex: number) => void;
  answerIndex: number;
}) {
  return (
    <article
      className="bg-[#0a1a2fcc] backdrop-blur-md rounded-xl shadow-lg
                 border-2 border-teal-400 shadow-teal-400/50 w-full max-w-3xl"
      aria-live="polite"
    >
      <div className="relative w-full h-56">
        <Image
          src={question.image}
          alt={`Imagem relacionada à pergunta: ${question.question}`}
          fill
          className="object-cover rounded-t-xl"
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl" />
        <h2 className="absolute bottom-4 left-4 right-4 text-white text-xl font-bold drop-shadow-lg">
          {question.question}
        </h2>
      </div>

      <div className="p-6 grid gap-4">
        {question.choices.map((choice, i) => {
          const isCorrect = i === question.answerIndex;
          const isSelected = selected === i;
          const base =
            "p-3 rounded-lg text-left border transition focus:outline-none focus:ring-2 font-medium transform";

          // Classes para piscada rápida da alternativa correta ou errada
          const blinkClass =
            feedbackVisible && (isCorrect || isSelected) ? "blink-fast" : "";

          // Classes para feedback visual
          const cls = feedbackVisible
            ? isCorrect
              ? `${base} border-teal-400 bg-teal-600 bg-opacity-70 text-white focus:ring-teal-400 ${blinkClass}`
              : isSelected
              ? `${base} border-red-500 bg-red-600 bg-opacity-70 text-white focus:ring-red-400 ${blinkClass}`
              : `${base} border-gray-600 bg-white/10 text-white`
            : `${base} border-teal-400 bg-white/10 text-white hover:bg-teal-500 hover:bg-opacity-70 hover:border-teal-400 focus:ring-teal-400 hover:scale-105`;

          return (
            <button
              key={i}
              onClick={() => onSelectChoice(i)}
              disabled={feedbackVisible}
              className={cls}
              aria-pressed={isSelected}
              aria-disabled={feedbackVisible}
              type="button"
            >
              {choice}
            </button>
          );
        })}
      </div>
    </article>
  );
}

/* Feedback após responder pergunta */
function Feedback({
  correct,
  explanation,
  sourceName,
  sourceUrl,
  onNext,
  isLast,
}: {
  correct: boolean;
  explanation: string;
  sourceName: string;
  sourceUrl: string;
  onNext: () => void;
  isLast: boolean;
}) {
  return (
    <section
      className="p-6 bg-white/10 border-t border-teal-400 mt-4 rounded-b-lg text-white max-w-3xl mx-auto"
      aria-live="assertive"
      role="region"
      aria-label="Feedback da resposta"
      style={{ minHeight: "140px" }}
    >
      <p className="font-semibold text-lg">{correct ? "Correto! 😊" : "Resposta incorreta."}</p>
      <p className="mt-2">{explanation}</p>
      <Link
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-300 underline mt-2 block"
      >
        Fonte: {sourceName}
      </Link>
      <button
        onClick={onNext}
        className="mt-4 bg-teal-500 px-4 py-2 rounded-md font-semibold hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
        type="button"
      >
        {isLast ? "Ver resultado" : "Próxima"}
      </button>
    </section>
  );
}

/* Feedback final centralizado */
function FinalFeedback({ score, total, onRestart }: { score: number; total: number; onRestart: () => void }) {
  const pct = score / total;
  let message = "Continue tentando! Você chega lá! 💪";
  if (pct === 1) message = "Perfeito! 🏆";
  else if (pct >= 0.7) message = "Excelente! ⭐";
  else if (pct >= 0.5) message = "Bom trabalho! 👍";

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center max-w-4xl mx-auto">
      <h2 className="text-5xl text-cyan-300 font-bold mb-6">Quiz concluído!</h2>
      <p className="text-4xl text-white mb-4">
        Você acertou {score} de {total}
      </p>
      <p className="text-3xl text-cyan-200 mb-8">{message}</p>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs justify-center">
        <button
          onClick={onRestart}
          className="bg-cyan-500 px-6 py-3 rounded-md font-semibold hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          type="button"
        >
          Jogar de novo
        </button>
        <Link
          href="/jogos"
          className="px-6 py-3 rounded-md border border-cyan-400 hover:bg-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        >
          Voltar aos jogos
        </Link>
      </div>
    </main>
  );
}

/* Componente principal */
export default function QuizPage() {
  const [loading, setLoading] = useState(true);
  const [progressLoad, setProgressLoad] = useState(0);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  // Temporizador 15 segundos por questão
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Loading inicial animado
  useEffect(() => {
    let p = 0;
    const timer = setInterval(() => {
      p += 10;
      setProgressLoad(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(timer);
        setTimeout(() => setLoading(false), 300);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const currentQuestion = questions[index];
  const isCorrect = selected === currentQuestion.answerIndex;
  const isLast = index + 1 >= questions.length;

  // Começa/Reseta o timer para cada questão
  useEffect(() => {
    setTimeLeft(15);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          // Se o tempo zerar, muda a questão automaticamente, marca como errada (selected=null)
          handleTimeout();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [index]);

  // Ao responder a questão
  const choose = (i: number) => {
    if (feedbackVisible) return;
    setSelected(i);
    if (i === currentQuestion.answerIndex) setScore((s) => s + 1);
    setFeedbackVisible(true);
    clearInterval(timerRef.current!);

    // Muda a questão automaticamente após 1.2s para permitir a piscada
    setTimeout(() => {
      next();
    }, 1200);
  };

  // Ao zerar o tempo sem responder
  const handleTimeout = () => {
    if (feedbackVisible) return; // evita mudar duas vezes
    setSelected(null);
    setFeedbackVisible(true);

    // Muda a questão após 1.2s, igual ao choose
    setTimeout(() => {
      next();
    }, 1200);
  };

  // Próxima pergunta ou finaliza
  const next = () => {
    setFeedbackVisible(false);
    setSelected(null);
    if (isLast) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
    }
  };

  // Reinicia o quiz
  const restart = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFeedbackVisible(false);
    setDone(false);
  };

  // Cálculo para o círculo SVG do timer
  const circleRadius = 26;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progressCircle = (timeLeft / 15) * circleCircumference;

  return (
    <div className="relative min-h-screen text-white bg-gradient-to-b from-[#050d1c] to-[#0a1a2f] flex flex-col">
      <ParticleBackground />
      <Header />
      <div className="h-20" /> {/* espaço para header fixo */}

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 flex-grow">
          <Image
            src="/neurobiomar.jpg"
            alt="logo"
            className="rounded-full border-cyan-400 mb-6 animate-spin"
            loading="lazy"
            width={80}
            height={80}
          />
          <p className="text-cyan-400 text-lg font-semibold">Carregando Quiz... {progressLoad}%</p>
          <div className="w-full max-w-xs h-2 bg-gray-700 rounded-full overflow-hidden mt-4">
            <div
              className="h-full bg-cyan-400 transition-all"
              style={{ width: `${progressLoad}%` }}
            />
          </div>
        </div>
      ) : done ? (
        <FinalFeedback score={score} total={questions.length} onRestart={restart} />
      ) : (
        <main className="flex flex-col items-center justify-start max-w-3xl mx-auto p-4 w-full flex-grow">
          <ProgressBar currentIndex={index} total={questions.length} />

          {/* Temporizador com círculo */}
          <div className="mb-6 flex items-center justify-center">
            <svg
              className="w-16 h-16"
              viewBox="0 0 60 60"
              aria-label={`Tempo restante: ${timeLeft} segundos`}
              role="img"
            >
              <circle
                className="text-gray-700"
                strokeWidth="5"
                stroke="currentColor"
                fill="transparent"
                r={circleRadius}
                cx="30"
                cy="30"
              />
              <circle
                className="text-cyan-400 transition-stroke duration-500 ease-in-out"
                strokeWidth="5"
                stroke="currentColor"
                fill="transparent"
                r={circleRadius}
                cx="30"
                cy="30"
                strokeDasharray={circleCircumference}
                strokeDashoffset={circleCircumference - progressCircle}
                style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
              />
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="18"
                fill="#00f5d4"
                fontWeight="bold"
              >
                {timeLeft}s
              </text>
            </svg>
          </div>

          <QuizCard
            question={currentQuestion}
            selected={selected}
            feedbackVisible={feedbackVisible}
            onSelectChoice={choose}
            answerIndex={currentQuestion.answerIndex}
          />

          {feedbackVisible && (
            <Feedback
              correct={isCorrect}
              explanation={currentQuestion.explanation}
              sourceName={currentQuestion.sourceName}
              sourceUrl={currentQuestion.sourceUrl}
              onNext={next}
              isLast={isLast}
            />
          )}
        </main>
      )}
    </div>
  );
}
