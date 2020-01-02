import { app, BrowserWindow, ipcMain } from "electron";
import { initWindowMenu } from "./menu/menubar";
import path = require("path");

let mainWindow: BrowserWindow;
let inputWindow: BrowserWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 700,
        height: 600
    });
    // customize menu
    initWindowMenu(mainWindow);

    mainWindow.loadFile(path.join(path.dirname(__dirname), "src", 'main.html'));
    mainWindow.on("closed", () => app.quit());
});

function createInputWindow() {
    inputWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 350,
        height: 250
    });
    // vanish menubar
    inputWindow.setMenu(null);
    
    inputWindow.loadFile(path.join(path.dirname(__dirname), "src", 'input.html'));
}

// Create a input window
ipcMain.on("inputWindow:create", event => {
    createInputWindow();
});

// send a sentence to a main window
ipcMain.on("sentence:insert", (event, sentence) => {
    mainWindow.webContents.send("sentence:insert", sentence);
    inputWindow.close();
});