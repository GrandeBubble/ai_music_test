import React, { forwardRef, useState, useEffect, useRef } from "react";
import Icon from "../../../components/AppIcon";

const WaveformVisualization = forwardRef(({ audioFile, isProcessing }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [zoom, setZoom] = useState(1);
  const [waveformData, setWaveformData] = useState([]);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const audioBufferRef = useRef(null);
  const requestRef = useRef(null);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      if (sourceRef.current) {
        sourceRef.current.stop();
      }
      cancelAnimationFrame(requestRef.current);
    } else {
      if (audioBufferRef.current) {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
        source.start(0, currentTime);
        sourceRef.current = source;

        const startTime = audioContextRef.current.currentTime - currentTime;

        const updateVisualization = () => {
          const elapsed = audioContextRef.current.currentTime - startTime;
          setCurrentTime(elapsed);

          if (elapsed < duration) {
            requestRef.current = requestAnimationFrame(updateVisualization);
          } else {
            setIsPlaying(false);
          }
        };

        requestRef.current = requestAnimationFrame(updateVisualization);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleWaveformClick = (e) => {
    if (isProcessing || !duration) return;

    const waveformEl = e.currentTarget;
    const rect = waveformEl.getBoundingClientRect();
    const clickPosition = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const newTime = clickPosition * duration;

    setCurrentTime(newTime);
    if (isPlaying) {
      if (sourceRef.current) {
        sourceRef.current.stop();
      }

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
      source.start(0, newTime);
      sourceRef.current = source;

      const startTime = audioContextRef.current.currentTime - newTime;

      const updateVisualization = () => {
        const elapsed = audioContextRef.current.currentTime - startTime;
        setCurrentTime(elapsed);

        if (elapsed < duration) {
          requestRef.current = requestAnimationFrame(updateVisualization);
        } else {
          setIsPlaying(false);
        }
      };

      requestRef.current = requestAnimationFrame(updateVisualization);
    }
  };

  useEffect(() => {
    if (!audioFile) {
      setWaveformData([]);
      setDuration(0);
      setCurrentTime(0);
      return;
    }

    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const buffer = await audioContextRef.current.decodeAudioData(e.target.result);
        audioBufferRef.current = buffer;
        setDuration(buffer.duration);
        setCurrentTime(0);

        const channelData = buffer.getChannelData(0);
        const samplesPerPixel = Math.floor(channelData.length / 200);
        const waveform = [];

        for (let i = 0; i < 200; i++) {
          const start = i * samplesPerPixel;
          const end = Math.min(start + samplesPerPixel, channelData.length);
          let sum = 0;
          let count = 0;

          for (let j = start; j < end; j++) {
            sum += Math.abs(channelData[j]);
            count++;
          }

          const average = count > 0 ? sum / count : 0;
          waveform.push(average);
        }

        setWaveformData(waveform);
      } catch (error) {
        console.error('Error decoding audio data:', error);
      }
    };

    reader.readAsArrayBuffer(audioFile);

    return () => {
      if (sourceRef.current) {
        sourceRef.current.stop();
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      cancelAnimationFrame(requestRef.current);
    };
  }, [audioFile]);

  return (
    <div className="bg-surface rounded-xl overflow-hidden" ref={ref}>
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="heading-small">波形可视化</h3>
        <div className="flex items-center space-x-2">
          <button onClick={() => setZoom(Math.max(0.5, zoom - 0.5))} disabled={zoom <= 0.5}>
            <Icon name="ZoomOut" size={16} />
          </button>
          <button onClick={() => setZoom(Math.min(3, zoom + 0.5))} disabled={zoom >= 3}>
            <Icon name="ZoomIn" size={16} />
          </button>
          <button onClick={() => setSelection({ start: 0, end: duration })}>
            <Icon name="Maximize2" size={16} />
          </button>
          <button onClick={() => setSelection({ start: 0, end: 0 })}>
            <Icon name="X" size={16} />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="relative h-40 bg-surface-alt rounded-lg overflow-hidden cursor-pointer" onClick={handleWaveformClick}>
          {selection.start !== selection.end && (
            <div className="absolute top-0 bottom-0 bg-primary bg-opacity-20 z-10"
              style={{ left: `${(selection.start / duration) * 100}%`, width: `${((selection.end - selection.start) / duration) * 100}%` }}
            ></div>
          )}
          {duration > 0 && (
            <div className="absolute top-0 bottom-0 w-0.5 bg-primary z-20"
              style={{ left: `${(currentTime / duration) * 100}%` }}
            ></div>
          )}
          <div className="flex items-center h-full">
            {waveformData.map((height, index) => (
              <div key={index} className="flex-1 flex items-center justify-center h-full">
                <div
                  className={`w-1 rounded-sm ${currentTime / duration > index / waveformData.length ? "bg-primary" : "bg-text-tertiary"}`}
                  style={{
                    height: `${Math.max(2, height * 100)}%`,
                    opacity: currentTime / duration > index / waveformData.length ? 1 : 0.6,
                    transform: `scaleY(${zoom})`,
                    transformOrigin: 'bottom'
                  }}
                ></div>
              </div>
            ))}
          </div>
          {isProcessing && (
            <div className="absolute inset-0 bg-background bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-30">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mb-3"></div>
                <span className="text-sm font-medium">正在处理音频...</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-2 text-xs text-text-secondary">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <button onClick={() => {
            const newTime = Math.max(0, currentTime - 10);
            setCurrentTime(newTime);
            if (isPlaying && sourceRef.current) {
              sourceRef.current.stop();
              const source = audioContextRef.current.createBufferSource();
              source.buffer = audioBufferRef.current;
              source.connect(analyserRef.current);
              analyserRef.current.connect(audioContextRef.current.destination);
              source.start(0, newTime);
              sourceRef.current = source;
              const startTime = audioContextRef.current.currentTime - newTime;
              const updateVisualization = () => {
                const elapsed = audioContextRef.current.currentTime - startTime;
                setCurrentTime(elapsed);
                if (elapsed < duration) {
                  requestRef.current = requestAnimationFrame(updateVisualization);
                } else {
                  setIsPlaying(false);
                }
              };
              requestRef.current = requestAnimationFrame(updateVisualization);
            }
          }}>
            <Icon name="Rewind" size={18} />
          </button>
          <button onClick={togglePlayPause} disabled={isProcessing || !audioFile}>
            <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
          </button>
          <button onClick={() => {
            const newTime = Math.min(duration, currentTime + 10);
            setCurrentTime(newTime);
            if (isPlaying && sourceRef.current) {
              sourceRef.current.stop();
              const source = audioContextRef.current.createBufferSource();
              source.buffer = audioBufferRef.current;
              source.connect(analyserRef.current);
              analyserRef.current.connect(audioContextRef.current.destination);
              source.start(0, newTime);
              sourceRef.current = source;
              const startTime = audioContextRef.current.currentTime - newTime;
              const updateVisualization = () => {
                const elapsed = audioContextRef.current.currentTime - startTime;
                setCurrentTime(elapsed);
                if (elapsed < duration) {
                  requestRef.current = requestAnimationFrame(updateVisualization);
                } else {
                  setIsPlaying(false);
                }
              };
              requestRef.current = requestAnimationFrame(updateVisualization);
            }
          }}>
            <Icon name="FastForward" size={18} />
          </button>
        </div>
        <div className="flex items-center justify-center mt-4">
          {/* <button onClick={() => console.log("Toggle between original and processed")}>
            <Icon name="GitCompare" size={16} className="mr-2" />
            <span>Compare with Original</span>
          </button> */}
        </div>
      </div>
    </div>
  );
});

export default WaveformVisualization;
