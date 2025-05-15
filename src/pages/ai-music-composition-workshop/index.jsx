import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../components/AppIcon";
import Header from "../home-page/components/Header";
import Sidebar from "./components/Sidebar";
import CompositionCanvas from "./components/CompositionCanvas";
import InstrumentLibrary from "./components/InstrumentLibrary";
import CompositionControls from "./components/CompositionControls";
import PlaybackControls from "./components/PlaybackControls";
import TemplateSelector from "./components/TemplateSelector";
import VersionHistory from "./components/VersionHistory";
import AIAssistant from "./components/AIAssistant";

const AIMusicCompositionWorkshop = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApproach, setSelectedApproach] = useState("template");
  const [currentProject, setCurrentProject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(true);
  const [aiSuggestionActive, setAiSuggestionActive] = useState(false);

  // 模拟当前项目数据
  const mockProject = {
    id: "comp-1",
    title: "未命名作品",
    created: new Date(),
    modified: new Date(),
    tempo: 120,
    key: "C大调",
    timeSignature: "4/4",
    tracks: [
      {
        id: "track-1",
        name: "钢琴",
        type: "旋律性",
        instrument: "三角钢琴",
        color: "#3B82F6",
        muted: false,
        solo: false,
        volume: 0.8
      },
      {
        id: "track-2",
        name: "弦乐",
        type: "旋律性",
        instrument: "弦乐合奏",
        color: "#D946EF",
        muted: false,
        solo: false,
        volume: 0.7
      },
      {
        id: "track-3",
        name: "鼓",
        type: "节奏性",
        instrument: "原声鼓",
        color: "#F97316",
        muted: false,
        solo: false,
        volume: 0.75
      }
    ],
    sections: [
      { id: "section-1", name: "引入", bars: 4 },
      { id: "section-2", name: "主歌", bars: 8 },
      { id: "section-3", name: "副歌", bars: 8 },
      { id: "section-4", name: "主歌", bars: 8 },
      { id: "section-5", name: "副歌", bars: 8 },
      { id: "section-6", name: "尾声", bars: 4 }
    ],
    versions: [
      { id: "v1", timestamp: new Date(Date.now() - 3600000), label: "初始草稿" },
      { id: "v2", timestamp: new Date(Date.now() - 1800000), label: "添加弦乐" },
      { id: "v3", timestamp: new Date(), label: "当前版本" }
    ]
  };

  // 创作方法
  const approaches = [
    { id: "template", name: "基于模板", icon: "LayoutTemplate" },
    // { id: "mood", name: "情绪驱动", icon: "Smile" },
    // { id: "reference", name: "基于参考", icon: "FileAudio" }
  ];

  // 加载项目数据
  useEffect(() => {
    // 模拟API调用
    setTimeout(() => {
      setCurrentProject(mockProject);
      setIsLoading(false);
    }, 800);
  }, []);

  // 处理播放/暂停
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  // 处理方法选择
  const handleApproachSelect = (approachId) => {
    setSelectedApproach(approachId);
    setShowTemplateSelector(approachId === "template");
  };

  // 处理模板选择
  const handleTemplateSelect = () => {
    setShowTemplateSelector(false);
  };

  // 生成AI建议
  const generateAiSuggestion = () => {
    setAiSuggestionActive(true);
    // 模拟AI处理
    setTimeout(() => {
      setAiSuggestionActive(false);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主要内容 */}
      <div className="flex-1 flex flex-col">
        {/* 头部 */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* 主要内容区域 */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* 页面标题和操作 */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="display-small mb-2">AI音乐创作工作坊</h1>
                <p className="body-medium text-text-secondary">
                  在AI的辅助下创作原创音乐作品
                </p>
              </div>

              <div className="flex items-center mt-4 md:mt-0 space-x-3">
                <button
                  className="flex items-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                  onClick={() => { }}
                >
                  <Icon name="Save" size={18} className="mr-2" />
                  <span>保存</span>
                </button>

                <button
                  className="flex items-center px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300"
                  onClick={() => { }}
                >
                  <Icon name="Share2" size={18} className="mr-2" />
                  <span>导出</span>
                </button>
              </div>
            </div>

            {/* 创作方法选择器 */}
            {!currentProject || showTemplateSelector ? (
              <div className="mb-8">
                <h2 className="heading-medium mb-4">选择你的创作方法</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {approaches.map((approach) => (
                    <motion.div
                      key={approach.id}
                      className={`bg-surface rounded-xl p-6 cursor-pointer transition-all duration-300 ${selectedApproach === approach.id ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-border"
                        }`}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleApproachSelect(approach.id)}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${selectedApproach === approach.id ? "bg-primary" : "bg-surface-alt"
                        }`}>
                        <Icon name={approach.icon} size={24} />
                      </div>
                      <h3 className="heading-small mb-2">{approach.name}</h3>
                      <p className="text-text-secondary text-sm">
                        {approach.id === "template" && "从流行、爵士或古典等基于流派的模板开始"}
                        {approach.id === "mood" && "根据情感和强度级别创作音乐"}
                        {approach.id === "reference" && "上传或选择参考曲目以获取灵感"}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* 模板选择器 */}
            {selectedApproach === "template" && showTemplateSelector && (
              <TemplateSelector onSelect={handleTemplateSelect} />
            )}

            {/* 主要创作界面 */}
            {currentProject && !showTemplateSelector && (
              <div className="flex flex-col space-y-4">
                {/* 项目信息栏 */}
                <div className="bg-surface rounded-xl p-4 flex flex-wrap items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={currentProject.title}
                      onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                      className="bg-transparent border-none text-xl font-medium focus:ring-primary focus:ring-2 focus:outline-none mr-4"
                    />
                    <div className="flex items-center space-x-4 text-text-secondary">
                      <div className="flex items-center">
                        <Icon name="Clock" size={16} className="mr-1" />
                        <span>{currentProject.tempo} BPM</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="Music" size={16} className="mr-1" />
                        <span>{currentProject.key}</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="Timer" size={16} className="mr-1" />
                        <span>{currentProject.timeSignature}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <button
                      className={`flex items-center px-3 py-1.5 rounded-lg transition-all duration-300 ${aiSuggestionActive
                        ? "bg-primary bg-opacity-20 text-primary animate-pulse" : "bg-surface-alt hover:bg-opacity-80"
                        }`}
                      onClick={generateAiSuggestion}
                      disabled={aiSuggestionActive}
                    >
                      <Icon name="Sparkles" size={16} className="mr-1.5" />
                      <span>{aiSuggestionActive ? "正在生成..." : "AI建议"}</span>
                    </button>

                    <button
                      className="flex items-center px-3 py-1.5 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                      onClick={() => { }}
                    >
                      <Icon name="Plus" size={16} className="mr-1.5" />
                      <span>添加音轨</span>
                    </button>

                    <button
                      className="flex items-center px-3 py-1.5 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                      onClick={() => { }}
                    >
                      <Icon name="Settings" size={16} className="mr-1.5" />
                      <span>设置</span>
                    </button>
                  </div>
                </div>

                {/* 主要创作区域 */}
                <div className="grid grid-cols-12 gap-4">
                  {/* 乐器库 */}
                  <div className="col-span-12 md:col-span-3 lg:col-span-2">
                    <InstrumentLibrary />
                  </div>

                  {/* 创作画布 */}
                  <div className="col-span-12 md:col-span-6 lg:col-span-8">
                    <CompositionCanvas
                      project={currentProject}
                      isPlaying={isPlaying}
                    />
                  </div>

                  {/* 创作控制 */}
                  <div className="col-span-12 md:col-span-3 lg:col-span-2">
                    <CompositionControls project={currentProject} />
                  </div>
                </div>

                {/* 播放控制 */}
                <PlaybackControls
                  isPlaying={isPlaying}
                  onTogglePlay={togglePlayback}
                />

                {/* 版本历史 */}
                <VersionHistory versions={currentProject.versions} />

                {/* AI助手 */}
                <AIAssistant />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIMusicCompositionWorkshop;