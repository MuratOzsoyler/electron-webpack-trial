const { app, BrowserWindow } = require('electron');
const path = require('path');

import log from "electron-log"
import dayjs from "dayjs"

Object.assign(log.transports.file.writeOptions, { encoding: "utf-8" })

log.catchErrors({
    showDialog: true,
    onError(error, versions) {
        log.error("Uncaught error in main process:", error, versions)
    }
})

const localeCode = app.getLocale();
// require (`dayjs/locale/${localeCode}`)
dayjs.locale(localeCode)

log.info('----------------\nmain process started at ', // dayjs().toISOString(),
    "\n    locale: '", localeCode, "'",
    "\n    ")

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

log.debug(`MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY='${MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY}'`)

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
            // preload: path.join(__dirname, "preload.js")
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
