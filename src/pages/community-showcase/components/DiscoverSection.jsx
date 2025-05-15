import React, { useState } from "react";

import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import MusicCard from "./MusicCard";

const DiscoverSection = ({ musicItems, currentlyPlaying, togglePlay, isLoading }) => {
  const [discoverMode, setDiscoverMode] = useState("personalized");
  
  // Mock personalized recommendations
  const personalizedItems = musicItems.slice(0, 3);
  
  // Mock new releases
  const newReleases = [...musicItems].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
  
  // Mock experimental content
  const experimentalItems = musicItems.filter(item => 
    item.tags.includes("experimental") || 
    item.tags.includes("fusion") || 
    item.description.toLowerCase().includes("experiment")
  ).slice(0, 3);
  
  const getDiscoverItems = () => {
    switch (discoverMode) {
      case "personalized":
        return personalizedItems;
      case "new":
        return newReleases;
      case "experimental":
        return experimentalItems;
      default:
        return personalizedItems;
    }
  };
  
  const discoverItems = getDiscoverItems();
  
  if (isLoading) {
    return (
      <div className="mt-8">
        <div className="bg-surface rounded-xl p-6 mb-8 animate-pulse h-64"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-surface rounded-xl h-64 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="mt-8">
      {/* Discover Header */}
      <div className="bg-surface rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="heading-large mb-2">AI-Powered Discovery</h2>
            <p className="text-text-secondary max-w-2xl">
              Our AI analyzes your listening patterns and creative preferences to recommend music that might inspire you.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="bg-surface-alt rounded-lg p-1 flex">
              <button
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  discoverMode === "personalized" ?"bg-primary text-text-primary" :"hover:bg-opacity-80"
                }`}
                onClick={() => setDiscoverMode("personalized")}
              >
                For You
              </button>
              
              <button
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  discoverMode === "new" ?"bg-primary text-text-primary" :"hover:bg-opacity-80"
                }`}
                onClick={() => setDiscoverMode("new")}
              >
                New
              </button>
              
              <button
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  discoverMode === "experimental" ?"bg-primary text-text-primary" :"hover:bg-opacity-80"
                }`}
                onClick={() => setDiscoverMode("experimental")}
              >
                Experimental
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-surface-alt rounded-lg p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-4">
            <Icon name="Sparkles" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="heading-small mb-1">
              {discoverMode === "personalized" && "Personalized Recommendations"}
              {discoverMode === "new" && "Fresh Creations"}
              {discoverMode === "experimental" && "Boundary-Pushing Music"}
            </h3>
            <p className="text-sm text-text-secondary">
              {discoverMode === "personalized" && "Based on your recent listening to ambient and electronic music."}
              {discoverMode === "new" && "The latest uploads from our community creators."}
              {discoverMode === "experimental" && "Innovative works that push the boundaries of AI music creation."}
            </p>
          </div>
        </div>
      </div>
      
      {/* Discover Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {discoverItems.map(item => (
          <MusicCard
            key={item.id}
            item={item}
            isPlaying={currentlyPlaying === item.id}
            onTogglePlay={() => togglePlay(item.id)}
          />
        ))}
      </div>
      
      {/* Weekly Feature */}
      <div className="bg-surface rounded-xl overflow-hidden mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 lg:h-auto">
            <Image 
              src="https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Weekly Feature" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent lg:bg-gradient-to-t"></div>
            
            <div className="absolute bottom-4 left-4 lg:top-4 lg:left-4 bg-primary rounded-full px-3 py-1 text-sm font-medium">
              Weekly Feature
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="heading-large mb-2">Creator Spotlight: AmbientDreamer</h2>
            <p className="text-text-secondary mb-4">
              This week we're featuring AmbientDreamer, whose innovative use of field recordings and AI composition has created a unique sonic landscape that's captivating our community.
            </p>
            
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="AmbientDreamer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium">AmbientDreamer</div>
                <div className="text-sm text-text-tertiary">12 creations • 24K plays</div>
              </div>
            </div>
            
            <p className="text-text-secondary mb-6">
              "I've been experimenting with feeding natural sounds into the AI and seeing how it interprets and builds upon these organic foundations. The results have been fascinating - it's like collaborating with nature through technology."
            </p>
            
            <div className="flex space-x-3">
              <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 flex items-center">
                <Icon name="User" size={18} className="mr-2" />
                <span>View Profile</span>
              </button>
              
              <button className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 flex items-center">
                <Icon name="Music" size={18} className="mr-2" />
                <span>Listen to Works</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Community Challenge */}
      <div className="bg-surface rounded-xl p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-accent-3 bg-opacity-20 flex items-center justify-center mr-4">
            <Icon name="Trophy" size={20} className="text-accent-3" />
          </div>
          <h2 className="heading-large">Community Challenge</h2>
        </div>
        
        <div className="bg-surface-alt rounded-lg p-6 mb-6">
          <h3 className="heading-medium mb-2">This Week: "Sounds of the City"</h3>
          <p className="text-text-secondary mb-4">
            Create a composition that captures the essence of urban life. Use field recordings from your city, or use our library of urban sounds as source material for the AI.
          </p>
          
          <div className="flex items-center justify-between text-sm text-text-tertiary mb-4">
            <div className="flex items-center">
              <Icon name="Users" size={16} className="mr-1" />
              <span>42 participants</span>
            </div>
            <div className="flex items-center">
              <Icon name="Calendar" size={16} className="mr-1" />
              <span>5 days remaining</span>
            </div>
          </div>
          
          <button className="w-full py-3 rounded-lg bg-accent-3 hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center">
            <Icon name="PlusCircle" size={18} className="mr-2" />
            <span>Join Challenge</span>
          </button>
        </div>
        
        <div className="text-center">
          <h3 className="heading-small mb-2">Last Week's Winner</h3>
          <div className="flex items-center justify-center mb-2">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image 
                src="https://randomuser.me/api/portraits/men/62.jpg" 
                alt="FusionMaestro" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium">FusionMaestro</span>
          </div>
          <p className="text-sm text-text-secondary">
            "Quantum Soul" won our "Jazz Reimagined" challenge with its innovative blend of traditional jazz and electronic elements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscoverSection;