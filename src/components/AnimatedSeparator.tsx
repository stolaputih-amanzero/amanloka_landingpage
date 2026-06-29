import React from 'react';
import { motion } from 'motion/react';

export default function AnimatedSeparator() {
  return (
    <div className="absolute top-0 left-0 w-full z-20 pointer-events-none flex flex-col items-center">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-3xl h-[1px] animate-dashed-line"
      />
      <motion.svg 
        width="2" 
        height="120" 
        viewBox="0 0 2 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="-mt-[1px]"
      >
        <motion.line 
          x1="1" 
          y1="0" 
          x2="1" 
          y2="120" 
          stroke="url(#line-gradient)" 
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="line-gradient" x1="1" y1="0" x2="1" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.4" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
