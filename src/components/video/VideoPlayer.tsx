"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VideoEntry } from '@/types';

interface VideoPlayerProps {
  video: VideoEntry;
  autoplay?: boolean;
}

const VideoPlayer = ({ video, autoplay = false }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // Construire l'URL YouTube avec autoplay si nécessaire
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${video.id}?rel=0&showinfo=0${autoplay ? '&autoplay=1' : ''}`;

  return (
    <div className="w-full">
      <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
            />
          </div>
        )}
        <iframe
          src={youtubeEmbedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span>
            {new Date(video.published).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span>
            {video.views.toLocaleString()} views
          </span>
        </div>
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer; 