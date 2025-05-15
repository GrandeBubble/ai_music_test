import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const CommunityQA = ({ questions }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "vocal-tuning":
        return "Mic2";
      case "composition":
        return "Music";
      case "genre-fusion":
        return "Combine";
      default:
        return "HelpCircle";
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
  
  return (
    <div className="bg-surface rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="heading-small">Popular Questions</h3>
        <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-sm flex items-center">
          <Icon name="PlusCircle" size={16} className="mr-1.5" />
          <span>Ask a Question</span>
        </button>
      </div>
      
      <div className="divide-y divide-border">
        {questions.map(question => (
          <motion.div 
            key={question.id}
            className="p-4 hover:bg-surface-alt transition-all duration-300 cursor-pointer"
            whileHover={{ x: 5 }}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <Image 
                  src={question.avatar} 
                  alt={question.askedBy} 
                  className="w-10 h-10 rounded-full"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <Icon 
                    name={getCategoryIcon(question.category)} 
                    size={16} 
                    className={`mr-1.5 ${getCategoryColor(question.category)}`}
                  />
                  <span className={`text-xs font-medium capitalize ${getCategoryColor(question.category)}`}>
                    {question.category.replace("-", " ")}
                  </span>
                  
                  {question.verified && (
                    <span className="ml-2 bg-success bg-opacity-20 text-success text-xs px-2 py-0.5 rounded-full flex items-center">
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
                
                <h4 className="text-base font-medium mb-1">{question.question}</h4>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">
                    Asked by {question.askedBy}
                  </span>
                  
                  <div className="flex items-center text-xs text-text-secondary">
                    <Icon name="MessageCircle" size={14} className="mr-1" />
                    <span>{question.answers} answer{question.answers !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="p-4 bg-surface-alt flex justify-center">
        <button className="text-sm text-primary flex items-center">
          View all questions <Icon name="ChevronRight" size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default CommunityQA;