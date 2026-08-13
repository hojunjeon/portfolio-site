import type { Metadata } from "next";
import "./globals.css";

const description =
  "컴퓨터비전, 로보틱스, 자율주행을 다루는 신입 엔지니어 전호준의 포트폴리오입니다. 이력서와 프로젝트 상세 페이지로 구성했습니다.";

export function generateMetadata(): Metadata {
  return {
    title: {
      default: "전호준 · Portfolio",
      template: "%s · Jeon Hojun",
    },
    description,
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: { title: "전호준 · Portfolio", description },
    twitter: { card: "summary", title: "전호준 · Portfolio", description },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* defect #10: Pretendard Variable — self-hosted via globals.css @font-face.
            CDN 로드 제거. 오프라인 시 system-ui 페일오버. */}
        <link
          rel="preload"
          href="/fonts/PretendardVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
