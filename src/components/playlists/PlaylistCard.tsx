"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Playlist } from '@/types';

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  // Format video count
  const formatVideosCount = (count: number) => {
    return count === 1 ? '1 video' : `${count} videos`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative h-48">
        {/* Fallback for image errors */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-purple-300 animate-pulse" />
        
        {playlist.thumbnail && (
          <Image
            src={playlist.thumbnail}
            alt={playlist.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-24">
          <div className="absolute bottom-4 left-4 text-white">
            <span className="bg-indigo-600 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full">
              {formatVideosCount(playlist.videoCount)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <Link 
          href={`/playlists/${playlist.id}`}
          className="text-lg font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2"
        >
          {playlist.title}
        </Link>
        
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {playlist.description || `Explore the ${playlist.title} collection of festive projection videos.`}
        </p>
      </div>
    </motion.div>
  );
};

export default PlaylistCard; 