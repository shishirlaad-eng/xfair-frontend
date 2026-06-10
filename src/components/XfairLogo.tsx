import React from 'react';

interface XfairLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  darkText?: boolean;
}

export function XfairLogo({ size = 'md', darkText = true }: XfairLogoProps) {
  const heightClasses = {
    sm: 'h-9',
    md: 'h-[50px]',
    lg: 'h-[68px]',
    xl: 'h-[88px]'
  };

  return (
    <div id="xfair-logo-container" className="flex items-center select-none">
      <img
        id="xfair-logo-image"
        src="/xfair_logo-removebg-preview.png"
        alt="Xfair Logo"
        className={`${heightClasses[size]} w-auto object-contain`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
