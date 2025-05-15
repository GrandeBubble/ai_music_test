import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2">
                <Icon name="Music" size={18} className="text-text-primary" />
              </div>
              <span className="text-lg font-display font-bold">AI Music</span>
            </Link>
          </div>

          {/* Search */}
          {/* <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="Search" size={18} className="text-text-tertiary" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full bg-surface-alt border-none rounded-lg py-2 pl-10 pr-4 focus:ring-primary focus:ring-2 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchQuery("")}
                >
                  <Icon name="X" size={16} className="text-text-tertiary hover:text-text-primary" />
                </button>
              )}
            </div>
          </div> */}

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            <button className="w-9 h-9 rounded-full bg-surface-alt flex items-center justify-center hover:bg-opacity-80 transition-all duration-300">
              <Icon name="Bell" size={18} />
            </button>

            <button className="w-9 h-9 rounded-full bg-surface-alt flex items-center justify-center hover:bg-opacity-80 transition-all duration-300">
              <Icon name="Settings" size={18} />
            </button>

            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-medium">JS</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;