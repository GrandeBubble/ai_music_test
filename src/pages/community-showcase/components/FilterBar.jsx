import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const FilterBar = ({ activeFilter, setActiveFilter, selectedTags, toggleTag }) => {
  const [showTagFilter, setShowTagFilter] = useState(false);

  const allTags = [
    // 流派
    { name: "氛围", category: "genre" },
    { name: "电子", category: "genre" },
    { name: "爵士", category: "genre" },
    { name: "民谣", category: "genre" },
    { name: "合成波", category: "genre" },
    { name: "古典", category: "genre" },
    { name: "摇滚", category: "genre" },
    { name: "嘻哈", category: "genre" },

    // 情绪
    { name: "放松", category: "mood" },
    { name: "充满活力", category: "mood" },
    { name: "空灵", category: "mood" },
    { name: "黑暗", category: "mood" },
    { name: "振奋", category: "mood" },
    { name: "忧郁", category: "mood" },

    // 技巧
    { name: "人声", category: "technique" },
    { name: "和声", category: "technique" },
    { name: "融合", category: "technique" },
    { name: "实验", category: "technique" },
    { name: "复古", category: "technique" },

    // 元素
    { name: "自然", category: "element" },
    { name: "太空", category: "element" },
    { name: "未来感", category: "element" },
  ];

  // Group tags by category
  const tagsByCategory = allTags.reduce((acc, tag) => {
    if (!acc[tag.category]) {
      acc[tag.category] = [];
    }
    acc[tag.category].push(tag.name);
    return acc;
  }, {});

  return (
    <div className="bg-surface rounded-xl p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        {/* Main Filter Tabs */}
        <div className="flex space-x-2 mb-4 md:mb-0">
          <button
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeFilter === "trending" ? "bg-primary bg-opacity-20 text-primary" : "bg-surface-alt hover:bg-opacity-80"
              }`}
            onClick={() => setActiveFilter("trending")}
          >
            <div className="flex items-center">
              <Icon name="TrendingUp" size={18} className="mr-2" />
              <span>趋势</span>
            </div>
          </button>

          <button
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeFilter === "inspired" ? "bg-primary bg-opacity-20 text-primary" : "bg-surface-alt hover:bg-opacity-80"
              }`}
            onClick={() => setActiveFilter("inspired")}
          >
            <div className="flex items-center">
              <Icon name="Lightbulb" size={18} className="mr-2" />
              <span>灵感</span>
            </div>
          </button>

          <button
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeFilter === "discover" ? "bg-primary bg-opacity-20 text-primary" : "bg-surface-alt hover:bg-opacity-80"
              }`}
            onClick={() => setActiveFilter("discover")}
          >
            <div className="flex items-center">
              <Icon name="Compass" size={18} className="mr-2" />
              <span>发现</span>
            </div>
          </button>
        </div>

        {/* Tag Filter Button */}
        <button
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${showTagFilter || selectedTags.length > 0
            ? "bg-primary bg-opacity-20 text-primary" : "bg-surface-alt hover:bg-opacity-80"
            }`}
          onClick={() => setShowTagFilter(!showTagFilter)}
        >
          <div className="flex items-center">
            <Icon name="Tags" size={18} className="mr-2" />
            <span>
              {selectedTags.length > 0
                ? `Filtered by ${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''}`
                : "按标签筛选"}
            </span>
            <Icon
              name={showTagFilter ? "ChevronUp" : "ChevronDown"}
              size={18}
              className="ml-2"
            />
          </div>
        </button>
      </div>

      {/* Tag Filter Panel */}
      {showTagFilter && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-border"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Genres */}
            <div>
              <h3 className="heading-small mb-2">风格</h3>
              <div className="flex flex-wrap gap-2">
                {tagsByCategory.genre?.map((tag) => (
                  <button
                    key={tag}
                    className={`text-xs rounded-full px-2 py-1 transition-all duration-300 ${selectedTags.includes(tag)
                      ? "bg-primary bg-opacity-20 text-primary" : "bg-surface-alt hover:bg-opacity-80"
                      }`}
                    onClick={() => toggleTag(tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Moods */}
            <div>
              <h3 className="heading-small mb-2">模型</h3>
              <div className="flex flex-wrap gap-2">
                {tagsByCategory.mood?.map((tag) => (
                  <button
                    key={tag}
                    className={`text-xs rounded-full px-2 py-1 transition-all duration-300 ${selectedTags.includes(tag)
                      ? "bg-primary bg-opacity-20 text-primary" : "bg-surface-alt hover:bg-opacity-80"
                      }`}
                    onClick={() => toggleTag(tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Techniques */}
            <div>
              <h3 className="heading-small mb-2">技巧</h3>
              <div className="flex flex-wrap gap-2">
                {tagsByCategory.technique?.map((tag) => (
                  <button
                    key={tag}
                    className={`text-xs rounded-full px-2 py-1 transition-all duration-300 ${selectedTags.includes(tag)
                      ? "bg-primary bg-opacity-20 text-primary" : "bg-surface-alt hover:bg-opacity-80"
                      }`}
                    onClick={() => toggleTag(tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Elements */}
            <div>
              <h3 className="heading-small mb-2">元素</h3>
              <div className="flex flex-wrap gap-2">
                {tagsByCategory.element?.map((tag) => (
                  <button
                    key={tag}
                    className={`text-xs rounded-full px-2 py-1 transition-all duration-300 ${selectedTags.includes(tag)
                      ? "bg-primary bg-opacity-20 text-primary" : "bg-surface-alt hover:bg-opacity-80"
                      }`}
                    onClick={() => toggleTag(tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedTags.length > 0 && (
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm"
                onClick={() => {
                  // Clear all selected tags
                  selectedTags.forEach(tag => toggleTag(tag));
                }}
              >
                清除所有选项
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FilterBar;