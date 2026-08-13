# Hojun Portfolio

전호준의 AI systems, Robotics, Autonomous Driving 포트폴리오입니다.

이 저장소는 Sites 런타임에 의존하지 않는 정적 export 프로젝트입니다. `app/`의 TSX와 `public/`의 미디어를 빌드한 뒤 Oracle 서버의 Nginx가 정적 파일을 제공합니다.

## 요구 사항

- Node.js `22.13` 이상
- PowerShell
- Oracle SSH 별칭 `Oracle`
- Oracle 서버에 `rsync`, `nginx` 설치 및 비밀번호 없는 `sudo`

SSH 별칭은 로컬 `~/.ssh/config`에 다음 형태로 준비합니다.

```sshconfig
Host Oracle
  HostName <ORACLE_PUBLIC_IP>
  User ubuntu
  IdentityFile <PRIVATE_KEY_PATH>
```

## 로컬 실행

```powershell
npm ci
npm run dev
```

개발 서버가 출력한 `http://localhost:...` 주소를 브라우저에서 확인합니다.

## 정적 빌드 확인

```powershell
npm run build
```

산출물은 `dist/client/`에 생성됩니다. 다음 경로가 포함되어야 합니다.

- `/`
- `/ai`
- `/autonomous-driving`
- `/resume`
- `/robotics`

## Oracle 배포

```powershell
npm run deploy:oracle
```

스크립트가 다음 작업을 자동으로 수행합니다.

1. `npm run build`로 정적 파일 생성
2. Oracle 임시 디렉터리로 빌드 결과와 Nginx 설정 업로드
3. `/var/www/portfolio`에 정적 파일 동기화
4. 기존 Nginx 기본 설정 백업
5. `nginx -t` 검증 후 Nginx reload

현재 공개 주소:

- <https://hojun-portfolio.taile6cccb.ts.net/>

Oracle에서 Tailscale Funnel을 처음 구성할 때는 다음을 한 번 실행합니다.

```bash
sudo tailscale set --hostname=hojun-portfolio
sudo tailscale funnel reset
sudo tailscale funnel --bg --yes 80
```

Funnel은 Oracle의 `127.0.0.1:80` Nginx로 요청을 전달합니다. 서버를 재부팅한 뒤에도 Funnel 상태를 확인하려면 다음을 사용합니다.

```bash
sudo tailscale funnel status
```

## 수정 위치

- 홈: `app/page.tsx`
- AI: `app/ai/page.tsx`
- Resume: `app/resume/page.tsx`
- Robotics: `app/robotics/page.tsx`
- Autonomous Driving: `app/autonomous-driving/page.tsx`
- 공통 헤더·푸터: `app/components/SiteChrome.tsx`
- 전체 스타일: `app/globals.css`
- 이미지·폰트: `public/`

수정 후에는 `npm run dev`로 확인하고 `npm run deploy:oracle`로 반영합니다. `dist/`, `.next/`, `.vinext/`, `node_modules/`는 자동 생성 파일이므로 커밋하지 않습니다.

## 저장소 구성 원칙

배포와 빌드에 필요한 애플리케이션 소스·미디어·설정만 포함합니다. Sites 바인딩, DB 예제, 디자인 검수 산출물, 이전 `static-portfolio/`, 캐시와 로컬 의존성은 포함하지 않습니다.
