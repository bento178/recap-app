// Electron main process code for window management and IPC handling.
const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: './preload.js',
            contextIsolation: true,
            enableRemoteModule: false
        }
    });
    mainWindow.loadURL('file://${__dirname}/index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

ipcMain.on('message-from-renderer', (event, arg) => {
    console.log(arg); // prints the message from renderer
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});
