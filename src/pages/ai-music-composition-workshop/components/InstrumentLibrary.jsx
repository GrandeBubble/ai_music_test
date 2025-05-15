import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const InstrumentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Instrument categories
  const categories = [
    { id: "all", name: "All" },
    { id: "keys", name: "Keys" },
    { id: "strings", name: "Strings" },
    { id: "woodwind", name: "Woodwind" },
    { id: "brass", name: "Brass" },
    { id: "percussion", name: "Percussion" },
    { id: "synth", name: "Synth" },
    { id: "ai", name: "AI Generated" }
  ];
  
  // Mock instruments data
  const instruments = [
    { id: "grand-piano", name: "Grand Piano", category: "keys", icon: "Piano" },
    { id: "electric-piano", name: "Electric Piano", category: "keys", icon: "Piano" },
    { id: "organ", name: "Organ", category: "keys", icon: "Piano" },
    { id: "acoustic-guitar", name: "Acoustic Guitar", category: "strings", icon: "Guitar" },
    { id: "electric-guitar", name: "Electric Guitar", category: "strings", icon: "Guitar" },
    { id: "violin", name: "Violin", category: "strings", icon: "Music" },
    { id: "ensemble-strings", name: "Ensemble Strings", category: "strings", icon: "Music" },
    { id: "flute", name: "Flute", category: "woodwind", icon: "Music" },
    { id: "clarinet", name: "Clarinet", category: "woodwind", icon: "Music" },
    { id: "saxophone", name: "Saxophone", category: "woodwind", icon: "Music" },
    { id: "trumpet", name: "Trumpet", category: "brass", icon: "Music" },
    { id: "trombone", name: "Trombone", category: "brass", icon: "Music" },
    { id: "french-horn", name: "French Horn", category: "brass", icon: "Music" },
    { id: "acoustic-drums", name: "Acoustic Drums", category: "percussion", icon: "Music" },
    { id: "electronic-drums", name: "Electronic Drums", category: "percussion", icon: "Music" },
    { id: "analog-synth", name: "Analog Synth", category: "synth", icon: "Waveform" },
    { id: "digital-synth", name: "Digital Synth", category: "synth", icon: "Waveform" },
    { id: "ai-texture-1", name: "AI Texture 1", category: "ai", icon: "Sparkles" },
    { id: "ai-texture-2", name: "AI Texture 2", category: "ai", icon: "Sparkles" }
  ];
  
  // Filter instruments based on search and category
  const filteredInstruments = instruments.filter(instrument => {
    const matchesSearch = instrument.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || instrument.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-surface rounded-xl h-[500px] flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="heading-small mb-3">Instrument Library</h3>
        
        {/* Search */}
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={16} className="text-text-tertiary" />
          </div>
          <input
            type="text"
            placeholder="Search instruments..."
            className="w-full bg-surface-alt border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-primary focus:ring-2 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`text-xs px-3 py-1 rounded-full transition-all duration-300 ${
                selectedCategory === category.id 
                  ? "bg-primary text-text-primary" :"bg-surface-alt text-text-secondary hover:bg-opacity-80"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Instrument List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredInstruments.length > 0 ? (
          <div className="space-y-1">
            {filteredInstruments.map(instrument => (
              <div
                key={instrument.id}
                className="flex items-center p-2 rounded-lg hover:bg-surface-alt cursor-pointer transition-all duration-300"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("instrument", JSON.stringify(instrument));
                }}
              >
                <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center mr-3">
                  <Icon name={instrument.icon} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{instrument.name}</div>
                  <div className="text-xs text-text-tertiary capitalize">{instrument.category}</div>
                </div>
                <Icon name="Plus" size={16} className="text-text-tertiary" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <Icon name="Search" size={24} className="text-text-tertiary mb-2" />
            <p className="text-text-secondary text-sm">No instruments found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
      
      {/* Add Custom Instrument */}
      <div className="p-3 border-t border-border">
        <button className="w-full py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm flex items-center justify-center">
          <Icon name="Plus" size={16} className="mr-2" />
          <span>Add Custom Instrument</span>
        </button>
      </div>
    </div>
  );
};

export default InstrumentLibrary;