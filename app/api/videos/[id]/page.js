import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getVideoById, createComment } from '../../../lib/api';
import VideoPlayer from '../../../components/VideoPlayer';
import CommentSection from '../../../components/CommentSection';

const VideoDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (id) {
      const fetchVideo = async () => {
        const data = await getVideoById(id);
        setVideo(data);
        setComments(data.comments);
      };
      fetchVideo();
    }
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const newComment = { text: commentText, user_id: 'anonymous' };
    const response = await createComment(id, newComment);
    setComments([...comments, response]);
    setCommentText('');
  };

  if (!video) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{video.title}</h1>
      <VideoPlayer url={video.url} />
      <CommentSection comments={comments} />
      <form onSubmit={handleCommentSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </div>
  );
};

export default VideoDetail;
