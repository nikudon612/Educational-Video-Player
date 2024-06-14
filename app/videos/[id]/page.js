import { getVideoById } from "../../lib/api"; // Adjust the path as needed

const extractVideoId = (url) => {
  if (!url) return null;
  const regExp =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const VideoDetail = async ({ params }) => {
  const { id } = params;
  console.log("Video ID:", id);
  let video;

  try {
    const response = await getVideoById(id);
    console.log("Fetched Single Video:", response);
    video = response.video;
  } catch (error) {
    console.error("Failed to fetch video:", error);
    return <p>Failed to fetch video data.</p>;
  }

  if (!video) {
    return <p>Video not found</p>;
  }

  const videoId = extractVideoId(video.video_url);
  console.log("Extracted Video ID:", videoId);

  if (!videoId) {
    return <p>Invalid video URL</p>;
  }

  return (
    <div className="p-4">
      <div className="my-4">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={video.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <p className="text-[12px]">{video.description}</p>
        <p className="text-[14px] font-semibold text-gray-500">{video.user_id}</p>
      </div>
    </div>
  );
};

export default VideoDetail;
