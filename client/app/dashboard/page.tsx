"use client";

import { useState } from "react";

export default function Dashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState("Happy");
  const [calmMode, setCalmMode] = useState(false);

  const addPost = () => {
    if (!content) return;

    const newPost = {
      content,
      emotion,
      id: Date.now()
    };

    setPosts([newPost, ...posts]);
    setContent("");
  };

  return (
    <div className="container">
      <h2>Create Post</h2>

      <textarea
        placeholder="Share your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <select
        value={emotion}
        onChange={(e) => setEmotion(e.target.value)}
      >
        <option>Happy</option>
        <option>Sad</option>
        <option>Anxious</option>
        <option>Angry</option>
      </select>

      <button onClick={addPost}>Post</button>

      <br /><br />

      <button onClick={() => setCalmMode(true)}>
        🌿 Calm Mode
      </button>

      <h2>Community Feed</h2>

      {posts.map((post) => (
        <div key={post.id} className="card">
          <p>{post.content}</p>
          <small>{post.emotion}</small>
        </div>
      ))}
      {calmMode && (
  <div style={{
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  }}>
    <div style={{
      background: "#111",
      padding: "40px",
      borderRadius: "20px",
      textAlign: "center",
      color: "#00ff88",
      boxShadow: "0 0 40px #00ff88"
    }}>
      <h2>Breathe In… 🌊</h2>
      <p>Inhale 4s • Hold 4s • Exhale 4s</p>
      <button onClick={() => setCalmMode(false)}>Close</button>
    </div>
  </div>
)}
    </div>
  );
}