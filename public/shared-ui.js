/* canporven.org — Header- und Footer-Megamenü + Darkmode, zentrale Quelle für alle statischen Seiten.
   Inhalt der Seiten bleibt 1:1 unberührt; dieses Script liefert nur Menü, Footer und Theme-Toggle. */
(function () {
  var P = location.pathname;

  /* ---------- HEADER (Hauptmenü als Megamenü) ---------- */
  var brand =
    '<a class="brand" href="/" aria-label="Canarias por Venezuela">' +
    '<svg width="32" height="32" viewBox="0 0 34 34" fill="none" aria-hidden="true"><path d="M17 30C17 30 4 22.5 4 12.8 4 8 7.7 4.6 11.8 4.6c2.4 0 4.4 1.1 5.2 2.9.8-1.8 2.8-2.9 5.2-2.9C26.3 4.6 30 8 30 12.8 30 22.5 17 30 17 30Z" fill="url(#cpvg)"/><path d="M11 16.2l3.2 2.3 2.8-2.1 2.8 2.1 3.2-2.3" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="cpvg" x1="4" y1="5" x2="30" y2="30" gradientUnits="userSpaceOnUse"><stop stop-color="#F2A900"/><stop offset=".5" stop-color="#1763B0"/><stop offset="1" stop-color="#DC2A1A"/></linearGradient></defs></svg>' +
    '<span class="wm"><span class="b">CAN</span><span class="o">POR</span><span class="r">VEN</span><span class="g">.ORG</span></span></a>';

  var menu =
    '<input type="checkbox" id="mtoggle" class="menu-toggle" aria-label="Menú">' +
    '<label for="mtoggle" class="menu-btn" aria-label="Menú"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></label>' +
    '<ul class="menu">' +
      '<li><a href="/">Inicio</a></li>' +
      '<li><a href="/infodonaciones.html">Cómo ayudar de verdad <span class="caret">&#9662;</span></a><div class="dropdown">' +
        '<a href="/infodonaciones.html#situacion">La situación</a>' +
        '<a href="/infodonaciones.html#dinero">Dinero vs. especie</a>' +
        '<a href="/infodonaciones.html#fases">Las fases</a>' +
        '<a href="/infodonaciones.html#funciona">Qué funciona</a>' +
        '<a href="/infodonaciones.html#canarias">Factor Canarias</a>' +
        '<a href="/infodonaciones.html#actuar">Cómo actuar</a>' +
        '<a href="/infodonaciones.html#cooperacion">Cooperación institucional</a>' +
      '</div></li>' +
      '<li><a href="/respuesta-digital.html">Respuesta digital <span class="caret">&#9662;</span></a><div class="dropdown">' +
        '<a href="/respuesta-digital.html#ecosistema">Ecosistema</a>' +
        '<a href="/respuesta-digital.html#grietas">Las grietas</a>' +
        '<a href="/respuesta-digital.html#ia">IA agéntica</a>' +
        '<a href="/respuesta-digital.html#toolbox">Nuestra toolbox</a>' +
      '</div></li>' +
      '<li><a href="/novedades.html">Novedades</a></li>' +
      '<li><a href="/contactos.html">Contactos <span class="caret">&#9662;</span></a><div class="dropdown">' +
        '<a href="/contactos.html#emergencias">Teléfonos de emergencia</a>' +
        '<a href="/contactos.html#entidades">Entidades en la zona</a>' +
        '<a href="/contactos.html#donar">Canales de donación</a>' +
      '</div></li>' +
      '<li><a href="/#medicos">Médicos</a></li>' +
      '<li><a href="/#sumate" class="cta">Súmate</a></li>' +
    '</ul>';

  var themeBtn =
    '<button id="cpv-theme" class="cpv-theme" type="button" aria-label="Cambiar modo claro/oscuro" title="Modo claro / oscuro">' +
    '<svg class="moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>' +
    '<svg class="sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
    '</button>';

  var header = document.querySelector('header.nav') || document.querySelector('header');
  if (header) {
    if (!header.classList.contains('nav')) header.classList.add('nav');
    var ni = header.querySelector('.nav-in');
    if (ni) { ni.innerHTML = brand + menu + themeBtn; }
    else { header.innerHTML = '<div class="nav-in">' + brand + menu + themeBtn + '</div>'; }
    var top = header.querySelectorAll('.menu > li > a');
    top.forEach(function (a) {
      var h = (a.getAttribute('href') || '').split('#')[0];
      if (h === '/' && (P === '/' || P === '/index.html')) a.classList.add('active');
      else if (h && h !== '/' && h !== '/#' && P.indexOf(h) === 0) a.classList.add('active');
    });
  }

  /* ---------- FOOTER (einheitlich, ausklappbares Megamenü) ---------- */
  var css =
    /* Darkmode-Variablen (Fallback; primär im <head> der Seite gegen Flackern) */
    'html.dark{--bg:#0f1724;--soft:#161f2e;--soft2:#1d2940;--tinta:#e7eef7;--gris:#aeb9cc;--gris-l:#8b97ab;--linea:#27344a;--azul-l:#152a44;--oro-l:#3a2e12;--rojo-l:#3a1714;--verde-l:#10311f;--sombra:0 1px 2px rgba(0,0,0,.3),0 6px 24px rgba(0,0,0,.45);--sombra-l:0 1px 2px rgba(0,0,0,.3),0 2px 8px rgba(0,0,0,.4)}' +
    'html.dark body{background:#0f1724;color:#e7eef7}' +
    /* Theme-Toggle-Button */
    '.cpv-theme{margin-left:14px;display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:10px;border:1px solid var(--linea,#E1E8F1);background:transparent;color:var(--tinta,#16203A);cursor:pointer;flex:0 0 auto;transition:.15s}' +
    '.cpv-theme:hover{background:var(--soft,#F4F8FC)}' +
    '.cpv-theme .sun{display:none}' +
    'html.dark .cpv-theme .sun{display:inline}html.dark .cpv-theme .moon{display:none}' +
    '@media(max-width:760px){.cpv-theme{width:34px;height:34px;margin-left:8px}}' +
    /* Footer */
    '.site-ft{background:#0b1322;color:#c7d2e2;padding:46px 0 26px;margin-top:30px;font-family:Inter,system-ui,sans-serif}' +
    '.site-ft .wrap{max-width:1140px;margin:0 auto;padding:0 24px}' +
    '.site-ft .ft-top{display:grid;grid-template-columns:1.3fr 2.2fr;gap:40px;padding-bottom:34px;border-bottom:1px solid rgba(255,255,255,.1)}' +
    '.site-ft .ft-brand .wm{font-family:"Plus Jakarta Sans",Inter,sans-serif;font-weight:800;font-size:20px}' +
    '.site-ft .ft-brand .wm .b{color:#5b9be0}.site-ft .ft-brand .wm .o{color:#F2A900}.site-ft .ft-brand .wm .r{color:#e8604f}.site-ft .ft-brand .wm .g{color:#8fb4e0}' +
    '.site-ft .ft-brand p{font-size:13px;color:#9fb0c6;margin-top:12px;line-height:1.6;max-width:42ch}' +
    '.site-ft .ft-brand .dom{margin-top:10px;font-weight:600;color:#e7eefa;font-size:13px}' +
    '.site-ft .ft-cols{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}' +
    '.site-ft .ft-col{border-bottom:1px solid transparent}' +
    '.site-ft .ft-col>summary{font-family:"Plus Jakarta Sans",Inter,sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:#7d8da6;font-weight:700;list-style:none;cursor:pointer;padding:4px 0;display:flex;align-items:center;justify-content:space-between}' +
    '.site-ft .ft-col>summary::-webkit-details-marker{display:none}' +
    '.site-ft .ft-col>summary::after{content:"+";color:#7d8da6;font-size:16px;display:none}' +
    '.site-ft .ft-col[open]>summary::after{content:"\\2212"}' +
    '.site-ft .ft-col a{display:block;font-size:14px;color:#c7d2e2;padding:7px 0;transition:.15s}' +
    '.site-ft .ft-col a:hover{color:#fff}' +
    '.site-ft .ft-bottom{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;padding-top:22px;font-size:12px;color:#7d8da6;line-height:1.6}' +
    '.site-ft .ft-bottom b{color:#9fb0c6}' +
    '@media(max-width:820px){' +
      '.site-ft .ft-top{grid-template-columns:1fr;gap:24px}' +
      '.site-ft .ft-cols{grid-template-columns:1fr;gap:0}' +
      '.site-ft .ft-col{border-bottom:1px solid rgba(255,255,255,.1)}' +
      '.site-ft .ft-col>summary::after{display:block}' +
      '.site-ft .ft-col:not([open]) a{display:none}' +
    '}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  function col(title, links) {
    var s = '<details class="ft-col" open><summary>' + title + '</summary>';
    for (var i = 0; i < links.length; i++) s += '<a href="' + links[i][1] + '">' + links[i][0] + '</a>';
    return s + '</details>';
  }
  var foot =
    '<footer class="site-ft"><div class="wrap ft-top">' +
    '<div class="ft-brand"><span class="wm"><span class="b">CAN</span><span class="o">POR</span><span class="r">VEN</span><span class="g">.ORG</span></span>' +
    '<p>Organizamos información y conexión desde Canarias para Venezuela. Dinero, no cosas. No recaudamos ni gestionamos donaciones: solo informamos y enlazamos a canales verificados.</p>' +
    '<p class="dom">canariasporvenezuela.org · canporven.org</p></div>' +
    '<div class="ft-cols">' +
      col('Cómo ayudar', [['Cómo ayudar de verdad', '/infodonaciones.html'], ['Dinero, no cosas', '/infodonaciones.html#dinero'], ['Las fases', '/infodonaciones.html#fases'], ['Cómo actuar', '/infodonaciones.html#actuar'], ['Cooperación institucional', '/infodonaciones.html#cooperacion']]) +
      col('Respuesta digital', [['Ecosistema', '/respuesta-digital.html#ecosistema'], ['Las grietas', '/respuesta-digital.html#grietas'], ['IA agéntica', '/respuesta-digital.html#ia'], ['Nuestra toolbox', '/respuesta-digital.html#toolbox']]) +
      col('Contactos', [['Teléfonos de emergencia', '/contactos.html#emergencias'], ['Entidades en la zona', '/contactos.html#entidades'], ['Canales de donación', '/contactos.html#donar']]) +
      col('La iniciativa', [['Novedades', '/novedades.html'], ['Médicos voluntarios', '/#medicos'], ['Súmate', '/#sumate']]) +
    '</div></div>' +
    '<div class="wrap ft-bottom"><span><b>canporven.org no recauda ni gestiona donaciones.</b> Iniciativa ciudadana privada en formación, sin garantía legal. Datos verificados a 27-jun-2026; verifica antes de difundir.</span><span>&copy; 2026 Canarias por Venezuela</span></div>' +
    '</footer>';

  var existing = document.querySelector('footer');
  if (existing) { existing.outerHTML = foot; }
  else { document.body.insertAdjacentHTML('beforeend', foot); }

  /* ---------- DARKMODE ---------- */
  function applyTheme(t) {
    if (t === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  var sysDark = false;
  try { sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches; } catch (e) {}
  applyTheme(saved || (sysDark ? 'dark' : 'light'));

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('#cpv-theme');
    if (!b) return;
    var cur = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    var nx = cur === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', nx); } catch (e) {}
    applyTheme(nx);
  });
})();
