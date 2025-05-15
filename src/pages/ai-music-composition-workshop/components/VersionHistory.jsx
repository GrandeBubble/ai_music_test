import React from "react";
import Icon from "../../../components/AppIcon";

const VersionHistory = ({ versions }) => {
  // Format date
  const formatDate = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-surface rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="heading-small">Version History</h3>
        <button className="flex items-center text-sm text-text-secondary hover:text-text-primary transition-all duration-300">
          <Icon name="History" size={16} className="mr-1" />
          <span>View All Versions</span>
        </button>
      </div>
      
      <div className="relative">
        {/* Timeline */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border"></div>
        
        {/* Version Points */}
        <div className="space-y-4 ml-6">
          {versions.map((version, index) => (
            <div 
              key={version.id}
              className="relative"
            >
              {/* Timeline Point */}
              <div className={`absolute -left-6 top-1 w-6 h-6 rounded-full flex items-center justify-center ${
                index === 0 ? "bg-primary" : "bg-surface-alt"
              }`}>
                {index === 0 ? (
                  <Icon name="Check" size={14} />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-text-tertiary"></div>
                )}
              </div>
              
              {/* Version Info */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">
                    {version.label}
                    {index === 0 && (
                      <span className="ml-2 text-xs bg-primary bg-opacity-20 text-primary px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-text-tertiary">
                    {formatDate(version.timestamp)}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {index !== 0 && (
                    <button className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center hover:bg-opacity-80 transition-all duration-300">
                      <Icon name="RotateCcw" size={16} />
                    </button>
                  )}
                  
                  <button className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center hover:bg-opacity-80 transition-all duration-300">
                    <Icon name="Eye" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VersionHistory;