import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const ProgressTracker = ({ userProgress }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="bg-surface rounded-xl p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Overview */}
        <div className="lg:col-span-1">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-3">
              <Icon name="TrendingUp" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="heading-small">Your Learning Progress</h3>
              <p className="text-sm text-text-secondary">
                Last accessed: {formatDate(userProgress.lastAccessed)}
              </p>
            </div>
          </div>
          
          <div className="bg-surface-alt rounded-xl p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm">Overall Progress</span>
              <span className="text-sm font-medium">{userProgress.percentComplete}%</span>
            </div>
            
            <div className="w-full h-2 bg-background rounded-full overflow-hidden mb-2">
              <motion.div 
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${userProgress.percentComplete}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            
            <div className="text-xs text-text-tertiary">
              {userProgress.completedResources} of {userProgress.totalResources} resources completed
            </div>
          </div>
          
          <button className="w-full py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-sm flex items-center justify-center">
            <Icon name="BarChart2" size={16} className="mr-1.5" />
            <span>View Detailed Progress</span>
          </button>
        </div>
        
        {/* Recommended Next */}
        <div className="lg:col-span-2">
          <h3 className="heading-small mb-4">Recommended Next</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProgress.recommendedNext.map((item, index) => (
              <motion.div 
                key={item.id}
                className="bg-surface-alt rounded-xl p-4 flex items-start cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon 
                    name={item.type === "tutorial" ? "FileText" : "MousePointerClick"} 
                    size={18} 
                    className="text-primary"
                  />
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium capitalize bg-surface px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                    <span className="text-xs text-text-tertiary ml-2">
                      {item.duration}
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-medium">{item.title}</h4>
                  
                  <button className="text-xs text-primary flex items-center mt-2">
                    Start now <Icon name="ChevronRight" size={14} className="ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;