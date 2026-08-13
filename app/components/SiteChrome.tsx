import type { ReactNode } from "react";

type Current = "home" | "resume" | "ai" | "robotics" | "autonomous";

// 현재 페이지 판별을 데이터에 두어 데스크톱·모바일 두 곳에서 같은 삼항 체인을 반복하지 않는다.
const routes: { href: string; label: string; key: Current }[] = [
  { href: "/", label: "Hub", key: "home" },
  { href: "/resume", label: "Resume", key: "resume" },
  { href: "/ai", label: "AI", key: "ai" },
  { href: "/robotics", label: "Robotics", key: "robotics" },
  { href: "/autonomous-driving", label: "Autonomous", key: "autonomous" },
];

export function SiteChrome({ current }: { current: Current }) {
  // 활성 표시는 aria-current 하나로 하고, 스타일도 그 속성을 셀렉터로 받는다.
  const navLinks = routes.map((route) => (
    <a key={route.href} href={route.href} aria-current={current === route.key ? "page" : undefined}>
      {route.label}
    </a>
  ));

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">본문으로 건너뛰기</a>
      <div className="site-header-inner">
        <a className="brand" href="/" aria-label="전호준 포트폴리오 홈">JEON HOJUN</a>
        <nav className="desktop-nav" aria-label="주요 페이지">{navLinks}</nav>
        <details className="mobile-nav">
          <summary aria-label="페이지 메뉴">메뉴</summary>
          <nav aria-label="축소 페이지 메뉴">{navLinks}</nav>
        </details>
      </div>
    </header>
  );
}

export function PageFooter({ current }: { current: Current }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer-inner">
        <div>
          <p className="footer-kicker">JEON HOJUN · PORTFOLIO</p>
          <p className="footer-copy">AI · Robotics · Autonomous Driving</p>
        </div>
        <nav className="footer-nav" aria-label="페이지 하단 탐색">
          {routes.map((route) => (
            <a key={route.href} href={route.href} aria-current={current === route.key ? "page" : undefined}>
              {route.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export function PageTitle({
  eyebrow,
  title,
  lede,
  visual,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  visual?: { src: string; alt: string; objectPosition?: string };
  children?: ReactNode;
}) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className="page-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="page-title">{title}</h1>
        <p className="hero-lede">{lede}</p>
        {children}
      </div>
      {visual ? (
        <figure className="page-hero-visual">
          <img
            src={visual.src}
            alt={visual.alt}
            loading="eager"
            decoding="async"
            style={{ objectPosition: visual.objectPosition }}
          />
        </figure>
      ) : null}
    </section>
  );
}

/* titleId 는 선택 사항이다. 넘기면 <h2> 가 그 id 를 갖고, 섹션의
   aria-labelledby 가 실제 제목을 가리킨다. 넘기지 않으면 id 없이 렌더되어
   기존 호출부가 그대로 동작한다. */
export function SectionHeading({ eyebrow, title, titleId, children }: { eyebrow: string; title: ReactNode; titleId?: string; children?: ReactNode }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={titleId}>{title}</h2>
      </div>
      {children ? <div className="section-heading-aside">{children}</div> : null}
    </div>
  );
}

export function FlowDiagram({ items, label, dark = false }: { items: string[]; label: string; dark?: boolean }) {
  return (
    <div className={`flow-diagram${dark ? " flow-diagram-dark" : ""}`} role="img" aria-label={label}>
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flow-item-group">
          <span className="flow-item">{item}</span>
          {index < items.length - 1 ? <span className="flow-arrow" aria-hidden="true">→</span> : null}
        </span>
      ))}
    </div>
  );
}
