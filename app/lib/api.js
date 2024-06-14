import axios from "axios";

const BASE_URL = "https://take-home-assessment-423502.uc.r.appspot.com/api";
const user_id = "nick_bechtel"; // Assuming user_id is constant for the logged-in user

// Function to create a new video
export const createVideo = async (title, description, videoUrl) => {
  try {
    const response = await axios.post(`${BASE_URL}/videos`, {
      user_id: user_id, // Ensure user_id is correctly set if needed
      title: title,
      description: description,
      video_url: videoUrl, // Ensure property name matches API endpoint
    });

    console.log("Created video successfully:", response.data);
    return response.data.video_url; // Return the created video URL from response if available
  } catch (error) {
    console.error("Error creating video:", error.message);
    throw error; // Throw the error to handle it further up the call chain
  }
};

// Function to fetch videos for a specific user
export const getVideos = async () => {
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
