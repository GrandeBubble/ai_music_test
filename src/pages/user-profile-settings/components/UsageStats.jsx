import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import Icon from "../../../components/AppIcon";

const UsageStats = () => {
  // Mock usage data
  const usageData = [
    {
      name: "Jan",
      vocalTuning: 5,
      composition: 3,
      genreFusion: 2,
    },
    {
      name: "Feb",
      vocalTuning: 7,
      composition: 4,
      genreFusion: 3,
    },
    {
      name: "Mar",
      vocalTuning: 4,
      composition: 6,
      genreFusion: 2,
    },
    {
      name: "Apr",
      vocalTuning: 8,
      composition: 5,
      genreFusion: 4,
    },
    {
      name: "May",
      vocalTuning: 10,
      composition: 8,
      genreFusion: 6,
    },
    {
      name: "Jun",
      vocalTuning: 12,
      composition: 10,
      genreFusion: 7,
    },
  ];
  
  const totalProjects = usageData.reduce(
    (acc, month) => 
      acc + month.vocalTuning + month.composition + month.genreFusion, 
    0
  );
  
  const totalVocalTuning = usageData.reduce((acc, month) => acc + month.vocalTuning, 0);
  const totalComposition = usageData.reduce((acc, month) => acc + month.composition, 0);
  const totalGenreFusion = usageData.reduce((acc, month) => acc + month.genreFusion, 0);
  
  const activitySummary = [
    {
      id: "vocalTuning",
      name: "Vocal Tuning",
      icon: "Mic2",
      color: "#D946EF", // accent-1
      count: totalVocalTuning,
      percentage: Math.round((totalVocalTuning / totalProjects) * 100)
    },
    {
      id: "composition",
      name: "Composition",
      icon: "Music",
      color: "#3B82F6", // accent-2
      count: totalComposition,
      percentage: Math.round((totalComposition / totalProjects) * 100)
    },
    {
      id: "genreFusion",
      name: "Genre Fusion",
      icon: "Combine",
      color: "#F97316", // accent-3
      count: totalGenreFusion,
      percentage: Math.round((totalGenreFusion / totalProjects) * 100)
    }
  ];
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface p-3 rounded-lg border border-border">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center mt-1">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.fill }}
              ></div>
              <span className="text-text-secondary">{entry.name}: </span>
              <span className="ml-1 font-medium">{entry.value} projects</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-surface rounded-xl p-6">
      <h3 className="heading-medium mb-6">Usage Statistics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {activitySummary.map((activity) => (
          <motion.div
            key={activity.id}
            className="bg-surface-alt rounded-lg p-4"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                style={{ backgroundColor: `${activity.color}20` }}
              >
                <Icon 
                  name={activity.icon} 
                  size={20} 
                  style={{ color: activity.color }}
                />
              </div>
              <div>
                <h4 className="font-medium">{activity.name}</h4>
                <p className="text-text-secondary text-sm">{activity.count} projects</p>
              </div>
            </div>
            
            <div className="w-full h-2 bg-background rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full"
                style={{ 
                  width: `${activity.percentage}%`,
                  backgroundColor: activity.color
                }}
              ></div>
            </div>
            <p className="text-xs text-text-tertiary mt-2">
              {activity.percentage}% of your projects
            </p>
          </motion.div>
        ))}
      </div>
      
      <div className="mb-4">
        <h4 className="heading-small mb-4">Monthly Activity</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={usageData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              barGap={2}
              barSize={8}
            >
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#A1A1AA', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#A1A1AA', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="vocalTuning" 
                name="Vocal Tuning" 
                radius={[4, 4, 0, 0]}
              >
                {usageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#D946EF" />
                ))}
              </Bar>
              <Bar 
                dataKey="composition" 
                name="Composition" 
                radius={[4, 4, 0, 0]}
              >
                {usageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#3B82F6" />
                ))}
              </Bar>
              <Bar 
                dataKey="genreFusion" 
                name="Genre Fusion" 
                radius={[4, 4, 0, 0]}
              >
                {usageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#F97316" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm">
          View Detailed Analytics
        </button>
      </div>
    </div>
  );
};

export default UsageStats;