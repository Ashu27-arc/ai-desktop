export default function ChatBubble({ text, sent }) {
  return (
    <div
      style={{
        alignSelf: sent ? "flex-end" : "flex-start",
        padding: "12px 16px",
        background: sent 
          ? "linear-gradient(135deg, #007AFF 0%, #0051D5 100%)" 
          : "rgba(255, 255, 255, 0.1)",
        borderRadius: sent ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        margin: "8px 0",
        maxWidth: "75%",
        color: "white",
        fontSize: "0.95em",
        lineHeight: "1.5",
        boxShadow: sent 
          ? "0 4px 12px rgba(0, 122, 255, 0.3)" 
          : "0 2px 8px rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(10px)",
        border: sent ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
        animation: "slideIn 0.3s ease-out"
      }}
    >
      {text}
    </div>
  );
}
