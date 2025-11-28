import { useState } from 'react';
import { checkTextSimilarity } from '../services/tensorflowService';

export default function TextSimilarity() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCheck = async () => {
        if (!text1 || !text2) {
            alert('Please enter both texts');
            return;
        }

        setLoading(true);
        try {
            const data = await checkTextSimilarity(text1, text2);
            setResult(data);
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            padding: '30px', 
            maxWidth: '700px', 
            margin: '0 auto',
            height: '100%',
            overflowY: 'auto'
        }}>
            <h2 style={{ 
                marginBottom: '30px',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #007AFF 0%, #00D4FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '2em'
            }}>
                🤖 AI Text Similarity Checker
            </h2>
            
            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '1.1em', marginBottom: '10px' }}>📝 Text 1:</label>
                <textarea
                    value={text1}
                    onChange={(e) => setText1(e.target.value)}
                    placeholder="Enter first text..."
                    style={{ 
                        width: '100%', 
                        padding: '15px', 
                        minHeight: '120px',
                        fontSize: '0.95em'
                    }}
                />
            </div>

            <div style={{ marginBottom: '25px' }}>
                <label style={{ fontSize: '1.1em', marginBottom: '10px' }}>📝 Text 2:</label>
                <textarea
                    value={text2}
                    onChange={(e) => setText2(e.target.value)}
                    placeholder="Enter second text..."
                    style={{ 
                        width: '100%', 
                        padding: '15px', 
                        minHeight: '120px',
                        fontSize: '0.95em'
                    }}
                />
            </div>

            <button 
                onClick={handleCheck}
                disabled={loading}
                style={{ 
                    width: '100%',
                    padding: '15px 20px',
                    background: loading 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : 'linear-gradient(135deg, #007AFF 0%, #0051D5 100%)',
                    color: 'white',
                    fontSize: '1.05em',
                    fontWeight: '600',
                    boxShadow: loading ? 'none' : '0 4px 15px rgba(0, 122, 255, 0.4)'
                }}
            >
                {loading ? '⏳ Analyzing...' : '🔍 Check Similarity'}
            </button>

            {result && (
                <div style={{ 
                    marginTop: '30px', 
                    padding: '25px', 
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}>
                    <h3 style={{ 
                        marginBottom: '20px',
                        fontSize: '1.5em',
                        color: '#fff'
                    }}>
                        📊 Result:
                    </h3>
                    <p style={{ 
                        fontSize: '1.8em', 
                        fontWeight: 'bold',
                        color: '#fff',
                        marginBottom: '15px',
                        textAlign: 'center'
                    }}>
                        {result.percentage}
                    </p>
                    <div style={{ 
                        width: '100%', 
                        height: '30px', 
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        border: '2px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        <div style={{
                            width: result.percentage,
                            height: '100%',
                            background: parseFloat(result.similarity) > 0.7 
                                ? 'linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)' 
                                : parseFloat(result.similarity) > 0.4 
                                ? 'linear-gradient(90deg, #FFC107 0%, #FFD54F 100%)' 
                                : 'linear-gradient(90deg, #F44336 0%, #FF6B6B 100%)',
                            transition: 'width 0.5s ease',
                            boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
                        }} />
                    </div>
                    <p style={{ 
                        marginTop: '15px',
                        textAlign: 'center',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.9em'
                    }}>
                        {parseFloat(result.similarity) > 0.7 
                            ? '✅ High Similarity' 
                            : parseFloat(result.similarity) > 0.4 
                            ? '⚠️ Moderate Similarity' 
                            : '❌ Low Similarity'}
                    </p>
                </div>
            )}
        </div>
    );
}
