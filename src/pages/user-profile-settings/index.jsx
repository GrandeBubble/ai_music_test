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
    { id: "profile", label: "个人资料", icon: "User" },
    { id: "settings", label: "设置", icon: "Settings" },
    { id: "subscription", label: "订阅", icon: "CreditCard" },
    // { id: "storage", label: "存储空间", icon: "HardDrive" },
    // { id: "security", label: "安全", icon: "Shield" },
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
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col">
        {/* 头部 */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* 主要内容区域 */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* 页面标题 */}
            <div className="mb-8">
              <h1 className="display-small mb-2">用户个人资料与设置</h1>
              <p className="body-medium text-text-secondary">
                管理您的账户、偏好设置并个性化您的AI音乐体验
              </p>
            </div>

            {/* 标签导航 */}
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

            {/* 标签内容 */}
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