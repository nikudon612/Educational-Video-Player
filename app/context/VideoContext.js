"use client"; // This directive tells Next.js to treat this file as a Client Component

import { createContext, useContext, useState } from 'react';

const VideoContext = createContext();

export const useVideo = () => {
  return useContext(VideoContext);
};

export const VideoProvider = ({ children }) => {
  const [video, setVideo] = useState(null);

  return (
    <VideoContext.Provider value={{ video, setVideo }}>
      {children}
    </VideoContext.Provider>
  );
};
