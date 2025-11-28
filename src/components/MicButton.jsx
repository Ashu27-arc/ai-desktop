export default function MicButton({ listening }) {
  return (
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        background: listening 
          ? "linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%)" 
          : "linear-gradient(135deg, #007AFF 0%, #0051D5 100%)",
        margin: "0 auto",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2em",
        boxShadow: listening 
          ? "0 0 30px rgba(255, 59, 48, 0.6), 0 0 60px rgba(255, 59, 48, 0.4)" 
          : "0 4px 20px rgba(0, 122, 255, 0.4)",
        animation: listening ? "pulse 1.5s infinite" : "none",
        cursor: "pointer",
        transform: listening ? "scale(1.1)" : "scale(1)"
      }}
    >
      {listening ? "🎤" : "🎙️"}
    </div>
  );
}
