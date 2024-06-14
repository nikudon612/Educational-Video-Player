"use client";
import React, { useEffect, useState } from 'react';
import { getVideos } from '../lib/api';
import Link from 'next/link';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getVideos();
        setVideos(data);
      } catch (err) {
        setError('Failed to fetch videos');
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {videos.map(video => (
        <div key={video.id} className="p-4 border rounded shadow-sm">
          <h3 className="text-xl font-bold">
            <Link href={`/videos/${video.id}`}>{video.title}</Link>
          </h3>
          <p>{video.description}</p>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
