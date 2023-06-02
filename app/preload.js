const { mods, universe } = require('./spacetime.js');
const { contextBridge, ipcRenderer } = require('electron');
const { existsSync, mkdirSync, readdirSync, readFileSync, statSync } = require('fs');
const { writeFile } = require('fs/promises');
const { join } = require('path');

mkdirSync(mods, { recursive: true });

contextBridge.exposeInMainWorld('___spacetime___', {
   data () {
      return existsSync(universe) ? readFileSync(universe).toString() : null;
   },
   exec (...args) {
      return ipcRenderer.invoke(...args);
   },
   mods () {
      return existsSync(mods)
         ? readdirSync(mods).filter(name => {
              const path = join(mods, name, 'index.js');
              return existsSync(path) && statSync(path).isFile();
           })
         : null;
   },
   async writeSave (data) {
      try {
         await writeFile(universe, data);
         return true;
      } catch {
         return false;
      }
   },
   async writeRoom (name, data) {
      if (existsSync('../assets/rooms')) {
         try {
            await writeFile(`../assets/rooms/${name}.json`, data);
            return true;
         } catch {
            return false;
         }
      } else {
         return false;
      }
   }
});
