# 🖥️ AI Desktop Assistant

Electron-based desktop AI assistant with ChatGPT-style chat, voice interaction, and TensorFlow text analysis.

## ✨ Features

### 🤖 AI Chat (ChatGPT Style)
- Text-based conversation with AI
- Powered by Groq AI (Llama 3.3 70B)
- Beautiful gradient UI
- Message history
- Real-time responses
- Press Enter to send

### 🎤 Voice Assistant
- Voice input/output
- Hands-free interaction
- Speech-to-text
- Text-to-speech responses
- Tap & speak interface

### 📊 Text Similarity (TensorFlow)
- Compare two texts using AI
- Universal Sentence Encoder
- Similarity percentage (0-100%)
- Visual progress bar
- Real-time analysis

## 📦 Installation

```bash
npm install
```

## ⚙️ Configuration

### Backend API URL
Edit `src/services/api.js`:
```javascript
export const API = axios.create({
    baseURL: "http://192.168.1.23:5000", // Your backend IP
});
```

**To find your IP:**
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

## 🚀 Running the App

### Development Mode (Recommended)
```bash
npm run electron:dev
```
This starts both Vite dev server and Electron app.

### Manual Start
```bash
# Terminal 1: Start Vite dev server
npm run dev

# Terminal 2: Start Electron
npm run electron
```

### Production Build
```bash
npm run build
npm run electron:build
```

## 🎯 How to Use

### 1. Start Backend First
```bash
cd ../ai-backend
npm start
```
Wait for "Model loaded successfully!"

### 2. Launch Desktop App
```bash
npm run electron:dev
```

### 3. Choose a Tab

**🤖 AI Chat (ChatGPT Style)**
- Type your message
- Press Enter or click Send
- Get AI responses instantly

**🎤 Voice Assistant**
- Click the microphone
- Speak your command
- Get voice response

**📊 Text Similarity**
- Enter two texts
- Click "Check Similarity"
- See similarity percentage

## 📁 Project Structure

```
ai-desktop/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── ChatGPT.jsx         # ChatGPT-style chat
│   │   ├── TextSimilarity.jsx  # Text comparison
│   │   ├── ChatBubble.jsx      # Chat message bubble
│   │   └── MicButton.jsx       # Voice button
│   ├── services/
│   │   ├── api.js              # Axios config
│   │   └── tensorflowService.js # TensorFlow API calls
│   ├── App.jsx                 # Voice assistant
│   ├── AppWithTabs.jsx         # Main app with tabs
│   ├── main.jsx                # React entry
│   └── index.css               # Global styles
├── electron.js          # Electron main process
├── preload.js          # Electron preload script
├── package.json
└── README.md           # This file
```

## 🎨 UI Features

### Modern Design
- Gradient backgrounds
- Glassmorphism effects
- Smooth animations
- Responsive layout
- Dark theme

### Animations
- Slide-in messages
- Pulse effects
- Smooth transitions
- Loading states

## 🔧 Customization

### Change Backend URL
Edit `src/services/api.js`:
```javascript
baseURL: "http://YOUR_IP:5000"
```

### Change Colors
Edit `src/index.css` or component styles:
```css
background: linear-gradient(135deg, #007AFF 0%, #00D4FF 100%);
```

### Change Window Size
Edit `electron.js`:
```javascript
const win = new BrowserWindow({
  width: 1200,  // Change width
  height: 800,  // Change height
});
```

## 🧪 Testing

### Test Backend Connection
Open browser console (F12) and check:
```javascript
// Should see API calls in Network tab
// Check for errors in Console tab
```

### Test Features
1. **AI Chat**: Type "Hello" and press Enter
2. **Voice**: Click mic and speak
3. **Similarity**: Enter two texts and compare

## 🐛 Troubleshooting

### App won't start?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run electron:dev
```

### Can't connect to backend?
1. Check backend is running: `http://192.168.1.23:5000`
2. Verify IP in `src/services/api.js`
3. Check browser console (F12) for errors
4. Test backend: `curl http://192.168.1.23:5000/chat`

### Electron window blank?
1. Check Vite dev server is running (port 5173)
2. Open DevTools: View → Toggle Developer Tools
3. Check console for errors

### Voice not working?
1. Check microphone permissions
2. Test in browser first
3. Check browser console for errors

## 📊 Performance

- **App Size**: ~150MB (with Electron)
- **Memory Usage**: ~100-200MB
- **Startup Time**: 2-3 seconds
- **Response Time**: < 1 second

## 🔐 Security

- ✅ Context isolation enabled
- ✅ Node integration disabled
- ✅ Preload script for IPC
- ✅ No eval() or remote code execution

## 🚀 Building for Production

### Windows
```bash
npm run electron:build
# Output: dist/win-unpacked/
```

### Mac
```bash
npm run electron:build
# Output: dist/mac/
```

### Linux
```bash
npm run electron:build
# Output: dist/linux-unpacked/
```

## 📦 Dependencies

### Main
- `electron` - Desktop framework
- `react` - UI library
- `vite` - Build tool
- `axios` - HTTP client

### Dev
- `@vitejs/plugin-react` - React plugin
- `electron-builder` - App packager

## 🎯 Keyboard Shortcuts

- `Enter` - Send message (in chat)
- `Shift+Enter` - New line (in chat)
- `Ctrl+R` - Reload app
- `Ctrl+Shift+I` - Open DevTools
- `Ctrl+Q` - Quit app

## 📝 Notes

- Backend must be running first
- First message may take 1-2 seconds
- Voice features require microphone access
- TensorFlow runs on backend, not desktop

## 🆘 Support

Issues? Check:
1. Backend is running
2. IP address is correct
3. Browser console for errors
4. Network connectivity

## 🔄 Updates

To update dependencies:
```bash
npm update
```

To update Electron:
```bash
npm install electron@latest
```

---

**Desktop app ready! Enjoy your AI assistant.** 🚀
# ai-desktop
