import React, { useState } from "react";

import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import UsageStats from "./UsageStats";
import AchievementBadges from "./AchievementBadges";

const ProfileTab = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const userData = {
    name: "Jason Smith",
    username: "jasonsmith",
    email: "jason.smith@hhu.edu.cn",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop",
    biography: `音乐制作人和音效工程师，热爱电子和氛围音乐类型。我从事音乐创作已超过10年，最近开始探索人工智能辅助作曲，以拓展我的创作视野。

我特别感兴趣于将传统乐器与人工智能生成的元素融合，创造出跨越传统与实验音乐界限的独特音景。`,
    location: "中国，南京",
    website: "https://jasonsmith.music",
    socialLinks: {
      spotify: "jasonsmith",
      soundcloud: "jason_smith_music",
      youtube: "JasonSmithMusic",
      instagram: "jasonsmith.music"
    },
    joinDate: "2022-03-15T14:30:00"
  };

  const [formData, setFormData] = useState({
    name: userData.name,
    username: userData.username,
    email: userData.email,
    biography: userData.biography,
    location: userData.location,
    website: userData.website,
    spotify: userData.socialLinks.spotify,
    soundcloud: userData.socialLinks.soundcloud,
    youtube: userData.socialLinks.youtube,
    instagram: userData.socialLinks.instagram
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to backend
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }); // 改为中文日期格式
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* 左栏 - 个人资料 */} {/* 翻译注释中的英文 */}
      <div className="lg:col-span-2">
        {/* 封面图片 & 头像 */}
        <div className="relative rounded-xl overflow-hidden mb-6">
          <div className="h-48 relative">
            <Image
              src={userData.coverImage}
              alt="封面"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
          </div>

          <div className="absolute bottom-4 left-6 flex items-end">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-background overflow-hidden">
                <Image
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Icon name="Camera" size={16} />
                </button>
              )}
            </div>

            <div className="ml-4 mb-2">
              {!isEditing ? (
                <>
                  <h2 className="heading-large text-white">{userData.name}</h2>
                  <p className="text-text-secondary">@{userData.username}</p>
                </>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-surface border-none rounded-lg py-1 px-3 w-full focus:ring-primary focus:ring-2 focus:outline-none"
                    placeholder="你的姓名" /> {/* 翻译输入框占位符 */}
                  <div className="flex items-center">
                    <span className="text-text-secondary mr-1">@</span>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="bg-surface border-none rounded-lg py-1 px-3 w-full focus:ring-primary focus:ring-2 focus:outline-none"
                      placeholder="用户名" /> {/* 翻译输入框占位符 */}
                  </div>
                </div>
              )}
            </div>
          </div>

          {!isEditing && (
            <button
              className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-surface bg-opacity-70 backdrop-blur-md flex items-center"
              onClick={() => setIsEditing(true)}
            >
              <Icon name="Edit2" size={16} className="mr-2" />
              <span>编辑个人资料</span> {/* 翻译按钮文本 */}
            </button>
          )}
        </div>

        {/* 个人资料表单 */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="bg-surface rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-text-secondary mb-2">邮箱</label> {/* 翻译标签 */}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-surface-alt border-none rounded-lg py-2 px-4 w-full focus:ring-primary focus:ring-2 focus:outline-none"
                  placeholder="你的邮箱" /> {/* 翻译占位符 */}
              </div>

              <div>
                <label className="block text-text-secondary mb-2">所在地</label> {/* 翻译标签 */}
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="bg-surface-alt border-none rounded-lg py-2 px-4 w-full focus:ring-primary focus:ring-2 focus:outline-none"
                  placeholder="你的所在地" /> {/* 翻译占位符 */}
              </div>

              <div>
                <label className="block text-text-secondary mb-2">网站</label> {/* 翻译标签 */}
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="bg-surface-alt border-none rounded-lg py-2 px-4 w-full focus:ring-primary focus:ring-2 focus:outline-none"
                  placeholder="你的网站" /> {/* 翻译占位符 */}
              </div>

              <div className="md:col-span-2">
                <label className="block text-text-secondary mb-2">个人简介</label> {/* 翻译标签 */}
                <textarea
                  name="biography"
                  value={formData.biography}
                  onChange={handleInputChange}
                  rows={6}
                  className="bg-surface-alt border-none rounded-lg py-2 px-4 w-full focus:ring-primary focus:ring-2 focus:outline-none"
                  placeholder="告诉我们关于你的情况" /> {/* 翻译占位符 */}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="heading-small mb-4">社交资料</h3> {/* 翻译标题 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center bg-surface-alt rounded-lg p-3">
                  <div className="w-8 h-8 rounded-full bg-[#1DB954] bg-opacity-20 flex items-center justify-center mr-3">
                    <Icon name="Music" size={16} className="text-[#1DB954]" />
                  </div>
                  <input
                    type="text"
                    name="spotify"
                    value={formData.spotify}
                    onChange={handleInputChange}
                    className="bg-transparent border-none w-full focus:ring-primary focus:ring-2 focus:outline-none"
                    placeholder="Spotify用户名" /> {/* 保留平台名，翻译“用户名” */}
                </div>

                <div className="flex items-center bg-surface-alt rounded-lg p-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF5500] bg-opacity-20 flex items-center justify-center mr-3">
                    <Icon name="Cloud" size={16} className="text-[#FF5500]" />
                  </div>
                  <input
                    type="text"
                    name="soundcloud"
                    value={formData.soundcloud}
                    onChange={handleInputChange}
                    className="bg-transparent border-none w-full focus:ring-primary focus:ring-2 focus:outline-none"
                    placeholder="SoundCloud用户名" /> {/* 保留平台名，翻译“用户名” */}
                </div>

                <div className="flex items-center bg-surface-alt rounded-lg p-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF0000] bg-opacity-20 flex items-center justify-center mr-3">
                    <Icon name="Youtube" size={16} className="text-[#FF0000]" />
                  </div>
                  <input
                    type="text"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleInputChange}
                    className="bg-transparent border-none w-full focus:ring-primary focus:ring-2 focus:outline-none"
                    placeholder="YouTube频道" /> {/* 保留平台名，翻译“频道” */}
                </div>

                <div className="flex items-center bg-surface-alt rounded-lg p-3">
                  <div className="w-8 h-8 rounded-full bg-[#E1306C] bg-opacity-20 flex items-center justify-center mr-3">
                    <Icon name="Instagram" size={16} className="text-[#E1306C]" />
                  </div>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="bg-transparent border-none w-full focus:ring-primary focus:ring-2 focus:outline-none"
                    placeholder="Instagram用户名" /> {/* 保留平台名，翻译“用户名” */}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300"
                onClick={() => setIsEditing(false)}
              >
                取消 {/* 翻译按钮文本 */}
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300"
              >
                保存更改 {/* 翻译按钮文本 */}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-surface rounded-xl p-6">
            <div className="mb-6">
              <h3 className="heading-small mb-4">关于</h3> {/* 翻译标题 */}
              <p className="text-text-secondary whitespace-pre-line">{userData.biography}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="heading-small mb-3">联系信息</h3> {/* 翻译标题 */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Icon name="Mail" size={16} className="text-text-tertiary mr-3" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="MapPin" size={16} className="text-text-tertiary mr-3" />
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Globe" size={16} className="text-text-tertiary mr-3" />
                    <a href={userData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {userData.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Icon name="Calendar" size={16} className="text-text-tertiary mr-3" />
                    <span>加入日期 {formatDate(userData.joinDate)}</span> {/* 翻译“Joined” */}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="heading-small mb-3">社交资料</h3> {/* 翻译标题 */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`https://open.spotify.com/user/${userData.socialLinks.spotify}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-surface-alt rounded-lg p-3 hover:bg-opacity-80 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1DB954] bg-opacity-20 flex items-center justify-center mr-3">
                      <Icon name="Music" size={16} className="text-[#1DB954]" />
                    </div>
                    <span>Spotify</span> {/* 保留平台名 */}
                  </a>

                  <a
                    href={`https://soundcloud.com/${userData.socialLinks.soundcloud}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-surface-alt rounded-lg p-3 hover:bg-opacity-80 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FF5500] bg-opacity-20 flex items-center justify-center mr-3">
                      <Icon name="Cloud" size={16} className="text-[#FF5500]" />
                    </div>
                    <span>SoundCloud</span> {/* 保留平台名 */}
                  </a>

                  <a
                    href={`https://youtube.com/@${userData.socialLinks.youtube}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-surface-alt rounded-lg p-3 hover:bg-opacity-80 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FF0000] bg-opacity-20 flex items-center justify-center mr-3">
                      <Icon name="Youtube" size={16} className="text-[#FF0000]" />
                    </div>
                    <span>YouTube</span> {/* 保留平台名 */}
                  </a>

                  <a
                    href={`https://instagram.com/${userData.socialLinks.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-surface-alt rounded-lg p-3 hover:bg-opacity-80 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#E1306C] bg-opacity-20 flex items-center justify-center mr-3">
                      <Icon name="Instagram" size={16} className="text-[#E1306C]" />
                    </div>
                    <span>Instagram</span> {/* 保留平台名 */}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 使用统计 */} {/* 翻译注释 */}
        <div className="mt-8">
          <UsageStats />
        </div>
      </div>

      {/* 右栏 - 成就 */} {/* 翻译注释 */}
      <div>
        <AchievementBadges />
      </div>
    </div>
  );
};

export default ProfileTab;