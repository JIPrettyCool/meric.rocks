"use client";
import React from 'react';
import { useLanyard } from '../hooks/useLanyard';

export default function DiscordStatusIndicator() {
  const { data } = useLanyard();
  
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

  const getStatusText = () => {
    if (!data) return "Offline";
    
    switch (data.discord_status) {
      case "online":
        return "Online";
      case "idle":
        return "Idle";
      case "dnd":
        return "Do Not Disturb";
      default:
        return "Offline";
    }
  };
  
  return (
    <div className="flex items-center gap-1.5 text-sm text-foreground/70">
      <span className={`w-2 h-2 rounded-full ${getStatusColor()} ${data?.discord_status && data.discord_status !== 'offline' ? 'animate-pulse' : ''}`}></span>
      <span>{getStatusText()}</span>
    </div>
  );
}