{
   const params = new URLSearchParams(location.search);
   params.has('respawn') || document.querySelector('#splash').setAttribute('visible', '');
   if (typeof ___spacetime___ === 'object') {
      ___spacetime___.exec('ready');
   }
}
