// Calendario de contribuciones. Los datos los baja cada día .github/workflows/calendario-github.yml.
(function () {
  var caja = document.getElementById('gh');
  if (!caja) return;
  var cal = document.getElementById('gh-cal'), total = document.getElementById('gh-total'), semanas = 53;
  var TXT = {
    es: { loc: 'es-ES', uno: 'contribución', varias: 'contribuciones', anio: 'en el último año', sep: '.', dias: ['Lun', 'Mié', 'Vie'], menos: 'Menos', mas: 'Más', sr: 'Contribuciones en GitHub por día durante el último año' },
    en: { loc: 'en-GB', uno: 'contribution', varias: 'contributions', anio: 'in the last year', sep: ',', dias: ['Mon', 'Wed', 'Fri'], menos: 'Less', mas: 'More', sr: 'GitHub contributions for each day of the last year' }
  };
  var vacio = { cuentas: new Array(semanas * 7).fill(0), niveles: new Array(semanas * 7).fill(0) };
  var datos = null;

  function pinta() {
    var t = document.documentElement.lang === 'en' ? TXT.en : TXT.es, d = datos || vacio;
    var inicio = datos ? Date.parse(datos.inicio + 'T00:00:00Z') : 0;
    var fecha = function (i) { return new Date(inicio + i * 864e5); };
    var mes = new Intl.DateTimeFormat(t.loc, { month: 'short', timeZone: 'UTC' });
    var dia = new Intl.DateTimeFormat(t.loc, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
    var cols = Math.ceil(d.cuentas.length / 7), html = '<span></span><span></span><span>' + t.dias[0] + '</span><span></span><span>' + t.dias[1] + '</span><span></span><span>' + t.dias[2] + '</span><span></span>';
    var meses = [];
    for (var c = 0; c < cols; c++) meses[c] = datos ? fecha(c * 7).getUTCMonth() : -1;
    for (c = 0; c < cols; c++) {
      // Rótulo donde cambia el mes, salvo si no le caben tres columnas: al principio pisaría el siguiente y al final desbordaría.
      var rotulo = datos && c < cols - 2 && (c ? meses[c] !== meses[c - 1] : meses[0] === meses[1] && meses[0] === meses[2]);
      html += '<span class="gh-mes">' + (rotulo ? mes.format(fecha(c * 7)).replace('.', '') : '') + '</span>';
      for (var i = c * 7; i < Math.min(c * 7 + 7, d.cuentas.length); i++) {
        var titulo = datos ? ' title="' + d.cuentas[i] + ' ' + (d.cuentas[i] === 1 ? t.uno : t.varias) + ' · ' + dia.format(fecha(i)).replace('.', '') + '"' : '';
        html += '<i class="n' + d.niveles[i] + '"' + titulo + '></i>';
      }
    }
    cal.innerHTML = html;
    cal.style.setProperty('--cols', cols);
    cal.setAttribute('aria-label', t.sr);
    cal.scrollLeft = cal.scrollWidth;   // en móvil se ve primero lo más reciente
    if (datos) total.innerHTML = '<b>' + String(datos.total).replace(/\B(?=(\d{3})+$)/g, t.sep) + '</b> ' + t.varias + ' ' + t.anio;
    document.getElementById('gh-menos').textContent = t.menos;
    document.getElementById('gh-mas').textContent = t.mas;
  }

  pinta();   // la rejilla vacía reserva el alto antes de que lleguen los datos
  document.addEventListener('idioma', pinta);
  fetch('/assets/github-calendario.json')
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (j) { datos = j; pinta(); })
    .catch(function () { caja.hidden = true; });
})();
