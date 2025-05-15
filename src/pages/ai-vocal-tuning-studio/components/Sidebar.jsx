import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: "主页", icon: "Home", path: "/home-page" },
    { name: "我的项目", icon: "FolderKanban", path: "/project-gallery" },
    { name: "AI修音", icon: "Mic2", path: "/ai-vocal-tuning-studio", active: true },
    { name: "AI作曲", icon: "Music", path: "/ai-music-composition-workshop" },
    { name: "曲风融合", icon: "Combine", path: "/genre-fusion-laboratory" },
    { name: "社区", icon: "Users", path: "/community-showcase" },
    //{ name: "Learning Hub", icon: "GraduationCap", path: "/learning-hub" },
    { name: "设置", icon: "Settings", path: "/user-profile-settings" }
  ];

  return (
    <div
      className={`bg-surface border-r border-border h-screen sticky top-0 transition-all duration-300 ${collapsed ? "w-16" : "w-64"
        }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-border">
        {!collapsed && (
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2">
              <Icon name="Music" size={18} className="text-text-primary" />
            </div>
            <span className="text-lg font-display font-bold">AI Music</span>
          </Link>
        )}

        {collapsed && (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mx-auto">
            <Icon name="Music" size={18} className="text-text-primary" />
          </div>
        )}

        <button
          className={`w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center ${collapsed ? "mx-auto mt-4" : ""}`}
          onClick={() => setCollapsed(!collapsed)}
        >
          <Icon name={collapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
        </button>
      </div>

      <nav className="p-2 mt-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 ${item.active
                  ? "bg-primary bg-opacity-20 text-primary" : "hover:bg-surface-alt"
                  }`}
              >
                <Icon name={item.icon} size={20} className={collapsed ? "mx-auto" : "mr-3"} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-surface-alt rounded-xl p-4">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-3">
                <Icon name="Zap" size={16} className="text-primary" />
              </div>
              <span className="font-medium">高级会员</span>
            </div>
            <p className="text-xs text-text-secondary mb-3">
              升级到高级会员以解锁更多功能和资源。享受无限制的音频处理、AI修音和作曲功能，助力您的创作之旅。
            </p>
            <button className="w-full py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-sm">
              现在升级
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;