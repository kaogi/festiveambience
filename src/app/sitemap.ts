import { MetadataRoute } from 'next';
import { fetchAllPlaylists } from '@/lib/api/rss';
import { fetchChannelVideos } from '@/lib/api/rss';

// Generate a dynamic sitemap that includes all pages, playlists and videos
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all playlists and videos
  let playlists = [];
  let videos = [];
  
  try {
    playlists = await fetchAllPlaylists();
  } catch (error) {
    console.error('Error fetching playlists for sitemap:', error);
  }
  
  try {
    videos = await fetchChannelVideos();
  } catch (error) {
    console.error('Error fetching videos for sitemap:', error);
  }

  // Basic static pages
  const staticPages = [
    {
      url: 'https://festiveambience.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://festiveambience.com/videos',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://festiveambience.com/playlists',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://festiveambience.com/interactive',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Add entries for each playlist
  const playlistEntries = playlists.map((playlist) => ({
    url: `https://festiveambience.com/playlists/${playlist.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Add entries for each video
  const videoEntries = videos.map((video) => ({
    url: `https://festiveambience.com/videos/${video.id}`,
    lastModified: new Date(video.published),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Combine all entries
  return [...staticPages, ...playlistEntries, ...videoEntries];
} 