import axios from "axios";

const BASE_URL = "https://take-home-assessment-423502.uc.r.appspot.com/api";

const user_id = "nick_bechtel";

// Function to create a new video
export const createVideo = async (user_id, title, description, video_url) => {
  try {
    const response = await axios.post(`${BASE_URL}/videos`, {
      user_id: user_id,
      title: title,
      description: description,
      video_url: video_url,
    });

    console.log("Created video successfully:", response.data);
    return response.data; // Return the created video object or success message
  } catch (error) {
    console.error("Error creating video:", error.message);
    throw error; // Throw the error to handle it further up the call chain
  }
};

// Function to fetch videos for a specific user
export const getVideos = async (user_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/videos?user_id=${user_id}`, {
      headers: {
        accept: "application/json",
      },
    });
    console.log("Fetched videos successfully:", response.data.videos);
    return response.data.videos; // Return the videos array
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
