import { useState } from "react";
import App from "./App";
import TextSimilarity from "./components/TextSimilarity";
import ChatGPT from "./components/ChatGPT";

export default function AppWithTabs() {
  const [activeTab, setActiveTab] = useState("chatgpt");

  return (
    <div style={{ 
      width: "100%", 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column",
      background: "linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)"
    }}>
      {/* Tabs */}
      <div style={{ 
        display: "flex", 
        background: "rgba(0, 0, 0, 0.4)", 
        backdropFilter: "blur(10px)",
        padding: "15px 20px",
        gap: "12px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"
      }}>
        <button
          onClick={() => setActiveTab("chatgpt")}
          style={{
            padding: "12px 24px",
            background: activeTab === "chatgpt" 
              ? "linear-gradient(135deg, #10a37f 0%, #0d8a6a 100%)" 
              : "rgba(255, 255, 255, 0.1)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.95em",
            fontWeight: "500",
            transition: "all 0.3s ease",
            boxShadow: activeTab === "chatgpt" 
              ? "0 4px 15px rgba(16, 163, 127, 0.4)" 
              : "none"
          }}
        >
          🤖 AI Chat (ChatGPT Style)
        </button>
        <button
          onClick={() => setActiveTab("chat")}
          style={{
            padding: "12px 24px",
            background: activeTab === "chat" 
              ? "linear-gradient(135deg, #007AFF 0%, #0051D5 100%)" 
              : "rgba(255, 255, 255, 0.1)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.95em",
            fontWeight: "500",
            transition: "all 0.3s ease",
            boxShadow: activeTab === "chat" 
              ? "0 4px 15px rgba(0, 122, 255, 0.4)" 
              : "none"
          }}
        >
          🎤 Voice Assistant
        </button>
        <button
          onClick={() => setActiveTab("similarity")}
          style={{
            padding: "12px 24px",
            background: activeTab === "similarity" 
              ? "linear-gradient(135deg, #007AFF 0%, #0051D5 100%)" 
              : "rgba(255, 255, 255, 0.1)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.95em",
            fontWeight: "500",
            transition: "all 0.3s ease",
            boxShadow: activeTab === "similarity" 
              ? "0 4px 15px rgba(0, 122, 255, 0.4)" 
              : "none"
          }}
        >
          📊 Text Similarity
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {activeTab === "chatgpt" && <ChatGPT />}
        {activeTab === "chat" && <App />}
        {activeTab === "similarity" && <TextSimilarity />}
      </div>
    </div>
  );
}
