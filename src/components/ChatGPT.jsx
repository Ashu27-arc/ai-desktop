import { useState, useRef, useEffect } from 'react';
import { API } from '../services/api';

export default function ChatGPT() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        
        // Add user message
        const newMessages = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setLoading(true);

        try {
            // Build conversation history for context (last 10 messages)
            const conversationHistory = newMessages
                .slice(-10)
                .map(msg => ({
                    role: msg.role,
                    content: msg.content
                }));

            const response = await API.post('/chat', { 
                message: userMessage,
                conversationHistory 
            });
            
            // Handle action commands (like open YouTube)
            if (response.data.action) {
                const action = response.data.action;
                
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
            
            // Add AI response
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: response.data.reply 
            }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: '❌ Sorry, I encountered an error. Please try again.' 
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            background: 'linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)',
        }}>
            {/* Header */}
            <div style={{
                padding: '20px',
                background: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center'
            }}>
                <h2 style={{
                    margin: 0,
                    background: 'linear-gradient(135deg, #007AFF 0%, #00D4FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '1.8em'
                }}>
                    💬 AI Chat Assistant
                </h2>
            </div>

            {/* Messages */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
            }}>
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: 'flex',
                            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            animation: 'slideIn 0.3s ease'
                        }}
                    >
                        <div style={{
                            maxWidth: '70%',
                            padding: '12px 18px',
                            borderRadius: '18px',
                            background: msg.role === 'user'
                                ? 'linear-gradient(135deg, #007AFF 0%, #0051D5 100%)'
                                : 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: msg.role === 'assistant' 
                                ? '1px solid rgba(255, 255, 255, 0.2)' 
                                : 'none',
                            boxShadow: msg.role === 'user'
                                ? '0 4px 15px rgba(0, 122, 255, 0.3)'
                                : '0 4px 15px rgba(0, 0, 0, 0.2)',
                            color: '#fff',
                            fontSize: '0.95em',
                            lineHeight: '1.5',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word'
                        }}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                
                {loading && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start'
                    }}>
                        <div style={{
                            padding: '12px 18px',
                            borderRadius: '18px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#fff',
                            fontSize: '0.95em'
                        }}>
                            <span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>
                                ⏳ Thinking...
                            </span>
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
                padding: '20px',
                background: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-end'
                }}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message... (Press Enter to send)"
                        disabled={loading}
                        style={{
                            flex: 1,
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#fff',
                            fontSize: '0.95em',
                            resize: 'none',
                            minHeight: '50px',
                            maxHeight: '150px',
                            fontFamily: 'inherit',
                            outline: 'none',
                            transition: 'border-color 0.3s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || loading}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '12px',
                            border: 'none',
                            background: loading || !input.trim()
                                ? 'rgba(255, 255, 255, 0.2)'
                                : 'linear-gradient(135deg, #007AFF 0%, #0051D5 100%)',
                            color: '#fff',
                            fontSize: '1em',
                            fontWeight: '600',
                            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: loading || !input.trim() 
                                ? 'none' 
                                : '0 4px 15px rgba(0, 122, 255, 0.4)',
                            minWidth: '80px'
                        }}
                    >
                        {loading ? '⏳' : '📤 Send'}
                    </button>
                </div>
                <p style={{
                    margin: '10px 0 0 0',
                    fontSize: '0.8em',
                    color: 'rgba(255, 255, 255, 0.5)',
                    textAlign: 'center'
                }}>
                    Powered by Groq AI • Press Enter to send, Shift+Enter for new line
                </p>
            </div>
        </div>
    );
}
