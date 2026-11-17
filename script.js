/* Scroll-driven particles. Motion measures progress; Canvas renders the field. */
(() => {
  'use strict';
  const canvas = document.querySelector('#particle-field');
  const ctx = canvas.getContext('2d', { alpha: false });
  const track = document.querySelector('.hero-track');
  const copy = document.querySelector('.hero-copy');
  const pause = document.querySelector('#pause-drift');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelector('#year').textContent = new Date().getFullYear();
  if (!ctx) { pause.hidden = true; return; }
  let w, h, points = [], target = 0, progress = 0, time = 0, last = 0, raf = 0;
  let paused = reduced.matches;
  const clamp = n => Math.max(0, Math.min(1, n));
  const smooth = (a, b, n) => { const p = clamp((n - a) / (b - a)); return p * p * (3 - 2 * p); };
  let seed = 85;
  function random() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
  function requestDraw() { if (!raf && !document.hidden) raf = requestAnimationFrame(draw); }
  function resize() {
    w = canvas.clientWidth; h = canvas.clientHeight;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed = 85;
    points = Array.from({ length: w < 650 ? 1800 : 3800 }, () => ({
      angle: random() * Math.PI * 2, radius: Math.sqrt(random()), depth: random() * 2 - 1,
      size: .4 + random() * 1.2, seed: random(), warm: random() > .58
    }));
    requestDraw();
  }
  function draw(now) {
    raf = 0;
    const dt = last ? Math.min((now - last) / 1000, .06) : .016; last = now;
    if (!paused && !reduced.matches) time += dt;
    progress = reduced.matches ? target : progress + (target - progress) * (1 - Math.exp(-dt * 13));
    if (Math.abs(progress - target) < .00005) progress = target;
    const dissolve = smooth(.08, .9, progress);
    const opacity = 1 - smooth(.17, .91, progress);
    ctx.fillStyle = '#090b0d'; ctx.fillRect(0, 0, w, h);
    if (opacity > .001) {
      ctx.globalAlpha = opacity;
      const radius = Math.min(w * .47, h * .49), spread = 1 + dissolve * .95;
      for (const p of points) {
        const angle = p.angle + time * .035 * (.3 + p.radius * .25);
        const ring = radius * (.65 + p.radius * .36);
        const depth = (Math.sin(angle) + 1) / 2;
        const x = Math.cos(angle) * ring * spread + Math.cos(p.angle * 5) * dissolve * radius * p.seed * .5;
        const y = (Math.sin(angle) * ring * .74 + p.depth * radius * .11) * spread - dissolve * h * (.16 + p.seed * .32);
        const alpha = (.17 + depth * .67) * (1 - p.radius * .23);
        ctx.fillStyle = p.warm ? `rgba(220,191,143,${alpha})` : `rgba(154,183,197,${alpha * .77})`;
        const size = p.size * (.55 + depth * .65);
        ctx.fillRect(w * .5 + x, h * .49 + y, size, size);
      }
    }
    ctx.globalAlpha = 1;
    const fade = 1 - smooth(.08, .77, progress);
    copy.style.opacity = fade;
    copy.style.transform = `translateY(${-progress * (reduced.matches ? 0 : 65)}px)`;
    copy.inert = fade < .04;
    if ((!paused && !reduced.matches && opacity > .001) || progress !== target) requestDraw();
  }
  const update = p => { target = clamp(p); requestDraw(); };
  if (window.Motion) {
    Motion.scroll(update, { target: track, offset: ['start start', 'end end'] });
  } else {
    // Keep the background functional if the optional Motion bundle is unavailable.
    const onScroll = () => update(-track.getBoundingClientRect().top / Math.max(1, track.offsetHeight - innerHeight));
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll();
  }
  function syncPause() {
    pause.innerHTML = paused ? 'Resume motion <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
    pause.setAttribute('aria-pressed', String(paused));
  }
  pause.addEventListener('click', () => { paused = !paused; syncPause(); last = 0; requestDraw(); });
  reduced.addEventListener('change', () => { paused = reduced.matches; syncPause(); requestDraw(); });
  document.addEventListener('visibilitychange', () => { last = 0; requestDraw(); });
  addEventListener('resize', resize);
  syncPause(); resize();
})();
