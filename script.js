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

  // Recent drops: swap a tile for Instagram's player only when it's tapped,
  // so nothing loads from Instagram until a visitor asks for it
  const sizeEmbed = frame => {
    // Instagram's embed = header + 4:5 video + likes/comment footer
    frame.style.height = `${Math.round(frame.offsetWidth * 1.25 + 220)}px`;
  };

  document.querySelectorAll('.reel[data-reel] .reel-link').forEach(link => {
    link.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let "open in new tab" through
      e.preventDefault();
      const tile = link.closest('.reel');
      const frame = document.createElement('iframe');
      frame.src = `https://www.instagram.com/reel/${tile.dataset.reel}/embed/`;
      frame.title = link.getAttribute('aria-label').replace(/^Play (.*) on Instagram$/, 'Instagram $1');
      frame.allow = 'autoplay; encrypted-media; picture-in-picture';
      frame.allowFullscreen = true;
      tile.classList.add('playing');
      link.replaceWith(frame);
      sizeEmbed(frame);
      frame.focus();
    });
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll('.reel.playing iframe').forEach(sizeEmbed);
  }, { passive: true });

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
