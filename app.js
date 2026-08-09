/* ═══════════════════════════════════════════════════
   MAGESH K PORTFOLIO — app.js
   All content driven from data.json
   Modules: DataLoader, Renderer, IntroAnimation,
   CustomCursor, Typewriter, CommandPalette,
   ScrollReveal, SkillBars, NavBar, MobileMenu,
   ExperienceTabs, ProjectFilter, FeaturedCarousel,
   BackToTop
═══════════════════════════════════════════════════ */

'use strict';

/* ── DATA LOADER ──────────────────────────────── */
const DataLoader = {
  _cache: null,

  async get() {
    if (this._cache) return this._cache;
    try {
      const res = await fetch('data.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this._cache = await res.json();
      return this._cache;
    } catch (err) {
      console.error('[DataLoader] Failed to load data.json:', err);
      return null;
    }
  }
};


/* ── UTILITY HELPERS ──────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}


/* ── INTRO ANIMATION ──────────────────────────── */
const IntroAnimation = {
  run() {
    const screen = $('#intro-screen');
    if (!screen) return;

    document.body.classList.add('intro-running');

    setTimeout(() => {
      screen.classList.add('bars-out');
    }, 1400);

    setTimeout(() => {
      screen.style.display = 'none';
      document.body.classList.remove('intro-running');
    }, 2200);
  }
};


/* ── CUSTOM CURSOR ────────────────────────────── */
const CustomCursor = {
  dot: null,
  follower: null,
  fx: 0, fy: 0,
  dx: 0, dy: 0,
  raf: null,

  init() {
    this.dot = $('#cursor');
    this.follower = $('#cursor-follower');
    if (!this.dot || !this.follower) return;
    if (window.innerWidth <= 640) return;

    document.addEventListener('mousemove', e => {
      this.dx = e.clientX;
      this.dy = e.clientY;
      this.dot.style.left = e.clientX + 'px';
      this.dot.style.top  = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

    const hoverTargets = 'a, button, .project-card, .blog-card, .filter-btn, .tl-tab, .skill-tag, .tag, .contact-social-link, .carousel-btn, .dot';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(hoverTargets)) document.body.classList.add('cursor-hover');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(hoverTargets)) document.body.classList.remove('cursor-hover');
    });

    this._animate();
  },

  _animate() {
    this.fx += (this.dx - this.fx) * 0.12;
    this.fy += (this.dy - this.fy) * 0.12;
    if (this.follower) {
      this.follower.style.left = this.fx + 'px';
      this.follower.style.top  = this.fy + 'px';
    }
    this.raf = requestAnimationFrame(() => this._animate());
  }
};


/* ── TYPEWRITER ───────────────────────────────── */
const Typewriter = {
  el: null,
  texts: [],
  idx: 0,
  charIdx: 0,
  deleting: false,
  pauseMs: 2200,
  typeMs: 80,
  deleteMs: 40,

  init(el, texts) {
    this.el = el;
    this.texts = texts;
    if (!el || !texts?.length) return;
    this._tick();
  },

  _tick() {
    const current = this.texts[this.idx];
    if (this.deleting) {
      this.charIdx--;
    } else {
      this.charIdx++;
    }
    this.el.textContent = current.slice(0, this.charIdx);

    let delay = this.deleting ? this.deleteMs : this.typeMs;

    if (!this.deleting && this.charIdx === current.length) {
      delay = this.pauseMs;
      this.deleting = true;
    } else if (this.deleting && this.charIdx === 0) {
      this.deleting = false;
      this.idx = (this.idx + 1) % this.texts.length;
      delay = 400;
    }

    setTimeout(() => this._tick(), delay);
  }
};


/* ── COMMAND PALETTE ──────────────────────────── */
const CommandPalette = {
  overlay: null,
  input: null,
  results: null,
  isOpen: false,
  selectedIdx: -1,
  items: [],

  init(data) {
    this.overlay = $('#cmd-overlay');
    this.input   = $('#cmd-input');
    this.results = $('#cmd-results');
    if (!this.overlay) return;

    const navItems = [
      { label: 'Home',       icon: 'fas fa-home',         category: 'nav',      action: () => this._goto('#home') },
      { label: 'About',      icon: 'fas fa-user',          category: 'nav',      action: () => this._goto('#about') },
      { label: 'Skills',     icon: 'fas fa-code',          category: 'nav',      action: () => this._goto('#skills') },
      { label: 'Product',    icon: 'fas fa-mobile-alt',    category: 'nav',      action: () => this._goto('#product') },
      { label: 'Projects',   icon: 'fas fa-briefcase',     category: 'nav',      action: () => this._goto('#projects') },
      { label: 'Blogs',      icon: 'far fa-newspaper',     category: 'nav',      action: () => this._goto('#blogs') },
      { label: 'Featured',   icon: 'fas fa-star',          category: 'nav',      action: () => this._goto('#featured') },
      { label: 'Experience', icon: 'fas fa-history',       category: 'nav',      action: () => this._goto('#experience') },
      { label: 'Contact',    icon: 'fas fa-envelope',      category: 'nav',      action: () => this._goto('#contact') },
      { label: 'Download Resume', icon: 'fas fa-download', category: 'action',   action: () => { const a = document.createElement('a'); a.href='assets/resume.pdf'; a.download=''; a.click(); } },
    ];

    if (data?.projects) {
      data.projects.forEach(p => {
        navItems.push({ label: p.name, icon: 'fas fa-code-branch', category: 'project', action: () => this._goto('#projects') });
      });
    }

    this.items = navItems;

    $('#cmd-btn')?.addEventListener('click', () => this.open());
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); this.toggle(); }
      if (e.key === 'Escape' && this.isOpen) this.close();
      if (this.isOpen) {
        if (e.key === 'ArrowDown') { e.preventDefault(); this._move(1); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); this._move(-1); }
        if (e.key === 'Enter')     { this._select(); }
      }
    });

    this.overlay.addEventListener('click', e => { if (e.target === this.overlay) this.close(); });
    this.input.addEventListener('input', () => this._render(this.input.value));
  },

  toggle() { this.isOpen ? this.close() : this.open(); },

  open() {
    this.isOpen = true;
    this.overlay.classList.add('open');
    this.input.value = '';
    this._render('');
    setTimeout(() => this.input.focus(), 100);
  },

  close() {
    this.isOpen = false;
    this.overlay.classList.remove('open');
    this.selectedIdx = -1;
  },

  _render(query) {
    const q = query.toLowerCase().trim();
    const filtered = q ? this.items.filter(i => i.label.toLowerCase().includes(q)) : this.items;

    if (filtered.length === 0) {
      this.results.innerHTML = `<p class="cmd-empty">No results for "${query}"</p>`;
      return;
    }

    this.results.innerHTML = '';
    filtered.forEach((item, idx) => {
      const div = el('div', `cmd-item${idx === this.selectedIdx ? ' selected' : ''}`);
      div.innerHTML = `
        <i class="${item.icon} cmd-item-icon"></i>
        <span class="cmd-item-label">${item.label}</span>
        <span class="cmd-item-category">${item.category}</span>
      `;
      div.addEventListener('click', () => { item.action(); this.close(); });
      this.results.appendChild(div);
    });
  },

  _move(dir) {
    const items = $$('.cmd-item', this.results);
    this.selectedIdx = Math.max(0, Math.min(items.length - 1, this.selectedIdx + dir));
    items.forEach((el, i) => el.classList.toggle('selected', i === this.selectedIdx));
    items[this.selectedIdx]?.scrollIntoView({ block: 'nearest' });
  },

  _select() {
    const sel = $('.cmd-item.selected', this.results);
    if (sel) sel.click();
  },

  _goto(hash) {
    const target = $(hash);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }
};


/* ── SCROLL REVEAL ────────────────────────────── */
const ScrollReveal = {
  observer: null,

  init() {
    const els = $$('.reveal');
    if (!els.length) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('in-view');
          }, i * 60);
          this.observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    els.forEach(el => this.observer.observe(el));
  }
};


/* ── SKILL BARS ───────────────────────────────── */
const SkillBars = {
  animated: false,

  init() {
    const section = $('#skills');
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated) {
          this.animated = true;
          setTimeout(() => {
            $$('.skill-bar-fill').forEach(fill => {
              const pct = fill.dataset.pct;
              fill.style.width = pct + '%';
            });
          }, 300);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(section);
  }
};


