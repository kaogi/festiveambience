"use client";

import React, { useEffect, useState } from 'react';
import { fetchChannelVideos } from '@/lib/api/rss';
import { VideoEntry } from '@/types';
import Layout from '@/components/layout/Layout';
import VideoCard from '@/components/videos/VideoCard';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { metadata } from './metadata';
import dynamic from 'next/dynamic';

// Chargement dynamique du composant pour éviter les erreurs SSR
const VideoSchemaList = dynamic(() => import('@/components/seo/VideoSchemaList'), { ssr: false });

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const fetchedVideos = await fetchChannelVideos();
        setVideos(fetchedVideos);
        setError(null);
      } catch (err) {
        console.error("Error loading videos:", err);
        setError("Unable to load videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  return (
    <Layout>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.ogTitle} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta property="og:url" content={metadata.ogUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.twitterTitle} />
        <meta name="twitter:description" content={metadata.twitterDescription} />
        <meta name="twitter:image" content={metadata.twitterImage} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Festive Window Projection Videos
        </motion.h1>

        {loading ? (
          <motion.div 
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
          </motion.div>
        ) : error ? (
          <motion.div 
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
            role="alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </motion.div>
          </>
        )}
      </div>
      
      {!loading && videos.length > 0 && (
        <VideoSchemaList videos={videos} />
      )}
    </Layout>
  );
} 