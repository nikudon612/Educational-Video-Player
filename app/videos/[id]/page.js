import { getVideoById } from "../../lib/api"; // Adjust the path as needed
import CommentSection from "../../components/CommentSection"; // Adjust the path as needed

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
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <iframe
          width="100%"
          height="500px"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={video.title}
          frameBorder="0"
          allowFullScreen
          className="rounded-lg"
        ></iframe>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">{video.title}</h1>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">{video.user_id}</p>
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4">
          <p className="text-sm">{video.description}</p>
        </div>
      </div>
      <CommentSection videoId={id} />
    </div>
  );
};

export default VideoDetail;
