import Link from 'next/link';
import React from 'react';

interface NavLogoProps {
  isScrolled: boolean;
}

const NavLogo: React.FC<NavLogoProps> = ({ isScrolled }) => {
  return (
    <Link href="/" className="group relative z-50 block outline-none">
      {/* Container
        - Aligns icon and text
        - Handles the overall scale transition 
      */}
      <div 
        className={`
          flex items-center gap-2 
          transition-all duration-500 cubic-bezier(0.25, 0.8, 0.25, 1)
          ${isScrolled ? 'gap-1.5' : 'gap-3'}
        `}
      >
        {/* 1. LOGO MARK (The Icon)
           - Rotates slightly on hover
           - Scales down when scrolled
           - Uses a gradient fill
        */}
        <div 
          className={`
            relative flex items-center justify-center 
            transition-all duration-500 
            ${isScrolled ? 'w-6 h-6' : 'w-8 h-8'}
          `}
        >
          {/* Outer Ring Glow (Hover only) */}
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`w-full h-full text-white transition-transform duration-500 group-hover:rotate-90`}
          >
            <path 
              d="M12 2L2 7L12 12L22 7L12 2Z" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover:stroke-blue-400 transition-colors duration-300"
            />
            <path 
              d="M2 17L12 22L22 17" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="opacity-50 group-hover:opacity-100 group-hover:stroke-blue-400 transition-all duration-300 delay-75"
            />
            <path 
              d="M2 12L12 17L22 12" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="opacity-75 group-hover:opacity-100 group-hover:stroke-blue-400 transition-all duration-300 delay-50"
            />
          </svg>
        </div>

        {/* 2. LOGO TEXT
           - "NCS" is always visible
           - "Nibble" (full text) could be conditionally hidden, but for a 
             compact mobile-first design, a strong acronym often works best.
             Here we stick to the Acronym for the "Island" aesthetic.
        */}
        <div className="flex flex-col justify-center">
          <span 
            className={`
              font-bold tracking-wider text-white uppercase leading-none
              transition-all duration-500 
              group-hover:text-blue-100
              ${isScrolled ? 'text-lg' : 'text-xl'}
            `}
          >
            NCS
          </span>
          
          {/* Subtext - Fades out completely when scrolled to save vertical space */}
          <span 
            className={`
              text-[0.6rem] font-medium tracking-[0.2em] text-neutral-400 uppercase
              transition-all duration-300
              ${isScrolled 
                ? 'opacity-0 h-0 -mt-1 overflow-hidden' 
                : 'opacity-100 h-auto mt-0.5'
              }
            `}
          >
            Nibble
          </span>
        </div>
      </div>
    </Link>
  );
};

export default NavLogo;