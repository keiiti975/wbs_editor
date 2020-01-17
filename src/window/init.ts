import { BrowserWindow } from "electron";
import path = require("path");

/**
 * create inputWindow
 * @param {Electron.BrowserWindow} inputWindow
 */
export function initInputWindow(inputWindow: Electron.BrowserWindow, width: number, height: number) {
    inputWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: width,
        height: height
    });
    // vanish menu
    inputWindow.setMenu(null);

    inputWindow.loadFile(path.join(path.dirname(path.dirname(__dirname)), "src", 'input.html'));
    return inputWindow;
}