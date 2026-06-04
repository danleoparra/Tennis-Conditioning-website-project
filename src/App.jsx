import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Activity,
  Footprints,
  Target,
  CalendarDays,
  Phone,
  Stethoscope,
  Zap,
  Search,
  ShoppingBag,
} from "lucide-react";

const contactNumber = "+14708367932";
const whatsappLink = `https://wa.me/${contactNumber.replace(/[^0-9]/g, "")}`;

const sections = [
  { id: "home", label: "Início" },
  { id: "about", label: "Sobre" },
  { id: "warmup", label: "Aquecimento" },
  { id: "sessions", label: "Treinos" },
  { id: "library", label: "Biblioteca" },
  { id: "purchases", label: "Compras" },
  { id: "injury", label: "Prevenção" },
  { id: "progression", label: "Plano" },
  { id: "contact", label: "Contato" },
];

const capacities = [
  {
    icon: <Target className="w-5 h-5" />,
    title: "Coordenação",
    text: "Capacidade de organizar movimentos com precisão, ritmo e controle corporal durante deslocamentos, golpes e mudanças de direção.",
    accent: "#B8F400",
  },
  {
    icon: <Activity className="w-5 h-5" />,
    title: "Flexibilidade",
    text: "Amplitude de movimento necessária para executar golpes com eficiência, reduzir compensações e melhorar a mobilidade articular.",
    accent: "#00D4AA",
  },
  {
    icon: <Dumbbell className="w-5 h-5" />,
    title: "Força / potência",
    text: "Base para gerar aceleração, estabilidade, impulsão e transferência eficiente de força entre membros inferiores, tronco e membros superiores.",
    accent: "#FF6B35",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Velocidade",
    text: "Capacidade de reagir, acelerar, frear e reposicionar-se rapidamente durante rallies e situações de alta exigência em quadra.",
    accent: "#A78BFA",
  },
  {
    icon: <Footprints className="w-5 h-5" />,
    title: "Resistência aeróbica",
    text: "Capacidade de sustentar o esforço global da sessão e recuperar melhor entre pontos, games e séries de exercícios.",
    accent: "#38BDF8",
  },
  {
    icon: <Activity className="w-5 h-5" />,
    title: "Resistência anaeróbica",
    text: "Capacidade de repetir esforços intensos e curtos, como arrancadas, mudanças de direção e sequências explosivas de golpes.",
    accent: "#F472B6",
  },
  {
    icon: <Stethoscope className="w-5 h-5" />,
    title: "Recuperação",
    text: "Processo essencial para adaptação ao treinamento, controle de fadiga, prevenção de sobrecarga e manutenção da performance.",
    accent: "#FACC15",
  },
];

const sessionTemplates = [
  {
    level: "Resistência aeróbica",
    tag: "30–45 min",
    focus:
      "Melhorar a capacidade de sustentar o esforço global da sessão e acelerar a recuperação entre pontos e exercícios.",
    blocks: [
      "5–8 min de aquecimento progressivo",
      "20–30 min de corrida leve, bike, corda leve ou deslocamento contínuo",
      "Controle de intensidade em esforço leve a moderado",
      "Finalização com mobilidade e respiração controlada",
    ],
  },
  {
    level: "Resistência anaeróbica",
    tag: "15–25 min",
    focus:
      "Desenvolver a capacidade de repetir esforços curtos e intensos com recuperação incompleta, semelhante às demandas do tênis.",
    blocks: [
      "Séries curtas de 10–30 segundos em alta intensidade",
      "Mudanças de direção com pausas incompletas",
      "Intervalos em padrão de rally",
      "Controle da técnica mesmo sob fadiga",
    ],
  },
  {
    level: "Footwork",
    tag: "20–30 min",
    focus:
      "Melhorar deslocamento, ajuste fino dos pés, split step, recuperação lateral e posicionamento para golpear.",
    blocks: [
      "Split step + reação",
      "Passos laterais e cruzados",
      "Ajustes curtos antes do golpe",
      "Recuperação para o centro da quadra",
    ],
  },
  {
    level: "Coordenação",
    tag: "15–25 min",
    focus:
      "Aprimorar ritmo, controle corporal, dissociação entre membros e organização motora durante exercícios específicos.",
    blocks: [
      "Sequências com escada de agilidade",
      "Exercícios com bola e deslocamento",
      "Coordenação entre braços, tronco e pernas",
      "Progressão de simples para complexo",
    ],
  },
  {
    level: "Potência",
    tag: "20–35 min",
    focus:
      "Aumentar a capacidade de produzir força rapidamente em arrancadas, saltos, golpes e mudanças de direção.",
    blocks: [
      "Saltos controlados",
      "Arremessos com bola medicinal",
      "Arrancadas curtas",
      "Ênfase em qualidade, velocidade e recuperação adequada",
    ],
  },
  {
    level: "Velocidade",
    tag: "15–25 min",
    focus:
      "Melhorar reação, aceleração, frenagem e reposicionamento rápido em situações específicas de jogo.",
    blocks: [
      "Estímulos visuais ou sonoros",
      "Sprints curtos de 3–10 metros",
      "Frenagem e mudança de direção",
      "Recuperação completa para manter alta qualidade",
    ],
  },
];

const exerciseLibrary = [
  {
    category: "Agilidade",
    title: "Split step + recuperação lateral",
    objective: "Melhorar reação, equilíbrio e retorno rápido à posição de jogo.",
    level: "Intermediário / Avançado",
  },
  {
    category: "Força",
    title: "Agachamento controlado",
    objective:
      "Desenvolver força de membros inferiores e controle de joelho e quadril.",
    level: "Intermediário",
  },
  {
    category: "Prevenção",
    title: "Controle escapular com elástico",
    objective:
      "Aumentar estabilidade do ombro para suportar volume de golpes e saques.",
    level: "Todos os níveis",
  },
  {
    category: "Resistência",
    title: "Intervalos curtos em quadra",
    objective:
      "Simular esforços repetidos do tênis com recuperação incompleta.",
    level: "Avançado / Alto rendimento",
  },
  {
    category: "Resistência aeróbica",
    title: "30 minutos de exercício aeróbico contínuo",
    objective:
      "Manter esforço leve a moderado por 30 minutos, buscando aproximadamente 60–70% da frequência cardíaca máxima e controle da respiração.",
    level: "Intermediário / Avançado",
    image: "/images/aerobico-30min.png",
  },
];

const recommendedPurchases = [
  {
    category: "Aquecimento",
    title: "Corda de pular ajustável",
    reason:
      "Útil para ativação geral, coordenação, ritmo de pés e preparação cardiovascular antes do treino em quadra.",
    priority: "Essencial",
  },
  {
    category: "Mobilidade",
    title: "Mini bands / faixas elásticas",
    reason:
      "Indicadas para ativação de quadril, estabilidade de joelho, controle escapular e exercícios preventivos de baixa carga.",
    priority: "Essencial",
  },
  {
    category: "Agilidade",
    title: "Cones ou marcadores de quadra",
    reason:
      "Facilitam exercícios de deslocamento, mudança de direção, desaceleração e padrões específicos do tênis.",
    priority: "Opcional",
  },
  {
    category: "Potência",
    title: "Bola medicinal",
    reason:
      "Indicada para exercícios de potência, arremessos, rotação de tronco e transferência de força para padrões explosivos do tênis.",
    priority: "Recomendado",
  },
];

const purchaseLinks = [
  {
    title: "Kit 20 itens para treino",
    description:
      "Kit com acessórios úteis para aquecimento, elasticidade, coordenação, ativação e exercícios gerais de condicionamento.",
    url: "https://www.mercadolivre.com.br/acessorios-esportivos-kit-20-itens-treino-leeboom-exercicios-elasticos-corda-de-plar-faixa-elastica-mini-band-12niveis-primemix/p/MLB27199661?pdp_filters=item_id:MLB3798123931",
  },
  {
    title: "Fortalecedor de punho e antebraço",
    description:
      "Opção complementar para fortalecimento progressivo de punho e antebraço, útil para jogadores com alta demanda de empunhadura.",
    url: "https://www.mercadolivre.com.br/fortalecedor-de-punho-e-antebraco-hand-grip-resistncia-ajustavel-5kg-a-60kg/p/MLB25856438#polycard_client=search_best-seller-categories&tracking_id=a9b78eec-e4ab-4b98-b3c5-d6b6c42e88f9&wid=MLB4724374467&sid=search",
  },
];

const injuryCards = [
  {
    title: "Ombro",
    content:
      "Fortalecimento do manguito rotador, controle escapular, mobilidade torácica e progressão gradual do volume de saques.",
    num: "01",
  },
  {
    title: "Cotovelo e punho",
    content:
      "Controle da carga de empunhadura, fortalecimento do antebraço e aumento progressivo do tempo de treino com raquete.",
    num: "02",
  },
  {
    title: "Joelho e tornozelo",
    content:
      "Treino de aterrissagem, desaceleração, equilíbrio unilateral, panturrilha e controle multidirecional.",
    num: "03",
  },
  {
    title: "Coluna lombar",
    content:
      "Mobilidade de quadril, estabilidade do tronco, força anti-rotação e redução de compensações durante golpes potentes.",
    num: "04",
  },
];

const progression = [
  {
    week: "Etapa 1",
    goal: "Avaliação e base",
    load: "Identificar nível físico, limitações, assimetrias e tolerância inicial ao treino.",
  },
  {
    week: "Etapa 2",
    goal: "Construção",
    load: "Desenvolver força, mobilidade, coordenação e resistência básica específica.",
  },
  {
    week: "Etapa 3",
    goal: "Intensificação",
    load: "Aumentar velocidade, potência, volume e complexidade dos exercícios em quadra.",
  },
  {
    week: "Etapa 4",
    goal: "Performance",
    load: "Integrar o condicionamento aos padrões reais de jogo e controlar a carga semanal.",
  },
];

const warmupSteps = [
  {
    num: "01",
    label: "Ativação geral",
    desc: "3–5 min de caminhada rápida, corrida leve ou corda para elevar a temperatura corporal e preparar o sistema cardiovascular.",
    image: "/images/corda.png",
  },
  {
    num: "02",
    label: "Alongamento",
    desc: "Alongamentos dinâmicos para preparar músculos e articulações antes dos deslocamentos e golpes em quadra.",
    image: "/images/alongamento.png",
  },
  {
    num: "03",
    label: "Mobilidade articular",
    desc: "Movimentos controlados para tornozelos, quadris, coluna torácica, ombros, cotovelos e punhos.",
    image: "/images/mobilidade.png",
  },
];

const categoryColors = {
  Agilidade: { bg: "#B8F40022", text: "#7AAA00", border: "#B8F40055" },
  Força: { bg: "#00D4AA22", text: "#009980", border: "#00D4AA55" },
  Prevenção: { bg: "#FF6B3522", text: "#CC4400", border: "#FF6B3555" },
  Resistência: { bg: "#A78BFA22", text: "#7C5FD4", border: "#A78BFA55" },
  "Resistência aeróbica": { bg: "#38BDF822", text: "#38BDF8", border: "#38BDF855" },
};

