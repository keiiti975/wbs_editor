import { app, BrowserWindow, ipcMain } from "electron";
import { initMainWindowMenu } from "./menu";
import { initInputWindow } from "./window";
import path = require("path");

let mainWindow: Electron.BrowserWindow;
let inputWindow: Electron.BrowserWindow;
let correctWindow: Electron.BrowserWindow;
let correct_elem_form: { "name": string } = null;

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

// create inputWindow (method: insert)
ipcMain.on("inputWindow:create", (event) => {
    correct_elem_form = null;
    inputWindow = initInputWindow(inputWindow, 350, 250);
});

// create inputWindow (method: correct)
ipcMain.on("correctWindow:create", (event, elem_form) => {
    correct_elem_form = elem_form;
    correctWindow = initInputWindow(correctWindow, 350, 250);
});

// receive create_finished flag and send correct_elem_form (method: correct)
ipcMain.on("inputWindow:create_finished", (event) => {
    if (correct_elem_form != null) {
        correctWindow.webContents.send('correctWindow:send_form', correct_elem_form);
    }
});

// send inputForm to mainWindow (method: insert)
ipcMain.on("inputForm:insert", (event, inputForm) => {
    mainWindow.webContents.send("inputForm:insert", inputForm);
    inputWindow.close();
});

// send inputForm to mainWindow (method: correct)
ipcMain.on("inputForm:correct", (event, inputForm) => {
    mainWindow.webContents.send("inputForm:correct", inputForm);
    correctWindow.close();
});