import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const CompositionControls = ({ project }) => {
  const [activeTab, setActiveTab] = useState("parameters");
  
  // Mock chord suggestions
  const chordSuggestions = [
    { id: "chord-1", name: "C Major", notes: "C-E-G" },
    { id: "chord-2", name: "G Major", notes: "G-B-D" },
    { id: "chord-3", name: "A Minor", notes: "A-C-E" },
    { id: "chord-4", name: "F Major", notes: "F-A-C" },
    { id: "chord-5", name: "D Minor", notes: "D-F-A" }
  ];
  
  // Mock melody suggestions
  const melodySuggestions = [
    { id: "melody-1", name: "Melody 1", complexity: "Simple" },
    { id: "melody-2", name: "Melody 2", complexity: "Moderate" },
    { id: "melody-3", name: "Melody 3", complexity: "Complex" }
  ];
  
  // Mock rhythm patterns
  const rhythmPatterns = [
    { id: "rhythm-1", name: "Basic 4/4", complexity: "Simple" },
    { id: "rhythm-2", name: "Syncopated", complexity: "Moderate" },
    { id: "rhythm-3", name: "Complex", complexity: "Advanced" }
  ];

  return (
    <div className="bg-surface rounded-xl h-[500px] flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="heading-small mb-3">Composition Controls</h3>
        
        {/* Tabs */}
        <div className="flex border border-border rounded-lg overflow-hidden">
          <button
            className={`flex-1 py-2 text-sm ${
              activeTab === "parameters" ?"bg-primary bg-opacity-20 text-primary" :"bg-surface-alt hover:bg-opacity-80"
            }`}
            onClick={() => setActiveTab("parameters")}
          >
            Parameters
          </button>
          <button
            className={`flex-1 py-2 text-sm ${
              activeTab === "suggestions" ?"bg-primary bg-opacity-20 text-primary" :"bg-surface-alt hover:bg-opacity-80"
            }`}
            onClick={() => setActiveTab("suggestions")}
          >
            Suggestions
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "parameters" ? (
          <div className="space-y-4">
            {/* Tempo Control */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium">Tempo</label>
                <span className="text-sm">{project.tempo} BPM</span>
              </div>
              <input
                type="range"
                min="40"
                max="240"
                value={project.tempo}
                className="w-full h-2 bg-surface-alt rounded-lg appearance-none cursor-pointer"
                onChange={() => {}}
              />
            </div>
            
            {/* Key Selector */}
            <div>
              <label className="text-sm font-medium block mb-1">Key</label>
              <div className="relative">
                <select
                  className="w-full bg-surface-alt border-none rounded-lg py-2 px-3 appearance-none focus:ring-primary focus:ring-2 focus:outline-none"
                  value={project.key}
                  onChange={() => {}}
                >
                  <option value="C Major">C Major</option>
                  <option value="G Major">G Major</option>
                  <option value="D Major">D Major</option>
                  <option value="A Major">A Major</option>
                  <option value="E Major">E Major</option>
                  <option value="A Minor">A Minor</option>
                  <option value="E Minor">E Minor</option>
                  <option value="B Minor">B Minor</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Icon name="ChevronDown" size={16} className="text-text-tertiary" />
                </div>
              </div>
            </div>
            
            {/* Time Signature */}
            <div>
              <label className="text-sm font-medium block mb-1">Time Signature</label>
              <div className="relative">
                <select
                  className="w-full bg-surface-alt border-none rounded-lg py-2 px-3 appearance-none focus:ring-primary focus:ring-2 focus:outline-none"
                  value={project.timeSignature}
                  onChange={() => {}}
                >
                  <option value="4/4">4/4</option>
                  <option value="3/4">3/4</option>
                  <option value="6/8">6/8</option>
                  <option value="5/4">5/4</option>
                  <option value="7/8">7/8</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Icon name="ChevronDown" size={16} className="text-text-tertiary" />
                </div>
              </div>
            </div>
            
            {/* AI Variation Slider */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium">AI Variation</label>
                <span className="text-sm">Balanced</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value="50"
                className="w-full h-2 bg-surface-alt rounded-lg appearance-none cursor-pointer"
                onChange={() => {}}
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-text-tertiary">Conventional</span>
                <span className="text-xs text-text-tertiary">Experimental</span>
              </div>
            </div>
            
            {/* Scale Type */}
            <div>
              <label className="text-sm font-medium block mb-1">Scale Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2 px-3 text-sm rounded-lg bg-primary bg-opacity-20 text-primary">
                  Major
                </button>
                <button className="py-2 px-3 text-sm rounded-lg bg-surface-alt hover:bg-opacity-80">
                  Minor
                </button>
                <button className="py-2 px-3 text-sm rounded-lg bg-surface-alt hover:bg-opacity-80">
                  Pentatonic
                </button>
                <button className="py-2 px-3 text-sm rounded-lg bg-surface-alt hover:bg-opacity-80">
                  Blues
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Chord Progression Suggestions */}
            <div>
              <h4 className="text-sm font-medium mb-2">Chord Progression</h4>
              <div className="space-y-2">
                {chordSuggestions.map(chord => (
                  <div 
                    key={chord.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-surface-alt hover:bg-opacity-80 cursor-pointer"
                  >
                    <div>
                      <div className="text-sm">{chord.name}</div>
                      <div className="text-xs text-text-tertiary">{chord.notes}</div>
                    </div>
                    <button className="w-6 h-6 rounded-full bg-surface flex items-center justify-center">
                      <Icon name="Plus" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Melody Suggestions */}
            <div>
              <h4 className="text-sm font-medium mb-2">Melody Ideas</h4>
              <div className="space-y-2">
                {melodySuggestions.map(melody => (
                  <div 
                    key={melody.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-surface-alt hover:bg-opacity-80 cursor-pointer"
                  >
                    <div>
                      <div className="text-sm">{melody.name}</div>
                      <div className="text-xs text-text-tertiary">{melody.complexity}</div>
                    </div>
                    <button className="w-6 h-6 rounded-full bg-surface flex items-center justify-center">
                      <Icon name="Play" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Rhythm Patterns */}
            <div>
              <h4 className="text-sm font-medium mb-2">Rhythm Patterns</h4>
              <div className="space-y-2">
                {rhythmPatterns.map(rhythm => (
                  <div 
                    key={rhythm.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-surface-alt hover:bg-opacity-80 cursor-pointer"
                  >
                    <div>
                      <div className="text-sm">{rhythm.name}</div>
                      <div className="text-xs text-text-tertiary">{rhythm.complexity}</div>
                    </div>
                    <button className="w-6 h-6 rounded-full bg-surface flex items-center justify-center">
                      <Icon name="Play" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompositionControls;