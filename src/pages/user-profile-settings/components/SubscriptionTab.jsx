import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const SubscriptionTab = () => {
  // Mock subscription data
  const currentPlan = {
    name: "Pro",
    price: 19.99,
    billingCycle: "monthly",
    nextBillingDate: "2023-07-15",
    features: [
      "Unlimited projects",
      "High-quality audio processing",
      "Priority rendering",
      "Advanced AI models",
      "10GB storage",
      "Email support"
    ]
  };
  
  const availablePlans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      popular: false,
      features: [
        "5 projects per month",
        "Standard audio quality",
        "Basic AI models",
        "1GB storage",
        "Community support"
      ],
      limitations: [
        "Limited export options",
        "Standard rendering queue",
        "No API access"
      ]
    },
    {
      id: "pro",
      name: "Pro",
      price: 19.99,
      popular: true,
      current: true,
      features: [
        "Unlimited projects",
        "High-quality audio processing",
        "Priority rendering",
        "Advanced AI models",
        "10GB storage",
        "Email support",
        "No watermarks"
      ],
      limitations: [
        "Limited API access",
        "Standard collaboration tools"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 49.99,
      popular: false,
      features: [
        "Everything in Pro",
        "Ultra high-quality audio",
        "Instant rendering",
        "Cutting-edge AI models",
        "50GB storage",
        "Priority support",
        "Custom branding",
        "Full API access",
        "Advanced analytics"
      ],
      limitations: []
    }
  ];
  
  const usageMetrics = [
    {
      name: "Projects",
      used: 37,
      total: "Unlimited",
      icon: "FolderKanban",
      color: "#9333EA" // primary
    },
    {
      name: "Storage",
      used: 4.2,
      total: 10,
      unit: "GB",
      icon: "HardDrive",
      color: "#0EA5E9", // info
      percentage: 42
    },
    {
      name: "API Calls",
      used: 1250,
      total: 5000,
      icon: "Code",
      color: "#10B981", // success
      percentage: 25
    },
    {
      name: "Exports",
      used: 28,
      total: "Unlimited",
      icon: "Download",
      color: "#F97316" // accent-3
    }
  ];
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <div>
      {/* Current Plan Summary */}
      <div className="bg-surface rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-4">
              <Icon name="CreditCard" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="heading-medium">{currentPlan.name} Plan</h3>
              <p className="text-text-secondary">
                ${currentPlan.price}/month • Renews on {formatDate(currentPlan.nextBillingDate)}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300">
              Manage Payment
            </button>
            <button className="px-4 py-2 rounded-lg bg-error bg-opacity-20 text-error hover:bg-opacity-30 transition-all duration-300">
              Cancel Plan
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
                    {metric.percentage}% used
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Available Plans */}
      <div className="mb-8">
        <h3 className="heading-medium mb-6">Available Plans</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availablePlans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`bg-surface rounded-xl overflow-hidden ${
                plan.current ? "ring-2 ring-primary" : ""
              }`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {plan.popular && (
                <div className="bg-primary py-1 px-4 text-center">
                  <span className="text-sm font-medium">Most Popular</span>
                </div>
              )}
              
              <div className="p-6">
                <h4 className="heading-medium mb-2">{plan.name}</h4>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-text-secondary ml-1">/month</span>
                </div>
                
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-text-secondary mb-2">Features</h5>
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
                    <h5 className="text-sm font-medium text-text-secondary mb-2">Limitations</h5>
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
                  className={`w-full py-2 rounded-lg ${
                    plan.current 
                      ? "bg-surface-alt cursor-default" :"bg-primary hover:bg-primary-dark"
                  } transition-all duration-300`}
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Billing History */}
      <div className="bg-surface rounded-xl p-6">
        <h3 className="heading-medium mb-6">Billing History</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">Date</th>
                <th className="text-left py-3 px-4 font-medium">Description</th>
                <th className="text-left py-3 px-4 font-medium">Amount</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-right py-3 px-4 font-medium">Receipt</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3 px-4">Jun 15, 2023</td>
                <td className="py-3 px-4">Pro Plan - Monthly</td>
                <td className="py-3 px-4">$19.99</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-20 text-success">
                    Paid
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-primary hover:underline">
                    Download
                  </button>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">May 15, 2023</td>
                <td className="py-3 px-4">Pro Plan - Monthly</td>
                <td className="py-3 px-4">$19.99</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-20 text-success">
                    Paid
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-primary hover:underline">
                    Download
                  </button>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4">Apr 15, 2023</td>
                <td className="py-3 px-4">Pro Plan - Monthly</td>
                <td className="py-3 px-4">$19.99</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-20 text-success">
                    Paid
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-primary hover:underline">
                    Download
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">Mar 15, 2023</td>
                <td className="py-3 px-4">Pro Plan - Monthly</td>
                <td className="py-3 px-4">$19.99</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-20 text-success">
                    Paid
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-primary hover:underline">
                    Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-center">
          <button className="px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm">
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTab;