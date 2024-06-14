import React from 'react';
import CommentSection from './CommentSection'; // Assuming you have implemented this component

const VideoDetail = ({ video }) => {
  return (
    <div className="space-y-4">
      <h2>{video.title}</h2>
      <p>{video.description}</p>
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          className="embed-responsive-item"
          src={video.video_url}
          title={video.title}
          allowFullScreen
        ></iframe>
      </div>
      <CommentSection videoId={video.id} />
    </div>
  );
};

export default VideoDetail;
