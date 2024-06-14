"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CommentSection from "../../components/CommentSection";

export default function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (id !== undefined) {
      const storedVideos = JSON.parse(localStorage.getItem("videos")) || [];
      const videoData = storedVideos[parseInt(id)];
      setVideo(videoData);

      // Fetch comments from local storage
      const storedComments = JSON.parse(localStorage.getItem(`comments-${id}`)) || [];
      setComments(storedComments);
    }
  }, [id]);

  const addComment = (comment) => {
    const newComments = [...comments, comment];
    setComments(newComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(newComments));
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={video.video_url}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <p className="mt-4">{video.description}</p>
      <CommentSection comments={comments} addComment={addComment} />
    </div>
  );
}
