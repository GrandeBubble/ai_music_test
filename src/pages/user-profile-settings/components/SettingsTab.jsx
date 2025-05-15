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
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
        isOn ? "bg-primary" : "bg-surface-alt"
      }`}
      onClick={onToggle}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          isOn ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Notifications Settings */}
      <div className="bg-surface rounded-xl p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-4">
            <Icon name="Bell" size={20} className="text-primary" />
          </div>
          <h3 className="heading-medium">Notifications</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-text-secondary">Receive notifications via email</p>
            </div>
            <ToggleSwitch 
              isOn={settings.notifications.emailNotifications} 
              onToggle={() => handleToggleChange("notifications", "emailNotifications")}
            />
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">Project Updates</h4>
              <p className="text-sm text-text-secondary">Get notified about your project processing</p>
            </div>
            <ToggleSwitch 
              isOn={settings.notifications.projectUpdates} 
              onToggle={() => handleToggleChange("notifications", "projectUpdates")}
            />
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">Community Activity</h4>
              <p className="text-sm text-text-secondary">Notifications about likes, comments, and shares</p>
            </div>
            <ToggleSwitch 
              isOn={settings.notifications.communityActivity} 
              onToggle={() => handleToggleChange("notifications", "communityActivity")}
            />
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">Marketing Emails</h4>
              <p className="text-sm text-text-secondary">Receive promotional content and offers</p>
            </div>
            <ToggleSwitch 
              isOn={settings.notifications.marketingEmails} 
              onToggle={() => handleToggleChange("notifications", "marketingEmails")}
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">New Features</h4>
              <p className="text-sm text-text-secondary">Get updates about new platform features</p>
            </div>
            <ToggleSwitch 
              isOn={settings.notifications.newFeatures} 
              onToggle={() => handleToggleChange("notifications", "newFeatures")}
            />
          </div>
        </div>
      </div>
      
      {/* Privacy Settings */}
      <div className="bg-surface rounded-xl p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-info bg-opacity-20 flex items-center justify-center mr-4">
            <Icon name="Lock" size={20} className="text-info" />
          </div>
          <h3 className="heading-medium">Privacy</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">Public Profile</h4>
              <p className="text-sm text-text-secondary">Allow others to view your profile</p>
            </div>
            <ToggleSwitch 
              isOn={settings.privacy.publicProfile} 
              onToggle={() => handleToggleChange("privacy", "publicProfile")}
            />
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">Activity Visibility</h4>
              <p className="text-sm text-text-secondary">Show your activity in the community feed</p>
            </div>
            <ToggleSwitch 
              isOn={settings.privacy.showActivity} 
              onToggle={() => handleToggleChange("privacy", "showActivity")}
            />
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">Data Collection</h4>
              <p className="text-sm text-text-secondary">Allow anonymous usage data to improve AI</p>
            </div>
            <ToggleSwitch 
              isOn={settings.privacy.allowDataCollection} 
              onToggle={() => handleToggleChange("privacy", "allowDataCollection")}
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">Show Real Name</h4>
              <p className="text-sm text-text-secondary">Display your real name instead of username</p>
            </div>
            <ToggleSwitch 
              isOn={settings.privacy.showRealName} 
              onToggle={() => handleToggleChange("privacy", "showRealName")}
            />
          </div>
        </div>
      </div>
      
      {/* Collaboration Settings */}
      <div className="bg-surface rounded-xl p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-accent-2 bg-opacity-20 flex items-center justify-center mr-4">
            <Icon name="Users" size={20} className="text-accent-2" />
          </div>
          <h3 className="heading-medium">Collaboration</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">Collaboration Requests</h4>
              <p className="text-sm text-text-secondary">Allow others to send collaboration requests</p>
            </div>
            <ToggleSwitch 
              isOn={settings.collaboration.allowCollabRequests} 
              onToggle={() => handleToggleChange("collaboration", "allowCollabRequests")}
            />
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">Auto-accept from Followed</h4>
              <p className="text-sm text-text-secondary">Automatically accept requests from people you follow</p>
            </div>
            <ToggleSwitch 
              isOn={settings.collaboration.autoAcceptFromFollowed} 
              onToggle={() => handleToggleChange("collaboration", "autoAcceptFromFollowed")}
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">Mention Notifications</h4>
              <p className="text-sm text-text-secondary">Get notified when someone mentions you</p>
            </div>
            <ToggleSwitch 
              isOn={settings.collaboration.notifyOnMentions} 
              onToggle={() => handleToggleChange("collaboration", "notifyOnMentions")}
            />
          </div>
        </div>
      </div>
      
      {/* Audio Settings */}
      <div className="bg-surface rounded-xl p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-accent-1 bg-opacity-20 flex items-center justify-center mr-4">
            <Icon name="Headphones" size={20} className="text-accent-1" />
          </div>
          <h3 className="heading-medium">Audio Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div className="py-2 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium">Default Quality</h4>
                <p className="text-sm text-text-secondary">Set the default quality for audio processing</p>
              </div>
              <div className="relative">
                <select
                  value={settings.audio.defaultQuality}
                  onChange={(e) => handleSelectChange("audio", "defaultQuality", e.target.value)}
                  className="bg-surface-alt border-none rounded-lg py-2 pl-3 pr-10 appearance-none focus:ring-primary focus:ring-2 focus:outline-none"
                >
                  <option value="low">Low (faster)</option>
                  <option value="medium">Medium</option>
                  <option value="high">High (better quality)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Icon name="ChevronDown" size={16} className="text-text-tertiary" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">Auto-normalize Audio</h4>
              <p className="text-sm text-text-secondary">Automatically adjust volume levels</p>
            </div>
            <ToggleSwitch 
              isOn={settings.audio.autoNormalize} 
              onToggle={() => handleToggleChange("audio", "autoNormalize")}
            />
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">Real-time Processing</h4>
              <p className="text-sm text-text-secondary">Enable real-time audio processing (uses more resources)</p>
            </div>
            <ToggleSwitch 
              isOn={settings.audio.enableRealTimeProcessing} 
              onToggle={() => handleToggleChange("audio", "enableRealTimeProcessing")}
            />
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <h4 className="font-medium">Save Original Files</h4>
              <p className="text-sm text-text-secondary">Keep original files after processing</p>
            </div>
            <ToggleSwitch 
              isOn={settings.audio.saveOriginalFiles} 
              onToggle={() => handleToggleChange("audio", "saveOriginalFiles")}
            />
          </div>
          
          <div className="py-2">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium">Default Export Format</h4>
                <p className="text-sm text-text-secondary">Choose the default format for exporting audio</p>
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
      
      {/* Save Button */}
      <div className="lg:col-span-2 flex justify-end mt-4">
        <button className="px-6 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;