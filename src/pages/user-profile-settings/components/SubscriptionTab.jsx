import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const SubscriptionTab = () => {
  // Mock subscription data
  const currentPlan = {
    name: "专业版", // 翻译套餐名称
    price: 19.99,
    billingCycle: "monthly",
    nextBillingDate: "2023-07-15",
    features: [
      "无限制项目",
      "高质量音频处理",
      "优先渲染",
      "高级AI模型",
      "10GB存储空间",
      "邮件支持"
    ]
  };

  const availablePlans = [
    {
      id: "free",
      name: "免费版",
      price: 0,
      popular: false,
      features: [
        "每月5个项目",
        "标准音频质量",
        "基础AI模型",
        "1GB存储空间",
        "社区支持"
      ],
      limitations: [
        "导出选项有限",
        "标准渲染队列",
        "无API访问权限"
      ]
    },
    {
      id: "pro",
      name: "专业版",
      price: 19.99,
      popular: true,
      current: true,
      features: [
        "无限制项目",
        "高质量音频处理",
        "优先渲染",
        "高级AI模型",
        "10GB存储空间",
        "邮件支持",
        "无水印"
      ],
      limitations: [
        "API访问权限有限",
        "标准协作工具"
      ]
    },
    {
      id: "enterprise",
      name: "企业版", // 翻译套餐名称
      price: 49.99,
      popular: false,
      features: [
        "专业版所有功能",
        "超高质量音频",
        "即时渲染",
        "尖端AI模型",
        "50GB存储空间",
        "优先支持",
        "自定义品牌",
        "完整API访问",
        "高级分析"
      ],
      limitations: []
    }
  ];

  const usageMetrics = [
    {
      name: "项目数", // 翻译指标名称
      used: 37,
      total: "无限制",
      icon: "FolderKanban",
      color: "#9333EA" // primary
    },
    {
      name: "存储空间",
      used: 4.2,
      total: 10,
      unit: "GB",
      icon: "HardDrive",
      color: "#0EA5E9", // info
      percentage: 42
    },
    {
      name: "API调用次数", // 翻译指标名称
      used: 1250,
      total: 5000,
      icon: "Code",
      color: "#10B981", // success
      percentage: 25
    },
    {
      name: "导出次数", // 翻译指标名称
      used: 28,
      total: "无限制",
      icon: "Download",
      color: "#F97316" // accent-3
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { // 修改为中文日期格式
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      {/* 当前套餐概览 */}
      <div className="bg-surface rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-4">
              <Icon name="CreditCard" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="heading-medium">{currentPlan.name} 套餐</h3>
              <p className="text-text-secondary">
                ${currentPlan.price}/月 • 续费日期 {formatDate(currentPlan.nextBillingDate)}
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300">
              管理付款
            </button>
            <button className="px-4 py-2 rounded-lg bg-error bg-opacity-20 text-error hover:bg-opacity-30 transition-all duration-300">
              取消套餐
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {usageMetrics.map((metric) => (
            <div key={metric.name} className="bg-surface-alt rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  <Icon
                    name={metric.icon}
                    size={20}
                    style={{ color: metric.color }}
                  />
                </div>
                <div>
                  <h4 className="font-medium">{metric.name}</h4>
                  <p className="text-sm text-text-secondary">
                    {metric.used} / {metric.total} {metric.unit || ""}
                  </p>
                </div>
              </div>

              {metric.percentage && (
                <div>
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${metric.percentage}%`,
                        backgroundColor: metric.color
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-text-tertiary mt-1">
                    已使用 {metric.percentage}%
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 可用套餐 */}
      <div className="mb-8">
        <h3 className="heading-medium mb-6">可用套餐</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availablePlans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`bg-surface rounded-xl overflow-hidden ${plan.current ? "ring-2 ring-primary" : ""
                }`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {plan.popular && (
                <div className="bg-primary py-1 px-4 text-center">
                  <span className="text-sm font-medium">最受欢迎</span>
                </div>
              )}

              <div className="p-6">
                <h4 className="heading-medium mb-2">{plan.name}</h4>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-text-secondary ml-1">/月</span>
                </div>

                <div className="mb-6">
                  <h5 className="text-sm font-medium text-text-secondary mb-2">功能</h5>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Icon name="Check" size={16} className="text-success mr-2 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div className="mb-6">
                    <h5 className="text-sm font-medium text-text-secondary mb-2">限制</h5>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start">
                          <Icon name="X" size={16} className="text-error mr-2 mt-0.5" />
                          <span className="text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className={`w-full py-2 rounded-lg ${plan.current
                      ? "bg-surface-alt cursor-default" : "bg-primary hover:bg-primary-dark"
                    } transition-all duration-300`}
                  disabled={plan.current}
                >
                  {plan.current ? "当前套餐" : `升级至 ${plan.name}`}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 账单历史 */}
      <div className="bg-surface rounded-xl p-6">
        <h3 className="heading-medium mb-6">账单历史</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">日期</th>
                <th className="text-left py-3 px-4 font-medium">描述</th>
                <th className="text-left py-3 px-4 font-medium">金额</th>
                <th className="text-left py-3 px-4 font-medium">状态</th>
                <th className="text-right py-3 px-4 font-medium">收据</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3 px-4">2023年6月15日</td>
                <td className="py-3 px-4">专业版套餐 - 月度</td>
                <td className="py-3 px-4">$19.99</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-20 text-success">
                    已支付
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-primary hover:underline">
                    下载
                  </button>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">2023年5月15日</td>
                <td className="py-3 px-4">专业版套餐 - 月度</td>
                <td className="py-3 px-4">$19.99</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-20 text-success">
                    已支付
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-primary hover:underline">
                    下载
                  </button>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">2023年4月15日</td>
                <td className="py-3 px-4">专业版套餐 - 月度</td>
                <td className="py-3 px-4">$19.99</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-20 text-success">
                    已支付
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-primary hover:underline">
                    下载
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">2023年3月15日</td>
                <td className="py-3 px-4">专业版套餐 - 月度</td>
                <td className="py-3 px-4">$19.99</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-20 text-success">
                    已支付
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-primary hover:underline">
                    下载
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-center">
          <button className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm">
            查看所有交易记录
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTab;