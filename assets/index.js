{
   const params = new URLSearchParams(location.search);
   params.has('respawn') || document.querySelector('#splash').setAttribute('visible', '');
   if (typeof ___spacetime___ === 'object') {
      /*
      params.has('fullscreen') && document.body.setAttribute('opaque', '');
      addEventListener('keydown', event => {
         if (!event.altKey && event.key === 'F4') {
            if (document.body.hasAttribute('opaque')) {
               document.body.removeAttribute('opaque');
            } else {
               document.body.setAttribute('opaque', '');
            }
         }
      });
      document.querySelector('#close').addEventListener('click', () => {
         ___spacetime___.exec('close');
      });
      */
      ___spacetime___.exec('ready');
      /*
      try {
         document.body.style.backgroundColor = `rgba(0, 0, 0, ${
            1 - +(JSON.parse(___spacetime___.data()).find(entry => entry[0].endsWith(':n:option_trans'))?.[1] ?? '0')
         })`;
      } catch {}
      */
   } else {
      // document.body.setAttribute('opaque', '');
   }
}
