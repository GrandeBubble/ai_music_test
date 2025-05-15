import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Icon from "../../../components/AppIcon";

const StorageTab = () => {
  const [selectedCleanupOption, setSelectedCleanupOption] = useState(null);
  
  // Mock storage data
  const storageData = {
    total: 10, // GB
    used: 4.2, // GB
    breakdown: [
      { name: "Vocal Tuning", value: 1.8, color: "#D946EF" }, // accent-1
      { name: "Composition", value: 1.5, color: "#3B82F6" }, // accent-2
      { name: "Genre Fusion", value: 0.7, color: "#F97316" }, // accent-3
      { name: "Unused", value: 0.2, color: "#71717A" } // text-tertiary
    ]
  };
  
  const cleanupOptions = [
    {
      id: "temp",
      name: "Temporary Files",
      description: "Clear cached and temporary files that are no longer needed",
      icon: "Trash2",
      potentialSavings: 0.3, // GB
      impact: "low"
    },
    {
      id: "duplicates",
      name: "Duplicate Projects",
      description: "Find and remove duplicate project versions",
      icon: "Copy",
      potentialSavings: 0.8, // GB
      impact: "medium"
    },
    {
      id: "old",
      name: "Old Projects",
      description: "Archive projects you haven\'t accessed in over 6 months",
      icon: "Archive",
      potentialSavings: 1.2, // GB
      impact: "high"
    },
    {
      id: "exports",
      name: "Previous Exports",
      description: "Remove exported files that you can regenerate anytime",
      icon: "FileOutput",
      potentialSavings: 0.5, // GB
      impact: "low"
    }
  ];
  
  const usedPercentage = (storageData.used / storageData.total) * 100;
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface p-3 rounded-lg border border-border">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">
            <span className="text-text-secondary">Size: </span>
            <span className="font-medium">{payload[0].value} GB</span>
          </p>
          <p className="text-sm">
            <span className="text-text-secondary">Percentage: </span>
            <span className="font-medium">
              {((payload[0].value / storageData.used) * 100).toFixed(1)}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Storage Overview */}
      <div className="lg:col-span-2">
        <div className="bg-surface rounded-xl p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-4">
              <Icon name="HardDrive" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="heading-medium">Storage Overview</h3>
              <p className="text-text-secondary">
                {storageData.used.toFixed(1)}GB of {storageData.total}GB used
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 flex justify-center items-center mb-6 md:mb-0">
              <div className="relative w-40 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={storageData.breakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {storageData.breakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">{usedPercentage.toFixed(0)}%</span>
                  <span className="text-sm text-text-secondary">Used</span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <div className="space-y-4">
                {storageData.breakdown.map((item) => (
                  <div key={item.name} className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span>{item.name}</span>
                        <span>{item.value} GB</span>
                      </div>
                      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${(item.value / storageData.total) * 100}%`,
                            backgroundColor: item.color
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-sm">
                  Upgrade Storage
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Storage Cleanup */}
        <div className="bg-surface rounded-xl p-6">
          <h3 className="heading-medium mb-6">Storage Cleanup</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {cleanupOptions.map((option) => (
              <div 
                key={option.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                  selectedCleanupOption === option.id 
                    ? "border-primary bg-primary bg-opacity-5" :"border-border hover:border-primary"
                }`}
                onClick={() => setSelectedCleanupOption(option.id)}
              >
                <div className="flex items-start">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      option.impact === "high" ?"bg-error bg-opacity-20" 
                        : option.impact === "medium" ?"bg-warning bg-opacity-20" :"bg-info bg-opacity-20"
                    }`}
                  >
                    <Icon 
                      name={option.icon} 
                      size={20} 
                      className={
                        option.impact === "high" ?"text-error" 
                          : option.impact === "medium" ?"text-warning" :"text-info"
                      }
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{option.name}</h4>
                    <p className="text-sm text-text-secondary mb-2">{option.description}</p>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">
                        Save up to {option.potentialSavings} GB
                      </span>
                      <span 
                        className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                          option.impact === "high" ?"bg-error bg-opacity-20 text-error" 
                            : option.impact === "medium" ?"bg-warning bg-opacity-20 text-warning" :"bg-info bg-opacity-20 text-info"
                        }`}
                      >
                        {option.impact} impact
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {selectedCleanupOption && (
            <div className="flex justify-end">
              <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300">
                Run Cleanup
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Storage Management */}
      <div>
        <div className="bg-surface rounded-xl p-6 mb-8">
          <h3 className="heading-medium mb-6">Storage Management</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">Auto-cleanup Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Clear temporary files</label>
                  <select className="bg-surface-alt border-none rounded-lg py-1 px-3 text-sm focus:ring-primary focus:ring-2 focus:outline-none">
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Never</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Delete exports after</label>
                  <select className="bg-surface-alt border-none rounded-lg py-1 px-3 text-sm focus:ring-primary focus:ring-2 focus:outline-none">
                    <option>30 days</option>
                    <option>60 days</option>
                    <option>90 days</option>
                    <option>Never</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Archive inactive projects</label>
                  <select className="bg-surface-alt border-none rounded-lg py-1 px-3 text-sm focus:ring-primary focus:ring-2 focus:outline-none">
                    <option>After 6 months</option>
                    <option>After 1 year</option>
                    <option>Never</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Backup Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm">Auto-backup projects</label>
                  <select className="bg-surface-alt border-none rounded-lg py-1 px-3 text-sm focus:ring-primary focus:ring-2 focus:outline-none">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Never</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm">Keep backups for</label>
                  <select className="bg-surface-alt border-none rounded-lg py-1 px-3 text-sm focus:ring-primary focus:ring-2 focus:outline-none">
                    <option>30 days</option>
                    <option>60 days</option>
                    <option>90 days</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">External Storage</h4>
              <div className="bg-surface-alt rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Icon name="Cloud" size={18} className="text-accent-2 mr-2" />
                    <span className="font-medium">Google Drive</span>
                  </div>
                  <span className="text-xs bg-success bg-opacity-20 text-success px-2 py-0.5 rounded-full">
                    Connected
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  Last sync: Today at 10:45 AM
                </p>
              </div>
              
              <button className="w-full py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm flex items-center justify-center">
                <Icon name="Plus" size={16} className="mr-2" />
                <span>Connect Storage</span>
              </button>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Download All Data</h4>
              <p className="text-sm text-text-secondary mb-3">
                Download a complete archive of all your projects and data
              </p>
              <button className="w-full py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm flex items-center justify-center">
                <Icon name="Download" size={16} className="mr-2" />
                <span>Request Archive</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageTab;