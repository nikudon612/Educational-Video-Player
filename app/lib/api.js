import axios from "axios";

const BASE_URL = "https://take-home-assessment-423502.uc.r.appspot.com/api";
export const user_id = "nick_bechtel"; // Assuming user_id is constant for the logged-in user
const possible_user_ids = ["nick_bechtel", "Kana", "Yoshi"]; // A list of pre-defined user IDs to allow view of all videos in this sample environment

// Function to create a new video
export const createVideo = async (title, description, videoUrl) => {
  try {
    const response = await axios.post(`${BASE_URL}/videos`, {
      user_id: user_id,
      title: title,
      description: description,
      video_url: videoUrl,
    });

    console.log("Created video successfully:", response.data);
    return response.data.video_url;
  } catch (error) {
    console.error("Error creating video:", error.message);
    throw error;
  }
};

// Function to fetch videos for a specific user
// In the future, I would like to add a parameter that allows to view ALL videos, not just the user's.
export const getVideos = async () => {
  try {
    const allVideos = [];

    for (const user_id of possible_user_ids) {
      try {
        const response = await axios.get(
          `${BASE_URL}/videos?user_id=${user_id}`,
          {
            headers: {
              accept: "application/json",
            },
          }
        );
        allVideos.push(...response.data.videos);
      } catch (error) {
        console.error(
          `Error fetching videos for user_id ${user_id}:`,
          error.response ? error.response.data : error.message
        );
      }
    }

    console.log("Fetched all videos successfully:", allVideos);
    return allVideos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

// Function to fetch a single video by its ID
export const getVideoById = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/videos/single?video_id=${id}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    console.log("Fetched video successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching video:", error);
    throw error;
  }
};

// Function to fetch comments for a specific video
export const getCommentsByVideoId = async (video_id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/videos/comments?video_id=${video_id}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    console.log("Fetched comments successfully:", response.data.comments);
    return response.data.comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

// Function to create a new comment for a video
export const createComment = async (video_id, content) => {
  try {
    const response = await axios.post(`${BASE_URL}/videos/comments`, {
      video_id: video_id,
      content: content,
      user_id: user_id,
    });

    console.log("Created comment successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error.message);
    throw error;
  }
};
