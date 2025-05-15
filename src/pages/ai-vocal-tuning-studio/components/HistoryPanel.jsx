import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const HistoryPanel = ({
  history,
  historyIndex,
  onSelectHistoryItem,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-surface rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="heading-small">历史记录</h3>

        <div className="flex items-center space-x-2">
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${canUndo
              ? "bg-surface-alt hover:bg-opacity-80" : "bg-surface-alt bg-opacity-50 cursor-not-allowed"
              }`}
            onClick={onUndo}
            disabled={!canUndo}
          >
            <Icon name="Undo2" size={16} className={canUndo ? "" : "text-text-tertiary"} />
          </button>

          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${canRedo
              ? "bg-surface-alt hover:bg-opacity-80" : "bg-surface-alt bg-opacity-50 cursor-not-allowed"
              }`}
            onClick={onRedo}
            disabled={!canRedo}
          >
            <Icon name="Redo2" size={16} className={canRedo ? "" : "text-text-tertiary"} />
          </button>
        </div>
      </div>

      <div className="p-2 max-h-80 overflow-y-auto">
        {history.length === 0 ? (
          <div className="p-4 text-center text-text-secondary">
            <p>还没有历史t</p>
          </div>
        ) : (
          <ul className="space-y-1">
            {history.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${index === historyIndex
                    ? "bg-primary bg-opacity-20" : "hover:bg-surface-alt"
                    }`}
                  onClick={() => onSelectHistoryItem(index)}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${index === historyIndex ? "bg-primary" : "bg-surface-alt"
                      }`}>
                      {index === 0 ? (
                        <Icon name="FileAudio" size={16} />
                      ) : item.action.includes("preset") ? (
                        <Icon name="Sparkles" size={16} />
                      ) : (
                        <Icon name="Sliders" size={16} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium truncate">{item.action}</h4>
                        <span className="text-xs text-text-tertiary ml-2">
                          {formatTime(item.timestamp)}
                        </span>
                      </div>

                      {item.action.includes("Adjusted") && (
                        <div className="mt-1 text-xs text-text-secondary">
                          {Object.entries(item.parameters)
                            .filter(([key]) => key === item.action.split(" ")[1])
                            .map(([key, value]) => (
                              <span key={key}>
                                {key === "formantShift" && value > 0 ? "+" : ""}
                                {value}
                                {key === "formantShift" ? "" : "%"}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;