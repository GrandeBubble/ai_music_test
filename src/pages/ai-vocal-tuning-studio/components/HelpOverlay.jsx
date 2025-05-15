import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const HelpOverlay = ({ onClose }) => {
  const helpSections = [
    {
      title: "Getting Started",
      icon: "FileAudio",
      content: "Upload your vocal file using the Audio Source panel. We support WAV, MP3, AIFF, and FLAC formats up to 50MB."
    },
    {
      title: "Waveform Navigation",
      icon: "Waveform",
      content: "Click anywhere on the waveform to set the playhead position. Use the zoom controls to focus on specific sections. Click and drag to select a region for processing."
    },
    {
      title: "AI Enhancement Controls",
      icon: "Sliders",
      content: "Adjust parameters to enhance your vocals. Pitch Correction fixes intonation issues, Vibrato adds natural vibrato, Formant Shift changes vocal character, and more."
    },
    {
      title: "Presets",
      icon: "Sparkles",
      content: "Apply one-click presets for popular vocal styles or save your own custom presets for future use."
    },
    {
      title: "History",
      icon: "History",
      content: "Every change is tracked in the History panel. Use the undo/redo buttons or click on any history item to revert to that state."
    },
    {
      title: "Advanced Analysis",
      icon: "BarChart2",
      content: "Toggle the frequency analysis view to see detailed visualizations of your audio\'s frequency spectrum and pitch tracking."
    },
    {
      title: "Keyboard Shortcuts",
      icon: "Keyboard",
      content: "Space: Play/Pause, Ctrl+Z: Undo, Ctrl+Shift+Z: Redo, H: Toggle Help"
    }
  ];
  
  return (
    <motion.div 
      className="fixed inset-0 bg-background bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-surface rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-border flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-4">
              <Icon name="HelpCircle" size={20} className="text-primary" />
            </div>
            <h2 className="heading-large">AI Vocal Tuning Studio Help</h2>
          </div>
          
          <button 
            className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center hover:bg-opacity-80 transition-all duration-300"
            onClick={onClose}
          >
            <Icon name="X" size={18} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helpSections.map((section, index) => (
              <motion.div 
                key={index}
                className="bg-surface-alt rounded-lg p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-4 mt-1">
                    <Icon name={section.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="heading-medium mb-2">{section.title}</h3>
                    <p className="text-text-secondary">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 bg-primary bg-opacity-10 rounded-lg p-6">
            <h3 className="heading-medium mb-4 text-primary">Need More Help?</h3>
            <p className="text-text-secondary mb-4">
              Check out our comprehensive tutorials and guides in the Learning Hub for more detailed instructions on getting the most out of the AI Vocal Tuning Studio.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300">
                <Icon name="GraduationCap" size={18} className="mr-2" />
                <span>Visit Learning Hub</span>
              </button>
              
              <button className="flex items-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300">
                <Icon name="Video" size={18} className="mr-2" />
                <span>Watch Tutorial</span>
              </button>
              
              <button className="flex items-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300">
                <Icon name="MessageSquare" size={18} className="mr-2" />
                <span>Contact Support</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HelpOverlay;