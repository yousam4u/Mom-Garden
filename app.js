const KEY = 'momsGardenFresh:v1';

const defaults = {
  settings: { voice: true, sound: true, vibration: true, speed: 'slow', level: '1', restDuration: 20, bgm: false, character: 'nini' },
  garden: { total: 0 },
  records: {},
};

const modes = {
  seated: {
    label: '앉아서 하기', mark: '의자', pose: 'pose-seated', reward: true,
    copy: '무릎 펴기, 발목 펌프, 앉은 제자리 걷기',
    safety: ['등받이 있는 의자에 깊게 앉아요.', '허리는 기대거나 편하게 세워요.', '무릎을 세게 잠그지 않아요.', '발을 쿵 내려놓지 않아요.'],
    cue: '발끝을 몸 쪽으로 당긴 뒤, 무릎 아래 종아리를 앞으로 펴요.',
    reps: { 1: 10, 2: 12, 3: 15 }, sets: { 1: 3, 2: 4, 3: 5 },
  },
  lying: {
    label: '누워서 하기', mark: '누워', pose: 'pose-lying', reward: true,
    copy: '무릎 하나 세우고 낮게 다리 들기',
    safety: ['한쪽 무릎은 세우고 누워요.', '허리가 뜨면 다리를 낮춰요.', '높이보다 천천히가 중요해요.', '허리나 무릎이 아프면 멈춰요.'],
    cue: '무릎을 편 다리를 바닥에서 10cm만 낮게 들어요.',
    reps: { 1: 10, 2: 12, 3: 15 }, sets: { 1: 3, 2: 4, 3: 5 },
  },
  home: {
    label: '집안 가벼운 운동', mark: '집', pose: 'pose-home', reward: true,
    copy: '안정된 곳을 잡고 뒤꿈치 들기',
    safety: ['움직이는 의자는 잡지 않아요.', '벽이나 식탁 옆에서 해요.', '작게 움직여도 충분해요.', '숨이 차면 바로 쉬어요.'],
    cue: '양손으로 지지물을 잡고, 뒤꿈치만 살짝 들어요.',
    reps: { 1: 10, 2: 12, 3: 15 }, sets: { 1: 3, 2: 4, 3: 5 },
  },
  belly: {
    label: '장운동 / 편안 운동', mark: '호흡', pose: 'pose-belly', reward: false,
    copy: '복식호흡, 배 시계방향 마사지, 편안한 휴식',
    safety: ['배를 세게 누르지 않아요.', '식후 바로 강하게 하지 않아요.', '허리가 불편하면 범위를 줄여요.', '편안한 호흡이 제일 중요해요.'],
    cue: '숨을 들이마시고, 길게 내쉬어요.',
    reps: { 1: 10, 2: 12, 3: 15 }, sets: { 1: 3, 2: 4, 3: 5 },
  },
};

const levelGuides = {
  1: {
    name: '1단계',
    repsDesc: '10회 × 3세트 (총 30회)',
    tag: '1단계 추천',
    target: '처음 시작하거나, 무릎이 뻐근하고 몸이 무거운 날 추천해요.',
    caution: '높이 들려 애쓰지 말고, 아프지 않은 낮은 각도까지만 천천히 움직여요. 힘들면 1세트만 하고 쉬어도 훌륭해요.',
    voiceSummary: '1단계는 10회씩 3세트예요. 처음 시작하거나 몸이 무거운 날 추천해요. 높이 들지 말고 편한 만큼만 천천히 움직이세요. 힘들면 언제든 멈춰도 괜찮아요.',
  },
  2: {
    name: '2단계',
    repsDesc: '12회 × 4세트 (총 48회)',
    tag: '2단계 추천',
    target: '1단계가 수월해지고, 다음 날 쑤시거나 피로가 없는 날 추천해요.',
    caution: '반동을 쓰지 말고 발끝을 몸 쪽으로 당겨 천천히 올리고, 숨을 참지 않고 입으로 "후-" 길게 내쉬어요.',
    voiceSummary: '2단계는 12회씩 4세트예요. 1단계가 편안해진 날 추천해요. 반동 없이 천천히 올리고, 숨을 참지 말고 후 내쉬며 하세요.',
  },
  3: {
    name: '3단계',
    repsDesc: '15회 × 5세트 (총 75회)',
    tag: '3단계 추천',
    target: '동작이 익숙하고, 통증 없이 다리 힘을 더 기르고 싶은 날 추천해요.',
    caution: '횟수를 채우려고 무릎을 탁 튕기거나 발을 쿵 내려놓지 마세요. 찌릿하거나 열감이 나면 즉시 멈춰요.',
    voiceSummary: '3단계는 15회씩 5세트예요. 통증 없이 근력을 더 기르고 싶은 날 추천해요. 무릎을 탁 튕기지 말고 끝까지 부드럽게 조절하세요. 아프면 바로 중단하세요.',
  },
};

const LOCAL_INSPIRATIONS = [
  {
    id: 1,
    message: "천천히 걷는 걸음도 앞으로 나아가는 소중한 한 걸음이에요. 오늘 하루도 무릎 아끼며 기분 좋게 시작해봐요!",
    author: "복실이의 따뜻한 응원",
    tag: "작은 한 걸음",
  },
  {
    id: 2,
    message: "내 몸을 아끼고 사랑하는 시간이 세상에서 가장 귀한 시간이에요. 가볍게 기지개 켜고 복실이와 함께해요!",
    author: "복실이의 따뜻한 응원",
    tag: "나를 위한 시간",
  },
  {
    id: 3,
    message: "오늘 딱 한 번만 실천해도 우리 몸은 잊지 않고 보답해요. 조급해하지 말고 편안한 마음으로 시작해요.",
    author: "복실이의 따뜻한 응원",
    tag: "오늘의 정성",
  },
  {
    id: 4,
    message: "어제보다 조금 더 부드러워진 무릎을 느껴보세요. 작은 정성이 모여 건강하고 튼튼한 다리를 만들어요.",
    author: "복실이의 따뜻한 응원",
    tag: "튼튼한 내일",
  },
  {
    id: 5,
    message: "숨을 깊게 들이마시고 편안하게 내쉬어보세요. 맑은 기운이 온몸을 채우며 활력을 불어넣어 줄 거예요.",
    author: "복실이의 따뜻한 응원",
    tag: "편안한 숨",
  },
  {
    id: 6,
    message: "무리하지 않고 아프지 않은 만큼만 움직여도 백점 만점이에요! 나 자신에게 칭찬 한마디 건네보세요.",
    author: "복실이의 따뜻한 응원",
    tag: "칭찬과 격려",
  },
  {
    id: 7,
    message: "씨앗이 자라 정원에 꽃이 피어나듯, 매일의 작은 움직임이 내 다리에 튼튼한 힘을 선물해 줍니다.",
    author: "복실이의 따뜻한 응원",
    tag: "정원의 꽃",
  },
  {
    id: 8,
    message: "오늘도 내 몸의 소리에 귀 기울여 주세요. 몸이 편안할 때 정원의 꽃도 더 예쁘고 활짝 피어나요.",
    author: "복실이의 따뜻한 응원",
    tag: "몸과의 대화",
  },
  {
    id: 9,
    message: "나를 위해 내어준 이 몇 분이 참 고맙고 소중합니다. 오늘도 건강하고 행복하게 복실이가 힘차게 응원해요!",
    author: "복실이의 따뜻한 응원",
    tag: "소중한 정성",
  },
  {
    id: 10,
    message: "산책길을 나설 때도 가벼운 다리로 걸을 수 있도록, 오늘 복실이가 곁에서 든든하게 지켜드릴게요.",
    author: "복실이의 따뜻한 응원",
    tag: "든든한 동반자",
  },
  {
    id: 11,
    message: "작은 실천이 쌓여 큰 건강이 됩니다. 오늘 하루도 환한 미소와 함께 가볍게 몸을 풀어보세요.",
    author: "복실이의 따뜻한 응원",
    tag: "미소와 건강",
  },
  {
    id: 12,
    message: "오늘 하루 수고할 내 다리에게 고마운 마음을 담아, 부드럽게 무릎을 펴고 활력을 불어넣어 주세요.",
    author: "복실이의 따뜻한 응원",
    tag: "고마운 내 다리",
  },
  {
    id: 13,
    message: "힘들 땐 언제든 쉬어가도 괜찮아요. 천천히 꾸준히 하는 것만큼 강하고 아름다운 건 없답니다.",
    author: "복실이의 따뜻한 응원",
    tag: "천천히 꾸준히",
  },
  {
    id: 14,
    message: "따뜻한 햇살처럼 오늘 하루도 엄마의 마음에 평안과 건강한 기운이 가득하기를 바라요.",
    author: "복실이의 따뜻한 응원",
    tag: "햇살 같은 하루",
  },
];

let currentInspiration = null;
let isSpeakingInspiration = false;

function getDeterministicInspiration(dateStr) {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) % 2147483647;
  }
  const index = Math.abs(hash) % LOCAL_INSPIRATIONS.length;
  return { ...LOCAL_INSPIRATIONS[index], date: dateStr };
}

function formatKoreanDate(dateStr) {
  try {
    const parts = (dateStr || '').split('-');
    if (parts.length === 3) {
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      return `${month}월 ${day}일 오늘의 말씀`;
    }
  } catch {}
  return '오늘의 말씀';
}

function renderDailyInspiration() {
  if (!currentInspiration) return;
  const textEl = $('daily-inspiration-text');
  const tagEl = $('daily-inspiration-tag');
  const authorEl = $('daily-inspiration-author');
  const dateEl = $('inspiration-date');

  if (textEl) textEl.textContent = `"${currentInspiration.message}"`;
  if (tagEl) tagEl.textContent = `✨ ${currentInspiration.tag || '오늘의 응원'}`;
  if (authorEl) authorEl.textContent = `🐾 ${currentInspiration.author || '복실이의 따뜻한 응원'}`;
  if (dateEl) dateEl.textContent = formatKoreanDate(currentInspiration.date || today());
}

async function loadDailyInspiration(isRefresh = false) {
  const todayStr = today();
  const cardEl = $('daily-inspiration-card');

  // Immediately populate with deterministic local quote to prevent empty layout flash
  if (!currentInspiration && !isRefresh) {
    currentInspiration = getDeterministicInspiration(todayStr);
    renderDailyInspiration();
  }

  if (cardEl && isRefresh) {
    cardEl.classList.add('loading');
  }

  try {
    const url = isRefresh ? '/api/daily-inspiration?refresh=1' : `/api/daily-inspiration?date=${todayStr}`;
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 3500) : null;

    const res = await fetch(url, controller ? { signal: controller.signal } : {});
    if (timeoutId) clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data && data.message) {
      currentInspiration = data;
    }
  } catch {
    // Graceful offline & error fallback to local list
    if (isRefresh) {
      const filtered = LOCAL_INSPIRATIONS.filter((item) => !currentInspiration || item.message !== currentInspiration.message);
      const pool = filtered.length > 0 ? filtered : LOCAL_INSPIRATIONS;
      const randIdx = Math.floor(Math.random() * pool.length);
      currentInspiration = { ...pool[randIdx], date: todayStr };
    } else if (!currentInspiration) {
      currentInspiration = getDeterministicInspiration(todayStr);
    }
  } finally {
    if (cardEl) {
      cardEl.classList.remove('loading');
      cardEl.classList.add('fade-in');
      setTimeout(() => cardEl.classList.remove('fade-in'), 400);
    }
    renderDailyInspiration();
  }
}

function speakDailyInspiration() {
  if (!currentInspiration) return;
  const btn = $('btn-speak-inspiration');
  if (isSpeakingInspiration) {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    isSpeakingInspiration = false;
    if (btn) {
      btn.classList.remove('speaking');
      const label = btn.querySelector('span:last-child');
      if (label) label.textContent = '듣기';
    }
    return;
  }

  isSpeakingInspiration = true;
  if (btn) {
    btn.classList.add('speaking');
    const label = btn.querySelector('span:last-child');
    if (label) label.textContent = '멈춤';
  }

  const speechText = `엄마, 오늘의 응원 한마디예요. ${currentInspiration.message}`;
  const onDone = () => {
    isSpeakingInspiration = false;
    if (btn) {
      btn.classList.remove('speaking');
      const label = btn.querySelector('span:last-child');
      if (label) label.textContent = '듣기';
    }
  };

  if (!speak(speechText, onDone)) {
    onDone();
  }
}

let state = load();
let selected = 'seated';
let workout = null;
let timer = null;
let lastFocusedElement = null;

const $ = (id) => document.getElementById(id);

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    const savedLevel = String(saved.settings?.level || defaults.settings.level);
    const level = ['1', '2', '3'].includes(savedLevel) ? savedLevel : defaults.settings.level;
    return {
      ...structuredClone(defaults),
      ...saved,
      settings: {
        voice: saved.settings?.voice !== false,
        sound: saved.settings?.sound !== false,
        vibration: saved.settings?.vibration !== false,
        speed: saved.settings?.speed || 'slow',
        level,
        restDuration: saved.settings?.restDuration || defaults.settings.restDuration,
        bgm: saved.settings?.bgm === true,
        character: saved.settings?.character === 'boksil' ? 'boksil' : 'nini',
      },
      garden: { ...defaults.garden, ...(saved.garden || {}) },
      records: saved.records || {},
    };
  } catch {
    return structuredClone(defaults);
  }
}
function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
function today() { return new Date().toISOString().slice(0, 10); }
function record() {
  const key = today();
  state.records[key] ||= { done: 0, stop: 0, pain: 0 };
  return state.records[key];
}
function doneToday() { return Math.min(3, record().done); }
function screen(name) {
  if (name !== 'workout') {
    stopBgm();
  }
  if (name !== 'home' && isSpeakingInspiration) {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    isSpeakingInspiration = false;
    const btn = $('btn-speak-inspiration');
    if (btn) {
      btn.classList.remove('speaking');
      const label = btn.querySelector('span:last-child');
      if (label) label.textContent = '듣기';
    }
  }
  ['home', 'modes', 'ready', 'workout', 'done', 'guide'].forEach((s) => { $(`screen-${s}`).hidden = s !== name; });
  if (name === 'home') renderHome();
}
let cachedKoreanVoice = null;

function loadKoreanVoice() {
  if (!('speechSynthesis' in window)) return null;
  try {
    const voices = speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const koVoices = voices.filter(
      (v) => v.lang && (v.lang.toLowerCase().startsWith('ko') || v.lang.toLowerCase().includes('kr'))
    );

    if (koVoices.length === 0) {
      cachedKoreanVoice = voices[0] || null;
      return cachedKoreanVoice;
    }

    // Priority search for clear, natural, bright, and energetic Korean voices
    // (e.g. Microsoft SunHi Natural, Apple Yuna, Google Korean, Sora, Online Natural voices)
    const priorityPatterns = [
      /sunhi/i,
      /yuna/i,
      /natural/i,
      /google/i,
      /sora/i,
      /online/i,
      /premium/i,
      /heami/i,
    ];

    for (const pattern of priorityPatterns) {
      const match = koVoices.find((v) => pattern.test(v.name));
      if (match) {
        cachedKoreanVoice = match;
        return match;
      }
    }

    cachedKoreanVoice = koVoices[0];
    return cachedKoreanVoice;
  } catch {
    return null;
  }
}

if ('speechSynthesis' in window) {
  loadKoreanVoice();
  if (typeof speechSynthesis.addEventListener === 'function') {
    speechSynthesis.addEventListener('voiceschanged', loadKoreanVoice);
  } else {
    speechSynthesis.onvoiceschanged = loadKoreanVoice;
  }
}

