import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const SettingsTab = () => {
  // Mock settings data
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      projectUpdates: true,
      communityActivity: false,
      marketingEmails: false,
      newFeatures: true
    },
    privacy: {
      publicProfile: true,
      showActivity: true,
      allowDataCollection: true,
      showRealName: false
    },
    collaboration: {
      allowCollabRequests: true,
      autoAcceptFromFollowed: false,
      notifyOnMentions: true
    },
    audio: {
      defaultQuality: "high",
      autoNormalize: true,
      enableRealTimeProcessing: true,
      saveOriginalFiles: true,
      defaultExportFormat: "wav"
    }
  });

  const handleToggleChange = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleSelectChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const ToggleSwitch = ({ isOn, onToggle }) => (
    <button
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${isOn ? "bg-primary" : "bg-surface-alt"
        }`}
      onClick={onToggle}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${isOn ? "translate-x-6" : "translate-x-1"
          }`}
      />
    </button>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 通知设置 */}
      <div className="bg-surface rounded-xl p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-4">
            <Icon name="Bell" size={20} className="text-primary" />
          </div>
          <h3 className="heading-medium">通知设置</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">邮件通知</h4>
              <p className="text-sm text-text-secondary">通过邮件接收通知</p>
            </div>
            <ToggleSwitch
              isOn={settings.notifications.emailNotifications}
              onToggle={() => handleToggleChange("notifications", "emailNotifications")}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">项目更新</h4>
              <p className="text-sm text-text-secondary">获取项目处理通知</p>
            </div>
            <ToggleSwitch
              isOn={settings.notifications.projectUpdates}
              onToggle={() => handleToggleChange("notifications", "projectUpdates")}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">社区动态</h4>
              <p className="text-sm text-text-secondary">关于点赞、评论和分享的通知</p>
            </div>
            <ToggleSwitch
              isOn={settings.notifications.communityActivity}
              onToggle={() => handleToggleChange("notifications", "communityActivity")}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">营销邮件</h4>
              <p className="text-sm text-text-secondary">接收促销内容和优惠信息</p>
            </div>
            <ToggleSwitch
              isOn={settings.notifications.marketingEmails}
              onToggle={() => handleToggleChange("notifications", "marketingEmails")}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">新功能通知</h4>
              <p className="text-sm text-text-secondary">获取平台新功能更新</p>
            </div>
            <ToggleSwitch
              isOn={settings.notifications.newFeatures}
              onToggle={() => handleToggleChange("notifications", "newFeatures")}
            />
          </div>
        </div>
      </div>

      {/* 隐私设置 */}
      <div className="bg-surface rounded-xl p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-info bg-opacity-20 flex items-center justify-center mr-4">
            <Icon name="Lock" size={20} className="text-info" />
          </div>
          <h3 className="heading-medium">隐私设置</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">公开个人资料</h4>
              <p className="text-sm text-text-secondary">允许他人查看你的个人资料</p>
            </div>
            <ToggleSwitch
              isOn={settings.privacy.publicProfile}
              onToggle={() => handleToggleChange("privacy", "publicProfile")}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">活动可见性</h4>
              <p className="text-sm text-text-secondary">在社区动态中显示你的活动</p>
            </div>
            <ToggleSwitch
              isOn={settings.privacy.showActivity}
              onToggle={() => handleToggleChange("privacy", "showActivity")}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">数据收集</h4>
              <p className="text-sm text-text-secondary">允许收集匿名使用数据以改进AI</p>
            </div>
            <ToggleSwitch
              isOn={settings.privacy.allowDataCollection}
              onToggle={() => handleToggleChange("privacy", "allowDataCollection")}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">显示真实姓名</h4>
              <p className="text-sm text-text-secondary">显示你的真实姓名而非用户名</p>
            </div>
            <ToggleSwitch
              isOn={settings.privacy.showRealName}
              onToggle={() => handleToggleChange("privacy", "showRealName")}
            />
          </div>
        </div>
      </div>

      {/* 协作设置 */}
      <div className="bg-surface rounded-xl p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-accent-2 bg-opacity-20 flex items-center justify-center mr-4">
            <Icon name="Users" size={20} className="text-accent-2" />
          </div>
          <h3 className="heading-medium">协作设置</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">协作请求</h4>
              <p className="text-sm text-text-secondary">允许他人发送协作请求</p>
            </div>
            <ToggleSwitch
              isOn={settings.collaboration.allowCollabRequests}
              onToggle={() => handleToggleChange("collaboration", "allowCollabRequests")}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">自动接受关注者</h4>
              <p className="text-sm text-text-secondary">自动接受你关注的人的请求</p>
            </div>
            <ToggleSwitch
              isOn={settings.collaboration.autoAcceptFromFollowed}
              onToggle={() => handleToggleChange("collaboration", "autoAcceptFromFollowed")}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">提及通知</h4>
              <p className="text-sm text-text-secondary">当有人提及你时收到通知</p>
            </div>
            <ToggleSwitch
              isOn={settings.collaboration.notifyOnMentions}
              onToggle={() => handleToggleChange("collaboration", "notifyOnMentions")}
            />
          </div>
        </div>
      </div>

      {/* 音频设置 */}
      <div className="bg-surface rounded-xl p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-accent-1 bg-opacity-20 flex items-center justify-center mr-4">
            <Icon name="Headphones" size={20} className="text-accent-1" />
          </div>
          <h3 className="heading-medium">音频设置</h3>
        </div>

        <div className="space-y-4">
          <div className="py-2 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium">默认质量</h4>
                <p className="text-sm text-text-secondary">设置音频处理的默认质量</p>
              </div>
              <div className="relative">
                <select
                  value={settings.audio.defaultQuality}
                  onChange={(e) => handleSelectChange("audio", "defaultQuality", e.target.value)}
                  className="bg-surface-alt border-none rounded-lg py-2 pl-3 pr-10 appearance-none focus:ring-primary focus:ring-2 focus:outline-none"
                >
                  <option value="low">低 (处理更快)</option>
                  <option value="medium">中</option>
                  <option value="high">高 (质量更好)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Icon name="ChevronDown" size={16} className="text-text-tertiary" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">自动标准化音频</h4>
              <p className="text-sm text-text-secondary">自动调整音量水平</p>
            </div>
            <ToggleSwitch
              isOn={settings.audio.autoNormalize}
              onToggle={() => handleToggleChange("audio", "autoNormalize")}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">实时处理</h4>
              <p className="text-sm text-text-secondary">启用实时音频处理 (消耗更多资源)</p>
            </div>
            <ToggleSwitch
              isOn={settings.audio.enableRealTimeProcessing}
              onToggle={() => handleToggleChange("audio", "enableRealTimeProcessing")}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">保存原始文件</h4>
              <p className="text-sm text-text-secondary">处理后保留原始文件</p>
            </div>
            <ToggleSwitch
              isOn={settings.audio.saveOriginalFiles}
              onToggle={() => handleToggleChange("audio", "saveOriginalFiles")}
            />
          </div>

          <div className="py-2">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium">默认导出格式</h4>
                <p className="text-sm text-text-secondary">选择导出音频的默认格式</p>
              </div>
              <div className="relative">
                <select
                  value={settings.audio.defaultExportFormat}
                  onChange={(e) => handleSelectChange("audio", "defaultExportFormat", e.target.value)}
                  className="bg-surface-alt border-none rounded-lg py-2 pl-3 pr-10 appearance-none focus:ring-primary focus:ring-2 focus:outline-none"
                >
                  <option value="mp3">MP3</option>
                  <option value="wav">WAV</option>
                  <option value="flac">FLAC</option>
                  <option value="aac">AAC</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Icon name="ChevronDown" size={16} className="text-text-tertiary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 保存按钮 */}
      <div className="lg:col-span-2 flex justify-end mt-4">
        <button className="px-6 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300">
          保存设置
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;