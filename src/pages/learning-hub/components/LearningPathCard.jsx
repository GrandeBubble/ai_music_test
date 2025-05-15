import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const LearningPathCard = ({ path }) => {
  const getLevelIcon = (level) => {
    switch (level) {
      case "beginner":
        return "Zap";
      case "intermediate":
        return "ZapOff";
      case "advanced":
        return "Flame";
      default:
        return "Zap";
    }
  };
  
  const getLevelColor = (level) => {
    switch (level) {
      case "beginner":
        return "text-accent-2";
      case "intermediate":
        return "text-accent-1";
      case "advanced":
        return "text-accent-3";
      default:
        return "text-primary";
    }
  };
  
  const getCategoryIcon = (category) => {
    switch (category) {
      case "vocal-tuning":
        return "Mic2";
      case "composition":
        return "Music";
      case "genre-fusion":
        return "Combine";
      case "theory":
        return "BookOpen";
      default:
        return "Lightbulb";
    }
  };
  
  const progressPercentage = (path.completedModules / path.totalModules) * 100;
  
  return (
    <motion.div
      className="bg-surface rounded-xl overflow-hidden h-full flex flex-col"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Path Image */}
      <div className="h-40 relative">
        <Image 
          src={path.image} 
          alt={path.title} 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay with category icon */}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
        
        <div className="absolute top-3 left-3 bg-surface bg-opacity-70 backdrop-blur-md rounded-md px-2 py-1 flex items-center">
          <Icon 
            name={getCategoryIcon(path.category)} 
            size={16} 
            className="mr-1.5"
          />
          <span className="text-xs font-medium capitalize">
            {path.category.replace("-", " ")}
          </span>
        </div>
        
        <div className="absolute top-3 right-3 bg-surface bg-opacity-70 backdrop-blur-md rounded-md px-2 py-1 flex items-center">
          <Icon 
            name={getLevelIcon(path.level)} 
            size={16} 
            className={`mr-1.5 ${getLevelColor(path.level)}`}
          />
          <span className={`text-xs font-medium capitalize ${getLevelColor(path.level)}`}>
            {path.level}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="heading-small mb-2">{path.title}</h3>
        <p className="text-sm text-text-secondary mb-4">{path.description}</p>
        
        <div className="mt-auto">
          {/* Progress bar */}
          <div className="flex justify-between text-xs mb-1">
            <span>{path.completedModules} of {path.totalModules} modules</span>
            <span>{path.estimatedHours} hours</span>
          </div>
          <div className="w-full h-2 bg-surface-alt rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          {/* Action button */}
          <button className="w-full mt-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 flex items-center justify-center">
            {path.completedModules > 0 ? (
              <>
                <Icon name="Play" size={18} className="mr-2" />
                <span>Continue Learning</span>
              </>
            ) : (
              <>
                <Icon name="BookOpen" size={18} className="mr-2" />
                <span>Start Learning</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LearningPathCard;