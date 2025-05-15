import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const StatisticCard = ({ value, label, icon }) => {
  return (
    <motion.div
      className="bg-surface rounded-xl p-6 border border-border text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mb-4 mx-auto">
        <Icon name={icon} size={24} className="text-primary" />
      </div>
      
      <h3 className="display-small mb-2">{value}</h3>
      <p className="text-text-secondary">{label}</p>
    </motion.div>
  );
};

export default StatisticCard;