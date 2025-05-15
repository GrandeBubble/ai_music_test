import React, { useState } from "react";

import Icon from "../../../components/AppIcon";

const PlaybackControls = ({ isPlaying, onTogglePlay }) => {
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("3:42");
  const [progress, setProgress] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(80);
  
  // Handle progress change
  const handleProgressChange = (e) => {
    setProgress(e.target.value);
  };
  
  // Handle volume change
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div className="bg-surface rounded-xl p-4">
      <div className="flex flex-col md:flex-row items-center">
        {/* Playback Controls */}
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <button className="text-text-tertiary hover:text-text-primary transition-all duration-300">
            <Icon name="SkipBack" size={20} />
          </button>
          
          <button 
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-all duration-300"
            onClick={onTogglePlay}
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
          </button>
          
          <button className="text-text-tertiary hover:text-text-primary transition-all duration-300">
            <Icon name="SkipForward" size={20} />
          </button>
          
          <button 
            className={`text-text-tertiary hover:text-text-primary transition-all duration-300 ${
              isLooping ? "text-primary" : ""
            }`}
            onClick={() => setIsLooping(!isLooping)}
          >
            <Icon name="Repeat" size={20} />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex-1 mx-4 w-full md:w-auto">
          <div className="flex justify-between text-xs mb-1">
            <span>{currentTime}</span>
            <span>{totalTime}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-2 bg-surface-alt rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        {/* Volume Control */}
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <button className="text-text-tertiary hover:text-text-primary transition-all duration-300">
            <Icon name={volume === 0 ? "VolumeX" : volume < 50 ? "Volume1" : "Volume2"} size={20} />
          </button>
          
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-surface-alt rounded-lg appearance-none cursor-pointer"
          />
          
          <button className="ml-4 text-text-tertiary hover:text-text-primary transition-all duration-300">
            <Icon name="Maximize2" size={20} />
          </button>
        </div>
      </div>
      
      {/* Playback Markers */}
      <div className="flex items-center mt-3 space-x-2">
        <div className="flex items-center">
          <div className="w-2 h-4 bg-primary rounded-sm"></div>
          <span className="text-xs ml-1">Playhead</span>
        </div>
        
        <div className="flex items-center ml-4">
          <div className="w-2 h-4 bg-accent-1 rounded-sm"></div>
          <span className="text-xs ml-1">Loop Start</span>
        </div>
        
        <div className="flex items-center">
          <div className="w-2 h-4 bg-accent-3 rounded-sm"></div>
          <span className="text-xs ml-1">Loop End</span>
        </div>
        
        <div className="ml-auto flex items-center space-x-2">
          <button className="px-2 py-1 text-xs rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 flex items-center">
            <Icon name="Metronome" size={14} className="mr-1" />
            <span>Metronome</span>
          </button>
          
          <button className="px-2 py-1 text-xs rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 flex items-center">
            <Icon name="Mic2" size={14} className="mr-1" />
            <span>Record</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaybackControls;