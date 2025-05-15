import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import Icon from "../../components/AppIcon";
import ProjectCard from "./components/ProjectCard";
import FilterPanel from "./components/FilterPanel";
// import StorageUsage from "./components/StorageUsage";
import EmptyState from "./components/EmptyState";
// import RemixSuggestions from "./components/RemixSuggestions";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const ProjectGallery = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [sortBy, setSortBy] = useState("date-desc");
  const [filterType, setFilterType] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for projects
  const mockProjects = [
    {
      id: 1,
      title: "夏日人声混音",
      type: "AI修音",
      date: "2023-06-15T14:30:00",
      duration: "3:42",
      thumbnail: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=2070&auto=format&fit=crop",
      waveform: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      favorite: false,
      tags: ["人声", "夏日", "混音"],
      parameters: {
        pitch: 2,
        formant: 1.5,
        vibrato: 0.8
      },
      versions: 3
    },
    {
      id: 2,
      title: "环境梦幻音景",
      type: "AI作曲",
      date: "2023-07-22T09:15:00",
      duration: "5:18",
      thumbnail: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      waveform: "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      favorite: false,
      tags: ["环境音乐", "放松", "器乐"],
      parameters: {
        tempo: 85,
        key: "F小调",
        complexity: 0.7
      },
      versions: 2
    },
    {
      id: 3,
      title: "爵士电子融合",
      type: "曲风融合",
      date: "2023-08-05T16:45:00",
      duration: "4:27",
      thumbnail: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      waveform: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      favorite: true,
      tags: ["爵士", "电子", "融合"],
      parameters: {
        genreA: "爵士",
        genreB: "电子",
        blendRatio: 0.6
      },
      versions: 5
    },
    {
      id: 4,
      title: "人声和声实验",
      type: "AI修音",
      date: "2023-09-12T11:20:00",
      duration: "2:56",
      thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
      waveform: "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      favorite: false,
      tags: ["和声", "实验", "人声"],
      parameters: {
        pitch: -1,
        formant: 0.8,
        vibrato: 0.3
      },
      versions: 1
    },
    {
      id: 5,
      title: "D大调管弦乐组曲",
      type: "AI作曲",
      date: "2023-10-03T15:10:00",
      duration: "8:42",
      thumbnail: "https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      waveform: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      favorite: true,
      tags: ["管弦乐", "古典", "组曲"],
      parameters: {
        tempo: 110,
        key: "D大调",
        complexity: 0.9
      },
      versions: 4
    },
    {
      id: 6,
      title: "民谣陷阱音乐实验",
      type: "曲风融合",
      date: "2023-11-18T19:30:00",
      duration: "3:15",
      thumbnail: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      waveform: "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      favorite: false,
      tags: ["民谣", "陷阱", "实验"],
      parameters: {
        genreA: "民谣",
        genreB: "陷阱",
        blendRatio: 0.4
      },
      versions: 2
    }
  ];

  // Load projects
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter projects based on search query and filters
  useEffect(() => {
    let result = [...projects];

    // Filter by type
    if (filterType !== "all") {
      result = result.filter(project => project.type === filterType);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        project =>
          project.title.toLowerCase().includes(query) ||
          project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort projects
    result = sortProjects(result, sortBy);

    setFilteredProjects(result);
  }, [searchQuery, filterType, sortBy, projects]);

  // Sort projects based on selected option
  const sortProjects = (projectsToSort, sortOption) => {
    switch (sortOption) {
      case "date-desc":
        return [...projectsToSort].sort((a, b) => new Date(b.date) - new Date(a.date));
      case "date-asc":
        return [...projectsToSort].sort((a, b) => new Date(a.date) - new Date(b.date));
      case "title-asc":
        return [...projectsToSort].sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return [...projectsToSort].sort((a, b) => b.title.localeCompare(a.title));
      case "duration-asc":
        return [...projectsToSort].sort((a, b) => {
          const durationA = a.duration.split(":").reduce((acc, time) => (60 * acc) + +time);
          const durationB = b.duration.split(":").reduce((acc, time) => (60 * acc) + +time);
          return durationA - durationB;
        });
      case "duration-desc":
        return [...projectsToSort].sort((a, b) => {
          const durationA = a.duration.split(":").reduce((acc, time) => (60 * acc) + +time);
          const durationB = b.duration.split(":").reduce((acc, time) => (60 * acc) + +time);
          return durationB - durationA;
        });
      default:
        return projectsToSort;
    }
  };

  // Toggle project selection
  const toggleProjectSelection = (projectId) => {
    setSelectedProjects(prev => {
      if (prev.includes(projectId)) {
        return prev.filter(id => id !== projectId);
      } else {
        return [...prev, projectId];
      }
    });
  };

  // Select all projects
  const selectAllProjects = () => {
    if (selectedProjects.length === filteredProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(filteredProjects.map(project => project.id));
    }
  };

  // Delete selected projects
  const deleteSelectedProjects = () => {
    setProjects(prev => prev.filter(project => !selectedProjects.includes(project.id)));
    setSelectedProjects([]);
  };

  // Toggle favorite status
  const toggleFavorite = (projectId) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId
          ? { ...project, favorite: !project.favorite }
          : project
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
                <h1 className="display-small mb-2">我的项目</h1>
                <p className="body-medium text-text-secondary">
                  管理和组织您的创意音乐项目
                </p>
              </div>

              <div className="flex items-center mt-4 md:mt-0 space-x-3">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                >
                  <Icon name="SlidersHorizontal" size={18} className="mr-2" />
                  <span>筛选</span>
                </button>

                {selectedProjects.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={deleteSelectedProjects}
                      className="flex items-center px-4 py-2 rounded-lg bg-error bg-opacity-20 hover:bg-opacity-30 text-error transition-all duration-300"
                    >
                      <Icon name="Trash2" size={18} className="mr-2" />
                      <span>删除 {selectedProjects.length}</span>
                    </button>

                    <button
                      onClick={selectAllProjects}
                      className="flex items-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                    >
                      {selectedProjects.length === filteredProjects.length ? (
                        <>
                          <Icon name="Square" size={18} className="mr-2" />
                          <span>取消全选</span>
                        </>
                      ) : (
                        <>
                          <Icon name="CheckSquare" size={18} className="mr-2" />
                          <span>选择全部</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Filter Panel */}
            {filterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <FilterPanel
                  filterType={filterType}
                  setFilterType={setFilterType}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </motion.div>
            )}

            {/* Storage Usage */}
            {/* <StorageUsage projects={projects} /> */}

            {/* Projects Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-surface rounded-xl h-64 animate-pulse"></div>
                ))}
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {filteredProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isSelected={selectedProjects.includes(project.id)}
                    onSelect={() => toggleProjectSelection(project.id)}
                    onToggleFavorite={() => toggleFavorite(project.id)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState searchQuery={searchQuery} />
            )}

            {/* Remix Suggestions */}
            {/* {projects.length > 2 && (
              <RemixSuggestions projects={projects} />
            )} */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectGallery;