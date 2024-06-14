"use client";
import React, { useState, useEffect } from 'react';
import { getCommentsByVideoId, createComment } from '../lib/api';

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [videoId]); // Fetch comments whenever videoId changes

  const fetchComments = async () => {
    try {
      const fetchedComments = await getCommentsByVideoId(videoId);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createComment(videoId, newCommentText);
      setNewCommentText(''); // Clear input field after successful submission
      fetchComments(); // Refresh comments after new comment is posted
    } catch (error) {
      setError('Error creating comment. Please try again.');
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <h3 className='font-bold text-xl'>Comments</h3>
      {comments.length === 0 && <p>No comments yet.</p>}
      {comments.map(comment => (
        <div key={comment.id} className="p-2 border rounded">
          <p>{comment.content}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <textarea
          value={newCommentText}
          onChange={e => setNewCommentText(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Add a comment..."
          required
        ></textarea>
        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
          Post Comment
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CommentSection;
