import { log, error } from './logError.js';

const CONFIG = {
  container: '.demo',
  button: '.demo__button',
  codeBlock: '.demo__code',
};

function joinLine(string) {
  return string.replace(/(\s*\n\s*|\s*$|>+\s*<)/g, ($1) =>
    $1.match(/>+\s*</g) ? '><' : ''
  );
}

export function supportClipboard() {
  if (window.navigator.clipboard) {
    log('클립보드 API를 사용할 수 있습니다.');
  } else {
    error('현재 환경에서는 클립보드 API를 사용할 수 없습니다.');
  }
}

function copyClipboard(target, button) {
  const { clipboard } = window.navigator;

  clipboard
    .writeText(joinLine(target.innerHTML.trim()))
    .then(() => {
      let previousButtonLabel = button.getAttribute('aria-label');
      button.setAttribute('aria-label', 'code 클립보드에 복사 됨');
      button.insertAdjacentHTML(
        'beforeend',
        '<span class="demo__tooltip">copyed</span>'
      );

      window.setTimeout(() => {
        button.innerHTML = '';
        button.setAttribute('aria-label', previousButtonLabel);
      }, 1000);
    })
    .catch((error) => console.error(error.message));
}

/**
 * 컴포넌트 데모 클립보드 실행 함수
 * @param {{log: boolean}} 옵션
 */
export function runDemoClipboard({ log = false } = {}) {
  log && supportClipboard();

  const demoNodeArray = Array.from(document.querySelectorAll(CONFIG.container));

  demoNodeArray.forEach((demo) => {
    demo.addEventListener('click', (e) => {
      if (e.target.classList.contains(CONFIG.button.slice(1))) {
        e.stopPropagation();
        copyClipboard(demo.querySelector(CONFIG.codeBlock), e.target);
      }
    });
  });
}

/* 컴포넌트 스타일 ----------------------------------------------------------------- */

const clipboardStyle = document.createElement('style');

clipboardStyle.setAttribute('id', 'clipboardStyle');
clipboardStyle.innerHTML = /* css */ `
  .flexWrapper {
    display: flex;
    flex-flow: column;
    min-height: 100vh;
  }

  .demo {
    --size: 1rem;

    --color-gray-100: #f3f3f3;
    --color-gray-200: #e7e7e7;
    --color-gray-300: #dcdcdc;
    --color-gray-400: #d0d0d0;
    --color-gray-500: #c4c4c4;
    --color-gray-600: #aaa9a9;
    --color-gray-700: #767676;
    --color-gray-800: #4e4e4e;
    --color-gray-900: #272727;

    position: relative;
    margin: 0.875rem 2rem;
    border: 1px solid var(--color-gray-200);
    padding: var(--size);
    padding-right: calc(var(--size) * 2);
  }

  .demo__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3rem;
  }

  .demo__headline {
    margin-top: 2rem;
    margin-left: 2rem;
    margin-bottom: 0;
    font-size: 1.2rem;
    font-weight: 500;
  }

  .demo__description {
    margin-top: 1.5rem;
    margin-left: 3rem;
    font-size: 1.6rem;
    font-weight: 100;
    color: #202020;
  }

  .demo__list {
    list-style: none;
    margin-top: 0;
    margin-bottom: 0;
  }

  .demo__code {
    padding: 0.6em;
  }

  .demo__button {
    --size: 1rem;

    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    border: 1px solid transparent;
    padding: 1rem;
    width: var(--size);
    height: var(--size);
    border-radius: 0.4rem;
    background: var(--color-gray-100) url('https://bit.ly/3GVRAp0') no-repeat
      center center / 50%;
    color: var(--color-gray-200);
  }

  .demo__button:hover {
    border-color: var(--color-gray-300);
  }

  .demo__button:active {
    transform: translateY(-50%) scale(0.95);
  }

  .demo__tooltip {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0 0 0 / 90%);
    color: var(--color-gray-100);
    font-size: 0.75em;
    border-radius: 3px;
    border: 1px solid rgba(130 130 130 / 60%);
    padding: 0.5rem 0.6rem;
  }

  .demo__content {
    padding: 3rem;
  }

  .demo__content li {
    padding: 0.35rem 0;
  }
`;

document.head.appendChild(clipboardStyle);
