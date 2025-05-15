import React, { useCallback, useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const UploadPanel = ({ audioFile, onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 格式化时间显示 (mm:ss)
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // 格式化文件大小
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 处理文件上传
  const handleFileUpload = useCallback((file) => {
    // 清理之前的音频对象
    if (audioPlayer) {
      audioPlayer.pause();
      URL.revokeObjectURL(audioPlayer.src);
    }

    const audioUrl = URL.createObjectURL(file);
    const newAudioPlayer = new Audio(audioUrl);

    // 设置音频事件监听
    newAudioPlayer.addEventListener('loadedmetadata', () => {
      setDuration(newAudioPlayer.duration);
    });

    newAudioPlayer.addEventListener('timeupdate', () => {
      setCurrentTime(newAudioPlayer.currentTime);
    });

    newAudioPlayer.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    setAudioPlayer(newAudioPlayer);
    setIsPlaying(false);
    setCurrentTime(0);
    onFileUpload(file);
  }, [audioPlayer, onFileUpload]);

  // 拖拽相关事件处理
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.includes('audio')) {
        handleFileUpload(file);
      }
    }
  }, [handleFileUpload]);

  const handleFileChange = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  // 播放/暂停控制
  const togglePlayPause = useCallback(() => {
    if (!audioPlayer) return;

    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    setIsPlaying(!isPlaying);
  }, [audioPlayer, isPlaying]);

  // 进度条跳转
  const handleSeek = useCallback((e) => {
    if (!audioPlayer) return;

    const seekTime = parseFloat(e.target.value);
    audioPlayer.currentTime = seekTime;
    setCurrentTime(seekTime);
  }, [audioPlayer]);

  // 组件卸载时清理资源
  useEffect(() => {
    return () => {
      if (audioPlayer) {
        audioPlayer.pause();
        URL.revokeObjectURL(audioPlayer.src);
      }
    };
  }, [audioPlayer]);

  return (
    <div className="bg-surface rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="heading-small">音频源</h3>
      </div>

      {!audioFile ? (
        <div
          className={`p-6 flex flex-col items-center justify-center ${isDragging ? "bg-primary bg-opacity-10" : ""
            }`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 rounded-full bg-surface-alt flex items-center justify-center mb-4">
            <Icon name="Upload" size={24} className="text-text-secondary" />
          </div>

          <h4 className="heading-medium mb-2 text-center">上传音频文件</h4>
          <p className="text-text-secondary text-center mb-6">
            拖放音频文件到此处或点击浏览
          </p>

          <label className="flex items-center px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 cursor-pointer">
            <Icon name="FileAudio" size={18} className="mr-2" />
            <span>选择音频文件</span>
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <p className="text-xs text-text-tertiary mt-4">
            支持格式: WAV, MP3, AIFF, FLAC (最大50MB)
          </p>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-accent-1 bg-opacity-20 flex items-center justify-center mr-4">
              <Icon name="FileAudio" size={24} className="text-accent-1" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="heading-small truncate">{audioFile.name}</h4>
              <p className="text-sm text-text-secondary">
                {formatFileSize(audioFile.size)} • {audioFile.type.split('/')[1].toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              className="flex items-center justify-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
              onClick={togglePlayPause}
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={18} className="mr-2" />
              <span>{isPlaying ? "暂停" : "播放"}</span>
            </button>

            {/* 进度条 */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-text-secondary w-10">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 1}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1"
              />
              <span className="text-xs text-text-secondary w-10">
                {formatTime(duration)}
              </span>
            </div>

            <button
              className="flex items-center justify-center px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
              onClick={() => document.getElementById('replace-audio-input').click()}
            >
              <Icon name="RefreshCw" size={18} className="mr-2" />
              <span>替换音频</span>
              <input
                id="replace-audio-input"
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="heading-small mb-2">音频信息</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">时长</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">当前进度</span>
                <span>{formatTime(currentTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">播放状态</span>
                <span>{isPlaying ? "播放中" : "已暂停"}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPanel;