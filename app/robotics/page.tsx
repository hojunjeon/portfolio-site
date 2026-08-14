import type { ReactNode } from "react";

import { ProjectDetailLayout } from "../components/ProjectDetailLayout";
import { PageFooter, PageTitle, SiteChrome } from "../components/SiteChrome";
import styles from "./page.module.css";

export const metadata = {
  title: "Robotics portfolio",
  description:
    "사과 수확·분류 Edge AI 로봇과 로봇팔 강화학습 오케스트레이션을 제어·실험 흐름으로 정리한 페이지입니다.",
};

type ProjectOverview = {
  index: string;
  title: string;
  meta: string;
  message: string;
  keywords: string;
  href: string;
};

const projectOverviews: ProjectOverview[] = [
  {
    index: "01",
    title: "사과 수확·분류 로봇",
    meta: "2023.07–2024.07 · 학부 졸업작품(팀) · 담당: 제어·HW/SW 통합",
    message: "사과 인식부터 로봇팔 구동과 무게 분류까지 연결한 Edge 로봇",
    keywords: "YOLOv5 · RealSense D415 · 제어 주기",
    href: "#apple-robot",
  },
  {
    index: "02",
    title: "로봇팔 강화학습",
    meta: "개인 프로젝트 · RARL·RobotRF · 실험 설계·오케스트레이션",
    message: "MuJoCo 학습·평가와 checkpoint 검토를 묶은 강화학습 실험 체계",
    keywords: "MuJoCo · SAC · HER",
    href: "#rl-orchestration",
  },
];

function OverviewCard({ project }: { project: ProjectOverview }) {
  return (
    <article className={`project-index-item ${styles.overviewEntry}`}>
      <div className={styles.overviewIndex} aria-hidden="true">{project.index}</div>
      <div className={styles.overviewEntryBody}>
        <div className={styles.overviewEntryHeading}>
          <h2>{project.title}</h2>
        </div>
        <p className={styles.overviewMeta}>{project.meta}</p>
        <p className={styles.overviewKeywords}>{project.keywords}</p>
      </div>
      <p className={styles.overviewMessage}>{project.message}</p>
      <a className="related-link" href={project.href} aria-label={`${project.title} 프로젝트 보기`}>
        프로젝트 보기 <span aria-hidden="true">↓</span>
      </a>
    </article>
  );
}

function ExplainerFigure({
  src,
  alt,
  dark = false,
  className = "",
}: {
  src: string;
  alt: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={`media-slot primary-media ${styles.explainerFigure}${dark ? ` ${styles.explainerFigureDark}` : ""} ${className}`}
    >
      <div className={styles.assetViewport}>
        <img src={src} alt={alt} loading="eager" decoding="async" />
      </div>
    </figure>
  );
}

function ProjectLinks({ children }: { children: ReactNode }) {
  return <div className={styles.projectLinks}>{children}</div>;
}

function AppleBody() {
  return (
    <div className={styles.appleStory}>
      <article className={styles.storyPanel}>
        <p className={styles.storyLabel}>문제가 보인 곳</p>
        <h3>목표점 직전의 오버슈트와 진동</h3>
        <dl className={styles.storyRows}>
          <div>
            <dt>증상</dt>
            <dd>관절 명령이 목표 좌표를 지나쳤습니다.</dd>
          </div>
          <div>
            <dt>확인</dt>
            <dd>기구부 보강·모터 교체는 안정성을 조금 높였지만 비용과 시간이 늘었고, 속도만 낮추면 수확 시간이 길어졌습니다.</dd>
          </div>
          <div>
            <dt>판단</dt>
            <dd>원인을 인식·제어·구동 사이의 상호작용으로 다시 나눴습니다.</dd>
          </div>
        </dl>
      </article>
      <article className={`${styles.storyPanel} ${styles.storyPanelAccent}`}>
        <p className={styles.storyLabel}>시스템 관점에서 바꾼 세 지점</p>
        <h3>접근·주기·경계를 한 흐름으로 묶었습니다.</h3>
        <ol className={styles.improvementList}>
          <li>
            <strong>접근 속도</strong>
            <span>목표점에 가까워질수록 관절 속도를 낮추는 Jacobian 기반 속도 제어</span>
          </li>
          <li>
            <strong>신호 주기</strong>
            <span>Raspberry Pi–Arduino–Dynamixel 제어 주기 정렬, 루프 지연 축소</span>
          </li>
          <li>
            <strong>모듈 경계</strong>
            <span>RealSense·YOLOv5 좌표가 IK/Jacobian·Dynamixel·Load Cell로 이어지는 경계 통합</span>
          </li>
        </ol>
      </article>
    </div>
  );
}

