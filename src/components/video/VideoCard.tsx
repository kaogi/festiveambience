"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { VideoEntry } from '@/types';

interface VideoCardProps {
  video: VideoEntry;
}

const VideoCard = ({ video }: VideoCardProps) => {
  // Format video duration (from seconds to MM:SS)
  const formatDuration = (seconds: string) => {
    const sec = parseInt(seconds);
    const minutes = Math.floor(sec / 60);
    const remainingSeconds = sec % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Format view count
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    } else {
      return `${views} views`;
    }
  };

  // Format publication date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)"
      }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300"
    >
      <Link href={`/videos/${video.id}`}>
        <div className="relative aspect-video">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.duration)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-2 mb-2 text-gray-900 dark:text-white">
            {video.title}
          </h3>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{formatViews(video.views)}</span>
            <span>{formatDate(video.published)}</span>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {video.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default VideoCard; 