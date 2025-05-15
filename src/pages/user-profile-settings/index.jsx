import React, { useState } from "react";
import Header from "../home-page/components/Header";
import Sidebar from "./components/Sidebar";
import ProfileTab from "./components/ProfileTab";
import SettingsTab from "./components/SettingsTab";
import SubscriptionTab from "./components/SubscriptionTab";
import StorageTab from "./components/StorageTab";
import SecurityTab from "./components/SecurityTab";
import Icon from "../../components/AppIcon";

const UserProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "profile", label: "Profile", icon: "User" },
    { id: "settings", label: "Settings", icon: "Settings" },
    { id: "subscription", label: "Subscription", icon: "CreditCard" },
    // { id: "storage", label: "Storage", icon: "HardDrive" },
    // { id: "security", label: "Security", icon: "Shield" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "settings":
        return <SettingsTab />;
      case "subscription":
        return <SubscriptionTab />;
      case "storage":
        return <StorageTab />;
      case "security":
        return <SecurityTab />;
      default:
        return <ProfileTab />;
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
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="display-small mb-2">User Profile & Settings</h1>
              <p className="body-medium text-text-secondary">
                Manage your account, preferences, and personalize your AI Music experience
              </p>
            </div>

            {/* Tabs Navigation */}
            <div className="mb-8 border-b border-border">
              <div className="flex overflow-x-auto hide-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex items-center px-6 py-4 border-b-2 transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                      ? "border-primary text-primary" : "border-transparent text-text-secondary hover:text-text-primary hover:border-border"
                      }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon name={tab.icon} size={18} className="mr-2" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[60vh]">
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfileSettings;