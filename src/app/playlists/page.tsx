"use client";

import React, { useEffect, useState } from 'react';
import { fetchAllPlaylists } from '@/lib/api/rss';
import { Playlist } from '@/types';
import Layout from '@/components/layout/Layout';
import PlaylistCard from '@/components/playlists/PlaylistCard';
import { motion } from 'framer-motion';

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        setLoading(true);
        const fetchedPlaylists = await fetchAllPlaylists();
        setPlaylists(fetchedPlaylists);
        setError(null);
      } catch (err) {
        console.error("Error loading playlists:", err);
        setError("Unable to load playlists. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadPlaylists();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 text-indigo-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Themed Projection Collections
        </motion.h1>

        <motion.p 
          className="text-lg text-center mb-10 max-w-3xl mx-auto text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Browse our video collections organized by festive themes.
          Each playlist contains projections for specific occasions.
        </motion.p>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {!loading && !error && playlists.length === 0 && (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">No playlists were found.</p>
            <p className="mt-2 text-gray-500">Please come back later to discover our collections.</p>
          </div>
        )}

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </motion.div>
      </div>
    </Layout>
  );
} 