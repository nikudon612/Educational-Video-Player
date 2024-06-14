import React from 'react';
import VideoDetail from '../../components/VideoDetail'; // Adjust the path as necessary

// Fetch video data server-side
const fetchVideoData = async (id) => {
  const res = await fetch(`https://your-api.com/videos/${id}`);
  const video = await res.json();
  return video;
};

const VideoPage = async ({ params }) => {
  const { id } = params;
  const video = await fetchVideoData(id);

  return (
    <div>
      <VideoDetail video={video} />
    </div>
  );
};

export default VideoPage;
