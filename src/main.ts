import { app, BrowserWindow, ipcMain } from "electron";
import { initMainWindowMenu } from "./menu";
import { initInputWindow } from "./window";
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

// create inputWindow (method: correct)
ipcMain.on("inputWindow:correct", (event, elem_form) => {
    inputWindow = initInputWindow(inputWindow, 350, 250, elem_form["name"]);
});

// create inputWindow (method: insert)
ipcMain.on("inputWindow:insert", (event) => {
    inputWindow = initInputWindow(inputWindow, 350, 250);
});

// send inputForm to mainWindow (method: correct)
ipcMain.on("inputForm:correct", (event, inputForm) => {
    mainWindow.webContents.send("inputForm:correct", inputForm);
    inputWindow.close();
});

// send inputForm to mainWindow (method: insert)
ipcMain.on("inputForm:insert", (event, inputForm) => {
    mainWindow.webContents.send("inputForm:insert", inputForm);
    inputWindow.close();
});