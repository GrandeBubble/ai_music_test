import React from "react";
import Icon from "../../../components/AppIcon";

const SearchFilters = ({ selectedCategory, setSelectedCategory, selectedLevel, setSelectedLevel }) => {
  return (
    <div className="bg-surface rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Filter */}
        <div>
          <h3 className="heading-small mb-4">Content Category</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${
                selectedCategory === "all" ?"bg-primary bg-opacity-20 text-primary" :"bg-surface-alt hover:bg-opacity-80"
              }`}
              onClick={() => setSelectedCategory("all")}
            >
              <Icon name="LayoutGrid" size={18} className="mr-2" />
              <span>All Content</span>
            </button>
            
            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${
                selectedCategory === "vocal-tuning" ?"bg-accent-1 bg-opacity-20 text-accent-1" :"bg-surface-alt hover:bg-opacity-80"
              }`}
              onClick={() => setSelectedCategory("vocal-tuning")}
            >
              <Icon name="Mic2" size={18} className="mr-2" />
              <span>Vocal Tuning</span>
            </button>
            
            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${
                selectedCategory === "composition" ?"bg-accent-2 bg-opacity-20 text-accent-2" :"bg-surface-alt hover:bg-opacity-80"
              }`}
              onClick={() => setSelectedCategory("composition")}
            >
              <Icon name="Music" size={18} className="mr-2" />
              <span>Composition</span>
            </button>
            
            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${
                selectedCategory === "genre-fusion" ?"bg-accent-3 bg-opacity-20 text-accent-3" :"bg-surface-alt hover:bg-opacity-80"
              }`}
              onClick={() => setSelectedCategory("genre-fusion")}
            >
              <Icon name="Combine" size={18} className="mr-2" />
              <span>Genre Fusion</span>
            </button>
          </div>
        </div>
        
        {/* Skill Level Filter */}
        <div>
          <h3 className="heading-small mb-4">Skill Level</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${
                selectedLevel === "all" ?"bg-primary bg-opacity-20 text-primary" :"bg-surface-alt hover:bg-opacity-80"
              }`}
              onClick={() => setSelectedLevel("all")}
            >
              <Icon name="Users" size={18} className="mr-2" />
              <span>All Levels</span>
            </button>
            
            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${
                selectedLevel === "beginner" ?"bg-accent-2 bg-opacity-20 text-accent-2" :"bg-surface-alt hover:bg-opacity-80"
              }`}
              onClick={() => setSelectedLevel("beginner")}
            >
              <Icon name="Zap" size={18} className="mr-2" />
              <span>Beginner</span>
            </button>
            
            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${
                selectedLevel === "intermediate" ?"bg-accent-1 bg-opacity-20 text-accent-1" :"bg-surface-alt hover:bg-opacity-80"
              }`}
              onClick={() => setSelectedLevel("intermediate")}
            >
              <Icon name="ZapOff" size={18} className="mr-2" />
              <span>Intermediate</span>
            </button>
            
            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${
                selectedLevel === "advanced" ?"bg-accent-3 bg-opacity-20 text-accent-3" :"bg-surface-alt hover:bg-opacity-80"
              }`}
              onClick={() => setSelectedLevel("advanced")}
            >
              <Icon name="Flame" size={18} className="mr-2" />
              <span>Advanced</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;