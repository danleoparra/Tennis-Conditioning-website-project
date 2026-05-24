import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Activity,
  Footprints,
  Target,
  CalendarDays,
  Search,
  Phone,
  Stethoscope,
  Zap,
  Users,
} from "lucide-react";

const Button = ({ children, className = "", variant = "default", ...props }) => {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-6 py-4 text-base font-semibold transition focus:outline-none focus:ring-4";
  const styles =
    variant === "outline"
      ? "border border-white/30 bg-white/10 text-white hover:bg-white/20 focus:ring-white/20"
      : "bg-lime-400 text-slate-950 hover:bg-lime-300 focus:ring-lime-200";
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl bg-white shadow-sm ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const contactNumber = "+14708367932";
const whatsappLink = `https://wa.me/${contactNumber.replace(/[^0-9]/g, "")}`;

const sections = [
  { id: "home", label: "Início" },
  { id: "about", label: "Sobre o guia" },
  { id: "target", label: "Para quem é" },
  { id: "warmup", label: "Aquecimento" },
  { id: "sessions", label: "Treinos por nível" },
  { id: "library", label: "Biblioteca" },
  { id: "injury", label: "Prevenção" },
  { id: "progression", label: "Plano" },
  { id: "contact", label: "Contato" },
];

const capacities = [
  {
    icon: <Footprints className="h-6 w-6" />,
    title: "Deslocamento e agilidade",
    text: "Aceleração, desaceleração, split step, deslocamentos laterais, recuperação de quadra e mudança rápida de direção.",
  },
  {
    icon: <Dumbbell className="h-6 w-6" />,
    title: "Força e estabilidade",
    text: "Base física para sustentar volume de treino, proteger articulações e melhorar eficiência nos golpes e deslocamentos.",
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: "Resistência específica",
    text: "Capacidade de manter intensidade durante treinos, rallies longos e repetições sucessivas de esforço em quadra.",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Potência rotacional",
    text: "Transferência de força entre pernas, quadril, tronco e membros superiores para golpes mais potentes e coordenados.",
  },
];

const sessionTemplates = [
  {
    level: "Intermediário",
    duration: "45–60 min",
    focus:
      "Agilidade, estabilidade, resistência específica e melhora da qualidade do movimento",
    blocks: [
      "5–8 min de aquecimento geral",
      "10–12 min de coordenação e deslocamento",
      "15 min de força funcional",
      "10 min de condicionamento específico",
      "5 min de mobilidade final",
    ],
  },
  {
    level: "Avançado",
    duration: "60–75 min",
    focus:
      "Mudança de direção, controle corporal, potência e tolerância a maior volume de treino",
    blocks: [
      "8–10 min de preparação física",
      "15 min de agilidade e desaceleração",
      "20 min de força e potência",
      "12 min de intervalos em padrão de jogo",
      "5–8 min de recuperação",
    ],
  },
  {
    level: "Alto rendimento",
    duration: "75–90 min",
    focus:
      "Performance, repetição de esforços intensos, prevenção de lesões e robustez física",
    blocks: [
      "10 min de preparação neuromuscular",
      "15 min de velocidade e reação",
      "25 min de força/potência",
      "15–20 min de condicionamento específico",
      "8 min de mobilidade e controle de carga",
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
      "Desenvolver força de membros inferiores e controle de joelho/quadril.",
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
];

const injuryCards = [
  {
    title: "Ombro",
    content:
      "Fortalecimento do manguito rotador, controle escapular, mobilidade torácica e progressão gradual do volume de saques.",
  },
  {
    title: "Cotovelo e punho",
    content:
      "Controle da carga de empunhadura, fortalecimento do antebraço e aumento progressivo do tempo de treino com raquete.",
  },
  {
    title: "Joelho e tornozelo",
    content:
      "Treino de aterrissagem, desaceleração, equilíbrio unilateral, panturrilha e controle multidirecional.",
  },
  {
    title: "Coluna lombar",
    content:
      "Mobilidade de quadril, estabilidade do tronco, força anti-rotação e redução de compensações durante golpes potentes.",
  },
];

const progression = [
  {
    week: "Etapa 1",
    goal: "Avaliação e base",
    load:
      "Identificar nível físico, limitações, assimetrias e tolerância inicial ao treino.",
  },
  {
    week: "Etapa 2",
    goal: "Construção",
    load:
      "Desenvolver força, mobilidade, coordenação e resistência básica específica.",
  },
  {
    week: "Etapa 3",
    goal: "Intensificação",
    load:
      "Aumentar velocidade, potência, volume e complexidade dos exercícios em quadra.",
  },
  {
    week: "Etapa 4",
    goal: "Performance",
    load:
      "Integrar o condicionamento aos padrões reais de jogo e controlar a carga semanal.",
  },
];

export default function App() {
  const [level, setLevel] = useState("Todos");
  const [query, setQuery] = useState("");

  const filteredSessions = useMemo(() => {
    return sessionTemplates.filter((session) => {
      const matchesLevel = level === "Todos" || session.level === level;
      const matchesQuery =
        `${session.level} ${session.focus} ${session.blocks.join(" ")}`
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
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 px-6 py-20 text-white"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-lime-300 blur-3xl" />
          <div className="absolute bottom-8 right-12 h-72 w-72 rounded-full bg-cyan-400 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-lime-100 ring-1 ring-white/20">
              Time de Tênis de Campo AAACHSA • Coach Daniel Parra
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Condicionamento físico para jogadores de alto rendimento.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Um guia objetivo para desenvolver força, agilidade, resistência,
              mobilidade e prevenção de lesões em jogadores de tênis de nível
              intermediário e avançado.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => scrollTo("sessions")}>
                Ver treinos
              </Button>

              <Button onClick={() => scrollTo("contact")} variant="outline">
                Falar com o coach
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-6 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-lime-50 hover:text-teal-700"
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      <section id="about" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Sobre o guia</h2>

            <p className="mt-4 leading-7 text-slate-600">
              Este guia reúne os eixos principais do treinamento físico aplicado
              ao tênis, com foco na melhora do desempenho em quadra. A proposta
              integra pilares do treinamento esportivo com habilidades
              fundamentais e específicas do tênis: deslocamento, força,
              resistência, mobilidade, potência e controle corporal.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent>
                <Stethoscope className="h-7 w-7 text-teal-600" />

                <h3 className="mt-4 font-semibold">
                  Conceito esportivo e preventivo
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Treinar desempenho sem ignorar controle de carga, prevenção
                  de lesões e adaptação progressiva do sistema osteomuscular.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Zap className="h-7 w-7 text-teal-600" />

                <h3 className="mt-4 font-semibold">Objetivo em quadra</h3>

                <p className="mt-2 text-sm text-slate-600">
                  Melhorar velocidade, estabilidade, resistência e capacidade de
                  repetir esforços com qualidade técnica.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="target" className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Users className="h-7 w-7 text-teal-600" />
              <h2 className="text-3xl font-bold tracking-tight">
                Para quem é
              </h2>
            </div>

            <p className="mt-4 leading-7 text-slate-600">
              Para jogadores de nível intermediário e avançado que desejam
              potencializar o desempenho físico no tênis, aumentar a tolerância
              ao treinamento e evoluir com uma estrutura progressiva.
            </p>
          </div>

          <Card className="bg-slate-900 text-white">
            <CardContent className="p-7">
              <h3 className="text-xl font-bold">Perfil do jogador</h3>

              <ul className="mt-5 space-y-3 text-sm text-slate-200">
                <li>• Já possui base técnica no tênis.</li>
                <li>• Busca melhorar deslocamento, força e resistência.</li>
                <li>• Quer treinar com progressão e menor risco de lesão.</li>
                <li>
                  • Tem interesse em evoluir para padrões de maior rendimento.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="warmup" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold tracking-tight">Aquecimento</h2>

        <p className="mt-3 max-w-3xl text-slate-600">
          O aquecimento deve preparar o corpo para correr, frear, mudar de
          direção e executar golpes com segurança. A estrutura inicial combina
          ativação geral, mobilidade e preparação específica para o tênis.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            "Ativação geral",
            "Mobilidade completa",
            "Ativação muscular",
            "Movimento específico",
          ].map((item, index) => (
            <Card key={item}>
              <CardContent>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-100 font-bold text-teal-700">
                  {index + 1}
                </div>

                <h3 className="mt-4 font-semibold">{item}</h3>

                <p className="mt-2 text-sm text-slate-600">
                  {index === 0 &&
                    "3–5 minutos de caminhada rápida, corrida leve ou corda."}
                  {index === 1 &&
                    "Alongamento dinâmico de tornozelo, quadril, coluna, ombros, cotovelos e punhos."}
                  {index === 2 &&
                    "Glúteos, panturrilha, core, estabilizadores do ombro e escápulas."}
                  {index === 3 &&
                    "Split step, deslocamento lateral, recuperação de quadra e golpes simulados."}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="capacities" className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight">
            Capacidades físicas prioritárias
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {capacities.map((cap) => (
              <Card
                key={cap.title}
                className="transition hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent>
                  <div className="text-teal-600">{cap.icon}</div>
                  <h3 className="mt-4 font-semibold">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {cap.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="sessions" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Treinos por nível
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Os treinos serão organizados em níveis progressivos e categorias
              específicas para cada segmento de melhora: força, agilidade,
              resistência, mobilidade e prevenção.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar objetivo..."
                className="h-10 rounded-xl border border-slate-200 pl-9 pr-3 text-sm outline-none ring-lime-200 focus:ring-4"
              />
            </div>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none ring-lime-200 focus:ring-4"
            >
              <option>Todos</option>
              <option>Intermediário</option>
              <option>Avançado</option>
              <option>Alto rendimento</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {filteredSessions.map((session) => (
            <Card key={session.level}>
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold">{session.level}</h3>
                  <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-teal-700">
                    {session.duration}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {session.focus}
                </p>

                <ul className="mt-5 space-y-3">
                  {session.blocks.map((block) => (
                    <li key={block} className="flex gap-3 text-sm text-slate-700">
                      <span className="mt-1 h-2 w-2 rounded-full bg-lime-400" />
                      {block}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="library" className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight">
            Biblioteca de exercícios
          </h2>

          <p className="mt-3 max-w-3xl text-slate-600">
            Esta seção será construída progressivamente com exercícios, fotos,
            vídeos, objetivo, nível indicado, volume sugerido e principais erros
            a evitar.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {exerciseLibrary.map((exercise) => (
              <Card key={exercise.title}>
                <CardContent>
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                    {exercise.category}
                  </span>

                  <h3 className="mt-4 font-semibold">{exercise.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {exercise.objective}
                  </p>

                  <p className="mt-4 text-xs font-medium text-slate-500">
                    Nível: {exercise.level}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="injury" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold tracking-tight">
          Prevenção de lesões
        </h2>

        <p className="mt-3 max-w-3xl text-slate-600">
          O condicionamento físico é essencial para reduzir o risco de lesões. O
          aumento progressivo da frequência, do volume e da intensidade do
          treinamento permite melhor adaptação osteomuscular e maior tolerância
          às demandas do tênis.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {injuryCards.map((card) => (
            <Card
              key={card.title}
              className="border-l-4 border-l-lime-400"
            >
              <CardContent>
                <h3 className="font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {card.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="progression" className="bg-slate-900 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-7 w-7 text-lime-300" />
            <h2 className="text-3xl font-bold tracking-tight">
              Plano de progressão
            </h2>
          </div>

          <p className="mt-4 max-w-3xl text-slate-300">
            O plano de 4 semanas será definido após organizar melhor a
            biblioteca de exercícios e as categorias de treino. A estrutura
            inicial seguirá estas etapas:
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {progression.map((item) => (
              <Card
                key={item.week}
                className="border border-white/10 bg-white/10 text-white"
              >
                <CardContent>
                  <span className="text-sm font-semibold text-lime-300">
                    {item.week}
                  </span>

                  <h3 className="mt-3 text-lg font-bold">{item.goal}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {item.load}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-br from-slate-950 to-teal-950 p-8 text-white shadow-sm md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Contato</h2>

              <p className="mt-4 text-slate-200">
                Para orientações, organização dos treinos e acompanhamento do
                time de tênis de campo AAACHSA.
              </p>

              <p className="mt-4 font-semibold">Coach Daniel Parra</p>
              <p className="text-slate-300">+1 470 836 7932</p>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-lime-400 px-6 py-4 font-semibold text-slate-950 transition hover:bg-lime-300"
            >
              <Phone className="h-5 w-5" />
              Enviar mensagem
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-8 text-slate-400">
        <div className="mx-auto max-w-6xl text-sm">
          <p>
            Condicionamento físico do time de tênis de campo AAACHSA • Coach
            Daniel Parra. Material educativo e prático. Os exercícios devem ser
            adaptados ao nível, histórico de lesões e restrições individuais de
            cada jogador.
          </p>
        </div>
      </footer>
    </main>
  );
}
