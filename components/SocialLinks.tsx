"use client";
import React from 'react';
import { useLanyard } from '../hooks/useLanyard';

export default function SocialLinks() {
  const { data, loading } = useLanyard();
  
  const getStatusColor = () => {
    if (!data) return "bg-gray-500";
    switch (data.discord_status) {
      case "online":
        return "bg-green-500";
      case "idle":
        return "bg-yellow-500";
      case "dnd":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  
  return (
    <div className="flex gap-4 items-center pt-4">
      <a 
        href="https://github.com/jiprettycool" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="p-2 rounded-md hover:bg-secondary/50 transition-colors"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="25" 
          height="25" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      </a>
      <a 
        href="https://twitter.com/iamrealji" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="p-2 rounded-md hover:bg-secondary/50 transition-colors"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="25" 
          height="25" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5549 21H20.7996L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/>
        </svg>
      </a>
      <a 
        href="https://discord.com/users/455384255774720011" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="p-2 rounded-md hover:bg-secondary/50 transition-colors relative"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="25" 
          height="25" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.904-.608 1.31a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.31.077.077 0 0 0-.079-.036 19.4 19.4 0 0 0-4.885 1.49.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 19.598 19.598 0 0 0 5.919 2.98.076.076 0 0 0 .082-.026 13.909 13.909 0 0 0 1.226-1.994.074.074 0 0 0-.041-.104 12.892 12.892 0 0 1-1.84-.878.075.075 0 0 1-.008-.125c.123-.093.247-.19.364-.289a.075.075 0 0 1 .078-.01c3.927 1.789 8.18 1.789 12.062 0a.075.075 0 0 1 .079.009c.118.098.24.198.366.29a.075.075 0 0 1-.006.125c-.587.349-1.201.645-1.84.878a.075.075 0 0 0-.041.104c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .082.027 19.541 19.541 0 0 0 5.919-2.98.076.076 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.332-.955 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z"/>
        </svg>
        <span 
          className={`absolute bottom-1 right-1 w-2.5 h-2.5 border border-background rounded-full ${getStatusColor()} ${data?.discord_status && data.discord_status !== 'offline' ? 'animate-pulse' : ''}`}
        ></span>
      </a>
    </div>
  );
}