import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ProjectCard = ({ project, isSelected, onSelect, onToggleFavorite }) => {
  const [showActions, setShowActions] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "AI修音":
        return "Mic2";
      case "AI作曲":
        return "Music";
      case "曲风融合":
        return "Combine";
      default:
        return "Music";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "AI修音":
        return "text-accent-1";
      case "AI作曲":
        return "text-accent-2";
      case "曲风融合":
        return "text-accent-3";
      default:
        return "text-primary";
    }
  };

  return (
    <>
      <motion.div
        className={`relative bg-surface rounded-xl overflow-hidden transition-all duration-300 ${isSelected ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-border"
          }`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onHoverStart={() => setShowActions(true)}
        onHoverEnd={() => setShowActions(false)}
        onClick={() => !showDetails && setShowDetails(true)}
      >
        {/* 选择复选框 */}
        <div
          className="absolute top-3 left-3 z-10 bg-surface bg-opacity-70 backdrop-blur-md rounded-md p-1"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          <Icon
            name={isSelected ? "CheckSquare" : "Square"}
            size={20}
            className={isSelected ? "text-primary" : "text-text-secondary"}
          />
        </div>

        {/* 收藏按钮 */}
        <div
          className="absolute top-3 right-3 z-10 bg-surface bg-opacity-70 backdrop-blur-md rounded-md p-1"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
        >
          <Icon
            name={project.favorite ? "Heart" : "HeartOutline"}
            size={20}
            className={project.favorite ? "text-error" : "text-text-secondary"}
          />
        </div>

        {/* 缩略图 */}
        <div className="h-40 relative">
          <Image
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />

          {/* 波形叠加层 */}
          <div className="absolute inset-0 bg-background bg-opacity-30">
            <Image
              src={project.waveform}
              alt="音频波形" // 修改英文描述
              className="w-full h-full object-cover opacity-50"
            />
          </div>

          {/* 时长标签 */}
          <div className="absolute bottom-3 right-3 bg-surface bg-opacity-70 backdrop-blur-md rounded-md px-2 py-1 text-xs font-medium">
            {project.duration}
          </div>

          {/* 快捷操作（悬停时显示） */}
          {showActions && (
            <div className="absolute inset-0 bg-background bg-opacity-70 backdrop-blur-sm flex items-center justify-center space-x-4">
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  // 播放操作
                }}
              >
                <Icon name="Play" size={20} />
              </motion.button>

              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.05 }}
                className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  // 编辑操作
                }}
              >
                <Icon name="Edit2" size={20} />
              </motion.button>

              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  // 分享操作
                }}
              >
                <Icon name="Share2" size={20} />
              </motion.button>
            </div>
          )}
        </div>

        {/* 项目信息 */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="heading-small mb-1 truncate">{project.title}</h3>
              <div className="flex items-center">
                <Icon
                  name={getTypeIcon(project.type)}
                  size={16}
                  className={`mr-1.5 ${getTypeColor(project.type)}`}
                />
                <span className={`text-xs font-medium ${getTypeColor(project.type)}`}>
                  {project.type}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-text-tertiary">
                {formatDate(project.date)}
              </div>
              <div className="text-xs text-text-tertiary mt-1">
                版本 {project.versions}
              </div>
            </div>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-surface-alt rounded-full px-2 py-0.5"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 详细信息模态框 */}
      {showDetails && (
        <div
          className="fixed inset-0 bg-background bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowDetails(false)}
        >
          <motion.div
            className="bg-surface rounded-xl w-full max-w-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 模态框头部 */}
            <div className="relative h-48">
              <Image
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent">
                <Image
                  src={project.waveform}
                  alt="音频波形"
                  className="w-full h-full object-cover opacity-30"
                />
              </div>

              <button
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface bg-opacity-70 backdrop-blur-md flex items-center justify-center"
                onClick={() => setShowDetails(false)}
              >
                <Icon name="X" size={18} />
              </button>

              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="display-small">{project.title}</h2>
                <div className="flex items-center mt-1">
                  <Icon
                    name={getTypeIcon(project.type)}
                    size={18}
                    className={`mr-2 ${getTypeColor(project.type)}`}
                  />
                  <span className={`text-sm font-medium ${getTypeColor(project.type)}`}>
                    {project.type}
                  </span>
                  <span className="mx-2 text-text-tertiary">•</span>
                  <span className="text-sm text-text-secondary">
                    {formatDate(project.date)}
                  </span>
                  <span className="mx-2 text-text-tertiary">•</span>
                  <span className="text-sm text-text-secondary">
                    {project.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* 模态框内容 */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 项目参数 */}
                <div>
                  <h3 className="heading-medium mb-4">AI参数</h3>
                  <div className="bg-surface-alt rounded-lg p-4">
                    {project.type === "AI修音" && (
                      <>
                        <div className="flex justify-between mb-3">
                          <span className="text-text-secondary">音高偏移</span>
                          <span>{project.parameters.pitch > 0 ? `+${project.parameters.pitch}` : project.parameters.pitch}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                          <span className="text-text-secondary">共振峰</span>
                          <span>{project.parameters.formant}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">颤音</span>
                          <span>{project.parameters.vibrato}</span>
                        </div>
                      </>
                    )}

                    {project.type === "AI作曲" && (
                      <>
                        <div className="flex justify-between mb-3">
                          <span className="text-text-secondary">节奏</span>
                          <span>{project.parameters.tempo} BPM</span>
                        </div>
                        <div className="flex justify-between mb-3">
                          <span className="text-text-secondary">调式</span>
                          <span>{project.parameters.key}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">复杂度</span>
                          <span>{project.parameters.complexity}</span>
                        </div>
                      </>
                    )}

                    {project.type === "曲风融合" && (
                      <>
                        <div className="flex justify-between mb-3">
                          <span className="text-text-secondary">风格A</span>
                          <span>{project.parameters.genreA}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                          <span className="text-text-secondary">风格B</span>
                          <span>{project.parameters.genreB}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">混合比例</span>
                          <span>{project.parameters.blendRatio}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* 版本历史 */}
                <div>
                  <h3 className="heading-medium mb-4">版本历史</h3>
                  <div className="bg-surface-alt rounded-lg p-4 h-[calc(100%-32px)] overflow-y-auto">
                    {Array.from({ length: project.versions }).map((_, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-2 rounded-lg ${index === 0 ? "bg-primary bg-opacity-20" : "hover:bg-surface"
                          } mb-2 cursor-pointer`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? "bg-primary" : "bg-surface"
                          }`}>
                          <span className="text-xs font-medium">v{project.versions - index}</span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium">
                            {index === 0 ? "当前版本" : `版本 ${project.versions - index}`}
                          </div>
                          <div className="text-xs text-text-tertiary">
                            {formatDate(new Date(new Date(project.date).getTime() - (index * 86400000)).toISOString())}
                          </div>
                        </div>
                        {index === 0 && (
                          <span className="ml-auto text-xs bg-primary bg-opacity-20 text-primary px-2 py-0.5 rounded-full">
                            激活中
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex justify-between mt-6">
                <div className="flex space-x-3">
                  <button
                    className="flex items-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                    onClick={() => setShowDetails(false)}
                  >
                    <Icon name="Download" size={18} className="mr-2" />
                    <span>导出</span>
                  </button>

                  <button
                    className="flex items-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                    onClick={() => setShowDetails(false)}
                  >
                    <Icon name="Copy" size={18} className="mr-2" />
                    <span>复制</span>
                  </button>
                </div>

                <div className="flex space-x-3">
                  <button
                    className="flex items-center px-4 py-2 rounded-lg bg-error bg-opacity-20 hover:bg-opacity-30 text-error transition-all duration-300"
                    onClick={() => setShowDetails(false)}
                  >
                    <Icon name="Trash2" size={18} className="mr-2" />
                    <span>删除</span>
                  </button>

                  <button
                    className="flex items-center px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300"
                    onClick={() => setShowDetails(false)}
                  >
                    <Icon name="Edit2" size={18} className="mr-2" />
                    <span>编辑项目</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;