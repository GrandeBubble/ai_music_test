import React from "react";

import Icon from "../../../components/AppIcon";
import MusicCard from "./MusicCard";

const TrendingCategories = ({ trendingItems, currentlyPlaying, togglePlay, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mb-12">
        <h2 className="heading-large mb-6">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-surface rounded-xl h-64 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (trendingItems.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="heading-large">Trending Now</h2>
        <button className="flex items-center text-text-secondary hover:text-text-primary transition-colors">
          <span className="mr-1">View All</span>
          <Icon name="ChevronRight" size={18} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trendingItems.slice(0, 4).map(item => (
          <MusicCard
            key={item.id}
            item={item}
            isPlaying={currentlyPlaying === item.id}
            onTogglePlay={() => togglePlay(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingCategories;