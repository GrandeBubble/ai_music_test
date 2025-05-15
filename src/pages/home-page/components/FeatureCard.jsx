import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const FeatureCard = ({ title, description, icon, color, linkTo }) => {
  return (
    <motion.div
      className="bg-surface rounded-xl p-6 border border-border hover:border-primary transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      <div className={`w-12 h-12 rounded-full bg-${color} bg-opacity-20 flex items-center justify-center mb-4`}>
        <Icon name={icon} size={24} className={`text-${color}`} />
      </div>

      <h3 className="heading-medium mb-3">{title}</h3>

      <p className="text-text-secondary mb-6">
        {description}
      </p>

      <Link
        to={linkTo}
        className={`inline-flex items-center text-${color} hover:underline`}
      >
        <span>马上尝试</span>
        <Icon name="ArrowRight" size={16} className="ml-2" />
      </Link>
    </motion.div>
  );
};

export default FeatureCard;