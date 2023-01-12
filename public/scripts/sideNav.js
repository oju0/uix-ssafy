function createSideNav({ headline, items }) {
  return /* html */ `
    <a href="#skip-navigation" id="skipNavigation">본문 영역으로 이동</a>
    <nav class="sideNav">
      <h2 class="sideNav__headline">
        <a href="/">${headline}</a>
      </h2>
      <ul>
        ${items
          .map(
            (item) => /* html */ `
              <li>
                <a 
                  href="${item.href}"
                  class="sideNav__link"
                >
                  ${item.content}
                </a>
              </li>
            `
          )
          .join('')}
      </ul>
    </nav>
  `;
}

/**
 * 사이드 내비게이션 렌더링 함수
 * @param {string} targetSelector CSS 선택자
 * @param {{ headline: string, items: {href: string, content: string}[] }} options 링크 정보
 */
export function renderSideNav(targetSelector, options) {
  const sideNavCode = createSideNav(options);
  const target = document.querySelector(targetSelector);

  target.insertAdjacentHTML('beforeend', sideNavCode);

  const main = document.querySelector('main');
  main.setAttribute('tabindex', -1);

  document.getElementById('skipNavigation')?.addEventListener('click', (e) => {
    e.preventDefault();
    main?.focus();
  });
}

/* 컴포넌트 스타일 ----------------------------------------------------------------- */

const clipboardStyle = document.createElement('style');

clipboardStyle.setAttribute('id', 'clipboardStyle');
clipboardStyle.innerHTML = /* css */ `
  #skipNavigation {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 20px 24px;
    z-index: 10000;
    translate: 0 -50vh;
    background: rgba(255 255 255 / 30%);
    backdrop-filter: blur(3px);
    border-bottom: 1px solid #fff;
    box-shadow: 0 1px 10px rgba(0 0 0 / 20%);
    text-align: right;
    font-weight: 700;
    color: #474747;
  }
  
  #skipNavigation:focus {
    translate: 0;
    outline: none;
  }
`;

document.head.appendChild(clipboardStyle);
