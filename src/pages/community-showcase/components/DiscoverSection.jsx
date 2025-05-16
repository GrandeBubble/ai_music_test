import React, { useState } from "react";

import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import MusicCard from "./MusicCard";

const DiscoverSection = ({ musicItems, currentlyPlaying, togglePlay, isLoading }) => {
  const [discoverMode, setDiscoverMode] = useState("personalized");

  // Mock personalized recommendations
  const personalizedItems = musicItems.slice(0, 3);

  // Mock new releases
  const newReleases = [...musicItems].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);

  // Mock experimental content
  const experimentalItems = musicItems.filter(item =>
    item.tags.includes("experimental") ||
    item.tags.includes("fusion") ||
    item.description.toLowerCase().includes("experiment")
  ).slice(0, 3);

  const getDiscoverItems = () => {
    switch (discoverMode) {
      case "personalized":
        return personalizedItems;
      case "new":
        return newReleases;
      case "experimental":
        return experimentalItems;
      default:
        return personalizedItems;
    }
  };

  const discoverItems = getDiscoverItems();

  if (isLoading) {
    return (
      <div className="mt-8">
        <div className="bg-surface rounded-xl p-6 mb-8 animate-pulse h-64"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-surface rounded-xl h-64 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Discover Header */}
      <div className="bg-surface rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="heading-large mb-2">AI智能发现</h2>
            <p className="text-text-secondary max-w-2xl">
              我们的AI会分析您的聆听模式和创作偏好，为您推荐可能带来灵感的音乐。
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="bg-surface-alt rounded-lg p-1 flex">
              <button
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${discoverMode === "personalized" ? "bg-primary text-text-primary" : "hover:bg-opacity-80"
                  }`}
                onClick={() => setDiscoverMode("personalized")}
              >
                为你推荐
              </button>

              <button
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${discoverMode === "new" ? "bg-primary text-text-primary" : "hover:bg-opacity-80"
                  }`}
                onClick={() => setDiscoverMode("new")}
              >
                最新发现
              </button>

              <button
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${discoverMode === "experimental" ? "bg-primary text-text-primary" : "hover:bg-opacity-80"
                  }`}
                onClick={() => setDiscoverMode("experimental")}
              >
                实验性创新
              </button>
            </div>
          </div>
        </div>

        <div className="bg-surface-alt rounded-lg p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-4">
            <Icon name="Sparkles" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="heading-small mb-1">
              {discoverMode === "personalized" && "个性化推荐"}
              {discoverMode === "new" && "Fresh Creations"}
              {discoverMode === "experimental" && "Boundary-Pushing Music"}
            </h3>
            <p className="text-sm text-text-secondary">
              {discoverMode === "personalized" && "基于您的聆听习惯和创作偏好，AI为您推荐的音乐。"}
              {discoverMode === "new" && "The latest uploads from our community creators."}
              {discoverMode === "experimental" && "Innovative works that push the boundaries of AI music creation."}
            </p>
          </div>
        </div>
      </div>

      {/* Discover Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {discoverItems.map(item => (
          <MusicCard
            key={item.id}
            item={item}
            isPlaying={currentlyPlaying === item.id}
            onTogglePlay={() => togglePlay(item.id)}
          />
        ))}
      </div>

      {/* Weekly Feature */}
      <div className="bg-surface rounded-xl overflow-hidden mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 lg:h-auto">
            <Image
              src="https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Weekly Feature"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent lg:bg-gradient-to-t"></div>

            <div className="absolute bottom-4 left-4 lg:top-4 lg:left-4 bg-primary rounded-full px-3 py-1 text-sm font-medium">
              每周精选
            </div>
          </div>

          <div className="p-6">
            <h2 className="heading-large mb-2">创作者聚焦：AmbientDreamer</h2>
            <p className="text-text-secondary mb-4">
              本周我们聚焦创作者AmbientDreamer，其创新地使用环境录音和AI作曲，打造了独特的声音景观，吸引了整个社区的关注。
            </p>

            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="AmbientDreamer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium">AmbientDreamer</div>
                <div className="text-sm text-text-tertiary">12部作品 • 2.4万次播放</div>
              </div>
            </div>

            <p className="text-text-secondary mb-6">
              "我一直在尝试将自然声音输入AI，观察它如何诠释和构建这些有机的基础。结果非常有趣——这就像通过技术与自然合作。"
            </p>

            <div className="flex space-x-3">
              <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 flex items-center">
                <Icon name="User" size={18} className="mr-2" />
                <span>查看个人主页</span>
              </button>

              <button className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 flex items-center">
                <Icon name="Music" size={18} className="mr-2" />
                <span>聆听作品</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Community Challenge */}
      <div className="bg-surface rounded-xl p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-accent-3 bg-opacity-20 flex items-center justify-center mr-4">
            <Icon name="Trophy" size={20} className="text-accent-3" />
          </div>
          <h2 className="heading-large">社区挑战</h2>
        </div>

        <div className="bg-surface-alt rounded-lg p-6 mb-6">
          <h3 className="heading-medium mb-2">本周主题："城市之声"</h3>
          <p className="text-text-secondary mb-4">
            创作一段捕捉城市生活本质的音乐。使用你所在城市的环境录音，或使用我们的城市声音库作为AI的素材来源。
          </p>

          <div className="flex items-center justify-between text-sm text-text-tertiary mb-4">
            <div className="flex items-center">
              <Icon name="Users" size={16} className="mr-1" />
              <span>42名参与者</span>
            </div>
            <div className="flex items-center">
              <Icon name="Calendar" size={16} className="mr-1" />
              <span>剩余5天</span>
            </div>
          </div>

          <button className="w-full py-3 rounded-lg bg-accent-3 hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center">
            <Icon name="PlusCircle" size={18} className="mr-2" />
            <span>加入挑战</span>
          </button>
        </div>

        <div className="text-center">
          <h3 className="heading-small mb-2">上周冠军</h3>
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image
                src="https://randomuser.me/api/portraits/men/62.jpg"
                alt="FusionMaestro"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium">融合创新</span>
          </div>
          <p className="text-sm text-text-secondary">
            作品《量子灵魂》凭借传统爵士乐与电子元素的创新融合，赢得了我们的"爵士新演绎"挑战。
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscoverSection;