import {
    app,
    BrowserWindow,
    ipcMain,
    shell
} from "electron";
import path from "path";
import {
    fileURLToPath
} from "url";
import say from "say";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

ipcMain.on("speak", (event, text) => {
    say.speak(text);
});

ipcMain.on("open-external", (event, url) => {
    shell.openExternal(url);
});


function createWindow() {
    const win = new BrowserWindow({
        width: 420,
        height: 600,
        frame: false,
        transparent: true,
        alwaysOnTop: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true,
        },
    });

    win.loadURL("http://localhost:5173");

    // Suppress extension errors
    win.webContents.on('console-message', (event, level, message) => {
        if (message.includes('runtime.lastError') || message.includes('message channel closed')) {
            event.preventDefault();
        }
    });

    // Handle navigation errors
    win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        if (errorCode !== -3) { // -3 is ERR_ABORTED, which is normal
            console.error('Failed to load:', errorDescription);
        }
    });
}

app.whenReady().then(() => {
    createWindow();
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});