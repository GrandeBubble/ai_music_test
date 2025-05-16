import React, { useState, useEffect } from "react";

import Icon from "../../components/AppIcon";
import Header from "../home-page/components/Header";
import Sidebar from "./components/Sidebar";
import MusicCard from "./components/MusicCard";
import FilterBar from "./components/FilterBar";
import TrendingCategories from "./components/TrendingCategories";
import StaffPicks from "./components/StaffPicks";
import InspiredBySection from "./components/InspiredBySection";
import DiscoverSection from "./components/DiscoverSection";

const CommunityShowcase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("trending");
  const [musicItems, setMusicItems] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  // Mock data for community showcase music items
  const mockMusicItems = [
    {
      id: 1,
      title: "霓虹梦境",
      creator: "SynthWave42",
      creatorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      type: "类型融合",
      artwork: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2070&auto=format&fit=crop",
      waveform: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "3:42",
      plays: 12453,
      likes: 876,
      comments: 124,
      createdAt: "2023-11-15T14:30:00",
      tags: ["合成波", "电子", "复古"],
      isTrending: true,
      isStaffPick: true,
      description: `这首曲目结合了80年代的合成波元素和现代电子制作技术。我使用AI生成了初始的合成器模式，然后手动进行了优化。贝斯线完全是基于我的哼唱输入由AI生成的。

混响重的鼓声是使用节奏生成器并设置“80年代门限混响”风格参数创建的。我特别为AI帮助我在桥段部分制作琶音感到自豪——这是我手动制作时一直很难做到的。`,
      aiParameters: {
        genreA: "合成波",
        genreB: "现代电子",
        blendRatio: 0.7,
        tempo: 108,
        key: "F小调"
      }
    },
    {
      id: 2,
      title: "雨的低语",
      creator: "AmbientDreamer",
      creatorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      type: "作曲",
      artwork: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      waveform: "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "5:18",
      plays: 8732,
      likes: 1243,
      comments: 89,
      createdAt: "2023-12-02T09:15:00",
      tags: ["氛围", "放松", "自然"],
      isTrending: true,
      isStaffPick: false,
      description: `我录制了窗外的实际雨声，并将其作为素材输入AI。整首曲目围绕雨声的自然节奏构建，AI生成了与雨声节奏相辅相成的钢琴旋律。

我在作曲引擎中使用了“自然元素”参数，以确保合成元素与有机雨声无缝融合。中间部分的生成大提琴部分是我从未想到会加入的，但它的效果非常出色。`,
      aiParameters: {
        sourceAudio: "自然雨声录音",
        mood: "沉思",
        instruments: ["钢琴", "弦乐", "合成器"],
        tempo: 72,
        key: "D大调"
      }
    },
    {
      id: 3,
      title: "量子灵魂",
      creator: "FusionMaestro",
      creatorAvatar: "https://randomuser.me/api/portraits/men/62.jpg",
      type: "类型融合",
      artwork: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      waveform: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "4:27",
      plays: 15678,
      likes: 2341,
      comments: 312,
      createdAt: "2023-10-18T16:45:00",
      tags: ["爵士", "电子", "融合"],
      isTrending: true,
      isStaffPick: true,
      description: `这是一次将传统爵士即兴演奏与电子制作相结合的实验。我弹奏了一段简短的爵士钢琴即兴片段，并要求AI将其扩展为带有电子元素的完整作品。

AI保留了爵士和弦进行，同时添加了电子节拍和合成器元素，这些元素与爵士基础相辅相成而非喧宾夺主。我对它如何在保留即兴感的同时增加结构感到惊讶。`,
      aiParameters: {
        genreA: "爵士",
        genreB: "电子",
        blendRatio: 0.6,
        preserveImprovisation: true,
        tempo: 92,
        key: "降B小调"
      }
    },
    {
      id: 4,
      title: "水晶和声",
      creator: "VocalAlchemist",
      creatorAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
      type: "人声调谐",
      artwork: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
      waveform: "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "3:56",
      plays: 9876,
      likes: 1567,
      comments: 203,
      createdAt: "2023-11-25T11:20:00",
      tags: ["人声", "空灵", "和声"],
      isTrending: false,
      isStaffPick: true,
      description: `我录制了一条简单的旋律线，并使用AI人声倍增器创建了一个由我自己声音和声化的合唱团。AI生成了我自己都想不到的和声。

最有趣的部分是使用了“晶体”人声效果参数，它添加了这些美丽的高频音效，听起来像是伴随人声的小玻璃铃声。没有使用其他乐器——你听到的一切都源自我的原始人声轨道。`,
      aiParameters: {
        voiceMultiplier: 6,
        harmonizationStyle: "空灵",
        effectProfile: "晶体",
        formant: 1.2,
        vibrato: 0.4
      }
    },
    {
      id: 5,
      title: "轨道下降",
      creator: "CosmicProducer",
      creatorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
      type: "作曲",
      artwork: "https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      waveform: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "6:12",
      plays: 7432,
      likes: 987,
      comments: 76,
      createdAt: "2023-09-30T15:10:00",
      tags: ["太空", "氛围", "电子"],
      isTrending: false,
      isStaffPick: false,
      description: `我想创造一个模拟从太空到行星表面轨道下降的声音旅程。我从描述这一旅程的文本提示开始，让AI生成了整首曲目。

AI创造了一个完美的张力与释放的弧线，从稀疏的高频声音开始，逐渐加入更多的中低频元素，随着“下降”的进行而发展。我只对混音进行了微调——作品本身几乎完全是AI生成的。`,
      aiParameters: {
        narrativePrompt: "从太空到行星表面的轨道下降",
        emotionalArc: "惊奇到紧张到平静",
        soundPalette: "宇宙",
        tempo: 85,
        duration: "6:00+"
      }
    },
    {
      id: 6,
      title: "民谣未来",
      creator: "TradModernist",
      creatorAvatar: "https://randomuser.me/api/portraits/women/62.jpg",
      type: "类型融合",
      artwork: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      waveform: "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "4:05",
      plays: 6543,
      likes: 876,
      comments: 92,
      createdAt: "2023-10-05T19:30:00",
      tags: ["民谣", "未来感", "实验性"],
      isTrending: false,
      isStaffPick: false,
      description: `这个项目始于我祖父的传统爱尔兰民谣录音，我从旧磁带中将其数字化。我将这些录音输入AI，并要求它在保留情感核心的同时用未来感的电子元素重新构想它们。

AI保留了旋律结构，甚至是那些赋予民谣人性化特质的轻微时间偏差，同时加入了不断变化的合成器纹理和微妙的电子打击乐。这就像听到我祖父的音乐在时间中回响。`,
      aiParameters: {
        sourceAudio: "传统爱尔兰民谣录音",
        modernizationLevel: 0.7,
        preserveAuthenticity: true,
        genreInfluence: "电子氛围",
        tempo: "原始"
      }
    }
  ];

  // Load music items
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMusicItems(mockMusicItems);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter music items based on search query and selected tags
  const filteredMusicItems = musicItems.filter(item => {
    // Filter by search query
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Filter by selected tags
    const matchesTags = selectedTags.length === 0 ||
      selectedTags.some(tag => item.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  // Get trending items
  const trendingItems = musicItems.filter(item => item.isTrending);

  // Get staff picks
  const staffPickItems = musicItems.filter(item => item.isStaffPick);

  // Toggle play/pause for a music item
  const togglePlay = (id) => {
    if (currentlyPlaying === id) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(id);
    }
  };

  // Add or remove a tag from selected tags
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title and Description */}
            <div className="mb-8">
              <h1 className="display-small mb-2">社区空间</h1>
              <p className="body-medium text-text-secondary max-w-3xl">
                探索和发现由AI音乐社区创作的音乐。获取灵感，与创作者联系，并分享您自己的作品。
              </p>
              <p className="body-medium text-text-secondary max-w-3xl">
                获取灵感，与创作者联系，并分享您自己的作品。
              </p>
            </div>

            {/* Filter Bar */}
            <FilterBar
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              selectedTags={selectedTags}
              toggleTag={toggleTag}
            />

            {/* Content based on active filter */}
            {activeFilter === "trending" && (
              <div className="mt-8">
                {/* Trending Categories */}
                <TrendingCategories
                  trendingItems={trendingItems}
                  currentlyPlaying={currentlyPlaying}
                  togglePlay={togglePlay}
                  isLoading={isLoading}
                />

                {/* Staff Picks */}
                <StaffPicks
                  staffPickItems={staffPickItems}
                  currentlyPlaying={currentlyPlaying}
                  togglePlay={togglePlay}
                  isLoading={isLoading}
                />

                {/* All Music Grid */}
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="heading-large">所有社区音乐</h2>
                    <div className="flex items-center text-text-secondary">
                      <span className="mr-2">排序方式：</span>
                      <select className="bg-surface-alt border-none rounded-lg py-1 px-3 focus:ring-primary focus:ring-2 focus:outline-none text-sm">
                        <option>最流行的</option>
                        <option>从新到旧</option>
                        <option>从旧到新t</option>
                        <option>最多点赞</option>
                      </select>
                    </div>
                  </div>

                  {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="bg-surface rounded-xl h-64 animate-pulse"></div>
                      ))}
                    </div>
                  ) : filteredMusicItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredMusicItems.map(item => (
                        <MusicCard
                          key={item.id}
                          item={item}
                          isPlaying={currentlyPlaying === item.id}
                          onTogglePlay={() => togglePlay(item.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                      <div className="w-16 h-16 rounded-full bg-surface-alt flex items-center justify-center mb-6">
                        <Icon name="Search" size={32} className="text-text-tertiary" />
                      </div>
                      <h2 className="heading-large mb-3">没有找到音乐</h2>
                      <p className="text-text-secondary max-w-md mb-6">
                        我们无法找到任何与您的搜索或筛选条件匹配的音乐。尝试调整您的标准。
                      </p>
                      <button
                        className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedTags([]);
                        }}
                      >
                        清除所有选项
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeFilter === "inspired" && (
              <InspiredBySection
                musicItems={musicItems}
                currentlyPlaying={currentlyPlaying}
                togglePlay={togglePlay}
                isLoading={isLoading}
              />
            )}

            {activeFilter === "discover" && (
              <DiscoverSection
                musicItems={musicItems}
                currentlyPlaying={currentlyPlaying}
                togglePlay={togglePlay}
                isLoading={isLoading}
              />
            )}

            {/* Call to Action */}
            <div className="mt-16 mb-8 bg-surface rounded-xl p-8 text-center">
              <h2 className="heading-large mb-4">分享你的创作</h2>
              <p className="text-text-secondary max-w-2xl mx-auto mb-6">
                准备好向社区展示您由AI驱动的音乐吗？分享您的创作并获得来自其他音乐家和创作者的反馈。
              </p>
              <button className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 flex items-center justify-center mx-auto">
                <Icon name="Upload" size={18} className="mr-2" />
                <span>分享你的创作</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommunityShowcase;