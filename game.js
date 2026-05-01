// ===== Tamagotchi - Classic Mechanics =====

// --- Sprites (16x16) ---
// 0=transparent,1=dark,2=mid/sick,3=body
const SPRITES = {
  babytchi:[
    '0000000000000000','0000000000000000','0000000000000000','0000000000000000',
    '0000001110000000','0000013331000000','0000013131000000','0000013131000000',
    '0000013331000000','0000013331000000','0000001110000000','0000000000000000',
    '0000000000000000','0000000000000000','0000000000000000','0000000000000000'],
  marutchi:[
    '0000000000000000','0000011110000000','0000133331000000','0001333333100000',
    '0001333333100000','0001313313100000','0001313313100000','0001333333100000',
    '0001333133100000','0001333333100000','0000133331000000','0000011110000000',
    '0000013031000000','0000013031000000','0000011011000000','0000000000000000'],
  tamatchi:[
    '0000000000000000','0000011110000000','0000133331000000','0001333333100000',
    '0013333333310000','0013133313310000','0013133313310000','0013333333310000',
    '0013333133310000','0013333333310000','0001333333100000','0000133331000000',
    '0000013310000000','0000013031000000','0000011011000000','0000000000000000'],
  kuchitamatchi:[
    '0000000000000000','0000011110000000','0000133331000000','0001333333100000',
    '0013333333310000','0013133313310000','0013133313310000','0013333333310000',
    '0013333333110000','0013333331111000','0001333333100000','0000133331000000',
    '0000013310000000','0000013031000000','0000011011000000','0000000000000000'],
  mametchi:[
    '0000000000000000','0011000001100000','0131000001310000','0131111111310000',
    '0013333333100000','0013333333100000','0133133313310000','0133133313310000',
    '0133333333310000','0133333133310000','0133333333310000','0013333333100000',
    '0001333310000000','0000131310000000','0000131310000000','0000110110000000'],
  ginjirotchi:[
    '0000000000000000','0000000000000000','0001111111000000','0013333333100000',
    '0133333333310000','0133333333310000','0133133313310000','0133133313310000',
    '0133333333310000','0133333133310000','0133333333310000','0013333333100000',
    '0001333310000000','0000131310000000','0000131310000000','0000110110000000'],
  maskutchi:[
    '0000000000000000','0000011110000000','0000133331000000','0001333333100000',
    '0013333333310000','1111111111111100','0131313131310000','1111111111111100',
    '0013333333310000','0013333133310000','0013333333310000','0001333333100000',
    '0000133310000000','0000013031000000','0000013031000000','0000011011000000'],
  kuchipatchi:[
    '0000000000000000','0000011110000000','0001333331000000','0013333333100000',
    '0013333333310000','0013313331310000','0013313331310000','0013333333310000',
    '0013311113310000','0013311113310000','0013333333310000','0001333333100000',
    '0000133331000000','0000013031000000','0000013031000000','0000011011000000'],
  nyorotchi:[
    '0000000000000000','0000000000000000','0000000000000000','0001110000000000',
    '0013310000000000','0013131000000000','0013131000000000','0013310000000000',
    '0013333100000000','0001333310000000','0000133331000000','0000013333100000',
    '0000001333310000','0000000133331000','0000000013331000','0000000001110000'],
  tarakotchi:[
    '0000000000000000','0000010010000000','0000133331000000','0001333333100000',
    '0013333333310000','0013133313310000','0013133313310000','0013333333310000',
    '0013333133310000','0013333333310000','0013333333310000','0013333333310000',
    '0001333333100000','0001303030100000','0001303030100000','0001101010100000'],
};

const POOP_SPRITE = ['0110','1331','1331','0110'];

const ZZZ = [['00000','01110','00010','00100','01000','01110','00000'],
             ['01110','00010','00100','01000','01110','00000','00000']];

const COLORS = {'0':null,'1':'#306230','2':'#5a7a3a','3':'#8bac0f'};
const SICK_COLORS = {'0':null,'1':'#306230','2':'#5a7a3a','3':'#5a7a3a'};

// --- Character Data ---
const CHARS = {
  babytchi:    {stage:'baby',  hr:3,  hpr:4,  sleep:null,    wake:null,   bw:5,  maxAge:99},
  marutchi:    {stage:'child', hr:50, hpr:60, sleep:'20:00', wake:'09:00',bw:10, maxAge:99},
  tamatchi:    {stage:'teen',  hr:75, hpr:85, sleep:'21:00', wake:'09:00',bw:20, maxAge:99},
  kuchitamatchi:{stage:'teen', hr:60, hpr:70, sleep:'21:00', wake:'09:00',bw:20, maxAge:99},
  mametchi:    {stage:'adult', hr:86, hpr:90, sleep:'22:00', wake:'09:00',bw:30, maxAge:23},
  ginjirotchi: {stage:'adult', hr:80, hpr:85, sleep:'22:00', wake:'09:00',bw:30, maxAge:20},
  maskutchi:   {stage:'adult', hr:70, hpr:75, sleep:'23:00', wake:'11:00',bw:30, maxAge:18},
  kuchipatchi: {stage:'adult', hr:50, hpr:55, sleep:'22:00', wake:'09:00',bw:20, maxAge:16},
  nyorotchi:   {stage:'adult', hr:30, hpr:35, sleep:'22:00', wake:'09:00',bw:10, maxAge:12},
  tarakotchi:  {stage:'adult', hr:20, hpr:25, sleep:'22:00', wake:'10:00',bw:20, maxAge:9},
};

// --- State ---
const S = {
  charId:'babytchi', hunger:4, happiness:4, discipline:0, weight:5, age:0,
  alive:true, sick:false, sleeping:false, lightOff:false,
  poopCount:0, careMistakes:0, disciplineCalls:0, maxDisciplineCalls:4,
  needsAttention:false, attentionType:null, attentionTime:0,
  lastHungerDrop:Date.now(), lastHappyDrop:Date.now(), lastPoopTime:Date.now(),
  stageStart:Date.now(), birthTime:Date.now(), lastUpdate:Date.now(),
  animFrame:0, medicineNeeded:1,
};

// --- UI State ---
const UI = {mode:'main', selIcon:-1, feedChoice:0, gameRound:0, gameScore:0, gamePhase:'', gameAnswer:''};

// --- DOM ---
const canvas = document.getElementById('pet-canvas');
const ctx = canvas.getContext('2d');
const lcd = document.getElementById('lcd');
const hungerH = document.getElementById('hunger-hearts');
const happyH = document.getElementById('happy-hearts');
const msgEl = document.getElementById('message');
const floatEl = document.getElementById('float-emoji');
const nameEl = document.getElementById('pet-name');
const ageEl = document.getElementById('pet-age');
const weightEl = document.getElementById('pet-weight');
const attnEl = document.getElementById('attn-icon');
const icons = document.querySelectorAll('.screen-icon');
const overlays = {
  status: document.getElementById('overlay-status'),
  feed: document.getElementById('overlay-feed'),
  game: document.getElementById('overlay-game'),
  attention: document.getElementById('overlay-attention'),
};

const PX = 9;

// --- Init ---
function init() {
  load();
  render();
  drawPet();
  createStars();

  setInterval(() => { S.animFrame = 1 - S.animFrame; drawPet(); }, 500);
  setInterval(tick, 5000);
  setInterval(save, 10000);

  document.getElementById('btn-a').addEventListener('click', btnA);
  document.getElementById('btn-b').addEventListener('click', btnB);
  document.getElementById('btn-c').addEventListener('click', btnC);
  canvas.addEventListener('click', petClick);

  document.addEventListener('keydown', e => {
    if (e.key==='a'||e.key==='A'||e.key==='ArrowLeft') btnA();
    else if (e.key==='s'||e.key==='S'||e.key==='Enter'||e.key==='ArrowDown') btnB();
    else if (e.key==='d'||e.key==='D'||e.key==='Escape'||e.key==='ArrowRight') btnC();
  });
}

function createStars() {
  const c = document.getElementById('stars');
  for (let i = 0; i < 40; i++) {
    const s = document.createElement('div'); s.className = 'star';
    s.style.left = Math.random()*100+'%'; s.style.top = Math.random()*100+'%';
    s.style.setProperty('--duration', (1+Math.floor(Math.random()*3))+'s');
    s.style.setProperty('--max-opacity', (0.5+Math.random()*0.5).toString());
    s.style.animationDelay = Math.floor(Math.random()*3)+'s';
    c.appendChild(s);
  }
}

// --- Tick (every 5s) ---
function tick() {
  if (!S.alive) return;
  const now = Date.now();
  const ch = CHARS[S.charId];

  if (S.sleeping) {
    checkWake();
    if (S.sleeping) { checkLightMistake(now); save(); return; }
  }

  checkSleep();
  if (S.sleeping) return;

  // Hunger decay
  if (now - S.lastHungerDrop >= ch.hr * 60000) {
    S.hunger = Math.max(0, S.hunger - 1);
    S.lastHungerDrop = now;
    if (S.hunger === 0 && !S.needsAttention) setAttention('hunger', now);
  }

  // Happiness decay
  if (now - S.lastHappyDrop >= ch.hpr * 60000) {
    S.happiness = Math.max(0, S.happiness - 1);
    S.lastHappyDrop = now;
    if (S.happiness === 0 && !S.needsAttention) setAttention('happiness', now);
  }

  // Poop
  const poopInterval = ch.stage === 'baby' ? 15*60000 : 180*60000;
  if (now - S.lastPoopTime >= poopInterval && S.poopCount < 4) {
    S.poopCount++;
    S.lastPoopTime = now;
    if (S.poopCount >= 4 && !S.sick) makeSick();
  }

  // Discipline call
  if (!S.needsAttention && S.disciplineCalls < S.maxDisciplineCalls && S.hunger > 0 && S.happiness > 0) {
    const stageTime = now - S.stageStart;
    const interval = ch.stage === 'baby' ? 15*60000 : 120*60000;
    if (stageTime > interval * (S.disciplineCalls + 1)) {
      setAttention('discipline', now);
    }
  }

  // Care mistake check (15 min)
  if (S.needsAttention && S.attentionTime > 0 && now - S.attentionTime >= 15*60000) {
    if (S.attentionType === 'discipline') {
      S.disciplineCalls++;
    } else {
      S.careMistakes++;
    }
    clearAttention();
    checkDeath();
  }

  // Sickness from starvation
  if (S.hunger === 0 && S.happiness === 0 && !S.sick) makeSick();

  // Evolution
  checkEvolution(now);

  // Natural death
  if (S.age >= ch.maxAge) die();

  render();
  save();
}

// --- Sleep ---
function checkSleep() {
  const ch = CHARS[S.charId];
  if (!ch.sleep || S.sleeping) return;
  const [h] = ch.sleep.split(':').map(Number);
  const now = new Date();
  if (now.getHours() >= h && !S.sleeping) {
    S.sleeping = true;
    showMsg('Zzz...');
    if (!S.lightOff) setAttention('light', Date.now());
    render();
  }
}

function checkWake() {
  const ch = CHARS[S.charId];
  if (!ch.wake) return;
  const [h] = ch.wake.split(':').map(Number);
  const now = new Date();
  if (now.getHours() >= h && now.getHours() < 22) {
    S.sleeping = false;
    S.lightOff = false;
    lcd.classList.remove('light-off');
    S.age++;
    clearAttention();
    showMsg('おはよう！');
    render();
  }
}

function checkLightMistake(now) {
  if (S.sleeping && !S.lightOff && S.needsAttention && S.attentionType === 'light') {
    if (now - S.attentionTime >= 15*60000) {
      S.careMistakes++;
      clearAttention();
    }
  }
}

// --- Attention ---
function setAttention(type, time) {
  S.needsAttention = true;
  S.attentionType = type;
  S.attentionTime = time;
  attnEl.classList.add('show');
}

