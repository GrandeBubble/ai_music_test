import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "选择你的工具",
      description: "根据你的创作需求，从我们的 AI 音乐工具套件中进行选择",
      icon: "Layers",
      color: "primary"
    },
    {
      id: 2,
      title: "自定义参数",
      description: "调整 AI 参数以实现你想要的声音和风格",
      icon: "Sliders",
      color: "accent-2"
    },
    {
      id: 3,
      title: "生成并优化",
      description: "创建你的音乐并微调结果直到完美",
      icon: "Wand2",
      color: "accent-1"
    }
  ];

  return (
    <div className="relative">
      {/* Connection Line */}
      <div className="absolute top-24 left-0 right-0 h-0.5 bg-border hidden md:block"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full bg-${step.color} bg-opacity-20 flex items-center justify-center mb-6 relative z-10`}>
                <Icon name={step.icon} size={28} className={`text-${step.color}`} />
              </div>

              <div className="bg-surface rounded-xl p-6 border border-border">
                <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center mb-4 mx-auto">
                  <span className="text-sm font-medium">{step.id}</span>
                </div>

                <h3 className="heading-medium mb-3">{step.title}</h3>

                <p className="text-text-secondary">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;