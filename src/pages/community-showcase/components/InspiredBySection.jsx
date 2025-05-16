import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import MusicCard from "./MusicCard";

const InspiredBySection = ({ musicItems, currentlyPlaying, togglePlay, isLoading }) => {
  const [selectedMusic, setSelectedMusic] = useState(null);

  // Get a random music item to be inspired by if none is selected
  const getInspiration = () => {
    if (selectedMusic) return selectedMusic;
    if (musicItems.length > 0) {
      return musicItems[Math.floor(Math.random() * musicItems.length)];
    }
    return null;
  };

  const inspiration = getInspiration();

  // Get related music based on tags
  const getRelatedMusic = () => {
    if (!inspiration) return [];

    return musicItems.filter(item =>
      item.id !== inspiration.id &&
      item.tags.some(tag => inspiration.tags.includes(tag))
    );
  };

  const relatedMusic = getRelatedMusic();

  if (isLoading) {
    return (
      <div className="mt-8">
        <div className="bg-surface rounded-xl p-6 mb-8 animate-pulse h-64"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-surface rounded-xl h-64 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!inspiration) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-surface-alt flex items-center justify-center mb-6">
          <Icon name="Lightbulb" size={32} className="text-text-tertiary" />
        </div>
        <h2 className="heading-large mb-3">未找到灵感</h2>
        <p className="text-text-secondary max-w-md mb-6">
          我们无法找到任何音乐来激发您的灵感。请尝试先探索热门部分。
        </p>
        <button
          className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300"
          onClick={() => window.location.reload()}
        >
          刷新
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Inspiration Card */}
      <div className="bg-surface rounded-xl p-6 mb-8">
        <h2 className="heading-large mb-6">激发灵感</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Artwork and Info */}
          <div className="lg:col-span-1">
            <div className="relative h-48 rounded-xl overflow-hidden">
              <Image
                src={inspiration.artwork}
                alt={inspiration.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent">
                <Image
                  src={inspiration.waveform}
                  alt="Audio waveform"
                  className={`w-full h-full object-cover opacity-30 ${currentlyPlaying === inspiration.id ? 'animate-pulse' : ''}`}
                />
              </div>

              {/* Play Button */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                onClick={() => togglePlay(inspiration.id)}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-primary bg-opacity-90 flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon name={currentlyPlaying === inspiration.id ? "Pause" : "Play"} size={32} />
                </motion.div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="heading-medium">{inspiration.title}</h3>
              <div className="flex items-center mt-1">
                <div className="w-5 h-5 rounded-full overflow-hidden mr-1.5">
                  <Image
                    src={inspiration.creatorAvatar}
                    alt={inspiration.creator}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium">{inspiration.creator}</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {inspiration.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-surface-alt rounded-full px-2 py-0.5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="heading-small mb-3">为什么不尝试创作类似的作品？</h3>
            <p className="text-text-secondary mb-6">
              这部由 {inspiration.creator} 创作的作品激发了我们社区中许多人的灵感。
              这里使用的 {inspiration.type.toLowerCase()} 技术可能是您下一个创作的绝佳起点。
            </p>

            <div className="bg-surface-alt rounded-lg p-4 mb-6">
              <h4 className="font-medium mb-2">创作者的思路</h4>
              <p className="text-sm text-text-secondary">
                {inspiration.description.split('\n')[0]}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 flex items-center">
                <Icon name="GitBranch" size={18} className="mr-2" />
                <span>创作类似作品</span>
              </button>

              <button className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 flex items-center">
                <Icon name="Shuffle" size={18} className="mr-2" />
                <span>尝试其他</span>
              </button>

              <button className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 flex items-center">
                <Icon name="MessageSquare" size={18} className="mr-2" />
                <span>询问创作者</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 相关音乐 */}
      {relatedMusic.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-large">类似的作品</h2>
            <button className="flex items-center text-text-secondary hover:text-text-primary transition-colors">
              <span className="mr-1">查看全部</span>
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedMusic.slice(0, 4).map(item => (
              <MusicCard
                key={item.id}
                item={item}
                isPlaying={currentlyPlaying === item.id}
                onTogglePlay={() => togglePlay(item.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InspiredBySection;