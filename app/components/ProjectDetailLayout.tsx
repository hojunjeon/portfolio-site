import type { ReactNode } from "react";
import styles from "./ProjectDetailLayout.module.css";

type ProjectSurface = "surface-wash" | "surface-dark" | "surface-pearl";

export type ProjectDetailLayoutProps = {
  id: string;
  titleId: string;
  index: string;
  eyebrow: string;
  title: string;
  summary: string;
  facts: {
    period?: string;
    form: string;
    role: string;
  };
  primer: {
    context: string;
    flow: string;
  };
  primary: {
    src: string;
    alt: string;
    caption?: string;
  };
  decision: string;
  body: ReactNode;
  visual?: ReactNode;
  keywords: string[];
  surface?: ProjectSurface;
  dark?: boolean;
  links?: ReactNode;
  className?: string;
};

export function ProjectDetailLayout({
  id,
  titleId,
  index,
  eyebrow,
  title,
  summary,
  facts,
  primer,
  primary,
  decision,
  body,
  visual,
  keywords,
  surface = "surface-wash",
  dark = false,
  links,
  className,
}: ProjectDetailLayoutProps) {
  const rootClassName = Array.from(new Set([
    styles.root,
    "page-body-section",
    "unified-project-detail",
    surface,
    dark ? styles.dark : "",
    className ?? "",
  ].flatMap((value) => value.split(/\s+/).filter((token) => token && token !== "undefined")))).join(" ");

  return (
    <section id={id} className={rootClassName} aria-labelledby={titleId}>
      <div className={`project-detail-shell ${styles.shell}`}>
        <div className={`project-intro-box ${styles.introBox}`}>
          <header className={`project-detail-header ${styles.header}`} aria-labelledby={titleId}>
            <div className={`project-detail-index ${styles.index}`} aria-hidden="true">{index}</div>
            <div className={styles.heading}>
              <p className="eyebrow">{eyebrow}</p>
              <h2 id={titleId}>{title}</h2>
              <p className={styles.summary}>{summary}</p>
              <dl className={`project-detail-facts ${styles.facts}`}>
                {facts.period ? (
                  <div>
                    <dt>기간</dt>
                    <dd>{facts.period}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>형태</dt>
                  <dd>{facts.form}</dd>
                </div>
                <div>
                  <dt>역할</dt>
                  <dd>{facts.role}</dd>
                </div>
              </dl>
            </div>
          </header>

          <aside className={`project-detail-primer ${styles.primer}`} aria-label="프로젝트 맥락">
            <div>
              <span className={styles.primerLabel}>사용 맥락</span>
              <p>{primer.context}</p>
            </div>
            <div>
              <span className={styles.primerLabel}>동작 흐름</span>
              <p>{primer.flow}</p>
            </div>
          </aside>
        </div>

        <figure className={`project-detail-primary primary-media ${styles.primary}`}>
          <img src={primary.src} alt={primary.alt} loading="eager" decoding="async" />
          {primary.caption ? <figcaption>{primary.caption}</figcaption> : null}
        </figure>

        <div className={`project-detail-body ${styles.body}`}>
          <div className={`project-detail-decision ${styles.decision}`}>
            <span className="decision-label">전개 · 핵심 판단</span>
            <p>{decision}</p>
          </div>

          <div className={`project-story ${styles.story}`}>{body}</div>

          {visual ? <div className={`project-visual ${styles.visual}`}>{visual}</div> : null}

          <ul className={`keyword-row project-keywords ${styles.keywords}`} aria-label="기술 키워드">
            {keywords.map((keyword, itemIndex) => <li key={`${keyword}-${itemIndex}`}>{keyword}</li>)}
          </ul>

          {links ? <div className={`project-links ${styles.links}`}>{links}</div> : null}
        </div>
      </div>
    </section>
  );
}
