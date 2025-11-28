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
        },
    });

    win.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {
    createWindow();
});