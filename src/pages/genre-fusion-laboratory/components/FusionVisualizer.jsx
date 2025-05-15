import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const FusionVisualizer = ({ genreA, genreB, fusionBalance, className }) => {
  const canvasRef = useRef(null);
  
  // Characteristics to visualize
  const characteristics = [
    "rhythm",
    "melody",
    "harmony",
    "instrumentation",
    "energy"
  ];
  
  useEffect(() => {
    if (!canvasRef.current || !genreA || !genreB) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up node positions
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;
    
    // Draw connections
    ctx.lineWidth = 2;
    
    // Draw genre A nodes and connections
    const genreANodes = characteristics.map((char, i) => {
      const angle = (Math.PI * 2 / characteristics.length) * i - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius * 0.7;
      const y = centerY + Math.sin(angle) * radius * 0.7;
      return { x, y, value: genreA.characteristics[char] || 50 };
    });
    
    // Draw genre B nodes and connections
    const genreBNodes = characteristics.map((char, i) => {
      const angle = (Math.PI * 2 / characteristics.length) * i - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius * 1.3;
      const y = centerY + Math.sin(angle) * radius * 1.3;
      return { x, y, value: genreB.characteristics[char] || 50 };
    });
    
    // Draw connections between nodes
    for (let i = 0; i < characteristics.length; i++) {
      // Connection strength based on fusion balance
      const strength = (genreA.characteristics[characteristics[i]] || 50) * (100 - fusionBalance) / 100 + 
                       (genreB.characteristics[characteristics[i]] || 50) * fusionBalance / 100;
      
      // Draw connection from genre A to center
      const gradientA = ctx.createLinearGradient(
        genreANodes[i].x, genreANodes[i].y, 
        centerX, centerY
      );
      gradientA.addColorStop(0, 'rgba(59, 130, 246, 0.8)'); // accent-2
      gradientA.addColorStop(1, 'rgba(147, 51, 234, 0.8)'); // primary
      
      ctx.beginPath();
      ctx.strokeStyle = gradientA;
      ctx.lineWidth = 2 + (strength / 20);
      ctx.moveTo(genreANodes[i].x, genreANodes[i].y);
      ctx.lineTo(centerX, centerY);
      ctx.stroke();
      
      // Draw connection from genre B to center
      const gradientB = ctx.createLinearGradient(
        genreBNodes[i].x, genreBNodes[i].y, 
        centerX, centerY
      );
      gradientB.addColorStop(0, 'rgba(217, 70, 239, 0.8)'); // accent-1
      gradientB.addColorStop(1, 'rgba(147, 51, 234, 0.8)'); // primary
      
      ctx.beginPath();
      ctx.strokeStyle = gradientB;
      ctx.lineWidth = 2 + (strength / 20);
      ctx.moveTo(genreBNodes[i].x, genreBNodes[i].y);
      ctx.lineTo(centerX, centerY);
      ctx.stroke();
    }
    
    // Draw genre A nodes
    genreANodes.forEach((node, i) => {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(59, 130, 246, 0.8)'; // accent-2
      ctx.arc(node.x, node.y, 6 + (node.value / 10), 0, Math.PI * 2);
      ctx.fill();
      
      // Draw label
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(characteristics[i], node.x, node.y - 20);
    });
    
    // Draw genre B nodes
    genreBNodes.forEach((node, i) => {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(217, 70, 239, 0.8)'; // accent-1
      ctx.arc(node.x, node.y, 6 + (node.value / 10), 0, Math.PI * 2);
      ctx.fill();
      
      // Draw label
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(characteristics[i], node.x, node.y - 20);
    });
    
    // Draw center fusion node
    ctx.beginPath();
    ctx.fillStyle = 'rgba(147, 51, 234, 0.9)'; // primary
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw fusion label
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('FUSION', centerX, centerY);
    
  }, [genreA, genreB, fusionBalance]);
  
  return (
    <motion.div 
      className={`bg-surface rounded-xl p-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="heading-medium mb-4">Fusion Visualization</h2>
      <p className="text-sm text-text-secondary mb-4">
        Interactive node graph showing how elements from each genre connect and influence the output
      </p>
      
      <div className="relative h-64 w-full">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={400} 
          className="w-full h-full"
        ></canvas>
        
        <div className="absolute bottom-4 left-4 bg-surface bg-opacity-70 backdrop-blur-md rounded-lg px-3 py-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-accent-2 mr-2"></div>
              <span className="text-xs">{genreA?.name}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-accent-1 mr-2"></div>
              <span className="text-xs">{genreB?.name}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
              <span className="text-xs">Fusion</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FusionVisualizer;