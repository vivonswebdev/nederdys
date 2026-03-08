const ctx = () => {
  if (!(window as any).__audioCtx) {
    (window as any).__audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return (window as any).__audioCtx as AudioContext;
};

const play = (freq: number, type: OscillatorType, duration: number, volume = 0.3) => {
  try {
    const c = ctx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, c.currentTime);
    g.gain.setValueAtTime(volume, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    o.connect(g).connect(c.destination);
    o.start();
    o.stop(c.currentTime + duration);
  } catch {}
};

export const sounds = {
  correct: () => {
    play(523, "sine", 0.15, 0.25);
    setTimeout(() => play(659, "sine", 0.15, 0.25), 100);
    setTimeout(() => play(784, "sine", 0.25, 0.25), 200);
  },
  wrong: () => {
    play(200, "square", 0.3, 0.15);
    setTimeout(() => play(150, "square", 0.3, 0.15), 150);
  },
  flip: () => play(800, "sine", 0.08, 0.15),
  click: () => play(600, "sine", 0.06, 0.1),
  match: () => {
    play(440, "sine", 0.1, 0.2);
    setTimeout(() => play(554, "sine", 0.1, 0.2), 80);
    setTimeout(() => play(659, "sine", 0.2, 0.2), 160);
  },
  victory: () => {
    const notes = [523, 587, 659, 698, 784, 880, 988, 1047];
    notes.forEach((f, i) => setTimeout(() => play(f, "sine", 0.2, 0.2), i * 80));
  },
  levelUp: () => {
    [523, 659, 784, 1047].forEach((f, i) =>
      setTimeout(() => play(f, "triangle", 0.3, 0.25), i * 120)
    );
  },
  xp: () => {
    play(880, "sine", 0.1, 0.15);
    setTimeout(() => play(1100, "sine", 0.15, 0.15), 80);
  },
};
