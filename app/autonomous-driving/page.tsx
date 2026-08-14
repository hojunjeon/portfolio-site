import { ProjectDetailLayout } from "../components/ProjectDetailLayout";
import { PageFooter, PageTitle, SiteChrome } from "../components/SiteChrome";
import styles from "./page.module.css";

export const metadata = {
  title: "Autonomous driving portfolio",
  description:
    "점자블록 손상 탐지 E2E 서비스, 어린이용 전동차 개조 차량의 미션 주행, ROS2·Gazebo 진단 순서를 프로젝트별 흐름으로 정리했습니다.",
};

type ProjectOverview = {
  index: string;
  title: string;
  type: string;
  message: string;
  href: string;
};

const projectOverviews: ProjectOverview[] = [
  {
    index: "01",
    title: "걸음걸음",
    type: "개발 단계형 · mode routing",
    message: "점자블록 손상 탐지를 순찰·촬영·서버 판독·관리자 대시보드로 잇는 E2E 서비스",
    href: "#patrol-robot",
  },
  {
    index: "02",
    title: "자율주행 SW 경진대회",
    type: "역할 경계형 · 차량 제어",
    message: "실내 모사 트랙의 주행·미션을 다룬 자율주행 차량 대회",
    href: "#competition",
  },
  {
    index: "03",
    title: "ROS2 + Gazebo",
    type: "트러블슈팅형 · 환경 고정",
    message: "차선·신호·표지판·보행자 시나리오를 통합하고 차간거리 분기를 조정 중인 ROS2·Gazebo 시뮬레이션",
    href: "#ros2-simulation",
  },
];

function OverviewList({ projects }: { projects: ProjectOverview[] }) {
  return (
    <ol className={`project-index ${styles.overviewList}`} aria-label="Autonomous 프로젝트 목록">
      {projects.map((project) => (
        <li className={`project-index-item ${styles.overviewItem}`} key={project.index}>
          <span className={styles.overviewIndex}>{project.index}</span>
          <div className={styles.overviewTitleBlock}>
            <span className={styles.overviewType}>{project.type}</span>
            <h2>{project.title}</h2>
          </div>
          <p className={styles.overviewMessage}>{project.message}</p>
          <a className={styles.overviewLink} href={project.href} aria-label={`${project.title} 프로젝트 보기`}>
            보기 <span aria-hidden="true">↓</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

function PatrolModes() {
  const modes = [
    {
      index: "01",
      title: "점자블록 주행",
      description: "점자블록을 밟지 않고 옆으로 따라가도록 카메라 geometry로 경계를 잡고 offset 경로를 계산합니다.",
      src: "/evidence/autonomous/generated/mode-tactile-concept.png",
      alt: "점자블록 옆을 주행하는 로봇",
    },
    {
      index: "02",
      title: "일반 보도블록 주행",
      description: "점자블록이 없는 일반 보도블록 구간에서는 일반 경로로 순찰을 이어 갑니다.",
      src: "/evidence/autonomous/generated/mode-general-sidewalk-concept.png",
      alt: "일반 보도블록을 주행하는 로봇",
    },
    {
      index: "03",
      title: "장애물 회피",
      description: "주행 경로 앞 장애물을 만나면 안전하게 멈추거나 우회할 수 있도록 별도 모드로 검토한 흐름입니다.",
      src: "/evidence/autonomous/generated/mode-obstacle-avoidance-concept.png",
      alt: "보도 위 장애물을 피하는 로봇",
    },
  ];

  return (
    <div className={styles.signatureArtifact}>
      <div className={styles.artifactHeading}>
        <p className={styles.sectionTag}>signature artifact · mode routing</p>
        <p>입력은 달라도 같은 주행 계약으로 합류하는 세 가지 모드입니다.</p>
      </div>
      <ol className={styles.modeSequence} aria-label="걸음걸음 자율주행 3모드">
        {modes.map((mode) => (
          <li className={styles.modeRow} key={mode.title}>
            <span className={styles.modeIndex}>{mode.index}</span>
            <div className={styles.modeCopy}>
              <h3>{mode.title}</h3>
              <p>{mode.description}</p>
            </div>
            <figure className={styles.modeEvidence}>
              <img src={mode.src} alt={mode.alt} loading="lazy" decoding="async" />
            </figure>
          </li>
        ))}
      </ol>
    </div>
  );
}

function EnvironmentFigure() {
  return (
    <figure className={styles.signatureArtifact}>
      <div className={styles.artifactHeading}>
        <p className={styles.sectionTag}>signature artifact · environment boundary</p>
        <p>실행 환경을 고정한 뒤 node, namespace, 시나리오를 순서대로 검증합니다.</p>
      </div>
      <div className={styles.artifactFrame}>
        <img
          src="/evidence/autonomous/generated/ros2-diagnostic-concept.png"
          alt="Docker·node·namespace·시나리오를 분리해 ROS2 실행 환경을 고정하는 환경 격리 흐름"
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption>Docker → node/namespace → 시나리오 단위 검증</figcaption>
    </figure>
  );
}

function PatrolBody() {
  return (
    <div className={`${styles.projectBodyGrid} ${styles.patrolBody}`}>
      <article className={styles.decisionLead}>
        <p className={styles.sectionTag}>개발 전개</p>
        <h3>점자블록 구간만 따라가면 전체 순찰 루트를 달릴 수 없었습니다.</h3>
        <p>일반 보도블록 구간도 달려야 해서 일반 보도블록 주행 모드를 추가하고, 점자블록 주행 모드와 라우팅했습니다.</p>
      </article>
      <div className={styles.routeRail}>
        <p className={styles.sectionTag}>공통 주행 흐름</p>
        <p>모드가 달라도 카메라 입력·경로 계산·안전 출력을 같은 흐름으로 이어, 구간에 따라 주행 조건만 바꾸도록 정리했습니다.</p>
        <ol className={styles.routeSteps} aria-label="공통 주행 흐름">
          <li><span>입력</span><strong>camera geometry</strong></li>
          <li><span>판단</span><strong>offset path</strong></li>
          <li><span>출력</span><strong>safety target</strong></li>
        </ol>
      </div>
    </div>
  );
}

function CompetitionBody() {
  return (
    <div className={`${styles.projectBodyGrid} ${styles.competitionBody}`}>
      <article className={styles.decisionLead}>
        <p className={styles.sectionTag}>대회 조건과 구현</p>
        <h3>어린이용 전동차를 개조한 차량에서 세 가지 미션의 제어 응답을 다뤘습니다.</h3>
        <p>카메라·LiDAR에서 들어온 인식 결과를 속도·조향 명령으로 바꾸고, 트랙 주행·장애물 회피·주차라는 미션 상황에 맞춰 제어 응답을 조정했습니다.</p>
        <p className={styles.resultNote}>Team Tino 결과 · 2024.08 · 장려상</p>
      </article>
      <div className={styles.missionRail}>
        <p className={styles.sectionTag}>세 가지 주행 모드</p>
        <ol className={styles.missionSequence} aria-label="경진대회 세 가지 미션">
          <li><span>01</span><strong>트랙 주행</strong><small>차선 중심에 맞춰 속도·조향 제어</small></li>
          <li><span>02</span><strong>장애물 회피</strong><small>장애물 감지 뒤 주행 응답 조정</small></li>
          <li><span>03</span><strong>주차</strong><small>정지·조향 응답을 미션 구간에 맞춤</small></li>
        </ol>
      </div>
    </div>
  );
}

function SimulationBody() {
  return (
    <div className={`${styles.projectBodyGrid} ${styles.diagnosticBody}`}>
      <div className={styles.diagnosticBeforeAfter}>
        <article>
          <p className={styles.sectionTag}>증상</p>
          <h3>연쇄 실행 오류가 한 원인처럼 보였습니다.</h3>
          <p>Ubuntu·ROS2·Gazebo 의존성이 달라 환경 오류와 기능 오류를 한 번에 구분하기 어려웠습니다.</p>
        </article>
        <article>
          <p className={styles.sectionTag}>원인</p>
          <h3>환경·노드·시나리오가 한꺼번에 얽혀 있었습니다.</h3>
          <p>실행 환경의 차이, 기능별 node·차량 namespace의 충돌, 시나리오 파라미터의 차이를 따로 확인해야 했습니다.</p>
        </article>
      </div>
      <ol className={styles.diagnosticSteps} aria-label="ROS2 실행 오류를 나눈 해결 순서">
        <li><span>01</span><div><strong>환경 고정</strong><p>Docker · Ubuntu 20.04 · ROS2 Foxy · Gazebo Classic</p></div></li>
        <li><span>02</span><div><strong>node/namespace 분리</strong><p>기능별 node · 차량 namespace · Drive_Bot</p></div></li>
        <li><span>03</span><div><strong>시나리오 단위 검증</strong><p>신호등 · 좌회전 · 속도제한 · Ackermann</p></div></li>
      </ol>
    </div>
  );
}

export default function AutonomousDrivingPage() {
  return (
    <div className="site-shell">
      <SiteChrome current="autonomous" />
      <main id="main">
        <div className="route-hero-warm">
          <PageTitle
            eyebrow="Autonomous Driving · Robot · Vehicle · Simulation"
            title={<>주행을 나누고<br />실행 조건을 고정했습니다.</>}
            lede="모드 라우팅, 차량 제어 역할, 실행 환경 고정이라는 서로 다른 판단을 프로젝트별 흐름으로 보여줍니다."
          >
            <div className="action-row">
              <a className="button button-primary" href="#project-overview">
                프로젝트 목록 보기 <span aria-hidden="true">↓</span>
              </a>
            </div>
          </PageTitle>
        </div>

        <section id="project-overview" className={`page-body-section surface-wash project-index ${styles.overviewSection}`} aria-label="Autonomous 프로젝트 목록">
          <div className={styles.overviewWrap}>
            <div className={styles.overviewIntro}>
              <p className="eyebrow">Three project threads</p>
              <p>각 프로젝트는 모드→경계→출력이라는 하나의 판단 문법으로 읽을 수 있습니다.</p>
            </div>
            <OverviewList projects={projectOverviews} />
          </div>
        </section>

        <ProjectDetailLayout
          id="patrol-robot"
          titleId="patrol-robot-title"
          index="01"
          eyebrow="01 / 걸음걸음 · 개발 단계형"
          title="걸음걸음 — 점자블록 주행 로봇"
          summary="점자 블록 손상으로 인해 생기는 어려움을 해결하는 자율주행 점자블록 손상 탐지 E2E 서비스"
          facts={{
            period: "2026.07–08",
            form: "SSAFY 공통 프로젝트(팀)",
            role: "팀장 · HW/제어·ROS2 통합",
          }}
          primer={{
            context: "점자 블록 손상으로 인해 문제를 겪는 시각 장애인과 지자체 유지보수 관리자를 돕기 위한 자율주행 로봇",
            flow: "정해진 순찰 루트 자율주행→점자블록 이미지 촬영→서버 VLM 손상 판독→관리자용 대시보드 데이터.",
          }}
          surface="surface-pearl"
          primary={{
            src: "/evidence/autonomous/ggeolgeol/ggeolgeol-driving-8x.gif",
            alt: "걸음걸음 로봇이 점자블록 옆을 주행하는 실제 주행 기록 GIF",
            caption: "실제 주행 기록 · 점자블록 옆으로 offset 경로를 유지하는 순찰",
          }}
          decision="일반 보도블록 구간도 달려야 해서 일반 보도블록 주행 모드를 추가하고 점자블록 주행 모드와 라우팅했습니다."
          body={<PatrolBody />}
          visual={<PatrolModes />}
          keywords={["ROS 2", "Python", "OpenCV", "Camera geometry", "Offset path", "Safety target", "Static contract"]}
        />

        <ProjectDetailLayout
          id="competition"
          titleId="competition-title"
          index="02"
          eyebrow="02 / 자율주행 SW 경진대회 · 역할 경계형"
          title="제3회 미래형자동차 자율주행 SW 경진대회"
          summary="어린이용 전동차를 개조한 Camera/LiDAR 차량이 실내 모사 트랙에서 주행·미션을 수행하는 경진대회"
          facts={{
            period: "2024.05–08",
            form: "제3회 미래형자동차 자율주행 SW 경진대회 · Team Tino(한국공학대)",
            role: "속도·조향 제어",
          }}
          primer={{
            context: "어린이용 전동차를 개조한 카메라·LiDAR 차량으로 실내 모사 트랙의 주행·미션을 수행하는 대회입니다.",
            flow: "카메라와 LiDAR 정보를 받아 속도와 조향 값을 정하고, 차량 명령으로 넘기는 역할입니다.",
          }}
          surface="surface-dark"
          dark
          primary={{
            src: "/evidence/autonomous/competition/futurecar-2024-official.png",
            alt: "제3회 미래형자동차 자율주행 SW 경진대회 공식 포스터",
            caption: "공식 대회 포스터 · 센서 인식이 차량 제어로 넘어가는 경계",
          }}
          decision="인식 결과가 속도·조향 명령으로 넘어가는 제어 경계를 맡았습니다."
          body={<CompetitionBody />}
          keywords={["ROS", "OpenCV", "LiDAR", "초음파 센서", "Camera"]}
        />

        <ProjectDetailLayout
          id="ros2-simulation"
          titleId="ros2-simulation-title"
          index="03"
          eyebrow="03 / ROS2 + Gazebo · 트러블슈팅형"
          title="ROS2 + Gazebo 자율주행 시뮬레이션"
          summary="ROS2 Foxy·Gazebo Classic에서 차선·신호·표지판·보행자 시나리오를 통합하고 차간거리 분기를 조정 중인 자율주행 시뮬레이션"
          facts={{
            period: "2025.07–08",
            form: "팀 프로젝트(앨리스 자율주행 트랙)",
            role: "통합 제어 알고리즘·ROS2 노드 아키텍처",
          }}
          primer={{
            context: "Ubuntu 20.04 Docker에서 Gazebo 시나리오를 돌리며 원인을 나누는 작업입니다.",
            flow: "카메라·LiDAR와 주변 상황을 기능별 노드로 나누고, Drive_Bot이 Ackermann 명령으로 움직이도록 연결합니다.",
          }}
          surface="surface-wash"
          primary={{
            src: "/evidence/autonomous/ros2/ros2-gazebo.png",
            alt: "ROS2와 Gazebo 자율주행 시나리오 이미지",
            caption: "ROS2 + Gazebo 실행 화면 · 증상을 환경과 시나리오 단위로 분해",
          }}
          decision="증상과 원인을 분리한 뒤 환경 고정·node/namespace 분리·시나리오 단위 검증의 순서로 원인을 좁혔습니다."
          body={<SimulationBody />}
          visual={<EnvironmentFigure />}
          keywords={["ROS2 Foxy", "Gazebo Classic", "Ubuntu 20.04", "Docker", "Python", "C++", "LiDAR", "PID", "Ackermann"]}
        />

        <section id="related" className={`page-body-section surface-pearl ${styles.relatedSection}`} aria-labelledby="related-title">
          <div>
            <div className={styles.relatedHeading}>
              <p className="eyebrow">Related</p>
              <h2 id="related-title">다른 프로젝트로 이어가기</h2>
            </div>
            <nav className={styles.relatedLinks} aria-label="관련 프로젝트 페이지">
              <a href="/ai">AI 프로젝트 <span aria-hidden="true">→</span></a>
              <a href="/robotics">Robotics 프로젝트 <span aria-hidden="true">→</span></a>
              <a href="/resume">Resume <span aria-hidden="true">→</span></a>
            </nav>
          </div>
        </section>
      </main>
      <PageFooter current="autonomous" />
    </div>
  );
}
