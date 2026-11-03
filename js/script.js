/* ============ BirthdayVerse · Senior Portfolio UI/UX · script.js ============ */
(function () {
  'use strict';
  document.documentElement.classList.add('js-slides');

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function safe(label, fn) {
    try { return fn(); } catch (e) { console.error('[BirthdayVerse]', label, e); return null; }
  }

  /* ---------- Confetti / Hearts / Sparkles Canvas ---------- */
  function createEffects() {
    const cv = $('#fx');
    if (!cv || !cv.getContext) return null;
    const c = cv.getContext('2d');
    const COLORS = ['#DCEAF7', '#829DBB', '#E8C987', '#C99B3B', '#FFFDF7', '#24364B'];
    let parts = [], raf = null;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = innerWidth * dpr;
      cv.height = innerHeight * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    addEventListener('resize', resize); resize();

    const spawn = (p) => { if (parts.length < 260) parts.push(p); };
    const rnd = (a, b) => a + Math.random() * (b - a);

    function rain(n) {
      for (let i = 0; i < n; i++) spawn({
        type: 'confetti', x: rnd(0, innerWidth), y: rnd(-innerHeight * .55, -15),
        vx: rnd(-.7, .7), vy: rnd(2.0, 3.9), rot: rnd(0, 6.28), vr: rnd(-.15, .15),
        size: rnd(5, 10), color: COLORS[(Math.random() * COLORS.length) | 0],
        life: 1, decay: rnd(.003, .0065)
      });
      ensure();
    }
    function burst(x, y, kind) {
      const n = kind === 'heart' ? 28 : 48;
      for (let i = 0; i < n; i++) {
        const a = rnd(0, 6.28), sp = kind === 'heart' ? rnd(1.8, 5.0) : rnd(2.8, 7.5);
        spawn({
          type: kind, x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (kind === 'heart' ? 1.8 : 2.5),
          rot: rnd(0, 6.28), vr: rnd(-.1, .1), size: rnd(7, kind === 'heart' ? 15 : 11),
          color: kind === 'heart' ? (Math.random() < .55 ? '#E87A96' : '#E8C987') : COLORS[(Math.random() * COLORS.length) | 0],
          life: 1, decay: rnd(.006, .012)
        });
      }
      ensure();
    }
    function heartPath(s) {
      c.beginPath();
      c.moveTo(0, s * .35);
      c.bezierCurveTo(-s * .95, -s * .5, -s * .38, -s * 1.05, 0, -s * .42);
      c.bezierCurveTo(s * .38, -s * 1.05, s * .95, -s * .5, 0, s * .35);
      c.closePath();
    }
    function tick() {
      c.clearRect(0, 0, innerWidth, innerHeight);
      parts = parts.filter(p => p.life > 0 && p.y < innerHeight + 40);
      for (const p of parts) {
        p.x += p.vx + (p.type === 'heart' ? Math.sin(p.life * 9) * .6 : 0);
        p.y += p.vy; p.vy += p.type === 'confetti' ? .048 : -.008;
        p.rot += p.vr; p.life -= p.decay;
        c.save(); c.globalAlpha = Math.max(p.life, 0); c.translate(p.x, p.y); c.rotate(p.rot);
        c.fillStyle = p.color;
        if (p.type === 'heart') { heartPath(p.size); c.fill(); }
        else c.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        c.restore();
      }
      raf = parts.length ? requestAnimationFrame(tick) : null;
    }
    function ensure() { if (!raf && !prefersReduced) raf = requestAnimationFrame(tick); }
    return { rain, burstConfetti: (x, y) => burst(x, y, 'confetti'), burstHearts: (x, y) => burst(x, y, 'heart') };
  }

  /* ---------- Twinkling Stars (Slide 1) ---------- */
  function createStars(box) {
    if (!box) return;
    for (let i = 0; i < 44; i++) {
      const s = document.createElement('span');
      s.className = 'star';
      const size = 2 + Math.random() * 3.5;
      s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-delay:${(Math.random() * 2.6).toFixed(2)}s`;
      box.appendChild(s);
    }
  }

  /* ---------- LOUD, UPBEAT 132-BPM Pop-Chime Birthday Synthesizer ---------- */
  function createMusic() {
    const toggleBtn = $('#musicToggle');
    const musicLabel = $('#musicLabel');
    const vibeBtn = $('#vibeBtn');
    const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);

    // Upbeat Happy Birthday Celebration Arrangement: [leadMidi, chordMidi1, chordMidi2, bassMidi, beats]
    const SONG = [
      [67, 60, 64, 48, 0.75], [67, 0, 0, 0, 0.25],
      [69, 60, 65, 53, 1.0],  [67, 60, 64, 48, 1.0],
      [72, 64, 67, 55, 1.0],  [71, 62, 67, 55, 2.0],

      [67, 62, 65, 55, 0.75], [67, 0, 0, 0, 0.25],
      [69, 62, 65, 55, 1.0],  [67, 62, 65, 55, 1.0],
      [74, 65, 69, 50, 1.0],  [72, 64, 67, 48, 2.0],

      [67, 60, 64, 48, 0.75], [67, 0, 0, 0, 0.25],
      [79, 67, 72, 52, 1.0],  [76, 64, 67, 48, 1.0],
      [72, 60, 65, 53, 1.0],  [71, 59, 64, 52, 1.0], [69, 60, 65, 53, 1.5],

      [77, 65, 69, 53, 0.75], [77, 0, 0, 0, 0.25],
      [76, 64, 67, 55, 1.0],  [72, 60, 64, 55, 1.0],
      [74, 62, 67, 55, 1.0],  [72, 64, 67, 48, 2.5]
    ];

    let vibe = 'party'; // 'party' (132 BPM with drums/bass) | 'chimes' (bright crystal chimes)
    let ctx = null, master = null, on = false, unlocked = false, loopTimer = null;

    function ensureContext() {
      if (ctx) return true;
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        // Dynamics Compressor boosts perceived loudness 5x on laptop/phone speakers without clipping
        const comp = ctx.createDynamicsCompressor();
        comp.threshold.value = -20;
        comp.knee.value = 12;
        comp.ratio.value = 4.5;
        comp.attack.value = 0.003;
        comp.release.value = 0.18;

        master = ctx.createGain();
        master.gain.value = 0.95;
        master.connect(comp);
        comp.connect(ctx.destination);
        return true;
      } catch (e) {
        console.error('[BirthdayVerse] WebAudio init error', e);
        return false;
      }
    }

    function playLead(f, t, dur) {
      if (!ctx || !f) return;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.42, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur * 1.12);

      // Rich dual-oscillator synth + octave bell harmonic
      const o1 = ctx.createOscillator();
      o1.type = vibe === 'party' ? 'sawtooth' : 'triangle';
      o1.frequency.value = f;

      const o2 = ctx.createOscillator();
      o2.type = 'triangle';
      o2.frequency.value = f * 2;
      const g2 = ctx.createGain();
      g2.gain.value = 0.28;

      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(4600, t);
      lp.frequency.exponentialRampToValueAtTime(1800, t + dur);

      o1.connect(lp);
      o2.connect(g2); g2.connect(lp);
      lp.connect(g); g.connect(master);

      o1.start(t); o1.stop(t + dur * 1.15);
      o2.start(t); o2.stop(t + dur * 1.15);
    }

    function playChordNote(f, t, dur, vol = 0.16) {
      if (!ctx || !f) return;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      const o = ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.value = f;
      o.connect(g); g.connect(master);
      o.start(t); o.stop(t + dur * 1.05);
    }

    function playKick(t) {
      if (!ctx) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(135, t);
      o.frequency.exponentialRampToValueAtTime(42, t + 0.11);
      g.gain.setValueAtTime(0.45, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.13);
      o.connect(g); g.connect(master);
      o.start(t); o.stop(t + 0.14);
    }

    function playHiHat(t) {
      if (!ctx) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'square';
      o.frequency.setValueAtTime(6200, t);
      g.gain.setValueAtTime(0.06, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
      o.connect(g); g.connect(master);
      o.start(t); o.stop(t + 0.05);
    }

    function scheduleLoop() {
      if (!ctx || !on) return;
      clearTimeout(loopTimer);
      const BEAT = vibe === 'party' ? 0.22 : 0.26; // Fast, energetic 132 BPM!
      const total = SONG.reduce((a, n) => a + n[4], 0) * BEAT;
      let t = ctx.currentTime + 0.04;

      for (const [lead, c1, c2, bass, b] of SONG) {
        const d = b * BEAT;
        if (lead) playLead(midi(lead), t, d);
        if (c1)   playChordNote(midi(c1), t, d * 0.95, 0.14);
        if (c2)   playChordNote(midi(c2), t, d * 0.95, 0.14);
        if (vibe === 'party') {
          if (bass) playChordNote(midi(bass), t, d * 0.9, 0.26);
          if (b >= 1) {
            playKick(t);
            playHiHat(t + BEAT * 0.5);
          }
        }
        t += d;
      }
      loopTimer = setTimeout(scheduleLoop, Math.max((total - 0.12) * 1000, 300));
    }

    // Bright celebratory fanfare arpeggio
    function fanfare() {
      if (!ensureContext()) return;
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      const now = ctx.currentTime + 0.01;
      [72, 76, 79, 84, 88].forEach((m, idx) => {
        playLead(midi(m), now + idx * 0.055, 0.32);
      });
    }

    function paint() {
      if (toggleBtn) {
        toggleBtn.classList.toggle('is-playing', on);
        toggleBtn.setAttribute('aria-pressed', String(on));
      }
      if (musicLabel) musicLabel.textContent = on ? 'Sound ON' : 'Muted';
      if (vibeBtn) vibeBtn.textContent = vibe === 'party' ? '🎶 Party Beat' : '✨ Chimes';
    }

    function unlock() {
      if (unlocked) {
        if (ctx && ctx.state === 'suspended' && on) ctx.resume().catch(() => {});
        return;
      }
      if (!ensureContext()) return;
      unlocked = true;
      start();
    }

    function start() {
      if (!ensureContext()) return;
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      on = true;
      scheduleLoop();
      paint();
    }

    function stop() {
      on = false;
      clearTimeout(loopTimer);
      if (ctx && ctx.state === 'running') ctx.suspend().catch(() => {});
      paint();
    }

    function toggle() {
      if (!unlocked) { unlock(); return; }
      on ? stop() : start();
    }

    function switchVibe() {
      vibe = vibe === 'party' ? 'chimes' : 'party';
      if (!unlocked) unlock();
      else if (on) scheduleLoop();
      paint();
    }

    if (vibeBtn) vibeBtn.addEventListener('click', switchVibe);
    if (toggleBtn) toggleBtn.addEventListener('click', toggle);

    document.addEventListener('visibilitychange', () => {
      if (!ctx) return;
      if (document.hidden && on) ctx.suspend().catch(() => {});
      else if (!document.hidden && on && ctx.state === 'suspended') ctx.resume().catch(() => {});
    });

    paint();
    return { unlock, toggle, fanfare };
  }

  /* ---------- Excited Voice Studio ("Happy Birthday, Arshi!") + Speed Modes ---------- */
  function initVoice(music, fx) {
    const hearBtn = $('#hearBtn');
    const pills = $$('.speed-pill');
        const PRESETS = {
      slow:   { rate: 0.82, pitch: 1.08, parts: ['Happy Birthday!', 'Arshi!'] },
      normal: { rate: 1.06, pitch: 1.18, parts: ['Happy Birthday!', 'Arshi!'] },
      fast:   { rate: 1.24, pitch: 1.32, parts: ['Yay! Happy Birthday!', 'Arshi!'] }
    };
    let mode = 'fast';
    let cachedVoices = [];

    function loadVoices() {
      try {
        if ('speechSynthesis' in window) cachedVoices = speechSynthesis.getVoices() || [];
      } catch (e) {}
    }
    loadVoices();
    if ('speechSynthesis' in window && 'onvoiceschanged' in speechSynthesis) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    function pickBestVoice() {
      if (!cachedVoices.length) loadVoices();
      const en = cachedVoices.filter(v => /^en/i.test(v.lang));
      return (
        en.find(v => /natural|aria|jenny|samantha|google uk english female|zira|victoria|karen/i.test(v.name)) ||
        en[0] ||
        cachedVoices[0] ||
        null
      );
    }

    function setSpeakingUI(active) {
      if (hearBtn) hearBtn.classList.toggle('is-speaking', active);
    }

    function speak(customMode) {
      if (customMode && PRESETS[customMode]) mode = customMode;
      const cfg = PRESETS[mode] || PRESETS.fast;
      if (music && music.fanfare) music.fanfare();
      if (fx && mode === 'fast') fx.rain(28);

      try {
        if (!('speechSynthesis' in window)) return false;
        speechSynthesis.cancel();
        const v = pickBestVoice();
        setSpeakingUI(true);

        cfg.parts.forEach((phrase, idx) => {
          const u = new SpeechSynthesisUtterance(phrase);
          if (v) u.voice = v;
                    const isName = idx === cfg.parts.length - 1;
          u.rate = isName ? Math.max(0.78, cfg.rate - 0.16) : cfg.rate;
          u.pitch = isName ? Math.min(1.85, cfg.pitch + 0.28) : cfg.pitch;
          u.volume = 1;
          if (idx === cfg.parts.length - 1) {
            u.onend = () => setSpeakingUI(false);
            u.onerror = () => setSpeakingUI(false);
          }
          speechSynthesis.speak(u);
        });
        return true;
      } catch (e) {
        setSpeakingUI(false);
        return false;
      }
    }

    function cancel() {
      setSpeakingUI(false);
      try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) {}
    }

    pills.forEach(p => {
      p.addEventListener('click', () => {
        const sp = p.dataset.speed || 'fast';
        mode = sp;
        pills.forEach(btn => {
          const active = btn === p;
          btn.classList.toggle('active', active);
          btn.setAttribute('aria-pressed', String(active));
        });
        speak(sp);
      });
    });

    if (hearBtn) hearBtn.addEventListener('click', () => speak());
    return { speak, cancel };
  }

  /* ---------- Reveal Title: Split into Pop Letters ---------- */
  function splitReveal(el) {
    if (!el || el.dataset.splitDone) return;
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.style.setProperty('--i', i);
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      el.appendChild(s);
    });
    el.dataset.splitDone = '1';
  }

    /* ---------- Cake Interaction (Blow candles -> Auto-Advance to Letter!) ---------- */
  function initCake(fx, music, onComplete) {
    const cake = $('#cake'), hint = $('#cakeHint');
    if (!cake) return { reset() {} };
    function reset() {
      cake.classList.remove('is-blown');
      cake.setAttribute('aria-pressed', 'false');
      if (hint) hint.textContent = 'tap the cake to blow the candles & make a wish 🕯️';
    }
    cake.addEventListener('click', () => {
      const blown = cake.classList.toggle('is-blown');
      cake.setAttribute('aria-pressed', String(blown));
      if (hint) hint.textContent = blown ? 'wish made! ✨ opening your letter…' : 'tap the cake to blow the candles & make a wish 🕯️';
      if (blown) {
        const r = cake.getBoundingClientRect();
        fx && fx.burstConfetti(r.left + r.width / 2, r.top + 20);
        music && music.fanfare();
        if (onComplete) onComplete();
      }
    });
    return { reset };
  }

  /* ---------- Surprise Gift (Unwrap -> Auto-Advance to Finale & Auto-Close!) ---------- */
  function initGift(fx, music, onComplete) {
    const gift = $('#gift'), msg = $('#surpriseMsg'), label = $('#giftLabel');
    if (!gift) return { close() {} };
    let closeTimer = null;

    function close() {
      clearTimeout(closeTimer);
      gift.classList.remove('is-open');
      gift.setAttribute('aria-expanded', 'false');
      if (label) label.textContent = 'Tap to unwrap your birthday wish ✨';
      if (msg) {
        msg.classList.remove('show');
        msg.hidden = true;
      }
    }

    gift.addEventListener('click', () => {
      clearTimeout(closeTimer);
      const open = gift.classList.toggle('is-open');
      gift.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? '💝 Your birthday wish is unlocked!' : 'Tap to unwrap your birthday wish ✨';
      if (msg) {
        if (open) {
          msg.hidden = false;
          requestAnimationFrame(() => msg.classList.add('show'));
        } else {
          msg.classList.remove('show');
          closeTimer = setTimeout(() => { if (!gift.classList.contains('is-open')) msg.hidden = true; }, 420);
        }
      }
      if (open) {
        const r = gift.getBoundingClientRect();
        fx && fx.burstHearts(r.left + r.width / 2, r.top + 40);
        music && music.fanfare();
        if (onComplete) onComplete();
      }
    });
    return { close };
  }

  /* ---------- Royal Tri-Fold Keepsake Letter (UNCHANGED Layout + Auto-Advance Hook) ---------- */
  function initLetter(fx, music, onComplete) {
    const body = $('#letterBody');
    const skipBtn = $('#skipTyping');
    const speedBtn = $('#speedTyping');
    const status = $('#letterStatus');
    const fill = $('#letterFill');
    if (!body) return null;

    const originals = $$('p', body).map(p => p.cloneNode(true));
    if (!originals.length) return null;

    const CHAPTERS = [
      { title: 'Part I · Your Heart',     from: 0,  to: 6  },
      { title: 'Part II · Your Strength',  from: 6,  to: 14 },
      { title: 'Part III · Your Becoming', from: 14, to: originals.length }
    ];

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    const BASE = 14, GAP = 140;
    const PAUSE = { '.': 115, '!': 125, '?': 125, '—': 110, ',': 65, ' ': 8 };
    let run = 0, active = false, fastMult = 1;

    const wait = (ms, id) => new Promise(res => setTimeout(() => res(id === run), Math.max(4, ms / fastMult)));
    const textNodes = (el) => {
      const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const a = []; for (let n = w.nextNode(); n; n = w.nextNode()) a.push(n);
      return a;
    };

    function buildSpread(markDone = false) {
      const pages = CHAPTERS.map((ch) => {
        const col = document.createElement('div');
        col.className = 'letter-page';
        col.setAttribute('data-chapter', ch.title);
        for (let i = ch.from; i < ch.to && i < originals.length; i++) {
          const clone = originals[i].cloneNode(true);
          clone.className = markDone ? 'p-done' : 'p-pending';
          col.appendChild(clone);
        }
        return col;
      });
      body.replaceChildren(...pages);
      return pages;
    }

    const setSkip = (v) => { if (skipBtn) { skipBtn.hidden = !v; skipBtn.disabled = !v; } };
    const setProgress = (done, total) => {
      const pct = Math.round((done / Math.max(total, 1)) * 100);
      if (fill) fill.style.width = pct + '%';
    };

    const finish = (celebrate = false) => {
      active = false;
      setSkip(false);
      cursor.remove();
      $$('.letter-page', body).forEach(pg => pg.classList.remove('page-active'));
      $$('p', body).forEach(p => { p.className = 'p-done'; });
      setProgress(originals.length, originals.length);
      if (status) status.textContent = 'Keepsake letter complete ✨';
      if (celebrate && fx) fx.rain(25);
      if (celebrate && onComplete) onComplete();
    };

    async function start() {
      const id = ++run;
      buildSpread(false);
      body.scrollTop = 0;
      active = true;
      setSkip(true);
      setProgress(0, originals.length);

      const paragraphs = $$('p', body);
      const pJobs = paragraphs.map((p, idx) => {
        const nodes = textNodes(p).map(node => ({ node, text: node.data }));
        nodes.forEach(n => { n.node.data = ''; });
        return { p, nodes, idx, page: p.closest('.letter-page') };
      });

      for (const pj of pJobs) {
        if (id !== run) return;
        $$('.letter-page', body).forEach(pg => pg.classList.toggle('page-active', pg === pj.page));
        pj.p.className = 'p-active';
        pj.p.appendChild(cursor);
        if (status) status.textContent = `Writing line ${pj.idx + 1} of ${pJobs.length}… ✍️`;

        if (innerWidth <= 900) {
          pj.p.scrollIntoView({ block: 'nearest', behavior: prefersReduced ? 'auto' : 'smooth' });
        }

        for (const item of pj.nodes) {
          for (const ch of item.text) {
            item.node.data += ch;
            if (!(await wait(PAUSE[ch] ?? BASE, id))) return;
          }
        }
        pj.p.className = 'p-done';
        setProgress(pj.idx + 1, pJobs.length);
        if (!(await wait(GAP, id))) return;
      }

      if (id === run) finish(true);
    }

    function skip() {
      if (!active) return;
      run++;
      buildSpread(true);
      if (music && music.fanfare) music.fanfare();
      finish(true);
    }

    function stop() {
      run++;
      active = false;
      setSkip(false);
      buildSpread(true);
      cursor.remove();
      setProgress(originals.length, originals.length);
    }

    if (skipBtn) skipBtn.addEventListener('click', skip);
    if (speedBtn) {
      speedBtn.addEventListener('click', () => {
        fastMult = fastMult === 1 ? 2.4 : 1;
        const isFast = fastMult > 1;
        speedBtn.classList.toggle('active', isFast);
        speedBtn.setAttribute('aria-pressed', String(isFast));
        speedBtn.textContent = isFast ? '⚡ 2× Active' : '⚡ 2× Speed';
      });
    }

    buildSpread(true);
    setSkip(false);
    return { start, skip, stop };
  }

  /* ---------- Slide Engine ---------- */
  function initSlides(hooks) {
    const app = $('#app');
    const slides = $$('.slide');
    const counter = $('#counter'), fill = $('#progressFill');
    const prev = $('#prevBtn'), dots = $$('.dot');
    let cur = 0, busy = false;

    function paint() {
      app.dataset.slide = cur;
      slides.forEach((s, i) => {
        s.classList.toggle('active', i === cur);
        try { s.inert = i !== cur; } catch (e) {}
        s.setAttribute('aria-hidden', i === cur ? 'false' : 'true');
      });
      if (counter) counter.textContent = (cur + 1) + ' / ' + slides.length;
      if (fill) fill.style.width = ((cur + 1) / slides.length * 100) + '%';
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === cur);
        d.setAttribute('aria-current', i === cur ? 'true' : 'false');
      });
      // Hide Back button on first slide so Welcome screen looks 100% clean
      if (prev) {
        prev.hidden = cur === 0;
        prev.disabled = cur === 0;
      }
    }
    function go(i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      if (i === cur || busy) return;
      busy = true;
      const dir = i > cur ? 1 : -1;
      app.dataset.dir = dir;
      if (hooks.exit) hooks.exit(cur);
      slides[cur].classList.remove('active');
      cur = i;
      const s = slides[cur];
      s.classList.add(dir === 1 ? 'enter-right' : 'enter-left');
      void s.offsetWidth;
      s.classList.add('active');
      paint();
      if (hooks.enter) hooks.enter(cur);
      setTimeout(() => { busy = false; s.classList.remove('enter-right', 'enter-left'); }, 620);
    }
    if (prev) prev.addEventListener('click', () => go(cur - 1));
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') go(cur + 1);
      else if (e.key === 'ArrowLeft') go(cur - 1);
      else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(slides.length - 1);
    });
    const stage = $('#slides');
    let tx = 0, ty = 0;
    if (stage) {
      stage.addEventListener('touchstart', (e) => {
        if (e.target.closest('.letter-body')) return;
        tx = e.touches[0].clientX; ty = e.touches[0].clientY;
      }, { passive: true });
      stage.addEventListener('touchend', (e) => {
        if (e.target.closest('.letter-body')) return;
        const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) go(cur + (dx < 0 ? 1 : -1));
      }, { passive: true });
    }
    paint();
    return { go, get current() { return cur; } };
  }

  /* ---------- Boot & Auto-Flow Orchestrator ---------- */
  const fx       = safe('fx', createEffects) || { rain() {}, burstConfetti() {}, burstHearts() {} };
  safe('stars', () => createStars($('#stars')));
  const music    = safe('music', createMusic) || { unlock() {}, toggle() {}, fanfare() {} };
  const voice    = safe('voice', () => initVoice(music, fx)) || { speak() {}, cancel() {} };
  const autoHint = $('#autoHint');

  let nav = null;
  let autoTimer = null;

  function clearAuto() {
    clearTimeout(autoTimer);
    autoTimer = null;
    if (autoHint) {
      autoHint.classList.remove('show');
      autoHint.textContent = '';
    }
  }

  function scheduleAuto(slideIndex, delayMs, label) {
    clearAuto();
    if (autoHint && label) {
      autoHint.textContent = label;
      autoHint.classList.add('show');
    }
    autoTimer = setTimeout(() => {
      clearAuto();
      if (nav && nav.current === slideIndex) {
        nav.go(slideIndex + 1);
      }
    }, delayMs);
  }

  // 1) Cake blown -> wait 2.2s for confetti & wish, then open Letter automatically
  const cake = safe('cake', () => initCake(fx, music, () => {
    scheduleAuto(1, 2200, '✨ Opening your birthday letter…');
  })) || { reset() {} };

  // 2) Letter finished typing (or skipped) -> wait 3.2s to admire, then open Surprise Gift automatically
  const letter = safe('letter', () => initLetter(fx, music, () => {
    scheduleAuto(2, 3200, '🎁 Preparing your surprise gift…');
  }));

  // 3) Gift unwrapped -> wait 4.8s to read wish, then open Finale automatically
  const gift = safe('gift', () => initGift(fx, music, () => {
    scheduleAuto(3, 4800, '🎂 Heading to the grand finale…');
  })) || { close() {} };

  const hooks = {
    enter(i) {
      clearAuto();
      if (i === 0) fx.rain(40);
      if (i === 1) {
        splitReveal($('#revealTitle'));
        fx.rain(38);
        voice.speak();
      }
      if (i === 2 && letter) letter.start();
      if (i === 4) {
        fx.rain(80);
        music.fanfare();
      }
    },
    exit(i) {
      clearAuto();
      if (i === 1) voice.cancel();
      if (i === 2 && letter) letter.stop();
      if (i === 3) gift.close();
    }
  };
  nav = safe('slides', () => initSlides(hooks));

  const enterBtn = $('#enterBtn');
  if (enterBtn) enterBtn.addEventListener('click', () => {
    music.unlock();
    music.fanfare();
    nav && nav.go(1);
  });
  const replayBtn = $('#replayBtn');
  if (replayBtn) replayBtn.addEventListener('click', () => {
    clearAuto();
    music.unlock();
    cake.reset();
    gift.close();
    nav && nav.go(0);
  });

  const unlockOnce = () => music.unlock();
  document.addEventListener('pointerdown', unlockOnce, { once: true });
  document.addEventListener('keydown', unlockOnce, { once: true });
})();