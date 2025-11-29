import { useState, useEffect } from "react";
import ChatBubble from "./components/ChatBubble";
import MicButton from "./components/MicButton";
import { API } from "./services/api";

export default function App() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your voice assistant. You can type or use voice to talk with me!", sent: false },
  ]);
  const [listening, setListening] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const addMessage = (text, sent) => {
    setMessages((m) => [...m, { text, sent }]);
  };

  const sendMessage = async (userMessage) => {
    if (!userMessage.trim() || loading) return;

    addMessage(userMessage, true);
    setLoading(true);

    try {
      // Build conversation history for context
      const conversationHistory = messages
        .slice(-10) // Last 10 messages for context
        .map(msg => ({
          role: msg.sent ? 'user' : 'assistant',
          content: msg.text
        }));

      const res = await API.post("/chat", {
        message: userMessage,
        conversationHistory
      });

      // Handle action commands (like open YouTube)
      if (res.data.action) {
        const action = res.data.action;
        
        if (action.startsWith('open:')) {
          const target = action.split(':')[1];
          let url = '';
          
          switch(target) {
            case 'youtube':
              url = 'https://www.youtube.com';
              break;
            case 'google':
              url = 'https://www.google.com';
              break;
            case 'facebook':
              url = 'https://www.facebook.com';
              break;
            case 'twitter':
              url = 'https://www.twitter.com';
              break;
            case 'instagram':
              url = 'https://www.instagram.com';
              break;
            default:
              url = `https://www.${target}.com`;
          }
          
          // Open URL in default browser
          if (window.electronAPI && window.electronAPI.openExternal) {
            window.electronAPI.openExternal(url);
          } else {
            window.open(url, '_blank');
          }
        }
      }

      addMessage(res.data.reply, false);
      
      // Speak the response
      if (window.electronAPI && window.electronAPI.speak) {
        window.electronAPI.speak(res.data.reply);
      }
    } catch (error) {
      console.error("API error:", error);
      addMessage("❌ Failed to connect to backend", false);
    } finally {
      setLoading(false);
    }
  };

  const handleTextSubmit = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit();
    }
  };

  const startRecording = async () => {
    try {
      setListening(true);
      addMessage("🎤 Listening...", true);

      setTimeout(async () => {
        try {
          // For now, send a test message since STT is not fully implemented
          // In future, this will transcribe actual audio
          const testMessage = "Tell me a joke";
          
          setListening(false);
          await sendMessage(testMessage);
        } catch (error) {
          console.error("Recording error:", error);
          addMessage("❌ Failed to process voice", false);
          setListening(false);
        }
      }, 1500);
    } catch (error) {
      console.error("Recording error:", error);
      addMessage("❌ Failed to start recording", false);
      setListening(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        background: "transparent",
      }}
    >
      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          marginBottom: "15px"
        }}
      >
        {messages.map((m, i) => (
          <ChatBubble key={i} text={m.text} sent={m.sent} />
        ))}
        {loading && (
          <div style={{
            alignSelf: "flex-start",
            padding: "10px 15px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "15px",
            color: "#fff",
            fontSize: "0.9em",
            marginTop: "10px"
          }}>
            ⏳ Thinking...
          </div>
        )}
      </div>

      {/* Text Input */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "15px",
        padding: "10px",
        background: "rgba(0, 0, 0, 0.3)",
        borderRadius: "12px",
        backdropFilter: "blur(10px)"
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message... (Press Enter)"
          disabled={loading || listening}
          style={{
            flex: 1,
            padding: "10px 15px",
            borderRadius: "8px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            background: "rgba(255, 255, 255, 0.05)",
            color: "#fff",
            fontSize: "0.9em",
            outline: "none",
            fontFamily: "inherit"
          }}
        />
        <button
          onClick={handleTextSubmit}
          disabled={!input.trim() || loading || listening}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: (!input.trim() || loading || listening)
              ? "rgba(255, 255, 255, 0.2)"
              : "linear-gradient(135deg, #007AFF 0%, #0051D5 100%)",
            color: "#fff",
            fontSize: "0.9em",
            fontWeight: "600",
            cursor: (!input.trim() || loading || listening) ? "not-allowed" : "pointer",
            transition: "all 0.3s ease"
          }}
        >
          {loading ? "⏳" : "📤"}
        </button>
      </div>

      {/* Voice Button */}
      <div style={{ 
        textAlign: "center", 
        padding: "15px",
        background: "rgba(0, 0, 0, 0.3)",
        borderRadius: "15px",
        backdropFilter: "blur(10px)"
      }}>
        <div onClick={startRecording} style={{ cursor: "pointer" }}>
          <MicButton listening={listening} />
        </div>
        <p style={{ 
          color: "rgba(255, 255, 255, 0.9)", 
          marginTop: 10,
          fontSize: "0.85em",
          fontWeight: "500"
        }}>
          {listening ? "🎤 Listening..." : "Or tap to speak"}
        </p>
      </div>
    </div>
  );
}
