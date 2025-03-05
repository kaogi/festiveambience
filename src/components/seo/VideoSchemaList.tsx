import React from 'react';
import { VideoEntry } from '@/types';
import VideoSchema from './VideoSchema';

interface VideoSchemaListProps {
  videos: VideoEntry[];
}

const VideoSchemaList = ({ videos }: VideoSchemaListProps) => {
  return (
    <>
      {videos.map((video) => (
        <VideoSchema key={video.id} video={video} />
      ))}
    </>
  );
};

export default VideoSchemaList; 