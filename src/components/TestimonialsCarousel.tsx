import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Triangle, Hexagon, Hexagon as HexagonIcon, Circle } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

const getCompanyLogo = (company: string) => {
  switch (company.toLowerCase()) {
    case 'nexus': return <Triangle className="w-8 h-8 text-white/50" />;
    case 'global': return <Circle className="w-8 h-8 text-white/50" />;
    case 'stellar': return <HexagonIcon className="w-8 h-8 text-white/50" />;
    default: return <Quote className="w-8 h-8 text-white/50" />;
  }
};

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto px-4"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative h-[450px] md:h-[350px] overflow-hidden flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 }
            }}
            className="absolute w-full px-12 md:px-24 flex flex-col items-center justify-center text-center"
          >
            <div className="mb-8 flex items-center justify-center space-x-3 opacity-60">
               {getCompanyLogo(testimonials[currentIndex].company)}
               <span className="text-white font-mono uppercase tracking-widest text-sm">{testimonials[currentIndex].company}</span>
            </div>
            <p className="font-heading text-2xl md:text-3xl font-light text-white leading-relaxed mb-10">
              "{testimonials[currentIndex].quote}"
            </p>
            <div>
              <p className="font-bold text-white tracking-wide uppercase text-sm mb-1">{testimonials[currentIndex].author}</p>
              <p className="text-brand-gray text-xs tracking-widest uppercase font-mono">{testimonials[currentIndex].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center gap-6 mt-8">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/5 transition-colors focus:outline-none"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        
        <div className="flex gap-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                idx === currentIndex ? 'bg-white scale-150' : 'bg-white/20 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/5 transition-colors focus:outline-none"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
