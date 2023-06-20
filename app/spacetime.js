const { homedir } = require('os');
const { join } = require('path');

const root = join(
   homedir(),
   (() => {
      switch (process.platform) {
         case 'darwin':
            return 'Library/Preferences/spacetime';
         case 'win32':
            return 'AppData/Roaming/spacetime';
         default:
            return '.config/spacetime';
      }
   })()
);

module.exports = { mods: join(root, 'mods'), root, universe: join(root, 'universe.json') };
