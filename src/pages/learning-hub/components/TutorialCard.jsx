import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const TutorialCard = ({ tutorial, onMarkCompleted }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return "Video";
      case "interactive":
        return "MousePointerClick";
      case "guide":
        return "FileText";
      default:
        return "FileText";
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
  
  return (
    <motion.div
      className={`bg-surface rounded-xl overflow-hidden transition-all duration-300 ${
        tutorial.completed ? "ring-2 ring-success" : ""
      }`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Thumbnail */}
      <div className="h-32 relative">
        <Image 
          src={tutorial.thumbnail} 
          alt={tutorial.title} 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3 bg-surface bg-opacity-70 backdrop-blur-md rounded-md px-2 py-1 flex items-center">
          <Icon 
            name={getTypeIcon(tutorial.type)} 
            size={16} 
            className="mr-1.5"
          />
          <span className="text-xs font-medium capitalize">
            {tutorial.type}
          </span>
        </div>
        
        {/* Duration Badge */}
        <div className="absolute top-3 right-3 bg-surface bg-opacity-70 backdrop-blur-md rounded-md px-2 py-1 text-xs font-medium">
          {tutorial.duration}
        </div>
        
        {/* Completed Badge */}
        {tutorial.completed && (
          <div className="absolute bottom-3 right-3 bg-success bg-opacity-20 text-success rounded-md px-2 py-1 text-xs font-medium flex items-center">
            <Icon name="CheckCircle" size={14} className="mr-1" />
            <span>Completed</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-center mb-2">
          <Icon 
            name="CircleDot" 
            size={16} 
            className={`mr-1.5 ${getLevelColor(tutorial.level)}`}
          />
          <span className={`text-xs font-medium capitalize ${getLevelColor(tutorial.level)}`}>
            {tutorial.level}
          </span>
        </div>
        
        <h3 className="heading-small mb-1 line-clamp-2">{tutorial.title}</h3>
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">{tutorial.description}</p>
        
        <div className="flex justify-between">
          <button 
            className="flex items-center text-sm text-primary"
            onClick={() => {}}
          >
            <Icon name="Play" size={16} className="mr-1.5" />
            <span>Start</span>
          </button>
          
          <button 
            className="flex items-center text-sm text-text-secondary"
            onClick={onMarkCompleted}
          >
            <Icon 
              name={tutorial.completed ? "CheckSquare" : "Square"} 
              size={16} 
              className="mr-1.5"
            />
            <span>{tutorial.completed ? "Completed" : "Mark Complete"}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorialCard;