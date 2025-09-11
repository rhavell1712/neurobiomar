"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import Header from "../../_components/header/header";

function ParticleBackground() {
  const [particles, setParticles] = useState<
    {
      size: number;
      top: number;
      left: number;
      duration: string;
      delay: string;
    }[]
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map(() => ({
      size: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: (Math.random() * 1 + 1).toFixed(2),
      delay: (Math.random() * 5).toFixed(2),
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <>
      <style>{`
        .particle-container {
          position: fixed;
          top: 0; left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          overflow: hidden;
          z-index: -10;
          background: linear-gradient(to bottom, #050d1c, #0a1a2f);
        }
        .particle {
          position: absolute;
          background: #00f5d4;
          border-radius: 50%;
          opacity: 0.6;
          animation-name: float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }
      `}</style>

      <div className="particle-container">
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: p.size + "px",
              height: p.size + "px",
              top: p.top + "%",
              left: p.left + "%",
              animationDuration: p.duration + "s",
              animationDelay: p.delay + "s",
            }}
          />
        ))}
      </div>
    </>
  );
}

export default function Blog() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return oldProgress + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [loading]);

  const articles = [
    {
      title: "Robôs submarinos em cardume: inspirados em peixes para explorar e monitorar oceanos",
      description:
        "Pesquisadores da Harvard SEAS desenvolveram o Bluebot, um robô subaquático que imita o comportamento de cardume de peixes por meio de LEDs e câmeras de visão artificial. Em vez de coordenar a movimentação centralmente, cada robô reage ao que vê nos vizinhos, permitindo comportamentos coletivos autônomos, como agregação, dispersão e formação de círculos. Essa tecnologia descentralizada visa futura aplicação em ambientes frágeis como recifes de coral para monitoramento ambiental e exploração de maneira menos invasiva e mais eficiente",
      image: "/images/peixe1.jpg",
      a: "https://seas.harvard.edu/news/2021/01/robotic-swarm-swims-school-fish",
      sourceName: "Leah Burrows – Harvard SEAS",
    },
    {
      title: "Caracol marinho inspira robô que pode limpar oceanos",
      description:
        "Pesquisadores da Universidade da Califórnia, Davis (UC Davis), criaram um protótipo de robô inspirado no caracol-de-maçã havaiano (Pomacea canaliculata). Esse robô utiliza um mecanismo ondulante semelhante ao movimento do pé do caracol para criar correntes na água, ideal para coletar microplásticos da superfície de oceanos, rios e lagos. A solução é uma alternativa inovadora aos métodos tradicionais de limpeza, como redes de arrasto, especialmente eficiente para partículas minúsculas.",
      image: "/images/caracol.jpg",
      a: "https://www.terra.com.br/byte/caracol-marinho-inspira-robo-que-pode-limpar-oceanos,562956446f4f3186f91a0139be562bdewekybw5c.html",
      sourceName: "Universidade da Califórnia",
    },
    {
      title: "Águas-vivas biônicas: tecnologia inspirada na natureza para explorar os oceanos",
      description:
        "Pesquisadores da Caltech desenvolveram águas-vivas biônicas que combinam estruturas naturais com engenharia de ponta para explorar os oceanos de forma mais eficiente e sustentável. Essas criaturas artificiais foram projetadas para nadar como águas-vivas reais, aproveitando sua biomecânica para consumir menos energia durante o deslocamento subaquático. A inovação pode ser usada no futuro para coletar dados de ecossistemas marinhos frágeis sem causar distúrbios ambientais, além de contribuir para a pesquisa em robótica suave e bioengenharia.",
      image: "/images/agua-viva.jpg",
      a: "https://www.caltech.edu/about/news/building-bionic-jellyfish-for-ocean-exploration",
      sourceName: "Caltech (Instituto de Tecnologia da Califórnia)",
    },
    {
      title: "Drones Subaquáticos: Explore os Mistérios do Oceano Hoje!",
      description:
        "Os drones subaquáticos, também conhecidos como ROVs (Remotely Operated Vehicles), vêm transformando a topografia e a exploração de ambientes aquáticos. Inspirados nos movimentos de peixes, lulas e outros organismos marinhos, esses equipamentos são projetados para navegar com eficiência e agilidade em locais de difícil acesso, minimizando impactos ambientais.Equipados com câmeras de alta resolução, sensores de profundidade e sistemas de navegação avançados, os drones subaquáticos permitem mapeamentos precisos do fundo marinho, inspeções de estruturas submersas e monitoramento ambiental. Sua integração com tecnologias como GNSS e softwares de modelagem 3D possibilita a criação de modelos digitais detalhados, facilitando análises e decisões em engenharia, pesquisa científica e conservação ambiental.",
      image: "/images/Drones-subaquaticos-2-1024x594.jpg",
      a: "https://ibtopografia.com/blog/tecnologia-e-inovacao-na-topografia/drones-subaquaticos/",
      sourceName: "Instituto Brasileiro de Topografia",
    },
     {
      title: "Cientistas revelam tecnologia vestível inspirada em estrelas do mar para monitoramento cardíaco",
      description:
        "Pesquisadores da Universidade do Missouri criaram um dispositivo vestível inovador, inspirado no formato de uma estrela-do-mar. Com cinco “braços” flexíveis de sensores, ele é capaz de registrar ao mesmo tempo os sinais elétricos (ECG) e mecânicos do coração, garantindo precisão mesmo quando o usuário está em movimento. com apoio da inteligência artificial, o sistema identificou doenças como fibrilação atrial, infarto e insuficiência cardíaca com acerto superior a 90%. O estudo, publicado em abril de 2025 na Science Advances, vem sendo amplamente destacado, apontando para um futuro em que acompanhar a saúde do coração será cada vez mais prático e confiável.",
      image: "/images/estrela-do-mar-blog.jpg",
      a: "https://engineering.missouri.edu/2025/scientists-unveil-starfish-inspired-wearable-tech-for-heart-monitoring/?utm_source=chatgpt.com",
      sourceName: "Universidade de Missouri",
    },
    {
      title: "Da Jubarte às Turbinas: Como a Biologia Marinha Inspira a Energia Eólica",
      description:
        "Segundo o perfil institucional do Prof. Frank Fish, na West Chester University (WCU-PA), ele atua como professor de Biologia e desenvolve pesquisas nas áreas de locomção aquática e aplicações biomiméticas — além de ser presidente da WhalePower Corporation, empresa que explora a tecnologia inspirada nos tubérculos das barbatanas de jubarte para turbinas, ventiladores, bombas e compressores. Em sua página de pesquisa na WCU, são mencionados testes com túneis de vento, modelos biomiméticos e diversas aplicações em engenharia (eólicas, ventilação, surfboards, submarinos), evidenciando o potencial prático dessa inovação. E um estudo publicado na revista Integrative and Comparative Biology (2011) comprova que os tubérculos das barbatanas atuam como controle passivo de fluxo, atrasando a estol, aumentando a sustentação e reduzindo o arrasto — com viabilidade para uso em turbinas, ventiladores, aeronaves e embarcações",
      image: "/images/jubarte-eolica.webp",
      a: "https://www.wcupa.edu/sciences-mathematics/biology/fFish/research.aspx",
      sourceName: "West Chester University (WCU)",
    },
    {
      title: "Lagosta-Boxeadora Inspira Materiais Militares Ultra-Resistentes",
      description:
        "Embora popularmente chamada de “lagosta-boxeadora”, o crustáceo estudado para o desenvolvimento de materiais resistentes e armaduras militares é na verdade o camarão-louva-a-deus (Odontodactylus scyllarus). Este pequeno predador do Indo-Pacífico é famoso por desferir golpes extremamente rápidos e potentes, além de possuir uma carapaça capaz de suportar enormes impactos. Pesquisadores de universidades renomadas, como a Universidade da Califórnia, Riverside, estudaram a estrutura única de suas patas e carapaça para criar materiais compostos mais leves e resistentes, com aplicações em armaduras, capacetes e outros equipamentos militares. A descrição científica correta evita confusões com a lagosta comum, que não possui essas características extraordinárias.",
      image: "/images/super_imglagosta_boxeadora.webp",
      a: "https://www.universityofcalifornia.edu/news/mantis-shrimp-stronger-airplanes?utm_source=chatgpt.com",
      sourceName: "Universidade da Califirnia, Riverside",
    },
    {
      title: "LATAM investe em tecnologia inspirada em tubarões que pode evitar até 6 mil toneladas de emissões",
      description:
        "A LATAM Airlines implementou a tecnologia AeroSHARK em seus aviões Boeing 777, uma inovação inspirada nas escamas de tubarão. Essa camada biônica reduz o atrito entre a aeronave e o ar, melhorando a aerodinâmica e diminuindo o consumo de combustível. A iniciativa pode evitar até 6 mil toneladas de CO₂ por ano, contribuindo para a meta da companhia de zerar suas emissões líquidas até 2050. Esse exemplo mostra como a bioinspiração marinha pode gerar soluções práticas e sustentáveis na aviação.",
      image: "/images/latam-blog.jpg",
      a: "https://exame.com/esg/latam-investe-em-tecnologia-inspirada-em-tubaroes-que-pode-evitar-ate-6-mil-toneladas-de-emissoes/",
      sourceName: "ESG (Environmental, Social and Governance)",
    },
    {
      title: "Água-viva robótica: tecnologia inspirada no oceano para limpar detritos marinhos",
      description:
        "Pesquisadores do Instituto Max Planck desenvolveram uma água-viva robótica capaz de flutuar no oceano e gerar correntes de água que atraem e capturam detritos, como máscaras e luvas descartadas, sem tocá-los diretamente. Inspirada no movimento natural das águas-vivas, essa tecnologia oferece uma solução sustentável para limpar áreas delicadas, como recifes de corais, sem danificar o ecossistema. É um exemplo de como a bioinspiração marinha pode gerar inovações práticas e ecológicas.",
      image: "/images/agua-viva2- blog.jpg",
      a: "https://epocanegocios.globo.com/tecnologia/noticia/2023/04/cientistas-criam-agua-viva-robotica-que-consegue-sugar-detritos-do-oceano-sem-toca-los.ghtml",
      sourceName: "Instituto Max Planck",
    },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <ParticleBackground />
      <Header/>

      {loading ? (
        <div
          className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#050d1c] to-[#0a1a2f] text-white px-4"
          data-aos="fade-in"
        >
          <Image
            src="/neurobiomar.jpg"
            alt="Logo"
            width={80}  // w-20 = 20*4=80px
            height={80}
            className="rounded-full border border-cyan-400 shadow-lg mb-6"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          />
          <p
            className="text-lg text-cyan-400 font-semibold mb-2"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Carregando... {progress}%
          </p>
          <div
            className="w-full max-w-xs h-2 bg-gray-700 rounded-full overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div
              className="h-full bg-cyan-400 transition-all duration-200 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <>

          {/* Conteúdo principal */}
          <main className="pt-24 px-6 pb-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(({ title, description, image, a, sourceName }, i) => (
              <article
                key={i}
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg border border-cyan-600 overflow-hidden
                cursor-pointer
                transition-transform duration-300
                hover:scale-[1.03] hover:shadow-2xl
                focus:scale-[1.03] focus:shadow-2xl
                active:scale-[1.02] active:shadow-xl
                flex flex-col"
                tabIndex={0}
                data-aos="zoom-in"
              >
                <div className="relative w-full h-48 md:h-56 shadow-lg rounded-t-xl overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={i === 0}
                  />
                  {/* Overlay degradê do preto para transparente na parte inferior */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-20
                    bg-gradient-to-t from-black/70 to-transparent"
                  />
                  {/* Título sobre o degradê */}
                  <h2
                    className="absolute bottom-3 left-3 right-3 text-white text-lg md:text-xl font-bold
                    drop-shadow-lg"
                  >
                    {title}
                  </h2>
                </div>
                {/* Conteúdo e link fixados no final do card */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-black flex-1 mb-4">{description}</p>
                  {/* Link externo correto em <a> */}
                  <Link
                    href={a}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-500 hover:text-cyan-300 font-semibold mt-auto"
                    aria-label={`Leia o artigo original: ${title}`}
                  >
                    Fonte: {sourceName} ↗
                  </Link>
                </div>
              </article>
            ))}
          </main>
        </>
      )}
    </div>
  );
}