export default function App() {
  const [level, setLevel] = useState("Todos");
  const [query, setQuery] = useState("");

  const filteredSessions = useMemo(() => {
    return sessionTemplates.filter((s) => {
      const matchesLevel = level === "Todos" || s.level === level;
      const matchesQuery = `${s.level} ${s.focus} ${s.blocks.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesLevel && matchesQuery;
    });
  }, [level, query]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main
      style={{
        fontFamily:
          "'DM Sans', 'Outfit', ui-sans-serif, system-ui, sans-serif",
        background: "#0A0A0A",
        color: "#F0F0F0",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900;1,9..40,300&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #B8F400; color: #0A0A0A; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        .nav-btn { background: none; border: none; cursor: pointer; font-family: inherit; color: #999; font-size: 13px; font-weight: 500; padding: 6px 14px; border-radius: 100px; transition: all 0.18s; letter-spacing: 0.02em; }
        .nav-btn:hover { color: #F0F0F0; background: #ffffff12; }
        .pill { display: inline-flex; align-items: center; border-radius: 100px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 12px; }
        .cta-primary { background: #B8F400; color: #0A0A0A; border: none; border-radius: 100px; padding: 14px 28px; font-family: inherit; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.18s; letter-spacing: 0.01em; }
        .cta-primary:hover { background: #CCFF1A; transform: translateY(-1px); }
        .cta-ghost { background: transparent; color: #F0F0F0; border: 1px solid #333; border-radius: 100px; padding: 13px 28px; font-family: inherit; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.18s; }
        .cta-ghost:hover { border-color: #666; background: #ffffff08; }
        .card-dark { background: #141414; border: 1px solid #1E1E1E; border-radius: 16px; }
        .card-lined { background: #0F0F0F; border: 1px solid #1A1A1A; border-radius: 16px; transition: border-color 0.2s; }
        .card-lined:hover { border-color: #2A2A2A; }
        .tag-box { background: #1A1A1A; border-radius: 8px; padding: 3px 10px; font-size: 12px; color: #888; font-weight: 500; }
        input, select { background: #141414; border: 1px solid #222; border-radius: 10px; color: #F0F0F0; font-family: inherit; font-size: 14px; padding: 9px 14px; outline: none; transition: border-color 0.18s; }
        input:focus, select:focus { border-color: #B8F400; }
        select option { background: #141414; }
        input::placeholder { color: #555; }
        .accent-line { height: 2px; background: linear-gradient(90deg, #B8F400, transparent); border-radius: 1px; }
        .hero-character-wrap {
          position: absolute;
          right: max(0px, calc((100vw - 1280px) / 2));
          top: 42px;
          width: min(620px, 46vw);
          height: min(760px, 88vh);
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          pointer-events: none;
          z-index: 1;
          overflow: visible;
        }
        .hero-character-wrap::before {
          content: "";
          position: absolute;
          inset: -90px -120px -90px -120px;
          background:
            radial-gradient(circle at 72% 18%, #B8F40016 0%, transparent 42%),
            radial-gradient(circle at 50% 50%, #ffffff08 0%, transparent 55%);
          filter: blur(10px);
        }
        .hero-character-wrap::after {
          content: "";
          position: absolute;
          inset: -2px;
          background:
            linear-gradient(90deg, #0A0A0A 0%, transparent 18%, transparent 72%, #0A0A0A 100%),
            linear-gradient(180deg, #0A0A0A 0%, transparent 16%, transparent 74%, #0A0A0A 100%);
          opacity: 0.92;
          mix-blend-mode: multiply;
        }
        .hero-character {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          opacity: 0.48;
          filter: grayscale(1) contrast(1.18) brightness(0.82);
          mix-blend-mode: screen;
          -webkit-mask-image: radial-gradient(ellipse at 58% 43%, #000 0%, #000 48%, rgba(0,0,0,0.72) 62%, transparent 82%);
          mask-image: radial-gradient(ellipse at 58% 43%, #000 0%, #000 48%, rgba(0,0,0,0.72) 62%, transparent 82%);
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 52px !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .cards-3 { grid-template-columns: 1fr !important; }
          .cards-4 { grid-template-columns: 1fr 1fr !important; }
          .cards-2 { grid-template-columns: 1fr !important; }
          .prog-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-character-wrap { position: absolute; right: -90px; top: 70px; width: min(420px, 62vw); height: 520px; opacity: 0.42; }
          .hero-character { width: 100%; height: 100%; opacity: 0.36; }
        }
        @media (max-width: 480px) {
          .cards-4 { grid-template-columns: 1fr !important; }
          .prog-grid { grid-template-columns: 1fr !important; }
          .hero-character-wrap { right: -150px; top: 95px; width: 360px; height: 460px; opacity: 0.28; }
        }
      `}</style>

      <section
        id="home"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "120px 24px 100px",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: "-10%",
              right: "-5%",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #B8F40015 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              left: "-10%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #00D4AA0D 0%, transparent 70%)",
            }}
          />
          <svg
            style={{ position: "absolute", right: 0, bottom: 0, opacity: 0.04 }}
            width="500"
            height="400"
            viewBox="0 0 500 400"
          >
            <line
              x1="250"
              y1="0"
              x2="250"
              y2="400"
              stroke="white"
              strokeWidth="1.5"
            />
            <line
              x1="0"
              y1="200"
              x2="500"
              y2="200"
              stroke="white"
              strokeWidth="1.5"
            />
            <rect
              x="50"
              y="50"
              width="400"
              height="300"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
            />
            <rect
              x="150"
              y="50"
              width="200"
              height="300"
              stroke="white"
              strokeWidth="1"
              fill="none"
            />
            <ellipse
              cx="250"
              cy="200"
              rx="60"
              ry="60"
              stroke="white"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        <motion.div
          className="hero-character-wrap"
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            className="hero-character"
            src="/images/coach-character.png"
            alt="Ilustração de condicionamento físico para tênis"
          />
        </motion.div>

        <div
          style={{
            position: "relative",
            maxWidth: 1100,
            margin: "0 auto",
            width: "100%",
            zIndex: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1A1A1A",
                border: "1px solid #2A2A2A",
                borderRadius: 100,
                padding: "6px 16px",
                marginBottom: 32,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#B8F400",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: "#999",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                AAACHSA • Coach Daniel Parra
              </span>
            </div>

            <h1
              className="hero-title"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 96,
                lineHeight: 0.9,
                letterSpacing: "0.01em",
                margin: 0,
                marginBottom: 32,
                color: "#F5F5F5",
              }}
            >
              Condicionamento
              <br />
              <span style={{ color: "#B8F400" }}>Físico</span> para
              <br />
              Tênis de Campo
            </h1>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: "#888",
                maxWidth: 560,
                marginBottom: 40,
                fontWeight: 300,
              }}
            >
              Desenvolva força, agilidade, resistência e mobilidade com um guia
              objetivo para jogadores de nível intermediário e avançado.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="cta-primary" onClick={() => scrollTo("sessions")}>
                Ver treinos
              </button>
              <button className="cta-ghost" onClick={() => scrollTo("contact")}>
                Falar com o coach
              </button>
            </div>

            <div style={{ display: "flex", gap: 40, marginTop: 64, flexWrap: "wrap" }}>
              {[
                ["7", "Capacidades físicas"],
                ["6", "Eixos de treino"],
                ["4", "Etapas de progressão"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 48,
                      color: "#F5F5F5",
                      lineHeight: 1,
                    }}
                  >
                    {n}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#666",
                      fontWeight: 400,
                      marginTop: 4,
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#0A0A0Aee",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #1A1A1A",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            gap: 2,
            overflowX: "auto",
            padding: "8px 0",
          }}
        >
          {sections.map((s) => (
            <button key={s.id} className="nav-btn" onClick={() => scrollTo(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      <section id="about" style={{ padding: "96px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div>
            <span
              className="pill"
              style={{ background: "#B8F40018", color: "#B8F400", marginBottom: 20 }}
            >
              Sobre o guia
            </span>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 56,
                color: "#F5F5F5",
                margin: 0,
                lineHeight: 0.95,
              }}
            >
              Uma abordagem integrada ao tênis
            </h2>
          </div>
          <div>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: "#888",
                margin: 0,
                marginBottom: 24,
              }}
            >
              Este guia reúne os eixos principais do treinamento físico aplicado
              ao tênis, com foco na melhora do desempenho em quadra. A proposta
              integra pilares do treinamento esportivo com habilidades
              específicas do tênis.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                {
                  icon: <Stethoscope size={18} />,
                  label: "Conceito preventivo",
                  desc: "Treinar desempenho sem ignorar controle de carga e progressão.",
                },
                {
                  icon: <Zap size={18} />,
                  label: "Objetivo em quadra",
                  desc: "Velocidade, estabilidade, resistência e repetição de qualidade.",
                },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="card-dark" style={{ padding: 20 }}>
                  <div style={{ color: "#B8F400", marginBottom: 12 }}>{icon}</div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#E0E0E0",
                      marginBottom: 6,
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="warmup" style={{ padding: "96px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <span
          className="pill"
          style={{ background: "#FF6B3518", color: "#FF6B35", marginBottom: 16 }}
        >
          Aquecimento
        </span>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 52,
            color: "#F5F5F5",
            margin: 0,
            marginBottom: 12,
            lineHeight: 0.95,
          }}
        >
          Prepare o corpo para a quadra
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "#666",
            maxWidth: 560,
            marginBottom: 48,
            lineHeight: 1.7,
          }}
        >
          O aquecimento combina ativação geral, mobilidade e preparação
          específica para correr, frear e executar golpes com segurança.
        </p>

        <div
  className="cards-3"
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
  }}
