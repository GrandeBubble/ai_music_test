import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const MusicCard = ({ item, isPlaying, onTogglePlay }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };
  
  const getTypeIcon = (type) => {
    switch (type) {
      case "Vocal Tuning":
        return "Mic2";
      case "Composition":
        return "Music";
      case "Genre Fusion":
        return "Combine";
      default:
        return "Music";
    }
  };
  
  const getTypeColor = (type) => {
    switch (type) {
      case "Vocal Tuning":
        return "text-accent-1";
      case "Composition":
        return "text-accent-2";
      case "Genre Fusion":
        return "text-accent-3";
      default:
        return "text-primary";
    }
  };

  return (
    <>
      <motion.div
        className="bg-surface rounded-xl overflow-hidden transition-all duration-300 hover:ring-1 hover:ring-border"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onClick={() => setShowDetails(true)}
      >
        {/* Artwork */}
        <div className="h-40 relative">
          <Image 
            src={item.artwork} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
          
          {/* Waveform Overlay */}
          <div className="absolute inset-0 bg-background bg-opacity-30">
            <Image 
              src={item.waveform} 
              alt="Audio waveform" 
              className={`w-full h-full object-cover opacity-50 ${isPlaying ? 'animate-pulse' : ''}`}
            />
          </div>
          
          {/* Play Button */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePlay();
            }}
          >
            <motion.div
              className="w-12 h-12 rounded-full bg-primary bg-opacity-90 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
            </motion.div>
          </div>
          
          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 bg-surface bg-opacity-70 backdrop-blur-md rounded-md px-2 py-1 text-xs font-medium">
            {item.duration}
          </div>
          
          {/* Creator Badge */}
          <div className="absolute top-3 left-3 bg-surface bg-opacity-70 backdrop-blur-md rounded-full px-2 py-1 flex items-center">
            <div className="w-5 h-5 rounded-full overflow-hidden mr-1.5">
              <Image 
                src={item.creatorAvatar} 
                alt={item.creator} 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-medium truncate max-w-[100px]">{item.creator}</span>
          </div>
          
          {/* Trending or Staff Pick Badge */}
          {(item.isTrending || item.isStaffPick) && (
            <div className="absolute top-3 right-3 bg-primary bg-opacity-70 backdrop-blur-md rounded-md px-2 py-1 text-xs font-medium">
              {item.isTrending ? "Trending" : "Staff Pick"}
            </div>
          )}
        </div>
        
        {/* Music Info */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="heading-small mb-1 truncate">{item.title}</h3>
              <div className="flex items-center">
                <Icon 
                  name={getTypeIcon(item.type)} 
                  size={16} 
                  className={`mr-1.5 ${getTypeColor(item.type)}`}
                />
                <span className={`text-xs font-medium ${getTypeColor(item.type)}`}>
                  {item.type}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-xs text-text-tertiary">
                <Icon name="Play" size={12} className="mr-1" />
                <span>{formatNumber(item.plays)}</span>
              </div>
              <div className="flex items-center text-xs text-text-tertiary mt-1">
                <Icon name="Heart" size={12} className="mr-1" />
                <span>{formatNumber(item.likes)}</span>
              </div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {item.tags.map((tag, index) => (
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
      
      {/* Detailed View Modal */}
      {showDetails && (
        <div 
          className="fixed inset-0 bg-background bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowDetails(false)}
        >
          <motion.div 
            className="bg-surface rounded-xl w-full max-w-3xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-56">
              <Image 
                src={item.artwork} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent">
                <Image 
                  src={item.waveform} 
                  alt="Audio waveform" 
                  className={`w-full h-full object-cover opacity-30 ${isPlaying ? 'animate-pulse' : ''}`}
                />
              </div>
              
              <button 
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface bg-opacity-70 backdrop-blur-md flex items-center justify-center"
                onClick={() => setShowDetails(false)}
              >
                <Icon name="X" size={18} />
              </button>
              
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="display-small">{item.title}</h2>
                <div className="flex items-center mt-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                    <Image 
                      src={item.creatorAvatar} 
                      alt={item.creator} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium mr-3">{item.creator}</span>
                  
                  <Icon 
                    name={getTypeIcon(item.type)} 
                    size={16} 
                    className={`mr-1.5 ${getTypeColor(item.type)}`}
                  />
                  <span className={`text-sm font-medium ${getTypeColor(item.type)} mr-3`}>
                    {item.type}
                  </span>
                  
                  <span className="text-sm text-text-secondary">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Audio Player */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center">
                <button 
                  className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-4"
                  onClick={onTogglePlay}
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
                </button>
                
                <div className="flex-1">
                  <div className="relative w-full h-10">
                    <Image 
                      src={item.waveform} 
                      alt="Audio waveform" 
                      className={`w-full h-full object-cover rounded-lg ${isPlaying ? 'animate-pulse' : ''}`}
                    />
                    <div className="absolute inset-0 bg-primary bg-opacity-20 rounded-lg"></div>
                    <div 
                      className="absolute top-0 bottom-0 left-0 bg-primary bg-opacity-40 rounded-l-lg" 
                      style={{ width: isPlaying ? '45%' : '0%', transition: 'width 0.1s linear' }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-text-tertiary">
                    <span>{isPlaying ? "1:42" : "0:00"}</span>
                    <span>{item.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <div className="flex space-x-4">
                  <button className="flex items-center text-text-secondary hover:text-text-primary transition-colors">
                    <Icon name="Heart" size={20} className="mr-1" />
                    <span>{formatNumber(item.likes)}</span>
                  </button>
                  
                  <button className="flex items-center text-text-secondary hover:text-text-primary transition-colors">
                    <Icon name="MessageCircle" size={20} className="mr-1" />
                    <span>{formatNumber(item.comments)}</span>
                  </button>
                  
                  <button className="flex items-center text-text-secondary hover:text-text-primary transition-colors">
                    <Icon name="Bookmark" size={20} className="mr-1" />
                    <span>Save</span>
                  </button>
                </div>
                
                <div className="flex space-x-4">
                  <button className="flex items-center text-text-secondary hover:text-text-primary transition-colors">
                    <Icon name="Share2" size={20} className="mr-1" />
                    <span>Share</span>
                  </button>
                  
                  <button className="flex items-center text-text-secondary hover:text-text-primary transition-colors">
                    <Icon name="GitBranch" size={20} className="mr-1" />
                    <span>Remix</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Creator Notes */}
                <div>
                  <h3 className="heading-medium mb-4">Creator Notes</h3>
                  <div className="bg-surface-alt rounded-lg p-4">
                    <p className="text-sm text-text-secondary mb-4">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                {/* AI Parameters */}
                <div>
                  <h3 className="heading-medium mb-4">AI Parameters</h3>
                  <div className="bg-surface-alt rounded-lg p-4">
                    {item.type === "Vocal Tuning" && (
                      <>
                        <div className="flex justify-between mb-3">
                          <span className="text-text-secondary">Voice Multiplier</span>
                          <span>{item.aiParameters.voiceMultiplier}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                          <span className="text-text-secondary">Harmonization</span>
                          <span>{item.aiParameters.harmonizationStyle}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                          <span className="text-text-secondary">Effect Profile</span>
                          <span>{item.aiParameters.effectProfile}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                          <span className="text-text-secondary">Formant</span>
                          <span>{item.aiParameters.formant}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Vibrato</span>
                          <span>{item.aiParameters.vibrato}</span>
                        </div>
                      </>
                    )}
                    
                    {item.type === "Composition" && (
                      <>
                        {item.aiParameters.sourceAudio && (
                          <div className="flex justify-between mb-3">
                            <span className="text-text-secondary">Source Audio</span>
                            <span>{item.aiParameters.sourceAudio}</span>
                          </div>
                        )}
                        {item.aiParameters.narrativePrompt && (
                          <div className="flex justify-between mb-3">
                            <span className="text-text-secondary">Narrative Prompt</span>
                            <span>{item.aiParameters.narrativePrompt}</span>
                          </div>
                        )}
                        {item.aiParameters.mood && (
                          <div className="flex justify-between mb-3">
                            <span className="text-text-secondary">Mood</span>
                            <span>{item.aiParameters.mood}</span>
                          </div>
                        )}
                        {item.aiParameters.emotionalArc && (
                          <div className="flex justify-between mb-3">
                            <span className="text-text-secondary">Emotional Arc</span>
                            <span>{item.aiParameters.emotionalArc}</span>
                          </div>
                        )}
                        {item.aiParameters.instruments && (
                          <div className="flex justify-between mb-3">
                            <span className="text-text-secondary">Instruments</span>
                            <span>{item.aiParameters.instruments.join(", ")}</span>
                          </div>
                        )}
                        {item.aiParameters.soundPalette && (
                          <div className="flex justify-between mb-3">
                            <span className="text-text-secondary">Sound Palette</span>
                            <span>{item.aiParameters.soundPalette}</span>
                          </div>
                        )}
                        <div className="flex justify-between mb-3">
                          <span className="text-text-secondary">Tempo</span>
                          <span>{item.aiParameters.tempo} BPM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Key</span>
                          <span>{item.aiParameters.key}</span>
                        </div>
                      </>
                    )}
                    
                    {item.type === "Genre Fusion" && (
                      <>
                        <div className="flex justify-between mb-3">
                          <span className="text-text-secondary">Genre A</span>
                          <span>{item.aiParameters.genreA}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                          <span className="text-text-secondary">Genre B</span>
                          <span>{item.aiParameters.genreB}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                          <span className="text-text-secondary">Blend Ratio</span>
                          <span>{item.aiParameters.blendRatio}</span>
                        </div>
                        {item.aiParameters.preserveImprovisation !== undefined && (
                          <div className="flex justify-between mb-3">
                            <span className="text-text-secondary">Preserve Improvisation</span>
                            <span>{item.aiParameters.preserveImprovisation ? "Yes" : "No"}</span>
                          </div>
                        )}
                        {item.aiParameters.modernizationLevel !== undefined && (
                          <div className="flex justify-between mb-3">
                            <span className="text-text-secondary">Modernization Level</span>
                            <span>{item.aiParameters.modernizationLevel}</span>
                          </div>
                        )}
                        {item.aiParameters.preserveAuthenticity !== undefined && (
                          <div className="flex justify-between mb-3">
                            <span className="text-text-secondary">Preserve Authenticity</span>
                            <span>{item.aiParameters.preserveAuthenticity ? "Yes" : "No"}</span>
                          </div>
                        )}
                        <div className="flex justify-between mb-3">
                          <span className="text-text-secondary">Tempo</span>
                          <span>{item.aiParameters.tempo}</span>
                        </div>
                        {item.aiParameters.key && (
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Key</span>
                            <span>{item.aiParameters.key}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Comments Preview */}
              <div className="mt-6">
                <h3 className="heading-medium mb-4">Comments ({item.comments})</h3>
                <div className="bg-surface-alt rounded-lg p-4">
                  <div className="flex mb-4">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                      <Image 
                        src="https://randomuser.me/api/portraits/women/33.jpg" 
                        alt="Commenter" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">MelodyMaker</span>
                        <span className="text-xs text-text-tertiary">2 days ago</span>
                      </div>
                      <p className="text-sm text-text-secondary mt-1">
                        This is incredible! I love how you blended the traditional elements with the modern sound. The transition at 2:15 is especially smooth.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                      <Image 
                        src="https://randomuser.me/api/portraits/men/85.jpg" 
                        alt="Commenter" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">BeatArchitect</span>
                        <span className="text-xs text-text-tertiary">1 day ago</span>
                      </div>
                      <p className="text-sm text-text-secondary mt-1">
                        What parameters did you use for that ethereal pad sound in the background? I've been trying to achieve something similar.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <div className="w-full h-full bg-primary flex items-center justify-center">
                          <span className="text-sm font-medium">JS</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <input 
                          type="text" 
                          placeholder="Add a comment..." 
                          className="w-full bg-surface border-none rounded-lg py-2 px-4 focus:ring-primary focus:ring-2 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-between mt-6">
                <button 
                  className="flex items-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                  onClick={() => setShowDetails(false)}
                >
                  <Icon name="Download" size={18} className="mr-2" />
                  <span>Download</span>
                </button>
                
                <div className="flex space-x-3">
                  <button 
                    className="flex items-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                    onClick={() => setShowDetails(false)}
                  >
                    <Icon name="Flag" size={18} className="mr-2" />
                    <span>Report</span>
                  </button>
                  
                  <button 
                    className="flex items-center px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300"
                    onClick={() => setShowDetails(false)}
                  >
                    <Icon name="GitBranch" size={18} className="mr-2" />
                    <span>Create Remix</span>
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

export default MusicCard;