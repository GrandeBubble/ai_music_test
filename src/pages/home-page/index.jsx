import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "../../components/AppIcon";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import FeatureCard from "./components/FeatureCard";
import HowItWorks from "./components/HowItWorks";
import AudioSample from "./components/AudioSample";
import Testimonial from "./components/Testimonial";
import StatisticCard from "./components/StatisticCard";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {/* Hero Section */}
          <section className="relative h-[500px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-background opacity-80">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                  opacity: 0.4
                }}
              ></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="display-large max-w-3xl mb-6">
                  用AI的力量，重新定义音乐
                </h1>
                <p className="body-large text-text-secondary max-w-2xl mb-8">
                  通过我们的AI工具，创造、增强和重新构想您的音乐。
                  从人声调音到完整的作曲，解锁新的创作可能性。
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/project-gallery"
                    className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 flex items-center"
                  >
                    <Icon name="Music" size={20} className="mr-2" />
                    <span>现在开始</span>
                  </Link>
                  {/* <Link
                    to="/learning-hub"
                    className="px-6 py-3 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 flex items-center"
                  >
                    <Icon name="Play" size={20} className="mr-2" />
                    <span>查看demo</span>
                  </Link> */}
                </div>
              </motion.div>
            </div>

            {/* Waveform Animation */}
            <div className="absolute bottom-0 left-0 right-0 h-24 opacity-60">
              <svg viewBox="0 0 1440 120" className="w-full h-full">
                <path
                  fill="rgba(147, 51, 234, 0.5)"
                  d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,69.3C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
          </section>

          {/* 功能部分 */}
          <section className="py-16 px-6 bg-surface">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="display-medium mb-4">主要功能</h2>
                <p className="body-large text-text-secondary max-w-2xl mx-auto">
                  探索我们的一系列AI驱动工具，助力您的音乐创作过程。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                  title="AI修音"
                  description="通过AI的高级音高校正，完善您的人声表现。"
                  icon="Mic2"
                  color="accent-1"
                  linkTo="/ai-vocal-tuning-studio"
                />

                <FeatureCard
                  title="AI作曲"
                  description="使用我们的AI作曲引擎生成任何风格或类型的原创音乐。控制节奏、调性和复杂度。"
                  icon="Music"
                  color="accent-2"
                  linkTo="/ai-music-composition-workshop"
                />

                <FeatureCard
                  title="曲风融合"
                  description="融合不同的音乐风格，创造独特的跨风格曲目。尝试意想不到的组合。"
                  icon="Combine"
                  color="accent-3"
                  linkTo="/genre-fusion-laboratory"
                />
              </div>
            </div>
          </section>
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="display-medium mb-4">使用流程</h2>
                <p className="body-large text-text-secondary max-w-2xl mx-auto">
                  创作音乐的过程从未如此简单
                </p>
              </div>

              <HowItWorks />
            </div>
          </section>

          {/* Audio Samples Section */}
          <section className="py-16 px-6 bg-surface">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="display-medium mb-4">听见效果</h2>
                <p className="body-large text-text-secondary max-w-2xl mx-auto">
                  来听听我们AI处理前后的样本
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AudioSample
                  title="人声增强"
                  description="经过AI修音和改进的人声片段"
                  thumbnail="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  waveform="https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  duration="0:45"
                  type="AI修音"
                />

                <AudioSample
                  title="曲风转变"
                  description="从流行音乐转变为电子舞曲"
                  thumbnail="https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  waveform="https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  duration="1:12"
                  type="曲风融合"
                />
              </div>

              <div className="text-center mt-10">
                <Link
                  to="/community-showcase"
                  className="px-6 py-3 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 inline-flex items-center"
                >
                  <span>探索更多案例</span>
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="display-medium mb-4">来看看我们的用户怎么说</h2>
                <p className="body-large text-text-secondary max-w-2xl mx-auto">
                  加入我们的社区，看看其他音乐创作者如何利用AI来提升他们的创作过程。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Testimonial
                  quote="AI让音乐创作变得如此简单。我可以专注于我的创意，而不是技术细节。"
                  author="韩同学"
                  role="学生"
                  avatar="https://randomuser.me/api/portraits/men/32.jpg"
                />

                <Testimonial
                  quote="这款人声音高校正工具简直不可思议。它在修正技术性问题的同时，完美保留了我嗓音中的情感特质和个人特色。"
                  author="王女士"
                  role="业余歌手"
                  avatar="https://randomuser.me/api/portraits/women/44.jpg"
                />

                <Testimonial
                  quote="曲风融合开启了我从未想象过的创作可能，现在我能打造独具特色的声音，让我的音乐与众不同。"
                  author="宋先生"
                  role="歌曲制作人"
                  avatar="https://randomuser.me/api/portraits/men/22.jpg"
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent-1 opacity-10"></div>

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="bg-surface rounded-2xl p-10 border border-border">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0 md:mr-10">
                    <h2 className="display-small mb-4">准备好改造你的音乐了吗？</h2>
                    <p className="body-large text-text-secondary max-w-xl">
                      加入我们的社区，一起用AI推动音乐创作的边界。无论你是专业制作人还是业余爱好者，我们的工具都能帮助你实现创意。
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/project-gallery"
                      className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark transition-all duration-300 flex items-center justify-center"
                    >
                      <Icon name="Music" size={20} className="mr-2" />
                      <span>开始创作</span>
                    </Link>

                    {/* <Link
                      to="/learning-hub"
                      className="px-6 py-3 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center"
                    >
                      <Icon name="BookOpen" size={20} className="mr-2" />
                      <span>学习更多</span>
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 px-6 bg-surface border-t border-border">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
                      <Icon name="Music" size={20} className="text-text-primary" />
                    </div>
                    <span className="text-xl font-display font-bold">AI Music</span>
                  </div>

                  <p className="text-text-secondary mb-4">
                    用AI的力量，重新定义音乐
                  </p>

                  <div className="flex space-x-4">
                    <a href="#" className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center hover:bg-opacity-80 transition-all duration-300">
                      <Icon name="Twitter" size={16} />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center hover:bg-opacity-80 transition-all duration-300">
                      <Icon name="Instagram" size={16} />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center hover:bg-opacity-80 transition-all duration-300">
                      <Icon name="Youtube" size={16} />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center hover:bg-opacity-80 transition-all duration-300">
                      <Icon name="Facebook" size={16} />
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="heading-small mb-4">功能</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/ai-vocal-tuning-studio" className="text-text-secondary hover:text-primary transition-all duration-300">
                        AI修音
                      </Link>
                    </li>
                    <li>
                      <Link to="/ai-music-composition-workshop" className="text-text-secondary hover:text-primary transition-all duration-300">
                        AI作曲
                      </Link>
                    </li>
                    <li>
                      <Link to="/genre-fusion-laboratory" className="text-text-secondary hover:text-primary transition-all duration-300">
                        曲风融合
                      </Link>
                    </li>
                    <li>
                      <Link to="/project-gallery" className="text-text-secondary hover:text-primary transition-all duration-300">
                        我的项目
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="heading-small mb-4">资源</h3>
                  <ul className="space-y-2">
                    {/*
                    <li>
                      <Link to="/learning-hub" className="text-text-secondary hover:text-primary transition-all duration-300">
                        Learning Hub
                      </Link>
                    </li>
                    */}
                    <li>
                      <Link to="/community-showcase" className="text-text-secondary hover:text-primary transition-all duration-300">
                        社区
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300">
                        API文档
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300">
                        支持中心
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="heading-small mb-4">团队</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300">
                        关于我们
                      </a>
                    </li>
                    {/* <li>
                      <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300">
                        Careers
                      </a>
                    </li> */}
                    <li>
                      <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300">
                        隐私政策
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300">
                        服务条款
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
                <p className="text-text-tertiary mb-4 md:mb-0">
                  © {new Date().getFullYear()} AI Music. All rights reserved.
                </p>

                <div className="flex space-x-6">
                  <a href="#" className="text-text-tertiary hover:text-primary transition-all duration-300">
                    隐私政策
                  </a>
                  <a href="#" className="text-text-tertiary hover:text-primary transition-all duration-300">
                    协议条款
                  </a>
                  <a href="#" className="text-text-tertiary hover:text-primary transition-all duration-300">
                    Cookies
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default HomePage;