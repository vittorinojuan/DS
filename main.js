document.documentElement.classList.add('js');

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----- Menu mobile ----- */
  var btnMenu = document.querySelector('.btn-menu');
  var overlay = document.getElementById('nav-mobile');
  if (btnMenu && overlay) {
    var btnClose = overlay.querySelector('[data-nav-close]');
    var setNav = function (open) {
      overlay.classList.toggle('is-open', open);
      btnMenu.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
      if (open && btnClose) btnClose.focus();
      if (!open) btnMenu.focus();
    };
    btnMenu.addEventListener('click', function () { setNav(true); });
    overlay.addEventListener('click', function (e) {
      if (e.target.closest('[data-nav-close]') || e.target.closest('a[href^="#"]')) {
        overlay.classList.remove('is-open');
        btnMenu.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) setNav(false);
    });
  }

  /* ----- Reveal ao rolar ----- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var idx = reveals.indexOf(e.target);
        e.target.style.transitionDelay = ((idx % 6) * 80) + 'ms';
        e.target.classList.add('is-visible');
        revealObserver.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ----- Cross-fade dos mockups do hero ----- */
  var stage = document.querySelector('[data-hero-stage]');
  if (stage) {
    var layers = Array.prototype.slice.call(stage.querySelectorAll('.mock'));
    var current = 0, heroTimer = null;
    var showLayer = function (i) {
      layers.forEach(function (l, n) {
        var on = n === i;
        l.classList.toggle('is-active', on);
        l.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
      current = i;
    };
    var stopHero = function () { if (heroTimer) { clearInterval(heroTimer); heroTimer = null; } };
    var startHero = function () {
      stopHero();
      if (reduceMotion) return;
      heroTimer = setInterval(function () { showLayer((current + 1) % layers.length); }, 7000);
    };
    stage.addEventListener('mouseenter', stopHero);
    stage.addEventListener('mouseleave', startHero);
    startHero();
  }

  /* ----- Contador da barra de números (valor final já está no HTML) ----- */
  var stats = document.querySelector('[data-stats]');
  if (stats && !reduceMotion && 'IntersectionObserver' in window) {
    var nums = Array.prototype.slice.call(stats.querySelectorAll('[data-target]'));
    nums.forEach(function (n) { n.textContent = '0'; });
    var statsObserver = new IntersectionObserver(function (entries) {
      if (!entries.some(function (e) { return e.isIntersecting; })) return;
      statsObserver.disconnect();
      var start = performance.now(), dur = 900;
      var tick = function (t) {
        var p = Math.min(1, (t - start) / dur);
        nums.forEach(function (n) { n.textContent = Math.round(parseInt(n.getAttribute('data-target'), 10) * p); });
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    statsObserver.observe(stats);
  }

  /* ----- Como funciona: etapa ativa (o texto das 5 já está no HTML) ----- */
  var steps = Array.prototype.slice.call(document.querySelectorAll('[data-step-idx]'));
  var details = Array.prototype.slice.call(document.querySelectorAll('[data-step-detail]'));
  if (steps.length) {
    var setStep = function (i) {
      steps.forEach(function (s, n) { s.classList.toggle('is-active', n === i); });
      details.forEach(function (d, n) { d.classList.toggle('is-active', n === i); });
    };
    steps.forEach(function (s, n) { s.addEventListener('click', function () { setStep(n); }); });
    if ('IntersectionObserver' in window) {
      var stepObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) setStep(parseInt(e.target.getAttribute('data-step-idx'), 10));
        });
      }, { threshold: 0.6 });
      steps.forEach(function (s) { stepObserver.observe(s); });
    }
  }

  /* ----- Linha do tempo mensal ----- */
  var timeline = document.querySelector('[data-timeline]');
  if (timeline) {
    var fill = timeline.querySelector('.timeline-fill');
    if ('IntersectionObserver' in window) {
      var tlObserver = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) {
          fill.classList.add('is-full');
          tlObserver.disconnect();
        }
      }, { threshold: 0.4 });
      tlObserver.observe(timeline);
    } else {
      fill.classList.add('is-full');
    }
  }

  /* @@JS-END@@ */
})();
