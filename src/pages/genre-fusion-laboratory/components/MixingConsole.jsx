import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const MixingConsole = ({
  genreA,
  genreB,
  fusionBalance,
  onBalanceChange,
  showAdvancedOptions,
  onCreateFusion
}) => {
  const [tempoSync, setTempoSync] = useState(85);
  const [keyMatching, setKeyMatching] = useState(true);
  const [transitionSmoothness, setTransitionSmoothness] = useState(70);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCreateFusion = () => {
    if (!genreA || !genreB) return;

    setIsGenerating(true);

    // 模拟AI处理
    setTimeout(() => {
      setIsGenerating(false);
      onCreateFusion();
    }, 2000);
  };

  const renderFader = (label, value, onChange, min = 0, max = 100) => (
    <div className="flex flex-col items-center">
      <span className="text-xs text-text-secondary mb-1">{label}</span>
      <div className="h-32 w-6 bg-surface-alt rounded-full relative mb-1">
        <div
          className="absolute bottom-0 left-0 right-0 bg-primary rounded-full"
          style={{ height: `${value}%` }}
        ></div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <span className="text-xs font-mono">{value}</span>
    </div>
  );

  return (
    <div className="h-full flex flex-col p-4">
      <h2 className="heading-medium text-center mb-4">混音控制台</h2>

      {genreA && genreB ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-accent-2 bg-opacity-20 flex items-center justify-center mx-auto mb-1">
                <span className="text-xs font-bold text-accent-2">A</span>
              </div>
              <span className="text-sm">{genreA.name}</span> {/* 保留 genre 名称（需业务系统本地化） */}
            </div>

            <div className="flex-1 mx-4">
              <div className="relative h-6 bg-surface-alt rounded-full">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-accent-2 to-accent-1 rounded-full"
                  style={{ width: `${fusionBalance}%` }}
                  initial={{ width: "50%" }}
                  animate={{ width: `${fusionBalance}%` }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fusionBalance}
                  onChange={(e) => onBalanceChange(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div
                  className="absolute top-0 bottom-0 w-4 h-4 bg-text-primary rounded-full shadow-md -mt-1 -ml-2 cursor-pointer"
                  style={{ left: `${fusionBalance}%`, top: '50%', transform: 'translateY(-50%)' }}
                ></div>
              </div>

              <div className="flex justify-between mt-1">
                <span className="text-xs text-text-secondary">{genreA.name}</span>
                <span className="text-xs text-text-secondary">{genreB.name}</span>
              </div>

              <div className="text-center mt-2">
                <span className="text-sm font-medium">融合平衡度：{fusionBalance}%</span> {/* 翻译标签 */}
              </div>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-accent-1 bg-opacity-20 flex items-center justify-center mx-auto mb-1">
                <span className="text-xs font-bold text-accent-1">B</span>
              </div>
              <span className="text-sm">{genreB.name}</span> {/* 保留 genre 名称 */}
            </div>
          </div>

          {/* 特征推子 */} {/* 翻译 section 标题 */}
          {genreA.characteristics && genreB.characteristics && (
            <div className="flex justify-between mb-6">
              {Object.keys(genreA.characteristics).slice(0, 5).map((key) => (
                <div key={key} className="flex flex-col items-center">
                  <span className="text-xs text-text-secondary mb-1">{key}</span> {/* 保留特征键名（需业务本地化） */}
                  <div className="flex items-end h-32 space-x-1">
                    <div
                      className="w-3 bg-accent-2 bg-opacity-70 rounded-t-sm"
                      style={{ height: `${genreA.characteristics[key]}%` }}
                    ></div>
                    <div
                      className="w-3 bg-accent-1 bg-opacity-70 rounded-t-sm"
                      style={{ height: `${genreB.characteristics[key]}%` }}
                    ></div>
                    <div
                      className="w-3 bg-primary rounded-t-sm"
                      style={{
                        height: `${(genreA.characteristics[key] * (100 - fusionBalance) / 100) +
                          (genreB.characteristics[key] * fusionBalance / 100)}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-xs mt-1">{key.substring(0, 3)}</span> {/* 保留特征缩写 */}
                </div>
              ))}
            </div>
          )}

          {/* 高级选项 */} {/* 翻译 section 标题 */}
          {showAdvancedOptions && (
            <div className="bg-surface-alt rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium mb-3">高级融合设置</h3> {/* 翻译标题 */}

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-text-secondary mb-1">节奏同步</span> {/* 翻译标签 */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={tempoSync}
                    onChange={(e) => setTempoSync(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs">{tempoSync}%</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-text-secondary mb-1">调式匹配</span> {/* 翻译标签 */}
                  <div className="flex items-center h-6">
                    <button
                      className={`px-3 py-1 text-xs rounded-l-lg ${keyMatching ? "bg-primary" : "bg-surface"
                        }`}
                      onClick={() => setKeyMatching(true)}
                    >
                      开
                    </button>
                    <button
                      className={`px-3 py-1 text-xs rounded-r-lg ${!keyMatching ? "bg-primary" : "bg-surface"
                        }`}
                      onClick={() => setKeyMatching(false)}
                    >
                      关
                    </button>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-text-secondary mb-1">过渡平滑度</span> {/* 翻译标签 */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={transitionSmoothness}
                    onChange={(e) => setTransitionSmoothness(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs">{transitionSmoothness}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 创建融合按钮 */} {/* 翻译注释 */}
          <button
            className={`w-full py-3 rounded-lg ${isGenerating
              ? "bg-primary bg-opacity-50" : "bg-primary hover:bg-primary-dark"
              } transition-all duration-300 flex items-center justify-center mt-auto`}
            onClick={handleCreateFusion}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Icon name="Loader" size={18} className="mr-2 animate-spin" />
                <span>生成融合中...</span> {/* 翻译加载状态 */}
              </>
            ) : (
              <>
                <Icon name="Wand" size={18} className="mr-2" />
                <span>创建融合</span> {/* 翻译按钮文本 */}
              </>
            )}
          </button>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-surface-alt flex items-center justify-center mb-4">
            <Icon name="Combine" size={32} className="text-text-tertiary" />
          </div>
          <h3 className="heading-small mb-2">选择要融合的风格</h3> {/* 翻译提示标题 */}
          <p className="text-sm text-text-secondary text-center max-w-xs">
            从两侧面板各选择一种风格，开始创建融合
          </p> {/* 翻译提示文本 */}
        </div>
      )}
    </div>
  );
};

export default MixingConsole;