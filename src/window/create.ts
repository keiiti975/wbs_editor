import { BrowserWindow } from "electron";
import path = require("path");

/**
 * create inputWindow
 * @param {Electron.BrowserWindow} inputWindow
 */
export function createInputWindow(inputWindow: Electron.BrowserWindow) {
    inputWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 350,
        height: 250
    });
    // vanish menu
    inputWindow.setMenu(null);
    
    inputWindow.loadFile(path.join(path.dirname(path.dirname(__dirname)), "src", 'input.html'));
    return inputWindow;
}