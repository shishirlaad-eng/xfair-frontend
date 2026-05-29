import React from 'react';

interface BackgroundOverlayProps {
  theme?: 'option1' | 'option2';
}

export function BackgroundOverlay({ theme = 'option1' }: BackgroundOverlayProps) {
  return (
    <div id="background-elements" className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-[#FAFBFD]">
      {theme === 'option2' ? (
        <>
          {/* Beautiful high-end convention/exhibition center blur aesthetic background */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-500 scale-105"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1800")',
            }}
          />
          {/* Brand Overlay Mask for depth, high contrast and modern glass elevation */}
          <div className="absolute inset-0 bg-slate-900/65 backdrop-blur-[1.5px] transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1D]/70 via-[#0C1224]/85 to-[#050914]" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[#FAFAFC]" />
      )}
    </div>
  );
}
