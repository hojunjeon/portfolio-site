import { PageFooter, SiteChrome } from "../components/SiteChrome";
import { Timeline } from "../components/Viz";
import styles from "./page.module.css";

const focusAreas = ["AI Systems", "Robotics", "Autonomous Driving"];

type PrimaryMedia = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  objectPosition: string;
};

function routeImage(
  src: string,
  alt: string,
  width?: number,
  height?: number,
  objectPosition = "50% 50%",
): PrimaryMedia {
  return { src, alt, width, height, objectPosition };
}

const pathfinderPrimary = routeImage(
  "/evidence/ai/pathfinder-h0.png",
  "채용공고·역량 차이·내 경험·면접 질문을 연결해 방향을 제시하는 PathFinder 이미지",
  1365,
  1152,
  "50% 50%",
);

const aegisPrimary = routeImage(
  "/generated/resume/aegis-baitbot-runtime-orchestration-v2.png?v=2",
  "합성 통화와 STT 입력을 Orchestrator, Extractor, Verifier가 처리하고, 검증 실패 시 Extractor 재추출로 되돌린 뒤 승인된 응답은 TTS로 읽고 마스킹·근거 연결 JSON 이벤트는 외부 기관 전송 없이 로컬 수동 검토 화면으로 보내는 Aegis 미끼봇 PoC 개념 일러스트",
  1200,
  896,
  "50% 50%",
);

const applePrimary = routeImage(
  "/generated/resume/apple-edge-pipeline-concept.png",
  "카메라 인식부터 목표 좌표·Jacobian 제어·구동으로 이어지는 Edge 파이프라인 개념 일러스트",
  1448,
  1086,
  "50% 52%",
);

const rlPrimary = routeImage(
  "/evidence/robotics/robotrl-curriculum-preview.png",
  "RobotRL curriculum의 맥락을 보여주는 시뮬레이션 환경 이미지",
  640,
  480,
  "50% 50%",
);

const ggeolgeolPrimary = routeImage(
  "/evidence/autonomous/ggeolgeol/ggeolgeol-camera-robot.png?v=2",
  "점자블록 옆 경로를 주행하는 카메라 탑재 걸음걸음 순찰 로봇 이미지",
  1672,
  941,
  "50% 50%",
);

const skillCategories = [
  {
    category: "Agent Workflow Design",
    domain: "AI systems · orchestration",
    usedIn: ["PathFinder", "Aegis", "로봇팔 강화학습"],
    coreSkillCount: 4,
    skills: [
      "오케스트레이션",
      "Prompt design",
      "Context engineering",
      "Harness",
      "Evaluation loop",
      "Graph engineering",
      "Human-in-the-loop",
      "MCP",
    ],
  },
  {
    category: "AI Systems & Backend",
    domain: "LLM · backend contracts",
    usedIn: ["PathFinder", "Aegis"],
    coreSkillCount: 4,
    skills: [
      "Python",
      "LLM",
      "RAG",
      "GraphRAG",
      "FastAPI",
      "Django REST Framework",
      "SQL",
      "Playwright",
      "Vue.js",
      "Docker",
    ],
  },
  {
    category: "Robotics & Control",
    domain: "sensing · control · ROS",
    usedIn: ["사과 로봇", "로봇팔 강화학습", "걸음걸음"],
    coreSkillCount: 4,
    skills: [
      "ROS 2",
      "Jetson Orin Nano",
      "MuJoCo",
      "Gazebo Classic",
      "PCA9685",
      "PID control",
      "IK / Jacobian",
      "SAC",
      "HER",
      "Stable-Baselines3",
    ],
  },
  {
    category: "Perception & Edge",
    domain: "vision · embedded devices",
    usedIn: ["사과 로봇", "AI 상세", "걸음걸음"],
    coreSkillCount: 4,
    skills: [
      "OpenCV",
      "YOLOv5",
      "YOLOv8-seg",
      "YOLOv11",
      "SegFormer",
      "Intel RealSense D415",
      "LiDAR",
      "Raspberry Pi",
      "Arduino",
      "Dynamixel",
    ],
  },
];

type ProjectLink = {
  label: string;
  href: string;
};

type ResumeProject = {
  index: string;
  domain: string;
  title: string;
  appeal: string;
  period?: string;
  format: string;
  role: string;
  summary: string;
  outcome: string;
  metric?: string;
  stack: string[];
  primaryMedia: PrimaryMedia;
  detailHref: string;
  detailLabel: string;
  github?: ProjectLink[];
};

const projects: ResumeProject[] = [
  {
    index: "01",
    domain: "AI",
    title: "PathFinder",
    appeal: "입력을 더 넣는 대신, 관계를 연결했습니다.",
    period: "2026.05",
    format: "SSAFY 관통 프로젝트(팀)",
    role: "백엔드·AI 서버(LLM/GraphRAG)",
    summary: "기업·공고·이력을 연결해 면접 로드맵을 만드는 서비스",
    outcome: "GraphRAG와 검증 루프로 생성 결과를 다룬다.",
    metric: "내부 테스트 필드 누락·환각 오류 반복 빈도 48% → 11%",
    stack: ["FastAPI", "GraphRAG", "LLM pipeline", "Django REST Framework", "Vue.js"],
    primaryMedia: pathfinderPrimary,
    detailHref: "/ai#pathfinder",
    detailLabel: "AI · PathFinder",
    github: [{ label: "PathFinder GitHub", href: "https://github.com/hojunjeon/PathFinder-AI" }],
  },
  {
    index: "02",
    domain: "AI",
    title: "Aegis (Sentinel-30)",
    appeal: "차단 대신, 수사에 쓸 데이터를 남기기로 했습니다.",
    period: "2026.05",
    format: "SSAFY×Kakao AI 해커톤(팀)",
    role: "기획·정보 추출 엔진 설계",
    summary: "통화를 유지하며 수사용 위험정보를 추출하는 AI 미끼봇 PoC",
    outcome: "차단 문제를 데이터 추출 문제로 바꾸고 3역할 검증 구조를 설계했다.",
    metric: "STT 5개 시나리오 · A 38.3% vs B 100%",
    stack: ["LLM", "STT", "JSON Schema", "Orchestrator", "Extractor", "Verifier"],
    primaryMedia: aegisPrimary,
    detailHref: "/ai#aegis",
    detailLabel: "AI · Aegis",
  },
  {
    index: "03",
    domain: "Robotics",
    title: "사과 수확·분류 Edge AI 로봇",
    appeal: "인식이 아니라 제어를 고쳐, 수확 동작을 완성했습니다.",
    period: "2023.07–2024.07",
    format: "학부 졸업작품(팀)",
    role: "제어 알고리즘 설계·HW/SW 통합",
    summary: "인식·제어·수확·무게 분류를 잇는 임베디드 로봇",
    outcome: "Raspberry Pi·Arduino 통신과 인식 파이프라인을 통합해 인식→수확→분류 흐름을 연결했다.",
    metric: "위치 오차 80% 이상 감소 · 인식률 94%",
    stack: ["YOLOv5", "RealSense D415", "Raspberry Pi", "Arduino", "Dynamixel", "UART"],
    primaryMedia: applePrimary,
    detailHref: "/robotics#apple-robot",
    detailLabel: "Robotics · 사과 로봇",
  },
  {
    index: "04",
    domain: "Robotics",
    title: "로봇팔 강화학습 오케스트레이션",
    appeal: "로봇팔 역학 제어와 강화학습을, 생성·검증이 분리된 AI 실험 루프로 확장했습니다.",
    format: "개인 프로젝트",
    role: "실험 설계·동작·보상·실패 조건·오케스트레이션",
    summary: "역학 제어와 강화학습을 생성·검증 분리 루프로 확장",
    outcome: "단계 게이트와 Main Orchestrator로 계획·구현·평가를 분리했다.",
    stack: ["MuJoCo", "FetchSideBinPlace", "SAC", "HER", "Stable-Baselines3", "TensorBoard"],
    primaryMedia: rlPrimary,
    detailHref: "/robotics#rl-orchestration",
    detailLabel: "Robotics · RL 오케스트레이션",
    github: [
      { label: "RARL GitHub", href: "https://github.com/hojunjeon/RARL" },
      { label: "RobotRF GitHub", href: "https://github.com/hojunjeon/RobotRF" },
    ],
  },
  {
    index: "05",
    domain: "Autonomous",
    title: "걸음걸음",
    appeal: "주행 모드를 나누고 ROS 노드가 다음 행동을 선택하게 했습니다.",
    period: "2026.07–08",
    format: "SSAFY 공통 프로젝트(팀)",
    role: "팀장·HW/제어·ROS2 통합",
    summary: "ROS2 노드와 두 주행 모드를 연결한 점자블록 순찰 로봇",
    outcome: "일반 도로 모드·점자블록 오프셋 모드와 mode routing을 구현했다.",
    stack: ["Jetson Orin Nano", "ROS 2", "Python", "OpenCV", "Camera geometry", "PCA9685"],
    primaryMedia: ggeolgeolPrimary,
    detailHref: "/autonomous-driving#patrol-robot",
    detailLabel: "Autonomous · 걸음걸음",
  },
];

export const metadata = {
  title: "Resume",
  description: "AI 시스템·로보틱스·자율주행 프로젝트에서 문제를 구조화하고 구현·검토 흐름을 설계한 전호준의 작업 기록입니다.",
};

export default function ResumePage() {
  return (
    <div className="site-shell">
      <SiteChrome current="resume" />
      <main id="main">
        <header id="profile" className="resume-header">
          <div className={`resume-header-grid page-hero ${styles.resumeHero}`}>
            <div className={styles.headerIdentity}>
              <img
                src="/evidence/profile.png"
                alt="전호준 프로필 사진"
                width="360"
                height="480"
                className={styles.profilePhoto}
              />
              <div className={styles.heroCopy}>
                <h1 className={styles.identityName}>전호준</h1>
                <p className={styles.heroLede}>
                  AI 시스템·로보틱스·자율주행 프로젝트에서 문제를 나누고 구현과 검증이 이어지는 흐름을 설계했습니다.
                </p>
                <ul className={`keyword-row ${styles.heroKeywords}`} aria-label="프로필 분야">
                  {focusAreas.map((area) => <li key={area}>{area}</li>)}
                </ul>
              </div>
            </div>
            <address className={`resume-contact ${styles.contactPanel}`} aria-label="연락처">
              <p className={styles.contactHeading}>Contact</p>
              <a className={styles.contactItem} href="mailto:hoj0902@naver.com">
                <span className={styles.contactLabel}>Email</span>
                <span>hoj0902@naver.com</span>
              </a>
              <a className={styles.contactItem} href="tel:+821062893758">
                <span className={styles.contactLabel}>Phone</span>
                <span>010-6289-3758</span>
              </a>
              <a className={styles.contactItem} href="https://github.com/hojunjeon?tab=repositories" target="_blank" rel="noreferrer">
                <span className={styles.contactLabel}>GitHub</span>
                <span>github.com/hojunjeon</span>
              </a>
            </address>
          </div>
        </header>

        <section id="skills" className="page-body-section resume-section surface-wash" aria-labelledby="skills-title">
          <div className="portfolio-container">
            <div className="resume-section-title"><span className="section-number">01</span><h2 id="skills-title">Technical Skills</h2></div>
            <div className={`skill-grid ${styles.skillGrid}`}>
              {skillCategories.map((category) => (
                <article key={category.category} className={`skill-group ${styles.skillCard}`}>
                  <h3>{category.category}</h3>
                  <p className={styles.skillScope}>{category.domain}</p>
                  <p className={styles.skillUsage}>
                    <span className={styles.skillLabel}>Used in</span>
                    <span>{category.usedIn.join(" · ")}</span>
                  </p>
                  <div className={styles.skillSet}>
                    <p className={styles.skillSetLabel}>Core</p>
                    <ul className={styles.skillList} aria-label={`${category.category} 핵심 기술`}>
                      {category.skills.slice(0, category.coreSkillCount).map((skill) => (
                        <li key={skill} className={`${styles.skillItem} ${styles.skillItemCore}`}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.skillSet}>
                    <p className={styles.skillSetLabel}>Supporting</p>
                    <ul className={`${styles.skillList} ${styles.skillListSupporting}`} aria-label={`${category.category} 지원 기술`}>
                      {category.skills.slice(category.coreSkillCount).map((skill) => (
                        <li key={skill} className={styles.skillItem}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="page-body-section resume-section" aria-labelledby="projects-title">
          <div className="portfolio-container">
            <div className="resume-section-title"><span className="section-number">02</span><h2 id="projects-title">Selected Projects</h2></div>
            <div className="resume-projects">
              {projects.map((project) => (
                <article key={project.index} className={`resume-project ${styles.projectCard}`}>
                  <div className={styles.projectIndex} aria-hidden="true">
                    <span>{project.index}</span>
                    <span className={styles.projectDomain}>{project.domain}</span>
                  </div>
                  <div className={styles.projectBody}>
                    <header className={styles.projectHeader}>
                      <h3>{project.title}</h3>
                      <p className={styles.projectAppeal}>{project.appeal}</p>
                    </header>
                    <div className={`media-slot ${styles.projectVisual}`}>
                      <div className={styles.projectImageFrame}>
                        <img
                          src={project.primaryMedia.src}
                          alt={project.primaryMedia.alt}
                          width={project.primaryMedia.width}
                          height={project.primaryMedia.height}
                          loading="lazy"
                          decoding="async"
                          className={styles.projectImage}
                          style={{ objectPosition: project.primaryMedia.objectPosition }}
                        />
                      </div>
                    </div>
                    <div className={styles.projectDetails}>
                      <table className={styles.projectTable} aria-label={`${project.title} 상세 정보`}>
                        <tbody>
                          <tr>
                            <th scope="row">개요</th>
                            <td>{project.summary}</td>
                          </tr>
                          <tr>
                            <th scope="row">기간 · 형태</th>
                            <td>
                              <div className={styles.projectMetaValue}>
                                {project.period && <span>{project.period}</span>}
                                <span>{project.format}</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">개인 역할</th>
                            <td>{project.role}</td>
                          </tr>
                          <tr>
                            <th scope="row">결과</th>
                            <td>{project.outcome}</td>
                          </tr>
                          {project.metric && (
                            <tr className={styles.projectTableMetric}>
                              <th scope="row">보조 지표</th>
                              <td>{project.metric}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className={styles.projectStackBlock}>
                      <p className={styles.stackLabel}>기술 스택</p>
                      <ul className={`keyword-row ${styles.projectStack}`} aria-label={`${project.title} 기술 스택`}>
                        {project.stack.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                    <div className={`resume-project-links ${styles.projectLinks}`}>
                      <a className="resume-detail-link" href={project.detailHref}>{project.detailLabel} 상세 <span aria-hidden="true">→</span></a>
                      {project.github?.map((link) => (
                        <a key={link.href} className="external-link" href={link.href} target="_blank" rel="noreferrer">
                          {link.label} <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="page-body-section resume-section surface-wash" aria-labelledby="education-title">
          <div className="portfolio-container">
            <div className="resume-section-title"><span className="section-number">03</span><h2 id="education-title">Education &amp; Training</h2></div>
            <Timeline
              items={[
                { date: "2019.03", title: "기계설계공학부 학사 시작", desc: "한국공학대학교" },
                { date: "2021.05", title: "육군 입대", desc: "병장 만기전역 2022.10" },
                { date: "2021.09", title: "학부사무실 근로장학생", desc: "문서 관리 · 프로그램 설치 · 행사 지원" },
                { date: "2023.07", title: "졸업작품 시작", desc: "사과 수확·분류 Edge AI 로봇" },
                { date: "2024.08", title: "자율주행 SW 경진대회 장려상", desc: "제3회 미래형자동차 자율주행 SW 경진대회" },
                { date: "2025.02", title: "학사 졸업", desc: "학점 4.22 / 4.5" },
                { date: "2025.03", title: "자율주행 AI 트랙 (앨리스)", desc: "2025.08 수료 · 이미지 처리, NLP, 강화학습" },
                { date: "2026.01", title: "SSAFY 15기 입과", desc: "삼성청년SW / AI아카데미" },
              ]}
            />
          </div>
        </section>

        <section id="additional" className="page-body-section resume-section" aria-labelledby="additional-title">
          <div className="portfolio-container">
            <div className="resume-section-title"><span className="section-number">04</span><h2 id="additional-title">Awards &amp; Additional Work</h2></div>
            <div className="content-grid">
              <article className="info-card">
                <p className="card-kicker">활동</p>
                <h3>배드민턴 동아리 운영기획부장</h3>
                <p>한국공학대학교 · 랜덤 매칭, 홍보전 부스, 신입 환영회, MT 운영</p>
                <ul className="pill-list" aria-label="배드민턴 동아리 활동">
                  {["행사 기획", "신입 모집", "정규 동아리 승격"].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
              <article className="info-card">
                <p className="card-kicker">경험</p>
                <h3>학부사무실 근로장학생</h3>
                <p>2021.09 – 2024.08</p>
                <ul className="pill-list" aria-label="근로장학 업무">
                  {["문서 관리", "프로그램 설치", "실습실 유지", "행사 지원"].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            </div>
          </div>
        </section>
      </main>
      <PageFooter current="resume" />
    </div>
  );
}
