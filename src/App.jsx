import { useMemo, useState } from "react";
import {
  Leaf,
  Calculator,
  Trees,
  Bot,
  Gamepad2,
  BookOpen,
  BarChart3,
  Globe2,
  ArrowRight,
  Sprout,
  Factory,
  Zap,
  Fuel,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";

import heroImage from "./assets/images/hero-carbon.png";
import logo from "./assets/images/logo-carbon.png";

const emissionFactors = {
  fertilizer: 1.3, // kg CO2e / kg fertilizer
  diesel: 2.68, // kg CO2e / liter diesel
  electricity: 0.5, // kg CO2e / kWh electricity
};

const sinkFactors = {
  芒果園: 1.2,
  香蕉園: 1.0,
  茶園: 1.5,
  咖啡園: 1.8,
  竹林: 5.0,
  森林: 8.0,
};

const cases = [
  {
    icon: "🌾",
    title: "水稻農場碳排案例",
    crop: "水稻",
    area: "1 公頃",
    result: "約 2.45 tCO₂e / 年",
    lesson: "肥料與灌溉是主要排放來源，可透過減少氮肥、節水灌溉與綠肥改善。",
  },
  {
    icon: "🥭",
    title: "芒果園碳匯案例",
    crop: "芒果",
    area: "2 公頃",
    result: "約 2.4 tCO₂e / 年碳匯",
    lesson: "果樹能固定碳，搭配草生栽培與覆蓋植物，可提升土壤碳匯。",
  },
  {
    icon: "☕",
    title: "咖啡園永續案例",
    crop: "咖啡",
    area: "1.5 公頃",
    result: "約 2.7 tCO₂e / 年碳匯",
    lesson: "咖啡樹與遮蔭樹可形成複層栽培，兼顧品質、生態與碳吸收。",
  },
  {
    icon: "🥬",
    title: "有機蔬菜減碳案例",
    crop: "葉菜類",
    area: "0.5 公頃",
    result: "減少化肥後碳排下降",
    lesson: "有機肥、堆肥與輪作可降低化學肥料依賴，但仍需注意能源與運輸排放。",
  },
];

function kgToTon(value) {
  return value / 1000;
}

function formatNumber(value, digits = 2) {
  if (!Number.isFinite(value)) return "0.00";
  return value.toLocaleString("zh-TW", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export default function App() {
  const [farm, setFarm] = useState({
    crop: "水稻",
    area: 1,
    fertilizer: 500,
    diesel: 200,
    electricity: 300,
  });

  const [sink, setSink] = useState({
    cropType: "芒果園",
    area: 2,
  });

  const [challengeChoice, setChallengeChoice] = useState("reduceFertilizer");

  const carbon = useMemo(() => {
    const fertilizerKg = Number(farm.fertilizer || 0) * emissionFactors.fertilizer;
    const dieselKg = Number(farm.diesel || 0) * emissionFactors.diesel;
    const electricityKg = Number(farm.electricity || 0) * emissionFactors.electricity;
    const totalKg = fertilizerKg + dieselKg + electricityKg;
    const area = Math.max(Number(farm.area || 1), 0.01);

    return {
      fertilizerKg,
      dieselKg,
      electricityKg,
      totalKg,
      totalTon: kgToTon(totalKg),
      perHectareTon: kgToTon(totalKg) / area,
    };
  }, [farm]);

  const sinkResult = useMemo(() => {
    const factor = sinkFactors[sink.cropType] || 0;
    const area = Math.max(Number(sink.area || 0), 0);
    return {
      factor,
      total: factor * area,
      netEmission: carbon.totalTon - factor * area,
    };
  }, [sink, carbon.totalTon]);

  const suggestions = useMemo(() => {
    const result = [];
    if (Number(farm.fertilizer) >= 800) {
      result.push({
        title: "肥料碳排偏高",
        text: "建議逐步減少化學肥料，搭配有機肥、綠肥或精準施肥，可作為減碳第一步。",
      });
    }
    if (Number(farm.diesel) >= 300) {
      result.push({
        title: "柴油使用量需要留意",
        text: "可評估農機共用、作業排程最佳化、電動農機或減少不必要的重複作業。",
      });
    }
    if (Number(farm.electricity) >= 1000) {
      result.push({
        title: "用電量偏高",
        text: "可檢查抽水、冷藏、溫室設備，並評估太陽能、節能馬達或智慧控制系統。",
      });
    }
    if (result.length === 0) {
      result.push({
        title: "目前排放量相對穩定",
        text: "可進一步記錄每季肥料、柴油與電力資料，建立自己的農場碳管理檔案。",
      });
    }
    return result;
  }, [farm]);

  const challengeResult = {
    reduceFertilizer: {
      title: "減少 20% 化學肥料",
      carbon: "碳排下降約 10–15%",
      cost: "短期成本可能略升",
      score: 86,
      advice: "適合搭配土壤檢測與有機質管理，避免影響產量。",
    },
    solar: {
      title: "導入太陽能與節能設備",
      carbon: "用電碳排明顯下降",
      cost: "初期投資較高",
      score: 82,
      advice: "適合用電量較高的溫室、冷藏與抽水設備。",
    },
    plantTrees: {
      title: "增加果樹、林帶與草生栽培",
      carbon: "碳匯能力提升",
      cost: "需要土地與維護時間",
      score: 90,
      advice: "最適合作為農場景觀、生態教育與碳匯教學案例。",
    },
  }[challengeChoice];

  function updateFarm(key, value) {
    setFarm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <main className="min-h-screen bg-[#f5fbf4] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/60 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
          <a href="#home" className="flex items-center gap-3">
            <img src={logo} alt="AI永續農業碳管理平台 Logo" className="h-12 w-12 rounded-2xl object-contain" />
            <div>
              <h1 className="text-lg font-black leading-tight text-emerald-950 md:text-xl">AI永續農業碳管理平台</h1>
              <p className="text-xs font-semibold text-slate-500">AI Agriculture Carbon Platform</p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-bold text-slate-700 lg:flex">
            <a href="#home" className="text-emerald-700">首頁</a>
            <a href="#calculator">碳排計算</a>
            <a href="#sink">碳匯模擬</a>
            <a href="#coach">AI診斷</a>
            <a href="#challenge">推演挑戰</a>
            <a href="#cases">案例學習</a>
          </nav>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden">
        <img src={heroImage} alt="AI永續農業碳管理平台首頁主視覺" className="h-[720px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/70 via-emerald-900/25 to-transparent" />
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-7xl items-center px-5">
            <div className="max-w-2xl text-white">
              <span className="inline-flex rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-black backdrop-blur">
                🌍 教育版永續農業碳管理平台 v1.1
              </span>
              <h2 className="mt-6 text-5xl font-black leading-tight md:text-7xl">
                看懂碳排放
                <span className="block text-lime-200">學會碳管理</span>
              </h2>
              <p className="mt-6 text-xl font-semibold leading-9 text-white/90">
                從碳排放到碳權，打造學生、教師與農民都能理解的永續農業學習平台。
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="#calculator" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-black text-white shadow-xl shadow-emerald-950/30 transition hover:-translate-y-0.5 hover:bg-emerald-700">
                  開始碳排計算 <ArrowRight className="h-5 w-5" />
                </a>
                <a href="#cases" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 text-lg font-black text-emerald-800 shadow-xl transition hover:-translate-y-0.5">
                  查看教學案例
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 md:grid-cols-5">
        {[
          { icon: Calculator, title: "碳排計算", text: "肥料、柴油、電力" },
          { icon: Trees, title: "碳匯模擬", text: "果園、竹林、森林" },
          { icon: Bot, title: "AI診斷", text: "找出高排放來源" },
          { icon: Gamepad2, title: "推演挑戰", text: "選擇永續策略" },
          { icon: BookOpen, title: "案例學習", text: "學生與農民看得懂" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-100/60">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-black text-emerald-950">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold text-slate-600">{item.text}</p>
            </div>
          );
        })}
      </section>

      <section id="calculator" className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_.9fr]">
          <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-xl shadow-emerald-100/70">
            <div className="flex items-center gap-3">
              <Calculator className="h-9 w-9 text-emerald-700" />
              <div>
                <h2 className="text-3xl font-black text-emerald-950">碳排計算中心</h2>
                <p className="mt-1 text-sm font-semibold text-slate-500">教育版簡化估算：肥料、柴油、電力</p>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Input label="作物名稱" value={farm.crop} onChange={(v) => updateFarm("crop", v)} />
              <Input label="種植面積（公頃）" type="number" value={farm.area} onChange={(v) => updateFarm("area", v)} />
              <Input label="肥料使用量（kg）" type="number" value={farm.fertilizer} onChange={(v) => updateFarm("fertilizer", v)} />
              <Input label="柴油使用量（L）" type="number" value={farm.diesel} onChange={(v) => updateFarm("diesel", v)} />
              <Input label="電力使用量（kWh）" type="number" value={farm.electricity} onChange={(v) => updateFarm("electricity", v)} />
            </div>

            <p className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm font-semibold leading-7 text-amber-800">
              這是教育版估算工具，係數採簡化設定，用於課堂理解碳排概念；正式碳盤查仍需依政府、ISO或專業盤查係數調整。
            </p>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-emerald-700 to-lime-600 p-8 text-white shadow-2xl shadow-emerald-200">
            <h3 className="text-2xl font-black">計算結果</h3>
            <div className="mt-6 grid gap-4">
              <ResultRow icon={Leaf} label="肥料碳排" value={`${formatNumber(kgToTon(carbon.fertilizerKg))} tCO₂e`} />
              <ResultRow icon={Fuel} label="柴油碳排" value={`${formatNumber(kgToTon(carbon.dieselKg))} tCO₂e`} />
              <ResultRow icon={Zap} label="電力碳排" value={`${formatNumber(kgToTon(carbon.electricityKg))} tCO₂e`} />
            </div>
            <div className="mt-8 rounded-3xl bg-white/18 p-6 backdrop-blur">
              <div className="text-sm font-bold text-lime-100">年度總碳排放</div>
              <div className="mt-2 text-5xl font-black">{formatNumber(carbon.totalTon)} tCO₂e</div>
              <div className="mt-3 text-sm font-semibold text-white/85">每公頃約 {formatNumber(carbon.perHectareTon)} tCO₂e</div>
            </div>
          </div>
        </div>
      </section>

      <section id="sink" className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1fr]">
          <div className="rounded-[2rem] border border-lime-100 bg-lime-50 p-8 shadow-xl shadow-lime-100/70">
            <div className="flex items-center gap-3">
              <Trees className="h-10 w-10 text-lime-700" />
              <div>
                <h2 className="text-3xl font-black text-emerald-950">碳匯模擬器</h2>
                <p className="mt-1 text-sm font-semibold text-slate-600">估算果園、竹林與森林每年吸碳能力</p>
              </div>
            </div>

            <div className="mt-8 grid gap-5">
              <label className="grid gap-2 text-sm font-black text-slate-700">
                選擇類型
                <select
                  value={sink.cropType}
                  onChange={(e) => setSink((prev) => ({ ...prev, cropType: e.target.value }))}
                  className="rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-base outline-none focus:ring-4 focus:ring-emerald-100"
                >
                  {Object.keys(sinkFactors).map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </label>
              <Input label="面積（公頃）" type="number" value={sink.area} onChange={(v) => setSink((prev) => ({ ...prev, area: v }))} />
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-xl shadow-emerald-100/70">
            <h3 className="text-2xl font-black text-emerald-950">碳匯估算結果</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <MiniStat label="每公頃吸碳" value={`${formatNumber(sinkResult.factor)} tCO₂e`} />
              <MiniStat label="總吸碳量" value={`${formatNumber(sinkResult.total)} tCO₂e`} />
              <MiniStat label="淨排放估算" value={`${formatNumber(sinkResult.netEmission)} tCO₂e`} />
            </div>
            <p className="mt-6 rounded-2xl bg-emerald-50 p-5 text-sm font-semibold leading-7 text-emerald-900">
              教學解讀：碳匯是農業重要價值之一。果樹、竹林、森林與土壤有機質都可能幫助固定碳，但實際碳匯仍需依樹種、樹齡、密度、土壤與管理方式調整。
            </p>
          </div>
        </div>
      </section>

      <section id="coach" className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-xl shadow-cyan-100/70">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-3">
                <Bot className="h-10 w-10 text-cyan-700" />
                <h2 className="text-3xl font-black text-emerald-950">AI永續農場診斷師</h2>
              </div>
              <p className="mt-3 max-w-3xl leading-8 text-slate-600">依照目前輸入的肥料、柴油與電力資料，產生學生與農民都看得懂的改善建議。</p>
            </div>
            <div className="rounded-3xl bg-cyan-50 px-6 py-4 text-center">
              <div className="text-sm font-bold text-cyan-700">永續診斷分數</div>
              <div className="text-4xl font-black text-cyan-800">{Math.max(60, 95 - Math.round(carbon.totalTon * 5))}</div>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {suggestions.map((item) => (
              <div key={item.title} className="rounded-3xl bg-slate-50 p-6">
                <ShieldCheck className="h-7 w-7 text-emerald-600" />
                <h3 className="mt-4 text-lg font-black text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="challenge" className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 to-emerald-950 p-8 text-white shadow-2xl">
          <div className="flex items-center gap-3">
            <Gamepad2 className="h-10 w-10 text-lime-300" />
            <h2 className="text-3xl font-black">碳權推演挑戰</h2>
          </div>
          <p className="mt-4 max-w-3xl leading-8 text-white/80">情境：你的農場想要降低碳排，並提升未來參與碳權或永續認證的能力。請選擇一種策略。</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["reduceFertilizer", "減少化學肥料"],
              ["solar", "導入太陽能設備"],
              ["plantTrees", "增加果樹與林帶"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setChallengeChoice(value)}
                className={`rounded-3xl px-6 py-5 text-left font-black transition ${challengeChoice === value ? "bg-lime-400 text-emerald-950" : "bg-white/10 text-white hover:bg-white/20"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-3xl bg-white/10 p-6 backdrop-blur">
            <h3 className="text-2xl font-black text-lime-200">{challengeResult.title}</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-4">
              <MiniStat dark label="碳排變化" value={challengeResult.carbon} />
              <MiniStat dark label="成本變化" value={challengeResult.cost} />
              <MiniStat dark label="永續分數" value={`${challengeResult.score} 分`} />
              <MiniStat dark label="AI建議" value={challengeResult.advice} />
            </div>
          </div>
        </div>
      </section>

      <section id="cases" className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-center">
          <BookOpen className="mx-auto h-12 w-12 text-emerald-700" />
          <h2 className="mt-4 text-4xl font-black text-emerald-950">案例學習資料庫</h2>
          <p className="mt-4 text-slate-600">先看案例，再學計算，讓學生與一般農民更容易理解碳管理。</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cases.map((item) => (
            <article key={item.title} className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-100/60">
              <div className="text-4xl">{item.icon}</div>
              <h3 className="mt-4 text-xl font-black text-emerald-950">{item.title}</h3>
              <div className="mt-4 space-y-2 text-sm font-semibold text-slate-600">
                <p>作物：{item.crop}</p>
                <p>面積：{item.area}</p>
                <p>結果：{item.result}</p>
              </div>
              <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold leading-7 text-emerald-900">{item.lesson}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="bg-emerald-950 px-5 py-14 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <Globe2 className="mx-auto h-12 w-12 text-lime-300" />
          <h2 className="mt-5 text-3xl font-black">AI永續農業碳管理平台</h2>
          <p className="mt-4 leading-8 text-white/75">
            讓每一位學生看懂碳排放，讓每一位教師教得懂永續，讓每一位農民學會碳管理。
          </p>
        </div>
      </footer>
    </main>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-base outline-none focus:ring-4 focus:ring-emerald-100"
      />
    </label>
  );
}

function ResultRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/14 p-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-lime-200" />
        <span className="font-bold">{label}</span>
      </div>
      <span className="font-black">{value}</span>
    </div>
  );
}

function MiniStat({ label, value, dark = false }) {
  return (
    <div className={`rounded-2xl p-5 ${dark ? "bg-white/10" : "bg-white"}`}>
      <div className={`text-sm font-bold ${dark ? "text-lime-200" : "text-slate-500"}`}>{label}</div>
      <div className={`mt-2 text-lg font-black leading-7 ${dark ? "text-white" : "text-emerald-950"}`}>{value}</div>
    </div>
  );
}
