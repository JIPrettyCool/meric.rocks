'use client';

import { useState, useEffect } from 'react';

export default function MobileNav() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      const sections = ['home', 'projects', 'about']; // ADD TOOLS HERE LATER!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      }) || 'home';
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    )},
    { id: 'projects', label: 'Projects', icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    )},
    { id: 'about', label: 'About', icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    )}
  ];

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} md:hidden`}>
      <div className="flex items-center gap-2 px-4 py-3 bg-background/70 backdrop-blur-xl rounded-full border border-white/10 shadow-lg">
        {navItems.map((item) => (
          <a 
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              setActiveSection(item.id);
            }}
            className={`flex flex-col items-center px-4 py-2 rounded-full ${activeSection === item.id ? 'text-primary' : 'text-foreground/70'} transition-colors`}
          >
            {item.icon}
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}