/* ── FEATURED CAROUSEL ────────────────────────── */
const FeaturedCarousel = {
  container: null,
  dotsWrap: null,
  slides: [],
  dots: [],
  currentIdx: 0,
  autoTimer: null,

  init(data) {
    this.container = $('#featured-carousel');
    this.dotsWrap  = $('#carousel-dots');
    if (!this.container || !data?.featured?.length) return;

    // Render slides
    this.container.innerHTML = data.featured.map((item, i) => `
      <div class="carousel-slide${i === 0 ? ' active' : ''}" data-index="${i}">
        <div class="slide-image-frame">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
        </div>
        <div class="slide-content">
          <span class="slide-badge">${item.date}</span>
          <h3 class="slide-title">${item.title}</h3>
          <p class="slide-subtitle">${item.subtitle}</p>
          <p class="slide-desc">${item.description}</p>
          ${item.linkedinUrl ? `<a href="${item.linkedinUrl}" target="_blank" rel="noopener noreferrer" class="slide-linkedin-btn"><i class="fab fa-linkedin"></i> View on LinkedIn</a>` : ''}
        </div>
      </div>
    `).join('');

    // Render dots
    if (this.dotsWrap) {
      this.dotsWrap.innerHTML = data.featured.map((_, i) => `
        <button class="dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Slide ${i + 1}"></button>
      `).join('');
    }

    this.slides = $$('.carousel-slide', this.container);
    this.dots   = $$('.dot', this.dotsWrap);

    // Event listeners
    $('#carousel-prev')?.addEventListener('click', () => { this.prev(); this.resetTimer(); });
    $('#carousel-next')?.addEventListener('click', () => { this.next(); this.resetTimer(); });

    this.dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.index, 10);
        this.goTo(idx);
        this.resetTimer();
      });
    });

    this.startAuto();
  },

  goTo(idx) {
    this.currentIdx = (idx + this.slides.length) % this.slides.length;
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === this.currentIdx);
    });
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIdx);
    });
  },

  next() { this.goTo(this.currentIdx + 1); },
  prev() { this.goTo(this.currentIdx - 1); },

  startAuto() {
    this.stopAuto();
    this.autoTimer = setInterval(() => this.next(), 5000);
  },

  stopAuto() {
    if (this.autoTimer) clearInterval(this.autoTimer);
  },

  resetTimer() {
    this.startAuto();
  }
};


/* ── NAVBAR ───────────────────────────────────── */
const NavBar = {
  nav: null,
  links: [],

  init() {
    this.nav   = $('#navbar');
    this.links = $$('.nav-link');
    if (!this.nav) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }
      this._highlight();
    }, { passive: true });

    this._highlight();
  },

  _highlight() {
    const sections = $$('section[id]');
    let active = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 120) active = sec.id;
    });
    this.links.forEach(link => {
      link.classList.toggle('active-link', link.dataset.section === active);
    });
  }
};


/* ── MOBILE MENU ──────────────────────────────── */
const MobileMenu = {
  hamburger: null,
  menu: null,
  links: [],
  open: false,

  init() {
    this.hamburger = $('#hamburger');
    this.menu      = $('#mobile-menu');
    this.links     = $$('.mobile-link');
    if (!this.hamburger) return;

    this.hamburger.addEventListener('click', () => this.toggle());
    this.links.forEach(link => link.addEventListener('click', () => this.close()));
  },

  toggle() { this.open ? this.close() : this.openMenu(); },

  openMenu() {
    this.open = true;
    this.hamburger.classList.add('open');
    this.hamburger.setAttribute('aria-expanded', 'true');
    this.menu.classList.add('open');
  },

  close() {
    this.open = false;
    this.hamburger.classList.remove('open');
    this.hamburger.setAttribute('aria-expanded', 'false');
    this.menu.classList.remove('open');
  }
};


/* ── EXPERIENCE TABS ──────────────────────────── */
const ExperienceTabs = {
  init() {
    const tabs = $$('.tl-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.dataset.tab;
        $$('.timeline').forEach(tl => {
          tl.classList.toggle('hidden', tl.id !== `timeline-${target}`);
        });
      });
    });
  }
};


/* ── PROJECT FILTER ───────────────────────────── */
const ProjectFilter = {
  init() {
    const btns = $$('.filter-btn');
    if (!btns.length) return;

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        $$('.project-card').forEach(card => {
          const isFeatured = card.dataset.featured === 'true';
          const category   = card.dataset.category;
          if (filter === 'all') {
            card.classList.remove('filtered-out');
          } else if (filter === 'featured') {
            card.classList.toggle('filtered-out', !isFeatured);
          } else if (filter === 'opensource') {
            card.classList.toggle('filtered-out', category !== 'opensource');
          }
        });
      });
    });
  }
};


/* ── BACK TO TOP ──────────────────────────────── */
const BackToTop = {
  init() {
    const btn = $('#back-to-top');
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};


/* ════════════════════════════════════════════════
   RENDERER — Injects all data into the DOM
════════════════════════════════════════════════ */
const Renderer = {

  renderAll(data) {
    this.renderMeta(data);
    this.renderHero(data);
    this.renderAbout(data);
    this.renderSkills(data);
    this.renderProduct(data);
    this.renderProjects(data);
    this.renderBlogs(data);
    this.renderExperience(data);
    this.renderContact(data);
    this.renderFooter(data);
  },

  /* ── Meta ─ */
  renderMeta(data) {
    const m = data.meta;
    document.title = m.siteTitle;
    $('meta[name="description"]')?.setAttribute('content', m.siteDescription);
    $$('[href="assets/resume.pdf"]').forEach(a => a.setAttribute('href', m.resumeUrl || 'assets/resume.pdf'));
  },

  /* ── Hero ─ */
  renderHero(data) {
    const m = data.meta;

    const avail = $('#hero-availability-text');
    if (avail) avail.textContent = m.availability || 'Available for work';

    const name = $('#hero-name');
    if (name) name.textContent = m.name.toUpperCase();

    const desc = $('#hero-desc');
    if (desc) desc.textContent = m.heroDescription;

    const photo = $('#hero-photo');
    if (photo) {
      photo.src = m.profilePhoto;
      photo.alt = `${m.name} — ${m.title}`;
    }

    const resumeBtn = $('#hero-resume-btn');
    if (resumeBtn) resumeBtn.href = m.resumeUrl;

    const socialWrap = $('#hero-social');
    if (socialWrap && data.social) {
      socialWrap.innerHTML = data.social.map(s => `
        <a href="${s.url}" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="${s.label}" title="${s.label}">
          <i class="${s.icon}"></i>
        </a>
      `).join('');
    }

    const statsWrap = $('#hero-stats');
    if (statsWrap && data.stats) {
      statsWrap.innerHTML = data.stats.map(s => `
        <div class="stat-card">
          <p class="stat-card-value">${s.value}</p>
          <p class="stat-card-label">${s.label}</p>
        </div>
      `).join('');
    }

    Typewriter.init($('#typed-text'), m.subtitles);
  },

  /* ── About ─ */
  renderAbout(data) {
    const m = data.meta;

    const headingEl = $('#about-heading');
    if (headingEl && m.aboutHeading) headingEl.textContent = m.aboutHeading;

    const longEl = $('#about-long');
    if (longEl) longEl.innerHTML = m.aboutLong.replace(/\n/g, '<br>');

    const tagsWrap = $('#about-tags');
    if (tagsWrap && data.skills?.tags) {
      tagsWrap.innerHTML = data.skills.tags.map(t => `<span class="tag">${t}</span>`).join('');
    }

    const statsGrid = $('#about-stats');
    if (statsGrid && data.stats) {
      statsGrid.innerHTML = data.stats.map(s => `
        <div class="about-stat-item">
          <p class="about-stat-value">${s.value}</p>
          <p class="about-stat-label">${s.label}</p>
        </div>
      `).join('');
    }

    const quickContact = $('#about-contact-quick');
    if (quickContact && m) {
      quickContact.innerHTML = `
        <div class="quick-contact-item"><i class="fas fa-map-marker-alt"></i> ${m.location}</div>
        <div class="quick-contact-item"><i class="fas fa-envelope"></i> <a href="mailto:${m.email}">${m.email}</a></div>
        <div class="quick-contact-item"><i class="fas fa-globe"></i> ${m.languages.join(', ')}</div>
      `;
    }

    const resumeBtn = $('#about-resume-btn');
    if (resumeBtn) resumeBtn.href = m.resumeUrl;
  },

  /* ── Skills ─ */
  renderSkills(data) {
    const tagsWrap = $('#skills-tags');
    if (tagsWrap && data.skills?.tags) {
      tagsWrap.innerHTML = data.skills.tags.map(t => `<span class="skill-tag">${t}</span>`).join('');
    }

    const techWrap = $('#technical-skills');
    if (techWrap && data.skills?.technical) {
      techWrap.innerHTML = data.skills.technical.map(s => `
        <div class="skill-bar-item">
          <div class="skill-bar-header">
            <span class="skill-bar-name">${s.name}</span>
            <span class="skill-bar-pct">${s.level}%</span>
          </div>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" data-pct="${s.level}" style="width:0%"></div>
          </div>
        </div>
      `).join('');
    }

    const softWrap = $('#soft-skills');
    if (softWrap && data.skills?.soft) {
      softWrap.innerHTML = data.skills.soft.map(s => `
        <div class="skill-bar-item">
          <div class="skill-bar-header">
            <span class="skill-bar-name">${s.name}</span>
            <span class="skill-bar-pct">${s.level}%</span>
          </div>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" data-pct="${s.level}" style="width:0%"></div>
          </div>
        </div>
      `).join('');
    }
  },

  /* ── Product ─ */
  renderProduct(data) {
    const hero = $('#product-hero');
    const p = data.product;
    if (!hero || !p) return;

    // Build carousel HTML if carouselImages provided
    const carouselImages = p.carouselImages && p.carouselImages.length ? p.carouselImages : [p.image];
    const carouselHTML = `
      <div class="product-carousel" id="product-img-carousel">
        ${carouselImages.map((src, i) => `
          <img src="${src}" alt="${p.title} screenshot ${i + 1}" loading="lazy" class="product-carousel-img${i === 0 ? ' active' : ''}" />
        `).join('')}
        <div class="product-carousel-dots">
          ${carouselImages.map((_, i) => `<span class="product-dot${i === 0 ? ' active' : ''}" data-idx="${i}"></span>`).join('')}
        </div>
      </div>`;

    hero.innerHTML = `
      <div class="product-info">
        <div class="product-badges">
          ${p.badges.map(b => `<span class="product-badge-item">${b}</span>`).join('')}
        </div>
        <h3 class="product-name-title">${p.title}</h3>
        <p class="product-tagline">${p.tagline}</p>
        <p class="product-description-text">${p.description}</p>
        <div class="product-cta-group">
          ${p.playstore ? `<a href="${p.playstore}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class="fab fa-google-play"></i> Play Store</a>` : ''}
          ${p.website   ? `<a href="${p.website}"   target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><i class="fas fa-globe"></i> App Website</a>` : ''}
        </div>
      </div>
      <div class="product-image-wrap">
        ${carouselHTML}
      </div>
    `;

    // Auto-fade carousel
    if (carouselImages.length > 1) {
      const imgs = $$('.product-carousel-img', hero);
      const dots = $$('.product-dot', hero);
      let current = 0;

      const goTo = (idx) => {
        imgs[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (idx + imgs.length) % imgs.length;
        imgs[current].classList.add('active');
        dots[current].classList.add('active');
      };

      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          const idx = parseInt(dot.dataset.idx, 10);
          goTo(idx);
          clearInterval(productTimer);
          productTimer = setInterval(() => goTo(current + 1), 3500);
        });
      });

      let productTimer = setInterval(() => goTo(current + 1), 3500);
    }
  },

  /* ── Projects ─ */
  renderProjects(data) {
    const grid = $('#projects-grid');
    if (!grid || !data.projects) return;

    grid.innerHTML = data.projects.map((p, i) => {
      const githubLink = p.github
        ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="project-link"><i class="fab fa-github"></i> Code</a>`
        : `<span class="project-link" style="opacity:0.3"><i class="fab fa-github"></i> Private</span>`;
      const liveLink = p.live
        ? `<a href="${p.live}" target="_blank" rel="noopener noreferrer" class="project-link"><i class="fas fa-external-link-alt"></i> Live</a>`
        : '';

      // GitHub banner projects get a special glowing GitHub logo badge
      const githubBadge = p.githubBanner
        ? `<div class="github-banner-badge"><i class="fab fa-github"></i><span>GitHub Project</span></div>`
        : '';

      return `
        <div class="project-card reveal" data-featured="${p.featured}" data-category="${p.category || 'mobile'}" style="animation-delay:${i * 80}ms">
          <div class="project-thumb${p.githubBanner ? ' has-github-banner' : ''}">
            <img src="${p.image}" alt="${p.name}" loading="lazy" />
            ${githubBadge}
            <div class="project-overlay">
              ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="project-overlay-btn" aria-label="View source on GitHub"><i class="fab fa-github"></i></a>` : ''}
              ${p.live   ? `<a href="${p.live}"   target="_blank" rel="noopener noreferrer" class="project-overlay-btn" aria-label="View live demo"><i class="fas fa-external-link-alt"></i></a>` : ''}
            </div>
            ${p.featured ? '<span class="project-badge">Featured</span>' : ''}
          </div>
          <div class="project-body">
            <h3 class="project-name">${p.name}</h3>
            <p class="project-desc">${p.description}</p>
            <div class="project-tags">
              ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
            </div>
            <div class="project-links">
              ${githubLink}
              ${liveLink}
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  /* ── Blogs ─ */
  renderBlogs(data) {
    const grid = $('#blogs-grid');
    if (!grid || !data.blogs) return;

    grid.innerHTML = data.blogs.map((b, i) => `
      <div class="blog-card reveal" style="animation-delay:${i * 80}ms">
        <div class="blog-thumb">
          <img src="${b.image}" alt="${b.title}" loading="lazy" />
        </div>
        <div class="blog-body">
          <div class="blog-meta">
            <span>${b.date}</span>
            <span>•</span>
            <span>${b.readTime}</span>
          </div>
          <h3 class="blog-title">${b.title}</h3>
          <p class="blog-excerpt">${b.excerpt}</p>
          <div class="blog-tags">
            ${b.tags.map(t => `<span class="blog-tag">${t}</span>`).join('')}
          </div>
          <a href="${b.url}" target="_blank" rel="noopener noreferrer" class="blog-read-more">
            Read on Medium <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    `).join('');
  },

  /* ── Experience ─ */
  renderExperience(data) {
    this._renderTimeline('timeline-work', data.experience, 'fas fa-briefcase');
    this._renderTimeline('timeline-education', data.education, 'fas fa-graduation-cap');
  },

  _renderTimeline(id, items, iconClass) {
    const container = $(`#${id}`);
    if (!container || !items) return;

    container.innerHTML = items.map((item, i) => `
      <div class="tl-item" style="animation-delay:${i * 120}ms">
        <div class="tl-left">
          <div class="tl-icon-wrap"><i class="${iconClass}"></i></div>
          <div class="tl-line"></div>
        </div>
        <div class="tl-content">
          <p class="tl-duration">${item.duration}</p>
          <h3 class="tl-role">${item.role || item.degree}</h3>
          <p class="tl-company"><i class="fas fa-building"></i> ${item.company || item.institution}${item.location ? ` — ${item.location}` : ''}</p>
          <p class="tl-desc">${item.description}</p>
          ${item.gpa ? `<span class="tl-gpa"><i class="fas fa-star"></i> ${item.gpa}</span>` : ''}
        </div>
      </div>
    `).join('');
  },

  /* ── Contact ─ */
  renderContact(data) {
    const m = data.meta;
    const c = data.contact;

    const sub = $('#contact-subheading');
    if (sub && c) sub.textContent = c.subheading;

    const itemsWrap = $('#contact-items');
    if (itemsWrap && c?.items) {
      itemsWrap.innerHTML = c.items.map(item => `
        <div class="contact-item">
          <div class="contact-item-icon"><i class="${item.icon}"></i></div>
          <div>
            <p class="contact-item-label">${item.label}</p>
            <p class="contact-item-value">
              ${item.href ? `<a href="${item.href}">${item.value}</a>` : item.value}
            </p>
          </div>
        </div>
      `).join('');
    }

    const socialWrap = $('#contact-social');
    if (socialWrap && data.social) {
      socialWrap.innerHTML = data.social.map(s => `
        <a href="${s.url}" class="contact-social-link" target="_blank" rel="noopener noreferrer" aria-label="${s.label}">
          <i class="${s.icon}"></i>
          <span>${s.platform}</span>
          <i class="fas fa-arrow-right arrow"></i>
        </a>
      `).join('');
    }

    const emailBtn = $('#contact-email-btn');
    if (emailBtn && m?.email) emailBtn.href = `mailto:${m.email}`;
  },

  /* ── Footer ─ */
  renderFooter(data) {
    const m = data.meta;
    const copy = $('#footer-copy');
    if (copy && m) {
      copy.innerHTML = `© ${new Date().getFullYear()} ${m.name} — Built with ❤️ &amp; clean code.`;
    }
  }
};


/* ════════════════════════════════════════════════
   MAIN — Bootstrap everything
════════════════════════════════════════════════ */
(async function main() {
  IntroAnimation.run();

  const data = await DataLoader.get();

  if (data) {
    Renderer.renderAll(data);
  }

  CustomCursor.init();
  CommandPalette.init(data);
  NavBar.init();
  MobileMenu.init();
  ExperienceTabs.init();
  ProjectFilter.init();
  FeaturedCarousel.init(data);
  BackToTop.init();

  ScrollReveal.init();
  SkillBars.init();

  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  console.log('%c MK Portfolio Loaded ✓', 'color:#22c55e; font-weight:700; font-size:14px;');
})();