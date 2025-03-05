"use client";

import React from 'react';
import { VideoEntry } from '@/types';
import VideoCard from './VideoCard';
import { motion } from 'framer-motion';

interface VideoGridProps {
  videos: VideoEntry[];
  title?: string;
  loading?: boolean;
}

const VideoGrid = ({ videos, title, loading = false }: VideoGridProps) => {
  // Animation pour l'apparition des vidéos
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Afficher un état de chargement
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow animate-pulse">
              <div className="aspect-video bg-gray-300 dark:bg-gray-600"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Afficher un message si aucune vidéo n'est disponible
  if (videos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
        <p className="text-gray-600 dark:text-gray-400">No videos available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {videos.map((video) => (
          <motion.div key={video.id} variants={item}>
            <VideoCard video={video} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default VideoGrid; 