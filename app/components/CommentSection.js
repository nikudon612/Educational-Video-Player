import React from 'react';

const CommentSection = ({ comments }) => {
  return (
    <div className="space-y-4 mt-4">
      {comments.map(comment => (
        <div key={comment.id} className="p-2 border rounded">
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
