import { Menu } from "electron";

export function initWindowMenu(mainWindow: Electron.BrowserWindow) {
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Save',
                    click() {
                        
                    }
                }
            ]
        },
        {
            label: 'Node',
            submenu: [
                {
                    label: 'add',
                    click() { }
                },
                {
                    label: 'delete',
                    click() { }
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
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}