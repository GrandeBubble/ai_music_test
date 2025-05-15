import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const PresetSelector = ({ presets, activePreset, onSelectPreset, onSaveCustomPreset }) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [presetName, setPresetName] = useState("");

  return (
    <div className="bg-surface rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="heading-small">预设</h3>

        <button
          className="flex items-center px-3 py-1.5 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm"
          onClick={() => setShowSaveDialog(true)}
        >
          <Icon name="Save" size={16} className="mr-2" />
          <span>保存预设</span>
        </button>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {presets.map((preset) => (
            <motion.button
              key={preset.id}
              className={`p-4 rounded-lg transition-all duration-300 ${activePreset === preset.id
                ? `bg-${preset.color} bg-opacity-20 border border-${preset.color} border-opacity-30`
                : "bg-surface-alt hover:bg-opacity-80"
                }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectPreset(preset)}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full bg-${preset.color} bg-opacity-20 flex items-center justify-center mb-3`}>
                  <Icon name={preset.icon} size={24} className={`text-${preset.color}`} />
                </div>
                <h4 className={`text-sm font-medium ${activePreset === preset.id ? `text-${preset.color}` : ""}`}>
                  {preset.name}
                </h4>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Save Custom Preset Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-background bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-surface rounded-xl w-full max-w-md overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-border">
              <h2 className="heading-large">保存用户的预设</h2>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <label htmlFor="preset-name" className="block text-sm font-medium mb-2">
                  预设名称
                </label>
                <input
                  id="preset-name"
                  type="text"
                  className="w-full bg-surface-alt border-none rounded-lg py-2 px-4 focus:ring-primary focus:ring-2 focus:outline-none"
                  placeholder="My Custom Preset"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                  onClick={() => setShowSaveDialog(false)}
                >
                  取消
                </button>

                <button
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300"
                  onClick={() => {
                    if (presetName.trim()) {
                      onSaveCustomPreset(presetName);
                      setShowSaveDialog(false);
                      setPresetName("");
                    }
                  }}
                  disabled={!presetName.trim()}
                >
                  保存预设
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PresetSelector;