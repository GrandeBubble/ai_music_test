import React, { useState, useEffect } from "react";
// 导入头部组件
import Header from "./components/Header";
// 导入侧边栏组件
import Sidebar from "./components/Sidebar";
// 导入流派选择器组件
import GenreSelector from "./components/GenreSelector";
// 导入混音控制台组件
import MixingConsole from "./components/MixingConsole";
// 导入融合可视化组件
import FusionVisualizer from "./components/FusionVisualizer";
// 导入历史记录面板组件
import HistoryPanel from "./components/HistoryPanel";
// 导入预设管理器组件
import PresetManager from "./components/PresetManager";
// 导入音频预览组件
import AudioPreview from "./components/AudioPreview";

const GenreFusionLaboratory = () => {
  // 用于表示是否正在加载数据，初始值为 true
  const [isLoading, setIsLoading] = useState(true);
  // 用于存储选中的流派 A，初始值为 null
  const [selectedGenreA, setSelectedGenreA] = useState(null);
  // 用于存储选中的流派 B，初始值为 null
  const [selectedGenreB, setSelectedGenreB] = useState(null);
  // 用于存储融合的平衡值，初始值为 50
  const [fusionBalance, setFusionBalance] = useState(50);
  // 用于存储融合历史记录，初始值为空数组
  const [fusionHistory, setFusionHistory] = useState([]);
  // 用于存储预设，初始值为空数组
  const [presets, setPresets] = useState([]);
  // 用于表示音频是否正在播放，初始值为 false
  const [isPlaying, setIsPlaying] = useState(false);
  // 用于表示是否显示高级选项，初始值为 false
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // 流派的模拟数据
  const genreCategories = [
    {
      id: "era-1950s",
      name: "20 世纪 50 年代",
      genres: [
        {
          id: "rock-n-roll",
          name: "摇滚乐",
          image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1469&auto=format&fit=crop",
          characteristics: {
            rhythm: 75, // 节奏
            melody: 60, // 旋律
            harmony: 50, // 和声
            instrumentation: 65, // 乐器演奏
            energy: 80 // 能量
          }
        },
        {
          id: "doo-wop",
          name: "嘟喔普（一种音乐风格）",
          image: "https://images.pexels.com/photos/4571219/pexels-photo-4571219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          characteristics: {
            rhythm: 60,
            melody: 85,
            harmony: 80,
            instrumentation: 55,
            energy: 65
          }
        }
      ]
    },
    {
      id: "era-1970s",
      name: "20 世纪 70 年代",
      genres: [
        {
          id: "disco",
          name: "迪斯科",
          image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          characteristics: {
            rhythm: 90,
            melody: 70,
            harmony: 65,
            instrumentation: 75,
            energy: 85
          }
        },
        {
          id: "funk",
          name: "放克",
          image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          characteristics: {
            rhythm: 95,
            melody: 65,
            harmony: 70,
            instrumentation: 80,
            energy: 90
          }
        }
      ]
    },
    {
      id: "region-asia",
      name: "亚洲地区",
      genres: [
        {
          id: "k-pop",
          name: "韩国流行音乐",
          image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          characteristics: {
            rhythm: 85,
            melody: 80,
            harmony: 75,
            instrumentation: 85,
            energy: 90
          }
        },
        {
          id: "bollywood",
          name: "宝莱坞（印度电影音乐风格）",
          image: "https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          characteristics: {
            rhythm: 90,
            melody: 85,
            harmony: 70,
            instrumentation: 80,
            energy: 85
          }
        }
      ]
    },
    {
      id: "electronic",
      name: "电子音乐",
      genres: [
        {
          id: "techno",
          name: "科技舞曲",
          image: "https://images.pexels.com/photos/1540319/pexels-photo-1540319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          characteristics: {
            rhythm: 95,
            melody: 50,
            harmony: 60,
            instrumentation: 70,
            energy: 90
          }
        },
        {
          id: "ambient",
          name: "氛围音乐",
          image: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          characteristics: {
            rhythm: 40,
            melody: 75,
            harmony: 85,
            instrumentation: 65,
            energy: 30
          }
        }
      ]
    }
  ];

  // 融合历史记录的模拟数据
  const mockFusionHistory = [
    {
      id: 1,
      date: new Date(Date.now() - 3600000 * 24 * 2),
      genreA: {
        id: "techno",
        name: "科技舞曲"
      },
      genreB: {
        id: "bollywood",
        name: "宝莱坞（印度电影音乐风格）"
      },
      balance: 60,
      duration: "3分42秒",
      thumbnail: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      date: new Date(Date.now() - 3600000 * 24 * 5),
      genreA: {
        id: "funk",
        name: "放克"
      },
      genreB: {
        id: "k-pop",
        name: "韩国流行音乐"
      },
      balance: 45,
      duration: "4分15秒",
      thumbnail: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  // 预设的模拟数据
  const mockPresets = [
    {
      id: 1,
      name: "科技舞曲 - 宝莱坞融合",
      genreA: {
        id: "techno",
        name: "科技舞曲"
      },
      genreB: {
        id: "bollywood",
        name: "宝莱坞（印度电影音乐风格）"
      },
      balance: 60,
      settings: {
        tempoSync: 85, // 节奏同步
        keyMatching: true, // 调匹配
        transitionSmoothness: 70 // 过渡平滑度
      }
    },
    {
      id: 2,
      name: "复古放克 - 流行音乐",
      genreA: {
        id: "funk",
        name: "放克"
      },
      genreB: {
        id: "k-pop",
        name: "韩国流行音乐"
      },
      balance: 45,
      settings: {
        tempoSync: 90,
        keyMatching: true,
        transitionSmoothness: 65
      }
    }
  ];

  // 加载数据
  useEffect(() => {
    // 模拟 API 调用
    setTimeout(() => {
      setFusionHistory(mockFusionHistory);
      setPresets(mockPresets);
      setIsLoading(false);
    }, 800);
  }, []);

  // 处理流派选择
  const handleGenreSelect = (genre, channel) => {
    if (channel === 'A') {
      setSelectedGenreA(genre);
    } else {
      setSelectedGenreB(genre);
    }
  };

  // 处理融合平衡值的变化
  const handleBalanceChange = (value) => {
    setFusionBalance(value);
  };

  // 生成随机的流派组合
  const handleSurpriseMe = () => {
    const allGenres = genreCategories.flatMap(category => category.genres);
    const randomGenreA = allGenres[Math.floor(Math.random() * allGenres.length)];

    // 确保流派 B 与流派 A 不同
    let randomGenreB;
    do {
      randomGenreB = allGenres[Math.floor(Math.random() * allGenres.length)];
    } while (randomGenreB.id === randomGenreA.id);

    setSelectedGenreA(randomGenreA);
    setSelectedGenreB(randomGenreB);
    setFusionBalance(Math.floor(Math.random() * 40) + 30); // 随机平衡值在 30 到 70 之间
  };

  // 创建新的融合
  const handleCreateFusion = () => {
    if (!selectedGenreA || !selectedGenreB) return;

    const newFusion = {
      id: Date.now(),
      date: new Date(),
      genreA: {
        id: selectedGenreA.id,
        name: selectedGenreA.name
      },
      genreB: {
        id: selectedGenreB.id,
        name: selectedGenreB.name
      },
      balance: fusionBalance,
      duration: `${Math.floor(Math.random() * 4) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      thumbnail: selectedGenreA.image
    };

    setFusionHistory([newFusion, ...fusionHistory]);
  };

  // 保存预设
  const handleSavePreset = (name) => {
    if (!selectedGenreA || !selectedGenreB || !name) return;

    const newPreset = {
      id: Date.now(),
      name,
      genreA: {
        id: selectedGenreA.id,
        name: selectedGenreA.name
      },
      genreB: {
        id: selectedGenreB.id,
        name: selectedGenreB.name
      },
      balance: fusionBalance,
      settings: {
        tempoSync: 85,
        keyMatching: true,
        transitionSmoothness: 70
      }
    };

    setPresets([newPreset, ...presets]);
  };

  // 加载预设
  const handleLoadPreset = (preset) => {
    const genreA = genreCategories
      .flatMap(category => category.genres)
      .find(genre => genre.id === preset.genreA.id);

    const genreB = genreCategories
      .flatMap(category => category.genres)
      .find(genre => genre.id === preset.genreB.id);

    setSelectedGenreA(genreA);
    setSelectedGenreB(genreB);
    setFusionBalance(preset.balance);
  };

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主要内容 */}
      <div className="flex-1 flex flex-col">
        {/* 头部 */}
        <Header />

        {/* 主要内容区域 */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* 页面标题和操作 */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="display-small mb-2">曲风融合实验室</h1>
                <p className="body-medium text-text-secondary">
                  通过人工智能技术融合不同的音乐流派来创作创新音乐
                </p>
              </div>

              <div className="flex items-center mt-4 md:mt-0 space-x-3">
                {/* <button
                  onClick={handleSurpriseMe}
                  className="flex items-center px-4 py-2 rounded-lg bg-accent-3 hover:bg-opacity-80 transition-all duration-300"
                >
                  <span>给我惊喜</span>
                </button> */}

                <button
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="flex items-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                >
                  <span>{showAdvancedOptions ? "隐藏高级选项" : "显示高级选项"}</span>
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl h-96 animate-pulse"></div>
                <div className="bg-surface rounded-xl h-96 animate-pulse"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 左侧面板 - 流派 A 选择 */}
                <div className="bg-surface rounded-xl overflow-hidden">
                  <GenreSelector
                    title="流派 A"
                    accentColor="accent-2"
                    genreCategories={genreCategories}
                    selectedGenre={selectedGenreA}
                    onSelectGenre={(genre) => handleGenreSelect(genre, 'A')}
                  />
                </div>

                {/* 中间面板 - 混音控制台 */}
                <div className="bg-surface rounded-xl overflow-hidden">
                  <MixingConsole
                    genreA={selectedGenreA}
                    genreB={selectedGenreB}
                    fusionBalance={fusionBalance}
                    onBalanceChange={handleBalanceChange}
                    showAdvancedOptions={showAdvancedOptions}
                    onCreateFusion={handleCreateFusion}
                  />
                </div>

                {/* 右侧面板 - 流派 B 选择 */}
                <div className="bg-surface rounded-xl overflow-hidden">
                  <GenreSelector
                    title="流派 B"
                    accentColor="accent-1"
                    genreCategories={genreCategories}
                    selectedGenre={selectedGenreB}
                    onSelectGenre={(genre) => handleGenreSelect(genre, 'B')}
                  />
                </div>
              </div>
            )}

            {/* 融合可视化 */}
            {/* {selectedGenreA && selectedGenreB && (
              <FusionVisualizer
                genreA={selectedGenreA}
                genreB={selectedGenreB}
                fusionBalance={fusionBalance}
                className="mt-6"
              />
            )} */}

            {/* 音频预览 */}
            {selectedGenreA && selectedGenreB && (
              <AudioPreview
                genreA={selectedGenreA}
                genreB={selectedGenreB}
                fusionBalance={fusionBalance}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                className="mt-6"
              />
            )}

            {/* 历史记录和预设 */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* 历史记录面板 */}
              <HistoryPanel
                fusionHistory={fusionHistory}
                onLoadFusion={(fusion) => {
                  const genreA = genreCategories
                    .flatMap(category => category.genres)
                    .find(genre => genre.id === fusion.genreA.id);

                  const genreB = genreCategories
                    .flatMap(category => category.genres)
                    .find(genre => genre.id === fusion.genreB.id);

                  setSelectedGenreA(genreA);
                  setSelectedGenreB(genreB);
                  setFusionBalance(fusion.balance);
                }}
              />

              {/* 预设管理 */}
              <PresetManager
                presets={presets}
                onSavePreset={handleSavePreset}
                onLoadPreset={handleLoadPreset}
                selectedGenreA={selectedGenreA}
                selectedGenreB={selectedGenreB}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GenreFusionLaboratory;