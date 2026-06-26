(function () {

  /* ── TOKENS ── */
  const NAVY       = '#0a1128';
  const DEEP_BLUE  = '#101c3f';
  const GOLD       = '#c9a227';
  const GOLD_BRT   = '#e8c659';
  const IVORY      = '#f3efe6';
  const STEEL      = '#8a93a8';
  const STEEL_DIM  = '#5c637a';
  const EASE       = 'cubic-bezier(0.22, 1, 0.36, 1)';

  /* ── DATA ── */
  const NAV_ITEMS = [
    { label: 'Philosophy',    icon: '📖', target: '#about'   },
    { label: 'Our Numbers',   icon: '📊', target: '#stats'   },
    { label: 'Know Your Body',icon: '💪', target: '#coach'   },
    { label: 'Inside the Gym',icon: '🏋️', target: '#gallery' },
    { label: 'Visit Us',      icon: '📍', target: '#contact' },
  ];

  const FAQS = [
    { q: 'What are your hours?',     a: 'Mon–Sat, 5am–10pm.' },
    { q: 'Where are you located?',   a: '123 Iron Street, Your City.' },
    { q: 'How do I start?',          a: 'Call us or visit the gym — no appointment needed.' },
  ];

  /* ── STYLES ── */
  const style = document.createElement('style');
  style.textContent = `
    #ss-support-btn {
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      z-index: 900;
      width: 3.25rem;
      height: 3.25rem;
      border-radius: 50%;
      background: ${GOLD};
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 0 0 rgba(201,162,39,0.5);
      animation: ss-pulse 2.8s ease-in-out infinite;
      transition: background 0.3s ${EASE}, transform 0.3s ${EASE};
    }

    #ss-support-btn:hover {
      background: ${GOLD_BRT};
      transform: scale(1.08);
    }

    #ss-support-btn svg {
      width: 1.4rem;
      height: 1.4rem;
      fill: ${NAVY};
      transition: transform 0.3s ${EASE};
    }

    #ss-support-btn.is-open svg {
      transform: rotate(45deg);
    }

    @keyframes ss-pulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(201,162,39,0.45); }
      60%      { box-shadow: 0 0 0 10px rgba(201,162,39,0); }
    }

    #ss-panel {
      position: fixed;
      bottom: 6rem;
      left: 2rem;
      z-index: 899;
      width: 17rem;
      background: ${DEEP_BLUE};
      border: 0.0625rem solid rgba(201,162,39,0.2);
      border-radius: 0.75rem;
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transform: translateY(1rem) scale(0.97);
      transform-origin: bottom left;
      transition: opacity 0.35s ${EASE}, transform 0.35s ${EASE}, visibility 0.35s ${EASE};
    }

    #ss-panel.is-open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }

    .ss-header {
      background: linear-gradient(135deg, ${NAVY}, #182a57);
      padding: 1rem 1.2rem;
      border-bottom: 0.0625rem solid rgba(201,162,39,0.15);
    }

    .ss-header-eyebrow {
      font-family: 'Oswald', sans-serif;
      font-size: 0.65rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${GOLD};
      margin-bottom: 0.25rem;
    }

    .ss-header-title {
      font-family: 'Oswald', sans-serif;
      font-size: 1rem;
      color: ${IVORY};
      letter-spacing: 0.04em;
    }

    .ss-body {
      padding: 1rem 1.2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-height: 70vh;
      overflow-y: auto;
      scrollbar-width: none;
    }

    .ss-body::-webkit-scrollbar { display: none; }

    .ss-section-label {
      font-family: 'Oswald', sans-serif;
      font-size: 0.65rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: ${STEEL};
      margin-bottom: 0.4rem;
    }

    .ss-nav-list {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .ss-nav-btn {
      width: 100%;
      background: rgba(255,255,255,0.04);
      border: 0.0625rem solid rgba(201,162,39,0.1);
      border-radius: 0.4rem;
      padding: 0.55rem 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      cursor: pointer;
      transition: background 0.25s ${EASE}, border-color 0.25s ${EASE};
      text-align: left;
    }

    .ss-nav-btn:hover {
      background: rgba(201,162,39,0.1);
      border-color: rgba(201,162,39,0.35);
    }

    .ss-nav-icon {
      font-size: 0.9rem;
      line-height: 1;
    }

    .ss-nav-label {
      font-family: 'Inter', sans-serif;
      font-size: 0.8rem;
      color: ${IVORY};
      letter-spacing: 0.02em;
    }

    .ss-divider {
      height: 0.0625rem;
      background: rgba(201,162,39,0.1);
    }

    .ss-faq-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .ss-faq-item {
      border-radius: 0.4rem;
      overflow: hidden;
      border: 0.0625rem solid rgba(201,162,39,0.1);
    }

    .ss-faq-q {
      width: 100%;
      background: rgba(255,255,255,0.04);
      border: none;
      padding: 0.55rem 0.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: background 0.25s ${EASE};
      text-align: left;
    }

    .ss-faq-q:hover {
      background: rgba(201,162,39,0.08);
    }

    .ss-faq-q-text {
      font-family: 'Inter', sans-serif;
      font-size: 0.78rem;
      color: ${IVORY};
    }

    .ss-faq-arrow {
      font-size: 0.65rem;
      color: ${GOLD};
      transition: transform 0.3s ${EASE};
      flex-shrink: 0;
    }

    .ss-faq-item.is-open .ss-faq-arrow {
      transform: rotate(180deg);
    }

    .ss-faq-a {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.35s ${EASE}, padding 0.35s ${EASE};
      padding: 0 0.8rem;
      font-family: 'Inter', sans-serif;
      font-size: 0.76rem;
      color: ${STEEL};
      line-height: 1.6;
    }

    .ss-faq-item.is-open .ss-faq-a {
      max-height: 6rem;
      padding: 0.5rem 0.8rem 0.6rem;
    }

    .ss-call-btn {
      width: 100%;
      background: ${GOLD};
      border: none;
      border-radius: 0.4rem;
      padding: 0.65rem 1rem;
      font-family: 'Oswald', sans-serif;
      font-size: 0.8rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${NAVY};
      cursor: pointer;
      transition: background 0.25s ${EASE}, box-shadow 0.25s ${EASE};
      text-decoration: none;
      display: block;
      text-align: center;
    }

    .ss-call-btn:hover {
      background: ${GOLD_BRT};
      box-shadow: 0 0 1rem rgba(232,198,89,0.4);
    }

    @media (max-width: 480px) {
      #ss-panel {
        left: 1rem;
        right: 1rem;
        width: auto;
        bottom: 5.5rem;
      }
      #ss-support-btn {
        left: 1rem;
        bottom: 1.5rem;
      }
    }
  `;
  document.head.appendChild(style);

  /* ── BUILD HTML ── */
  const btn = document.createElement('button');
  btn.id = 'ss-support-btn';
  btn.setAttribute('aria-label', 'Open support panel');
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.95l4.782-1.388A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 2a8 8 0 110 16A8 8 0 0112 4zm-1 4v2h2V8h-2zm0 4v6h2v-6h-2z"/>
    </svg>
  `;

  const panel = document.createElement('div');
  panel.id = 'ss-panel';
  panel.setAttribute('aria-hidden', 'true');

  const navItems = NAV_ITEMS.map(item => `
    <li>
      <button class="ss-nav-btn" data-target="${item.target}">
        <span class="ss-nav-icon">${item.icon}</span>
        <span class="ss-nav-label">${item.label}</span>
      </button>
    </li>
  `).join('');

  const faqItems = FAQS.map((faq, i) => `
    <li class="ss-faq-item" data-faq="${i}">
      <button class="ss-faq-q">
        <span class="ss-faq-q-text">${faq.q}</span>
        <span class="ss-faq-arrow">▼</span>
      </button>
      <div class="ss-faq-a">${faq.a}</div>
    </li>
  `).join('');

  panel.innerHTML = `
    <div class="ss-header">
      <p class="ss-header-eyebrow">Sovereign Strength</p>
      <p class="ss-header-title">How can we help?</p>
    </div>
    <div class="ss-body">
      <div>
        <p class="ss-section-label">Navigate to</p>
        <ul class="ss-nav-list">${navItems}</ul>
      </div>
      <div class="ss-divider"></div>
      <div>
        <p class="ss-section-label">Quick answers</p>
        <ul class="ss-faq-list">${faqItems}</ul>
      </div>
      <div class="ss-divider"></div>
      <a href="tel:+10000000000" class="ss-call-btn">📞 Call Now</a>
    </div>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  /* ── LOGIC ── */
  let isOpen = false;

  function openPanel() {
    isOpen = true;
    panel.classList.add('is-open');
    btn.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-label', 'Close support panel');
  }

  function closePanel() {
    isOpen = false;
    panel.classList.remove('is-open');
    btn.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-label', 'Open support panel');
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen ? closePanel() : openPanel();
  });

  /* close on outside click */
  document.addEventListener('click', (e) => {
    if (isOpen && !panel.contains(e.target) && e.target !== btn) {
      closePanel();
    }
  });

  /* nav scroll */
  panel.addEventListener('click', (e) => {
    const navBtn = e.target.closest('.ss-nav-btn');
    if (navBtn) {
      const target = document.querySelector(navBtn.dataset.target);
      if (target) {
        closePanel();
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
      return;
    }

    /* faq accordion */
    const faqQ = e.target.closest('.ss-faq-q');
    if (faqQ) {
      const item = faqQ.closest('.ss-faq-item');
      const isItemOpen = item.classList.contains('is-open');
      document.querySelectorAll('.ss-faq-item').forEach(i => i.classList.remove('is-open'));
      if (!isItemOpen) item.classList.add('is-open');
    }
  });

})();