function speak(text, onDone) {
  if (!state.settings.voice || !('speechSynthesis' in window)) return false;
  try {
    speechSynthesis.cancel();
    duckBgm(true);
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';

    // Energetic, bright, and focused voice configuration
    const voice = cachedKoreanVoice || loadKoreanVoice();
    if (voice) {
      u.voice = voice;
    }

    // A slightly elevated pitch (1.14) creates a warm, cheerful, crisp, and wakeful timbre
    u.pitch = 1.14;

    // Rhythmic, energetic tempo tailored to senior safety and lively focus
    u.rate = state.settings.speed === 'slow' ? 0.90 : 1.02;
    u.volume = 1.0;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      duckBgm(false);
      if (onDone) onDone();
    };
    u.onend = finish;
    u.onerror = finish;
    speechSynthesis.speak(u);
    return true;
  } catch {
    duckBgm(false);
    return false;
  }
}

let restTimer = null;
let signalAlertTimer = null;
let audioContext = null;

function getAudioContext() {
  try {
    if (!audioContext && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioCtx();
    }
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume().catch(() => {});
    }
  } catch {
    // Web Audio unsupported
  }
  return audioContext;
}

// 1. Set Start Chime: Pleasant 3-note ascending arpeggio (C5 -> E5 -> G5)
function playSetStartSound() {
  if (!state.settings.sound) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const notes = [
      { freq: 523.25, time: 0, dur: 0.15 },
      { freq: 659.25, time: 0.11, dur: 0.16 },
      { freq: 783.99, time: 0.22, dur: 0.38 },
    ];
    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.freq, now + note.time);

      gain.gain.setValueAtTime(0.001, now + note.time);
      gain.gain.linearRampToValueAtTime(0.24, now + note.time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + note.time + note.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + note.time);
      osc.stop(now + note.time + note.dur + 0.05);
    });
  } catch {
    // Audio error safety
  }
}

// 2. Rest End Chime: Distinct melodious chime (G5 -> E5 -> A5)
function playMoodBubbleSound() {
  if (!state.settings.sound) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(659.25, now);
    osc.frequency.exponentialRampToValueAtTime(880.00, now + 0.12);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.24);
  } catch {
    // Audio error safety
  }
}

function playRestEndSound() {
  if (!state.settings.sound) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const notes = [
      { freq: 783.99, time: 0, dur: 0.22 },
      { freq: 659.25, time: 0.18, dur: 0.22 },
      { freq: 880.00, time: 0.36, dur: 0.45 },
    ];
    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.freq, now + note.time);

      gain.gain.setValueAtTime(0.001, now + note.time);
      gain.gain.linearRampToValueAtTime(0.28, now + note.time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + note.time + note.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + note.time);
      osc.stop(now + note.time + note.dur + 0.05);
    });
  } catch {
    // Audio error safety
  }
}

// 3. Vibration trigger
function triggerVibrate(pattern) {
  if (!state.settings.vibration) return;
  try {
    if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
      navigator.vibrate(pattern);
    }
  } catch {
    // Vibration safety
  }
}

// 4. Floating signal alert banner
function showSignalAlert(icon, text, type = 'start') {
  const el = $('signal-alert');
  const iconEl = $('signal-alert-icon');
  const textEl = $('signal-alert-text');
  if (!el || !iconEl || !textEl) return;
  clearTimeout(signalAlertTimer);
  iconEl.textContent = icon;
  textEl.textContent = text;
  el.className = `signal-alert active type-${type}`;
  el.hidden = false;
  signalAlertTimer = setTimeout(() => {
    el.classList.remove('active');
    setTimeout(() => {
      if (!el.classList.contains('active')) el.hidden = true;
    }, 280);
  }, 2200);
}

// High-level Signal: Set Start
function signalSetStart(setNum) {
  playSetStartSound();
  triggerVibrate([100, 60, 100]);
  showSignalAlert('🔔', `${setNum}세트 시작!`, 'start');
}

// High-level Signal: Rest End
function signalRestEnd(nextSetNum) {
  playRestEndSound();
  triggerVibrate([180, 80, 180, 80, 240]);
  showSignalAlert('⏰', `휴식 끝! ${nextSetNum}세트 준비`, 'rest');
}

function updateSignalToggleUI() {
  const btn = $('btn-toggle-cue');
  const label = $('signal-status-label');
  if (!btn || !label) return;
  const isEnabled = state.settings.sound && state.settings.vibration;
  btn.setAttribute('aria-pressed', String(isEnabled));
  label.textContent = isEnabled ? '알림 켜짐' : '알림 꺼짐';
}

/* ==========================================================================
   Boksil's Background Music (Soft, Upbeat Instrumental Pace Generator)
   ========================================================================== */

let bgmFilterNode = null;
let bgmMasterGain = null;
let bgmIsPlaying = false;
let bgmSchedulerTimer = null;
let bgmNextNoteTime = 0;
let bgmStepIndex = 0;
let bgmIsDucked = false;

// 82 BPM: Steady, upbeat, and gentle cadence for knee exercises (2 steps per beat)
const BGM_TEMPO = 82;
const BGM_STEP_TIME = (60 / BGM_TEMPO) / 2; // ~0.3658s
const BGM_BASE_VOLUME = 0.14;
const BGM_DUCK_VOLUME = 0.045;

// Acoustic Bass Pattern (Hz) for 32 steps (4 bars of 4/4)
const BGM_BASS_PATTERN = {
  0: 130.81,  // C3 (Bar 1: C)
  4: 98.00,   // G2
  8: 87.31,   // F2 (Bar 2: F)
  12: 98.00,  // G2
  16: 110.00, // A2 (Bar 3: Am)
  20: 87.31,  // F2
  24: 98.00,  // G2 (Bar 4: G7)
  28: 130.81, // C3
};

// Cheerful Pentatonic Kalimba / Glockenspiel melody and soft chords (Hz)
const BGM_MELODY_PATTERN = {
  0: [261.63, 329.63], // C4, E4
  1: [392.00],          // G4
  2: [523.25],          // C5
  3: [329.63],          // E4
  4: [392.00],          // G4
  5: [523.25],          // C5
  6: [587.33],          // D5
  7: [392.00],          // G4

  8: [349.23, 440.00], // F4, A4
  9: [523.25],          // C5
  10: [440.00],         // A4
  11: [349.23],         // F4
  12: [392.00, 493.88], // G4, B4
  13: [587.33],         // D5
  14: [523.25],         // C5
  15: [659.25],         // E5

  16: [261.63, 329.63], // C4, E4
  17: [440.00],         // A4
  18: [523.25],         // C5
  19: [329.63],         // E4
  20: [349.23, 523.25], // F4, C5
  21: [440.00],         // A4
  22: [523.25],         // C5
  23: [587.33],         // D5

  24: [293.66, 493.88], // D4, B4
  25: [392.00],         // G4
  26: [587.33],         // D5
  27: [493.88],         // B4
  28: [329.63, 523.25], // E4, C5
  29: [392.00],         // G4
  30: [659.25],         // E5
  31: [523.25],         // C5
};

function ensureBgmBus() {
  const ctx = getAudioContext();
  if (!ctx) return null;
  if (!bgmFilterNode) {
    bgmFilterNode = ctx.createBiquadFilter();
    bgmFilterNode.type = 'lowpass';
    bgmFilterNode.frequency.setValueAtTime(2100, ctx.currentTime);
  }
  if (!bgmMasterGain) {
    bgmMasterGain = ctx.createGain();
    bgmMasterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    bgmFilterNode.connect(bgmMasterGain);
    bgmMasterGain.connect(ctx.destination);
  }
  return ctx;
}

