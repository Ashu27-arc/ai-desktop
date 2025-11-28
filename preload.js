import {
    contextBridge,
    ipcRenderer
} from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    speak: (text) => ipcRenderer.send("speak", text),
    openExternal: (url) => ipcRenderer.send("open-external", url),
});