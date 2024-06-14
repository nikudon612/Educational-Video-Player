"use client";
import React, { useState, useEffect } from "react";
import { getCommentsByVideoId, createComment } from "../lib/api";

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [videoId]); // Fetch comments whenever videoId changes

  const fetchComments = async () => {
    try {
      setLoading(true);
      const fetchedComments = await getCommentsByVideoId(videoId);
      setComments(fetchedComments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createComment(videoId, newCommentText);
      setNewCommentText(""); // Clear input field after successful submission
      fetchComments(); // Refresh comments after new comment is posted
    } catch (error) {
      setError("Error creating comment. Please try again.");
      console.error("Error creating comment:", error);
    }
  };

  const renderCommentTitle = () => {
    if (loading) {
      return "Loading comments...";
    }
    if (comments.length === 0) {
      return "No Comments Currently";
    }
    if (comments.length === 1) {
      return "1 Comment";
    }
    return `${comments.length} Comments`;
  };

  return (
    <div className="space-y-4 mt-4">
      <h3 className="font-bold text-xl">{renderCommentTitle()}</h3>
      {!loading &&
        comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4 mt-4">
            {/* <div className="flex-shrink-0">
              <img
                className="w-10 h-10 rounded-full"
                src={`https://i.pravatar.cc/150?u=${comment.user_id}`}
                alt={comment.user_id}
              />
            </div> */}
            <div>
              <p className="text-gray-700 font-semibold">{comment.user_id}</p>
              <p className="text-gray-600">{comment.content}</p>
            </div>
          </div>
        ))}
      <form onSubmit={handleSubmit} className="mt-6">
        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Add a comment..."
          required
        ></textarea>
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Post Comment
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CommentSection;
