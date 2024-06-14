"use client";
import React, { useState, useEffect } from "react";
import { createVideo, getVideos } from "../lib/api";

const VideoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos(); // Fetch videos initially
  }, []);

  const fetchVideos = async () => {
    try {
      const fetchedVideos = await getVideos("nick_bechtel"); // Replace with your user_id
      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state
    setSuccess(null); // Reset success state

    if (!title || !description || !url) {
      setError("All fields are required.");
      return;
    }

    try {
      const createdVideo = await createVideo(title, description, url);
      console.log("Created video successfully:", createdVideo);

      // Update videos list after successful creation
      fetchVideos();

      // Show success message
      setSuccess("Video created successfully!");

      // Optionally, reset form fields
      setTitle("");
      setDescription("");
      setUrl("");
    } catch (error) {
      setError("Error creating video. Please try again."); // Handle specific error messages as needed
      console.error("Error creating video:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <input
          className="w-full p-2 border rounded text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          className="w-full p-2 border rounded text-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        ></textarea>
        <input
          className="w-full p-2 border rounded text-black"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Video URL"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Add Video
        </button>
      </form>
    </div>
  );
};

export default VideoForm;
