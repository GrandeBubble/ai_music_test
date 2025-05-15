import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const TemplateSelector = ({ onSelect }) => {
  const [selectedGenre, setSelectedGenre] = useState("pop");

  // 模板风格
  const genres = [
    { id: "pop", name: "流行", icon: "Music" },
    { id: "rock", name: "摇滚", icon: "Guitar" },
    { id: "jazz", name: "爵士", icon: "Piano" },
    { id: "electronic", name: "电子", icon: "Waveform" },
    { id: "classical", name: "古典", icon: "Music" },
    { id: "hiphop", name: "嘻哈", icon: "Mic2" }
  ];

  // 各风格模板
  const templates = {
    pop: [
      {
        id: "pop-1",
        name: "现代流行抒情",
        description: "带钢琴和弦乐的情感流行抒情曲",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
        tempo: 72,
        key: "C大调"
      },
      {
        id: "pop-2",
        name: "欢快流行",
        description: "带电子元素的活力流行曲目",
        image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tempo: 118,
        key: "G大调"
      },
      {
        id: "pop-3",
        name: "原声流行",
        description: "简约的原声流行编曲",
        image: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tempo: 96,
        key: "D大调"
      }
    ],
    rock: [
      {
        id: "rock-1",
        name: "经典摇滚",
        description: "带吉他独奏的强力摇滚编曲",
        image: "https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tempo: 128,
        key: "E小调"
      },
      {
        id: "rock-2",
        name: "另类摇滚",
        description: "带氛围元素的现代另类摇滚",
        image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=2070&auto=format&fit=crop",
        tempo: 110,
        key: "A小调"
      }
    ],
    jazz: [
      {
        id: "jazz-1",
        name: "平滑爵士",
        description: "带钢琴和萨克斯的轻松爵士编曲",
        image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tempo: 88,
        key: "F大调"
      },
      {
        id: "jazz-2",
        name: "比波普",
        description: "带复杂和声的快节奏爵士",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
        tempo: 160,
        key: "Bb大调"
      }
    ],
    electronic: [
      {
        id: "electronic-1",
        name: "浩室",
        description: "带合成器元素的四拍浩室节拍",
        image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tempo: 128,
        key: "F小调"
      },
      {
        id: "electronic-2",
        name: "环境音乐",
        description: "大气的环境音景",
        image: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tempo: 80,
        key: "C小调"
      }
    ],
    classical: [
      {
        id: "classical-1",
        name: "弦乐四重奏",
        description: "弦乐四重奏的古典编曲",
        image: "https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tempo: 92,
        key: "G大调"
      },
      {
        id: "classical-2",
        name: "钢琴奏鸣曲",
        description: "奏鸣曲形式的钢琴独奏",
        image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=2070&auto=format&fit=crop",
        tempo: 108,
        key: "C大调"
      }
    ],
    hiphop: [
      {
        id: "hiphop-1",
        name: "陷阱节拍",
        description: "带808鼓和踩镲的现代陷阱节拍",
        image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        tempo: 140,
        key: "G小调"
      },
      {
        id: "hiphop-2",
        name: "咚巴",
        description: "带采样元素的经典嘻哈节拍",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
        tempo: 90,
        key: "E小调"
      }
    ]
  };

  // 获取所选风格的模板
  const selectedTemplates = templates[selectedGenre] || [];

  return (
    <div className="bg-surface rounded-xl p-6 mb-8">
      <h2 className="heading-medium mb-6">选择一个模板</h2>

      {/* 风格选择 */}
      <div className="flex flex-wrap gap-3 mb-6">
        {genres.map(genre => (
          <button
            key={genre.id}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${selectedGenre === genre.id
                ? "bg-primary text-text-primary" : "bg-surface-alt hover:bg-opacity-80"
              }`}
            onClick={() => setSelectedGenre(genre.id)}
          >
            <Icon name={genre.icon} size={18} className="mr-2" />
            <span>{genre.name}</span>
          </button>
        ))}
      </div>

      {/* 模板网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedTemplates.map(template => (
          <motion.div
            key={template.id}
            className="bg-surface-alt rounded-xl overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            onClick={onSelect}
          >
            <div className="h-40 relative">
              <Image
                src={template.image}
                alt={template.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="heading-small text-text-primary">{template.name}</h3>
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm text-text-secondary mb-3">{template.description}</p>
              <div className="flex justify-between text-xs text-text-tertiary">
                <div className="flex items-center">
                  <Icon name="Clock" size={14} className="mr-1" />
                  <span>{template.tempo} BPM</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Music" size={14} className="mr-1" />
                  <span>{template.key}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* 空模板 */}
        <motion.div
          className="bg-surface-alt rounded-xl overflow-hidden border-2 border-dashed border-border cursor-pointer h-full flex flex-col items-center justify-center p-6 text-center"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
          onClick={onSelect}
        >
          <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-4">
            <Icon name="Plus" size={32} className="text-text-tertiary" />
          </div>
          <h3 className="heading-small mb-2">从头开始</h3>
          <p className="text-sm text-text-secondary">
            不使用模板创建新作品
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TemplateSelector;