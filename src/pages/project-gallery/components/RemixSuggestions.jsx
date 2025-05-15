import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const RemixSuggestions = ({ projects }) => {
  // 根据现有项目生成混编建议
  const generateSuggestions = () => {
    if (projects.length < 2) return [];

    const suggestions = [];

    // 创建人声项目与编曲项目的组合建议
    const 人声项目 = projects.filter(p => p.type === "Vocal Tuning"); // 翻译类型标识
    const 编曲项目 = projects.filter(p => p.type === "Composition"); // 翻译类型标识

    if (人声项目.length > 0 && 编曲项目.length > 0) {
      suggestions.push({
        id: "suggestion-1",
        title: `${人声项目[0].title} + ${编曲项目[0].title}`,
        description: "将你的人声轨道与这首编曲结合，制作完整歌曲", // 翻译描述
        projectA: 人声项目[0],
        projectB: 编曲项目[0],
        type: "人声 + 编曲" // 翻译类型名称
      });
    }

    // 创建风格融合建议
    if (projects.length >= 2) {
      const 项目A = projects[0]; // 翻译变量名提高可读性
      const 项目B = projects[1]; // 翻译变量名提高可读性

      suggestions.push({
        id: "suggestion-2",
        title: `融合：${项目A.title} × ${项目B.title}`,
        description: "融合这两个项目，创造独特风格", // 翻译描述
        projectA: 项目A,
        projectB: 项目B,
        type: "风格融合" // 翻译类型名称
      });
    }

    return suggestions;
  };

  const 建议列表 = generateSuggestions(); // 翻译变量名提高可读性

  if (建议列表.length === 0) return null; // 翻译变量名提高可读性

  return (
    <div className="mt-12 mb-8">
      <h2 className="heading-large mb-6">混编建议</h2> {/* 翻译标题 */}
      <p className="text-text-secondary mb-6">
        组合现有项目，探索创意可能
      </p> {/* 翻译说明文字 */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {建议列表.map(建议 => ( // 翻译变量名提高可读性
          <motion.div
            key={建议.id}
            className="bg-surface rounded-xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-3">
                  <Icon name="Sparkles" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="heading-medium">{建议.title}</h3> {/* 保留组合标题中的英文项目名 */}
                  <p className="text-sm text-text-secondary">{建议.description}</p> {/* 已翻译描述 */}
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1 bg-surface-alt rounded-lg p-3 flex items-center">
                  <div className="w-12 h-12 rounded-lg overflow-hidden mr-3">
                    <Image
                      src={建议.projectA.thumbnail}
                      alt={建议.projectA.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium truncate">{建议.projectA.title}</h4> {/* 保留项目英文名 */}
                    <p className="text-xs text-text-tertiary">{建议.projectA.type}</p> {/* 保留类型标识（需结合业务补充中文映射） */}
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center">
                  <Icon name="Plus" size={16} />
                </div>

                <div className="flex-1 bg-surface-alt rounded-lg p-3 flex items-center">
                  <div className="w-12 h-12 rounded-lg overflow-hidden mr-3">
                    <Image
                      src={建议.projectB.thumbnail}
                      alt={建议.projectB.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium truncate">{建议.projectB.title}</h4> {/* 保留项目英文名 */}
                    <p className="text-xs text-text-tertiary">{建议.projectB.type}</p> {/* 保留类型标识（需结合业务补充中文映射） */}
                  </div>
                </div>
              </div>

              <button className="w-full py-3 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 flex items-center justify-center">
                <Icon name="Wand" size={18} className="mr-2" />
                <span>创建混编</span> {/* 翻译操作按钮 */}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RemixSuggestions;