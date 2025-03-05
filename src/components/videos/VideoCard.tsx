"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { VideoEntry } from '@/types';
import EnhancedImage from './EnhancedImage';

interface VideoCardProps {
  video: VideoEntry;
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`;
  } else {
    return `${views} views`;
  }
};

const formatDuration = (duration: string): string => {
  // Convert seconds duration to mm:ss format
  const seconds = parseInt(duration);
  if (!seconds || isNaN(seconds)) return '00:00';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default function VideoCard({ video }: VideoCardProps) {
  const truncateDescription = (description: string, maxLength: number = 120): string => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  // Prepare relevant keywords for SEO
  const keywords = [
    'festive projection',
    'decorative video',
    video.title.includes('Noël') || video.title.includes('Christmas') ? 'Christmas video' : '',
    video.title.includes('Halloween') ? 'Halloween video' : '',
    video.title.includes('Easter') || video.title.includes('Pâques') ? 'Easter video' : '',
  ].filter(Boolean); // Filter out empty strings
  
  // Contextual description to improve alt tag
  const contextDescription = `Festive projection video (${formatDuration(video.duration)}), published on ${formatDate(video.published)}`;

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 w-full">
        {/* Fallback for image errors */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-indigo-300 animate-pulse" />
        
        {video.thumbnail && (
          <EnhancedImage
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            keywords={keywords}
            contextDescription={contextDescription}
          />
        )}
        
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 text-xs rounded">
          {formatDuration(video.duration)}
        </div>
        
        <Link href={video.link} target="_blank" rel="noopener noreferrer">
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <svg 
                className="w-6 h-6 text-white" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-2 text-gray-800">{video.title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{formatViews(video.views)}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(video.published)}</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3">
          {truncateDescription(video.description)}
        </p>
        
        <Link 
          href={video.link} 
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-indigo-600 hover:text-indigo-800 font-medium text-sm"
        >
          Watch on YouTube →
        </Link>
      </div>
    </motion.div>
  );
} 