import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const AudioSample = ({ title, description, thumbnail, waveform, duration, type }) => {
  const [isPlaying, setIsPlaying] = useState(false);

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

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control audio playback
  };

  return (
    <motion.div
      className="bg-surface rounded-xl overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Audio Visualization */}
      <div className="h-40 relative">
        <Image
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Waveform Overlay */}
        <div className="absolute inset-0 bg-background bg-opacity-30">
          <Image
            src={waveform}
            alt="Audio waveform"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className={`w-16 h-16 rounded-full ${isPlaying ? 'bg-error' : 'bg-primary'} flex items-center justify-center transition-all duration-300`}
            onClick={togglePlay}
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={28} />
          </button>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-surface bg-opacity-70 backdrop-blur-md rounded-md px-2 py-1 text-xs font-medium">
          {duration}
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 left-3 bg-surface bg-opacity-70 backdrop-blur-md rounded-md px-2 py-1 text-xs font-medium flex items-center">
          <Icon
            name={getTypeIcon(type)}
            size={14}
            className={`mr-1 ${getTypeColor(type)}`}
          />
          <span className={getTypeColor(type)}>{type}</span>
        </div>
      </div>

      {/* Audio Info */}
      <div className="p-4">
        <h3 className="heading-small mb-2">{title}</h3>
        <p className="text-text-secondary text-sm mb-4">{description}</p>

        {/* Audio Controls */}
        <div className="flex items-center">
          <div className="flex-1 h-2 bg-surface-alt rounded-full overflow-hidden mr-3">
            <div
              className="h-full bg-primary"
              style={{ width: isPlaying ? '45%' : '0%', transition: 'width 0.1s linear' }}
            ></div>
          </div>

          <div className="flex space-x-2">
            <button className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center">
              <Icon name="SkipBack" size={16} />
            </button>

            <button
              className={`w-8 h-8 rounded-full ${isPlaying ? 'bg-error' : 'bg-primary'} flex items-center justify-center`}
              onClick={togglePlay}
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
            </button>

            <button className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center">
              <Icon name="SkipForward" size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AudioSample;