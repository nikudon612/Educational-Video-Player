"use client";
import React, { useEffect, useState } from "react";
import { getVideos } from "../lib/api";
import Link from "next/link";

const extractVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getVideos();
        setVideos(data);
      } catch (err) {
        setError("Failed to fetch videos");
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="space-y-4 my-8">
      {error && <p className="text-red-500">{error}</p>}
      {videos.map((video) => {
        const videoId = extractVideoId(video.video_url);
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

        return (
          <Link key={video.id} href={`/videos/${video.id}`} passHref>
            <div key={video.id} className="p-4 my-6 border rounded shadow-sm">
              <img src={thumbnailUrl} alt={video.title} className="w-[500px] h-[500px]" />
              <h3 className="text-xl font-bold">
                <Link href={`${video.video_url}`}>{video.title}</Link>
              </h3>
              <p>{video.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default VideoList;
