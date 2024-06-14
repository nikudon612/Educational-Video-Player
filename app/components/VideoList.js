"use client";
import React, { useEffect, useState } from "react";
import { getVideos } from "../lib/api";
import Link from "next/link";

const extractVideoId = (url) => {
  if (!url) return null; // Ensure the URL is defined
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
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
      {videos.map((video, index) => {
        const videoId = extractVideoId(video.video_url);
        const thumbnailUrl = videoId
          ? `https://img.youtube.com/vi/${videoId}/0.jpg`
          : video.thumbnailUrl;

        // Logging the values for debugging
        console.log("Video URL:", video.videoUrl);
        console.log("Extracted Video ID:", videoId);
        console.log("Thumbnail URL:", thumbnailUrl);

        return (
          <Link key={index} href={`/videos/${index}`} passHref>
            <div className="p-4 my-6 border rounded shadow-sm cursor-pointer">
              <img
                src={thumbnailUrl}
                alt={video.title}
                className="w-[500px] h-[500px] object-cover"
                onError={(e) => {
                  console.log("Image failed to load:", e.target.src);
                  e.target.src = "/path/to/fallback-thumbnail.jpg"; // Set a fallback thumbnail URL
                }}
              />
              <h3 className="text-xl font-bold">{video.title}</h3>
              <p>{video.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default VideoList;
