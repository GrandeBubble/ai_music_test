import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const AudioPreview = ({ genreA, genreB, fusionBalance, isPlaying, setIsPlaying, className }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Function to draw waveform
    const drawWaveform = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      if (!isPlaying) {
        // Draw static waveform when not playing
        const barCount = 100;
        const barWidth = width / barCount;
        const barMargin = 1;

        for (let i = 0; i < barCount; i++) {
          // Generate a height based on a sine wave
          const heightA = Math.abs(Math.sin(i * 0.2) * (height / 2) * 0.8);
          const heightB = Math.abs(Math.sin(i * 0.3 + 1) * (height / 2) * 0.8);

          // Calculate fusion height
          const fusionHeight = (heightA * (100 - fusionBalance) / 100) + (heightB * fusionBalance / 100);

          // Draw bar
          const x = i * barWidth;

          // Draw genre A component (bottom half)
          ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'; // accent-2
          ctx.fillRect(
            x + barMargin,
            height / 2,
            barWidth - barMargin * 2,
            heightA * (100 - fusionBalance) / 100
          );

          // Draw genre B component (top half)
          ctx.fillStyle = 'rgba(217, 70, 239, 0.5)'; // accent-1
          ctx.fillRect(
            x + barMargin,
            height / 2 - heightB * fusionBalance / 100,
            barWidth - barMargin * 2,
            heightB * fusionBalance / 100
          );
        }
      } else {
        // Draw animated waveform when playing
        const barCount = 100;
        const barWidth = width / barCount;
        const barMargin = 1;
        const time = Date.now() / 1000;

        for (let i = 0; i < barCount; i++) {
          // Generate a height based on a sine wave with time
          const heightA = Math.abs(Math.sin(i * 0.2 + time * 2) * (height / 2) * 0.8);
          const heightB = Math.abs(Math.sin(i * 0.3 + time * 3) * (height / 2) * 0.8);

          // Calculate fusion height
          const fusionHeight = (heightA * (100 - fusionBalance) / 100) + (heightB * fusionBalance / 100);

          // Draw bar
          const x = i * barWidth;

          // Draw genre A component (bottom half)
          ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'; // accent-2
          ctx.fillRect(
            x + barMargin,
            height / 2,
            barWidth - barMargin * 2,
            heightA * (100 - fusionBalance) / 100
          );

          // Draw genre B component (top half)
          ctx.fillStyle = 'rgba(217, 70, 239, 0.5)'; // accent-1
          ctx.fillRect(
            x + barMargin,
            height / 2 - heightB * fusionBalance / 100,
            barWidth - barMargin * 2,
            heightB * fusionBalance / 100
          );
        }

        // Continue animation
        animationRef.current = requestAnimationFrame(drawWaveform);
      }
    };

    drawWaveform();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, fusionBalance, genreA, genreB]);

  return (
    <motion.div
      className={`bg-surface rounded-xl p-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="heading-medium">音频预览</h2>

        <div className="flex items-center space-x-3">
          <button className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center hover:bg-opacity-80 transition-all duration-300">
            <Icon name="SkipBack" size={16} />
          </button>

          <button
            className={`w-10 h-10 rounded-full ${isPlaying ? "bg-primary" : "bg-accent-3"
              } flex items-center justify-center hover:bg-opacity-80 transition-all duration-300`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
          </button>

          <button className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center hover:bg-opacity-80 transition-all duration-300">
            <Icon name="SkipForward" size={16} />
          </button>
        </div>
      </div>

      <div className="relative h-24 mb-2">
        <canvas
          ref={canvasRef}
          width={800}
          height={200}
          className="w-full h-full"
        ></canvas>

        {/* Playhead */}
        {isPlaying && (
          <div
            className="absolute top-0 bottom-0 w-px bg-text-primary"
            style={{ left: '50%' }}
          ></div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm">
          <span className="text-text-secondary">融合： </span>
          <span>{genreA?.name} × {genreB?.name}</span>
        </div>

        <div className="text-sm">
          <span className="text-text-tertiary">00:00 / 03:30</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AudioPreview;