function startBgm() {
  const ctx = ensureBgmBus();
  if (!ctx) return;
  if (bgmIsPlaying) return;

  bgmIsPlaying = true;
  bgmStepIndex = 0;
  bgmNextNoteTime = ctx.currentTime + 0.06;

  const now = ctx.currentTime;
  bgmMasterGain.gain.cancelScheduledValues(now);
  bgmMasterGain.gain.setValueAtTime(0.0001, now);
  const targetGain = bgmIsDucked ? BGM_DUCK_VOLUME : BGM_BASE_VOLUME;
  bgmMasterGain.gain.linearRampToValueAtTime(targetGain, now + 0.35);

  runBgmScheduler();
  const banner = $('bgm-pace-banner');
  if (banner && state.settings.bgm) banner.hidden = false;
}

function runBgmScheduler() {
  if (!bgmIsPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const lookAheadTime = 0.25;
  while (bgmNextNoteTime < ctx.currentTime + lookAheadTime) {
    playBgmStep(bgmStepIndex, bgmNextNoteTime, ctx);
    bgmNextNoteTime += BGM_STEP_TIME;
    bgmStepIndex = (bgmStepIndex + 1) % 32;
  }

  bgmSchedulerTimer = setTimeout(runBgmScheduler, 60);
}

function playBgmStep(step, time, ctx) {
  if (!bgmFilterNode) return;

  // 1. Steady Pace Ticker (Gentle woodblock clave tick on quarter notes)
  if (step % 2 === 0) {
    try {
      const tickOsc = ctx.createOscillator();
      const tickGain = ctx.createGain();
      tickOsc.type = 'sine';
      tickOsc.frequency.setValueAtTime(step % 4 === 0 ? 1160 : 940, time);
      tickGain.gain.setValueAtTime(0.024, time);
      tickGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.035);
      tickOsc.connect(tickGain);
      tickGain.connect(bgmFilterNode);
      tickOsc.start(time);
      tickOsc.stop(time + 0.04);
    } catch {}
  }

  // 2. Warm Bass Pulse
  const bassFreq = BGM_BASS_PATTERN[step];
  if (bassFreq) {
    try {
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(bassFreq, time);
      bassGain.gain.setValueAtTime(0.001, time);
      bassGain.gain.linearRampToValueAtTime(0.12, time + 0.025);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.55);
      bassOsc.connect(bassGain);
      bassGain.connect(bgmFilterNode);
      bassOsc.start(time);
      bassOsc.stop(time + 0.6);
    } catch {}
  }

  // 3. Cheerful Kalimba / Bell Notes
  const notes = BGM_MELODY_PATTERN[step];
  if (notes) {
    notes.forEach((freq) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(0.085, time + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.38);
        osc.connect(gain);
        gain.connect(bgmFilterNode);
        osc.start(time);
        osc.stop(time + 0.4);
      } catch {}
    });
  }
}

function pauseBgm() {
  if (!bgmIsPlaying || !bgmMasterGain) return;
  const ctx = getAudioContext();
  if (ctx) {
    const now = ctx.currentTime;
    bgmMasterGain.gain.cancelScheduledValues(now);
    bgmMasterGain.gain.setValueAtTime(bgmMasterGain.gain.value, now);
    bgmMasterGain.gain.linearRampToValueAtTime(0.0001, now + 0.18);
  }
  clearTimeout(bgmSchedulerTimer);
  bgmIsPlaying = false;
}

function resumeBgm() {
  if (!state.settings.bgm) return;
  startBgm();
}

function stopBgm() {
  clearTimeout(bgmSchedulerTimer);
  if (bgmMasterGain) {
    const ctx = getAudioContext();
    if (ctx) {
      const now = ctx.currentTime;
      bgmMasterGain.gain.cancelScheduledValues(now);
      bgmMasterGain.gain.setValueAtTime(bgmMasterGain.gain.value, now);
      bgmMasterGain.gain.linearRampToValueAtTime(0.0001, now + 0.22);
    }
  }
  bgmIsPlaying = false;
  bgmStepIndex = 0;
  const banner = $('bgm-pace-banner');
  if (banner) banner.hidden = true;
}

function duckBgm(duck) {
  bgmIsDucked = duck;
  if (!bgmIsPlaying || !bgmMasterGain) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const target = duck ? BGM_DUCK_VOLUME : BGM_BASE_VOLUME;
  bgmMasterGain.gain.cancelScheduledValues(now);
  bgmMasterGain.gain.setValueAtTime(bgmMasterGain.gain.value, now);
  bgmMasterGain.gain.linearRampToValueAtTime(target, now + (duck ? 0.15 : 0.35));
}

function updateBgmToggleUI() {
  const btn = $('btn-toggle-bgm');
  const label = $('bgm-status-label');
  const banner = $('bgm-pace-banner');
  const isEnabled = !!state.settings.bgm;

  if (btn) {
    btn.setAttribute('aria-pressed', isEnabled ? 'true' : 'false');
    btn.setAttribute('aria-label', isEnabled ? '복실이 배경음악 켜짐' : '복실이 배경음악 꺼짐');
    btn.title = isEnabled ? '복실이 배경음악 켜짐 (클릭 시 끄기)' : '복실이 배경음악 꺼짐 (클릭 시 켜기)';
  }
  if (label) {
    label.textContent = isEnabled ? '음악 켜짐' : '음악 꺼짐';
  }
  if (banner) {
    banner.hidden = !isEnabled;
  }
}

function toggleBgm() {
  getAudioContext();
  state.settings.bgm = !state.settings.bgm;
  save();
  updateBgmToggleUI();

  if (state.settings.bgm) {
    if (workout && !workout.paused && !workout.isResting) {
      startBgm();
    }
    showSignalAlert('🎵', '복실이 음악 켜짐', 'start');
    triggerVibrate(60);
  } else {
    stopBgm();
    showSignalAlert('🔇', '복실이 음악 꺼짐', 'start');
  }
}
function calcWeekDone() {
  const now = new Date();
  let count = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (state.records[key] && state.records[key].done > 0) count++;
  }
  return count;
}

function calcTotalDone() {
  return Object.values(state.records).filter((r) => r.done > 0).length;
}

function setCompanion(companion, shouldSpeak = true) {
  if (companion !== 'nini' && companion !== 'boksil') return;
  state.settings.character = companion;
  save();
  updateCompanionUI();
  if (shouldSpeak) {
    if (companion === 'nini') {
      speak('안녕하세요 엄마! 니니 코치와 함께 기분 좋게 무릎 운동해요!');
    } else {
      speak('복실이와 함께 편안하게 움직여봐요!');
    }
  }
}

function updateCompanionUI() {
  const isNini = state.settings.character === 'nini';
  const btnNini = $('btn-companion-nini');
  const btnBoksil = $('btn-companion-boksil');
  if (btnNini) {
    btnNini.classList.toggle('active', isNini);
    btnNini.classList.toggle('is-nini', isNini);
    btnNini.setAttribute('aria-checked', String(isNini));
  }
  if (btnBoksil) {
    btnBoksil.classList.toggle('active', !isNini);
    btnBoksil.setAttribute('aria-checked', String(!isNini));
  }
  const homeNini = $('home-nini');
  const homeBoksil = $('home-boksil');
  if (homeNini) homeNini.hidden = !isNini;
  if (homeBoksil) homeBoksil.hidden = isNini;

  const doneNini = $('done-nini');
  const doneBoksil = $('done-boksil');
  if (doneNini) doneNini.hidden = !isNini;
  if (doneBoksil) doneBoksil.hidden = isNini;

  const authorTag = $('daily-inspiration-author');
  if (authorTag) {
    authorTag.textContent = isNini ? '👧 니니 코치의 따뜻한 응원' : '🐾 복실이의 따뜻한 응원';
  }
  const kicker = $('app-kicker');
  if (kicker) {
    kicker.textContent = isNini ? '니니 코치와 함께하는 안심 무릎운동' : '복실이와 함께하는 안심 무릎운동';
  }
}

function renderHome() {
  const r = record();
  const d = doneToday();
  const level = state.settings.level;
  const levelMode = modes.seated;
  const mood = r.pain ? 'mood-care' : d >= 3 ? 'mood-cheer' : 'mood-happy';
  if ($('home-boksil')) $('home-boksil').className = `boksil ${mood}`;
  if ($('home-nini')) $('home-nini').className = `nini-character ${mood}`;

  const companionName = state.settings.character === 'nini' ? '니니 코치' : '복실이';
  $('home-message').textContent = r.pain
    ? '오늘은 무리하지 말고 편안히 쉬어도 괜찮아요.'
    : d >= 3
    ? '오늘 물 3번 다 줬어요. 이제 편하게 쉬어요.'
    : d
    ? `오늘 ${d}번 했어요. ${companionName}와 천천히 잘하고 있어요.`
    : `오늘은 한 번만 해도 충분해요. ${companionName}와 함께해요.`;

  if ($('today-day-count')) $('today-day-count').textContent = `${Math.max(1, Object.keys(state.records).length)}일차`;
  $('today-count').textContent = `${d} / 3번`;
  if ($('week-count')) $('week-count').textContent = `${calcWeekDone()}일 완료`;
  if ($('total-count')) $('total-count').textContent = `${calcTotalDone()}일`;
  $('today-level').textContent = `${level}단계`;
  $('today-reps').textContent = `${levelMode.reps[level]}회 × ${levelMode.sets[level]}세트`;
  $('today-state').textContent = r.pain ? '휴식' : d >= 3 ? '완료' : d ? '진행' : '준비';
  updateCompanionUI();
  renderLevelPicker();
  renderLevelSummary();
  renderWater('watering');
  renderFlowers('flowers');
}
function renderLevelPicker() {
  document.querySelectorAll('.level-option').forEach((button) => {
    const isSelected = button.dataset.level === state.settings.level;
    button.classList.toggle('selected', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });
}
function renderLevelSummary() {
  const level = state.settings.level;
  const guide = levelGuides[level] || levelGuides[1];
  const card = $('level-summary-card');
  const badge = $('level-tip-badge');
  const target = $('level-tip-target');
  const caution = $('level-tip-caution');

  if (card && badge && target && caution) {
    card.className = `level-tip-card level-${level}`;
    badge.textContent = guide.tag;
    target.textContent = guide.target;
    caution.innerHTML = `<b>주의</b> ${guide.caution}`;
  }
}
function openLevelModal() {
  const modal = $('level-modal');
  if (!modal) return;
  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  const closeBtn = $('btn-close-level-modal');
  if (closeBtn) closeBtn.focus();
}
function closeLevelModal() {
  const modal = $('level-modal');
  if (!modal || modal.hidden) return;
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}
function speakLevelOverview() {
  const currentLevel = state.settings.level;
  const cur = levelGuides[currentLevel] || levelGuides[1];
  const text = `엄마, 현재 설정된 ${cur.name} 안내예요. ${cur.voiceSummary} 공통 주의사항으로, 무릎이나 허리가 아프면 언제든 아파요 버튼을 누르고 바로 쉬어가세요.`;
  speak(text);
}
function selectLevel(level, shouldSpeak = true) {
  if (!['1', '2', '3'].includes(level)) return;
  state.settings.level = level;
  save();
  renderHome();
  const mode = modes.seated;
  const guide = levelGuides[level];
  if (shouldSpeak) {
    speak(`${level}단계로 변경했어요. ${mode.reps[level]}회씩 ${mode.sets[level]}세트예요. ${guide.target}`);
  }
}
function renderWater(id) {
  const box = $(id); box.innerHTML = '';
  const done = doneToday();
  for (let i = 0; i < 3; i += 1) {
    const el = document.createElement('span');
    const isDone = i < done;
    el.className = `flower-check ${isDone ? 'done bloom' : ''}`;
    el.setAttribute('aria-label', isDone ? '완료한 운동 꽃' : '아직 피지 않은 꽃봉오리');
    el.innerHTML = isDone ? '<span class="flower-icon">✿</span><small>완료</small>' : '<span class="bud-icon">✧</span><small>대기</small>';
    box.appendChild(el);
  }
}
function renderFlowers(id) {
  const box = $(id); box.innerHTML = '';
  const count = Math.max(1, Math.min(5, state.garden.total + doneToday()));
  for (let i = 0; i < count; i += 1) {
    const f = document.createElement('span');
    f.className = 'flower';
    f.style.transform = `scale(${0.75 + i * 0.07})`;
    box.appendChild(f);
  }
}
function renderModes() {
  const list = $('mode-list'); list.innerHTML = '';
  Object.entries(modes).forEach(([key, mode]) => {
    const btn = document.createElement('button');
    btn.className = 'mode'; btn.type = 'button'; btn.setAttribute('aria-pressed', key === selected);
    btn.innerHTML = `<span class="badge">${mode.mark}</span><span><b>${mode.label}</b><span>${mode.copy}</span></span>`;
    btn.addEventListener('click', () => { selected = key; renderModes(); });
    list.appendChild(btn);
  });
}
const NINI_WORKOUT_POSES = {
  seated: {
    'phase-ready': 'nini-s-1.png',
    'phase-toe': 'nini-s-2.png',
    'phase-lift': 'nini-s-3.png',
    'phase-hold': 'nini-s-4.png',
    'phase-lower': 'nini-s-5.png',
  },
  lying: {
    'phase-ready': 'nini-l-1.png',
    'phase-toe': 'nini-l-2.png',
    'phase-lift': 'nini-l-3.png',
    'phase-hold': 'nini-l-4.png',
    'phase-lower': 'nini-l-5.png',
  },
  home: {
    'phase-ready': 'nini-h-1.png',
    'phase-lift': 'nini-h-2.png',
    'phase-hold': 'nini-h-3.png',
    'phase-lower': 'nini-h-4.png',
  },
  belly: {
    'phase-ready': 'nini-b-1.png',
    'phase-lift': 'nini-b-1.png',
    'phase-hold': 'nini-b-2.png',
    'phase-lower': 'nini-b-3.png',
  }
};

function updateWorkoutVisuals(poseKey, phaseClass, side = 'right') {
  const isNini = state.settings.character === 'nini';
  const niniStage = $('nini-workout-stage');
  const boksilStage = $('stick');
  const niniImg = $('nini-workout-img');

  if (isNini) {
    if (niniStage) niniStage.style.display = 'flex';
    if (boksilStage) boksilStage.style.display = 'none';

    if (niniImg) {
      const category = NINI_WORKOUT_POSES[poseKey] || NINI_WORKOUT_POSES.seated;
      const file = category[phaseClass] || category['phase-ready'] || 'nini-s-1.png';
      niniImg.src = `./Character-nini/${file}`;
    }
    if (niniStage) {
      const isLeft = side === 'left';
      niniStage.className = `nini-workout-figure ${phaseClass} ${isLeft ? 'character-flip-x side-left' : ''}`.trim();
    }
  } else {
    if (niniStage) niniStage.style.display = 'none';
    if (boksilStage) {
      boksilStage.style.display = 'block';
      const isLeft = side === 'left';
      const flipClass = isLeft ? 'character-flip-x' : '';
      boksilStage.className = `motion-figure ${modes[poseKey]?.pose || 'pose-seated'} ${phaseClass} is-boksil-mode ${flipClass}`.trim();
    }
  }
}

function renderReady() {
  const mode = modes[selected];
  $('ready-title').textContent = `${mode.label} 준비`;
  const isNini = state.settings.character === 'nini';
  const readyPose = $('ready-pose');
  if (readyPose) {
    if (isNini) {
      const category = NINI_WORKOUT_POSES[selected] || NINI_WORKOUT_POSES.seated;
      const file = category['phase-ready'] || 'nini-s-1.png';
      readyPose.innerHTML = `<img class="ready-pose-img" src="./Character-nini/${file}" alt="${mode.label} 준비 자세" />`;
    } else {
      readyPose.className = `pose-preview motion-figure ${mode.pose} phase-ready`;
      const stick = $('stick');
      if (stick) {
        readyPose.innerHTML = stick.innerHTML;
      }
    }
  }
  $('safety-list').innerHTML = mode.safety.map((s) => `<li>${s}</li>`).join('');
  speak(`${mode.label} 준비할게요. ${mode.safety.join(' ')}`);
}
function updateLegIndicator() {
  const ind = $('leg-side-indicator');
  const tag = $('leg-side-tag');
  const txt = $('leg-side-text');
  if (!ind || !workout) return;
  if (workout.key === 'seated' || workout.key === 'lying') {
    ind.hidden = false;
    const isLeft = workout.side === 'left';
    if (tag) tag.textContent = isLeft ? '왼쪽 다리' : '오른쪽 다리';
    if (txt) {
      if (workout.key === 'seated') {
        txt.textContent = isLeft ? '이번엔 왼쪽 무릎 아래 종아리를 앞으로 펴요' : '오른쪽 무릎 아래 종아리를 앞으로 펴요';
      } else {
        txt.textContent = isLeft ? '이번엔 왼쪽 다리를 낮게 들어요' : '오른쪽 다리를 바닥에서 10cm만 들어요';
      }
    }
  } else {
    ind.hidden = true;
  }
}

function start() {
  getAudioContext();
  const mode = modes[selected]; const level = state.settings.level;
  workout = {
    key: selected,
    rep: 0,
    set: 1,
    side: 'right',
    reps: mode.reps[level],
    sets: mode.sets[level],
    phase: 0,
    paused: false,
    isResting: false,
    restSeconds: 20,
    runToken: 0,
  };
  $('work-mode').textContent = mode.label; $('work-title').textContent = '천천히요';
  updateWorkoutVisuals(workout.key, 'phase-ready', workout.side);
  $('count').textContent = '준비'; $('cue').textContent = mode.cue;
  $('btn-pause').textContent = '잠깐 쉬기';
  updateLegIndicator();
  const restOverlay = $('rest-overlay');
  if (restOverlay) restOverlay.hidden = true;
  meter(); renderWorkFlow(); screen('workout');
  updateBgmToggleUI();
  if (state.settings.bgm) {
    startBgm();
  } else {
    stopBgm();
  }

  // Short sound & vibration cue for Set 1 start
  signalSetStart(1);

  const intro = `${mode.label} 1세트 시작할게요. 아프면 바로 아파요 버튼을 누르세요.`;
  if (!speak(intro, () => { timer = setTimeout(loop, 500); })) timer = setTimeout(loop, 2800);
}
function movementSteps(key) {
  if (key === 'seated') {
    return [
      { label: '발끝 당겨요', className: 'phase-toe', cue: '발끝을 몸 쪽으로 살짝 당겨요. 허벅지 앞쪽에 힘이 들어오면 좋아요.' },
      { label: '종아리 앞으로', className: 'phase-lift', cue: '허벅지는 의자에 두고, 무릎 아래 종아리만 앞으로 천천히 펴요.' },
      { label: '무릎 편 채 유지', className: 'phase-hold', cue: '무릎을 편 채로 잠깐 멈춰요. 허리는 의자에 편하게 기대도 좋아요.' },
      { label: '천천히 내려요', className: 'phase-lower', cue: '발을 쿵 내려놓지 말고 천천히 내려요.' },
      { label: '힘 빼요', className: 'phase-ready', cue: '다리 힘을 잠깐 빼고 다음 동작을 준비해요.' },
    ];
  }
  if (key === 'lying') {
    return [
      { label: '발끝 당겨요', className: 'phase-toe', cue: '발끝을 몸 쪽으로 살짝 당겨요. 무릎은 편 채로 준비해요.' },
      { label: '다리 10cm 들어요', className: 'phase-lift', cue: '무릎을 편 다리를 바닥에서 손바닥 한 뼘보다 낮게 들어요.' },
      { label: '허리 붙이고 유지', className: 'phase-hold', cue: '허리가 바닥에서 뜨지 않게 하고 잠깐 유지해요.' },
      { label: '천천히 내려요', className: 'phase-lower', cue: '다리를 천천히 내려요. 바닥에 툭 놓지 않아요.' },
      { label: '힘 빼요', className: 'phase-ready', cue: '발끝 힘을 풀고 숨을 편하게 쉬어요.' },
    ];
  }
  if (key === 'home') {
    return [
      { label: '잡아요', className: 'phase-ready', cue: '벽이나 식탁처럼 흔들리지 않는 곳을 가볍게 잡아요.' },
      { label: '뒤꿈치만 들어요', className: 'phase-lift', cue: '발 앞꿈치는 바닥에 두고, 뒤꿈치만 살짝 들어요.' },
      { label: '잠깐 유지', className: 'phase-hold', cue: '잡은 손과 무릎이 편한지 확인해요.' },
      { label: '천천히 내려요', className: 'phase-lower', cue: '뒤꿈치를 천천히 내려요.' },
    ];
  }
  return [
    { label: '숨 들이마셔요', className: 'phase-lift', cue: '배를 세게 누르지 말고 숨을 천천히 들이마셔요.' },
    { label: '잠깐 멈춰요', className: 'phase-hold', cue: '어깨 힘을 빼고 편하게 멈춰요.' },
    { label: '길게 내쉬어요', className: 'phase-lower', cue: '숨을 길게 내쉬며 배와 허리를 편하게 풀어요.' },
  ];
}
function loop() {
  clearTimeout(timer);
  if (!workout || workout.paused) return;
  const steps = movementSteps(workout.key);
  const currentWorkout = workout;
  const token = ++currentWorkout.runToken;
  const step = steps[currentWorkout.phase];

  updateWorkoutVisuals(currentWorkout.key, step.className, currentWorkout.side);
  $('cue').textContent = step.cue;
  $('count').textContent = step.label;
  renderWorkFlow();

  let holdExtra = 0;
  if (step.className === 'phase-hold') {
    holdExtra = state.settings.speed === 'slow' ? 1400 : 900;
  }

  const advance = () => {
    if (workout !== currentWorkout || currentWorkout.paused || currentWorkout.runToken !== token) return;
    timer = setTimeout(
      () => advanceStep(currentWorkout, token, steps),
      (state.settings.speed === 'slow' ? 500 : 300) + holdExtra
    );
  };
  const firstRepetition = currentWorkout.set === 1 && currentWorkout.rep === 0;
  const voiceText = firstRepetition
    ? `${step.label}! ${step.cue}`
    : (step.className === 'phase-hold' ? `${step.label}! 하나, 둘, 셋, 유지해요!` : `${step.label}!`);
  const fallbackDuration = step.className === 'phase-hold'
    ? (state.settings.speed === 'slow' ? 3200 : 2400)
    : (state.settings.speed === 'slow' ? 1800 : 1350);

  if (!speak(voiceText, advance)) {
    timer = setTimeout(advance, fallbackDuration);
  }
}
function advanceStep(currentWorkout, token, steps) {
  if (workout !== currentWorkout || currentWorkout.paused || currentWorkout.runToken !== token) return;
  currentWorkout.phase += 1;
  if (currentWorkout.phase < steps.length) return loop();

  currentWorkout.phase = 0;
  currentWorkout.rep += 1;
  $('count').textContent = `${currentWorkout.rep}회`;
  $('cue').textContent = `${currentWorkout.rep}회 완료했어요!`;
  meter();
  if (currentWorkout.rep >= currentWorkout.reps) return finishSet();

  const continueWorkout = () => {
    if (workout !== currentWorkout || currentWorkout.paused) return;
    timer = setTimeout(loop, state.settings.speed === 'slow' ? 450 : 280);
  };
  const praises = ['좋아요!', '잘하고 계세요!', '힘내세요!', '나이스!', '멋져요!'];
  const cheer = currentWorkout.rep % 3 === 0 ? praises[(Math.floor(currentWorkout.rep / 3) - 1) % praises.length] : '';
  const repSpeech = `${currentWorkout.rep}회 완료! ${cheer}`;
  if (!speak(repSpeech, continueWorkout)) continueWorkout();
}
function finishSet() {
  clearTimeout(timer);
  clearInterval(restTimer);
  if (workout.set >= workout.sets) return finishWorkout();
  startRestPeriod();
}

function startRestPeriod() {
  if (!workout) return;
  clearTimeout(timer);
  clearInterval(restTimer);
  workout.isResting = true;
  workout.paused = true;
  workout.restSeconds = state.settings.restDuration || 20;
  pauseBgm();

  const mode = modes[workout.key];
  updateWorkoutVisuals(workout.key, 'phase-ready', workout.side);
  $('work-title').textContent = '잠깐 쉬어요';
  $('count').textContent = '쉼';
  $('cue').textContent = '다리 힘을 빼고 편하게 숨을 고르세요.';
  $('btn-pause').textContent = '다음 세트 시작';

  const nextSetNum = workout.set + 1;
  const restOverlay = $('rest-overlay');
  if (restOverlay) restOverlay.hidden = false;
  const nextLabel = $('rest-next-label');
  if (nextLabel) nextLabel.textContent = `다음 ${nextSetNum}세트 준비`;
  updateRestCountdownUI();

  const restSpeech = `${workout.set}세트 완벽해요! ${workout.restSeconds}초 동안 편안히 숨 고르며 쉬세요. 준비되면 바로 다음 세트로 넘어가도 좋아요!`;
  speak(restSpeech);

  restTimer = setInterval(() => {
    if (!workout || !workout.isResting) {
      clearInterval(restTimer);
      return;
    }
    workout.restSeconds -= 1;
    updateRestCountdownUI();

    if (workout.restSeconds <= 0) {
      clearInterval(restTimer);
      onRestComplete();
    }
  }, 1000);
}

function updateRestCountdownUI() {
  const cd = $('rest-countdown');
  if (!cd || !workout) return;
  const s = Math.max(0, workout.restSeconds);
  cd.textContent = `${s}초`;
  if (s <= 3) {
    cd.classList.add('urgent');
  } else {
    cd.classList.remove('urgent');
  }
}

function addRestTime(seconds = 10) {
  if (!workout || !workout.isResting) return;
  workout.restSeconds += seconds;
  updateRestCountdownUI();
  triggerVibrate(60);
  speak(`${seconds}초 더 편안히 쉬어요.`);
}

function onRestComplete() {
  if (!workout || !workout.isResting) return;
  const nextSetNum = workout.set + 1;

  // Signal: Sound chime & vibration for end of rest
  signalRestEnd(nextSetNum);

  const speech = `휴식 끝! 다음 ${nextSetNum}세트 활기차게 시작해요!`;
  const proceeded = speak(speech, () => {
    if (workout && workout.isResting) {
      startNextSet();
    }
  });

  if (!proceeded) {
    setTimeout(() => {
      if (workout && workout.isResting) {
        startNextSet();
      }
    }, 1500);
  }
}

function startNextSet() {
  if (!workout) return;
  clearInterval(restTimer);
  workout.isResting = false;
  workout.paused = false;
  workout.set += 1;
  workout.rep = 0;
  workout.phase = 0;
  workout.runToken += 1;

  // Alternate legs: Set 1 right, Set 2 left, Set 3 right, etc. (docs/06_Nini_Pose_Prompt_Set-1.md)
  if (workout.key === 'seated' || workout.key === 'lying') {
    workout.side = workout.set % 2 === 0 ? 'left' : 'right';
  } else {
    workout.side = 'right';
  }
  updateLegIndicator();

  const restOverlay = $('rest-overlay');
  if (restOverlay) restOverlay.hidden = true;

  $('work-title').textContent = '천천히요';
  $('btn-pause').textContent = '잠깐 쉬기';
  meter();
  renderWorkFlow();

  // Signal: Sound chime & vibration for new set start
  signalSetStart(workout.set);
  if (state.settings.bgm) {
    resumeBgm();
  }

  const sidePrompt = workout.side === 'left' ? '이번엔 왼쪽 다리로 바꿔요! ' : '';
  const speech = `${sidePrompt}${workout.set}세트 시작해요! 힘내서 다시 천천히 움직여봐요!`;
  if (!speak(speech, () => { timer = setTimeout(loop, 400); })) {
    timer = setTimeout(loop, 1600);
  }
}

function finishWorkout() {
  clearTimeout(timer);
  clearInterval(restTimer);
  stopBgm();
  const restOverlay = $('rest-overlay');
  if (restOverlay) restOverlay.hidden = true;

  const doneKey = workout.key;
  const mode = modes[doneKey]; const r = record();
  if (mode.reward) { r.done += 1; state.garden.total = Math.min(5, state.garden.total + 1); }
  save(); workout = null; renderWater('done-watering'); renderFlowers('done-flowers');
  renderDoneCompanion(doneKey);
  const companionName = state.settings.character === 'nini' ? '니니 코치' : '복실이';
  $('done-message').textContent = mode.reward ? `운동 꽃이 ${doneToday()}송이 활짝 피었어요!` : `${companionName}처럼 편하게 숨을 골랐어요.`;
  speak('참 잘하셨어요! 오늘 운동을 활기차고 멋지게 해내셨어요!'); screen('done');
}
function renderDoneCompanion(key) {
  const isNini = state.settings.character === 'nini';
  const pose = key === 'belly' ? 'completion-rest mood-happy' : key === 'lying' ? 'completion-soft mood-cheer' : key === 'home' ? 'completion-proud mood-cheer' : 'completion-cheer mood-cheer';
  const doneNini = $('done-nini');
  const doneBoksil = $('done-boksil');
  if (doneNini) {
    doneNini.hidden = !isNini;
    doneNini.className = `nini-character done-nini ${pose}`;
  }
  if (doneBoksil) {
    doneBoksil.hidden = isNini;
    doneBoksil.className = `boksil done-boksil ${pose}`;
  }
  $('done-card').className = `done-card done-${key}`;
}
function pause() {
  if (!workout) return;
  clearTimeout(timer);

  // If user tapped pause button while resting, proceed directly to next set
  if (workout.isResting) {
    startNextSet();
    return;
  }

  const wasPaused = workout.paused;
  workout.runToken += 1;
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (wasPaused) {
    workout.paused = false;
    $('work-title').textContent = '천천히요';
    $('btn-pause').textContent = '잠깐 쉬기';
    meter();
    triggerVibrate(80);
    if (state.settings.bgm) resumeBgm();
    const restart = `${workout.set}세트 이어서 할게요. 다시 천천히 움직여요.`;
    if (!speak(restart, () => { timer = setTimeout(loop, 400); })) timer = setTimeout(loop, 1800);
    return;
  }
  workout.paused = true;
  pauseBgm();
  $('count').textContent = '쉼';
  $('cue').textContent = '편하게 쉬세요.';
  $('btn-pause').textContent = '계속하기';
  speak('잠깐 쉬어요.');
}
function stop(pain = false) {
  clearTimeout(timer);
  clearInterval(restTimer);
  stopBgm();
  const restOverlay = $('rest-overlay');
  if (restOverlay) restOverlay.hidden = true;
  const r = record(); r.stop += 1; if (pain) r.pain += 1; save(); workout = null; speak(pain ? '무리하지 않는 게 제일 잘하는 거예요. 쉬어도 괜찮아요.' : '오늘은 여기까지 해도 괜찮아요.'); screen('home');
}
function meter() { $('set-meter').textContent = `${workout.set}세트 / ${workout.sets}세트`; $('rep-meter').textContent = `${workout.rep} / ${workout.reps}회`; }
function renderWorkFlow() {
  if (!workout || !$('work-flow')) return;
  const steps = movementSteps(workout.key);
  const active = workout.phase;
  $('work-flow').innerHTML = steps.map((step, index) => `<li class="${index === active ? 'active' : ''}">${step.label}</li>`).join('');
}
function bindGuideSpeech() {
  document.querySelectorAll('.exercise-guide').forEach((guide) => {
    if (guide.querySelector('.guide-speak')) return;
    const button = document.createElement('button');
    button.className = 'guide-speak';
    button.type = 'button';
    button.textContent = '🔊 순서 듣기';
    button.addEventListener('click', () => {
      const title = guide.querySelector('summary b')?.textContent || '다리 운동';
      const steps = [...guide.querySelectorAll('li')].map((item) => item.textContent.trim());
      speak(`${title}. ${steps.join(' ')}`);
    });
    guide.appendChild(button);
  });
}
const MOOD_MAP = {
  stiff: {
    text: '무릎이 뻐근한 날엔 1단계로 살살, 쉬어가며 천천히 움직여요.',
    level: '1',
    speech: '무릎이 뻐근하시군요. 오늘은 1단계로 가볍게 무릎을 달래줘요.',
  },
  careful: {
    text: '조심조심 아프지 않은 범위까지만 편안하게 따라 해봐요.',
    level: '1',
    speech: '조심조심, 아프지 않은 범위까지만 천천히 움직여요.',
  },
  comfy: {
    text: '무릎이 편안하시다니 참 다행이에요! 기분 좋게 시작해봐요.',
    level: '1',
    speech: '무릎이 편안하시다니 다행이에요! 기분 좋게 시작해요.',
  },
  energetic: {
    text: '오늘 몸이 개운하시네요! 알맞은 단계로 활기차게 채워봐요.',
    level: '2',
    speech: '오늘 컨디션이 참 좋으시네요! 알맞은 단계로 힘내봐요.',
  },
};

function bindMoodSelector() {
  document.querySelectorAll('.mood-bubble-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const moodKey = btn.dataset.mood;
      const config = MOOD_MAP[moodKey];
      if (!config) return;

      document.querySelectorAll('.mood-bubble-btn').forEach((b) => {
        const isTarget = b === btn;
        b.classList.toggle('active', isTarget);
        b.setAttribute('aria-checked', isTarget ? 'true' : 'false');
      });

      const homeMsg = $('home-message');
      if (homeMsg) {
        homeMsg.textContent = config.text;
      }

      playMoodBubbleSound();
      triggerVibrate(30);
      speak(config.speech);

      if (config.level) {
        selectLevel(config.level, false);
      }
    });
  });
}

function bind() {
  bindGuideSpeech();
  bindMoodSelector();
  $('btn-top-menu')?.addEventListener('click', () => screen('guide'));
  $('btn-open-modes').onclick = () => { renderModes(); screen('modes'); };
  $('btn-to-ready').onclick = () => { renderReady(); screen('ready'); };
  $('btn-start').onclick = start; $('btn-pause').onclick = pause; $('btn-stop').onclick = () => stop(false); $('btn-pain').onclick = () => stop(true);

  // Rest controls between sets
  $('btn-rest-start-now')?.addEventListener('click', () => startNextSet());
  $('btn-rest-add-time')?.addEventListener('click', () => addRestTime(10));

  // Signal toggle (Sound & Vibration on/off + instant test)
  const toggleBtn = $('btn-toggle-cue');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      getAudioContext();
      const currentActive = state.settings.sound && state.settings.vibration;
      const willEnable = !currentActive;
      state.settings.sound = willEnable;
      state.settings.vibration = willEnable;
      save();
      updateSignalToggleUI();
      if (willEnable) {
        signalSetStart('알림 확인');
        speak('소리와 진동 알림이 켜졌어요.');
      } else {
        speak('소리와 진동 알림이 꺼졌어요.');
      }
    });
    updateSignalToggleUI();
  }

  // Boksil's Background Music toggle
  const bgmToggleBtn = $('btn-toggle-bgm');
  if (bgmToggleBtn) {
    bgmToggleBtn.addEventListener('click', toggleBgm);
    updateBgmToggleUI();
  }

  document.querySelectorAll('[data-screen]').forEach((b) => b.addEventListener('click', () => screen(b.dataset.screen)));
  document.querySelectorAll('.level-option').forEach((button) => button.addEventListener('click', () => selectLevel(button.dataset.level)));

  // Companion Switcher (Nini / Boksil)
  $('btn-companion-nini')?.addEventListener('click', () => setCompanion('nini'));
  $('btn-companion-boksil')?.addEventListener('click', () => setCompanion('boksil'));

  const homeNini = $('home-nini');
  if (homeNini) {
    homeNini.addEventListener('click', () => {
      homeNini.classList.remove('tapped');
      void homeNini.offsetWidth;
      homeNini.classList.add('tapped');
      const d = doneToday();
      const niniEncouragement = [
        '엄마, 오늘도 반가워요! 니니 코치와 함께 천천히 발맞춰 봐요.',
        '무리하지 말고 편안하게, 오늘 기분만큼만 움직여요.',
        '니니 코치가 언제나 엄마 곁에서 따뜻하게 응원하고 있어요.',
        '오늘도 살살, 관절이 기분 좋은 속도로 함께해요.',
      ];
      const speechText = d >= 3
        ? '오늘 물주기 꽃을 모두 활짝 피우셨어요! 정말 멋져요, 최고예요!'
        : niniEncouragement[Math.floor(Math.random() * niniEncouragement.length)];
      $('home-message').textContent = speechText;
      speak(speechText);
    });
  }

  const homeBoksil = $('home-boksil');
  if (homeBoksil) {
    homeBoksil.addEventListener('click', () => {
      homeBoksil.classList.remove('tapped');
      void homeBoksil.offsetWidth;
      homeBoksil.classList.add('tapped');
      const d = doneToday();
      const encouragement = [
        '엄마, 오늘도 반가워요! 천천히 함께해요.',
        '무리하지 말고 편안하게 해봐요.',
        '복실이가 옆에서 응원하고 있어요.',
        '오늘도 살살, 안전하게 움직여 봐요.',
      ];
      const speechText = d >= 3
        ? '오늘 물주기 꽃을 모두 피우셨어요! 정말 대단해요.'
        : encouragement[Math.floor(Math.random() * encouragement.length)];
      $('home-message').textContent = speechText;
      speak(speechText);
    });
  }

  // Daily Inspiration (Message of the Day) events
  $('btn-speak-inspiration')?.addEventListener('click', speakDailyInspiration);
  $('btn-refresh-inspiration')?.addEventListener('click', () => loadDailyInspiration(true));

  // Level Guidance Modal events
  $('btn-open-level-modal')?.addEventListener('click', openLevelModal);
  $('btn-open-level-modal-link')?.addEventListener('click', openLevelModal);
  $('btn-close-level-modal')?.addEventListener('click', closeLevelModal);
  $('btn-confirm-level-modal')?.addEventListener('click', closeLevelModal);
  $('level-modal')?.addEventListener('click', (e) => {
    if (e.target === $('level-modal')) closeLevelModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLevelModal();
  });
  $('btn-speak-level-guide')?.addEventListener('click', speakLevelOverview);
}
function sw() {
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
  let refreshed = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshed) return;
    refreshed = true;
    location.reload();
  });
  navigator.serviceWorker.register('./service-worker.js').then((reg) => reg.update()).catch(() => undefined);
}
bind(); renderHome(); loadDailyInspiration(); sw();


















