import React, { useState } from "react";

import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const TechniqueExplorer = ({ techniques }) => {
  const [activeTechnique, setActiveTechnique] = useState(techniques[0]?.id || null);
  const [parameterValue, setParameterValue] = useState(50);
  
  const getCategoryIcon = (category) => {
    switch (category) {
      case "vocal-tuning":
        return "Mic2";
      case "composition":
        return "Music";
      case "genre-fusion":
        return "Combine";
      default:
        return "Lightbulb";
    }
  };
  
  const getCategoryColor = (category) => {
    switch (category) {
      case "vocal-tuning":
        return "text-accent-1";
      case "composition":
        return "text-accent-2";
      case "genre-fusion":
        return "text-accent-3";
      default:
        return "text-primary";
    }
  };
  
  const getParameterLabel = (category) => {
    switch (category) {
      case "vocal-tuning":
        return "Formant Shift";
      case "composition":
        return "Complexity";
      case "genre-fusion":
        return "Blend Ratio";
      default:
        return "Parameter";
    }
  };
  
  return (
    <div className="bg-surface rounded-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Technique Selector */}
        <div className="lg:col-span-1 border-r border-border">
          <div className="p-4 border-b border-border">
            <h3 className="heading-small">Select Technique</h3>
            <p className="text-sm text-text-secondary">
              Explore and experiment with different AI music techniques
            </p>
          </div>
          
          <div className="divide-y divide-border">
            {techniques.map(technique => (
              <div 
                key={technique.id}
                className={`p-4 cursor-pointer transition-all duration-300 ${
                  activeTechnique === technique.id 
                    ? "bg-primary bg-opacity-10" :"hover:bg-surface-alt"
                }`}
                onClick={() => setActiveTechnique(technique.id)}
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                    <Image 
                      src={technique.thumbnail} 
                      alt={technique.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <Icon 
                        name={getCategoryIcon(technique.category)} 
                        size={16} 
                        className={`mr-1.5 ${getCategoryColor(technique.category)}`}
                      />
                      <span className={`text-xs font-medium capitalize ${getCategoryColor(technique.category)}`}>
                        {technique.category.replace("-", " ")}
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-medium mb-1">{technique.title}</h4>
                    <p className="text-xs text-text-secondary line-clamp-2">{technique.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Interactive Demo */}
        <div className="lg:col-span-2 p-6">
          {activeTechnique && (
            <>
              <div className="mb-6">
                <h3 className="heading-medium mb-2">
                  {techniques.find(t => t.id === activeTechnique)?.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {techniques.find(t => t.id === activeTechnique)?.description}
                </p>
              </div>
              
              <div className="bg-surface-alt rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium">
                    {getParameterLabel(techniques.find(t => t.id === activeTechnique)?.category)}
                  </h4>
                  <span className="text-sm font-mono bg-background px-2 py-1 rounded">
                    {parameterValue}%
                  </span>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={parameterValue}
                  onChange={(e) => setParameterValue(e.target.value)}
                  className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer"
                />
                
                <div className="flex justify-between text-xs text-text-tertiary mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="bg-surface-alt rounded-xl p-6 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium mb-1">Try it yourself</h4>
                  <p className="text-xs text-text-secondary">
                    Adjust the parameters and hear the difference
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button className="w-12 h-12 rounded-full bg-surface flex items-center justify-center">
                    <Icon name="SkipBack" size={20} />
                  </button>
                  
                  <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <Icon name="Play" size={20} />
                  </button>
                  
                  <button className="w-12 h-12 rounded-full bg-surface flex items-center justify-center">
                    <Icon name="SkipForward" size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechniqueExplorer;