import { PageFooter, PageTitle, SiteChrome } from "../components/SiteChrome";
import { ProjectDetailLayout } from "../components/ProjectDetailLayout";
import styles from "./page.module.css";

export const metadata = {
  title: "AI systems portfolio",
  description:
    "PathFinder, Aegis, Hermes, 하이브리드 주차공간 탐지까지 네 AI 프로젝트의 문제 정의와 구현 흐름을 정리한 페이지입니다.",
};

type MediaAsset = {
  src: string;
  alt: string;
};

type ProjectOverview = {
  index: string;
  type: string;
  title: string;
  message: string;
  href: string;
};

const projectOverviews: ProjectOverview[] = [
  {
    index: "01",
    type: "트러블슈팅형",
    title: "PathFinder",
    message: "채용 정보와 개인 이력을 연결해 면접 준비 로드맵을 만드는 웹 서비스",
    href: "#pathfinder",
  },
  {
    index: "02",
    type: "문제 재정의형",
    title: "Aegis (Sentinel-30)",
    message: "보이스피싱 통화 단서를 검토 가능한 위험정보 이벤트로 만드는 PoC",
    href: "#aegis",
  },
  {
    index: "03",
    type: "운영 고도화형",
    title: "상시 운영형 Hermes 에이전트",
    message: "취업·학습·뉴스·일정 작업의 자동 실행과 기록을 목표로 설계한 개인용 AI 비서",
    href: "#hermes",
  },
  {
    index: "04",
    type: "판단 단위 분리형",
    title: "하이브리드 주차공간 탐지",
    message: "주차 가능 영역·주행 가능 영역·장애물을 함께 구분하는 비전 프로젝트",
    href: "#parking",
  },
];

const pathfinderPrimary: MediaAsset = {
  src: "/generated/pathfinder-explain.png",
  alt: "PathFinder AI가 채용공고와 개인 경험을 연결해 역량 분석과 예상 질문을 만드는 프로젝트 소개",
};

const aegisPrimary: MediaAsset = {
  src: "/generated/aegis-stt-event-profile.png",
  alt: "STT와 대화 단서가 검토 가능한 위험정보 이벤트로 정리되는 Aegis 프로필",
};

const hermesPrimary: MediaAsset = {
  src: "/generated/hermes-role-map.png",
  alt: "사람, Hermes, EPE, Diki, Apostles의 역할 관계를 보여주는 구현 지도",
};

const parkingPrimary: MediaAsset = {
  src: "/evidence/ai/parking-segmentation.png",
  alt: "주차장 영상 위에 주행 가능 영역과 주차면이 분할 표시된 결과 화면",
};

const pathfinderFlow: MediaAsset = {
  src: "/generated/pathfinder-roadmap-flow.png",
  alt: "입력 데이터에서 관계 연결, LLM 생성, 필드 검증을 거쳐 로드맵으로 수렴하는 PathFinder 판단 흐름",
};

function OverviewItem({ project }: { project: ProjectOverview }) {
  return (
    <article className={`project-index-item ${styles.overviewItem}`}>
      <span className={styles.overviewIndex} aria-hidden="true">{project.index}</span>
      <div className={styles.overviewItemBody}>
        <p className={styles.overviewType}>{project.type}</p>
        <h2>{project.title}</h2>
      </div>
      <p className={styles.overviewMessage}>{project.message}</p>
      <a className={styles.overviewLink} href={project.href} aria-label={`${project.title} 프로젝트 보기`}>
        보기 <span aria-hidden="true">↓</span>
      </a>
    </article>
  );
}

