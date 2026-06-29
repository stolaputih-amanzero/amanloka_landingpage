import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';

interface EcosystemCardProps {
  product: {
    title: string;
    desc: string;
    specs: { label: string; value: string }[];
  };
  idx: number;
  onClick: () => void;
  learnMoreText: string;
}

export default function EcosystemCard({ product, idx, onClick, learnMoreText }: EcosystemCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className="group h-full p-8 border border-white/5 bg-[#080808] hover:bg-[#111] transition-colors flex flex-col relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.05),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-10 h-10 mb-6 border border-white/10 flex items-center justify-center text-brand-white font-mono text-xs">
           {String(idx + 1).padStart(2, '0')}
        </div>
        <h4 className="font-heading font-bold text-lg text-brand-white mb-4 group-hover:text-brand-gray transition-colors">{product.title}</h4>
        <p className="text-sm text-brand-gray font-light leading-relaxed flex-grow mb-6">{product.desc}</p>
        <button 
          onClick={onClick}
          className="self-start text-xs uppercase tracking-widest font-mono text-white border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
        >
          {learnMoreText}
        </button>
      </div>
    </div>
  );
}
