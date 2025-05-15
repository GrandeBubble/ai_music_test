import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../components/AppIcon";
import Header from "../project-gallery/components/Header";
import Sidebar from "../project-gallery/components/Sidebar";
import LearningPathCard from "./components/LearningPathCard";
import TutorialCard from "./components/TutorialCard";
import MasterclassCard from "./components/MasterclassCard";
import TechniqueExplorer from "./components/TechniqueExplorer";
import CommunityQA from "./components/CommunityQA";
import ProgressTracker from "./components/ProgressTracker";
import SearchFilters from "./components/SearchFilters";

const LearningHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [learningPaths, setLearningPaths] = useState([]);
  const [featuredTutorials, setFeaturedTutorials] = useState([]);
  const [masterclasses, setMasterclasses] = useState([]);
  const [techniques, setTechniques] = useState([]);
  const [communityQuestions, setCommunityQuestions] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for learning paths
  const mockLearningPaths = [
    {
      id: 1,
      title: "Vocal Production Fundamentals",
      description: "Master the essentials of vocal recording, editing, and AI enhancement",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2070&auto=format&fit=crop",
      totalModules: 8,
      completedModules: 3,
      estimatedHours: 6,
      level: "beginner",
      category: "vocal-tuning",
      featured: true
    },
    {
      id: 2,
      title: "Electronic Music Composition",
      description: "Learn to create complete electronic tracks with AI assistance",
      image: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      totalModules: 12,
      completedModules: 0,
      estimatedHours: 10,
      level: "intermediate",
      category: "composition",
      featured: true
    },
    {
      id: 3,
      title: "Genre Fusion Masterclass",
      description: "Explore techniques for blending musical genres with AI",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      totalModules: 6,
      completedModules: 0,
      estimatedHours: 8,
      level: "advanced",
      category: "genre-fusion",
      featured: true
    },
    {
      id: 4,
      title: "AI Music Theory",
      description: "Understand how AI interprets and applies music theory concepts",
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2070&auto=format&fit=crop",
      totalModules: 10,
      completedModules: 2,
      estimatedHours: 12,
      level: "intermediate",
      category: "theory",
      featured: false
    }
  ];

  // Mock data for featured tutorials
  const mockFeaturedTutorials = [
    {
      id: 1,
      title: "Getting Started with Vocal Tuning",
      description: "Learn the basics of AI-powered vocal pitch correction",
      thumbnail: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=2070&auto=format&fit=crop",
      duration: "15 min",
      type: "video",
      level: "beginner",
      category: "vocal-tuning",
      completed: true
    },
    {
      id: 2,
      title: "Creating Your First AI Composition",
      description: "Generate a complete musical piece in under 10 minutes",
      thumbnail: "https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "10 min",
      type: "interactive",
      level: "beginner",
      category: "composition",
      completed: false
    },
    {
      id: 3,
      title: "Blending Jazz and Electronic Music",
      description: "Explore genre fusion with AI assistance",
      thumbnail: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "20 min",
      type: "guide",
      level: "intermediate",
      category: "genre-fusion",
      completed: false
    },
    {
      id: 4,
      title: "Advanced Parameter Controls",
      description: "Master the detailed settings for precise AI output",
      thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
      duration: "25 min",
      type: "interactive",
      level: "advanced",
      category: "technical",
      completed: false
    }
  ];

  // Mock data for masterclasses
  const mockMasterclasses = [
    {
      id: 1,
      title: "Vocal Production with Grammy-Winner Sarah Johnson",
      instructor: "Sarah Johnson",
      credentials: "Grammy-Winning Producer",
      description: "Learn professional vocal production techniques enhanced by AI",
      thumbnail: "https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "1h 45min",
      modules: 5,
      level: "intermediate",
      category: "vocal-tuning",
      featured: true
    },
    {
      id: 2,
      title: "Electronic Music Composition with DJ Quantum",
      instructor: "DJ Quantum",
      credentials: "Platinum-Selling Artist",
      description: "Create chart-topping electronic music with AI assistance",
      thumbnail: "https://images.pexels.com/photos/2111015/pexels-photo-2111015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "2h 20min",
      modules: 8,
      level: "advanced",
      category: "composition",
      featured: true
    }
  ];

  // Mock data for technique explorer
  const mockTechniques = [
    {
      id: 1,
      title: "Formant Shifting",
      description: "Understand how formant shifting affects vocal character",
      thumbnail: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2070&auto=format&fit=crop",
      category: "vocal-tuning",
      interactive: true
    },
    {
      id: 2,
      title: "Harmonic Progression Generation",
      description: "Explore how AI generates chord progressions",
      thumbnail: "https://images.pexels.com/photos/4088012/pexels-photo-4088012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "composition",
      interactive: true
    },
    {
      id: 3,
      title: "Genre Characteristic Analysis",
      description: "See how AI identifies and extracts genre elements",
      thumbnail: "https://images.pexels.com/photos/4571219/pexels-photo-4571219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "genre-fusion",
      interactive: true
    }
  ];

  // Mock data for community Q&A
  const mockCommunityQuestions = [
    {
      id: 1,
      question: "How do I achieve a natural-sounding vibrato with AI?",
      askedBy: "MusicProducer22",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      answers: 8,
      verified: true,
      category: "vocal-tuning"
    },
    {
      id: 2,
      question: "What parameters work best for generating jazz compositions?",
      askedBy: "JazzLover99",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      answers: 5,
      verified: true,
      category: "composition"
    },
    {
      id: 3,
      question: "How can I blend classical and trap music effectively?",
      askedBy: "GenreBender",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      answers: 3,
      verified: false,
      category: "genre-fusion"
    }
  ];

  // Mock user progress data
  const mockUserProgress = {
    totalResources: 36,
    completedResources: 7,
    percentComplete: 19,
    lastAccessed: "2023-11-18T14:30:00",
    recommendedNext: [
      {
        id: 1,
        title: "Advanced Vocal Harmonization",
        type: "tutorial",
        duration: "18 min"
      },
      {
        id: 2,
        title: "Creating Emotional Chord Progressions",
        type: "interactive",
        duration: "25 min"
      }
    ]
  };

  // Load data
  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setLearningPaths(mockLearningPaths);
      setFeaturedTutorials(mockFeaturedTutorials);
      setMasterclasses(mockMasterclasses);
      setTechniques(mockTechniques);
      setCommunityQuestions(mockCommunityQuestions);
      setUserProgress(mockUserProgress);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter content based on search and filters
  const getFilteredContent = (content, type) => {
    return content.filter(item => {
      // Search query filter
      const matchesSearch = searchQuery === "" || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Category filter
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      
      // Level filter (if applicable)
      const matchesLevel = selectedLevel === "all" || 
        (item.level && item.level === selectedLevel);
      
      return matchesSearch && matchesCategory && (type !== 'learningPath' || matchesLevel);
    });
  };

  const filteredLearningPaths = getFilteredContent(learningPaths, 'learningPath');
  const filteredTutorials = getFilteredContent(featuredTutorials, 'tutorial');
  const filteredMasterclasses = getFilteredContent(masterclasses, 'masterclass');
  const filteredTechniques = getFilteredContent(techniques, 'technique');
  const filteredQuestions = getFilteredContent(communityQuestions, 'question');

  // Mark a tutorial as completed
  const markAsCompleted = (id) => {
    setFeaturedTutorials(prev => 
      prev.map(tutorial => 
        tutorial.id === id 
          ? { ...tutorial, completed: !tutorial.completed } 
          : tutorial
      )
    );
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
            {/* Page Title and Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="display-small mb-2">Learning Hub</h1>
                <p className="body-medium text-text-secondary">
                  Master AI music creation with tutorials, guides, and interactive lessons
                </p>
              </div>
              
              <div className="flex items-center mt-4 md:mt-0 space-x-3">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                >
                  <Icon name="SlidersHorizontal" size={18} className="mr-2" />
                  <span>Filters</span>
                </button>
              </div>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <SearchFilters 
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedLevel={selectedLevel}
                  setSelectedLevel={setSelectedLevel}
                />
              </motion.div>
            )}
            
            {/* Progress Tracker */}
            <ProgressTracker userProgress={userProgress} />
            
            {isLoading ? (
              <div className="mt-8 space-y-8">
                <div className="h-64 bg-surface rounded-xl animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-48 bg-surface rounded-xl animate-pulse"></div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Getting Started Section */}
                <section className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="heading-large">Getting Started</h2>
                    <button className="text-sm text-primary flex items-center">
                      View all <Icon name="ChevronRight" size={16} className="ml-1" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredTutorials
                      .filter(tutorial => tutorial.level === "beginner")
                      .slice(0, 4)
                      .map(tutorial => (
                        <TutorialCard 
                          key={tutorial.id} 
                          tutorial={tutorial} 
                          onMarkCompleted={() => markAsCompleted(tutorial.id)}
                        />
                      ))}
                  </div>
                </section>
                
                {/* Learning Paths */}
                <section className="mt-12">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="heading-large">Learning Paths</h2>
                    <button className="text-sm text-primary flex items-center">
                      View all <Icon name="ChevronRight" size={16} className="ml-1" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLearningPaths
                      .filter(path => path.featured)
                      .slice(0, 3)
                      .map(path => (
                        <LearningPathCard key={path.id} path={path} />
                      ))}
                  </div>
                </section>
                
                {/* Featured Masterclasses */}
                <section className="mt-12">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="heading-large">Featured Masterclasses</h2>
                    <button className="text-sm text-primary flex items-center">
                      View all <Icon name="ChevronRight" size={16} className="ml-1" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredMasterclasses
                      .filter(masterclass => masterclass.featured)
                      .slice(0, 2)
                      .map(masterclass => (
                        <MasterclassCard key={masterclass.id} masterclass={masterclass} />
                      ))}
                  </div>
                </section>
                
                {/* Technique Explorer */}
                <section className="mt-12">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="heading-large">Technique Explorer</h2>
                    <button className="text-sm text-primary flex items-center">
                      View all <Icon name="ChevronRight" size={16} className="ml-1" />
                    </button>
                  </div>
                  
                  <TechniqueExplorer techniques={filteredTechniques.slice(0, 3)} />
                </section>
                
                {/* Community Q&A */}
                <section className="mt-12 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="heading-large">Community Q&A</h2>
                    <button className="text-sm text-primary flex items-center">
                      View all <Icon name="ChevronRight" size={16} className="ml-1" />
                    </button>
                  </div>
                  
                  <CommunityQA questions={filteredQuestions.slice(0, 3)} />
                </section>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LearningHub;