function DiagramImage({ src, alt, dark = false }: MediaAsset & { dark?: boolean }) {
  return (
    <div
      className={`${styles.diagramImageFrame}${dark ? ` ${styles.diagramImageFrameDark}` : ""}`}
      role="img"
      aria-label={alt}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

function RelatedLinks() {
  return (
    <nav id="related" className={`page-body-section surface-wash ${styles.relatedNav}`} aria-labelledby="related-title">
      <div>
        <p className="eyebrow">Related</p>
        <h2 id="related-title">다른 프로젝트 보기</h2>
        <div className={styles.relatedLinks}>
          <a href="/robotics">Robotics <span aria-hidden="true">→</span></a>
          <a href="/autonomous-driving">Autonomous <span aria-hidden="true">→</span></a>
          <a href="/resume">Resume <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </nav>
  );
}

export default function AiPage() {
  return (
    <div className="site-shell">
      <SiteChrome current="ai" />
      <main id="main">
        <div className="route-hero-blue">
          <PageTitle
            eyebrow="AI Projects · Decisions over demos"
            title={<>모델을 늘리기보다,<br />판단의 경계를 다시 그렸습니다.</>}
            lede="PathFinder, Aegis, Hermes, 주차공간 탐지. 네 프로젝트에서 무엇이 막혔고 어떤 구조로 바꿨는지, 각 전환점에 맞는 시각 증거와 함께 보여줍니다."
          >
            <div className="action-row">
              <a className="button button-primary" href="#projects-overview">
                프로젝트 목록 보기 <span aria-hidden="true">↓</span>
              </a>
            </div>
          </PageTitle>
        </div>

        <section id="projects-overview" className={`page-body-section surface-wash project-index ${styles.overviewSection}`} aria-label="AI 프로젝트 목록">
          <div>
            <div className={`project-index ${styles.overviewGrid}`}>
              {projectOverviews.map((project) => <OverviewItem key={project.index} project={project} />)}
            </div>
          </div>
        </section>

        <ProjectDetailLayout
          id="pathfinder"
          titleId="pathfinder-title"
          index="01"
          eyebrow="01 / PathFinder · 관계 연결 전환"
          title="PathFinder"
          summary="서류 합격 뒤 이력과 회사 요구를 연결해 면접 준비 순서를 제안하는 팀 웹 서비스"
          facts={{ period: "2026.05", form: "SSAFY 관통 프로젝트(팀)", role: "백엔드·AI 서버(LLM·GraphRAG)" }}
          primer={{
            context: "채용 공고와 내 이력을 바탕으로 취업 준비 순서를 정할 때 사용합니다.",
            flow: "공고·프로필·자소서를 넣으면 관련 정보를 묶고, 역량 차이·예상 질문·준비 순서를 보여주도록 구성했습니다.",
          }}
          primary={pathfinderPrimary}
          decision="입력을 더 넣는 대신, 관계를 연결했습니다."
          surface="surface-wash"
          className={`page-body-section ${styles.projectSection}`}
          body={
            <div className={styles.storyLead} data-story-type="pathfinder">
              <article className={styles.signalBlock}>
                <p className={`${styles.storyKicker} ${styles.storyType}`}>막힌 지점</p>
                <h3>입력을 따로 넘기면, 일반적인 조언이 반복됐습니다.</h3>
                <p>공고·이력·자소서가 서로 연결되지 않아 결과의 근거와 다음 행동이 흐려졌습니다.</p>
              </article>
              <article className={`${styles.signalBlock} ${styles.decisionBlock}`}>
                <p className={`${styles.storyKicker} ${styles.storyType}`}>바꾼 판단</p>
                <h3>기업·사업·제품·운영·직무·역량을 관계로 묶었습니다.</h3>
                <p>데이터를 더 쌓는 대신 GraphRAG로 관계를 연결하고 필드 검증에서 실패한 항목만 다시 만들었습니다.</p>
              </article>
            </div>
          }
          visual={
            <div className={`${styles.proofGrid} ${styles.pathfinderProof}`}>
              <figure className={styles.diagramPanel}>
                <DiagramImage src={pathfinderFlow.src} alt={pathfinderFlow.alt} />
              </figure>
            </div>
          }
          keywords={["FastAPI", "GraphRAG", "LLM pipeline", "Django REST Framework", "Vue.js", "SQL", "Playwright"]}
          links={
            <a className="related-link" href="https://github.com/hojunjeon/PathFinder-AI">
              PathFinder-AI GitHub <span aria-hidden="true">↗</span>
            </a>
          }
        />

        <ProjectDetailLayout
          id="aegis"
          titleId="aegis-title"
          index="02"
          eyebrow="02 / Aegis · 문제 재정의"
          title="Aegis (Sentinel-30)"
          summary="보이스피싱 통화 단서를 검토 가능한 JSON 위험정보 이벤트로 만드는 로컬 전용 PoC"
          facts={{ period: "2026.05", form: "SSAFY×Kakao AI 해커톤(팀)", role: "정보 추출 엔진 설계 및 테스트" }}
          primer={{
            context: "보이스피싱 신호를 포착해 수사 및 서비스 개선을 위한 데이터로 정리하는 흐름을 가정합니다.",
            flow: "사기범 대화를 STT로 전사하고 미끼봇 오케스트레이션으로 위험정보를 추출하면서 다음 대화 텍스트를 생성합니다. 이후 TTS로 미끼봇 답변을 음성으로 변환합니다.",
          }}
          primary={aegisPrimary}
          decision="차단 대신, 수사 검토를 위한 데이터를 남기기로 했습니다."
          surface="surface-wash"
          className={`page-body-section ${styles.projectSection}`}
          body={
            <>
              <div className={styles.reframeChoice} data-story-type="aegis">
              <article className={styles.choiceBefore}>
                <p className={`${styles.storyKicker} ${styles.storyType}`}>기존 보이스피싱 대응 서비스</p>
                <h3>번호 차단</h3>
                <p>통화는 끝나지만 위험 신호와 맥락도 함께 사라집니다.</p>
              </article>
              <div className={styles.choiceArrow} aria-hidden="true">→</div>
              <article className={styles.choiceAfter}>
                <p className={`${styles.storyKicker} ${styles.storyType}`}>문제 재정의</p>
                <h3>통화 유지 · 위험정보 추출</h3>
                <p>대화에서 얻은 단서를 구조화 이벤트로 남기고 사람이 검토할 수 있게 했습니다.</p>
              </article>
              </div>
              <div className={styles.roleGrid}>
              <article>
                <p className={styles.storyKicker}>Orchestrator</p>
                <h3>대화 흐름 조정</h3>
                <p>미끼봇 대화의 다음 단계를 정하고 필요한 정보가 빠지지 않게 전달합니다.</p>
              </article>
              <article>
                <p className={styles.storyKicker}>Extractor</p>
                <h3>위험 단서 구조화</h3>
                <p>대화에서 추출한 항목을 JSON 이벤트 필드에 맞춰 정리합니다.</p>
              </article>
              <article>
                <p className={styles.storyKicker}>Verifier</p>
                <h3>근거와 마스킹 재검토</h3>
                <p>필드 근거와 민감 정보 마스킹을 확인해 검토 가능한 출력만 남깁니다.</p>
              </article>
              </div>
            </>
          }
          visual={
            <div className={`${styles.proofGrid} ${styles.aegisProof}`}>
              <figure className={styles.diagramPanel}>
                <DiagramImage
                  src="/generated/aegis-role-pipeline.png"
                  alt="통화와 미끼봇 대화를 Orchestrator, Extractor, Verifier로 나눠 JSON 위험정보 이벤트와 검토 화면으로 연결하는 Aegis PoC 구조"
                />
              </figure>
            </div>
          }
          keywords={["LLM", "STT", "JSON Schema", "Orchestrator", "Extractor", "Verifier", "Dashboard"]}
        />

        <ProjectDetailLayout
          id="hermes"
          titleId="hermes-title"
          index="03"
          eyebrow="03 / Hermes · 운영 고도화"
          title="상시 운영형 Hermes 에이전트"
          summary="Telegram에서 받은 개인 업무를 실행하고 결과를 기록하는 개인용 AI 비서 시스템"
          facts={{ period: "2026", form: "개인 프로젝트", role: "시스템 설계·운영" }}
          primer={{
            context: "메신저로 개인 할 일을 보내거나 정해진 시간에 작업을 시작하는 개인용 비서 흐름입니다.",
            flow: "작업을 받으면 역할과 상태를 나눠 실행하고, 결과물을 확인한 뒤 Telegram과 Notion에 기록합니다.",
          }}
          primary={hermesPrimary}
          decision="운영에서 생긴 순서 충돌을 상태·기억·기록의 세 경계로 풀었습니다."
          surface="surface-dark"
          dark
          className={`page-body-section ${styles.projectSection} ${styles.darkSection}`}
          body={
            <section className={styles.hermesStory} data-story-type="hermes" aria-labelledby="hermes-development-title">
                <div className={styles.hermesStoryIntro}>
                  <p className={`${styles.storyKicker} ${styles.storyType}`}>전개 단계</p>
                  <h3 id="hermes-development-title">깨진 실행 순서를 Kanban과 Honcho로 고정하고, Recording Harness로 Notion 기록까지 연결했습니다.</h3>
                  <p>planner와 executor가 같은 작업을 동시에 바라보지 않도록 실행 조건, 기억 범위, 완료 산출물의 순서를 각각 분리했습니다.</p>
                </div>

                <ol className={styles.hermesStages} aria-label="Hermes 운영 고도화 단계">
                  <li className={styles.hermesStage}>
                    <span className={styles.stageNumber}>01</span>
                    <div>
                      <p className={styles.stageKicker}>문제 포착</p>
                      <h4>planner · executor 순서 충돌</h4>
                      <p>planner가 끝나기 전에 executor가 실행되고, 한 역할의 결과가 다음 작업 조건을 침범했습니다.</p>
                    </div>
                  </li>
                  <li className={styles.hermesStage}>
                    <span className={styles.stageNumber}>02</span>
                    <div>
                      <p className={styles.stageKicker}>상태 통제</p>
                      <h4>Kanban으로 완료 조건 고정</h4>
                      <p>ready · running · review · done 상태를 나누고 완료된 산출물만 다음 역할로 이동시켰습니다.</p>
                    </div>
                  </li>
                  <li className={styles.hermesStage}>
                    <span className={styles.stageNumber}>03</span>
                    <div>
                      <p className={styles.stageKicker}>기억 분리</p>
                      <h4>Honcho로 역할별 문맥 분리</h4>
                      <p>각 역할이 필요한 기억만 읽도록 경계를 나눠, 이전 작업의 문맥이 다음 실행을 오염시키지 않게 했습니다.</p>
                    </div>
                  </li>
                  <li className={styles.hermesStage}>
                    <span className={styles.stageNumber}>04</span>
                    <div>
                      <p className={styles.stageKicker}>기록 자동화</p>
                      <h4>Recording Harness → Notion</h4>
                      <p>생성·평가·이미지 버전·재실행 상태를 단계별로 기록해 변경 전후와 완료 기준을 추적했습니다.</p>
                    </div>
                  </li>
                </ol>
            </section>
          }
          visual={
              <figure className={`${styles.diagramPanel} ${styles.diagramPanelDark} ${styles.hermesPipeline}`}>
                <div className={styles.diagramPanelHeading}>
                  <p className={styles.storyKicker}>운영 계약</p>
                  <h3>작업 입력부터 Notion 기록까지 한 줄의 흐름으로 묶었습니다.</h3>
                </div>
                <DiagramImage
                  dark
                  src="/generated/hermes-recording-harness-pipeline.png"
                  alt="Hermes 운영 설계에서 Telegram 작업을 Kanban 상태와 Honcho 역할별 기억으로 통제하고 Recording Harness 승인 산출물을 Notion에 기록하는 흐름"
                />
              </figure>
          }
          keywords={["Hermes Agent", "Telegram Bot", "Oracle Cloud", "Kanban", "Honcho", "cron", "n8n", "Notion"]}
        />

        <ProjectDetailLayout
          id="parking"
          titleId="parking-title"
          index="04"
          eyebrow="04 / Hybrid parking AI · 판단 단위 분리"
          title="하이브리드 주차공간 탐지"
          summary="주행 가능 영역·주차면·장애물을 한 장면에서 구분하는 하이브리드 컴퓨터비전 프로젝트"
          facts={{ period: "2025.05", form: "팀 프로젝트", role: "모델 아키텍처 설계·데이터 전처리 파이프라인" }}
          primer={{
            context: "도로 영상에서 주행 가능 영역과 주차면, 장애물을 나눠 보는 장면에 사용합니다.",
            flow: "영상과 라벨을 정리한 뒤 영역 분할과 객체 탐지를 따로 실행하고, 두 결과를 한 화면에 합칩니다.",
          }}
          primary={parkingPrimary}
          decision="하나의 모델 대신, 판단 단위로 나눴습니다."
          surface="surface-wash"
          className={`page-body-section ${styles.projectSection}`}
          body={
            <>
              <div className={styles.parkingLead} data-story-type="parking">
              <article className={styles.signalBlock}>
                <p className={`${styles.storyKicker} ${styles.storyType}`}>관찰한 증상</p>
                <h3>YOLOv8-seg 단일 모델은 야간·역광에서 흔들렸습니다.</h3>
                <p>픽셀 경계와 주차면 객체 위치를 한 모델의 판단으로 묶은 것이 문제였습니다.</p>
              </article>
              <article className={`${styles.signalBlock} ${styles.decisionBlock}`}>
                <p className={`${styles.storyKicker} ${styles.storyType}`}>바꾼 구조</p>
                <h3>영역 분할과 객체 탐지를 병렬로 처리했습니다.</h3>
                <p>SegFormer와 YOLOv11이 각자 잘하는 단위를 판단한 뒤 argmax에서 결과를 결합합니다.</p>
              </article>
              </div>
              <div className={styles.parallelCards}>
              <article>
                <p className={`${styles.storyKicker} ${styles.storyType}`}>영역 판단</p>
                <h3>SegFormer</h3>
                <p>주행 가능 영역의 픽셀 경계를 분할해 야간·역광의 장면 변화를 따라갑니다.</p>
              </article>
              <article>
                <p className={`${styles.storyKicker} ${styles.storyType}`}>객체 판단</p>
                <h3>YOLOv11</h3>
                <p>주차면 객체 위치를 찾아 영역 분할 결과와 함께 결합할 기준을 만듭니다.</p>
              </article>
              </div>
            </>
          }
          visual={
            <div className={`${styles.proofGrid} ${styles.parkingProof}`}>
              <figure className={styles.diagramPanel}>
                <DiagramImage
                  src="/generated/parking-hybrid-pipeline.png"
                  alt="입력과 EDA 뒤 SegFormer 영역 분할과 YOLOv11 객체 탐지를 병렬 처리하고 argmax에서 결합하는 주차공간 탐지 흐름"
                />
              </figure>
            </div>
          }
          keywords={["SegFormer", "YOLOv11", "YOLOv8-seg", "OpenCV", "Python", "AIHub dataset"]}
        />

        <RelatedLinks />
      </main>
      <PageFooter current="ai" />
    </div>
  );
}
