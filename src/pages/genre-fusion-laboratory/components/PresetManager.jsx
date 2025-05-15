import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const PresetManager = ({ presets, onSavePreset, onLoadPreset, selectedGenreA, selectedGenreB, fusionBalance }) => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [presetName, setPresetName] = useState("");

  const handleSavePreset = () => {
    if (!presetName.trim()) return;

    onSavePreset(presetName);
    setPresetName("");
    setShowSaveModal(false);
  };

  return (
    <>
      <motion.div
        className="bg-surface rounded-xl p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}>

        <div className="flex justify-between items-center mb-4">
          <h2 className="heading-medium">保存的预设</h2>

          <button
            className="flex items-center px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-sm"
            onClick={() => {
              if (selectedGenreA && selectedGenreB) {
                setShowSaveModal(true);
              }
            }}
            disabled={!selectedGenreA || !selectedGenreB}>

            <Icon name="Save" size={16} className="mr-2" />
            <span>保存当前设置</span>
          </button>
        </div>

        {presets.length === 0 ?
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-12 h-12 rounded-full bg-surface-alt flex items-center justify-center mb-3">
              <Icon name="Bookmark" size={24} className="text-text-tertiary" />
            </div>
            <p className="text-sm text-text-secondary">
              将您喜爱的曲风融合设置保存为预设，以便将来使用。
            </p>
          </div> :

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {presets.map((preset) =>
              <motion.div
                key={preset.id}
                className="bg-surface-alt rounded-lg p-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium">{preset.name}</h3>
                    <p className="text-xs text-text-secondary mt-1">
                      {preset.genreA.name} × {preset.genreB.name}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      className="p-1.5 rounded-md bg-surface hover:bg-opacity-80 transition-all duration-300"
                      onClick={() => onLoadPreset(preset)}>

                      <Icon name="Play" size={14} />
                    </button>
                    <button className="p-1.5 rounded-md bg-surface hover:bg-opacity-80 transition-all duration-300">
                      <Icon name="Edit2" size={14} />
                    </button>
                    <button className="p-1.5 rounded-md bg-surface hover:bg-opacity-80 transition-all duration-300">
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex justify-between text-xs text-text-tertiary mb-1">
                    <span>Balance: {preset.balance}%</span>
                    <span>Tempo: {preset.settings.tempoSync}%</span>
                  </div>

                  <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent-2 to-accent-1"
                      style={{ width: `${preset.balance}%` }}>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        }
      </motion.div>

      {/* Save Preset Modal */}
      {showSaveModal &&
        <div
          className="fixed inset-0 bg-background bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowSaveModal(false)}>

          <motion.div
            className="bg-surface rounded-xl w-full max-w-md overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}>

            <div className="p-6">
              <h2 className="heading-medium mb-4">保存融合预设</h2>

              <div className="mb-4">
                <label className="block text-sm text-text-secondary mb-2">
                  预设名称
                </label>
                <input
                  type="text"
                  placeholder="输入预设的名称"
                  className="w-full bg-surface-alt border-none rounded-lg py-2 px-4 focus:ring-primary focus:ring-2 focus:outline-none"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)} />

              </div>

              <div className="bg-surface-alt rounded-lg p-3 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">融合细节</span>
                </div>

                <div className="text-sm mb-2">
                  <span className="text-text-secondary">曲风： </span>
                  <span>{selectedGenreA.name} × {selectedGenreB.name}</span>
                </div>

                <div className="text-sm">
                  <span className="text-text-secondary">比例: </span>
                  <span>{selectedGenreA.name} ({100 - fusionBalance}%) - {selectedGenreB.name} ({fusionBalance}%)</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm mr-3"
                  onClick={() => setShowSaveModal(false)}>

                  取消
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-sm"
                  onClick={handleSavePreset}>

                  保存预设
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      }
    </>);

};

export default PresetManager;