function RlBody() {
  return (
    <div className={styles.rlStory}>
      <article className={styles.rlHook}>
        <p className={styles.storyLabel}>운영에서 막힌 지점</p>
        <h3>반복 감시와 자기평가를 구조에서 분리했습니다.</h3>
        <dl className={styles.rlStoryRows}>
          <div>
            <dt>반복</dt>
            <dd>보상 실험과 학습 상태를 사람이 매 epoch마다 확인해야 했습니다.</dd>
          </div>
          <div>
            <dt>위험</dt>
            <dd>설계·구현·검증이 한 에이전트에 모이면 생성과 자기평가가 겹칩니다.</dd>
          </div>
          <div>
            <dt>전환</dt>
            <dd>생성과 검증을 분리하고 checkpoint 판단을 자동화 루프로 연결했습니다.</dd>
          </div>
        </dl>
      </article>
      <aside className={styles.rlDecision} aria-labelledby="rl-boundary-title">
        <p className={styles.storyLabel} id="rl-boundary-title">역할과 판단을 나눈 구조</p>
        <h3>Main Orchestrator가 세 역할의 결과를 모았습니다.</h3>
        <dl className={styles.rlStoryRows}>
          <div>
            <dt>계획·구현</dt>
            <dd>plan·implement 에이전트</dd>
          </div>
          <div>
            <dt>독립 테스트</dt>
            <dd>test 에이전트</dd>
          </div>
          <div>
            <dt>학습·평가</dt>
            <dd>train·evaluate 에이전트</dd>
          </div>
        </dl>
        <p className={styles.rlMethodNote}>짧은 chunk 뒤 checkpoint에서 학습 결과를 세 상태로 판정했습니다.</p>
        <ol className={styles.stateGate} aria-label="checkpoint 이후 학습 결과 세 상태">
          <li><strong>계속</strong><span>다음 chunk로 진행</span></li>
          <li><strong>수정</strong><span>조건·보상·구현을 바꿔 재실행</span></li>
          <li><strong>중단</strong><span>실패 증거를 격리</span></li>
        </ol>
      </aside>
    </div>
  );
}

function AppleProject() {
  return (
    <ProjectDetailLayout
      id="apple-robot"
      titleId="apple-robot-title"
      index="01"
      eyebrow="01 / Troubleshooting · Edge pipeline"
      title="사과 수확·분류 Edge AI 로봇"
      summary="카메라로 사과 위치를 찾고 로봇팔 수확과 Load Cell 분류로 잇는 임베디드 Edge AI 시스템"
      facts={{ period: "2023.07–2024.07", form: "학부 졸업작품(팀)", role: "제어 알고리즘·SW/HW 통합" }}
      primer={{
        context: "농촌의 고령화와 인력난에 대응하려고 과수원에서 사과를 인식하고 수확부터 분류까지 자동화하는 Edge AI 로봇을 만들었습니다.",
        flow: "카메라가 사과 위치를 찾으면 로봇팔이 움직이고, 마지막에 무게를 재어 분류 결과를 냅니다.",
      }}
      primary={{
        src: "/evidence/robotics/apple-robot-platform.png",
        alt: "사과 수확·분류 Edge AI 로봇 플랫폼과 로봇팔, 분류 장치",
      }}
      decision="목표점에서 멈추지 못했습니다. HW·SW를 따로 손봐도 진동과 오버슈트가 남았습니다."
      body={<AppleBody />}
      visual={
        <div className={`${styles.visualGrid} ${styles.appleVisual}`}>
          <ExplainerFigure
            src="/evidence/robotics/apple-pipeline-explainer-v2.png"
            alt="과수원 카메라 인식, 사과 탐지, 목표 좌표 접근, 제어 주기, 로봇팔 수확, Load Cell 분류를 여섯 장면으로 보여주는 개념 시각화"
            className={styles.appleExplainer}
          />
        </div>
      }
      keywords={["YOLOv5", "RealSense D415", "Raspberry Pi", "Arduino", "Dynamixel", "Load Cell", "UART"]}
      surface="surface-wash"
    />
  );
}

function RlProject() {
  return (
    <ProjectDetailLayout
      id="rl-orchestration"
      titleId="rl-orchestration-title"
      index="02"
      eyebrow="02 / Operations design · RL orchestration"
      title="로봇팔 강화학습 오케스트레이션"
      summary="MuJoCo FetchSideBinPlace-v0 로봇팔 학습을 짧은 실행·checkpoint·검토 단위로 관리하는 실험 하네스"
      facts={{ form: "개인 프로젝트", role: "동작·실패 조건·오케스트레이션 설계" }}
      primer={{
        context: "로봇팔 제어, 강화학습, AI 활용을 하네스와 반복 루프로 연결해 관심 있던 세 분야를 확장해 본 개인 프로젝트입니다.",
        flow: "하나의 긴 학습을 돌리는 대신, 조건을 고정한 짧은 실행·checkpoint·검토 단위로 다음 실험을 결정합니다.",
      }}
      primary={{
        src: "/evidence/robotics/training-stage-final.gif",
        alt: "MuJoCo FetchSideBinPlace 환경에서 로봇팔이 물체를 집어 파란 bin으로 옮기는 학습 단계 애니메이션",
      }}
      decision="보상 설계와 epoch별 감시를 반복하는 대신, 역할을 분리하고 checkpoint에서 다음 실험을 고르는 자동화 루프를 설계했습니다."
      body={<RlBody />}
      visual={
        <div className={styles.rlVisualGrid}>
          <div className={styles.rlDiagramColumn}>
            <ExplainerFigure
              src="/evidence/robotics/rl-orchestration-v2.png"
              alt="Main Orchestrator가 계획·구현, 테스트, 학습·평가 역할을 나누고 chunk와 checkpoint, 독립 검토를 거쳐 계속·수정·중단으로 판단하는 개념 시각화"
              dark
              className={styles.rlExplainer}
            />
          </div>
        </div>
      }
      keywords={["MuJoCo", "FetchSideBinPlace", "SAC", "HER", "Stable-Baselines3", "Python", "R30O", "TensorBoard"]}
      surface="surface-dark"
      dark
      className={styles.darkProject}
      links={
        <ProjectLinks>
          <a className="related-link" href="https://github.com/hojunjeon/RARL">
            RARL GitHub <span aria-hidden="true">↗</span>
          </a>
          <a className="related-link" href="https://github.com/hojunjeon/RobotRF">
            RobotRF GitHub <span aria-hidden="true">↗</span>
          </a>
        </ProjectLinks>
      }
    />
  );
}

export default function RoboticsPage() {
  return (
    <div className={`site-shell ${styles.roboticsPage}`}>
      <SiteChrome current="robotics" />
      <main id="main">
        <div className="route-hero-slate">
          <PageTitle
            eyebrow="Robotics · Perception to Control"
            title={<>감지한 장면을,<br />로봇의 다음 동작으로 연결합니다.</>}
            lede="사과 수확·분류 Edge AI 로봇과 로봇팔 강화학습 오케스트레이션에서 인식·제어·실험의 경계를 다르게 설계한 과정을 보여줍니다."
          >
            <div className="action-row">
              <a className="button button-primary" href="#project-overview">
                프로젝트 목록 보기 <span aria-hidden="true">↓</span>
              </a>
            </div>
          </PageTitle>
        </div>

        <section id="project-overview" className={`page-body-section surface-wash project-index ${styles.overviewSection}`} aria-label="Robotics 프로젝트 목록">
          <div>
            <div className={`project-index ${styles.overviewGrid}`}>
              {projectOverviews.map((project) => <OverviewCard key={project.index} project={project} />)}
            </div>
          </div>
        </section>

        <AppleProject />
        <RlProject />

        <nav id="related" className={`page-body-section surface-wash ${styles.relatedNav}`} aria-labelledby="related-title">
          <div>
            <p className="eyebrow">Related</p>
            <h2 id="related-title">다른 프로젝트 보기</h2>
            <div className={styles.relatedLinks}>
              <a href="/ai">AI <span aria-hidden="true">→</span></a>
              <a href="/autonomous-driving">Autonomous <span aria-hidden="true">→</span></a>
              <a href="/resume">Resume <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </nav>
      </main>
      <PageFooter current="robotics" />
    </div>
  );
}
