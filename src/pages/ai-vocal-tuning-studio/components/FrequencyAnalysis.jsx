import React from "react";

import Icon from "../../../components/AppIcon";

const FrequencyAnalysis = ({ parameters }) => {
  // Generate mock frequency data
  const generateFrequencyData = () => {
    const data = [];
    const frequencies = [
      "20Hz", "50Hz", "100Hz", "200Hz", "500Hz", 
      "1kHz", "2kHz", "5kHz", "10kHz", "20kHz"
    ];
    
    for (let i = 0; i < frequencies.length; i++) {
      // Create a frequency response curve that's affected by the parameters
      let height = Math.random() * 0.3 + 0.2; // Base random height
      
      // Adjust based on parameters
      if (i >= 5) { // High frequencies
        height += parameters.formantShift > 0 ? parameters.formantShift / 200 : 0;
      } else if (i >= 2 && i <= 4) { // Mid frequencies
        height += parameters.vibrato / 300;
      } else { // Low frequencies
        height -= parameters.formantShift < 0 ? parameters.formantShift / 200 : 0;
      }
      
      // Add some randomness for realism
      height = Math.min(0.95, Math.max(0.1, height + (Math.random() * 0.1 - 0.05)));
      
      data.push({
        frequency: frequencies[i],
        height
      });
    }
    
    return data;
  };
  
  // Generate mock pitch tracking data
  const generatePitchData = () => {
    const data = [];
    const segments = 50;
    
    let currentPitch = 0.5; // Start in the middle
    
    for (let i = 0; i < segments; i++) {
      // Create a somewhat realistic pitch contour
      const randomWalk = (Math.random() - 0.5) * 0.1;
      currentPitch = Math.min(0.9, Math.max(0.1, currentPitch + randomWalk));
      
      // Add vibrato-like oscillation
      const vibratoAmount = parameters.vibrato / 1000;
      const vibratoOscillation = Math.sin(i * 0.5) * vibratoAmount;
      
      // Apply pitch correction (makes the line more flat/consistent)
      const correctionFactor = parameters.pitchCorrection / 100;
      const targetPitch = 0.5; // Center pitch
      const correctedPitch = currentPitch * (1 - correctionFactor) + targetPitch * correctionFactor;
      
      data.push(correctedPitch + vibratoOscillation);
    }
    
    return data;
  };
  
  const frequencyData = generateFrequencyData();
  const pitchData = generatePitchData();
  
  return (
    <div className="bg-surface rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="heading-small">Advanced Analysis</h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Frequency Spectrum */}
        <div>
          <h4 className="heading-small mb-3">Frequency Spectrum</h4>
          <div className="bg-surface-alt rounded-lg p-4 h-40 flex items-end">
            {frequencyData.map((item, index) => (
              <div 
                key={index} 
                className="flex-1 flex flex-col items-center justify-end h-full"
              >
                <div 
                  className="w-full bg-primary rounded-t-sm"
                  style={{ 
                    height: `${item.height * 100}%`,
                    opacity: 0.6 + (item.height * 0.4)
                  }}
                ></div>
                <span className="text-xs text-text-tertiary mt-2 transform -rotate-45 origin-top-left">
                  {item.frequency}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pitch Tracking */}
        <div>
          <h4 className="heading-small mb-3">Pitch Tracking</h4>
          <div className="bg-surface-alt rounded-lg p-4 h-40 relative">
            {/* Pitch reference lines */}
            <div className="absolute left-0 right-0 top-1/4 border-t border-dashed border-text-tertiary border-opacity-20"></div>
            <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-text-tertiary border-opacity-30"></div>
            <div className="absolute left-0 right-0 top-3/4 border-t border-dashed border-text-tertiary border-opacity-20"></div>
            
            {/* Note labels */}
            <div className="absolute left-2 top-1/4 transform -translate-y-1/2">
              <span className="text-xs text-text-tertiary">C5</span>
            </div>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <span className="text-xs text-text-tertiary">C4</span>
            </div>
            <div className="absolute left-2 top-3/4 transform -translate-y-1/2">
              <span className="text-xs text-text-tertiary">C3</span>
            </div>
            
            {/* Pitch line */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={pitchData.map((point, i) => `${(i / (pitchData.length - 1)) * 100},${point * 100}`).join(' ')}
                fill="none"
                stroke="var(--color-accent-1)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            
            {/* Corrected pitch line (if pitch correction is applied) */}
            {parameters.pitchCorrection > 20 && (
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                  points={pitchData.map((point, i) => {
                    // Apply stronger correction for visualization
                    const correctionFactor = parameters.pitchCorrection / 50;
                    const targetPitch = 0.5; // Center pitch
                    const correctedPitch = point * (1 - correctionFactor) + targetPitch * correctionFactor;
                    return `${(i / (pitchData.length - 1)) * 100},${correctedPitch * 100}`;
                  }).join(' ')}
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="2,2"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      
      {/* Parameter Impact Analysis */}
      <div className="p-6 pt-0">
        <h4 className="heading-small mb-3">Parameter Impact Analysis</h4>
        <div className="bg-surface-alt rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-accent-1 bg-opacity-20 flex items-center justify-center mr-3">
                <Icon name="ArrowUpDown" size={16} className="text-accent-1" />
              </div>
              <div>
                <h5 className="text-sm font-medium">Pitch Correction</h5>
                <div className="flex items-center mt-1">
                  <div className="w-24 h-2 bg-surface rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent-1"
                      style={{ width: `${parameters.pitchCorrection}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-text-secondary ml-2">
                    {parameters.pitchCorrection > 75 ? "Strong" : 
                     parameters.pitchCorrection > 40 ? "Moderate" : "Subtle"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-accent-2 bg-opacity-20 flex items-center justify-center mr-3">
                <Icon name="Waveform" size={16} className="text-accent-2" />
              </div>
              <div>
                <h5 className="text-sm font-medium">Vibrato</h5>
                <div className="flex items-center mt-1">
                  <div className="w-24 h-2 bg-surface rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent-2"
                      style={{ width: `${parameters.vibrato}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-text-secondary ml-2">
                    {parameters.vibrato > 75 ? "Intense" : 
                     parameters.vibrato > 40 ? "Natural" : "Minimal"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-accent-3 bg-opacity-20 flex items-center justify-center mr-3">
                <Icon name="Sliders" size={16} className="text-accent-3" />
              </div>
              <div>
                <h5 className="text-sm font-medium">Formant Shift</h5>
                <div className="flex items-center mt-1">
                  <div className="w-24 h-2 bg-surface rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent-3"
                      style={{ 
                        width: `${Math.abs(parameters.formantShift) * 2}%`,
                        marginLeft: parameters.formantShift < 0 ? 0 : "50%" 
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-text-secondary ml-2">
                    {parameters.formantShift > 15 ? "Higher" : 
                     parameters.formantShift < -15 ? "Lower" : "Neutral"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequencyAnalysis;