import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const CompositionCanvas = ({ project, isPlaying }) => {
  // Calculate total bars
  const totalBars = project.sections.reduce((sum, section) => sum + section.bars, 0);
  
  // Generate grid columns based on total bars
  const gridColumns = Array.from({ length: totalBars }, (_, i) => i + 1);
  
  // Calculate section positions
  const sectionPositions = [];
  let currentPosition = 0;
  
  project.sections.forEach(section => {
    sectionPositions.push({
      ...section,
      startBar: currentPosition + 1,
      endBar: currentPosition + section.bars
    });
    currentPosition += section.bars;
  });

  return (
    <div className="bg-surface rounded-xl overflow-hidden h-[500px]">
      {/* Section Headers */}
      <div className="flex border-b border-border">
        <div className="w-32 bg-surface-alt p-2 border-r border-border">
          <span className="text-sm font-medium">Tracks</span>
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="flex min-w-max">
            {sectionPositions.map((section, index) => (
              <div 
                key={section.id}
                className="flex-shrink-0 border-r border-border"
                style={{ width: `${section.bars * 80}px` }}
              >
                <div className="flex items-center justify-between p-2">
                  <span className="text-sm font-medium">{section.name}</span>
                  <span className="text-xs text-text-tertiary">{section.bars} bars</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Track Rows */}
      <div className="flex h-[calc(100%-36px)]">
        {/* Track Names */}
        <div className="w-32 bg-surface-alt flex flex-col border-r border-border">
          {project.tracks.map((track) => (
            <div 
              key={track.id}
              className="flex items-center p-3 border-b border-border h-[100px]"
            >
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: track.color }}
              ></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{track.name}</div>
                <div className="text-xs text-text-tertiary truncate">{track.instrument}</div>
              </div>
              <div className="flex flex-col space-y-1 ml-1">
                <button className="text-text-tertiary hover:text-text-primary">
                  <Icon name={track.muted ? "VolumeX" : "Volume2"} size={14} />
                </button>
                <button className="text-text-tertiary hover:text-text-primary">
                  <Icon name="Settings" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Composition Grid */}
        <div className="flex-1 overflow-auto relative">
          {/* Grid Background */}
          <div className="absolute inset-0 grid grid-cols-4" style={{ 
            display: "grid", 
            gridTemplateColumns: `repeat(${totalBars}, 80px)`,
            gridTemplateRows: `repeat(${project.tracks.length}, 100px)`
          }}>
            {project.tracks.flatMap((track, trackIndex) => 
              gridColumns.map((colIndex) => (
                <div 
                  key={`${track.id}-${colIndex}`}
                  className="border-r border-b border-border bg-surface-alt bg-opacity-20"
                ></div>
              ))
            )}
          </div>
          
          {/* Section Backgrounds */}
          <div className="absolute inset-0">
            {sectionPositions.map((section, index) => (
              <div 
                key={section.id}
                className={`absolute top-0 bottom-0 ${index % 2 === 0 ? 'bg-surface-alt bg-opacity-5' : ''}`}
                style={{ 
                  left: `${(section.startBar - 1) * 80}px`, 
                  width: `${section.bars * 80}px` 
                }}
              ></div>
            ))}
          </div>
          
          {/* Playhead */}
          {isPlaying && (
            <motion.div 
              className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
              initial={{ left: 0 }}
              animate={{ left: `${totalBars * 80}px` }}
              transition={{ duration: totalBars * 0.5, ease: "linear" }}
            ></motion.div>
          )}
          
          {/* Note Blocks - Mock Data */}
          <div className="absolute inset-0">
            {/* Piano Track Notes */}
            <div 
              className="absolute bg-accent-2 bg-opacity-70 rounded-md"
              style={{ 
                top: '10px', 
                left: '10px', 
                width: '150px', 
                height: '80px' 
              }}
            ></div>
            <div 
              className="absolute bg-accent-2 bg-opacity-70 rounded-md"
              style={{ 
                top: '20px', 
                left: '250px', 
                width: '120px', 
                height: '60px' 
              }}
            ></div>
            
            {/* Strings Track Notes */}
            <div 
              className="absolute bg-accent-1 bg-opacity-70 rounded-md"
              style={{ 
                top: '110px', 
                left: '170px', 
                width: '200px', 
                height: '70px' 
              }}
            ></div>
            
            {/* Drums Track Notes */}
            <div 
              className="absolute bg-accent-3 bg-opacity-70 rounded-md"
              style={{ 
                top: '210px', 
                left: '10px', 
                width: '70px', 
                height: '80px' 
              }}
            ></div>
            <div 
              className="absolute bg-accent-3 bg-opacity-70 rounded-md"
              style={{ 
                top: '210px', 
                left: '90px', 
                width: '70px', 
                height: '80px' 
              }}
            ></div>
            <div 
              className="absolute bg-accent-3 bg-opacity-70 rounded-md"
              style={{ 
                top: '210px', 
                left: '170px', 
                width: '70px', 
                height: '80px' 
              }}
            ></div>
            <div 
              className="absolute bg-accent-3 bg-opacity-70 rounded-md"
              style={{ 
                top: '210px', 
                left: '250px', 
                width: '70px', 
                height: '80px' 
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompositionCanvas;