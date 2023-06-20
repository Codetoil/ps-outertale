const { mods } = require('./spacetime.js');
const { app, BrowserWindow, dialog, ipcMain, protocol } = require('electron');
const { existsSync, readdirSync, statSync } = require('fs');
const { readFile, writeFile } = require('fs/promises');
const { join } = require('path');
const { URLSearchParams } = require('url');

const state = {
   panel: false,
   fullscreen: false,
   init () {
      state.window = new BrowserWindow({
         height: 480,
         icon: './icon.png',
         resizable: false,
         title: 'OUTERTALE',
         useContentSize: process.platform === 'win32',
         webPreferences: {
            disableDialogs: true,
            disableHtmlFullscreenWindowResize: true,
            enableWebSQL: false,
            nodeIntegration: true,
            preload: `${__dirname}/preload.js`,
            spellcheck: false
         },
         width: 640,
         x: state.position?.[0],
         y: state.position?.[1]
      });
      state.window.on('closed', () => {
         state.window = null;
      });
      state.window?.webContents.on('before-input-event', (_, { key, type }) => {
         if (state.ready && key === 'F4' && type === 'keyDown') {
            state.window?.setResizable(true);
            state.window?.setFullScreen((state.fullscreen = !state.fullscreen));
            state.restore();
            state.window?.setResizable(false);
            state.window?.setMenuBarVisibility(false);
         }
      });
      state.window.webContents.on('will-navigate', event => {
         event.preventDefault();
      });
      state.window.setMenuBarVisibility(false);
      const params = new URLSearchParams();
      if (process.argv.length > 2) {
         state.window.loadURL(
            `http://localhost:${process.argv[2]}/${process.argv[3] || 'index'}.html?${params.toString()}`
         );
      } else {
         state.window.loadFile('./assets/index.html', { search: params.toString() });
      }
      state.size = state.window.getSize();
   },
   /** @type {number[] | void} */
   position: void 0,
   reload: false,
   respawn: false,
   restore () {
      state.fullscreen || state.window?.setSize(state.size[0] + (state.panel ? 320 : 0), state.size[1], true);
   },
   /** @type {number[]} */
   size: [ 640, 512 ],
   ready: false,
   /** @type {BrowserWindow | void} */
   window: void 0
};

app.on('ready', () => {
   state.init();
   protocol.registerFileProtocol('mods', (request, callback) => {
      try {
         if (existsSync(mods)) {
            let path = mods;
            for (const name of new URL(request.url).pathname.split('/')) {
               if (readdirSync(path).includes(name)) {
                  path = join(path, name);
                  if (existsSync(path)) {
                     const stat = statSync(path);
                     if (stat.isDirectory()) {
                        continue;
                     } else if (stat.isFile()) {
                        callback(path);
                        return;
                     }
                  }
               }
               break;
            }
         }
      } catch {}
      callback({});
   });
});

app.on('activate', () => {
   state.window ? state.window.focus() : state.init();
});

app.on('window-all-closed', () => {
   state.reload || app.exit();
});

ipcMain.handle('close', () => {
   state.window.close();
});

ipcMain.handle('dialog.open', async () => {
   const { filePaths } = await dialog.showOpenDialog(state.window, {
      title: 'Open File',
      defaultPath: 'universe.json',
      buttonLabel: 'Open',
      filters: [ { name: 'SAVE Files', extensions: [ 'json' ] } ],
      properties: [ 'createDirectory', 'showHiddenFiles', 'openFile' ]
   });
   if (filePaths.length > 0) {
      try {
         return (await readFile(filePaths[0])).toString();
      } catch {
         return null;
      }
   } else {
      return null;
   }
});

ipcMain.handle('dialog.save', async (_, data) => {
   const { filePath } = await dialog.showSaveDialog(state.window, {
      title: 'Save File',
      defaultPath: 'universe.json',
      buttonLabel: 'Save',
      filters: [ { name: 'SAVE Files', extensions: [ 'json' ] } ],
      properties: [ 'createDirectory', 'showHiddenFiles', 'showOverwriteConfirmation' ]
   });
   if (filePath) {
      await writeFile(filePath, data);
      return true;
   } else {
      return false;
   }
});

ipcMain.handle('ready', () => {
   state.ready = true;
});

ipcMain.handle('reload', () => {
   state.window.reload();
});

ipcMain.handle('toggle.panel', (_, value) => {
   state.panel = value;
   state.window?.setResizable(true);
   state.restore();
   state.window?.setResizable(false);
});

protocol.registerSchemesAsPrivileged([ { scheme: 'mods', privileges: { supportFetchAPI: true } } ]);
