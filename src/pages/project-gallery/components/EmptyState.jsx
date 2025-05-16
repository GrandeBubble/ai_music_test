import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const EmptyState = ({ searchQuery }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {searchQuery ? (
        <>
          <div className="w-16 h-16 rounded-full bg-surface-alt flex items-center justify-center mb-6">
            <Icon name="Search" size={32} className="text-text-tertiary" />
          </div>
          <h2 className="heading-large mb-3">未找到项目</h2>
          <p className="text-text-secondary max-w-md mb-6">
            我们未能找到与 "{searchQuery}" 匹配的任何项目。请尝试调整您的搜索或筛选条件。
          </p>
          <button className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300">
            清除搜索
          </button>
        </>
      ) : (
        <>
          <div className="w-16 h-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mb-6">
            <Icon name="Music" size={32} className="text-primary" />
          </div>
          <h2 className="heading-large mb-3">创建您的第一个项目</h2>
          <p className="text-text-secondary max-w-md mb-8">
            通过在我们的创意工作室中创建您的第一个项目，开始使用 AI 音乐。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            <motion.div
              className="bg-surface rounded-xl p-6 flex flex-col items-center text-center cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 rounded-full bg-accent-1 bg-opacity-20 flex items-center justify-center mb-4">
                <Icon name="Mic2" size={24} className="text-accent-1" />
              </div>
              <h3 className="heading-small mb-2">人声调节</h3>
              <p className="text-sm text-text-secondary">
                使用 AI 增强和修正人声
              </p>
            </motion.div>

            <motion.div
              className="bg-surface rounded-xl p-6 flex flex-col items-center text-center cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 rounded-full bg-accent-2 bg-opacity-20 flex items-center justify-center mb-4">
                <Icon name="Music" size={24} className="text-accent-2" />
              </div>
              <h3 className="heading-small mb-2">作曲</h3>
              <p className="text-sm text-text-secondary">
                使用 AI 创作原创音乐
              </p>
            </motion.div>

            <motion.div
              className="bg-surface rounded-xl p-6 flex flex-col items-center text-center cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 rounded-full bg-accent-3 bg-opacity-20 flex items-center justify-center mb-4">
                <Icon name="Combine" size={24} className="text-accent-3" />
              </div>
              <h3 className="heading-small mb-2">风格融合</h3>
              <p className="text-sm text-text-secondary">
                使用 AI 混合音乐风格
              </p>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default EmptyState;