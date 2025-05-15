import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const MasterclassCard = ({ masterclass }) => {
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
      default:
        return "Lightbulb";
    }
  };
  
  return (
    <motion.div
      className="bg-surface rounded-xl overflow-hidden"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Thumbnail */}
        <div className="md:w-2/5 h-48 md:h-auto relative">
          <Image 
            src={masterclass.thumbnail} 
            alt={masterclass.title} 
            className="w-full h-full object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent opacity-60 md:block hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60 md:hidden"></div>
          
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-full bg-primary bg-opacity-80 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="Play" size={32} />
            </motion.div>
          </div>
          
          {/* Duration Badge */}
          <div className="absolute bottom-3 left-3 bg-surface bg-opacity-70 backdrop-blur-md rounded-md px-2 py-1 text-xs font-medium">
            {masterclass.duration}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 md:w-3/5">
          <div className="flex items-center mb-2">
            <Icon 
              name={getCategoryIcon(masterclass.category)} 
              size={16} 
              className="mr-1.5"
            />
            <span className="text-xs font-medium capitalize mr-3">
              {masterclass.category.replace("-", " ")}
            </span>
            
            <Icon 
              name="CircleDot" 
              size={16} 
              className={`mr-1.5 ${getLevelColor(masterclass.level)}`}
            />
            <span className={`text-xs font-medium capitalize ${getLevelColor(masterclass.level)}`}>
              {masterclass.level}
            </span>
          </div>
          
          <h3 className="heading-medium mb-1">{masterclass.title}</h3>
          
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-2">
              <Icon name="User" size={16} />
            </div>
            <div>
              <p className="text-sm font-medium">{masterclass.instructor}</p>
              <p className="text-xs text-text-secondary">{masterclass.credentials}</p>
            </div>
          </div>
          
          <p className="text-sm text-text-secondary mb-4">{masterclass.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-text-tertiary">
              {masterclass.modules} modules
            </div>
            
            <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-sm flex items-center">
              <Icon name="Play" size={16} className="mr-1.5" />
              <span>Start Masterclass</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MasterclassCard;