import {
  Leaf,
  Calculator,
  Trees,
  Bot,
  Gamepad2,
  BookOpen,
  BarChart3,
  Globe2,
  ArrowRight
} from "lucide-react";

import heroImage from "./assets/images/hero-carbon.png";
import logo from "./assets/images/logo-carbon.png";

export default function App() {

  const features = [
    {
      icon: Calculator,
      title: "碳排計算中心",
      desc: "快速計算農業活動產生的碳排放量"
    },
    {
      icon: Trees,
      title: "碳匯模擬器",
      desc: "模擬農田、果園與森林的碳吸收能力"
    },
    {
      icon: Bot,
      title: "AI永續診斷",
      desc: "AI分析農場碳排與改善建議"
    },
    {
      icon: Gamepad2,
      title: "推演挑戰",
      desc: "情境模擬學習永續決策"
    },
    {
      icon: BookOpen,
      title: "案例學習",
      desc: "從真實農業案例理解碳管理"
    }
  ];

  const stats = [
    {
      number: "500+",
      label: "案例資料"
    },
    {
      number: "100+",
      label: "支援作物"
    },
    {
      number: "30+",
      label: "學習模組"
    },
    {
      number: "10000+",
      label: "AI分析次數"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Navbar */}

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <img
              src={logo}
              alt=""
              className="w-12 h-12"
            />

            <div>
              <h1 className="font-bold text-xl">
                AI永續農業碳管理平台
              </h1>

              <p className="text-sm text-slate-500">
                AI Agriculture Carbon Platform
              </p>
            </div>

          </div>

          <nav className="hidden md:flex gap-8 font-medium">

            <a href="#">首頁</a>
            <a href="#">學習中心</a>
            <a href="#">碳排計算</a>
            <a href="#">碳匯模擬</a>
            <a href="#">AI診斷</a>
            <a href="#">案例學習</a>

          </nav>

        </div>

      </header>

      {/* Hero */}

      <section className="relative overflow-hidden">

        <img
          src={heroImage}
          alt=""
          className="w-full h-[760px] object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0">

          <div className="max-w-7xl mx-auto h-full px-6 flex items-center">

            <div className="max-w-2xl text-white">

              <h2 className="text-6xl font-black leading-tight">

                看懂碳排放

                <br />

                學會碳管理

                <br />

                打造永續未來農業

              </h2>

              <p className="mt-8 text-xl leading-9">

                從碳排放到碳權，

                打造學生、教師與農民都能理解的

                永續農業學習平台。

              </p>

              <div className="flex gap-4 mt-10">

                <button className="bg-emerald-600 px-8 py-4 rounded-2xl font-bold">

                  開始學習

                </button>

                <button className="bg-white text-slate-800 px-8 py-4 rounded-2xl font-bold">

                  碳排計算

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* 五大功能 */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <h2 className="text-4xl font-black text-center">

          五大核心功能

        </h2>

        <div className="grid md:grid-cols-5 gap-6 mt-12">

          {features.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="bg-white rounded-3xl p-6 shadow-lg"
              >

                <Icon
                  className="w-12 h-12 text-emerald-600"
                />

                <h3 className="font-bold mt-4">

                  {item.title}

                </h3>

                <p className="text-sm text-slate-600 mt-3">

                  {item.desc}

                </p>

              </div>

            );

          })}
        </div>

      </section>

      {/* 統計區 */}

      <section className="bg-emerald-700 text-white py-20">

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center">

          {stats.map((item) => (

            <div key={item.label}>

              <div className="text-5xl font-black">

                {item.number}

              </div>

              <div className="mt-3">

                {item.label}

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* AI診斷 */}

      <section className="max-w-6xl mx-auto px-6 py-24">

        <div className="bg-white rounded-[40px] shadow-xl p-10">

          <div className="flex items-center gap-4">

            <Bot className="w-10 h-10 text-emerald-600" />

            <h2 className="text-4xl font-black">

              AI永續農場診斷

            </h2>

          </div>

          <p className="mt-6 text-lg text-slate-600">

            輸入農場資料，

            AI將分析碳排放、碳匯能力與改善建議。

          </p>

          <button className="mt-8 bg-emerald-600 text-white px-8 py-4 rounded-2xl flex items-center gap-2">

            開始診斷

            <ArrowRight />

          </button>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-slate-900 text-white py-20">

        <div className="max-w-6xl mx-auto text-center">

          <Globe2 className="w-12 h-12 mx-auto text-emerald-400" />

          <h3 className="text-3xl font-black mt-6">

            AI永續農業碳管理平台

          </h3>

          <p className="mt-6 text-slate-300">

            讓每一位學生看懂碳排放

            <br />

            讓每一位教師教得懂永續

            <br />

            讓每一位農民學會碳管理

          </p>

        </div>

      </footer>

    </div>
  );
}