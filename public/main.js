import '../tailwindcss/index.css';

import { runDemoClipboard } from './scripts/clipboard.js';
import { runSearchComponent } from './scripts/searchComponent.js';
import { renderSideNav } from './scripts/sideNav.js';

// --------------------------------------------------------------------------
// 클립보드 기능 실행
// - log: 콘솔 패널에 기록
// --------------------------------------------------------------------------

runDemoClipboard({ log: true });

// --------------------------------------------------------------------------
// 페이지 탐색 기능 실행
// - log: 콘솔 패널에 기록
// --------------------------------------------------------------------------

runSearchComponent({ log: true });

// --------------------------------------------------------------------------
// 사이드 내비게이션 렌더링
// - 새로운 페이지가 추가되면 items 배열 안에 새 항목을 추가합니다.
// --------------------------------------------------------------------------

renderSideNav('[data-side-nav]', {
  headline: 'Coupang 디자인 → 개발 가이드',
  items: [
    { href: '/pages/tokens.html', content: 'pages / tokens' },
    { href: '/pages/login.html', content: 'pages / login' },
    { href: '/components/logo.html', content: 'components / logo' },
    { href: '/components/icon.html', content: 'components / icon' },
    { href: '/components/button.html', content: 'components / button' },
    { href: '/components/tooltip.html', content: 'components / tooltip' },
    { href: '/components/input.html', content: 'components / input' },
    { href: '/components/copyright.html', content: 'components / copyright' },
  ],
});
