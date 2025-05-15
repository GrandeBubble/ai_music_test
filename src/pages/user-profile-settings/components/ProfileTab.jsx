import React, { useState } from "react";

import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import UsageStats from "./UsageStats";
import AchievementBadges from "./AchievementBadges";

const ProfileTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const userData = {
    name: "Jason Smith",
    username: "jasonsmith",
    email: "jason.smith@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
    biography: `Music producer and sound engineer with a passion for electronic and ambient genres. I've been creating music for over 10 years and recently started exploring AI-assisted composition to expand my creative horizons.

I'm particularly interested in blending traditional instruments with AI-generated elements to create unique soundscapes that bridge the gap between conventional and experimental music.`,
    location: "Los Angeles, CA",
    website: "https://jasonsmith.music",
    socialLinks: {
      spotify: "jasonsmith",
      soundcloud: "jason_smith_music",
      youtube: "JasonSmithMusic",
      instagram: "jasonsmith.music"
    },
    joinDate: "2022-03-15T14:30:00"
  };
  
  const [formData, setFormData] = useState({
    name: userData.name,
    username: userData.username,
    email: userData.email,
    biography: userData.biography,
    location: userData.location,
    website: userData.website,
    spotify: userData.socialLinks.spotify,
    soundcloud: userData.socialLinks.soundcloud,
    youtube: userData.socialLinks.youtube,
    instagram: userData.socialLinks.instagram
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to backend
    setIsEditing(false);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Profile Info */}
      <div className="lg:col-span-2">
        {/* Cover Image & Avatar */}
        <div className="relative rounded-xl overflow-hidden mb-6">
          <div className="h-48 relative">
            <Image 
              src={userData.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
          </div>
          
          <div className="absolute bottom-4 left-6 flex items-end">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-background overflow-hidden">
                <Image 
                  src={userData.avatar} 
                  alt={userData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Icon name="Camera" size={16} />
                </button>
              )}
            </div>
            
            <div className="ml-4 mb-2">
              {!isEditing ? (
                <>
                  <h2 className="heading-large text-white">{userData.name}</h2>
                  <p className="text-text-secondary">@{userData.username}</p>
                </>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-surface border-none rounded-lg py-1 px-3 w-full focus:ring-primary focus:ring-2 focus:outline-none"
                    placeholder="Your name"
                  />
                  <div className="flex items-center">
                    <span className="text-text-secondary mr-1">@</span>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="bg-surface border-none rounded-lg py-1 px-3 w-full focus:ring-primary focus:ring-2 focus:outline-none"
                      placeholder="username"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {!isEditing && (
            <button 
              className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-surface bg-opacity-70 backdrop-blur-md flex items-center"
              onClick={() => setIsEditing(true)}
            >
              <Icon name="Edit2" size={16} className="mr-2" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
        
        {/* Profile Form */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="bg-surface rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-text-secondary mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-surface-alt border-none rounded-lg py-2 px-4 w-full focus:ring-primary focus:ring-2 focus:outline-none"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label className="block text-text-secondary mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="bg-surface-alt border-none rounded-lg py-2 px-4 w-full focus:ring-primary focus:ring-2 focus:outline-none"
                  placeholder="Your location"
                />
              </div>
              
              <div>
                <label className="block text-text-secondary mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="bg-surface-alt border-none rounded-lg py-2 px-4 w-full focus:ring-primary focus:ring-2 focus:outline-none"
                  placeholder="Your website"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-text-secondary mb-2">Biography</label>
                <textarea
                  name="biography"
                  value={formData.biography}
                  onChange={handleInputChange}
                  rows={6}
                  className="bg-surface-alt border-none rounded-lg py-2 px-4 w-full focus:ring-primary focus:ring-2 focus:outline-none"
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="heading-small mb-4">Social Profiles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center bg-surface-alt rounded-lg p-3">
                  <div className="w-8 h-8 rounded-full bg-[#1DB954] bg-opacity-20 flex items-center justify-center mr-3">
                    <Icon name="Music" size={16} className="text-[#1DB954]" />
                  </div>
                  <input
                    type="text"
                    name="spotify"
                    value={formData.spotify}
                    onChange={handleInputChange}
                    className="bg-transparent border-none w-full focus:ring-primary focus:ring-2 focus:outline-none"
                    placeholder="Spotify username"
                  />
                </div>
                
                <div className="flex items-center bg-surface-alt rounded-lg p-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF5500] bg-opacity-20 flex items-center justify-center mr-3">
                    <Icon name="Cloud" size={16} className="text-[#FF5500]" />
                  </div>
                  <input
                    type="text"
                    name="soundcloud"
                    value={formData.soundcloud}
                    onChange={handleInputChange}
                    className="bg-transparent border-none w-full focus:ring-primary focus:ring-2 focus:outline-none"
                    placeholder="SoundCloud username"
                  />
                </div>
                
                <div className="flex items-center bg-surface-alt rounded-lg p-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF0000] bg-opacity-20 flex items-center justify-center mr-3">
                    <Icon name="Youtube" size={16} className="text-[#FF0000]" />
                  </div>
                  <input
                    type="text"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleInputChange}
                    className="bg-transparent border-none w-full focus:ring-primary focus:ring-2 focus:outline-none"
                    placeholder="YouTube channel"
                  />
                </div>
                
                <div className="flex items-center bg-surface-alt rounded-lg p-3">
                  <div className="w-8 h-8 rounded-full bg-[#E1306C] bg-opacity-20 flex items-center justify-center mr-3">
                    <Icon name="Instagram" size={16} className="text-[#E1306C]" />
                  </div>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="bg-transparent border-none w-full focus:ring-primary focus:ring-2 focus:outline-none"
                    placeholder="Instagram username"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-surface rounded-xl p-6">
            <div className="mb-6">
              <h3 className="heading-small mb-4">About</h3>
              <p className="text-text-secondary whitespace-pre-line">{userData.biography}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="heading-small mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Icon name="Mail" size={16} className="text-text-tertiary mr-3" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="MapPin" size={16} className="text-text-tertiary mr-3" />
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Globe" size={16} className="text-text-tertiary mr-3" />
                    <a href={userData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {userData.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Calendar" size={16} className="text-text-tertiary mr-3" />
                    <span>Joined {formatDate(userData.joinDate)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="heading-small mb-3">Social Profiles</h3>
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href={`https://open.spotify.com/user/${userData.socialLinks.spotify}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center bg-surface-alt rounded-lg p-3 hover:bg-opacity-80 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1DB954] bg-opacity-20 flex items-center justify-center mr-3">
                      <Icon name="Music" size={16} className="text-[#1DB954]" />
                    </div>
                    <span>Spotify</span>
                  </a>
                  
                  <a 
                    href={`https://soundcloud.com/${userData.socialLinks.soundcloud}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center bg-surface-alt rounded-lg p-3 hover:bg-opacity-80 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FF5500] bg-opacity-20 flex items-center justify-center mr-3">
                      <Icon name="Cloud" size={16} className="text-[#FF5500]" />
                    </div>
                    <span>SoundCloud</span>
                  </a>
                  
                  <a 
                    href={`https://youtube.com/@${userData.socialLinks.youtube}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center bg-surface-alt rounded-lg p-3 hover:bg-opacity-80 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FF0000] bg-opacity-20 flex items-center justify-center mr-3">
                      <Icon name="Youtube" size={16} className="text-[#FF0000]" />
                    </div>
                    <span>YouTube</span>
                  </a>
                  
                  <a 
                    href={`https://instagram.com/${userData.socialLinks.instagram}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center bg-surface-alt rounded-lg p-3 hover:bg-opacity-80 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#E1306C] bg-opacity-20 flex items-center justify-center mr-3">
                      <Icon name="Instagram" size={16} className="text-[#E1306C]" />
                    </div>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Usage Statistics */}
        <div className="mt-8">
          <UsageStats />
        </div>
      </div>
      
      {/* Right Column - Achievements */}
      <div>
        <AchievementBadges />
      </div>
    </div>
  );
};

export default ProfileTab;