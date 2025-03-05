"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Playlist } from '@/types';

interface PlaylistGalleryProps {
  playlists: Playlist[];
  loading?: boolean;
}

const PlaylistGallery = ({ playlists, loading = false }: PlaylistGalleryProps) => {
  // Animation pour l'apparition des playlists
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
        <h2 className="text-2xl font-bold mb-6">Playlists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow animate-pulse">
              <div className="aspect-video bg-gray-300 dark:bg-gray-600"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Afficher un message si aucune playlist n'est disponible
  if (playlists.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-6">Playlists</h2>
        <p className="text-gray-600 dark:text-gray-400">No playlists available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Playlists</h2>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {playlists.map((playlist) => (
          <motion.div key={playlist.id} variants={item}>
            <Link href={`/playlists/${playlist.id}`}>
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="relative aspect-video">
                  <Image
                    src={playlist.thumbnailUrl}
                    alt={playlist.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-lg font-semibold">{playlist.title}</h3>
                      <p className="text-sm opacity-80">{playlist.videos.length} videos</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {playlist.description}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PlaylistGallery; 