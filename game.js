// ===== Q版電子雞 Tamagotchi - Game Logic =====

// --- State ---
const state = {
  name: '小圓子',
  happiness: 80,
  hunger: 80,
  energy: 80,
  cleanliness: 80,
  age: 0,        // in "days"
  alive: true,
  sick: false,
  sleeping: false,
  playing: false,
  eating: false,
  sickTimer: null,
  lastUpdate: Date.now(),
};

// --- DOM refs ---
const pet = document.getElementById('pet');
const mouth = document.getElementById('mouth');
const floatEmoji = document.getElementById('float-emoji');
const messageEl = document.getElementById('message');
const petNameEl = document.getElementById('pet-name');
const petAgeEl = document.getElementById('pet-age');

const bars = {
  happiness: document.getElementById('happiness-bar'),
  hunger: document.getElementById('hunger-bar'),
  energy: document.getElementById('energy-bar'),
  cleanliness: document.getElementById('clean-bar'),
};

// --- Init ---
function init() {
  loadState();
  renderStats();
  renderPetState();
  createStars();
  petNameEl.textContent = state.name;

  // Main game loop: decay stats every 5 seconds
  setInterval(decayStats, 5000);

  // Age up every 60 seconds
  setInterval(() => {
    if (!state.alive) return;
    state.age++;
    petAgeEl.textContent = `${state.age} 天`;
    saveState();
  }, 60000);

  // Auto-save every 10 seconds
  setInterval(saveState, 10000);

  // Click on pet for a reaction
  pet.addEventListener('click', onPetClick);
}

// --- Stars Background ---
function createStars() {
  const container = document.getElementById('stars');
  const count = 60;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.setProperty('--duration', (2 + Math.random() * 4) + 's');
    star.style.setProperty('--max-opacity', (0.4 + Math.random() * 0.6).toString());
    star.style.animationDelay = Math.random() * 4 + 's';
    container.appendChild(star);
  }
}

// --- Stat Decay ---
function decayStats() {
  if (!state.alive) return;
  if (state.sleeping) {
    // While sleeping, energy recovers, others decay slower
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
  renderPetState();
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
    showMessage('嗚嗚...我不舒服 😢');
    // Start death countdown
    state.sickTimer = setTimeout(() => {
      if (state.sick && state.alive) {
        die();
      }
    }, 30000);
  }
}

function die() {
  state.alive = false;
  state.sick = false;
  state.sleeping = false;
  state.playing = false;
  clearTimeout(state.sickTimer);
  renderPetState();
  renderStats();
  showMessage('小圓子離開了... 再見 💔');
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
  showMessage('好好吃！謝謝～ 😋');
  renderStats();

  // Eating animation
  pet.classList.remove('playing');
  mouth.className = 'mouth eating';

  setTimeout(() => {
    state.eating = false;
    renderPetState();
  }, 2000);

  saveState();
}

function playWithPet() {
  if (!state.alive || state.sleeping || state.playing || state.sick) return;
  if (state.energy < 10) {
    showMessage('太累了...先讓我休息一下 😴');
    return;
  }

  state.playing = true;
  state.happiness = clamp(state.happiness + 20);
  state.energy = clamp(state.energy - 15);
  state.hunger = clamp(state.hunger - 5);
  state.cleanliness = clamp(state.cleanliness - 5);

  showFloatEmoji('🎾');
  showMessage('好開心！再來再來！ 🥳');
  renderStats();

  pet.classList.add('playing');
  mouth.className = 'mouth happy';

  setTimeout(() => {
    state.playing = false;
    pet.classList.remove('playing');
    renderPetState();
  }, 3000);

  saveState();
}

function putToSleep() {
  if (!state.alive || state.sick) return;

  if (state.sleeping) {
    // Wake up
    state.sleeping = false;
    removeZzz();
    showMessage('早安！睡得好飽～ ☀️');
    showFloatEmoji('☀️');
  } else {
    // Go to sleep
    state.sleeping = true;
    state.playing = false;
    pet.classList.remove('playing');
    showMessage('晚安...Zzz 🌙');
    showFloatEmoji('🌙');
    addZzz();
  }

  renderPetState();
  saveState();
}

function cleanPet() {
  if (!state.alive || state.sleeping) return;

  state.cleanliness = clamp(state.cleanliness + 25);
  state.happiness = clamp(state.happiness + 5);

  showFloatEmoji('✨');
  showMessage('洗得好乾淨！亮晶晶～ ✨');
  renderStats();
  renderPetState();
  saveState();
}

function healPet() {
  if (!state.alive || !state.sick) {
    if (state.alive && !state.sick) {
      showMessage('我很健康唷！不需要吃藥 😊');
    }
    return;
  }

  clearTimeout(state.sickTimer);
  state.sick = false;
  state.happiness = clamp(state.happiness + 15);
  state.hunger = clamp(state.hunger + 15);
  state.energy = clamp(state.energy + 15);
  state.cleanliness = clamp(state.cleanliness + 15);

  showFloatEmoji('💊');
  showMessage('吃了藥好多了！謝謝你 💕');
  renderStats();
  renderPetState();
  saveState();
}

// --- Pet click ---
function onPetClick() {
  if (!state.alive) return;
  if (state.sleeping || state.playing || state.eating || state.sick) return;

  state.happiness = clamp(state.happiness + 3);
  renderStats();

  const reactions = ['💕', '🥰', '😆', '💖', '🌟'];
  showFloatEmoji(reactions[Math.floor(Math.random() * reactions.length)]);

  const messages = ['摸摸好舒服～', '嘿嘿 😊', '最喜歡你了！', '好開心！', '再摸摸～'];
  showMessage(messages[Math.floor(Math.random() * messages.length)]);

  saveState();
}

// --- Rendering ---
function renderStats() {
  const stats = ['happiness', 'hunger', 'energy', 'cleanliness'];
  stats.forEach(s => {
    const val = Math.max(0, Math.round(state[s]));
    bars[s].style.width = val + '%';

    // Color shift when low
    if (val <= 20) {
      bars[s].style.background = 'linear-gradient(90deg, #ff4757, #ff6b81)';
    } else if (val <= 50) {
      bars[s].style.background = 'linear-gradient(90deg, #ffa502, #ff7f50)';
    } else {
      // Reset to default
      bars[s].style.background = '';
    }
  });

  petAgeEl.textContent = `${state.age} 天`;
}

function renderPetState() {
  // Clear all state classes
  pet.className = 'pet';
  removeZzz();

  if (!state.alive) {
    pet.classList.add('dead');
    mouth.className = 'mouth sick';
    disableButtons(true);
    return;
  }

  if (state.sick) {
    pet.classList.add('sick');
    mouth.className = 'mouth sick';
    return;
  }

  if (state.sleeping) {
    pet.classList.add('sleeping');
    mouth.className = 'mouth sleeping';
    addZzz();
    return;
  }

  if (state.playing) {
    pet.classList.add('playing');
    mouth.className = 'mouth happy';
    return;
  }

  if (state.eating) {
    mouth.className = 'mouth eating';
    return;
  }

  // Default - mood based on happiness
  if (state.happiness >= 60) {
    mouth.className = 'mouth happy';
  } else if (state.happiness >= 30) {
    mouth.className = 'mouth';
  } else {
    mouth.className = 'mouth sad';
  }
}

// --- Zzz ---
function addZzz() {
  removeZzz();
  const zzz = document.createElement('div');
  zzz.className = 'zzz';
  zzz.id = 'zzz-element';
  zzz.textContent = '💤';
  pet.appendChild(zzz);
}

function removeZzz() {
  const existing = document.getElementById('zzz-element');
  if (existing) existing.remove();
}

// --- Float Emoji ---
function showFloatEmoji(emoji) {
  floatEmoji.textContent = emoji;
  floatEmoji.classList.remove('show');
  // Force reflow
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
  messageTimeout = setTimeout(() => {
    messageEl.classList.remove('show');
  }, 3000);
}

// --- Buttons ---
function disableButtons(disabled) {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.disabled = disabled;
  });
}

// --- Utility ---
function clamp(val) {
  return Math.min(100, Math.max(0, val));
}

// --- Save / Load ---
function saveState() {
  const data = {
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
  };
  localStorage.setItem('tamagotchi_save', JSON.stringify(data));
}

function loadState() {
  const saved = localStorage.getItem('tamagotchi_save');
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    Object.assign(state, data);

    // Calculate time-based decay while away
    const now = Date.now();
    const elapsedSec = (now - (data.lastUpdate || now)) / 1000;
    const decayTicks = Math.floor(elapsedSec / 5);

    if (state.alive && decayTicks > 0) {
      const decay = Math.min(decayTicks, 100); // Cap offline decay
      state.happiness = clamp(state.happiness - decay * 0.8);
      state.hunger = clamp(state.hunger - decay * 1);
      state.energy = clamp(state.energy - decay * 0.6);
      state.cleanliness = clamp(state.cleanliness - decay * 0.5);

      // Age up
      const ageGain = Math.floor(elapsedSec / 60);
      state.age += ageGain;

      checkSick();
    }

    state.lastUpdate = now;
    state.playing = false;
    state.eating = false;

    if (!state.alive) {
      disableButtons(true);
    }

    if (state.sick) {
      // Restart sick timer
      state.sickTimer = setTimeout(() => {
        if (state.sick && state.alive) die();
      }, 30000);
    }
  } catch (e) {
    console.warn('Failed to load save data:', e);
  }
}

// --- Start ---
init();
