import { PageFooter, SiteChrome } from "./components/SiteChrome";
import styles from "./page.module.css";
import type { CSSProperties } from "react";

export const metadata = {
  description:
    "전호준의 이력과 AI 시스템 · 로보틱스 · 자율주행 프로젝트를 분야별로 정리한 포트폴리오입니다.",
};

type WorkCard = {
  href: string;
  title: string;
  visual: {
    src: string;
    alt: string;
    aspectRatio: string;
    objectPosition?: string;
    objectFit?: "cover" | "contain";
  };
};

const workCards: WorkCard[] = [
  {
    href: "/resume",
    title: "Resume",
    visual: {
      src: "/evidence/hub/resume-career-desk.jpg",
      aspectRatio: "43 / 24",
      objectFit: "cover",
      alt: "이력과 성장 계획을 상징하는 커리어 데스크",
      objectPosition: "center",
    },
  },
  {
    href: "/ai",
    title: "AI",
    visual: {
      src: "/evidence/hub/ai-workflow.jpg",
      aspectRatio: "43 / 24",
      alt: "AI 시스템이 채용·역량·질문·경험 정보를 연결하는 일러스트",
      objectPosition: "center",
      objectFit: "contain",
    },
  },
  {
    href: "/robotics",
    title: "Robotics",
    visual: {
      src: "/evidence/hub/robotics-apple-arm.jpg",
      aspectRatio: "43 / 24",
      objectFit: "contain",
      alt: "사과를 집는 이동형 로봇 팔 작업 장면",
      objectPosition: "center",
    },
  },
  {
    href: "/autonomous-driving",
    title: "Autonomous Driving",
    visual: {
      src: "/evidence/hub/autonomous-sensing.jpg",
      aspectRatio: "43 / 24",
      objectFit: "contain",
      alt: "교차로 중앙 차량과 주변 센서 영역을 표현한 자율주행 이미지",
      objectPosition: "center",
    },
  },
];

function WorkCard({ card }: { card: WorkCard }) {
  const titleId = `work-card-${card.title.toLowerCase().replaceAll(" ", "-")}`;

  return (
    <a href={card.href} className={`page-card ${styles.pageCard}`} aria-labelledby={titleId}>
      <div
        className={styles.cardVisual}
        style={{ "--card-ratio": card.visual.aspectRatio } as CSSProperties}
      >
        <img
          src={card.visual.src}
          alt={card.visual.alt}
          loading="lazy"
          decoding="async"
          style={{
            objectFit: card.visual.objectFit,
            objectPosition: card.visual.objectPosition,
          }}
        />
      </div>
      <h2 id={titleId} className={styles.cardTitle}>{card.title}</h2>
    </a>
  );
}

export default function Home() {
  return (
    <div className="site-shell home-shell">
      <SiteChrome current="home" />
      <main id="main" className="home-main">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero-copy">
            <p className="eyebrow">JEON HOJUN · PORTFOLIO</p>
            <h1 id="home-title">AI·로보틱스·자율주행을 구현하는 신입 엔지니어, 전호준</h1>
            <p className={styles.heroLead}>
              이력서와 AI·로보틱스·자율주행 프로젝트를 모은 포트폴리오입니다.
            </p>
            <div className="hero-identity">
              <p className="hero-name">전호준</p>
              <p className="hero-role">AI systems · Robotics · Autonomous driving</p>
            </div>
            <div className="action-row">
              <a className="button button-primary" href="/resume">이력서 보기 <span aria-hidden="true">→</span></a>
              <a className="button button-secondary" href="#work">프로젝트 탐색 <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <figure className="home-hero-visual">
            <img
              src="/evidence/profile.png"
              alt="전호준 프로필 사진"
              width="360"
              height="480"
              loading="eager"
              decoding="async"
            />
            <figcaption>AI · Robotics · Autonomous Driving</figcaption>
          </figure>
        </section>

        <section id="work" className="home-work" aria-label="작업 트랙">
          <p className={`eyebrow ${styles.workLabel}`}>작업 트랙</p>

          <div className={`page-card-grid ${styles.pageGrid}`}>
            {workCards.map((card) => <WorkCard key={card.href} card={card} />)}
          </div>
        </section>
      </main>
      <PageFooter current="home" />
    </div>
  );
}
