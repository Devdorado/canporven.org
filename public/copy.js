// canporven.org — copiar IBAN / textos al portapapeles (script externo, mismo origen)
(function () {
  function flash(btn, msg) {
    var old = btn.innerHTML;
    btn.innerHTML = msg;
    btn.classList.add('copied');
    setTimeout(function () { btn.innerHTML = old; btn.classList.remove('copied'); }, 1600);
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.copy-btn') : null;
    if (!btn) return;
    var text = btn.getAttribute('data-copy') || '';
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { flash(btn, 'Copiado'); },
        function () { fallback(text, btn); }
      );
    } else {
      fallback(text, btn);
    }
  });
  function fallback(text, btn) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      flash(btn, 'Copiado');
    } catch (err) {
      flash(btn, 'Selecciona y copia');
    }
  }
})();
