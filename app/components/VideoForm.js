"use client";
import React, { useState } from 'react';
import { createVideo } from '../lib/api';

const VideoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const videoData = { title, description, url, user_id: 'your_name' };
      await createVideo(videoData);
      setTitle('');
      setDescription('');
      setUrl('');
    } catch (err) {
      setError('Failed to create video');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow-sm">
      {error && <p className="text-red-500">{error}</p>}
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
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Add Video</button>
    </form>
  );
};

export default VideoForm;
