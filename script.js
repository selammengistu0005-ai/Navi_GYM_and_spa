/* ============================================================
   SOVEREIGN STRENGTH — SCRIPT.JS
   All custom JS lives here: loader, three.js background,
   GSAP/ScrollTrigger animations, nav + counter logic.
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   1. LOADER
   ============================================================ */
const loader = document.getElementById('loader');
const loaderFill = document.querySelector('.loader-bar-fill');
const loaderPercent = document.querySelector('.loader-percent');

function runLoader(onComplete) {
  const images = Array.from(document.images);
  const total = images.length;
  if (total === 0) {
    loaderFill.style.width = '100%';
    loaderPercent.textContent = '100%';
    setTimeout(() => { loader.classList.add('is-hidden'); onComplete(); }, 350);
    return;
  }
  let loaded = 0;
  function onImageLoad() {
    loaded++;
    const progress = Math.round((loaded / total) * 100);
    loaderFill.style.width = progress + '%';
    loaderPercent.textContent = progress + '%';
    if (loaded === total) {
      setTimeout(() => { loader.classList.add('is-hidden'); onComplete(); }, 350);
    }
  }
  images.forEach(img => {
    if (img.complete) {
      onImageLoad();
    } else {
      img.addEventListener('load', onImageLoad);
      img.addEventListener('error', onImageLoad);
    }
  });
}

/* ============================================================
   2. THREE.JS — persistent gold dust + crossing bars
   ============================================================ */
let scene, camera, renderer, particles, barsGroup;
let mouseX = 0, mouseY = 0;

function initThree() {
  const canvas = document.getElementById('bg-canvas');

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 60;

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /* ---- gold dust particle field ---- */
  const particleCount = 600;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0xe8c659,
    size: 0.6,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true
  });

  particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  /* ---- crossing bars (wireframe) ---- */
  barsGroup = new THREE.Group();

  const barGeo = new THREE.BoxGeometry(120, 0.6, 0.6);
  const barMat = new THREE.MeshBasicMaterial({
    color: 0xc9a227,
    transparent: true,
    opacity: 0.25,
    wireframe: true
  });

  const bar1 = new THREE.Mesh(barGeo, barMat);
  bar1.rotation.z = Math.PI / 6;

  const bar2 = new THREE.Mesh(barGeo, barMat);
  bar2.rotation.z = -Math.PI / 6;

  barsGroup.add(bar1, bar2);
  barsGroup.position.set(0, 0, -20);
  scene.add(barsGroup);

  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousemove', onMouseMove);

  animateThree();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(e) {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
}

function animateThree() {
  requestAnimationFrame(animateThree);

  particles.rotation.y += 0.0006;
  particles.rotation.x += 0.0002;

  barsGroup.rotation.z += 0.0009;

  camera.position.x += (mouseX * 4 - camera.position.x) * 0.02;
  camera.position.y += (-mouseY * 4 - camera.position.y) * 0.02;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

/* ============================================================
   3. NAV — background on scroll
   ============================================================ */
function initNavScroll() {
  const nav = document.getElementById('site-nav');
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      nav.classList.toggle('is-scrolled', self.scroll() > 80);
    }
  });
}

/* ============================================================
   4. HERO — pinned intro animation
   ============================================================ */
function initHeroAnimation() {
  const heroContent = document.querySelector('.hero-content');
  const heroTimeline = gsap.timeline();

  heroTimeline
    .from('.eyebrow', { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out' })
    .from('.hero-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.3')
    .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.7, ease: 'power2.out' }, '-=0.4')
    .from('.hero-actions', { opacity: 0, y: 20, duration: 0.7, ease: 'power2.out' }, '-=0.4');

  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: '+=100%',
    pin: true,
    pinSpacing: true,
    scrub: true,
    onUpdate: (self) => {
      gsap.to(heroContent, {
        opacity: 1 - self.progress * 1.4,
        scale: 1 - self.progress * 0.08,
        duration: 0.1,
        overwrite: true
      });
    }
  });
}

/* ============================================================
   5. ABOUT / COACH — scroll reveals
   ============================================================ */
