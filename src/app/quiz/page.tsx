"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

/* 
  Fundo animado com partículas flutuantes (bolinhas)
  - Fundo azul escuro com gradiente
  - Partículas com animação vertical contínua
  - Fica FIXO no fundo da página, atrás de todo conteúdo
*/
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

/* 
  Header fixo no topo
  - Fundo azul escuro, borda inferior ciano
  - Logo redonda + título com cores personalizadas
  - Link para voltar à página de jogos, visível em md+
*/
function Header() {
  return (
    <header
      className="bg-[#050d1c] border-b border-cyan-800 shadow-md fixed top-0 left-0 w-full z-50"
      role="banner"
    >
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <img
          src="/neurobiomar.jpg"
          alt="Logo NeuroBioMar"
          className="w-10 h-10 rounded-full border border-cyan-400"
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

/* 
  Array com 3 perguntas para testes
*/
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

/* 
  Barra de progresso que mostra a posição atual no quiz
  - currentIndex: índice atual (zero-based)
  - total: total de perguntas
*/
function ProgressBar({ currentIndex, total }: { currentIndex: number; total: number }) {
  const progressPercent = useMemo(() => ((currentIndex + 1) / total) * 100, [currentIndex, total]);
  return (
    <div className="mb-4" aria-label={`Pergunta ${currentIndex + 1} de ${total}`}>
      {/* Barra cinza de fundo */}
      <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden">
        {/* Barra ciano representando progresso */}
        <div
          className="h-full bg-cyan-400 transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      {/* Texto do progresso */}
      <p className="text-cyan-300 mt-1 text-sm font-medium">{`Pergunta ${currentIndex + 1} de ${total}`}</p>
    </div>
  );
}

/* 
  Card da pergunta e alternativas
  - Fundo azul escuro translúcido para combinar com o site e destacar texto branco
  - Borda e sombra verde água para dar destaque
  - Imagem da pergunta com texto sobreposto em branco e sombra para melhor leitura
  - Botões de alternativas estilizados com foco e cores conforme feedback
*/
function QuizCard({
  question,
  selected,
  feedbackVisible,
  onSelectChoice,
}: {
  question: Question;
  selected: number | null;
  feedbackVisible: boolean;
  onSelectChoice: (choiceIndex: number) => void;
}) {
  return (
    <article
      className="bg-[#0a1a2fcc] backdrop-blur-md rounded-xl shadow-lg
                 border-2 border-teal-400 shadow-teal-400/50"
      aria-live="polite"
    >
      {/* Imagem da pergunta */}
      <div className="relative w-full h-56">
        <Image
          src={question.image}
          alt={`Imagem relacionada à pergunta: ${question.question}`}
          fill
          className="object-cover rounded-t-xl"
        />
        {/* Gradiente para escurecer a parte inferior da imagem */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl" />
        {/* Texto da pergunta */}
        <h2 className="absolute bottom-4 left-4 right-4 text-white text-xl font-bold drop-shadow-lg">
          {question.question}
        </h2>
      </div>

      {/* Alternativas */}
      <div className="p-6 grid gap-4">
        {question.choices.map((choice, i) => {
          const isCorrect = i === question.answerIndex;
          const isSelected = selected === i;
          const base =
            "p-3 rounded-lg text-left border transition focus:outline-none focus:ring-2 font-medium";

          // Estilos para alternativas, variando se feedback está visível e se alternativa é correta/selecionada
          const cls = feedbackVisible
            ? isCorrect
              ? `${base} border-teal-400 bg-teal-600 bg-opacity-70 text-white focus:ring-teal-400`
              : isSelected
              ? `${base} border-red-500 bg-red-600 bg-opacity-70 text-white focus:ring-red-400`
              : `${base} border-gray-600 bg-white/10 text-white`
            : `${base} border-teal-400 bg-white/10 text-white hover:bg-teal-500 hover:bg-opacity-70 hover:border-teal-400 focus:ring-teal-400`;

          return (
            <button
              key={i}
              onClick={() => onSelectChoice(i)}
              disabled={feedbackVisible}
              className={cls}
              aria-pressed={isSelected}
              aria-disabled={feedbackVisible}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </article>
  );
}

/* 
  Feedback após responder pergunta
  - Mostra se acertou ou errou
  - Explicação da resposta correta
  - Fonte da informação
  - Botão para próxima pergunta ou ver resultado final
*/
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
      className="p-4 bg-white/10 border-t border-teal-400 mt-4 rounded-b-lg text-white"
      aria-live="assertive"
      role="region"
      aria-label="Feedback da resposta"
    >
      <p className="font-semibold text-lg">{correct ? "Correto! 😊" : "Resposta incorreta."}</p>
      <p className="mt-2">{explanation}</p>
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-300 underline mt-2 block"
      >
        Fonte: {sourceName}
      </a>
      <button
        onClick={onNext}
        className="mt-4 bg-teal-500 px-4 py-2 rounded-md font-semibold hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
      >
        {isLast ? "Ver resultado" : "Próxima"}
      </button>
    </section>
  );
}

/* 
  Componente principal da página
  - Controla o estado do quiz: carregando, pergunta atual, seleção, feedback e fim
  - Exibe barra de progresso, card da pergunta, feedback e tela final
*/
export default function QuizPage() {
  const [loading, setLoading] = useState(true);
  const [progressLoad, setProgressLoad] = useState(0);

  const [index, setIndex] = useState(0); // índice da pergunta atual
  const [selected, setSelected] = useState<number | null>(null); // alternativa selecionada
  const [feedbackVisible, setFeedbackVisible] = useState(false); // feedback visível
  const [score, setScore] = useState(0); // acertos
  const [done, setDone] = useState(false); // quiz finalizado

  // Simula loading inicial com barra de progresso animada
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

  // Função para escolher alternativa
  const choose = (i: number) => {
    if (feedbackVisible) return;
    setSelected(i);
    if (i === currentQuestion.answerIndex) setScore((s) => s + 1);
    setFeedbackVisible(true);
  };

  // Passar para próxima pergunta ou finalizar
  const next = () => {
    setFeedbackVisible(false);
    setSelected(null);
    if (isLast) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
    }
  };

  // Reiniciar o quiz
  const restart = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFeedbackVisible(false);
    setDone(false);
  };

  // Mensagem final de acordo com desempenho
  const finalMessage = useMemo(() => {
    const pct = score / questions.length;
    if (pct === 1) return "Perfeito! 🏆";
    if (pct >= 0.7) return "Excelente! ⭐";
    if (pct >= 0.5) return "Bom trabalho! 👍";
    return "Continue tentando! Você chega lá! 💪";
  }, [score]);

  return (
    <div className="relative min-h-screen text-white bg-gradient-to-b from-[#050d1c] to-[#0a1a2f]">
      {/* Fundo das partículas flutuantes */}
      <ParticleBackground />

      {/* Cabeçalho fixo */}
      <Header />
      {/* Espaço para o header fixo */}
      <div className="h-20" />

      {/* Se estiver carregando, mostra loading */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <img
            src="/neurobiomar.jpg"
            alt="logo"
            className="w-20 h-20 rounded-full border-cyan-400 mb-6 animate-spin"
            loading="lazy"
            width={80}
            height={80}
          />
          <p className="text-cyan-400 text-lg font-semibold">
            Carregando Quiz... {progressLoad}%
          </p>
          <div className="w-full max-w-xs h-2 bg-gray-700 rounded-full overflow-hidden mt-4">
            <div
              className="h-full bg-cyan-400 transition-all"
              style={{ width: `${progressLoad}%` }}
            />
          </div>
        </div>
      ) : done ? (
        // Tela final do quiz
        <main className="max-w-3xl mx-auto p-6 text-center">
          <h2 className="text-3xl text-cyan-300 font-bold mb-4">Quiz concluído!</h2>
          <p className="text-2xl text-white mb-3">
            Você acertou {score} de {questions.length}
          </p>
          <p className="text-xl text-cyan-200 mb-6">{finalMessage}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={restart}
              className="bg-cyan-500 px-5 py-2 rounded-md font-semibold hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Jogar de novo
            </button>
            <Link
              href="/games"
              className="px-5 py-2 rounded-md border border-cyan-400 hover:bg-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Voltar aos jogos
            </Link>
          </div>
        </main>
      ) : (
         // Tela principal com pergunta, alternativas e barra de progresso
        <main className="max-w-3xl mx-auto p-6" role="main">
          <ProgressBar currentIndex={index} total={questions.length} />
          <QuizCard
            question={currentQuestion}
            selected={selected}
            feedbackVisible={feedbackVisible}
            onSelectChoice={choose}
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
