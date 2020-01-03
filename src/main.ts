import { app, BrowserWindow, ipcMain } from "electron";
import { initMainWindowMenu } from "./menu/init";
import { createInputWindow } from "./window/create";
import path = require("path");

let mainWindow: Electron.BrowserWindow;
let inputWindow: Electron.BrowserWindow;

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

// create a input window
ipcMain.on("inputWindow:create", (event) => {
    inputWindow = createInputWindow(inputWindow);
});

// send a inputForm to a main window
ipcMain.on("inputForm:insert", (event, inputForm) => {
    mainWindow.webContents.send("inputForm:insert", inputForm);
    inputWindow.close();
});