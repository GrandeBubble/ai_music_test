import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const HistoryPanel = ({ fusionHistory, onLoadFusion }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      className="bg-surface rounded-xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="heading-medium mb-4">融合历史</h2>

      {fusionHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-12 h-12 rounded-full bg-surface-alt flex items-center justify-center mb-3">
            <Icon name="History" size={24} className="text-text-tertiary" />
          </div>
          <p className="text-sm text-text-secondary">
            你的曲风融合作品历史将在这里显示。
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {fusionHistory.map((fusion) => (
            <motion.div
              key={fusion.id}
              className="bg-surface-alt rounded-lg overflow-hidden flex"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16">
                <Image
                  src={fusion.thumbnail}
                  alt={`${fusion.genreA.name} × ${fusion.genreB.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 p-3">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium">
                    {fusion.genreA.name} × {fusion.genreB.name}
                  </h3>
                  <span className="text-xs text-text-tertiary">
                    {formatDate(fusion.date)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <div className="text-xs text-text-secondary mr-2">
                      Balance: {fusion.balance}%
                    </div>
                    <div className="text-xs text-text-secondary">
                      {fusion.duration}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      className="p-1.5 rounded-md bg-surface hover:bg-opacity-80 transition-all duration-300"
                      onClick={() => onLoadFusion(fusion)}
                    >
                      <Icon name="RefreshCw" size={14} />
                    </button>
                    <button className="p-1.5 rounded-md bg-surface hover:bg-opacity-80 transition-all duration-300">
                      <Icon name="Download" size={14} />
                    </button>
                    <button className="p-1.5 rounded-md bg-surface hover:bg-opacity-80 transition-all duration-300">
                      <Icon name="Share2" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default HistoryPanel;