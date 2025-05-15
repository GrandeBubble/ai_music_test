import React, { useState, useEffect } from "react";

import Icon from "../../components/AppIcon";
import Header from "../home-page/components/Header";
import Sidebar from "./components/Sidebar";
import MusicCard from "./components/MusicCard";
import FilterBar from "./components/FilterBar";
import TrendingCategories from "./components/TrendingCategories";
import StaffPicks from "./components/StaffPicks";
import InspiredBySection from "./components/InspiredBySection";
import DiscoverSection from "./components/DiscoverSection";

const CommunityShowcase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("trending");
  const [musicItems, setMusicItems] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  // Mock data for community showcase music items
  const mockMusicItems = [
    {
      id: 1,
      title: "Neon Dreams",
      creator: "SynthWave42",
      creatorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      type: "Genre Fusion",
      artwork: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2070&auto=format&fit=crop",
      waveform: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "3:42",
      plays: 12453,
      likes: 876,
      comments: 124,
      createdAt: "2023-11-15T14:30:00",
      tags: ["synthwave", "electronic", "retro"],
      isTrending: true,
      isStaffPick: true,
      description: `This track combines 80s synthwave elements with modern electronic production techniques. I used the AI to generate the initial synth patterns and then refined them manually. The bass line was entirely AI-generated based on my vocal humming input.

The reverb-heavy drums were created using the rhythm generator with "80s gated reverb" as the style parameter. I'm particularly proud of how the AI helped me craft the arpeggios in the bridge section - something I've always struggled with manually.`,
      aiParameters: {
        genreA: "Synthwave",
        genreB: "Modern Electronic",
        blendRatio: 0.7,
        tempo: 108,
        key: "F minor"
      }
    },
    {
      id: 2,
      title: "Whispers of Rain",
      creator: "AmbientDreamer",
      creatorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      type: "Composition",
      artwork: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      waveform: "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "5:18",
      plays: 8732,
      likes: 1243,
      comments: 89,
      createdAt: "2023-12-02T09:15:00",
      tags: ["ambient", "relaxing", "nature"],
      isTrending: true,
      isStaffPick: false,
      description: `I recorded actual rainfall outside my window and fed it into the AI as a source material. The composition was built around the natural rhythm of the rain, with the AI generating complementary piano melodies that follow the rainfall patterns.

I used the "natural elements" parameter in the composition engine to ensure the synthetic elements blended seamlessly with the organic rain sounds. The middle section features a generated cello part that I never would have thought to include, but it works beautifully.`,
      aiParameters: {
        sourceAudio: "Natural Rain Recording",
        mood: "Contemplative",
        instruments: ["Piano", "Strings", "Synthesizer"],
        tempo: 72,
        key: "D major"
      }
    },
    {
      id: 3,
      title: "Quantum Soul",
      creator: "FusionMaestro",
      creatorAvatar: "https://randomuser.me/api/portraits/men/62.jpg",
      type: "Genre Fusion",
      artwork: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      waveform: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "4:27",
      plays: 15678,
      likes: 2341,
      comments: 312,
      createdAt: "2023-10-18T16:45:00",
      tags: ["jazz", "electronic", "fusion"],
      isTrending: true,
      isStaffPick: true,
      description: `This was an experiment in combining traditional jazz improvisation with electronic production. I played a short jazz piano riff and asked the AI to extrapolate it into a full composition with electronic elements.

The AI maintained the jazz chord progressions while adding electronic beats and synthesizer elements that complement rather than overwhelm the jazz foundation. I was amazed at how it preserved the improvisational feel while adding structure.`,
      aiParameters: {
        genreA: "Jazz",
        genreB: "Electronic",
        blendRatio: 0.6,
        preserveImprovisation: true,
        tempo: 92,
        key: "Bb minor"
      }
    },
    {
      id: 4,
      title: "Crystal Harmonies",
      creator: "VocalAlchemist",
      creatorAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
      type: "Vocal Tuning",
      artwork: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
      waveform: "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "3:56",
      plays: 9876,
      likes: 1567,
      comments: 203,
      createdAt: "2023-11-25T11:20:00",
      tags: ["vocal", "ethereal", "harmony"],
      isTrending: false,
      isStaffPick: true,
      description: `I recorded a simple melody line and used the AI vocal multiplier to create a choir of harmonized versions of my own voice. The AI generated complementary harmonies that I wouldn't have thought of myself.

The most interesting part was using the "crystalline" vocal effect parameter, which added these beautiful high-frequency artifacts that sound like tiny glass bells accompanying the vocals. No additional instruments were used - everything you hear is derived from my original vocal track.`,
      aiParameters: {
        voiceMultiplier: 6,
        harmonizationStyle: "Ethereal",
        effectProfile: "Crystalline",
        formant: 1.2,
        vibrato: 0.4
      }
    },
    {
      id: 5,
      title: "Orbital Descent",
      creator: "CosmicProducer",
      creatorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
      type: "Composition",
      artwork: "https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      waveform: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "6:12",
      plays: 7432,
      likes: 987,
      comments: 76,
      createdAt: "2023-09-30T15:10:00",
      tags: ["space", "ambient", "electronic"],
      isTrending: false,
      isStaffPick: false,
      description: `I wanted to create a sonic journey that simulates orbital descent from space to a planetary surface. I started with a text prompt describing this journey and let the AI generate the entire composition.

The AI created a perfect arc of tension and release, starting with sparse, high-frequency sounds that gradually incorporate more mid and low-range elements as the "descent" progresses. I only made minor adjustments to the mix - the composition itself is almost entirely as the AI generated it.`,
      aiParameters: {
        narrativePrompt: "Orbital descent from space to planetary surface",
        emotionalArc: "Wonder to intensity to calm",
        soundPalette: "Cosmic",
        tempo: 85,
        duration: "6:00+"
      }
    },
    {
      id: 6,
      title: "Folk Futures",
      creator: "TradModernist",
      creatorAvatar: "https://randomuser.me/api/portraits/women/62.jpg",
      type: "Genre Fusion",
      artwork: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      waveform: "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "4:05",
      plays: 6543,
      likes: 876,
      comments: 92,
      createdAt: "2023-10-05T19:30:00",
      tags: ["folk", "futuristic", "experimental"],
      isTrending: false,
      isStaffPick: false,
      description: `This project began with traditional Irish folk recordings from my grandfather that I digitized from old tapes. I fed these into the AI and asked it to reimagine them with futuristic electronic elements while preserving the emotional core.

The AI maintained the melodic structures and even the slight imperfections in timing that give folk music its human quality, while surrounding it with evolving synthesizer textures and subtle electronic percussion. It's like hearing my grandfather's music echoing through time.`,
      aiParameters: {
        sourceAudio: "Traditional Irish Folk Recordings",
        modernizationLevel: 0.7,
        preserveAuthenticity: true,
        genreInfluence: "Electronic Ambient",
        tempo: "Original"
      }
    }
  ];

  // Load music items
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMusicItems(mockMusicItems);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter music items based on search query and selected tags
  const filteredMusicItems = musicItems.filter(item => {
    // Filter by search query
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Filter by selected tags
    const matchesTags = selectedTags.length === 0 ||
      selectedTags.some(tag => item.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  // Get trending items
  const trendingItems = musicItems.filter(item => item.isTrending);

  // Get staff picks
  const staffPickItems = musicItems.filter(item => item.isStaffPick);

  // Toggle play/pause for a music item
  const togglePlay = (id) => {
    if (currentlyPlaying === id) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(id);
    }
  };

  // Add or remove a tag from selected tags
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title and Description */}
            <div className="mb-8">
              <h1 className="display-small mb-2">Community Showcase</h1>
              <p className="body-medium text-text-secondary max-w-3xl">
                Explore and discover music created by the AI Music community. Get inspired, connect with creators, and share your own compositions.
              </p>
            </div>

            {/* Filter Bar */}
            <FilterBar
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              selectedTags={selectedTags}
              toggleTag={toggleTag}
            />

            {/* Content based on active filter */}
            {activeFilter === "trending" && (
              <div className="mt-8">
                {/* Trending Categories */}
                <TrendingCategories
                  trendingItems={trendingItems}
                  currentlyPlaying={currentlyPlaying}
                  togglePlay={togglePlay}
                  isLoading={isLoading}
                />

                {/* Staff Picks */}
                <StaffPicks
                  staffPickItems={staffPickItems}
                  currentlyPlaying={currentlyPlaying}
                  togglePlay={togglePlay}
                  isLoading={isLoading}
                />

                {/* All Music Grid */}
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="heading-large">All Community Music</h2>
                    <div className="flex items-center text-text-secondary">
                      <span className="mr-2">Sort by:</span>
                      <select className="bg-surface-alt border-none rounded-lg py-1 px-3 focus:ring-primary focus:ring-2 focus:outline-none text-sm">
                        <option>Most Popular</option>
                        <option>Newest First</option>
                        <option>Oldest First</option>
                        <option>Most Liked</option>
                      </select>
                    </div>
                  </div>

                  {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="bg-surface rounded-xl h-64 animate-pulse"></div>
                      ))}
                    </div>
                  ) : filteredMusicItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredMusicItems.map(item => (
                        <MusicCard
                          key={item.id}
                          item={item}
                          isPlaying={currentlyPlaying === item.id}
                          onTogglePlay={() => togglePlay(item.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                      <div className="w-16 h-16 rounded-full bg-surface-alt flex items-center justify-center mb-6">
                        <Icon name="Search" size={32} className="text-text-tertiary" />
                      </div>
                      <h2 className="heading-large mb-3">No music found</h2>
                      <p className="text-text-secondary max-w-md mb-6">
                        We couldn't find any music matching your search or filters. Try adjusting your criteria.
                      </p>
                      <button
                        className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedTags([]);
                        }}
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeFilter === "inspired" && (
              <InspiredBySection
                musicItems={musicItems}
                currentlyPlaying={currentlyPlaying}
                togglePlay={togglePlay}
                isLoading={isLoading}
              />
            )}

            {activeFilter === "discover" && (
              <DiscoverSection
                musicItems={musicItems}
                currentlyPlaying={currentlyPlaying}
                togglePlay={togglePlay}
                isLoading={isLoading}
              />
            )}

            {/* Call to Action */}
            <div className="mt-16 mb-8 bg-surface rounded-xl p-8 text-center">
              <h2 className="heading-large mb-4">Share Your Own Creation</h2>
              <p className="text-text-secondary max-w-2xl mx-auto mb-6">
                Ready to showcase your AI-powered music to the community? Share your creation and get feedback from fellow musicians and creators.
              </p>
              <button className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 flex items-center justify-center mx-auto">
                <Icon name="Upload" size={18} className="mr-2" />
                <span>Share Your Music</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommunityShowcase;