import React from 'react';

interface BackgroundOverlayProps {
  theme?: 'option1' | 'option2';
}

export function BackgroundOverlay({ theme = 'option1' }: BackgroundOverlayProps) {
  return (
    <div id="background-elements" className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-[#0A0F1D]">
      {/* Premium Event / Trade Show Background Image always present */}
      <img
        src="/src/assets/images/exhibition_executives_1781071241876.png"
        alt="Event Venue Backdrop"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center scale-100 opacity-90 transition-all duration-700"
      />

      {/* Dynamic ambient color glow spots behind the modal cards */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-[#f89728]/10 blur-[130px] animate-pulse-slow mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-blue-600/10 blur-[150px] animate-pulse-slow mix-blend-screen" />

      {theme === 'option2' ? (
        <>
          {/* Brand Overlay Mask - semi-transparent for dark theme so the event bg detail is clearly visible */}
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] transition-all duration-500" />
        </>
      ) : (
        <>
          {/* Beautiful premium dark overlay mask to create a stunning high-contrast cinematic backing for the cards */}
          <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[1.5px] transition-all duration-500" />
        </>
      )}
    </div>
  );
}
