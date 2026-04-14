// Security bridge for IPC communication.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipc', {
    send: (channel, data) => {
        // whitelist channels
        let validChannels = ['message-from-renderer'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        let validChannels = ['message-from-main'];
        if (validChannels.includes(channel)) {
            // Strip event as it includes `sender`.
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});
