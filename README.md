# Festive Window Projections Website

A modern, interactive website for the "Festive Window Projections" YouTube channel, showcasing festive window projection videos for various holidays and seasons.

## Features

- **Video Showcase**: Browse and watch festive window projection videos organized by season and theme
- **Playlist Organization**: Explore curated playlists of related projection videos
- **Interactive Tools**:
  - 3D Window Visualizer: See how projections look on a window in 3D
  - Festive Catch Game: Fun mini-game with seasonal themes
  - Projection Creator: Create custom window projections by combining elements

## Technology Stack

- **Frontend**: Next.js 14+ with React 18+ and TypeScript
- **Styling**: TailwindCSS for responsive design
- **Animations**: Framer Motion for smooth animations and transitions
- **3D Rendering**: Three.js with React Three Fiber for 3D visualizations
- **API Integration**: YouTube Data API and RSS feeds for video content

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/festive-ambience.git
   cd festive-ambience
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: Reusable React components
  - `layout`: Layout components (Header, Footer, etc.)
  - `video`: Video-related components (VideoCard, VideoGrid, etc.)
  - `interactive`: Interactive components (WindowVisualizer, FestiveGame, etc.)
  - `ui`: UI components (Button, Card, etc.)
  - `seo`: SEO components (MetaTags, StructuredData, etc.)
- `src/lib`: Utility functions and API integrations
  - `api`: API integration functions
  - `hooks`: Custom React hooks
  - `utils`: Utility functions
- `src/types`: TypeScript type definitions
- `public/assets`: Static assets (images, models, fonts)

## Deployment

This project is configured for easy deployment on Vercel:

```bash
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Three.js](https://threejs.org/)
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
