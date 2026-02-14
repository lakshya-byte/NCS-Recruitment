'use client';

import React, { useState, useEffect } from 'react';
import NavLogo from './NavLogo';
import NavLinks from './NavLinks';
import RegisterButton from './RegisterButton';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold of 20px prevents jitter at the very top
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Container:
        - Fixed position, centered.
        - Transition: 'cubic-bezier(0.25,0.8,0.25,1)' creates that "Apple-like" friction.
        - Width: Large (7xl) -> Compact (fit).
      */}
      <nav
        className={`
          fixed left-1/2 -translate-x-1/2 z-50 
          transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
          flex items-center justify-between
          border border-white/10
          shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
          backdrop-blur-[12px]
          
          ${
            isScrolled
              ? 'top-4 py-2 px-3 rounded-full bg-black/60 w-[90%] max-w-[520px]' // Scrolled: Capsule
              : 'top-6 py-4 px-8 rounded-2xl bg-black/40 w-[95%] max-w-7xl' // Top: Hero Wide
          }
        `}
      >
        {/* Cinematic Lighting Layers:
          These absolute divs create the "3D Glass" feel without relying on cheap borders.
        */}
        
        {/* Top Rim Light (simulates light hitting the top edge of the glass) */}
        <div className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-50'}`} />
        
        {/* Bottom Reflection (simulates ground bounce light) */}
        <div className={`absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-30'}`} />

        {/* --- LOGO --- */}
        <div className="relative z-10 flex-shrink-0">
          <NavLogo isScrolled={isScrolled} />
        </div>

        {/* --- DESKTOP LINKS --- */}
        {/* We hide these on mobile. 
           On scroll, we pass the state so they can reduce their padding/margins if needed.
        */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          <NavLinks isScrolled={isScrolled} />
        </div>

        {/* --- RIGHT ACTIONS (Register + Mobile Menu) --- */}
        <div className="relative z-10 flex items-center gap-3">
          {/* Register Button (Hidden on very small mobile if space is tight, usually visible) */}
          <div className="hidden sm:block">
            <RegisterButton isScrolled={isScrolled} />
          </div>

          {/* Mobile Hamburger / Menu Overlay */}
          <MobileMenu 
            isOpen={isMobileOpen} 
            setIsOpen={setIsMobileOpen} 
            isScrolled={isScrolled} 
          />
        </div>
      </nav>
    </>
  );
}