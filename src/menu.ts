import { Menu } from "electron";

/**
 * initialize MainWindow menu
 * @param {Electron.BrowserWindow} mainWindow 
 */
export function initMainWindowMenu(mainWindow: Electron.BrowserWindow) {
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Save',
                    click() { /* not created */ }
                }
            ]
        },
        {
            label: 'Dev_Tool',
            submenu: [
                {
                    label: 'Open_DevTools',
                    click() { mainWindow.webContents.openDevTools(); }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
};