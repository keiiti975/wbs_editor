import { app, BrowserWindow, ipcMain } from "electron";
import { initMainWindowMenu } from "./menu/init";
import { initInputWindow } from "./window/init";
import path = require("path");

let mainWindow: Electron.BrowserWindow;
let inputWindow: Electron.BrowserWindow;

// start application and create mainWindow
app.on("ready", () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 700,
        height: 600
    });
    // customize menu
    initMainWindowMenu(mainWindow);

    mainWindow.loadFile(path.join(path.dirname(__dirname), "src", 'main.html'));
    mainWindow.on("closed", () => app.quit());
});

// create inputWindow
ipcMain.on("inputWindow:create", (event) => {
    inputWindow = initInputWindow(inputWindow, 350, 250);
});

// send inputForm to mainWindow
ipcMain.on("inputForm:insert", (event, inputForm) => {
    mainWindow.webContents.send("inputForm:insert", inputForm);
    inputWindow.close();
});