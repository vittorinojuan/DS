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

  /* @@JS-END@@ */
})();
