import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const GenreSelector = ({ title, accentColor, genreCategories, selectedGenre, onSelectGenre }) => {
  const [activeCategory, setActiveCategory] = useState(genreCategories[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Filter genres based on search query
  const filteredGenres = searchQuery
    ? genreCategories.flatMap(category => category.genres)
      .filter(genre => genre.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : genreCategories.find(category => category.id === activeCategory)?.genres || [];

  return (
    <div className="h-full flex flex-col">
      <div className={`p-4 border-b border-border bg-${accentColor} bg-opacity-10`}>
        <h2 className="heading-medium flex items-center">
          <div className={`w-6 h-6 rounded-full bg-${accentColor} flex items-center justify-center mr-2`}>
            <span className="text-xs font-bold">{title.charAt(title.length - 1)}</span>
          </div>
          {title}
        </h2>

        {selectedGenre ? (
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg overflow-hidden mr-3">
                <Image
                  src={selectedGenre.image}
                  alt={selectedGenre.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{selectedGenre.name}</h3>
                <p className="text-xs text-text-secondary">已选择的风格</p>
              </div>
            </div>
            <button
              className="p-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
              onClick={() => onSelectGenre(null)}
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        ) : (
          <p className="mt-2 text-sm text-text-secondary">
            选择一个风格以开始
          </p>
        )}
      </div>

      <div className="p-4">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={16} className="text-text-tertiary" />
          </div>
          <input
            type="text"
            placeholder="搜索风格"
            className="w-full bg-surface-alt border-none rounded-lg py-2 pl-10 pr-4 focus:ring-primary focus:ring-2 focus:outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {!searchQuery && (
          <div className="flex overflow-x-auto pb-2 mb-4 scrollbar-hide">
            {genreCategories.map((category) => (
              <button
                key={category.id}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap mr-2 transition-all duration-300 ${activeCategory === category.id
                  ? `bg-${accentColor} bg-opacity-20 text-${accentColor}`
                  : "bg-surface-alt hover:bg-opacity-80"
                  }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 max-h-[calc(100vh-350px)] overflow-y-auto pr-1">
          {filteredGenres.map((genre) => (
            <motion.div
              key={genre.id}
              className={`bg-surface-alt rounded-lg overflow-hidden cursor-pointer ${selectedGenre?.id === genre.id ? `ring-2 ring-${accentColor}` : ""
                }`}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelectGenre(genre)}
            >
              <div className="h-24 relative">
                <Image
                  src={genre.image}
                  alt={genre.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-sm font-medium">{genre.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Upload Reference Track Button */}
          <motion.div
            className="bg-surface-alt rounded-lg overflow-hidden cursor-pointer border border-dashed border-border flex flex-col items-center justify-center h-24"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowUploadModal(true)}
          >
            <Icon name="Upload" size={24} className={`text-${accentColor} mb-2`} />
            <span className="text-xs text-text-secondary">上传参考样本</span>
          </motion.div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div
          className="fixed inset-0 bg-background bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowUploadModal(false)}
        >
          <motion.div
            className="bg-surface rounded-xl w-full max-w-md overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="heading-medium mb-4">上传参考样本</h2>
              <p className="text-sm text-text-secondary mb-6">
                上传一个参考音频文件以帮助我们更好地理解您的需求。我们将使用它来分析和生成新的音乐风格。
              </p>

              <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center mb-6">
                <Icon name="Upload" size={32} className={`text-${accentColor} mb-3`} />
                <p className="text-sm text-text-secondary mb-2">
                  将文件拖放到这里，或点击浏览以选择文件
                </p>
                <p className="text-xs text-text-tertiary mb-4">
                  支持 MP3, WAV, FLAC (最大10MB)
                </p>
                <button className={`px-4 py-2 rounded-lg bg-${accentColor} hover:bg-opacity-80 transition-all duration-300 text-sm`}>
                  选择文件
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm mr-3"
                  onClick={() => setShowUploadModal(false)}
                >
                  取消
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-sm"
                  onClick={() => setShowUploadModal(false)}
                >
                  上传并分析
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GenreSelector;