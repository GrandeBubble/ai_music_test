import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const AchievementBadges = () => {
  // Mock achievement data
  const achievements = [
    {
      id: 1,
      title: "Early Adopter",
      description: "Joined during the platform\'s beta phase",
      icon: "Award",
      color: "#F59E0B", // warning
      earned: true,
      date: "2022-03-15"
    },
    {
      id: 2,
      title: "Vocal Virtuoso",
      description: "Created 10+ vocal tuning projects",
      icon: "Mic2",
      color: "#D946EF", // accent-1
      earned: true,
      date: "2022-05-22"
    },
    {
      id: 3,
      title: "Composition Master",
      description: "Created 10+ composition projects",
      icon: "Music",
      color: "#3B82F6", // accent-2
      earned: true,
      date: "2022-07-10"
    },
    {
      id: 4,
      title: "Genre Blender",
      description: "Created 10+ genre fusion projects",
      icon: "Combine",
      color: "#F97316", // accent-3
      earned: false,
      progress: 70
    },
    {
      id: 5,
      title: "Collaboration King",
      description: "Collaborated with 5+ other creators",
      icon: "Users",
      color: "#10B981", // success
      earned: false,
      progress: 40
    },
    {
      id: 6,
      title: "Community Contributor",
      description: "Shared 20+ projects with the community",
      icon: "Share2",
      color: "#0EA5E9", // info
      earned: false,
      progress: 25
    },
    {
      id: 7,
      title: "Feedback Champion",
      description: "Provided feedback on 30+ community projects",
      icon: "MessageSquare",
      color: "#9333EA", // primary
      earned: false,
      progress: 10
    }
  ];
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="bg-surface rounded-xl p-6 sticky top-24">
      <h3 className="heading-medium mb-6">Achievement Badges</h3>
      
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            className={`rounded-lg p-4 ${
              achievement.earned 
                ? "bg-surface-alt" :"bg-surface-alt bg-opacity-50"
            }`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                  achievement.earned 
                    ? "bg-opacity-20" :"bg-opacity-10"
                }`}
                style={{ backgroundColor: `${achievement.color}20` }}
              >
                <Icon 
                  name={achievement.icon} 
                  size={24} 
                  style={{ 
                    color: achievement.earned 
                      ? achievement.color 
                      : "#71717A" // text-tertiary
                  }}
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{achievement.title}</h4>
                  {achievement.earned && (
                    <div className="flex items-center text-xs text-text-tertiary">
                      <Icon name="CheckCircle" size={14} className="text-success mr-1" />
                      <span>Earned {formatDate(achievement.date)}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-text-secondary mt-1">
                  {achievement.description}
                </p>
                
                {!achievement.earned && achievement.progress && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-text-tertiary">Progress</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${achievement.progress}%`,
                          backgroundColor: achievement.color
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm">
          View All Achievements
        </button>
      </div>
    </div>
  );
};

export default AchievementBadges;