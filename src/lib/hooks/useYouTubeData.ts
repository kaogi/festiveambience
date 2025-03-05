"use client";

import { useState, useEffect } from 'react';
import { VideoEntry, Playlist } from '@/types';
import { useCallback } from 'react';
import { fetchChannelVideos, fetchPlaylistVideos, fetchAllPlaylists } from '../api/rss';

/**
 * Hook to fetch videos from a specific YouTube channel
 * @returns An object containing the videos and loading state
 */
export function useChannelVideos() {
  const [videos, setVideos] = useState<VideoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const result = await fetchChannelVideos();
        setVideos(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching channel videos:', err);
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  return { videos, loading, error };
}

/**
 * Hook to fetch videos from a specific playlist
 * @param playlistId The ID of the playlist to fetch
 * @returns An object containing the videos and loading state
 */
export function usePlaylistVideos(playlistId: string) {
  const [videos, setVideos] = useState<VideoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadVideos = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchPlaylistVideos(playlistId);
      setVideos(result);
      setError(null);
    } catch (err) {
      console.error(`Error fetching videos for playlist ${playlistId}:`, err);
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }, [playlistId]);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  return { videos, loading, error, refreshVideos: loadVideos };
}

/**
 * Hook to fetch all playlists
 * @returns An object containing the playlists and loading state
 */
export function usePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        setLoading(true);
        const result = await fetchAllPlaylists();
        setPlaylists(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching playlists:', err);
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    loadPlaylists();
  }, []);

  return { playlists, loading, error };
} 