>
  {warmupSteps.map(({ num, label, desc, image }) => (
    <div
      key={num}
      className="card-lined"
      style={{
        overflow: "hidden",
        background: "#101010",
      }}
    >
      <div
        style={{
          height: 280,
          background: "#F4EFE8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #1A1A1A",
        }}
      >
        <img
          src={image}
          alt={label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            padding: 12,
          }}
        />
      </div>

      <div style={{ padding: 24 }}>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 44,
            color: "#1E1E1E",
            lineHeight: 1,
            marginBottom: 14,
          }}
        >
          {num}
        </div>

        <div className="accent-line" style={{ marginBottom: 16, width: 36 }} />

        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#E0E0E0",
            marginBottom: 10,
          }}
        >
          {label}
        </div>

        <div
          style={{
            fontSize: 13,
            color: "#777",
            lineHeight: 1.65,
          }}
        >
          {desc}
        </div>
      </div>
    </div>
  ))}
</div>
      </section>

      <section
        id="capacities"
        style={{
          background: "#0D0D0D",
          borderTop: "1px solid #1A1A1A",
          borderBottom: "1px solid #1A1A1A",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 52,
              color: "#F5F5F5",
              margin: 0,
              marginBottom: 48,
              lineHeight: 0.95,
            }}
          >
            Capacidades físicas prioritárias
          </h2>
          <div
            className="cards-4"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}
          >
            {capacities.map((cap) => (
              <div
                key={cap.title}
                className="card-dark"
                style={{ padding: 24, borderTop: `2px solid ${cap.accent}` }}
              >
                <div style={{ color: cap.accent, marginBottom: 16 }}>{cap.icon}</div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#E0E0E0",
                    marginBottom: 10,
                  }}
                >
                  {cap.title}
                </div>
                <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>
                  {cap.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sessions" style={{ padding: "96px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            marginBottom: 48,
          }}
        >
          <div>
            <span
              className="pill"
              style={{ background: "#A78BFA18", color: "#A78BFA", marginBottom: 16 }}
            >
              Treinos por nível
            </span>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 52,
                color: "#F5F5F5",
                margin: 0,
                lineHeight: 0.95,
              }}
            >
              Eixos principais do condicionamento
            </h2>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <Search
                size={14}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#555",
                  pointerEvents: "none",
                }}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar objetivo..."
                style={{ paddingLeft: 36, minWidth: 200 }}
              />
            </div>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option>Todos</option>
              <option>Resistência aeróbica</option>
              <option>Resistência anaeróbica</option>
              <option>Footwork</option>
              <option>Coordenação</option>
              <option>Potência</option>
              <option>Velocidade</option>
            </select>
          </div>
        </div>

        <div
          className="cards-3"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
        >
          {filteredSessions.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 48, color: "#555" }}>
              Nenhum treino encontrado.
            </div>
          )}

          {filteredSessions.map((session, idx) => (
            <motion.div
              key={session.level}
              className="card-dark"
              style={{ padding: 28 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#F0F0F0", margin: 0 }}>
                  {session.level}
                </h3>
                <span className="pill tag-box">{session.tag}</span>
              </div>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, marginBottom: 24 }}>
                {session.focus}
              </p>
              <div style={{ borderTop: "1px solid #1E1E1E", paddingTop: 20 }}>
                {session.blocks.map((block) => (
                  <div key={block} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#B8F400",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 13, color: "#888" }}>{block}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="library"
        style={{
          background: "#0D0D0D",
          borderTop: "1px solid #1A1A1A",
          borderBottom: "1px solid #1A1A1A",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 52,
              color: "#F5F5F5",
              margin: 0,
              marginBottom: 12,
              lineHeight: 0.95,
            }}
          >
            Biblioteca de exercícios
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "#666",
              maxWidth: 560,
              marginBottom: 48,
              lineHeight: 1.7,
            }}
          >
            Esta seção será construída progressivamente com exercícios, fotos,
            vídeos, objetivo, nível indicado e volume sugerido.
          </p>
          <div
            className="cards-4"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}
          >
            {exerciseLibrary.map((exercise) => {
              const c =
                categoryColors[exercise.category] || {
                  bg: "#B8F40018",
                  text: "#B8F400",
                  border: "#B8F40030",
                };
              return (
              <div
  key={exercise.title}
  className="card-lined"
  style={{
    overflow: "hidden",
  }}
>
  {exercise.image && (
    <div
      style={{
        height: 220,
        background: "#F4EFE8",
        borderBottom: "1px solid #1A1A1A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={exercise.image}
        alt={exercise.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          padding: 10,
        }}
      />
    </div>
  )}

  <div style={{ padding: 24 }}>
    <span
      className="pill"
      style={{
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        marginBottom: 16,
      }}
    >
      {exercise.category}
    </span>

    <div
      style={{
        fontSize: 14,
        fontWeight: 700,
        color: "#E0E0E0",
        marginBottom: 10,
        lineHeight: 1.4,
      }}
    >
      {exercise.title}
    </div>

    <div
      style={{
        fontSize: 13,
        color: "#666",
        lineHeight: 1.6,
        marginBottom: 16,
      }}
    >
      {exercise.objective}
    </div>

    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: "#444",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      Nível: <span style={{ color: "#666" }}>{exercise.level}</span>
    </div>
  </div>
</div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="purchases" style={{ padding: "96px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            marginBottom: 48,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <ShoppingBag size={20} style={{ color: "#B8F400" }} />
              <span className="pill" style={{ background: "#B8F40018", color: "#B8F400" }}>
                Compras recomendadas
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 52,
                color: "#F5F5F5",
                margin: 0,
                marginBottom: 12,
                lineHeight: 0.95,
              }}
            >
              Equipamentos básicos para treinar melhor
            </h2>
            <p style={{ fontSize: 15, color: "#666", maxWidth: 620, lineHeight: 1.7, margin: 0 }}>
              Sugestões simples para apoiar aquecimento, mobilidade, agilidade,
              prevenção e recuperação. Os produtos devem ser escolhidos de acordo
              com o nível físico, histórico de lesões e objetivo de cada jogador.
            </p>
          </div>
        </div>

        <div className="cards-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {recommendedPurchases.map((item, idx) => (
            <div
              key={item.title}
              className="card-lined"
              style={{
                padding: 24,
                background: "#101010",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 64,
                  color: "#171717",
                  position: "absolute",
                  right: 10,
                  top: 8,
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </div>

              <span
                className="pill"
                style={{
                  background: "#B8F40014",
                  color: "#B8F400",
                  border: "1px solid #B8F40030",
                  marginBottom: 16,
                  position: "relative",
                }}
              >
                {item.category}
              </span>

              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#E0E0E0",
                  marginBottom: 12,
                  lineHeight: 1.4,
                  position: "relative",
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: "#666",
                  lineHeight: 1.65,
                  marginBottom: 18,
                  position: "relative",
                }}
              >
                {item.reason}
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  borderRadius: 100,
                  border: "1px solid #2A2A2A",
                  padding: "6px 10px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#888",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  position: "relative",
                }}
              >
                Prioridade:{" "}
                <span style={{ color: "#B8F400", marginLeft: 4 }}>
                  {item.priority}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 32,
            padding: 28,
            background: "#0F0F0F",
            border: "1px solid #1A1A1A",
            borderRadius: 18,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#B8F400",
              marginBottom: 18,
            }}
          >
            Links úteis para compra
          </div>

          <div className="cards-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {purchaseLinks.map((link) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  textDecoration: "none",
                  background: "#141414",
                  border: "1px solid #222",
                  borderRadius: 14,
                  padding: 20,
                  transition: "all 0.18s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#B8F40055";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#222";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#E0E0E0",
                    marginBottom: 8,
                  }}
                >
                  {link.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#666",
                    lineHeight: 1.6,
                    marginBottom: 14,
                  }}
                >
                  {link.description}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#B8F400",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Ver no Mercado Livre
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="injury" style={{ padding: "96px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <span
          className="pill"
          style={{ background: "#FF6B3518", color: "#FF6B35", marginBottom: 16 }}
        >
          Prevenção de lesões
        </span>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 52,
            color: "#F5F5F5",
            margin: 0,
            marginBottom: 16,
            lineHeight: 0.95,
          }}
        >
          Proteger é tão importante quanto treinar
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "#666",
            maxWidth: 600,
            marginBottom: 48,
            lineHeight: 1.7,
          }}
        >
          O condicionamento físico é essencial para reduzir o risco de lesões. O
          aumento progressivo do volume permite melhor adaptação osteomuscular ao
          tênis.
        </p>
        <div
          className="cards-4"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}
        >
          {injuryCards.map((card) => (
            <div
              key={card.title}
              className="card-dark"
              style={{ padding: 24, position: "relative", overflow: "hidden" }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 72,
                  color: "#161616",
                  position: "absolute",
                  right: 8,
                  bottom: -8,
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {card.num}
              </div>
              <div
                style={{
                  width: 24,
                  height: 2,
                  background: "#B8F400",
                  borderRadius: 1,
                  marginBottom: 16,
                }}
              />
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#E0E0E0",
                  marginBottom: 12,
                }}
              >
                {card.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#666",
                  lineHeight: 1.7,
                  position: "relative",
                }}
              >
                {card.content}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="progression"
        style={{
          background: "#0D0D0D",
          borderTop: "1px solid #1A1A1A",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <CalendarDays size={20} style={{ color: "#B8F400" }} />
            <span className="pill" style={{ background: "#B8F40018", color: "#B8F400" }}>
              Plano de progressão
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 52,
              color: "#F5F5F5",
              margin: 0,
              marginBottom: 16,
              lineHeight: 0.95,
            }}
          >
            4 etapas para evolução
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "#666",
              maxWidth: 560,
              marginBottom: 48,
              lineHeight: 1.7,
            }}
          >
            O plano será definido após organizar a biblioteca de exercícios e
            categorias de treino. A estrutura inicial segue estas etapas:
          </p>

          <div
            className="prog-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}
          >
            {progression.map((item, i) => (
              <div
                key={item.week}
                style={{
                  background:
                    i === 0 ? "#141414" : i === 1 ? "#111" : i === 2 ? "#0E0E0E" : "#0C0C0C",
                  border: "1px solid #1A1A1A",
                  borderRadius: i === 0 ? "12px 0 0 12px" : i === 3 ? "0 12px 12px 0" : 0,
                  padding: 28,
                  borderRight: i < 3 ? "none" : "1px solid #1A1A1A",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "#B8F400",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  {item.week}
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#E0E0E0", marginBottom: 12 }}>
                  {item.goal}
                </div>
                <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>
                  {item.load}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              background: "#111",
              border: "1px solid #1E1E1E",
              borderRadius: 24,
              padding: "56px 48px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -80,
                right: -80,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "radial-gradient(circle, #B8F40012 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              className="hero-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 48,
                alignItems: "center",
                position: "relative",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 52,
                    color: "#F5F5F5",
                    margin: 0,
                    marginBottom: 16,
                    lineHeight: 0.95,
                  }}
                >
                  Fale com o Coach
                </h2>
                <p
                  style={{
                    fontSize: 15,
                    color: "#666",
                    lineHeight: 1.7,
                    margin: 0,
                    marginBottom: 20,
                  }}
                >
                  Para orientações, organização dos treinos e acompanhamento do
                  time de tênis de campo AAACHSA.
                </p>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#E0E0E0" }}>
                  Coach Daniel Parra
                </div>
                <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>
                  +1 470 836 7932
                </div>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#B8F400",
                  color: "#0A0A0A",
                  borderRadius: 100,
                  padding: "16px 32px",
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                  transition: "all 0.18s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#CCFF1A")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#B8F400")}
              >
                <Phone size={18} />
                Enviar mensagem
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #111", padding: "28px 24px", background: "#060606" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 18,
              color: "#333",
              letterSpacing: "0.05em",
            }}
          >
            AAACHSA
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#444",
              lineHeight: 1.6,
              maxWidth: 480,
              textAlign: "right",
            }}
          >
            Condicionamento físico do time de tênis de campo AAACHSA • Coach
            Daniel Parra. Os exercícios devem ser adaptados ao nível, histórico
            de lesões e restrições individuais de cada jogador.
          </div>
        </div>
      </footer>
    </main>
  );
}
