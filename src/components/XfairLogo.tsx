import React from 'react';
// @ts-ignore
import xfairLogoImg from '../xfair_logo-removebg-preview.png';

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
        src={xfairLogoImg}
        alt="Xfair Logo"
        className={`${heightClasses[size]} w-auto object-contain`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
