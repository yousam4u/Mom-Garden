import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

const DAILY_INSPIRATIONS = [
  {
    id: 1,
    message: "천천히 걷는 걸음도 앞으로 나아가는 소중한 한 걸음이에요. 오늘 하루도 무릎 아끼며 기분 좋게 시작해봐요!",
    author: "복실이의 따뜻한 응원",
    tag: "작은 한 걸음"
  },
  {
    id: 2,
    message: "내 몸을 아끼고 사랑하는 시간이 세상에서 가장 귀한 시간이에요. 가볍게 기지개 켜고 복실이와 함께해요!",
    author: "복실이의 따뜻한 응원",
    tag: "나를 위한 시간"
  },
  {
    id: 3,
    message: "오늘 딱 한 번만 실천해도 우리 몸은 잊지 않고 보답해요. 조급해하지 말고 편안한 마음으로 시작해요.",
    author: "복실이의 따뜻한 응원",
    tag: "오늘의 정성"
  },
  {
    id: 4,
    message: "어제보다 조금 더 부드러워진 무릎을 느껴보세요. 작은 정성이 모여 건강하고 튼튼한 다리를 만들어요.",
    author: "복실이의 따뜻한 응원",
    tag: "튼튼한 내일"
  },
  {
    id: 5,
    message: "숨을 깊게 들이마시고 편안하게 내쉬어보세요. 맑은 기운이 온몸을 채우며 활력을 불어넣어 줄 거예요.",
    author: "복실이의 따뜻한 응원",
    tag: "편안한 숨"
  },
  {
    id: 6,
    message: "무리하지 않고 아프지 않은 만큼만 움직여도 백점 만점이에요! 나 자신에게 칭찬 한마디 건네보세요.",
    author: "복실이의 따뜻한 응원",
    tag: "칭찬과 격려"
  },
  {
    id: 7,
    message: "씨앗이 자라 정원에 꽃이 피어나듯, 매일의 작은 움직임이 내 다리에 튼튼한 힘을 선물해 줍니다.",
    author: "복실이의 따뜻한 응원",
    tag: "정원의 꽃"
  },
  {
    id: 8,
    message: "오늘도 내 몸의 소리에 귀 기울여 주세요. 몸이 편안할 때 정원의 꽃도 더 예쁘고 활짝 피어나요.",
    author: "복실이의 따뜻한 응원",
    tag: "몸과의 대화"
  },
  {
    id: 9,
    message: "나를 위해 내어준 이 몇 분이 참 고맙고 소중합니다. 오늘도 건강하고 행복하게 복실이가 힘차게 응원해요!",
    author: "복실이의 따뜻한 응원",
    tag: "소중한 정성"
  },
  {
    id: 10,
    message: "산책길을 나설 때도 가벼운 다리로 걸을 수 있도록, 오늘 복실이가 곁에서 든든하게 지켜드릴게요.",
    author: "복실이의 따뜻한 응원",
    tag: "든든한 동반자"
  },
  {
    id: 11,
    message: "작은 실천이 쌓여 큰 건강이 됩니다. 오늘 하루도 환한 미소와 함께 가볍게 몸을 풀어보세요.",
    author: "복실이의 따뜻한 응원",
    tag: "미소와 건강"
  },
  {
    id: 12,
    message: "오늘 하루 수고할 내 다리에게 고마운 마음을 담아, 부드럽게 무릎을 펴고 활력을 불어넣어 주세요.",
    author: "복실이의 따뜻한 응원",
    tag: "고마운 내 다리"
  },
  {
    id: 13,
    message: "힘들 땐 언제든 쉬어가도 괜찮아요. 천천히 꾸준히 하는 것만큼 강하고 아름다운 건 없답니다.",
    author: "복실이의 따뜻한 응원",
    tag: "천천히 꾸준히"
  },
  {
    id: 14,
    message: "따뜻한 햇살처럼 오늘 하루도 엄마의 마음에 평안과 건강한 기운이 가득하기를 바라요.",
    author: "복실이의 따뜻한 응원",
    tag: "햇살 같은 하루"
  }
];

// Daily inspiration API endpoint
app.get('/api/daily-inspiration', (req, res) => {
  const { date, refresh, index } = req.query;
  const targetDate = typeof date === 'string' && date.length === 10 ? date : new Date().toISOString().slice(0, 10);

  let selectedIndex;
  if (refresh === 'true' || refresh === '1') {
    selectedIndex = Math.floor(Math.random() * DAILY_INSPIRATIONS.length);
  } else if (index !== undefined && !isNaN(parseInt(index, 10))) {
    selectedIndex = Math.abs(parseInt(index, 10)) % DAILY_INSPIRATIONS.length;
  } else {
    // Deterministic hash based on targetDate string
    let hash = 0;
    for (let i = 0; i < targetDate.length; i++) {
      hash = (hash * 31 + targetDate.charCodeAt(i)) % 2147483647;
    }
    selectedIndex = Math.abs(hash) % DAILY_INSPIRATIONS.length;
  }

  const item = DAILY_INSPIRATIONS[selectedIndex];
  res.json({
    success: true,
    ...item,
    date: targetDate,
    index: selectedIndex,
    total: DAILY_INSPIRATIONS.length,
  });
});

// Serve static assets from root
app.use(express.static(__dirname));

// Fallback for SPA routing to index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
