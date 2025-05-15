import React from "react";
import Icon from "../../../components/AppIcon";

const StorageUsage = ({ projects }) => {
  // 计算模拟存储使用情况
  const totalStorage = 10; // GB
  const usedStorage = projects.length * 0.5; // 每个项目500MB
  const usedPercentage = (usedStorage / totalStorage) * 100;

  return (
    <div className="bg-surface rounded-xl p-4 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-4">
          <Icon name="HardDrive" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="heading-small">存储空间使用情况</h3>
          <p className="text-sm text-text-secondary">
            已使用 {usedStorage.toFixed(1)}GB / 总共 {totalStorage}GB
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3">
        <div className="flex justify-between text-xs mb-1">
          <span>已使用 {usedPercentage.toFixed(0)}%</span>
          <span>剩余 {(totalStorage - usedStorage).toFixed(1)}GB</span>
        </div>
        <div className="w-full h-2 bg-surface-alt rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${usedPercentage > 90 ? "bg-error" : usedPercentage > 70 ? "bg-warning" : "bg-primary"
              }`}
            style={{ width: `${usedPercentage}%` }}
          ></div>
        </div>

        {usedPercentage > 80 && (
          <div className="mt-2 text-xs text-warning flex items-center">
            <Icon name="AlertTriangle" size={14} className="mr-1" />
            <span>存储空间即将占满，请考虑升级套餐。</span>
          </div>
        )}
      </div>

      <button className="mt-4 md:mt-0 md:ml-4 px-4 py-2 rounded-lg bg-surface-alt hover:bg-opacity-80 transition-all duration-300 text-sm">
        升级存储
      </button>
    </div>
  );
};

export default StorageUsage;