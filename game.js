// ===== Tamagotchi - Classic Pixel Style =====

// --- Pixel Art Sprites (Chick / 小雞) ---
// 16x16 grid, color codes:
// 0=transparent, 1=dark(outline/eyes), 2=mid(shadow), 3=body(yellow), 4=beak(orange), 5=crest(red), 6=feet(orange)
const SPRITES = {
  normal: [
    '0000000500000000',
    '0000005550000000',
    '0000005500000000',
    '0000013331000000',
    '0001333333310000',
    '0013333333331000',
    '0013133313331000',
    '0013133313331000',
    '0013333333331000',
    '0013333443331000',
    '0013333333331000',
    '0001333333310000',
    '0000133333100000',
    '0000016061000000',
    '0000016061000000',
    '0000066066000000',
  ],
  happy: [
    '0000000500000000',
    '0000005550000000',
    '0000005500000000',
    '0000013331000000',
    '0001333333310000',
    '0013333333331000',
    '0013133313331000',
    '0013133313331000',
    '0013333333331000',
    '0013311441133100',
    '0013333333331000',
    '0001333333310000',
    '0000133333100000',
    '0000016061000000',
    '0000016061000000',
    '0000066066000000',
  ],
  eating: [
    '0000000500000000',
    '0000005550000000',
    '0000005500000000',
    '0000013331000000',
    '0001333333310000',
    '0013333333331000',
    '0013133313331000',
    '0013133313331000',
    '0013333333331000',
    '0013333443331000',
    '0013333344431000',
    '0001333334410000',
    '0000133333100000',
    '0000016061000000',
    '0000016061000000',
    '0000066066000000',
  ],
  eating2: [
    '0000000500000000',
    '0000005550000000',
    '0000005500000000',
    '0000013331000000',
    '0001333333310000',
    '0013333333331000',
    '0013133313331000',
    '0013133313331000',
    '0013333333331000',
    '0013333443331000',
    '0013333344331000',
    '0001333333310000',
    '0000133333100000',
    '0000016061000000',
    '0000016061000000',
    '0000066066000000',
  ],
  sleeping: [
    '0000000500000000',
    '0000005550000000',
    '0000005500000000',
    '0000013331000000',
    '0001333333310000',
    '0013333333331000',
    '0013333333331000',
    '0013311331131000',
    '0013333333331000',
    '0013333443331000',
    '0013333333331000',
    '0001333333310000',
    '0000133333100000',
    '0000013331000000',
    '0000013331000000',
    '0000011111000000',
  ],
  sad: [
    '0000000500000000',
    '0000005550000000',
    '0000005500000000',
    '0000013331000000',
    '0001333333310000',
    '0013333333331000',
    '0013133313331000',
    '0013133313331000',
    '0013333333331000',
    '0013311441133100',
    '0013331111331000',
    '0001333333310000',
    '0000133333100000',
    '0000016061000000',
    '0000016061000000',
    '0000066066000000',
  ],
  sick: [
    '0000000500000000',
    '0000005550000000',
    '0000005500000000',
    '0000012221000000',
    '0001222222210000',
    '0012222222221000',
    '0012122212221000',
    '0012122212221000',
    '0012222222221000',
    '0012222442221000',
    '0012222222221000',
    '0001222222210000',
    '0000122222100000',
    '0000016061000000',
    '0000016061000000',
    '0000066066000000',
  ],
  dead: [
    '0000000000000000',
    '0000000200000000',
    '0000000200000000',
    '0000012221000000',
    '0001222222210000',
    '0012222222221000',
    '0012121212121000',
    '0012212121221000',
    '0012121212121000',
    '0012222222221000',
    '0012222112221000',
    '0001222222210000',
    '0000122222100000',
    '0000012221000000',
    '0000012221000000',
    '0000011111000000',
  ],
  playing: [
    '0000000500000000',
    '0000005550000000',
    '0000005500000000',
    '0000013331000000',
    '0001333333310000',
    '0013333333331000',
    '0013133313331000',
    '0013133313331000',
    '1013333333331000',
    '1113311441133100',
    '1013333333331000',
    '0001333333310000',
    '0000133333100000',
    '0000016061000000',
    '0000066000660000',
    '0000000000000000',
  ],
  playing2: [
    '0000000000000000',
    '0000000500000000',
    '0000005550000000',
    '0000005500000000',
    '0000013331000000',
    '0013333333310000',
    '0013333333331000',
    '0013133313331000',
    '0013133313331010',
    '0013333333331110',
    '0013311441133010',
    '0013333333331000',
    '0001333333310000',
    '0000016061000000',
    '0000660000660000',
    '0000000000000000',
  ],
};

const ZZZ_SPRITES = [
  [
    '00000',
    '01110',
    '00010',
    '00100',
    '01000',
    '01110',
    '00000',
  ],
  [
    '01110',
    '00010',
    '00100',
    '01000',
    '01110',
    '00000',
    '00000',
  ],
];

const COLORS = {
  '0': 'transparent',
  '1': '#405020',  // dark outline / eyes
  '2': '#6a7a3a',  // mid (sick body)
  '3': '#a0b848',  // body (yellow-green on LCD)
  '4': '#405020',  // beak (dark on LCD)
  '5': '#405020',  // crest (dark on LCD)
  '6': '#6a7a3a',  // feet (mid tone)
};

// --- State ---
const state = {
  name: '小圓子',
  happiness: 80,
  hunger: 80,
  energy: 80,
  cleanliness: 80,
  age: 0,
  alive: true,
  sick: false,
  sleeping: false,
  playing: false,
  eating: false,
  sickTimer: null,
  lastUpdate: Date.now(),
  animFrame: 0,
  menuOpen: false,
  menuIndex: 0,
};

// --- DOM refs ---
const canvas = document.getElementById('pet-canvas');
const ctx = canvas.getContext('2d');
const floatEmoji = document.getElementById('float-emoji');
const messageEl = document.getElementById('message');
const petNameEl = document.getElementById('pet-name');
const petAgeEl = document.getElementById('pet-age');
const actionMenu = document.getElementById('action-menu');
const btnA = document.getElementById('btn-a');
const btnB = document.getElementById('btn-b');
const btnC = document.getElementById('btn-c');

const bars = {
  happiness: document.getElementById('happiness-bar'),
  hunger: document.getElementById('hunger-bar'),
  energy: document.getElementById('energy-bar'),
  cleanliness: document.getElementById('clean-bar'),
};

const PIXEL = 10;

const ACTIONS = ['feed', 'play', 'sleep', 'clean', 'heal'];

// --- Init ---
function init() {
  loadState();
  renderStats();
  drawPet();
  createStars();
  petNameEl.textContent = state.name;

  // Animation loop
  setInterval(() => {
    state.animFrame = 1 - state.animFrame;
    drawPet();
  }, 500);

  setInterval(decayStats, 5000);

  setInterval(() => {
    if (!state.alive) return;
    state.age++;
    petAgeEl.textContent = `DAY ${state.age}`;
    saveState();
  }, 60000);

  setInterval(saveState, 10000);

  // Button handlers (classic 3-button interface)
  btnA.addEventListener('click', onBtnA);
  btnB.addEventListener('click', onBtnB);
  btnC.addEventListener('click', onBtnC);

  // Menu item clicks
  document.querySelectorAll('.menu-item').forEach((item, i) => {
    item.addEventListener('click', () => {
      executeAction(ACTIONS[i]);
      closeMenu();
    });
  });

  // Click on pet canvas
  canvas.addEventListener('click', onPetClick);

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') onBtnA();
    if (e.key === 's' || e.key === 'S' || e.key === 'Enter' || e.key === 'ArrowDown') onBtnB();
    if (e.key === 'd' || e.key === 'D' || e.key === 'Escape' || e.key === 'ArrowRight') onBtnC();
  });
}

// --- 3-Button Interface ---
function onBtnA() {
  if (!state.alive) return;
  if (state.menuOpen) {
    // Navigate up in menu
    state.menuIndex = (state.menuIndex - 1 + ACTIONS.length) % ACTIONS.length;
    updateMenuSelection();
  } else {
    openMenu();
  }
}

function onBtnB() {
  if (!state.alive) return;
  if (state.menuOpen) {
    executeAction(ACTIONS[state.menuIndex]);
    closeMenu();
  } else {
    openMenu();
  }
}

function onBtnC() {
  if (state.menuOpen) {
    if (state.menuOpen) {
      // Navigate down OR close
      state.menuIndex++;
      if (state.menuIndex >= ACTIONS.length) {
        closeMenu();
      } else {
        updateMenuSelection();
      }
    }
  }
}

function openMenu() {
  state.menuOpen = true;
  state.menuIndex = 0;
  actionMenu.classList.add('show');
  updateMenuSelection();
}

function closeMenu() {
  state.menuOpen = false;
  actionMenu.classList.remove('show');
}

function updateMenuSelection() {
  document.querySelectorAll('.menu-item').forEach((item, i) => {
    item.classList.toggle('selected', i === state.menuIndex);
  });
}

function executeAction(action) {
  switch (action) {
    case 'feed': feedPet(); break;
    case 'play': playWithPet(); break;
    case 'sleep': putToSleep(); break;
    case 'clean': cleanPet(); break;
    case 'heal': healPet(); break;
  }
}

// --- Stars ---
function createStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 40; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.floor(Math.random() * 100) + '%';
    star.style.top = Math.floor(Math.random() * 100) + '%';
    star.style.setProperty('--duration', (1 + Math.floor(Math.random() * 3)) + 's');
    star.style.setProperty('--max-opacity', (0.5 + Math.random() * 0.5).toString());
    star.style.animationDelay = Math.floor(Math.random() * 3) + 's';
    container.appendChild(star);
  }
}

// --- Draw Pet ---
function drawPet() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let spriteName = 'normal';
  let offsetY = 0;

  if (!state.alive) {
    spriteName = 'dead';
  } else if (state.sick) {
    spriteName = 'sick';
    offsetY = state.animFrame ? -2 : 2;
  } else if (state.sleeping) {
    spriteName = 'sleeping';
    offsetY = state.animFrame ? -2 : 0;
  } else if (state.playing) {
    spriteName = state.animFrame ? 'playing2' : 'playing';
  } else if (state.eating) {
    spriteName = state.animFrame ? 'eating2' : 'eating';
  } else if (state.happiness >= 60) {
    spriteName = 'happy';
    offsetY = state.animFrame ? -4 : 0;
  } else if (state.happiness >= 30) {
    spriteName = 'normal';
    offsetY = state.animFrame ? -2 : 0;
  } else {
    spriteName = 'sad';
  }

  const sprite = SPRITES[spriteName];
  if (!sprite) return;

  for (let y = 0; y < sprite.length; y++) {
    for (let x = 0; x < sprite[y].length; x++) {
      const c = sprite[y][x];
      if (c === '0') continue;
      ctx.fillStyle = COLORS[c];
      ctx.fillRect(x * PIXEL, (y * PIXEL) + offsetY, PIXEL, PIXEL);
    }
  }

  // Zzz
  if (state.sleeping && state.alive) {
    const zzzSprite = ZZZ_SPRITES[state.animFrame];
    const zx = 130, zy = state.animFrame ? 0 : 10;
    for (let y = 0; y < zzzSprite.length; y++) {
      for (let x = 0; x < zzzSprite[y].length; x++) {
        if (zzzSprite[y][x] === '1') {
          ctx.fillStyle = '#405020';
          ctx.fillRect(zx + x * 5, zy + y * 5, 5, 5);
        }
      }
    }
  }

  // Sweat when sick
  if (state.sick && state.alive) {
    const dx = 132, dy = 20 + (state.animFrame ? 10 : 0);
    ctx.fillStyle = '#405020';
    ctx.fillRect(dx, dy, 5, 5);
    ctx.fillRect(dx - 5, dy + 5, 5, 5);
    ctx.fillRect(dx, dy + 5, 5, 5);
    ctx.fillRect(dx + 5, dy + 5, 5, 5);
    ctx.fillRect(dx, dy + 10, 5, 5);
  }

  // Sparkles when playing
  if (state.playing && state.alive) {
    const pts = state.animFrame
      ? [[5, 10], [140, 25], [25, 140]]
      : [[15, 25], [130, 10], [10, 130]];
    ctx.fillStyle = '#405020';
    pts.forEach(([sx, sy]) => {
      ctx.fillRect(sx + 2, sy, 2, 6);
      ctx.fillRect(sx, sy + 2, 6, 2);
    });
  }

  // Dead flicker
  if (!state.alive && state.animFrame) {
    ctx.fillStyle = 'rgba(200, 220, 120, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

// --- Stat Decay ---
function decayStats() {
  if (!state.alive) return;
  if (state.sleeping) {
    state.energy = clamp(state.energy + 2);
    state.hunger = clamp(state.hunger - 0.5);
    state.happiness = clamp(state.happiness - 0.3);
    state.cleanliness = clamp(state.cleanliness - 0.3);
  } else {
    state.happiness = clamp(state.happiness - 1);
    state.hunger = clamp(state.hunger - 1.2);
    state.energy = clamp(state.energy - 0.8);
    state.cleanliness = clamp(state.cleanliness - 0.6);
  }
  checkSick();
  renderStats();
}

// --- Sickness & Death ---
function checkSick() {
  if (!state.alive) return;
  const anyZero = state.happiness <= 0 || state.hunger <= 0 ||
                  state.energy <= 0 || state.cleanliness <= 0;
  if (anyZero && !state.sick) {
    state.sick = true;
    state.sleeping = false;
    state.playing = false;
    showMessage('嗚嗚...不舒服...');
    state.sickTimer = setTimeout(() => {
      if (state.sick && state.alive) die();
    }, 30000);
  }
}

function die() {
  state.alive = false;
  state.sick = false;
  state.sleeping = false;
  state.playing = false;
  clearTimeout(state.sickTimer);
  renderStats();
  showMessage('再見了...');
  disableButtons(true);
  saveState();
}

// --- Actions ---
function feedPet() {
  if (!state.alive || state.sleeping || state.eating) return;
  state.eating = true;
  state.hunger = clamp(state.hunger + 25);
  state.happiness = clamp(state.happiness + 5);
  state.cleanliness = clamp(state.cleanliness - 3);
  showFloatEmoji('🍙');
  showMessage('好好吃！');
  renderStats();
  setTimeout(() => { state.eating = false; }, 2000);
  saveState();
}

function playWithPet() {
  if (!state.alive || state.sleeping || state.playing || state.sick) return;
  if (state.energy < 10) { showMessage('太累了...'); return; }
  state.playing = true;
  state.happiness = clamp(state.happiness + 20);
  state.energy = clamp(state.energy - 15);
  state.hunger = clamp(state.hunger - 5);
  state.cleanliness = clamp(state.cleanliness - 5);
  showFloatEmoji('⭐');
  showMessage('好開心！');
  renderStats();
  setTimeout(() => { state.playing = false; }, 3000);
  saveState();
}

function putToSleep() {
  if (!state.alive || state.sick) return;
  if (state.sleeping) {
    state.sleeping = false;
    showMessage('早安！');
    showFloatEmoji('☀️');
  } else {
    state.sleeping = true;
    state.playing = false;
    showMessage('晚安 Zzz');
    showFloatEmoji('🌙');
  }
  saveState();
}

function cleanPet() {
  if (!state.alive || state.sleeping) return;
  state.cleanliness = clamp(state.cleanliness + 25);
  state.happiness = clamp(state.happiness + 5);
  showFloatEmoji('✨');
  showMessage('好乾淨！');
  renderStats();
  saveState();
}

function healPet() {
  if (!state.alive || !state.sick) {
    if (state.alive && !state.sick) showMessage('很健康唷！');
    return;
  }
  clearTimeout(state.sickTimer);
  state.sick = false;
  state.happiness = clamp(state.happiness + 15);
  state.hunger = clamp(state.hunger + 15);
  state.energy = clamp(state.energy + 15);
  state.cleanliness = clamp(state.cleanliness + 15);
  showFloatEmoji('💊');
  showMessage('好多了！');
  renderStats();
  saveState();
}

// --- Pet click ---
function onPetClick() {
  if (!state.alive) return;
  if (state.sleeping || state.playing || state.eating || state.sick) return;
  state.happiness = clamp(state.happiness + 3);
  renderStats();
  const reactions = ['💕', '❤️', '⭐', '💖', '🌟'];
  showFloatEmoji(reactions[Math.floor(Math.random() * reactions.length)]);
  const msgs = ['摸摸～', '嘿嘿', '喜歡你！', '開心！', '再摸～'];
  showMessage(msgs[Math.floor(Math.random() * msgs.length)]);
  saveState();
}

// --- Rendering ---
function renderStats() {
  ['happiness', 'hunger', 'energy', 'cleanliness'].forEach(s => {
    const val = Math.max(0, Math.round(state[s]));
    const stepped = Math.round(val / 5) * 5;
    bars[s].style.width = stepped + '%';
    bars[s].classList.toggle('low', val <= 20);
  });
  petAgeEl.textContent = `DAY ${state.age}`;
}

// --- Float Emoji ---
function showFloatEmoji(emoji) {
  floatEmoji.textContent = emoji;
  floatEmoji.classList.remove('show');
  void floatEmoji.offsetWidth;
  floatEmoji.classList.add('show');
  setTimeout(() => floatEmoji.classList.remove('show'), 1500);
}

// --- Message ---
let messageTimeout = null;
function showMessage(text) {
  messageEl.textContent = text;
  messageEl.classList.add('show');
  clearTimeout(messageTimeout);
  messageTimeout = setTimeout(() => messageEl.classList.remove('show'), 3000);
}

// --- Buttons ---
function disableButtons(disabled) {
  [btnA, btnB, btnC].forEach(b => b.disabled = disabled);
}

// --- Utility ---
function clamp(val) {
  return Math.min(100, Math.max(0, val));
}

// --- Save / Load ---
function saveState() {
  localStorage.setItem('tamagotchi_save', JSON.stringify({
    name: state.name,
    happiness: state.happiness,
    hunger: state.hunger,
    energy: state.energy,
    cleanliness: state.cleanliness,
    age: state.age,
    alive: state.alive,
    sick: state.sick,
    sleeping: state.sleeping,
    lastUpdate: Date.now(),
  }));
}

function loadState() {
  const saved = localStorage.getItem('tamagotchi_save');
  if (!saved) return;
  try {
    const data = JSON.parse(saved);
    Object.assign(state, data);
    const now = Date.now();
    const elapsed = (now - (data.lastUpdate || now)) / 1000;
    const ticks = Math.min(Math.floor(elapsed / 5), 100);
    if (state.alive && ticks > 0) {
      state.happiness = clamp(state.happiness - ticks * 0.8);
      state.hunger = clamp(state.hunger - ticks);
      state.energy = clamp(state.energy - ticks * 0.6);
      state.cleanliness = clamp(state.cleanliness - ticks * 0.5);
      state.age += Math.floor(elapsed / 60);
      checkSick();
    }
    state.lastUpdate = now;
    state.playing = false;
    state.eating = false;
    if (!state.alive) disableButtons(true);
    if (state.sick) {
      state.sickTimer = setTimeout(() => {
        if (state.sick && state.alive) die();
      }, 30000);
    }
  } catch (e) {
    console.warn('Load failed:', e);
  }
}

// --- Start ---
init();
