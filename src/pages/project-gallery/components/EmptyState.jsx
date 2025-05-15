import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const EmptyState = ({ searchQuery }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {searchQuery ? (
        <>
          <div className="w-16 h-16 rounded-full bg-surface-alt flex items-center justify-center mb-6">
            <Icon name="Search" size={32} className="text-text-tertiary" />
          </div>
          <h2 className="heading-large mb-3">No projects found</h2>
          <p className="text-text-secondary max-w-md mb-6">
            We couldn't find any projects matching "{searchQuery}". Try adjusting your search or filters.
          </p>
          <button className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300">
            Clear Search
          </button>
        </>
      ) : (
        <>
          <div className="w-16 h-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mb-6">
            <Icon name="Music" size={32} className="text-primary" />
          </div>
          <h2 className="heading-large mb-3">Create your first project</h2>
          <p className="text-text-secondary max-w-md mb-8">
            Get started with AI Music by creating your first project in one of our creative studios.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            <motion.div 
              className="bg-surface rounded-xl p-6 flex flex-col items-center text-center cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 rounded-full bg-accent-1 bg-opacity-20 flex items-center justify-center mb-4">
                <Icon name="Mic2" size={24} className="text-accent-1" />
              </div>
              <h3 className="heading-small mb-2">Vocal Tuning</h3>
              <p className="text-sm text-text-secondary">
                Enhance and correct vocals with AI
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-surface rounded-xl p-6 flex flex-col items-center text-center cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 rounded-full bg-accent-2 bg-opacity-20 flex items-center justify-center mb-4">
                <Icon name="Music" size={24} className="text-accent-2" />
              </div>
              <h3 className="heading-small mb-2">Composition</h3>
              <p className="text-sm text-text-secondary">
                Create original music with AI
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-surface rounded-xl p-6 flex flex-col items-center text-center cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 rounded-full bg-accent-3 bg-opacity-20 flex items-center justify-center mb-4">
                <Icon name="Combine" size={24} className="text-accent-3" />
              </div>
              <h3 className="heading-small mb-2">Genre Fusion</h3>
              <p className="text-sm text-text-secondary">
                Blend music styles with AI
              </p>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default EmptyState;