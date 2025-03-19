"use client";
import React, { useState, useEffect } from 'react';
import { useLanyard } from '../hooks/useLanyard';
import Image from 'next/image';

export default function DiscordStatus() {
  const { data, loading, error } = useLanyard();

  const statusColor = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500',
  };

  if (loading || error || !data) {
    return (
      <div className="inline-flex items-center px-3 py-1 text-sm rounded-full border border-foreground/10 bg-secondary/30">
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span>Loading...</span>
      </div>
    );
  }

  const currentStatusColor = statusColor[data.discord_status] || statusColor.offline;

  if (data.listening_to_spotify && data.spotify) {
    return (
      <div className="border border-foreground/10 rounded-full bg-background/50 backdrop-blur-sm p-1 pr-4 flex items-center gap-2 w-fit">
        <svg className="h-4 w-4 text-green-400 shrink-0 ml-2 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.36.12-.75-.12-.87-.479-.12-.359.12-.75.48-.87 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.329 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <div className="flex items-center gap-2 max-w-full">
          <Image 
            src={data.spotify.album_art_url} 
            alt={data.spotify.album || "Album cover"}
            width={24}
            height={24}
            className="h-6 w-6 rounded-full object-cover"
          />
          <div className="overflow-hidden">
            <p className="text-green-400 font-medium text-sm truncate max-w-[180px] sm:max-w-[220px]">
              {data.spotify.song}
            </p>
            <p className="text-xs text-foreground/80 truncate max-w-[180px] sm:max-w-[220px]">
              by {data.spotify.artist}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const vscodeActivity = data.activities?.find(activity => activity.name === 'Code');
  if (vscodeActivity) {
    return (
      <div className="inline-flex items-center px-3 py-1 text-sm rounded-full border border-foreground/10 bg-secondary/30">
        <span className="relative flex h-2 w-2 mr-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentStatusColor} opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${currentStatusColor}`}></span>
        </span>
        <span>
          Coding <span className="font-medium">{vscodeActivity.details}</span>
          {vscodeActivity.state && <span className="text-foreground/70"> • {vscodeActivity.state}</span>}
        </span>
      </div>
    );
  }

  const gameActivity = data.activities?.find(
    activity => activity.type === 0 && activity.name !== 'Spotify'
  );
  
  if (gameActivity) {
    return (
      <div className="inline-flex items-center px-3 py-1 text-sm rounded-full border border-foreground/10 bg-secondary/30">
        <span className="relative flex h-2 w-2 mr-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentStatusColor} opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${currentStatusColor}`}></span>
        </span>
        <span>
          Playing <span className="font-medium">{gameActivity.name}</span>
        </span>
      </div>
    );
  }

  let statusText;
  switch (data.discord_status) {
    case 'online':
      statusText = "Online";
      break;
    case 'idle':
      statusText = "Away from keyboard";
      break;
    case 'dnd':
      statusText = "Busy";
      break;
    default:
      statusText = "Offline";
  }

  return (
    <div className="inline-flex items-center px-3 py-1 text-sm rounded-full border border-foreground/10 bg-secondary/30">
      <span className="relative flex h-2 w-2 mr-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentStatusColor} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${currentStatusColor}`}></span>
      </span>
      <span>{statusText}</span>
    </div>
  );
}