function initRevealAnimations() {
  const targets = [
    '.about-copy', '.about-image',
    '.coach-image', '.coach-copy',
    '.contact-info', '.contact-map'
  ];

  targets.forEach((selector) => {
    const el = document.querySelector(selector);
    if (!el) return;

    gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

/* ============================================================
   6. STATS — scroll-scrubbed counters
   ============================================================ */
function initStatCounters() {
  const statBlocks = document.querySelectorAll('.stat-block');

  statBlocks.forEach((block) => {
    const target = parseInt(block.dataset.target, 10);
    const numberEl = block.querySelector('[data-count]');

    ScrollTrigger.create({
      trigger: block,
      start: 'top 85%',
      end: 'top 40%',
      scrub: true,
      onUpdate: (self) => {
        const value = Math.floor(target * self.progress);
        numberEl.textContent = value.toLocaleString();
      }
    });
  });
}

/* ============================================================
   7. GALLERY — staggered reveal
   ============================================================ */
function initGalleryAnimation() {
  gsap.from('.gallery-item', {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.gallery-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
}

/* ============================================================
   8. BODY TYPE OVERLAY
   ============================================================ */
const bodyData = {
  skinny: {
    label: 'Skinny',
    why: 'ቀጭን ለመሆን ዋናው ምክንያት ከሚቃጠለው ካሎሪ በታች መመገብ ወይም ከፍተኛ የሆነ የሰውነት ሜታቦሊዝም (Metabolism) ኖሮ ምግብ በፍጥነት መፈጨት ሊሆን ይችላል። በተጨማሪም በቂ የጡንቻ ማሳደጊያ እንቅስቃሴዎችን አለማድረግ እና የዘር ውርስ (Genetics) ለዚህ አስተዋጽኦ ያደርጋሉ።',
    dos: [
      'Squats',
      'Deadlifts',
      'Bench Press',
      'Overhead Press',
      'Pull-ups / Chin-ups',
      'Barbell Rows',
      'በፕሮቲን እና ካርቦሃይድሬት የበለጸጉ ምግቦችን (እንደ ዶሮ ስጋ, እንቁላል, አጃ, እና የለውዝ ቅቤ) በብዛት መመገብ',
      'በቀን ከ7-9 ሰዓታት እንቅልፍ መተኛት',
      'በቀን ውስጥ የምትወስደውን የካሎሪ መጠን መጨመር (Caloric Surplus)'
    ],
    donts: [
      'ካርዲዮ (Cardio) ማብዛት',
      'ምግብ ማስታጎል (Don\'t skip meals)',
      'በየቀኑ ያለ እረፍት መስራት (Overtraining)',
      'ሁልጊዜ በአንድ አይነት ቀላል ክብደት ብቻ መስራት',
      'በቂ ውሃ አለመጠጣት'
    ]
  },
  medium: {
    label: 'Medium',
    why: 'አማካኝ የሰውነት መጠን እንዲኖርህ ያደረገው የምትወስደው የካሎሪ መጠንና የምታቃጥለው የካሎሪ መጠን እኩል በመሆናቸው (Maintenance Calories) ነው። በተጨማሪም የምትሰራው የስፖርት አይነት ወይም የአኗኗር ዘይቤህ አሁን ያለህን የሰውነት ቅርጽ ጠብቆ ለማቆየት የሚረዳ በመሆኑ ነው።',
    dos: [
      'Pull-ups / Lat Pulldowns',
      'Lateral Raises (ለትከሻ ስፋት)',
      'የጡንቻን ጥንካሬና ቅርጽ ለመጨመር ክብደቶችን በየጊዜው እየጨመሩ መሄድ (Progressive Overload)',
      'ከሚቃጠለው ካሎሪ በጥቂቱ ፈቀቅ ያለ ንፁህ ምግብ መመገብ (Lean Bulking - እንደ አሳ፣ የበሬ ስጋ፣ ሩዝ እና አትክልት)',
      'ለጡንቻ ጥገና እና እድገት በቀን ከ7-8 ሰዓታት ጥልቅ እንቅልፍ መተኛት',
      'ለልብ ጤንነት እና ለጽናት በሳምንት 2-3 ቀን መጠነኛ የካርዲዮ (HIIT ወይም ፈጣን እርምጃ) መስራት'
    ],
    donts: [
      'ያለ እቅድ እና ተመሳሳይ ክብደት ብቻ ደጋግሞ መስራት',
      'ቦርጭና አላስፈላጊ ስብ የሚጨምሩ ጣፋጭና የፋብሪካ ምግቦችን (Dirty Bulking) ማብዛት',
      'የፕሮቲን መጠንን መቀነስ ወይም በቂ ፕሮቲን አለመውሰድ',
      'የእረፍት ቀናትን መከልከል እና ሰውነትን ማድከም (Overtraining)',
      'ከስፖርት በፊትና በኋላ የሰውነትን ጡንቻዎች አለማሳረፍና አለማሳሳት (Stretching)'
    ]
  },
  plus: {
    label: 'Plus Size',
    why: 'ዋናው ምክንያት ለረጅም ጊዜ ከሚቃጠለው ካሎሪ በላይ ከፍተኛ የካሎሪ መጠን ያላቸውን ምግቦች መውሰድ (Caloric Surplus) እና የተቀመጠ የአኗኗር ዘይቤ መከተል ነው። በተጨማሪም የሆርሞን መዛባት፣ በቂ እንቅልፍ አለማግኘት እና ከፍተኛ ውጥረት (Stress) ስብ በሰውነት ውስጥ እንዲከማች ያደርጋሉ።',
    dos: [
      'Incline Treadmill Walking / Brisk Walking (ፈጣን እርምጃ መራመድ)',
      'Stationary Cycling (የቤት ውስጥ ብስክሌት መንዳት - ለመገጣጠሚያዎች ደህንነት)',
      'Goblet Squats / Bodyweight Squats',
      'Lat Pulldowns',
      'Dumbbell Bench Press',
      'በቀን የምትወስደውን የካሎሪ መጠን መቀነስ (Caloric Deficit)',
      'በፋይበር እና በፕሮቲን የበለጸጉ ምግቦችን (እንደ አትክልት፣ ባቄላ፣ አሳ እና እንቁላል) መመገብ',
      'በቀን ቢያንስ 3 ሊትር እና ከዚያ በላይ ውሃ መጠጣት',
      'በቀን ከ7-8 ሰዓታት መተኛት (ሜታቦሊዝምን ለማስተካከልና ስብን በፍጥነት ለመቀነስ)',
      'በየቀኑ የምታደርገውን አጠቃላይ እንቅስቃሴ መጨመር (ለምሳሌ በደረጃ መውጣት፣ መራመድ)'
    ],
    donts: [
      'በመገጣጠሚያዎች ላይ ጉዳት የሚያደርሱ በጣም ከባድ የሩጫ እና የዝላይ እንቅስቃሴዎችን መጀመር',
      'ጣፋጭ መጠጦችን፣ አልኮልን እና በዘይት የተጠበሱ የፋብሪካ ምግቦችን (Fast Food) መውሰድ',
      'ምግብ ሙሉ በሙሉ በመተው ራስን መራብ (ይህ ጡንቻን እንጂ ስብን አይቀንስም)',
      'ረጅም ሰዓታት ሳይንቀሳቀሱ ተቀምጦ መዋል',
      'ክብደት በፍጥነት ካልቀነሰ ተስፋ ቆርጦ ስፖርትን ማቋረጥ'
    ]
  }
};

function initBodyTypeOverlay() {
  const overlay   = document.getElementById('body-overlay');
  const overlayImg   = document.getElementById('overlay-img');
  const overlayType  = document.getElementById('overlay-type');
  const overlayWhy   = document.getElementById('overlay-why');
  const overlayDo    = document.getElementById('overlay-do');
  const overlayDont  = document.getElementById('overlay-dont');
  const cards        = document.querySelectorAll('.body-card');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const type = card.dataset.type;
      const data = bodyData[type];
      const img  = card.querySelector('img');

      /* populate overlay */
      overlayImg.src       = img.src;
      overlayImg.alt       = img.alt;
      overlayType.textContent = data.label;
      overlayWhy.textContent  = data.why;

      overlayDo.innerHTML = `
        <li class="overlay-do-label">ማድረግ ያለብህ ነገሮች</li>
        ${data.dos.map(d => `<li>${d}</li>`).join('')}
      `;
      overlayDont.innerHTML = `
        <li class="overlay-dont-label">ማድረግ የሌለብህ ነገሮች</li>
        ${data.donts.map(d => `<li>${d}</li>`).join('')}
      `;

      /* click animation: nudge → open overlay */
      gsap.timeline()
        .to(card, {
          y: -18,
          scale: 1.04,
          duration: 0.25,
          ease: 'power2.out'
        })
        .to(card, {
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: 'power2.in'
        })
        .add(() => {
          overlay.setAttribute('aria-hidden', 'false');
          overlay.classList.add('is-open');
        });
    });
  });

  
  /* close on outside click */
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
    }
  });

  /* close on X button click */
  const closeBtn = document.getElementById('overlay-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
    });
  }
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initThree();

  runLoader(() => {
    initNavScroll();
    initHeroAnimation();
    initRevealAnimations();
    initStatCounters();
    initGalleryAnimation();
    initBodyTypeOverlay();
    ScrollTrigger.refresh();
  });
});
