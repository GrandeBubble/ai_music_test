import React from "react";
import Icon from "../../../components/AppIcon";

const FilterPanel = ({ filterType, setFilterType, sortBy, setSortBy }) => {
  return (
    <div className="bg-surface rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Type Filter */}
        <div>
          <h3 className="heading-small mb-4">项目类型</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${filterType === "all" ? "bg-primary bg-opacity-20 text-primary" : "bg-surface-alt hover:bg-opacity-80"
                }`}
              onClick={() => setFilterType("all")}
            >
              <Icon name="LayoutGrid" size={18} className="mr-2" />
              <span>全部项目</span>
            </button>

            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${filterType === "AI修音" ? "bg-accent-1 bg-opacity-20 text-accent-1" : "bg-surface-alt hover:bg-opacity-80"
                }`}
              onClick={() => setFilterType("AI修音")}
            >
              <Icon name="Mic2" size={18} className="mr-2" />
              <span>AI修音</span>
            </button>

            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${filterType === "AI作曲" ? "bg-accent-2 bg-opacity-20 text-accent-2" : "bg-surface-alt hover:bg-opacity-80"
                }`}
              onClick={() => setFilterType("AI作曲")}
            >
              <Icon name="Music" size={18} className="mr-2" />
              <span>AI作曲</span>
            </button>

            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${filterType === "曲风融合" ? "bg-accent-3 bg-opacity-20 text-accent-3" : "bg-surface-alt hover:bg-opacity-80"
                }`}
              onClick={() => setFilterType("曲风融合")}
            >
              <Icon name="Combine" size={18} className="mr-2" />
              <span>曲风融合</span>
            </button>
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <h3 className="heading-small mb-4">排序方式</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${sortBy === "date-desc" ? "bg-primary bg-opacity-20 text-primary" : "bg-surface-alt hover:bg-opacity-80"
                }`}
              onClick={() => setSortBy("date-desc")}
            >
              <Icon name="CalendarClock" size={18} className="mr-2" />
              <span>从新到旧</span>
            </button>

            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${sortBy === "date-asc" ? "bg-primary bg-opacity-20 text-primary" : "bg-surface-alt hover:bg-opacity-80"
                }`}
              onClick={() => setSortBy("date-asc")}
            >
              <Icon name="Calendar" size={18} className="mr-2" />
              <span>从旧到新</span>
            </button>

            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${sortBy === "title-asc" ? "bg-primary bg-opacity-20 text-primary" : "bg-surface-alt hover:bg-opacity-80"
                }`}
              onClick={() => setSortBy("title-asc")}
            >
              <Icon name="SortAsc" size={18} className="mr-2" />
              <span>按名称字母排序 A-Z</span>
            </button>

            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${sortBy === "title-desc" ? "bg-primary bg-opacity-20 text-primary" : "bg-surface-alt hover:bg-opacity-80"
                }`}
              onClick={() => setSortBy("title-desc")}
            >
              <Icon name="SortDesc" size={18} className="mr-2" />
              <span>按名称字母排序 Z-A</span>
            </button>

            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${sortBy === "duration-asc" ? "bg-primary bg-opacity-20 text-primary" : "bg-surface-alt hover:bg-opacity-80"
                }`}
              onClick={() => setSortBy("duration-asc")}
            >
              <Icon name="Timer" size={18} className="mr-2" />
              <span>从短到长</span>
            </button>

            <button
              className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all duration-300 ${sortBy === "duration-desc" ? "bg-primary bg-opacity-20 text-primary" : "bg-surface-alt hover:bg-opacity-80"
                }`}
              onClick={() => setSortBy("duration-desc")}
            >
              <Icon name="TimerOff" size={18} className="mr-2" />
              <span>从长到短</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;