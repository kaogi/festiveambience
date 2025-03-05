// Types pour les vidéos YouTube
export interface VideoEntry {
  id: string;
  title: string;
  link: string;
  published: Date;
  updated: Date;
  thumbnail: string;
  description: string;
  views: number;
  duration: string;
}

// Types pour les playlists YouTube
export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videos: VideoEntry[];
  url?: string; // URL vers la playlist YouTube
}

// Types pour les éléments interactifs
export interface ProjectionAsset {
  id: string;
  name: string;
  src: string;
  category: string;
}

// Types pour les jeux
export interface GameScore {
  userId: string;
  username: string;
  score: number;
  timestamp: Date;
}

// Types pour les effets saisonniers
export type Season = 'christmas' | 'halloween' | 'easter' | 'thanksgiving' | 'standard';

export interface SeasonalTheme {
  season: Season;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  particles: string;
}

export interface ProjectionOption {
  id: string;
  name: string;
  imagePath: string;
  description: string;
  category: string;
} 