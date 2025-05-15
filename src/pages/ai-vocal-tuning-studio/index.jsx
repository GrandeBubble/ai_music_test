import React, { useState, useRef, useEffect } from "react";

import Icon from "../../components/AppIcon";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import UploadPanel from "./components/UploadPanel";
import WaveformVisualization from "./components/WaveformVisualization";
import ControlPanel from "./components/ControlPanel";
import HistoryPanel from "./components/HistoryPanel";
import FrequencyAnalysis from "./components/FrequencyAnalysis";
import HelpOverlay from "./components/HelpOverlay";
import PresetSelector from "./components/PresetSelector";

const AIVocalTuningStudio = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showFrequencyAnalysis, setShowFrequencyAnalysis] = useState(false);
  const [activePreset, setActivePreset] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [parameters, setParameters] = useState({
    pitchCorrection: 50,
    vibrato: 30,
    formantShift: 0,
    harmonization: 0,
    reverb: 20,
    delay: 0,
    compression: 40
  });

  const audioRef = useRef(null);
  const waveformRef = useRef(null);

  // 预设数据
  const presets = [
    {
      id: 1,
      name: "流行人声",
      icon: "Mic2",
      color: "accent-1",
      parameters: {
        pitchCorrection: 80,
        vibrato: 20,
        formantShift: 0,
        harmonization: 10,
        reverb: 30,
        delay: 15,
        compression: 60
      }
    },
    {
      id: 2,
      name: "R&B 平滑",
      icon: "Music",
      color: "accent-2",
      parameters: {
        pitchCorrection: 60,
        vibrato: 40,
        formantShift: -10,
        harmonization: 30,
        reverb: 40,
        delay: 20,
        compression: 50
      }
    },
    {
      id: 3,
      name: "摇滚人声",
      icon: "Zap",
      color: "accent-3",
      parameters: {
        pitchCorrection: 40,
        vibrato: 15,
        formantShift: 5,
        harmonization: 0,
        reverb: 20,
        delay: 10,
        compression: 70
      }
    },
    {
      id: 4,
      name: "空灵风格",
      icon: "CloudSun",
      color: "primary",
      parameters: {
        pitchCorrection: 70,
        vibrato: 60,
        formantShift: 15,
        harmonization: 50,
        reverb: 70,
        delay: 40,
        compression: 30
      }
    }
  ];

  // 历史记录模拟数据
  const mockHistoryData = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 1200000),
      action: "应用流行人声预设",
      parameters: presets[0].parameters
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 900000),
      action: "调整音高修正",
      parameters: {
        ...presets[0].parameters,
        pitchCorrection: 65
      }
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 600000),
      action: "增加混响",
      parameters: {
        ...presets[0].parameters,
        pitchCorrection: 65,
        reverb: 45
      }
    }
  ];

  // 处理文件上传
  const handleFileUpload = (file) => {
    setAudioFile(file);
    // 上传新文件时重置历史记录
    setHistory([{
      id: 1,
      timestamp: new Date(),
      action: "上传文件",
      parameters: { ...parameters }
    }]);
    setHistoryIndex(0);

    // 模拟加载波形
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 1500);
  };

  // 应用预设
  const applyPreset = (preset) => {
    setActivePreset(preset.id);
    setParameters(preset.parameters);

    // 添加到历史记录
    const newHistoryItem = {
      id: history.length + 1,
      timestamp: new Date(),
      action: `应用${preset.name}预设`,
      parameters: { ...preset.parameters }
    };

    // 如果不在历史记录末尾，截断历史记录
    const newHistory = history.slice(0, historyIndex + 1).concat(newHistoryItem);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    // 模拟处理
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 800);
  };

  // 更新参数
  const updateParameter = (param, value) => {
    const newParameters = { ...parameters, [param]: value };
    setParameters(newParameters);

    // 在实际应用中，不要为每个小变化都添加到历史记录，使用防抖
    // 为演示简化处理
  };

  // 最终确定参数更改（添加到历史记录）
  const finalizeParameterChange = (param, value) => {
    const newParameters = { ...parameters, [param]: value };

    // 添加到历史记录
    const newHistoryItem = {
      id: history.length + 1,
      timestamp: new Date(),
      action: `调整${param.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
      parameters: { ...newParameters }
    };

    // 如果不在历史记录末尾，截断历史记录
    const newHistory = history.slice(0, historyIndex + 1).concat(newHistoryItem);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    // 如果有激活的预设，现在已自定义
    if (activePreset) {
      setActivePreset(null);
    }
  };

  // 撤销/重做功能
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setParameters(history[historyIndex - 1].parameters);

      // 检查是否匹配预设
      const matchingPreset = presets.find(preset =>
        JSON.stringify(preset.parameters) === JSON.stringify(history[historyIndex - 1].parameters)
      );
      setActivePreset(matchingPreset ? matchingPreset.id : null);

      // 模拟处理
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
      }, 400);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setParameters(history[historyIndex + 1].parameters);

      // 检查是否匹配预设
      const matchingPreset = presets.find(preset =>
        JSON.stringify(preset.parameters) === JSON.stringify(history[historyIndex + 1].parameters)
      );
      setActivePreset(matchingPreset ? matchingPreset.id : null);

      // 模拟处理
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
      }, 400);
    }
  };

  // 保存自定义预设
  const saveCustomPreset = (name) => {
    // 在实际应用中，这会保存到用户的预设中
    console.log(`保存自定义预设: ${name}`, parameters);
  };

  // 处理音频
  const processAudio = () => {
    setIsProcessing(true);
    // 模拟处理
    setTimeout(() => {
      setIsProcessing(false);

      // 如果历史记录中不存在，则添加到历史记录
      if (history.length === 0 || JSON.stringify(history[historyIndex].parameters) !== JSON.stringify(parameters)) {
        const newHistoryItem = {
          id: history.length + 1,
          timestamp: new Date(),
          action: "处理音频",
          parameters: { ...parameters }
        };

        const newHistory = history.slice(0, historyIndex + 1).concat(newHistoryItem);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
    }, 1500);
  };

  // 用模拟历史数据初始化
  useEffect(() => {
    if (audioFile) return; // 仅在尚未加载文件时初始化

    // 模拟已加载文件
    // setAudioFile({
    //   name: "vocal_demo_track.wav",
    //   size: 4823564,
    //   type: "audio/wav",
    //   lastModified: Date.now() - 3600000
    // });

    // setHistory(mockHistoryData);
    // setHistoryIndex(mockHistoryData.length - 1);
    // setParameters(mockHistoryData[mockHistoryData.length - 1].parameters);
  }, []);

  // 键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + Z 撤销
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      // Ctrl/Cmd + Shift + Z 或 Ctrl/Cmd + Y 重做
      if ((e.ctrlKey || e.metaKey) && ((e.key === 'z' && e.shiftKey) || e.key === 'y')) {
        e.preventDefault();
        redo();
      }

      // 空格键播放/暂停
      if (e.key === ' ' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        // 播放/暂停切换会在这里
      }

      // H 键帮助
      if (e.key === 'h' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setShowHelp(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主要内容 */}
      <div className="flex-1 flex flex-col">
        {/* 头部 */}
        <Header />

        {/* 主要内容区域 */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* 页面标题和操作 */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="display-small mb-2">AI人声调音工作室</h1>
                <p className="body-medium text-text-secondary">
                  使用AI工具转换和增强人声录音
                </p>
              </div>

              <div className="flex items-center mt-4 md:mt-0 space-x-3">
                <button
                  onClick={() => setShowFrequencyAnalysis(!showFrequencyAnalysis)}
                  className="flex items-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                >
                  <Icon name={showFrequencyAnalysis ? "BarChart" : "BarChart2"} size={18} className="mr-2" />
                  <span>{showFrequencyAnalysis ? "隐藏分析" : "显示分析"}</span>
                </button>

                <button
                  onClick={() => setShowHelp(true)}
                  className="flex items-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                >
                  <Icon name="HelpCircle" size={18} className="mr-2" />
                  <span>帮助</span>
                </button>
              </div>
            </div>

            {/* 主要工作室界面 */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* 左侧面板 - 上传和历史记录 */}
              <div className="lg:col-span-1 space-y-6">
                {/* 上传面板 */}
                <UploadPanel
                  audioFile={audioFile}
                  onFileUpload={handleFileUpload}
                />

                {/* 历史记录面板 */}
                <HistoryPanel
                  history={history}
                  historyIndex={historyIndex}
                  onSelectHistoryItem={(index) => {
                    setHistoryIndex(index);
                    setParameters(history[index].parameters);

                    // 检查是否匹配预设
                    const matchingPreset = presets.find(preset =>
                      JSON.stringify(preset.parameters) === JSON.stringify(history[index].parameters)
                    );
                    setActivePreset(matchingPreset ? matchingPreset.id : null);

                    // 模拟处理
                    setIsProcessing(true);
                    setTimeout(() => {
                      setIsProcessing(false);
                    }, 400);
                  }}
                  onUndo={undo}
                  onRedo={redo}
                  canUndo={historyIndex > 0}
                  canRedo={historyIndex < history.length - 1}
                />
              </div>

              {/* 中间面板 - 波形和控制 */}
              <div className="lg:col-span-3 space-y-6">
                {/* 预设 */}
                <PresetSelector
                  presets={presets}
                  activePreset={activePreset}
                  onSelectPreset={applyPreset}
                  onSaveCustomPreset={saveCustomPreset}
                />

                {/* 波形可视化 */}
                <WaveformVisualization
                  audioFile={audioFile}
                  isProcessing={isProcessing}
                  ref={waveformRef}
                />

                {/* 频率分析 (条件显示) */}
                {showFrequencyAnalysis && (
                  <FrequencyAnalysis
                    parameters={parameters}
                  />
                )}

                {/* 控制面板 */}
                <ControlPanel
                  parameters={parameters}
                  onUpdateParameter={updateParameter}
                  onFinalizeParameterChange={finalizeParameterChange}
                  onProcessAudio={processAudio}
                  isProcessing={isProcessing}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 帮助覆盖层 */}
      {showHelp && (
        <HelpOverlay onClose={() => setShowHelp(false)} />
      )}
    </div>
  );
};

export default AIVocalTuningStudio;