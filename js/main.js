/* ==============================
   MAIN JAVASCRIPT — Portfolio
   ============================== */

document.addEventListener('DOMContentLoaded', () => {

  'use strict';

  // ==============================
  // THEME TOGGLE
  // ==============================
  const STORAGE_KEY = 'portfolio-theme';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update theme-color meta tag
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#0A0A0A' : '#FFFFFF');
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  // Wire up all theme toggle buttons
  const toggleButtons = document.querySelectorAll('.theme-toggle');
  toggleButtons.forEach(function(btn) {
    btn.addEventListener('click', toggleTheme);
  });

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ==============================
  // NAVBAR SCROLL EFFECT
  // ==============================
  const navbar = document.getElementById('mainNav');
  let lastScroll = 0;

  function handleNavbarScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  // Run once on load
  handleNavbarScroll();

  // ==============================
  // ACTIVE NAV LINK (Scroll Spy)
  // ==============================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    const offset = 120;

    let currentSectionId = 'home';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - offset;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // ==============================
  // SCROLL ANIMATIONS (Intersection Observer)
  // ==============================
  const animatedElements = document.querySelectorAll('[data-aos]');

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            // Optionally unobserve after animation to save resources
            // observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

  // ==============================
  // SMOOTH COLLAPSE ON NAV LINK CLICK (Mobile)
  // ==============================
  const navbarCollapse = document.getElementById('navbarNav');
  const navLinksAll = document.querySelectorAll('.nav-link');

  if (navbarCollapse) {
    navLinksAll.forEach((link) => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }

  // ==============================
  // PARALLAX SCROLL INDICATOR FADE
  // ==============================
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (scrollIndicator) {
    function handleIndicatorFade() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const opacity = Math.max(0, 1 - scrollY / 300);
      scrollIndicator.style.opacity = opacity;
      scrollIndicator.style.visibility = opacity > 0 ? 'visible' : 'hidden';
    }

    window.addEventListener('scroll', handleIndicatorFade, { passive: true });
    handleIndicatorFade();
  }

  // ==============================
  // CONSISTENT CARD HEIGHT (Optional Enhancement)
  // ==============================
  function equalizeCardHeights() {
    // Only run on larger screens
    if (window.innerWidth < 768) return;

    const cardGroups = [
      document.querySelectorAll('.project-card'),
      document.querySelectorAll('.stack-card'),
      document.querySelectorAll('.contact-card'),
    ];

    cardGroups.forEach((group) => {
      if (group.length === 0) return;

      // Reset heights first
      group.forEach((card) => {
        card.style.height = 'auto';
      });

      // Find max height within each row
      // Simple approach: set all to max height
      let maxHeight = 0;
      group.forEach((card) => {
        const cardHeight = card.offsetHeight;
        if (cardHeight > maxHeight) maxHeight = cardHeight;
      });

      if (maxHeight > 0) {
        group.forEach((card) => {
          card.style.height = maxHeight + 'px';
        });
      }
    });
  }

  // Run on load and resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(equalizeCardHeights, 200);
  });

  // Run after images/fonts load
  if (document.readyState === 'complete') {
    equalizeCardHeights();
  } else {
    window.addEventListener('load', equalizeCardHeights);
  }

  // ==============================
  // KEYBOARD NAVIGATION (Accessibility)
  // ==============================
  // Ensure focus styles only on keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  console.log('%c Portfolio by Sigit Wahab Albi ', 'background: #3B82F6; color: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold;');
  console.log('%c Built with ❤️ using HTML, CSS, Bootstrap & JavaScript ', 'color: #A1A1AA; font-size: 12px;');
});