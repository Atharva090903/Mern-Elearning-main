import React, { useState, useEffect } from "react";
import "./Chatbot.css"; // Import CSS for Chatbot styles

const Chatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setResponse("Hello! How can I assist you today?");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
  
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
  
      const data = await res.json();
      setResponse(data.text);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  return (
    <div className="chatbot">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask a question..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
      {loading ? <p>Loading...</p> : <p>{response}</p>}
    </div>
  );
};

export default Chatbot;
