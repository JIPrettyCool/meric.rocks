"use client";
import React from 'react';
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
      <div className="inline-flex items-center px-3 py-1 text-sm rounded-full border border-foreground/10 bg-secondary/30 backdrop-blur-sm">
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
      <div className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full border border-foreground/10 bg-secondary/30 backdrop-blur-sm">
        <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.5576 16.5533C16.3082 16.9411 15.7783 17.0477 15.3988 16.79C13.3168 15.5233 10.6811 15.137 6.99695 16.0887C6.56581 16.1984 6.11929 15.9346 6.01442 15.5043C5.90865 15.0731 6.17246 14.6284 6.60371 14.5233C10.6648 13.4611 13.648 13.914 16.0437 15.3679C16.4233 15.6248 16.5069 16.1655 16.5576 16.5533ZM17.7997 13.6654C17.4869 14.1534 16.8293 14.289 16.3423 13.9753C13.9302 12.5143 10.2558 11.9242 6.99695 12.9869C6.44605 13.1502 5.86283 12.8308 5.70056 12.2817C5.53919 11.7308 5.85677 11.1493 6.40498 10.9851C10.1867 9.76002 14.3012 10.4287 17.1092 12.1435C17.5971 12.4572 17.7307 13.1144 17.7997 13.6654ZM17.9513 10.6897C15.0692 9.00991 9.34616 8.80063 6.10333 9.82411C5.45351 10.0203 4.76313 9.63843 4.56645 8.9886C4.36977 8.33789 4.75351 7.64839 5.40421 7.45083C9.16334 6.27514 15.4448 6.52368 18.8561 8.46644C19.4553 8.827 19.6591 9.59164 19.2994 10.1891C18.9388 10.7865 18.1778 10.9913 17.9513 10.6897Z"/>
        </svg>

        <div className="relative h-6 w-6 flex-shrink-0">
        <Image 
          src={data.spotify.album_art_url} 
          alt={data.spotify.album || "Album cover"}
          width={24}
          height={24} 
          className="h-6 w-6 rounded-full object-cover"
        />
        </div>
        
        <span className="truncate font-medium">
          <span> {data.spotify.artist}</span>
          <span className="text-foreground/60 mx-1">●</span>
          <span className="text-green-400">{data.spotify.song}</span>
        </span>
      </div>
    );
  }

  const vscodeActivity = data.activities?.find(activity => activity.name === 'Code');
  if (vscodeActivity) {
    return (
      <div className="inline-flex items-center px-3 py-1 text-sm rounded-full border border-foreground/10 bg-secondary/30 backdrop-blur-sm">
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
      <div className="inline-flex items-center px-3 py-1 text-sm rounded-full border border-foreground/10 bg-secondary/30 backdrop-blur-sm">
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
    <div className="inline-flex items-center px-3 py-1 text-sm rounded-full border border-foreground/10 bg-secondary/30 backdrop-blur-sm">
      <span className="relative flex h-2 w-2 mr-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentStatusColor} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${currentStatusColor}`}></span>
      </span>
      <span>{statusText}</span>
    </div>
  );
}