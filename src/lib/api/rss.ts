"use client";

import { parseStringPromise } from 'xml2js';
import { VideoEntry, Playlist } from '@/types';

// Channel RSS URL from the technical document
const CHANNEL_RSS_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=UC50vfiAGflBnDv6PD1NNTrw';

// All playlist URLs from the technical document
const PLAYLIST_RSS_URLS = [
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zZykWyZ1zEF6X9aMbMZ4mRS',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zYidoI2lbJyTW1oSZyrh-vt',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zbjcLeC0lUdDsmJteNFKKFQ',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zZtx2cm8dfBFjC2VObbpH2v',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zY9Qs8sZpwgtoV7PsSXq_MH',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zZAQQfBPuKVoZVh2CwvomIB',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zbZl1OdZbq37nbwgb53Y2gu',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zbyHJJkfkLm7QwIWgFzSHl5',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zbh4Ev6bY9iydqFE9J9OFlm',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zbQC8iKrrXZAT_yg1NtTwu9',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zYluMG8Kz0zlR8TBSJR0wHr',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zb0_EiSHKQyybHVtIqaWak1',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zY66DVsgXTEJFQImV9vPKrx',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zaU2PVAU7IJAuBWvN8liyDD',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zYxo3AdBneGO2wVsVCq4qm3',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zZQUBXpPiB_9eLYQ1WkPROJ',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zZcLvmsK8ZF6Ydbq-LuvoFW',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zZ1j5uwMV2zJoOTNQ5KQSe6',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zYAX79QoJvY2v_9t_R0pMPd',
  'https://www.youtube.com/feeds/videos.xml?playlist_id=PLHbvk4eYO_zbsb_5YZ4DHNP9EV8qPGpEX'
];

// Playlist names (matches the 20 playlists above)
const PLAYLIST_NAMES = [
  'Christmas Collection',
  'Halloween Collection',
  'Easter Showcase',
  'Winter Wonderland',
  'Birthday Projections',
  'Holiday Special',
  'Summer Vibes',
  'New Year Celebration',
  'Thanksgiving Fall',
  'Valentine Special',
  'Santa Workshop',
  'Ghost Stories',
  'Spring Flowers',
  'Autumn Leaves',
  'Party Time',
  'Kids Favorites',
  'Wedding Special',
  'Patriotic Themes',
  'Spooky Season',
  'Festival Lights'
];

// Generate placeholder videos when API fails
export function generatePlaceholderVideos(count: number = 10): VideoEntry[] {
  console.log('Generating placeholder videos');
  return Array.from({ length: count }, (_, i) => ({
    id: `placeholder-${i}`,
    title: `Festive Window Projection #${i + 1}`,
    link: '#',
    published: new Date(Date.now() - i * 86400000),
    updated: new Date(Date.now() - i * 86400000),
    thumbnail: '/assets/images/placeholder-video.jpg',
    description: 'This is a placeholder video while we load the actual content. Enjoy our festive window projections!',
    views: Math.floor(Math.random() * 10000),
    duration: '180',
  }));
}

// Generate placeholder playlists when API fails
export function generatePlaceholderPlaylists(count: number = 5): Playlist[] {
  console.log('Generating placeholder playlists');
  return Array.from({ length: count }, (_, i) => ({
    id: `placeholder-playlist-${i}`,
    title: `${['Christmas', 'Halloween', 'Easter', 'Birthday', 'Holiday'][i % 5]} Collection`,
    description: 'A collection of beautiful window projections for your home',
    thumbnailUrl: '/assets/images/placeholder-playlist.jpg',
    videos: generatePlaceholderVideos(3),
  }));
}

// Fetch with CORS handling
export async function fetchWithCorsHandling(url: string): Promise<string> {
  console.log(`Fetching: ${url}`);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/xml, text/xml, */*',
      },
      mode: 'cors',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
    }
    
    const text = await response.text();
    console.log(`Successfully fetched ${url} (${text.length} bytes)`);
    return text;
  } catch (error) {
    console.error(`Error fetching RSS feed: ${url}`, error);
    return '';
  }
}

// Fetch videos from the channel
export async function fetchChannelVideos(): Promise<VideoEntry[]> {
  console.log('Fetching channel videos...');
  try {
    const xmlText = await fetchWithCorsHandling(CHANNEL_RSS_URL);
    
    if (!xmlText) {
      console.warn('No data received from channel feed, using placeholders');
      return generatePlaceholderVideos();
    }
    
    const result = await parseStringPromise(xmlText);
    
    if (!result.feed || !result.feed.entry || !Array.isArray(result.feed.entry)) {
      console.warn('Invalid RSS feed structure, using placeholders');
      return generatePlaceholderVideos();
    }
    
    console.log(`Found ${result.feed.entry.length} videos in channel feed`);
    return result.feed.entry.map(transformVideoEntry);
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    return generatePlaceholderVideos();
  }
}

// Fetch videos from a specific playlist
export async function fetchPlaylistVideos(playlistIndex: number): Promise<VideoEntry[]> {
  if (playlistIndex < 0 || playlistIndex >= PLAYLIST_RSS_URLS.length) {
    console.warn(`Invalid playlist index: ${playlistIndex}, using placeholders`);
    return generatePlaceholderVideos();
  }
  
  console.log(`Fetching playlist videos for index ${playlistIndex}...`);
  try {
    const xmlText = await fetchWithCorsHandling(PLAYLIST_RSS_URLS[playlistIndex]);
    
    if (!xmlText) {
      console.warn(`No data received from playlist ${playlistIndex}, using placeholders`);
      return generatePlaceholderVideos();
    }
    
    const result = await parseStringPromise(xmlText);
    
    if (!result.feed || !result.feed.entry || !Array.isArray(result.feed.entry)) {
      console.warn(`Invalid RSS feed structure for playlist ${playlistIndex}, using placeholders`);
      return generatePlaceholderVideos();
    }
    
    console.log(`Found ${result.feed.entry.length} videos in playlist ${playlistIndex}`);
    return result.feed.entry.map(transformVideoEntry);
  } catch (error) {
    console.error(`Error fetching playlist videos for index ${playlistIndex}:`, error);
    return generatePlaceholderVideos();
  }
}

// Fetch all playlists
export async function fetchAllPlaylists(): Promise<Playlist[]> {
  console.log('Fetching all playlists...');
  try {
    // Use Promise.all to fetch all playlists concurrently
    const playlistPromises = PLAYLIST_RSS_URLS.map(async (_, index) => {
      try {
        const videos = await fetchPlaylistVideos(index);
        const playlistName = PLAYLIST_NAMES[index] || `Playlist ${index + 1}`;
        
        // Get the first video's thumbnail as the playlist thumbnail
        const thumbnailUrl = videos.length > 0 
          ? videos[0].thumbnail 
          : '/assets/images/placeholder-playlist.jpg';
        
        return {
          id: `playlist-${index}`,
          title: playlistName,
          description: `A collection of ${videos.length} festive window projections for your home`,
          thumbnailUrl,
          videos,
        };
      } catch (error) {
        console.error(`Error fetching playlist ${index}`, error);
        return null;
      }
    });
    
    // Wait for all playlist promises to resolve
    const playlists = await Promise.all(playlistPromises);
    
    // Filter out any null results
    const validPlaylists = playlists.filter(playlist => playlist !== null) as Playlist[];
    
    console.log(`Successfully fetched ${validPlaylists.length} playlists`);
    
    // Return placeholders if we didn't get any valid playlists
    if (validPlaylists.length === 0) {
      console.warn('No valid playlists fetched, using placeholders');
      return generatePlaceholderPlaylists();
    }
    
    return validPlaylists;
  } catch (error) {
    console.error('Error fetching all playlists:', error);
    return generatePlaceholderPlaylists();
  }
}

// Transform XML entry to VideoEntry object
export function transformVideoEntry(entry: any): VideoEntry {
  try {
    // Extract the video ID
    const videoId = entry['yt:videoId'] ? entry['yt:videoId'][0] : '';
    console.log(`Processing video ID: ${videoId}`);
    
    // Generate YouTube thumbnail URL - use hqdefault.jpg which is always available
    const thumbnailUrl = videoId 
      ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` 
      : '/assets/images/placeholder-video.jpg';
    
    console.log(`Generated thumbnail URL: ${thumbnailUrl}`);
    
    // Extract other properties
    const title = entry.title ? entry.title[0] : 'Unknown Title';
    const link = entry.link && entry.link[0] ? entry.link[0].$.href : '#';
    const published = entry.published ? new Date(entry.published[0]) : new Date();
    const updated = entry.updated ? new Date(entry.updated[0]) : new Date();
    
    // Extract description and media stats
    const mediaGroup = entry['media:group'] && entry['media:group'][0];
    const description = mediaGroup && mediaGroup['media:description'] 
      ? mediaGroup['media:description'][0] 
      : 'No description available';
    
    // Extract view count
    const mediaCommunity = mediaGroup && mediaGroup['media:community'] 
      ? mediaGroup['media:community'][0] 
      : null;
    const mediaStats = mediaCommunity && mediaCommunity['media:statistics'] 
      ? mediaCommunity['media:statistics'][0] 
      : null;
    const views = mediaStats && mediaStats.$ && mediaStats.$.views 
      ? parseInt(mediaStats.$.views, 10) 
      : 0;
    
    // Extract duration
    const mediaContent = mediaGroup && mediaGroup['media:content'] 
      ? mediaGroup['media:content'][0] 
      : null;
    const duration = mediaContent && mediaContent.$ && mediaContent.$.duration 
      ? mediaContent.$.duration 
      : '0';
    
    return {
      id: videoId || `generated-${Date.now()}`,
      title,
      link,
      published,
      updated,
      thumbnail: thumbnailUrl,
      description,
      views,
      duration,
    };
  } catch (error) {
    console.error('Error transforming video entry:', error);
    return {
      id: `error-${Date.now()}`,
      title: 'Error Loading Video',
      link: '#',
      published: new Date(),
      updated: new Date(),
      thumbnail: '/assets/images/placeholder-video.jpg',
      description: 'There was an error loading this video.',
      views: 0,
      duration: '0',
    };
  }
} 