function clearAttention() {
  S.needsAttention = false;
  S.attentionType = null;
  S.attentionTime = 0;
  attnEl.classList.remove('show');
}

// --- Sickness & Death ---
function makeSick() {
  S.sick = true;
  S.medicineNeeded = 1 + Math.floor(Math.random() * 2);
  setAttention('sick', Date.now());
  showMsg('具合が悪い...');
}

function checkDeath() {
  const ch = CHARS[S.charId];
  if (ch.stage === 'adult' && S.careMistakes >= 5) die();
}

function die() {
  S.alive = false; S.sick = false; S.sleeping = false;
  clearAttention(); render(); drawPet();
  showMsg('さようなら...');
  document.querySelectorAll('.round-btn').forEach(b => b.disabled = true);
  save();
}

// --- Evolution ---
function checkEvolution(now) {
  const ch = CHARS[S.charId];
  if (ch.stage === 'baby' && now - S.birthTime >= 65*60000) {
    evolve('marutchi');
  } else if (ch.stage === 'child' && S.age >= 3) {
    evolve(S.careMistakes <= 1 ? 'tamatchi' : 'kuchitamatchi');
  } else if (ch.stage === 'teen' && S.age >= 6) {
    let next;
    if (S.charId === 'tamatchi') {
      if (S.discipline >= 100) next = 'mametchi';
      else if (S.discipline >= 75) next = 'ginjirotchi';
      else next = 'maskutchi';
    } else {
      if (S.discipline >= 75) next = 'kuchipatchi';
      else if (S.discipline >= 50) next = 'nyorotchi';
      else next = 'tarakotchi';
    }
    evolve(next);
  }
}

function evolve(newId) {
  const oldDisc = S.discipline;
  S.charId = newId;
  S.stageStart = Date.now();
  S.disciplineCalls = 0;
  S.maxDisciplineCalls = 4;
  S.weight = Math.max(S.weight, CHARS[newId].bw);
  // Discipline carry-over
  if (CHARS[newId].stage === 'teen') {
    S.discipline = oldDisc >= 75 ? 50 : 0;
    S.maxDisciplineCalls = oldDisc >= 75 ? 2 : 4;
  } else if (CHARS[newId].stage === 'adult') {
    S.discipline = S.discipline; // keep teen discipline for reference only
  }
  S.careMistakes = 0;
  showFloat('⭐');
  showMsg('進化した！');
  render();
}

// --- Button Handlers ---
function btnA() {
  if (!S.alive) return;
  if (UI.mode === 'main') {
    UI.mode = 'icon-select'; UI.selIcon = 0; highlightIcon();
  } else if (UI.mode === 'icon-select') {
    UI.selIcon = (UI.selIcon + 1) % 8; highlightIcon();
  } else if (UI.mode === 'feed') {
    UI.feedChoice = 1 - UI.feedChoice; showFeedMenu();
  } else if (UI.mode === 'game' && UI.gamePhase === 'guess') {
    gameGuess('left');
  }
}

function btnB() {
  if (!S.alive) return;
  if (UI.mode === 'main') { UI.mode = 'icon-select'; UI.selIcon = 0; highlightIcon(); }
  else if (UI.mode === 'icon-select') { activateIcon(UI.selIcon); }
  else if (UI.mode === 'feed') { doFeed(UI.feedChoice === 0 ? 'meal' : 'snack'); closeOverlays(); }
  else if (UI.mode === 'game' && UI.gamePhase === 'guess') { gameGuess('right'); }
  else if (UI.mode === 'game' && UI.gamePhase === 'result') { gameNextRound(); }
  else if (UI.mode === 'status' || UI.mode === 'attention') { closeOverlays(); }
}

function btnC() {
  if (UI.mode === 'game' && UI.gamePhase === 'guess') { closeOverlays(); return; }
  closeOverlays();
}

function highlightIcon() {
  icons.forEach((ic, i) => ic.classList.toggle('active', i === UI.selIcon));
}

function clearIcons() {
  icons.forEach(ic => ic.classList.remove('active'));
}

function activateIcon(idx) {
  closeOverlays();
  switch(idx) {
    case 0: openFeed(); break;
    case 1: toggleLight(); break;
    case 2: startGame(); break;
    case 3: doMedicine(); break;
    case 4: doClean(); break;
    case 5: doDiscipline(); break;
    case 6: showStatus(); break;
    case 7: showAttention(); break;
  }
}

function closeOverlays() {
  UI.mode = 'main'; UI.selIcon = -1;
  clearIcons();
  Object.values(overlays).forEach(o => o.classList.remove('show'));
}

// --- Actions ---
function openFeed() {
  if (S.sleeping) { showMsg('寝てる...'); closeOverlays(); return; }
  UI.mode = 'feed'; UI.feedChoice = 0;
  showFeedMenu();
}

function showFeedMenu() {
  const o = overlays.feed;
  o.innerHTML = `<div class="row${UI.feedChoice===0?' sel':''}"><span class="ptr">${UI.feedChoice===0?'▶':''}</span>MEAL おにぎり</div>` +
    `<div class="row${UI.feedChoice===1?' sel':''}"><span class="ptr">${UI.feedChoice===1?'▶':''}</span>SNACK おかし</div>`;
  o.classList.add('show');
}

function doFeed(type) {
  if (S.sleeping) return;
  if (type === 'meal') {
    if (S.hunger >= 4) { showMsg('お腹いっぱい！'); return; }
    S.hunger = Math.min(4, S.hunger + 1);
    S.weight = Math.min(99, S.weight + 1);
    showFloat('🍙');
    if (S.needsAttention && S.attentionType === 'hunger') clearAttention();
  } else {
    S.happiness = Math.min(4, S.happiness + 1);
    S.weight = Math.min(99, S.weight + 2);
    showFloat('🍬');
    if (S.needsAttention && S.attentionType === 'happiness') clearAttention();
  }
  showMsg('もぐもぐ！');
  render();
  save();
}

function toggleLight() {
  S.lightOff = !S.lightOff;
  lcd.classList.toggle('light-off', S.lightOff);
  if (S.lightOff && S.needsAttention && S.attentionType === 'light') clearAttention();
  showMsg(S.lightOff ? '電気OFF' : '電気ON');
  closeOverlays();
}

function doMedicine() {
  if (!S.sick) { showMsg('元気だよ！'); closeOverlays(); return; }
  S.medicineNeeded--;
  if (S.medicineNeeded <= 0) {
    S.sick = false;
    if (S.needsAttention && S.attentionType === 'sick') clearAttention();
    showMsg('治った！');
    showFloat('💊');
  } else {
    showMsg('もう少し...');
  }
  render(); save(); closeOverlays();
}

function doClean() {
  if (S.poopCount === 0) { showMsg('きれいだよ！'); closeOverlays(); return; }
  S.poopCount = 0;
  showFloat('✨');
  showMsg('ピカピカ！');
  render(); save(); closeOverlays();
}

function doDiscipline() {
  if (S.needsAttention && S.attentionType === 'discipline') {
    S.discipline = Math.min(100, S.discipline + 25);
    S.disciplineCalls++;
    clearAttention();
    showFloat('📢');
    showMsg('しつけ！');
  } else {
    showMsg('今は必要ない');
  }
  render(); save(); closeOverlays();
}

function showStatus() {
  UI.mode = 'status';
  const disc = '■'.repeat(S.discipline/25) + '□'.repeat(4 - S.discipline/25);
  overlays.status.innerHTML =
    `<div class="row">AGE  ${S.age}</div>` +
    `<div class="row">WT   ${S.weight}g</div>` +
    `<div class="row">DISC ${disc}</div>` +
    `<div class="row">HG   ${'♥'.repeat(S.hunger)}${'♡'.repeat(4-S.hunger)}</div>` +
    `<div class="row">HP   ${'♥'.repeat(S.happiness)}${'♡'.repeat(4-S.happiness)}</div>` +
    `<div class="row">MISS ${S.careMistakes}</div>`;
  overlays.status.classList.add('show');
}

function showAttention() {
  UI.mode = 'attention';
  let msg = 'なにもないよ！';
  if (S.needsAttention) {
    const types = {hunger:'お腹すいた！',happiness:'つまらない...',discipline:'しつけて！',sick:'具合が悪い...',light:'電気消して！'};
    msg = types[S.attentionType] || msg;
  }
  overlays.attention.innerHTML = `<div class="game-big">${msg}</div>`;
  overlays.attention.classList.add('show');
}

// --- Mini Game ---
function startGame() {
  if (S.sleeping || S.sick) { showMsg('今は遊べない'); closeOverlays(); return; }
  if (S.hunger <= 0) { showMsg('お腹すいた...'); closeOverlays(); return; }
  UI.mode = 'game'; UI.gameRound = 0; UI.gameScore = 0;
  gameNextRound();
}

function gameNextRound() {
  if (UI.gameRound >= 5) {
    // Game over
    const won = UI.gameScore >= 3;
    const perfect = UI.gameScore === 5;
    S.weight = Math.max(CHARS[S.charId].bw, S.weight - 1);
    if (perfect) S.happiness = Math.min(4, S.happiness + 2);
    else if (won) S.happiness = Math.min(4, S.happiness + 1);
    if (S.needsAttention && S.attentionType === 'happiness') clearAttention();
    overlays.game.innerHTML = `<div class="game-big">${won?'WIN!':'LOSE'}</div><div class="game-info">SCORE: ${UI.gameScore}/5</div><div class="game-info">${won?(perfect?'HP+2 WT-1':'HP+1 WT-1'):'WT-1'}</div><div class="game-info">B:OK</div>`;
    UI.gamePhase = 'result';
    render(); save();
    return;
  }
  UI.gameRound++;
  UI.gameAnswer = Math.random() < 0.5 ? 'left' : 'right';
  UI.gamePhase = 'guess';
  overlays.game.innerHTML = `<div class="game-info">ROUND ${UI.gameRound}/5</div><div class="game-big">← or →?</div><div class="game-info">A:LEFT  B:RIGHT</div><div class="game-info">C:QUIT</div>`;
  overlays.game.classList.add('show');
}

function gameGuess(dir) {
  const correct = dir === UI.gameAnswer;
  if (correct) UI.gameScore++;
  overlays.game.innerHTML = `<div class="game-info">ROUND ${UI.gameRound}/5</div><div class="game-big">${UI.gameAnswer==='left'?'← LEFT':'RIGHT →'}</div><div class="game-big">${correct?'◯':'✕'}</div><div class="game-info">SCORE: ${UI.gameScore}  B:NEXT</div>`;
  UI.gamePhase = 'result';
}

// --- Pet Click ---
function petClick() {
  if (!S.alive || S.sleeping || S.sick || UI.mode !== 'main') return;
  S.happiness = Math.min(4, S.happiness + (S.happiness < 4 ? 0 : 0));
  const emojis = ['💕','❤️','⭐','💖'];
  showFloat(emojis[Math.floor(Math.random()*emojis.length)]);
  const msgs = ['なでなで～','えへへ','うれしい！','もっと！'];
  showMsg(msgs[Math.floor(Math.random()*msgs.length)]);
}

// --- Render ---
function render() {
  // Hearts
  hungerH.innerHTML = h(S.hunger);
  happyH.innerHTML = h(S.happiness);

  // Info
  nameEl.textContent = S.charId.toUpperCase();
  ageEl.textContent = `AGE ${S.age}`;
  weightEl.textContent = `${S.weight}g`;

  // Attention
  attnEl.classList.toggle('show', S.needsAttention && S.alive);
}

function h(n) {
  let s = '';
  for (let i = 0; i < 4; i++) s += i < n ? '♥' : '<span class="e">♡</span>';
  return s;
}

// --- Draw Pet ---
function drawPet() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!S.alive) { drawSprite(S.charId, true, 0); drawDeadEyes(); return; }

  let oy = 0;
  if (S.sleeping) oy = S.animFrame ? -2 : 0;
  else if (!S.sick) oy = S.animFrame ? -4 : 0;
  else oy = S.animFrame ? -2 : 2;

  drawSprite(S.charId, S.sick, oy);

  if (S.sleeping) { drawSleepEyes(); drawZzz(); }
  if (S.sick) drawSkull();
  if (S.poopCount > 0) drawPoop();
  if (!S.alive && S.animFrame) { ctx.fillStyle='rgba(155,188,15,.2)'; ctx.fillRect(0,0,canvas.width,canvas.height); }
}

function drawSprite(id, sick, oy) {
  const sp = SPRITES[id]; if (!sp) return;
  const cols = sick ? SICK_COLORS : COLORS;
  const ox = Math.floor((160 - 16*PX)/2);
  const oyBase = Math.floor((144 - 16*PX)/2);
  for (let y=0;y<16;y++) for (let x=0;x<sp[y].length;x++) {
    const c=sp[y][x]; if (c==='0') continue;
    ctx.fillStyle=cols[c]||COLORS[c];
    ctx.fillRect(ox+x*PX, oyBase+y*PX+oy, PX, PX);
  }
}

function drawSleepEyes() {
  // Draw horizontal lines over eye area
  const sp = SPRITES[S.charId]; if (!sp) return;
  const ox = Math.floor((160 - 16*PX)/2);
  const oyBase = Math.floor((144 - 16*PX)/2) + (S.animFrame ? -2 : 0);
  for (let y=0;y<16;y++) {
    let inEye = false;
    for (let x=0;x<16;x++) {
      if (sp[y][x]==='1') {
        // Check if surrounded by body (eye pixel)
        if (x>0&&x<15&&sp[y][x-1]==='3'||(x>0&&sp[y][x+1]==='1'&&y>0&&sp[y-1]&&sp[y-1][x]==='3')) {
          ctx.fillStyle='#8bac0f';
          ctx.fillRect(ox+x*PX, oyBase+y*PX, PX, PX);
          ctx.fillStyle='#306230';
          ctx.fillRect(ox+x*PX, oyBase+y*PX+Math.floor(PX/2)-1, PX, 2);
          inEye = true;
        }
      }
    }
    if (inEye) break;
  }
}

function drawDeadEyes() {
  const sp = SPRITES[S.charId]; if (!sp) return;
  const ox = Math.floor((160 - 16*PX)/2);
  const oyBase = Math.floor((144 - 16*PX)/2);
  for (let y=0;y<16;y++) for (let x=0;x<16;x++) {
    if (sp[y][x]==='1' && x>1&&x<14 && sp[y][Math.max(0,x-1)]==='3') {
      ctx.fillStyle='#8bac0f';
      ctx.fillRect(ox+x*PX, oyBase+y*PX, PX, PX);
      ctx.fillStyle='#306230';
      ctx.fillRect(ox+x*PX+1,oyBase+y*PX+1,PX-2,PX-2);
      // X pattern
      ctx.fillStyle='#8bac0f';
      ctx.fillRect(ox+x*PX+2,oyBase+y*PX+2,2,2);
      ctx.fillRect(ox+x*PX+PX-4,oyBase+y*PX+2,2,2);
      ctx.fillRect(ox+x*PX+2,oyBase+y*PX+PX-4,2,2);
      ctx.fillRect(ox+x*PX+PX-4,oyBase+y*PX+PX-4,2,2);
    }
  }
}

function drawZzz() {
  const zz = ZZZ[S.animFrame];
  const zx = 130, zy = S.animFrame ? 2 : 12;
  for (let y=0;y<zz.length;y++) for (let x=0;x<zz[y].length;x++) {
    if (zz[y][x]==='1') { ctx.fillStyle='#306230'; ctx.fillRect(zx+x*4,zy+y*4,4,4); }
  }
}

function drawSkull() {
  const sx = 130, sy = S.animFrame ? 20 : 30;
  ctx.fillStyle='#306230';
  ctx.fillRect(sx,sy,4,4); ctx.fillRect(sx+8,sy,4,4);
  ctx.fillRect(sx-2,sy+4,16,4);
  ctx.fillRect(sx,sy+8,12,4);
  ctx.fillRect(sx+2,sy+12,3,3); ctx.fillRect(sx+7,sy+12,3,3);
}

function drawPoop() {
  const positions = [[125,120],[135,110],[115,115],[130,125]];
  for (let p=0;p<S.poopCount&&p<4;p++) {
    const [px,py] = positions[p];
    for (let y=0;y<POOP_SPRITE.length;y++) for (let x=0;x<POOP_SPRITE[y].length;x++) {
      const c = POOP_SPRITE[y][x]; if (c==='0') continue;
      ctx.fillStyle = c==='1'?'#306230':'#5a7a3a';
      ctx.fillRect(px+x*4, py+y*4, 4, 4);
    }
  }
}

// --- Messages ---
let msgTimer = null;
function showMsg(t) {
  msgEl.textContent=t; msgEl.classList.add('show');
  clearTimeout(msgTimer);
  msgTimer=setTimeout(()=>msgEl.classList.remove('show'),3000);
}

function showFloat(e) {
  floatEl.textContent=e; floatEl.classList.remove('show');
  void floatEl.offsetWidth; floatEl.classList.add('show');
  setTimeout(()=>floatEl.classList.remove('show'),1500);
}

// --- Save / Load ---
function save() {
  const d = {};
  ['charId','hunger','happiness','discipline','weight','age','alive','sick','sleeping','lightOff',
   'poopCount','careMistakes','disciplineCalls','maxDisciplineCalls','needsAttention','attentionType',
   'attentionTime','lastHungerDrop','lastHappyDrop','lastPoopTime','stageStart','birthTime','medicineNeeded'
  ].forEach(k => d[k] = S[k]);
  d.lastUpdate = Date.now();
  d.version = 2;
  localStorage.setItem('tamagotchi_save', JSON.stringify(d));
}

function load() {
  const raw = localStorage.getItem('tamagotchi_save');
  if (!raw) return;
  try {
    const d = JSON.parse(raw);
    if (d.version !== 2) { localStorage.removeItem('tamagotchi_save'); return; }
    Object.keys(d).forEach(k => { if (k in S) S[k] = d[k]; });

    // Offline decay
    const now = Date.now();
    const ch = CHARS[S.charId];
    if (S.alive && ch) {
      const elapsed = now - (d.lastUpdate || now);
      // Hunger drops
      const hDrops = Math.floor(elapsed / (ch.hr * 60000));
      S.hunger = Math.max(0, S.hunger - hDrops);
      // Happiness drops
      const hpDrops = Math.floor(elapsed / (ch.hpr * 60000));
      S.happiness = Math.max(0, S.happiness - hpDrops);
      // Poop
      const poopInt = ch.stage === 'baby' ? 15*60000 : 180*60000;
      const newPoops = Math.floor(elapsed / poopInt);
      S.poopCount = Math.min(4, S.poopCount + newPoops);
      // Age
      const dayMs = 24*60*60*1000;
      S.age += Math.floor(elapsed / dayMs);
      // Care mistakes from offline
      if (S.hunger === 0 || S.happiness === 0) {
        const mistakeTime = Math.floor(elapsed / (15*60000));
        S.careMistakes += Math.min(mistakeTime, 3);
      }
      if (S.poopCount >= 4) S.sick = true;

      S.lastHungerDrop = now;
      S.lastHappyDrop = now;
      S.lastPoopTime = now;

      checkDeath();
      checkEvolution(now);
    }

    S.sleeping = false;
    S.lightOff = false;
    if (!S.alive) document.querySelectorAll('.round-btn').forEach(b=>b.disabled=true);
    if (S.needsAttention) attnEl.classList.add('show');
  } catch(e) { console.warn('Load failed:', e); }
}

// --- Start ---
init();
