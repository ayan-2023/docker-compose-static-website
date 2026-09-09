/**
 * CloudOps Infrastructure Dashboard
 * Vanilla JavaScript Frontend Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initScrollSpy();
  animateProgressBars();
});

/**
 * Mobile Navigation Menu Handler
 */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = navLinks.classList.contains('mobile-open');
    if (isExpanded) {
      navLinks.classList.remove('mobile-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      navLinks.classList.add('mobile-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Close drawer upon clicking any menu item
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * ScrollSpy Active Navigation Highlighter
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/**
 * Animate Progress Bars on Page Load
 */
function animateProgressBars() {
  const progressFills = document.querySelectorAll('.progress-fill[data-target]');

  // Trigger smooth fill after DOM load
  setTimeout(() => {
    progressFills.forEach(fill => {
      const targetWidth = fill.getAttribute('data-target');
      if (targetWidth) {
        fill.style.width = `${targetWidth}%`;
      }
    });
  }, 200);
}
