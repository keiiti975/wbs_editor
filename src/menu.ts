import { Menu } from "electron";

/**
 * initialize MainWindow menu
 * @param {Electron.BrowserWindow} mainWindow 
 */
export function initMainWindowMenu(mainWindow: Electron.BrowserWindow) {
    const template = [
        {
            label: 'wbs_editor',
            submenu: [
                {
                    label: 'About wbs_editor',
                    click() { /* TODO */ }
                }
            ]
        },
        {
            label: 'File',
            submenu: [
                {
                    label: 'Save',
                    click() { mainWindow.webContents.send("mainWindow:save"); }
                },
                {
                    label: 'Load',
                    click() { mainWindow.webContents.send("mainWindow:load"); }
                }
            ]
        },
        {
            label: 'Dev_Tool',
            submenu: [
                {
                    label: 'Open_DevTools',
                    click() { mainWindow.webContents.openDevTools(); }
                },
                {
                    label: 'Display_task_array',
                    click() { mainWindow.webContents.send("mainWindow:display_task_array"); }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};