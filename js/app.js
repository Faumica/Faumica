/**
 * FAUMICA — Design Naturale per Animali
 * Interactive Showcase Logic: Uncropped Hero Switcher, Interactive Hotspot Explorer,
 * FAQ Accordion & Gallery Lightbox
 */
(function () {
  'use strict';

  /* ========================================================================
     1. STICKY HEADER & MOBILE MENU
     ======================================================================== */
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  function handleHeaderScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 16);
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ========================================================================
     2. HERO PHOTO SWITCHER (Il Set / Cani / Gatti — 100% Uncropped)
     ======================================================================== */
  const heroImg = document.getElementById('heroProductImg');
  const heroViewBtns = document.querySelectorAll('[data-hero-src]');

  heroViewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const newSrc = btn.getAttribute('data-hero-src');
      const newAlt = btn.getAttribute('data-hero-alt');

      heroViewBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });

      if (heroImg && newSrc) {
        heroImg.src = newSrc;
        if (newAlt) heroImg.alt = newAlt;
      }
    });
  });

  /* ========================================================================
     3. INTERACTIVE PRODUCT ANATOMY EXPLORER (HOTSPOTS ON ORIGINAL PHOTO)
     ======================================================================== */
  const hotspotPins = document.querySelectorAll('[data-hotspot]');
  const explorerItems = document.querySelectorAll('[data-explorer-item]');

  function activateHotspot(id) {
    hotspotPins.forEach((pin) => {
      const match = pin.getAttribute('data-hotspot') === id;
      pin.classList.toggle('is-active', match);
      pin.setAttribute('aria-expanded', String(match));
    });

    explorerItems.forEach((item) => {
      const match = item.getAttribute('data-explorer-item') === id;
      item.classList.toggle('is-active', match);
      item.setAttribute('aria-expanded', String(match));
    });
  }

  hotspotPins.forEach((pin) => {
    pin.addEventListener('click', () => {
      activateHotspot(pin.getAttribute('data-hotspot'));
    });
  });

  explorerItems.forEach((item) => {
    item.addEventListener('click', () => {
      activateHotspot(item.getAttribute('data-explorer-item'));
    });
  });

  /* ========================================================================
     4. FAQ ACCORDION
     ======================================================================== */
  document.querySelectorAll('.accordion__trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panel = trigger.nextElementSibling;
      trigger.setAttribute('aria-expanded', String(!isExpanded));
      if (panel) {
        panel.hidden = isExpanded;
      }
    });
  });

  /* ========================================================================
     5. GALLERY LIGHTBOX & KEYBOARD ESCAPE
     ======================================================================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  function openLightbox(src, caption, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || caption || 'Immagine ingrandita FAUMICA';
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-lightbox]').forEach((card) => {
    const triggerOpen = () => {
      const src = card.getAttribute('data-lightbox');
      const caption = card.getAttribute('data-caption');
      const img = card.querySelector('img');
      openLightbox(src, caption, img ? img.alt : '');
    };
    card.addEventListener('click', triggerOpen);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerOpen();
      }
    });
  });

  document.querySelectorAll('[data-close-lightbox]').forEach((el) => {
    el.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox && !lightbox.hidden) closeLightbox();
      if (mainNav && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  /* ========================================================================
     6. SUBTLE SCROLL REVEAL
     ======================================================================== */
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }
})();
