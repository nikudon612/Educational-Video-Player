"use client";
import React, { useEffect, useState } from "react";
import { getVideos } from "../lib/api";
import Link from "next/link";

const extractVideoId = (url) => {
  if (!url) return null; // Ensure the URL is defined
  const regExp =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
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
      <div className="grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4 gap-4">
        {videos.map((video) => {
          const videoId = extractVideoId(video.video_url);
          const thumbnailUrl = videoId
            ? `https://img.youtube.com/vi/${videoId}/0.jpg`
            : video.thumbnailUrl;

          // Logging the values for debugging
          console.log("Video URL:", video.video_url);
          console.log("Extracted Video ID:", videoId);
          console.log("Thumbnail URL:", thumbnailUrl);

          return (
            <Link key={video.id} href={`/videos/${video.id}`} passHref>
              <div className="w-full">
                <div className="relative pb-[56.25%] overflow-hidden rounded-lg">
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    onError={(e) => {
                      console.log("Image failed to load:", e.target.src);
                      e.target.src = "/path/to/fallback-thumbnail.jpg"; // Set a fallback thumbnail URL
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-lg font-bold">{video.title}</h3>
                  <p className="text-sm text-gray-500">{video.user_id}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VideoList;
