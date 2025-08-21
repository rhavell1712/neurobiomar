"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ===================== Fundo Animado ===================== */
function ParticleBackground() {
  const [particles, setParticles] = useState<
    { size: number; top: number; left: number; duration: string; delay: string }[]
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map(() => ({
      size: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: (Math.random() * 4 + 3).toFixed(2),
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
        .blink-fast { animation: blink-fast 0.3s ease-in-out 3; }
        @keyframes blink-fast { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
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

/* ===================== Header ===================== */
function Header() {
  return (
    <header className="bg-[#050d1c] border-b border-cyan-800 shadow-md fixed top-0 left-0 w-full z-50" role="banner">
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

/* ===================== Dados das Perguntas ===================== */
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
  // 🌊 Perguntas fáceis (nível 1)
  {
    id: 1,
    image: "/images/quiz-logo.png",
    question: "O estudo da pele dos tubarões inspirou a criação de que tipo de tecnologia?",
    choices: [
      "Roupas esportivas de alta performance",
      "Cabos submarinos",
      "Satélites de comunicação",
      "Energia das marés",
    ],
    answerIndex: 0,
    explanation: "A pele dos tubarões foi estudada para criar tecidos que reduzem atrito e aumentam a performance em esportes aquáticos.",
    sourceName: "Science Daily",
    sourceUrl: "https://www.sciencedaily.com/releases/2020/01/sharkskin.html",
  },
  {
    id: 2,
    image: "/images/quiz-logo.png",
    question: "Qual tecnologia de transporte se inspirou no formato hidrodinâmico dos golfinhos?",
    choices: ["Trens-bala", "Carros híbridos", "Aviões de caça", "Submarinos nucleares"],
    answerIndex: 0,
    explanation: "O design dos trens-bala japoneses foi inspirado na hidrodinâmica dos golfinhos para reduzir ruído e resistência.",
    sourceName: "Japan Railway",
    sourceUrl: "https://www.japanrailway.com/shinkansen-dolphin.html",
  },
  {
    id: 3,
    image: "/images/quiz-logo.png",
    question: "O sonar submarino serviu de base para o desenvolvimento de que exame médico?",
    choices: ["Ultrassonografia", "Ressonância magnética", "Raio-X", "Tomografia computadorizada"],
    answerIndex: 0,
    explanation: "O sonar, usado para detectar objetos no mar, inspirou a tecnologia de ultrassonografia para exames médicos.",
    sourceName: "Harvard Med School",
    sourceUrl: "https://www.health.harvard.edu/ultrasound-history",
  },
  {
    id: 4,
    image: "/images/quiz-logo.png",
    question: "A bioluminescência de alguns organismos marinhos inspirou qual tecnologia?",
    choices: ["Fibras ópticas", "Plásticos biodegradáveis", "Impressoras 3D", "Energia solar"],
    answerIndex: 0,
    explanation: "A capacidade de alguns organismos de emitir luz levou ao estudo de fibras ópticas mais eficientes.",
    sourceName: "MIT Tech Review",
    sourceUrl: "https://www.technologyreview.com/bioluminescence",
  },
  {
    id: 5,
    image: "/images/quiz-logo.png",
    question: "Qual animal marinho inspirou o design de drones subaquáticos mais eficientes?",
    choices: ["Lula", "Golfinho", "Cavalo-marinho", "Baleia-azul"],
    answerIndex: 0,
    explanation: "O movimento das lulas inspirou drones subaquáticos com propulsão eficiente e flexível.",
    sourceName: "Science Robotics",
    sourceUrl: "https://www.sciencerobotics.org/ocean-lula-drone",
  },

  // 🌊 Perguntas moderadas (nível 2)
  {
    id: 6,
    image: "/images/quiz-logo.png",
    question: "A concha do mexilhão inspirou estudos para criar materiais:",
    choices: ["Superaderentes", "Biodegradáveis", "Hidrofóbicos", "Transparentes"],
    answerIndex: 0,
    explanation: "O padrão da concha do mexilhão inspirou materiais com adesão superforte em superfícies molhadas.",
    sourceName: "Nature Materials",
    sourceUrl: "https://www.nature.com/articles/mussel-adhesive",
  },
  {
    id: 7,
    image: "/images/quiz-logo.png",
    question: "Qual descoberta nos recifes de corais contribuiu para a criação de medicamentos contra o câncer?",
    choices: ["Compostos bioativos", "Microalgas verdes", "Bactérias marinhas", "Sal marinho cristalizado"],
    answerIndex: 0,
    explanation: "Corais contêm compostos bioativos estudados para medicamentos oncológicos.",
    sourceName: "Marine Drugs",
    sourceUrl: "https://www.mdpi.com/journal/marinedrugs",
  },
  {
    id: 8,
    image: "/images/quiz-logo.png",
    question: "Qual inovação da engenharia naval foi inspirada na cauda das baleias?",
    choices: ["Hélices mais silenciosas", "Casco de aço reforçado", "Submarinos nucleares", "Sonar passivo"],
    answerIndex: 0,
    explanation: "O estudo da cauda das baleias levou à criação de hélices mais silenciosas e eficientes.",
    sourceName: "Journal of Marine Engineering",
    sourceUrl: "https://www.jme.org/whale-tail-helices",
  },
  {
    id: 9,
    image: "/images/quiz-logo.png",
    question: "O estudo dos polvos contribuiu para o desenvolvimento de:",
    choices: ["Robôs flexíveis", "Vidros à prova de impacto", "Combustíveis renováveis", "Satélites oceanográficos"],
    answerIndex: 0,
    explanation: "A anatomia dos polvos inspirou robôs flexíveis capazes de se adaptar a ambientes complexos.",
    sourceName: "IEEE Robotics",
    sourceUrl: "https://www.ieee.org/octopus-robot",
  },
  {
    id: 10,
    image: "/images/quiz-logo.png",
    question: "O formato dos cardumes de peixes serviu de modelo para qual tecnologia?",
    choices: ["Algoritmos de inteligência artificial", "Células solares", "Carros autônomos", "Impressoras 3D"],
    answerIndex: 0,
    explanation: "Cardumes inspiram algoritmos de IA para otimizar comportamento coletivo e movimentação de robôs.",
    sourceName: "Nature Computational Science",
    sourceUrl: "https://www.nature.com/articles/fish-swarm-algorithms",
  },
  {
    id: 11,
    image: "/images/quiz-logo.png",
    question: "O uso de bactérias marinhas ajudou a desenvolver técnicas para:",
    choices: ["Remediação de petróleo em oceanos", "Energias nucleares limpas", "Construção de submarinos", "Prevenção de tsunamis"],
    answerIndex: 0,
    explanation: "Algumas bactérias ajudam a degradar petróleo, inspirando técnicas de limpeza ambiental.",
    sourceName: "Marine Pollution Bulletin",
    sourceUrl: "https://www.marpolbulletin.org/bacteria-oil",
  },
  {
    id: 12,
    image: "/images/quiz-logo.png",
    question: "Os pinguins-imperadores inspiraram estudos para criar:",
    choices: ["Isolamentos térmicos mais eficientes", "Propulsão a jato", "Satélites meteorológicos", "Novos tipos de aço"],
    answerIndex: 0,
    explanation: "A plumagem e gordura dos pinguins inspiram designs de isolamento térmico eficiente.",
    sourceName: "Journal of Thermal Biology",
    sourceUrl: "https://www.journals.elsevier.com/thermal-biology/penguin",
  },
  {
    id: 13,
    image: "/images/quiz-logo.png",
    question: "Qual tecnologia médica surgiu inspirada nos tentáculos da água-viva?",
    choices: ["Microventosas para cirurgias", "Radioterapia", "Endoscopia", "Vacinas sintéticas"],
    answerIndex: 0,
    explanation: "Tentáculos de água-viva inspiraram microventosas usadas em procedimentos cirúrgicos precisos.",
    sourceName: "Science Translational Medicine",
    sourceUrl: "https://www.sciencemag.org/jellyfish-microhooks",
  },
  {
    id: 14,
    image: "/images/quiz-logo.png",
    question: "O movimento das correntes oceânicas é utilizado em projetos de geração de:",
    choices: ["Energia renovável", "Fertilizantes", "Antibióticos", "Materiais poliméricos"],
    answerIndex: 0,
    explanation: "O estudo das correntes oceânicas inspira projetos de turbinas de energia renovável.",
    sourceName: "Renewable Energy Journal",
    sourceUrl: "https://www.renewableenergyjournal.org/ocean-currents",
  },
  {
    id: 15,
    image: "/images/quiz-logo.png",
    question: "O formato das barbatanas dos peixes ajudou a criar que tipo de inovação?",
    choices: ["Próteses mais eficientes", "Vidros resistentes", "Impressoras a laser", "Turbinas eólicas"],
    answerIndex: 0,
    explanation: "Barbatanas inspiram próteses e designs aerodinâmicos com menor resistência ao movimento.",
    sourceName: "Bioinspiration & Biomimetics",
    sourceUrl: "https://iopscience.iop.org/article/10.1088/fins-prosthetics",
  },

  // 🌊 Perguntas difíceis (nível 3)
  {
    id: 16,
    image: "/images/quiz-logo.png",
    question: "Pesquisas com esponjas-do-mar revelaram compostos utilizados na criação de:",
    choices: ["Medicamentos antivirais", "Combustíveis fósseis", "Ligas metálicas", "Satélites espiões"],
    answerIndex: 0,
    explanation: "Compostos bioativos de esponjas são usados em antivirais e novos medicamentos.",
    sourceName: "Marine Drugs",
    sourceUrl: "https://www.mdpi.com/journal/marinedrugs",
  },
  {
    id: 17,
    image: "/images/quiz-logo.png",
    question: "A proteína encontrada em alguns peixes do Ártico foi utilizada para desenvolver:",
    choices: ["Conservação de órgãos para transplante", "Lentes de contato gelatinosas", "Bioplásticos", "Chips de computador"],
    answerIndex: 0,
    explanation: "Proteínas antifreeze de peixes do Ártico ajudam a conservar órgãos e tecidos para transplantes.",
    sourceName: "Nature",
    sourceUrl: "https://www.nature.com/articles/arctic-fish-protein",
  },
  {
    id: 18,
    image: "/images/quiz-logo.png",
    question: "O estudo das conchas de moluscos levou à criação de que material ultrarresistente?",
    choices: ["Cerâmicas avançadas", "Metais leves", "Borracha sintética", "Grafeno"],
    answerIndex: 0,
    explanation: "O padrão estrutural das conchas inspirou cerâmicas avançadas resistentes a impactos.",
    sourceName: "Science Advances",
    sourceUrl: "https://www.science.org/nautilus-ceramics",
  },
  {
    id: 19,
    image: "/images/quiz-logo.png",
    question: "A aerodinâmica do nariz do trem-bala japonês foi inspirada em qual ave marinha?",
    choices: ["Martim-pescador", "Gaivota", "Albatroz", "Cormorão"],
    answerIndex: 0,
    explanation: "O formato do nariz do trem-bala japonês foi inspirado no martim-pescador para reduzir o ruído.",
    sourceName: "Japan Railway",
    sourceUrl: "https://www.japanrailway.com/shinkansen-bird",
  },
  {
    id: 20,
    image: "/images/quiz-logo.png",
    question: "O estudo do limo marinho ajudou cientistas a criar:",
    choices: ["Adesivos resistentes debaixo d’água", "Biocombustíveis a jato", "Redes de comunicação sem fio", "Novos tipos de vidro"],
    answerIndex: 0,
    explanation: "O limo marinho inspirou adesivos que funcionam em ambientes molhados.",
    sourceName: "Bioinspiration & Biomimetics",
    sourceUrl: "https://iopscience.iop.org/article/marine-adhesives",
  },
  {
    id: 21,
    image: "/images/quiz-logo.png",
    question: "O padrão de caça dos golfinhos, que formam bolhas circulares, inspirou:",
    choices: ["Estratégias de drones militares", "Escafandros mais resistentes", "Redes de pesca sintéticas", "Sistemas de ventilação urbana"],
    answerIndex: 0,
    explanation: "Golfinhos inspiram táticas de drones para cercar e capturar alvos de forma eficiente.",
    sourceName: "Journal of Robotics",
    sourceUrl: "https://www.journalrobotics.org/dolphin-bubble-drone",
  },
  {
    id: 22,
    image: "/images/quiz-logo.png",
    question: "Pesquisas com a carapaça da tartaruga marinha auxiliaram na criação de:",
    choices: ["Capacetes resistentes", "Telas flexíveis", "Supercomputadores", "Placas solares"],
    answerIndex: 0,
    explanation: "A estrutura da carapaça inspirou designs de capacetes com alta resistência a impactos.",
    sourceName: "Journal of Biomimetics",
    sourceUrl: "https://www.journalbiomimetic.org/turtle-shell",
  },
  {
    id: 23,
    image: "/images/quiz-logo.png",
    question: "Os crustáceos mantis shrimp possuem olhos que inspiraram sensores para:",
    choices: ["Câmeras subaquáticas de alta resolução", "Lentes telescópicas espaciais", "Vidros resistentes a impacto", "Satélites de defesa"],
    answerIndex: 0,
    explanation: "A visão complexa do mantis shrimp inspirou sensores de alta resolução em câmeras subaquáticas.",
    sourceName: "Nature Photonics",
    sourceUrl: "https://www.nature.com/articles/mantis-sensors",
  },
  {
    id: 24,
    image: "/images/quiz-logo.png",
    question: "A forma em espiral dos nautilus serviu como base para:",
    choices: ["Submarinos com maior estabilidade", "Satélites meteorológicos", "Aeronaves supersônicas", "Robôs agrícolas"],
    answerIndex: 0,
    explanation: "A espiral natural do nautilus inspira designs de submarinos mais estáveis em correntes.",
    sourceName: "Marine Engineering Journal",
    sourceUrl: "https://www.marineengineering.org/nautilus-submarine",
  },
  {
    id: 25,
    image: "/images/quiz-logo.png",
    question: "O estudo das correntes oceânicas profundas auxiliou no desenvolvimento de:",
    choices: ["Cabos submarinos de internet", "Satélites de comunicação", "GPS global", "Reatores nucleares"],
    answerIndex: 0,
    explanation: "Mapeamento das correntes profundas ajudou a posicionar cabos de internet submarinos de forma eficiente.",
    sourceName: "IEEE Oceanic Engineering",
    sourceUrl: "https://www.ieee.org/submarine-cables",
  },
  {
    id: 26,
    image: "/images/quiz-logo.png",
    question: "Pesquisadores analisando algas marinhas desenvolveram:",
    choices: ["Biocombustíveis sustentáveis", "Tintas anti-incrustantes", "Vidros reforçados", "Redes autônomas de pesca"],
    answerIndex: 0,
    explanation: "Algas marinhas são base para biocombustíveis ecológicos.",
    sourceName: "Renewable Energy Journal",
    sourceUrl: "https://www.renewableenergyjournal.org/algae-biofuel",
  },
  {
    id: 27,
    image: "/images/quiz-logo.png",
    question: "A bioluminescência da lula-vampiro inspirou inovações em:",
    choices: ["Luzes de emergência em submarinos", "Impressoras 3D", "Fibras de carbono", "Painéis solares"],
    answerIndex: 0,
    explanation: "A luz natural da lula-vampiro inspirou sistemas de iluminação subaquática e de emergência.",
    sourceName: "Marine Biotechnology",
    sourceUrl: "https://www.marinebiotech.org/vampire-squid",
  },
  {
    id: 28,
    image: "/images/quiz-logo.png",
    question: "Estudos com esponjas marinhas ajudaram no design de:",
    choices: ["Arranha-céus sustentáveis", "Satélites de órbita baixa", "Carros de corrida", "Vidros blindados"],
    answerIndex: 0,
    explanation: "A estrutura porosa das esponjas inspira construções sustentáveis e resistentes.",
    sourceName: "Bioinspiration & Biomimetics",
    sourceUrl: "https://iopscience.iop.org/article/sponges-architecture",
  },
  {
    id: 29,
    image: "/images/quiz-logo.png",
    question: "O casco das baleias jubarte inspirou o design de:",
    choices: ["Turbinas eólicas mais eficientes", "Computadores quânticos", "Aviões de caça", "Capacitores elétricos"],
    answerIndex: 0,
    explanation: "A forma do casco ajuda a melhorar o fluxo de ar e eficiência em turbinas eólicas.",
    sourceName: "Renewable Energy Engineering",
    sourceUrl: "https://www.renewableengineering.org/whale-turbines",
  },
  {
    id: 30,
    image: "/images/quiz-logo.png",
    question: "O comportamento migratório das tartarugas marinhas influenciou sistemas de:",
    choices: ["Navegação por satélite", "Hidrelétricas", "Reatores nucleares", "Sensores de calor"],
    answerIndex: 0,
    explanation: "O estudo da migração das tartarugas ajudou no desenvolvimento de sistemas precisos de navegação.",
    sourceName: "Journal of Animal Tracking",
    sourceUrl: "https://www.animaltracking.org/turtle-navigation",
  },
];


/* ===================== Barra de Progresso ===================== */
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

/* ===================== Card da Pergunta ===================== */
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
      className="bg-[#0a1a2fcc] backdrop-blur-md rounded-xl shadow-lg border-2 border-teal-400 shadow-teal-400/50 w-full max-w-3xl transition-transform duration-300 ease-out hover:scale-105"
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

          const blinkClass = feedbackVisible && (isCorrect || isSelected) ? "blink-fast" : "";

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

/* ===================== Feedback ===================== */
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
      className="p-6 bg-white/10 border-t border-teal-400 mt-4 rounded-b-lg text-white max-w-3xl mx-auto animate-fadeIn"
      aria-live="assertive"
      role="region"
      aria-label="Feedback da resposta"
      style={{ minHeight: "140px" }}
    >
      <p className="font-semibold text-lg">{correct ? "Correto! 🎉" : "Resposta incorreta 😅"}</p>
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
        className="mt-4 bg-teal-500 px-4 py-2 rounded-md font-semibold hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition transform hover:scale-105"
        type="button"
      >
        {isLast ? "Ver resultado" : "Próxima"}
      </button>
    </section>
  );
}

/* ===================== Feedback Final ===================== */
function FinalFeedback({ score, total, onRestart }: { score: number; total: number; onRestart: () => void }) {
  const pct = score / total;
  let message = "Continue tentando! Você chega lá! 💪";
  if (pct === 1) message = "Perfeito! 🏆";
  else if (pct >= 0.7) message = "Excelente! ⭐";
  else if (pct >= 0.5) message = "Bom trabalho! 👍";

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center max-w-4xl mx-auto animate-fadeIn">
      <h2 className="text-5xl text-cyan-300 font-bold mb-6">Quiz concluído!</h2>
      <p className="text-4xl text-white mb-4">
        Você acertou {score} de {total}
      </p>
      <p className="text-3xl text-cyan-200 mb-8">{message}</p>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs justify-center">
        <button
          onClick={onRestart}
          className="bg-cyan-500 px-6 py-3 rounded-md font-semibold hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition transform hover:scale-105"
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

/* ===================== Componente Principal ===================== */
export default function QuizPage() {
  const [loading, setLoading] = useState(true);
  const [progressLoad, setProgressLoad] = useState(0);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /* Loading inicial animado */
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

  /* Timer para cada questão */
  useEffect(() => {
    setTimeLeft(15);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleTimeout();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [index]);

  /* Selecionar resposta */
  const choose = (i: number) => {
    if (feedbackVisible) return;
    setSelected(i);
    if (i === currentQuestion.answerIndex) setScore((s) => s + 1);
    setFeedbackVisible(true);
    clearInterval(timerRef.current!);
    setTimeout(next, 1200);
  };

  /* Quando o tempo zerar */
  const handleTimeout = () => {
    if (feedbackVisible) return;
    setSelected(null);
    setFeedbackVisible(true);
    setTimeout(next, 1200);
  };

  /* Próxima pergunta */
  const next = () => {
    setFeedbackVisible(false);
    setSelected(null);
    if (isLast) setDone(true);
    else setIndex((i) => i + 1);
  };

  /* Reiniciar quiz */
  const restart = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFeedbackVisible(false);
    setDone(false);
  };

  const circleRadius = 26;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progressCircle = (timeLeft / 15) * circleCircumference;

  return (
    <div className="relative min-h-screen text-white bg-gradient-to-b from-[#050d1c] to-[#0a1a2f] flex flex-col">
      <ParticleBackground />
      <Header />
      <div className="h-20" />

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
            <div className="h-full bg-cyan-400 transition-all" style={{ width: `${progressLoad}%` }} />
          </div>
        </div>
      ) : done ? (
        <FinalFeedback score={score} total={questions.length} onRestart={restart} />
      ) : (
        <main className="flex flex-col items-center justify-start max-w-3xl mx-auto p-4 w-full flex-grow">
          <ProgressBar currentIndex={index} total={questions.length} />

          {/* Temporizador com círculo */}
          <div className="mb-6 flex items-center justify-center">
            <svg className="w-16 h-16" viewBox="0 0 60 60" aria-label={`Tempo restante: ${timeLeft} segundos`} role="img">
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
                className={`transition-stroke duration-500 ease-in-out`}
                strokeWidth="5"
                stroke={timeLeft > 10 ? "#00f5d4" : timeLeft > 5 ? "#facc15" : "#f87171"}
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
