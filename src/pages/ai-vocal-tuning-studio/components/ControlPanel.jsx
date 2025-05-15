import React from "react";

import Icon from "../../../components/AppIcon";

const ControlPanel = ({
  parameters,
  onUpdateParameter,
  onFinalizeParameterChange,
  onProcessAudio,
  isProcessing
}) => {
  // Parameter definitions with metadata
  const parameterDefinitions = [
    {
      id: "pitchCorrection",
      name: "音调矫正",
      icon: "ArrowUpDown",
      color: "accent-1",
      min: 0,
      max: 100,
      step: 1,
      description: "自动校正音调偏差"
    },
    {
      id: "vibrato",
      name: "颤音",
      icon: "Waveform",
      color: "accent-2",
      min: 0,
      max: 100,
      step: 1,
      description: "为人声添加自然的颤音效果"
    },
    {
      id: "formantShift",
      name: "共振峰移位",
      icon: "Sliders",
      color: "accent-3",
      min: -50,
      max: 50,
      step: 1,
      description: "调整人声特性而不改变音高"
    },
    {
      id: "harmonization",
      name: "和声",
      icon: "Layers",
      color: "primary",
      min: 0,
      max: 100,
      step: 1,
      description: "为人声添加和声效果"
    },
    {
      id: "reverb",
      name: "混响",
      icon: "Droplets",
      color: "info",
      min: 0,
      max: 100,
      step: 1,
      description: "为人声添加空间深度效果"
    },
    {
      id: "delay",
      name: "延迟",
      icon: "Clock",
      color: "warning",
      min: 0,
      max: 100,
      step: 1,
      description: "为人声添加回声效果"
    },
    {
      id: "compression",
      name: "压缩",
      icon: "BarChart4",
      color: "success",
      min: 0,
      max: 100,
      step: 1,
      description: "控制人声的动态范围"
    }
  ];

  return (
    <div className="bg-surface rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="heading-small">人声增强控制</h3>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {parameterDefinitions.map((param) => (
            <div key={param.id} className="bg-surface-alt rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full bg-${param.color} bg-opacity-20 flex items-center justify-center mr-3`}>
                    <Icon name={param.icon} size={16} className={`text-${param.color}`} />
                  </div>
                  <div>
                    <h4 className="heading-small">{param.name}</h4>
                    <p className="text-xs text-text-secondary">{param.description}</p>
                  </div>
                </div>
                <span className="text-sm font-medium">
                  {param.id === "formantShift" && parameters[param.id] > 0 ? "+" : ""}
                  {parameters[param.id]}
                  {param.id === "formantShift" ? "" : "%"}
                </span>
              </div>

              <div className="flex items-center">
                <input
                  type="range"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={parameters[param.id]}
                  onChange={(e) => onUpdateParameter(param.id, parseInt(e.target.value))}
                  onMouseUp={(e) => onFinalizeParameterChange(param.id, parseInt(e.target.value))}
                  onTouchEnd={(e) => onFinalizeParameterChange(param.id, parseInt(e.target.value.target))}
                  className={`w-full h-2 rounded-full appearance-none bg-surface cursor-pointer focus:outline-none focus:ring-2 focus:ring-${param.color}`}
                  style={{
                    background: `linear-gradient(to right, var(--color-${param.color}) 0%, var(--color-${param.color}) ${((parameters[param.id] - param.min) / (param.max - param.min)) * 100
                      }%, var(--color-surface) ${((parameters[param.id] - param.min) / (param.max - param.min)) * 100
                      }%, var(--color-surface) 100%)`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="flex items-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
            onClick={() => {
              // Reset all parameters to default values
              const defaultParams = {
                pitchCorrection: 50,
                vibrato: 30,
                formantShift: 0,
                harmonization: 0,
                reverb: 20,
                delay: 0,
                compression: 40
              };

              Object.keys(defaultParams).forEach(param => {
                onFinalizeParameterChange(param, defaultParams[param]);
              });
            }}
          >
            <Icon name="RotateCcw" size={18} className="mr-2" />
            <span>恢复默认</span>
          </button>

          <div className="flex space-x-3">
            <button
              className="flex items-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
              onClick={() => {
                // In a real app, this would save the current settings
                console.log("Save settings", parameters);
              }}
            >
              <Icon name="Save" size={18} className="mr-2" />
              <span>保存设置</span>
            </button>

            <button
              className="flex items-center px-6 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300"
              onClick={onProcessAudio}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>正在处理音频...</span>
                </>
              ) : (
                <>
                  <Icon name="Wand" size={18} className="mr-2" />
                  <span>处理音频</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;