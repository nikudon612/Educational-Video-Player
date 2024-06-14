// test-api.js
const axios = require('axios');

const API_BASE_URL = 'https://take-home-assessment-423502.uc.r.appspot.com/api';
const USER_ID = 'nick_bechtel';  // Replace with your own user_id in snake_case

// Function to fetch all videos for a specific user
const fetchVideos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/videos`, {
      params: {
        user_id: USER_ID,
      },
    });
    console.log('Fetched videos successfully:', response.data.videos);
    return response.data.videos; // Assuming the videos are under 'videos' key in the response
  } catch (error) {
    console.error('Error fetching videos:', error.message);
    throw error;
  }
};


// Function to create a new video
const createVideo = async (videoData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/videos`, {
      ...videoData,
      user_id: USER_ID,
    });
    console.log('Created video successfully:', response.data);
    return response.data; // Assuming the API responds with a success message or created video object
  } catch (error) {
    console.error('Error creating video:', error.message);
    throw error;
  }
};

// Example usage
const main = async () => {
  try {
    // Fetch all videos
    const videos = await fetchVideos();
    console.log('Retrieved videos:', videos);

    // Create a new video (example video data)
    const newVideoData = {
      description: 'Test video description',
      video_url: 'https://www.youtube.com/watch?v=abc123',
      title: 'Test Video Title',
    };
    const createdVideo = await createVideo(newVideoData);
    console.log('Created video:', createdVideo);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Run the main function
main();
