# 쿠팡 디자인 → 개발 핸드오프 가이드

쿠팡 로그인 페이지 디자인 시안을 분석해 개발 코드로 핸드오프 하는 데모 프로젝트입니다.

## 유틸리티 퍼스트

Tailwind CSS `content` 구성에 등록된 다음 페이지에서 유틸리티를 사용할 수 있습니다.

- `index.html`
- `public/**/*.html`

```js
module.exports = {
  content: ['./index.html', './public/**/*.html'],
  // ...
};
```

## 디자인 토큰

Figma 디자인 시안에서 추출한 디자인 토큰은 tokens 디렉토리에서 관리됩니다.

```js
const {
  colors,
  fontSize,
  fontFamily,
  boxShadow,
  borderRadius,
} = require('./tokens/index.cjs');

module.exports = {
  // ...
  theme: {
    extend: {
      colors,
      fontSize,
      fontFamily,
      boxShadow,
      borderRadius,
    },
  },
};
```

## 퍼블릭 디렉토리

웹 호스팅 디렉토리로 내부의 모든 에셋은 `/`로 접근 가능합니다.

```sh
public/
├── assets/
├── components/
├── pages/
├── scripts/
└── main.js
```

## 사이드 내비게이션

새로운 페이지를 추가할 경우 `public/main.js` 파일을 열어 `renderSideNav` 함수 내부 `items` 항목에 추가합니다.

```js
renderSideNav('[data-side-nav]', {
  headline: 'Coupang Design System',
  items: [
    { href: '/pages/tokens.html', content: 'Design Tokens' },
    { href: '/components/button.html', content: 'components / button' },
  ],
});
```

내비게이션 아이템 인터페이스는 다음과 같습니다.

```ts
interface Item {
  href: string;
  content: string;
}
```

## 컴포넌트

> public/components

작은 단위부터 규모가 큰 단위까지 컴포넌트(UI 부품) 관심사를 분리하여 개발할 수 있습니다.

### 컴포넌트 타입

- 유틸리티 클래스를 인라인으로 포함하는 컴포넌트
- Tailwind CSS 유틸리티로 등록해 사용하는 컴포넌트 (tailwindcss 디렉토리에서 관리)

### 중첩 규칙

Sass와 유사한 중첩 규칙 문법을 지원합니다. (PostCSS 활용)

```css
@layer base {
  abbr[title] {
    @apply cursor-help;
    text-decoration: none;

    @media print {
      &::after {
        content: '(' attr(title) ')';
      }
    }
  }
}
```

## 페이지

> public/pages

개발된 컴포넌트를 조립해 페이지를 구성합니다.


## 페이지 템플릿

컴포넌트 또는 페이지 작성 시 템플릿 파일(`template.html`)을 활용합니다.

<details>
  <summary>template.html</summary>

  ```html
  <!DOCTYPE html>
  <html lang="ko-KR" class="no-js">

    <head>
      <meta charset="UTF-8" />
      <title>웹 문서 제목 작성</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="웹 문서 내용 작성" />
      <meta name="theme-color" content="#4285f4" />
      <link rel="icon" href="/assets/favicon/favicon.png" />
      <link rel="stylesheet" href="https://unpkg.com/pretendard/dist/web/static/pretendard.css" as="style" crossorigin />
      <script type="module" src="/main.js"></script>
    </head>

    <body>
      <noscript>이 애플리케이션을 사용하기 위해서는 JavaScript 활성화가 필요합니다.</noscript>

      <div class="flex gap-4">
        <div data-side-nav></div>

        <main class="container ml-[300px] p-8">

          <h1 class="text-5xl mb-16 text-black font-thin">페이지 타이틀</h1>

          <h2 class="demo__headline">컴포넌트 이름</h2>
            <div class="demo">
              <div class="demo__code">
                <!-- 컴포넌트 코드 -->
              </div>

              <button type="button" class="demo__button" aria-label="code 복사" title="code 복사"></button>
            </div>

        </main>
      </div>
    </body>

  </html>
  ```
</details>