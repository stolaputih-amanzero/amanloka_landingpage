import React, { useState } from 'react';
import { Image as ImageIcon, Loader2, Download, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('2K');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sizes = ['1K', '2K', '4K'];

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, size }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await res.json();
      if (data.image) {
        // Assume API returns base64 string directly
        setGeneratedImage(`data:image/jpeg;base64,${data.image}`);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-[#050505] border border-[#333] rounded-none p-8">
        <div className="flex items-center gap-3 mb-8">
           <Sparkles className="text-brand-white w-5 h-5 opacity-80" />
           <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-brand-white">Studio Imagery</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-[#666] mb-3">Prompt</label>
            <textarea
              className="w-full bg-[#111] border border-[#333] rounded-none p-4 text-brand-white focus:outline-none focus:border-brand-white transition-colors min-h-[120px] resize-none font-light placeholder:text-[#444]"
              placeholder="Describe the high-end imagery you want to create... (e.g. A luxurious minimalist living room with ocean view, photorealistic)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#666]">Resolution:</span>
              <div className="flex bg-[#111] border border-[#333]">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 text-xs font-mono transition-colors ${size === s ? 'bg-white text-black font-medium' : 'text-brand-gray hover:text-white'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="px-8 py-3 border border-brand-white/20 bg-transparent text-white font-medium tracking-widest text-xs uppercase hover:bg-white hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
              {isLoading ? 'Rendering' : 'Generate'}
            </button>
          </div>
          
          {error && (
             <div className="p-3 mt-4 bg-red-950/30 border border-red-900 rounded-lg text-red-400 text-sm">
                {error}
             </div>
          )}
        </div>
      </div>

      {/* Result Area */}
      <AnimatePresence>
        {(generatedImage || isLoading) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full aspect-video border border-[#333] overflow-hidden bg-[#050505] relative group flex items-center justify-center"
          >
            {isLoading ? (
               <div className="flex flex-col items-center gap-4 text-brand-white opacity-50">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <p className="text-xs font-mono uppercase tracking-widest animate-pulse">Rendering {size}...</p>
               </div>
            ) : generatedImage ? (
              <>
                <img src={generatedImage} alt="Generated output" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a href={generatedImage} download={`amanloka-gen-${Date.now()}.jpg`} className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform">
                        <Download className="w-5 h-5" /> Download Full Res
                    </a>
                </div>
              </>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
