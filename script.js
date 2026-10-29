// swati✶ portfolio: scroll reveals, custom cursor, footer year.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Scroll reveal, staggered within each group of siblings
  const items = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in'));
  } else {
    items.forEach(el => {
      const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
      const i = siblings.indexOf(el);
      if (i > 0) el.style.transitionDelay = `${Math.min(i, 6) * 90}ms`;
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('in');
        io.unobserve(el);
        // Drop the stagger delay once revealed so hover effects respond instantly
        el.addEventListener('transitionend', () => { el.style.transitionDelay = ''; }, { once: true });
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => io.observe(el));
  }

  // Custom cursor dot: desktop pointers only
  const cursor = document.querySelector('.cursor');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!cursor || reduceMotion || !finePointer) return;

  let x = -100, y = -100, cx = x, cy = y, running = false;

  const tick = () => {
    cx += (x - cx) * 0.22;
    cy += (y - cy) * 0.22;
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    if (Math.abs(x - cx) > 0.1 || Math.abs(y - cy) > 0.1) {
      requestAnimationFrame(tick);
    } else {
      running = false;
    }
  };

  window.addEventListener('pointermove', e => {
    x = e.clientX;
    y = e.clientY;
    cursor.classList.add('on');
    if (!running) { running = true; requestAnimationFrame(tick); }
  }, { passive: true });

  document.addEventListener('pointerleave', () => cursor.classList.remove('on'));

  document.addEventListener('pointerover', e => {
    cursor.classList.toggle('big', !!e.target.closest('a, button'));
  });
})();
