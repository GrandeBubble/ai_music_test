import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const Testimonial = ({ quote, author, role, avatar }) => {
  return (
    <motion.div
      className="bg-surface rounded-xl p-6 border border-border"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4">
        <Icon name="Quote" size={24} className="text-primary opacity-50" />
      </div>
      
      <p className="text-text-secondary mb-6">
        {quote}
      </p>
      
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image 
            src={avatar} 
            alt={author} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <h4 className="font-medium">{author}</h4>
          <p className="text-sm text-text-tertiary">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonial;