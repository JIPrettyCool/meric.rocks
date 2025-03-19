"use client";
import React, { useEffect, useState } from 'react';

export default function LevelSystem() {
  const calculateAge = () => {
    const today = new Date();
    const birthYear = 2005;
    let age = today.getFullYear() - birthYear;
    
    const birthMonth = 0;
    const birthDay = 1;
    
    const birthDateThisYear = new Date(today.getFullYear(), birthMonth, birthDay);
    if (today < birthDateThisYear) {
      age--;
    }
    
    return age;
  };
  
  const calculateDaysToNextLevel = () => {
    const today = new Date();
    const birthMonth = 0;
    const birthDay = 1;
    
    let nextBirthday = new Date(today.getFullYear(), birthMonth, birthDay);
    if (today > nextBirthday) {
      nextBirthday = new Date(today.getFullYear() + 1, birthMonth, birthDay);
    }
    
    const differenceMs = nextBirthday.getTime() - today.getTime();
    return Math.ceil(differenceMs / (1000 * 3600 * 24));
  };
  
  const calculateLevelProgress = () => {
    const daysInYear = 365;
    const daysToNext = calculateDaysToNextLevel();
    return 100 - ((daysToNext / daysInYear) * 100);
  };
  
  const [age, setAge] = useState(0);
  const [levelProgress, setLevelProgress] = useState(0);
  const [daysToNext, setDaysToNext] = useState(0);
  
  useEffect(() => {
    setAge(calculateAge());
    setLevelProgress(calculateLevelProgress());
    setDaysToNext(calculateDaysToNextLevel());
  }, []);
  
  return (
    <div className="card bg-background/50 backdrop-blur-md border border-foreground/10 p-6 hover:border-primary/30">
      <div className="flex items-center justify-between mb-4 border-b border-foreground/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
            <span className="text-2xl font-bold">{age}</span>
          </div>
          <div>
            <h3 className="font-bold text-xl">Meriç</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground/70">Level {age}</span>
              <span className="text-xs text-primary/70">•</span>
              <span className="text-sm font-medium text-primary">Human</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-mono text-foreground/70">CLASS</span>
          <p className="font-bold">Developer</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="px-3 py-1 bg-background/30 backdrop-blur-sm rounded-full text-xs font-mono border border-foreground/10">Istanbul, Turkey</span>
        <span className="px-3 py-1 bg-background/30 backdrop-blur-sm rounded-full text-xs font-mono border border-foreground/10">Student</span>
        <span className="px-3 py-1 bg-background/30 backdrop-blur-sm rounded-full text-xs font-mono border border-foreground/10">Selfhost</span>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-xs mb-1">
          <span className="font-mono text-foreground/70">EXPERIENCE</span>
          <span className="font-mono">{Math.round(levelProgress)}%</span>
        </div>
        <div className="h-2 bg-foreground/10 border border-foreground/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent to-primary" 
            style={{ width: `${levelProgress}%` }}
          ></div>
        </div>
        <div className="text-xs text-foreground/70 mt-1">
          <span>Next level in {daysToNext} days</span>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-mono text-foreground/70 mb-2">SKILLS</h4>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="border border-foreground/10 rounded-lg p-3 bg-background/20">
            <h3 className="font-bold text-sm mb-2 flex items-center">
              <svg className="w-4 h-4 mr-1 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
              Frontend
            </h3>
            <p className="text-sm text-foreground/70">React, Next.js, TailwindCSS</p>
          </div>
          <div className="border border-foreground/10 rounded-lg p-3 bg-background/20">
            <h3 className="font-bold text-sm mb-2 flex items-center">
              <svg className="w-4 h-4 mr-1 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0l1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path></svg>
              Backend
            </h3>
            <p className="text-sm text-foreground/70">Go, Python, C, Java, TypeScript, JavaScript</p>
          </div>
        </div>

        <div className="mt-6 border-t border-foreground/10 pt-4"></div>
          <h4 className="text-xs font-mono text-foreground/70 mb-2">EQUIPMENT</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              <span className="text-sm">HP Victus 16 7840HS</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              <span className="text-sm">VS Code</span>
            </div>
          </div>
        </div>
      </div>
  );
}