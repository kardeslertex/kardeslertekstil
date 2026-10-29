(() => {
  const carousel = document.querySelector('.facility-carousel');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('.facility-slide')];
  if (slides.length < 2) return;
  const controls = carousel.querySelector('.facility-controls');
  const counter = carousel.querySelector('.facility-counter');
  const pause = carousel.querySelector('.facility-pause');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, timer, paused = motion.matches, hovered = false, focused = false;
  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== current;
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-label', `${i + 1} / ${slides.length}`);
      if (i === current) slide.querySelector('img').loading = 'eager';
    });
    counter.textContent = `${current + 1} / ${slides.length}`;
  };
  const schedule = () => {
    clearInterval(timer);
    if (!paused && !hovered && !focused && !document.hidden)
      timer = setInterval(() => show(current + 1), 5000);
  };
  const updatePause = () => {
    pause.textContent = paused ? 'Oynat' : 'Duraklat';
    pause.setAttribute('aria-label', paused ? 'Otomatik geçişi başlat' : 'Otomatik geçişi duraklat');
    schedule();
  };
  const move = (step) => { show(current + step); schedule(); };
  controls.hidden = false;
  controls.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => move(Number(button.dataset.step))));
  pause.addEventListener('click', () => { paused = !paused; updatePause(); });
  carousel.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  carousel.addEventListener('focusin', () => { focused = true; schedule(); });
  carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) { focused = false; schedule(); } });
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
  });
  let touch;
  carousel.addEventListener('touchstart', event => { const t = event.changedTouches[0]; touch = {x:t.clientX,y:t.clientY}; }, {passive:true});
  carousel.addEventListener('touchend', event => {
    if (!touch) return;
    const t = event.changedTouches[0], dx = t.clientX-touch.x, dy = t.clientY-touch.y;
    if (Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)) move(dx<0 ? 1 : -1);
    touch = null;
  }, {passive:true});
  carousel.addEventListener('touchcancel', () => { touch = null; }, {passive:true});
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { paused = motion.matches; updatePause(); });
  show(0);
  updatePause();
})();
