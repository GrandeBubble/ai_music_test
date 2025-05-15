import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const AIAssistant = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("suggestions");
  
  // Mock AI suggestions
  const suggestions = [
    {
      id: "sug-1",
      type: "structure",
      message: "Your composition could benefit from a bridge section after the second chorus.",
      action: "Add Bridge"
    },
    {
      id: "sug-2",
      type: "harmony",
      message: "Try adding a suspended chord before resolving to the tonic in your chorus.",
      action: "Apply"
    },
    {
      id: "sug-3",
      type: "melody",
      message: "The melody in the verse could use more variation. Would you like me to suggest alternatives?",
      action: "Generate"
    }
  ];
  
  // Tabs for AI assistant
  const tabs = [
    { id: "suggestions", name: "Suggestions", icon: "Lightbulb" },
    { id: "chat", name: "Chat", icon: "MessageSquare" },
    { id: "help", name: "Help", icon: "HelpCircle" }
  ];

  return (
    <motion.div 
      className="bg-surface rounded-xl overflow-hidden"
      animate={{ height: isExpanded ? "auto" : "64px" }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-3">
            <Icon name="Sparkles" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="heading-small">AI Assistant</h3>
            <p className="text-sm text-text-secondary">
              {isExpanded ? "Intelligent composition assistance" : "3 suggestions available"}
            </p>
          </div>
        </div>
        
        <button>
          <Icon name={isExpanded ? "ChevronDown" : "ChevronUp"} size={20} />
        </button>
      </div>
      
      {/* Expanded Content */}
      {isExpanded && (
        <div>
          {/* Tabs */}
          <div className="border-t border-b border-border flex">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`flex-1 py-3 flex items-center justify-center ${
                  activeTab === tab.id 
                    ? "border-b-2 border-primary text-primary" :"text-text-secondary hover:text-text-primary"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon name={tab.icon} size={16} className="mr-2" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="p-4">
            {activeTab === "suggestions" && (
              <div className="space-y-3">
                {suggestions.map(suggestion => (
                  <div 
                    key={suggestion.id}
                    className="bg-surface-alt rounded-lg p-3 flex items-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                      <Icon 
                        name={
                          suggestion.type === "structure" ? "LayoutGrid" : 
                          suggestion.type === "harmony" ? "Music" : "Waveform"
                        } 
                        size={16} 
                        className="text-primary" 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm mb-2">{suggestion.message}</div>
                      <button className="text-xs px-3 py-1 rounded-full bg-primary text-text-primary hover:bg-primary-dark transition-all duration-300">
                        {suggestion.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === "chat" && (
              <div>
                <div className="bg-surface-alt rounded-lg p-3 mb-3">
                  <p className="text-sm mb-2">How can I help with your composition today?</p>
                  <div className="text-xs text-text-tertiary">AI Assistant</div>
                </div>
                
                <div className="flex mt-4">
                  <input
                    type="text"
                    placeholder="Ask something about your composition..."
                    className="flex-1 bg-surface-alt border-none rounded-l-lg py-2 px-4 focus:ring-primary focus:ring-2 focus:outline-none"
                  />
                  <button className="bg-primary hover:bg-primary-dark transition-all duration-300 rounded-r-lg px-4">
                    <Icon name="Send" size={18} />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <button className="text-xs px-3 py-1 rounded-full bg-surface-alt hover:bg-opacity-80 transition-all duration-300">
                    Suggest a chord progression
                  </button>
                  <button className="text-xs px-3 py-1 rounded-full bg-surface-alt hover:bg-opacity-80 transition-all duration-300">
                    Help with melody
                  </button>
                  <button className="text-xs px-3 py-1 rounded-full bg-surface-alt hover:bg-opacity-80 transition-all duration-300">
                    Fix timing issues
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === "help" && (
              <div className="space-y-3">
                <div className="bg-surface-alt rounded-lg p-3">
                  <h4 className="text-sm font-medium mb-1">Quick Tips</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li className="flex items-start">
                      <Icon name="ChevronRight" size={14} className="mr-1 mt-1 flex-shrink-0" />
                      <span>Use the AI Suggest button for intelligent composition assistance</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="ChevronRight" size={14} className="mr-1 mt-1 flex-shrink-0" />
                      <span>Drag instruments from the library to add new tracks</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="ChevronRight" size={14} className="mr-1 mt-1 flex-shrink-0" />
                      <span>Adjust the AI Variation slider to control how experimental the suggestions are</span>
                    </li>
                  </ul>
                </div>
                
                <button className="w-full py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm flex items-center justify-center">
                  <Icon name="BookOpen" size={16} className="mr-2" />
                  <span>View Full Tutorial</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AIAssistant;