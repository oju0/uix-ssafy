import { log as printLog } from './logError.js';

/* 글로벌 함수 ------------------------------------------------------------------- */

globalThis.convertTitleCase = function (word) {
  return word.replace(/^.|(\s.)/g, ($1) => $1.trim().toUpperCase());
};

globalThis.handleSearchComponent = function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  // let searchKeyword = globalThis.convertTitleCase(formData.get('search'));
  let searchKeyword = formData.get('search');

  if (searchKeyword === '' || /^home$/i.test(searchKeyword)) {
    window.location.href = `/`;
  } else if (/^page/i.test(searchKeyword)) {
    if (searchKeyword === /^home$/i.test(searchKeyword)) {
      window.location.href = '/';
    }

    window.location.href = `/pages/${searchKeyword
      .replace(/page\s+/, '')
      .toLowerCase()
      .trim()}.html`;
  } else {
    window.location.href = `/components/${searchKeyword}.html`;
  }
};

globalThis.handleSearchComponentInputFocus = function (e) {
  e.target.select();
};

/* 컴포넌트 초기화 ----------------------------------------------------------------- */

/**
 * 검색 컴포넌트 실행 함수
 * @param {{log: boolean}} 옵션
 */
export function runSearchComponent({ log = false } = {}) {
  /*
   * 컴포넌트 감춤/표시 --------------------------------------------------------------- */

  function handleToggleSearchComponent(e) {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'k') {
      toggleSearchComponent();
    }

    if (e.key === 'Escape' && isVisibleSearchComponent()) {
      hideSearchComponent();
    }
  }

  document.addEventListener('keyup', handleToggleSearchComponent);

  log && printLog('컴포넌트 또는 페이지 검색 가능합니다.');

  /* 컴포넌트 마크업 ----------------------------------------------------------------- */

  const searchComponentCode = /* html */ `
    <form id="searchComponent" onsubmit="handleSearchComponent(event)" style="display: none">
      <label for="search">컴포넌트 검색</label>
      <input
        type="search"
        id="search"
        name="search"
        placeholder="e.g) logo / page template"
        onfocus="handleSearchComponentInputFocus(event)" 
      />
    </form>
    <div id="searchComponent__dim" style="display: none"></div>
  `.trim();

  document.body.insertAdjacentHTML('afterbegin', searchComponentCode);

  const searchComponentNode = document.getElementById('searchComponent');
  const dimNode = document.getElementById('searchComponent__dim');

  const shortcutKeyInfo = `
    <figure id="shorcut__info">
      <figcaption>페이지 이동</figcaption>
      <img src="https://bit.ly/3kaY36I" alt="단축키" />
    </figure>
  `;

  document.body.insertAdjacentHTML('beforeend', shortcutKeyInfo);

  /* 컴포넌트 스타일 ----------------------------------------------------------------- */

  const searchComponentStyleNode = document.createElement('style');

  searchComponentStyleNode.setAttribute('id', 'searchComponentStyle');
  searchComponentStyleNode.innerHTML = /* css */ `
    #shorcut__info {
      position: fixed;
      right: 16px;
      bottom: 16px;
      z-index: 1000;
      display: inline-flex;
      flex-flow: row;
      align-items: center;
      background: #efefef;
      padding: 8px 16px;
      border-radius: 50px;
    }

    #shorcut__info figcaption {
      order: 1;
      font-size: 12px;
    }
    
    #shorcut__info img {
      height: 28px;
    }

    #searchComponent {
      --color-black: #181818;
      --color-gray-100: #f3f3f3;
      --color-gray-200: #e7e7e7;
      --color-gray-300: #dcdcdc;
      --color-gray-400: #d0d0d0;
      --color-gray-500: #c4c4c4;
      --color-gray-600: #aaa9a9;
      --color-gray-700: #767676;
      --color-gray-800: #4e4e4e;
      --color-gray-900: #272727;

      position: fixed;
      z-index: 9999;
      top: 40%;
      left: 50%;
      width: clamp(320px, 50vw, 700px);
      transform: translate(-50%, -50%);
      display: flex;
      flex-flow: column;
      border: 1px solid rgba(255 255 255 / 80%);
      border-radius: 6px;
      padding: 4rem 3rem;
      background: rgba(255 255 255 / 80%);
      color: var(--color-black);
      box-shadow: 0 3px 30px rgba(255 255 255 / 50%);
    }

    #searchComponent label {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    #searchComponent input {
      border: 0;
      border-radius: 6px;
      padding: 0.6em;
      font-size: clamp(0.75rem, 4.2vw, 1.6rem);
      outline: 2px solid var(--color-gray-200);
    }

    #searchComponent input:focus {
      outline-color: var(--color-gray-400);
    }

    #searchComponent__dim {
      position: fixed;
      z-index: 1000;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(255 255 255 / 60%);
      backdrop-filter: blur(1px);
    }
  `;

  document.head.appendChild(searchComponentStyleNode);

  /* 컴포넌트 유틸리티 함수 ------------------------------------------------------------ */

  function toggleSearchComponent() {
    isVisibleSearchComponent() ? hideSearchComponent() : showSearchComponent();
  }

  function isVisibleSearchComponent() {
    return (
      window.getComputedStyle(searchComponentNode, null).display !== 'none'
    );
  }

  function showSearchComponent() {
    searchComponentNode.style.removeProperty('display');
    dimNode.style.removeProperty('display');
    searchComponentNode.querySelector('#search').focus();
  }

  function hideSearchComponent() {
    searchComponentNode.style.display = 'none';
    dimNode.style.display = 'none';
  }
}
