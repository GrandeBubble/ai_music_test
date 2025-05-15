import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const SecurityTab = () => {
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showExportData, setShowExportData] = useState(false);
  
  // Mock security data
  const securityData = {
    lastLogin: "2023-06-28T14:30:00",
    lastLoginIp: "192.168.1.1",
    lastLoginDevice: "Chrome on macOS",
    twoFactorEnabled: false,
    passwordLastChanged: "2023-03-15T10:20:00",
    activeDevices: [
      {
        id: 1,
        name: "Chrome on macOS",
        lastActive: "2023-06-28T14:30:00",
        location: "Los Angeles, CA",
        current: true
      },
      {
        id: 2,
        name: "Safari on iPhone",
        lastActive: "2023-06-27T09:15:00",
        location: "Los Angeles, CA",
        current: false
      },
      {
        id: 3,
        name: "Firefox on Windows",
        lastActive: "2023-06-25T18:45:00",
        location: "San Francisco, CA",
        current: false
      }
    ],
    loginHistory: [
      {
        id: 1,
        date: "2023-06-28T14:30:00",
        device: "Chrome on macOS",
        location: "Los Angeles, CA",
        ip: "192.168.1.1",
        status: "success"
      },
      {
        id: 2,
        date: "2023-06-27T09:15:00",
        device: "Safari on iPhone",
        location: "Los Angeles, CA",
        ip: "192.168.1.2",
        status: "success"
      },
      {
        id: 3,
        date: "2023-06-26T22:10:00",
        device: "Unknown Device",
        location: "New York, NY",
        ip: "203.0.113.1",
        status: "failed"
      },
      {
        id: 4,
        date: "2023-06-25T18:45:00",
        device: "Firefox on Windows",
        location: "San Francisco, CA",
        ip: "198.51.100.1",
        status: "success"
      }
    ]
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const timeSince = (dateString) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    
    return Math.floor(seconds) + " seconds ago";
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Security Overview */}
      <div className="lg:col-span-2">
        <div className="bg-surface rounded-xl p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-4">
              <Icon name="Shield" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="heading-medium">Security Overview</h3>
              <p className="text-text-secondary">
                Manage your account security and access settings
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-surface-alt rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  securityData.twoFactorEnabled 
                    ? "bg-success bg-opacity-20 text-success" :"bg-warning bg-opacity-20 text-warning"
                }`}>
                  {securityData.twoFactorEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Add an extra layer of security to your account by requiring a verification code in addition to your password.
              </p>
              <button 
                className="w-full py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-sm"
                onClick={() => setShowTwoFactorSetup(true)}
              >
                {securityData.twoFactorEnabled ? "Manage 2FA" : "Enable 2FA"}
              </button>
            </div>
            
            <div className="bg-surface-alt rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Password</h4>
                <span className="text-xs text-text-tertiary">
                  Last changed {timeSince(securityData.passwordLastChanged)}
                </span>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                It's a good practice to change your password regularly and use a unique password for each service.
              </p>
              <button 
                className="w-full py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-sm"
                onClick={() => setShowChangePassword(true)}
              >
                Change Password
              </button>
            </div>
          </div>
          
          <div className="mb-8">
            <h4 className="heading-small mb-4">Active Devices</h4>
            <div className="space-y-3">
              {securityData.activeDevices.map((device) => (
                <div 
                  key={device.id}
                  className="flex items-center justify-between bg-surface-alt rounded-lg p-4"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mr-3">
                      <Icon 
                        name={
                          device.name.includes("Chrome") 
                            ? "Chrome" : device.name.includes("Safari") 
                              ? "Globe" : device.name.includes("Firefox") 
                                ? "Globe" :"Monitor"
                        } 
                        size={20} 
                        className="text-text-secondary"
                      />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h5 className="font-medium">{device.name}</h5>
                        {device.current && (
                          <span className="ml-2 text-xs bg-success bg-opacity-20 text-success px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">
                        {device.location} • Last active {timeSince(device.lastActive)}
                      </p>
                    </div>
                  </div>
                  
                  {!device.current && (
                    <button className="text-error hover:underline text-sm">
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="heading-small mb-4">Login History</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Device</th>
                    <th className="text-left py-3 px-4 font-medium">Location</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {securityData.loginHistory.map((login) => (
                    <tr key={login.id} className="border-b border-border">
                      <td className="py-3 px-4">{formatDate(login.date)}</td>
                      <td className="py-3 px-4">{login.device}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Icon name="MapPin" size={14} className="text-text-tertiary mr-1" />
                          <span>{login.location}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          login.status === "success" ?"bg-success bg-opacity-20 text-success" :"bg-error bg-opacity-20 text-error"
                        }`}>
                          {login.status === "success" ? "Success" : "Failed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Account Management */}
      <div>
        <div className="bg-surface rounded-xl p-6 mb-8">
          <h3 className="heading-medium mb-6">Account Management</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">API Access</h4>
              <p className="text-sm text-text-secondary mb-3">
                Generate API keys to integrate with external tools and services
              </p>
              <button className="w-full py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm">
                Manage API Keys
              </button>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Export Your Data</h4>
              <p className="text-sm text-text-secondary mb-3">
                Download a copy of your personal data and projects
              </p>
              <button 
                className="w-full py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm"
                onClick={() => setShowExportData(true)}
              >
                Request Data Export
              </button>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Delete Account</h4>
              <p className="text-sm text-text-secondary mb-3">
                Permanently delete your account and all associated data
              </p>
              <button className="w-full py-2 rounded-lg bg-error bg-opacity-20 text-error hover:bg-opacity-30 transition-all duration-300 text-sm">
                Delete Account
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-surface rounded-xl p-6">
          <h3 className="heading-medium mb-6">Privacy & Terms</h3>
          
          <div className="space-y-4">
            <a 
              href="#" 
              className="flex items-center py-2 text-text-secondary hover:text-text-primary transition-colors duration-300"
            >
              <Icon name="FileText" size={16} className="mr-2" />
              <span>Privacy Policy</span>
            </a>
            
            <a 
              href="#" 
              className="flex items-center py-2 text-text-secondary hover:text-text-primary transition-colors duration-300"
            >
              <Icon name="FileText" size={16} className="mr-2" />
              <span>Terms of Service</span>
            </a>
            
            <a 
              href="#" 
              className="flex items-center py-2 text-text-secondary hover:text-text-primary transition-colors duration-300"
            >
              <Icon name="FileText" size={16} className="mr-2" />
              <span>Cookie Policy</span>
            </a>
            
            <a 
              href="#" 
              className="flex items-center py-2 text-text-secondary hover:text-text-primary transition-colors duration-300"
            >
              <Icon name="HelpCircle" size={16} className="mr-2" />
              <span>Help Center</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Two-Factor Authentication Setup Modal */}
      {showTwoFactorSetup && (
        <div className="fixed inset-0 bg-background bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-surface rounded-xl w-full max-w-md overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="heading-medium">Two-Factor Authentication</h3>
                <button 
                  className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center"
                  onClick={() => setShowTwoFactorSetup(false)}
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-center mb-4">
                  <div className="w-40 h-40 bg-white p-2 rounded-lg">
                    {/* This would be a QR code in a real app */}
                    <div className="w-full h-full bg-surface-alt flex items-center justify-center">
                      <span className="text-sm">QR Code Placeholder</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-text-secondary mb-4">
                  Scan this QR code with your authenticator app (like Google Authenticator, Authy, or Microsoft Authenticator).
                </p>
                
                <div className="bg-surface-alt rounded-lg p-3 mb-4">
                  <p className="text-xs text-text-secondary mb-1">Manual entry code:</p>
                  <p className="font-mono text-sm">ABCD EFGH IJKL MNOP</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-text-secondary mb-2 text-sm">
                    Enter the 6-digit code from your authenticator app
                  </label>
                  <input
                    type="text"
                    className="bg-surface-alt border-none rounded-lg py-2 px-4 w-full focus:ring-primary focus:ring-2 focus:outline-none"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm"
                    onClick={() => setShowTwoFactorSetup(false)}
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-sm">
                    Verify & Enable
                  </button>
                </div>
              </div>
              
              <div className="border-t border-border pt-4">
                <h4 className="font-medium mb-3">Recovery Codes</h4>
                <p className="text-sm text-text-secondary mb-3">
                  Save these recovery codes in a secure place. You can use them to access your account if you lose your authenticator device.
                </p>
                <div className="bg-surface-alt rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-mono text-sm">ABCD-EFGH-IJKL</div>
                    <div className="font-mono text-sm">MNOP-QRST-UVWX</div>
                    <div className="font-mono text-sm">YZAB-CDEF-GHIJ</div>
                    <div className="font-mono text-sm">KLMN-OPQR-STUV</div>
                    <div className="font-mono text-sm">WXYZ-ABCD-EFGH</div>
                    <div className="font-mono text-sm">IJKL-MNOP-QRST</div>
                  </div>
                </div>
                <button className="w-full py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm">
                  Download Recovery Codes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-background bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-surface rounded-xl w-full max-w-md overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="heading-medium">Change Password</h3>
                <button 
                  className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center"
                  onClick={() => setShowChangePassword(false)}
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-text-secondary mb-2 text-sm">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className="bg-surface-alt border-none rounded-lg py-2 px-4 w-full focus:ring-primary focus:ring-2 focus:outline-none"
                      placeholder="Enter current password"
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <Icon name="Eye" size={16} className="text-text-tertiary" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-text-secondary mb-2 text-sm">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className="bg-surface-alt border-none rounded-lg py-2 px-4 w-full focus:ring-primary focus:ring-2 focus:outline-none"
                      placeholder="Enter new password"
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <Icon name="Eye" size={16} className="text-text-tertiary" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-text-secondary mb-2 text-sm">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className="bg-surface-alt border-none rounded-lg py-2 px-4 w-full focus:ring-primary focus:ring-2 focus:outline-none"
                      placeholder="Confirm new password"
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <Icon name="Eye" size={16} className="text-text-tertiary" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-info bg-opacity-10 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-info mb-2">Password Requirements</h4>
                  <ul className="text-xs space-y-1 text-text-secondary">
                    <li className="flex items-center">
                      <Icon name="Check" size={12} className="text-success mr-1" />
                      At least 8 characters
                    </li>
                    <li className="flex items-center">
                      <Icon name="Check" size={12} className="text-success mr-1" />
                      At least one uppercase letter
                    </li>
                    <li className="flex items-center">
                      <Icon name="Check" size={12} className="text-success mr-1" />
                      At least one number
                    </li>
                    <li className="flex items-center">
                      <Icon name="Check" size={12} className="text-success mr-1" />
                      At least one special character
                    </li>
                  </ul>
                </div>
                
                <div className="flex justify-end space-x-3 pt-2">
                  <button 
                    type="button"
                    className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm"
                    onClick={() => setShowChangePassword(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-sm"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Export Data Modal */}
      {showExportData && (
        <div className="fixed inset-0 bg-background bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-surface rounded-xl w-full max-w-md overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="heading-medium">Export Your Data</h3>
                <button 
                  className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center"
                  onClick={() => setShowExportData(false)}
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              
              <p className="text-sm text-text-secondary mb-6">
                Select the data you want to export. We'll prepare a download package and notify you when it's ready.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center bg-surface-alt rounded-lg p-3">
                  <input 
                    type="checkbox" 
                    id="profile-data" 
                    className="rounded bg-background border-border text-primary focus:ring-primary focus:ring-2 focus:ring-offset-0"
                  />
                  <label htmlFor="profile-data" className="ml-3 flex-1">
                    <span className="font-medium">Profile Information</span>
                    <p className="text-xs text-text-secondary">Your personal details and preferences</p>
                  </label>
                </div>
                
                <div className="flex items-center bg-surface-alt rounded-lg p-3">
                  <input 
                    type="checkbox" 
                    id="projects-data" 
                    className="rounded bg-background border-border text-primary focus:ring-primary focus:ring-2 focus:ring-offset-0"
                  />
                  <label htmlFor="projects-data" className="ml-3 flex-1">
                    <span className="font-medium">Projects</span>
                    <p className="text-xs text-text-secondary">All your AI music projects and compositions</p>
                  </label>
                </div>
                
                <div className="flex items-center bg-surface-alt rounded-lg p-3">
                  <input 
                    type="checkbox" 
                    id="audio-data" 
                    className="rounded bg-background border-border text-primary focus:ring-primary focus:ring-2 focus:ring-offset-0"
                  />
                  <label htmlFor="audio-data" className="ml-3 flex-1">
                    <span className="font-medium">Audio Files</span>
                    <p className="text-xs text-text-secondary">Original and processed audio files</p>
                  </label>
                </div>
                
                <div className="flex items-center bg-surface-alt rounded-lg p-3">
                  <input 
                    type="checkbox" 
                    id="activity-data" 
                    className="rounded bg-background border-border text-primary focus:ring-primary focus:ring-2 focus:ring-offset-0"
                  />
                  <label htmlFor="activity-data" className="ml-3 flex-1">
                    <span className="font-medium">Activity History</span>
                    <p className="text-xs text-text-secondary">Your usage history and interactions</p>
                  </label>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-text-secondary mb-2 text-sm">
                  Export Format
                </label>
                <div className="relative">
                  <select className="bg-surface-alt border-none rounded-lg py-2 pl-3 pr-10 w-full appearance-none focus:ring-primary focus:ring-2 focus:outline-none">
                    <option>ZIP Archive (.zip)</option>
                    <option>JSON Format (.json)</option>
                    <option>CSV Format (.csv)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Icon name="ChevronDown" size={16} className="text-text-tertiary" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm"
                  onClick={() => setShowExportData(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 text-sm"
                  onClick={() => setShowExportData(false)}
                >
                  Request Export
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SecurityTab;