// Simulación del hero: un incidente en producción que se detecta, la IA diagnostica y se resuelve.
// SVG y DOM, sin librerías. Se para fuera de pantalla; con movimiento reducido queda el estado final.
(function () {
  var sim = document.getElementById('sim'); if (!sim) return;
  var $ = function (id) { return document.getElementById(id); };
  var NS = 'http://www.w3.org/2000/svg';
  var quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;

  var TXT = {
    es: {
      nodos: { web: 'web', api: 'api', pagos: 'pagos', colas: 'colas', bd: 'base de datos', s3: 'archivos' },
      ok: 'todo en orden', degradado: 'degradado', incidente: 'incidente abierto', resuelto: 'resuelto',
      log: [
        ['10:42:03', 'despliegue · api v2.14', ''],
        ['10:44:10', 'latencia p95 180 ms → 2,4 s', 'bad'],
        ['10:44:21', 'errores 5xx en pagos: 7 %', 'bad'],
        ['10:44:43', '3 síntomas → 1 incidente · aviso a la guardia', 'bad'],
        ['10:46:02', 'runbook automático · vuelta a api v2.13', ''],
        ['10:48:15', 'resuelto · SLO a salvo', 'ok']
      ],
      ia: ['Cruzando métricas, logs y cambios…', 'conexiones a la base de datos: 100 de 100', 'empieza a las 10:42, justo tras el despliegue', 'solo falla con api v2.14'],
      causa: 'Causa: api v2.14 no libera conexiones. <em>Acción: volver a v2.13.</em>',
      fin: 'Detectado en 40 s · resuelto en 4 min',
      tip: { ok: 'sano', warn: 'degradado', bad: 'fallando', lat: 'latencia', err: 'errores' }
    },
    en: {
      nodos: { web: 'web', api: 'api', pagos: 'payments', colas: 'queues', bd: 'database', s3: 'storage' },
      ok: 'all systems normal', degradado: 'degraded', incidente: 'incident open', resuelto: 'resolved',
      log: [
        ['10:42:03', 'deploy · api v2.14', ''],
        ['10:44:10', 'p95 latency 180 ms → 2.4 s', 'bad'],
        ['10:44:21', '5xx errors on payments: 7%', 'bad'],
        ['10:44:43', '3 symptoms → 1 incident · on-call paged', 'bad'],
        ['10:46:02', 'automated runbook · roll back to api v2.13', ''],
        ['10:48:15', 'resolved · SLO safe', 'ok']
      ],
      ia: ['Correlating metrics, logs and changes…', 'database connections: 100 of 100', 'starts at 10:42, right after the deploy', 'only fails on api v2.14'],
      causa: 'Cause: api v2.14 leaks connections. <em>Action: roll back to v2.13.</em>',
      fin: 'Detected in 40 s · resolved in 4 min',
      tip: { ok: 'healthy', warn: 'degraded', bad: 'failing', lat: 'latency', err: 'errors' }
    }
  };
  var L = function () { return TXT[document.documentElement.lang === 'en' ? 'en' : 'es']; };

  // ---- mapa de servicios ----
  var NODOS = { web: [60, 52], api: [200, 52], pagos: [340, 52], s3: [60, 150], colas: [200, 150], bd: [340, 150] };
  var ARISTAS = [['web', 'api'], ['api', 'pagos'], ['api', 'colas'], ['pagos', 'bd'], ['colas', 'bd'], ['web', 's3']];
  var EN_BD = { 'pagos-bd': 1, 'colas-bd': 1, 'api-pagos': 1 };
  var svg = $('sim-map'), capaA = el('g'), capaP = el('g'), capaN = el('g');
  svg.appendChild(capaA); svg.appendChild(capaP); svg.appendChild(capaN);
  function el(t, a) { var e = document.createElementNS(NS, t); for (var k in a || {}) e.setAttribute(k, a[k]); return e; }

  var aristas = ARISTAS.map(function (p) {
    var a = NODOS[p[0]], b = NODOS[p[1]];
    var linea = el('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: 'edge' }); capaA.appendChild(linea);
    var pulsos = [0, .5].map(function (o) { var c = el('circle', { r: 2.6, class: 'pulse' }); capaP.appendChild(c); return { c: c, o: o + Math.random() * .2 }; });
    return { id: p.join('-'), a: a, b: b, linea: linea, pulsos: pulsos };
  });
  var nodos = {};
  Object.keys(NODOS).forEach(function (k) {
    var p = NODOS[k], g = el('g', { class: 'node', transform: 'translate(' + p[0] + ',' + p[1] + ')', tabindex: 0 });
    var r = el('rect', { x: -52, y: -15, width: 104, height: 30, rx: 5 });
    var d = el('circle', { class: 'dot', cx: -40, cy: 0, r: 3.5 });
    var t = el('text', { x: -31, y: 4 });
    g.appendChild(r); g.appendChild(d); g.appendChild(t); capaN.appendChild(g);
    nodos[k] = { g: g, t: t, estado: 'ok' };
    g.addEventListener('mouseenter', function () { tip(k); });
    g.addEventListener('focus', function () { tip(k); });
    g.addEventListener('mouseleave', function () { $('sim-tip').classList.remove('on'); });
    g.addEventListener('blur', function () { $('sim-tip').classList.remove('on'); });
    g.addEventListener('click', function () { tip(k); });
  });
  function rotular() { Object.keys(nodos).forEach(function (k) { nodos[k].t.textContent = L().nodos[k]; }); }

  function tip(k) {
    var n = nodos[k], est = n.estado, tt = L().tip, malo = est !== 'ok' && S.fase !== 'fin';
    var lat = k === 'bd' && malo ? '2.400 ms' : k === 'pagos' && malo ? '1.900 ms' : (20 + (k.length * 13) % 60) + ' ms';
    var err = k === 'pagos' && malo ? '7 %' : k === 'bd' && malo ? '12 %' : '0,0 %';
    var box = $('sim-tip'), r = n.g.getBoundingClientRect(), s = sim.getBoundingClientRect();
    box.innerHTML = '<b>' + L().nodos[k] + ' · ' + tt[est] + '</b><span>' + tt.lat + ' ' + lat + ' · ' + tt.err + ' ' + err + '</span>';
    box.classList.add('on');
    var w = box.offsetWidth;
    box.style.left = Math.max(6, Math.min(s.width - w - 6, r.left - s.left + r.width / 2 - w / 2)) + 'px';
    box.style.top = (r.bottom - s.top + 6) + 'px';
    box.classList.add('on');
  }

  // ---- estado ----
  var S;
  function reset() {
    S = { t: 0, fase: 'ok', lat: 180, latObj: 180, presupuesto: 100, presObj: 100, serie: [], hecho: {} };
    for (var i = 0; i < 40; i++) S.serie.push(180 + Math.random() * 20);
    Object.keys(nodos).forEach(function (k) { estadoNodo(k, 'ok'); });
    aristas.forEach(function (a) { a.linea.classList.remove('bad'); a.pulsos.forEach(function (p) { p.c.classList.remove('bad'); }); });
    estado('', L().ok);
    $('sim-log').innerHTML = '';
    var ia = $('sim-ia'); while (ia.children.length > 1) ia.removeChild(ia.lastChild);
    $('sim-fin').classList.remove('on');
    $('k-slo').classList.remove('bad'); $('k-lat').classList.remove('bad'); $('k-budget').classList.remove('bad');
  }
  function estadoNodo(k, e) { nodos[k].estado = e; nodos[k].g.setAttribute('class', 'node' + (e === 'ok' ? '' : ' ' + e)); }
  function estado(cls, txt) { $('sim-st').className = 'sim-st' + (cls ? ' ' + cls : ''); $('sim-st-t').textContent = txt; }
  function log(i) {
    var l = L().log[i], li = document.createElement('li');
    li.className = l[2]; li.innerHTML = l[0] + ' <span></span>'; li.lastChild.textContent = l[1];
    $('sim-log').appendChild(li); requestAnimationFrame(function () { li.classList.add('on'); });
  }
  function ia(html, cls) {
    var p = document.createElement('p'); p.className = cls || ''; p.innerHTML = html;
    $('sim-ia').appendChild(p); requestAnimationFrame(function () { p.classList.add('on'); });
  }
  function rojo(on) {
    aristas.forEach(function (a) {
      var m = on && EN_BD[a.id]; a.linea.classList.toggle('bad', !!m);
      a.pulsos.forEach(function (p) { p.c.classList.toggle('bad', !!m); });
    });
  }

  // guion: [segundo, qué pasa]
  var GUION = [
    [0.8, function () { log(0); }],
    [3.0, function () { S.fase = 'mal'; estadoNodo('bd', 'warn'); estado('warn', L().degradado); S.latObj = 2400; S.presObj = 62; rojo(true); $('k-lat').classList.add('bad'); log(1); }],
    [4.2, function () { estadoNodo('pagos', 'warn'); estadoNodo('bd', 'bad'); log(2); $('k-slo').classList.add('bad'); $('k-budget').classList.add('bad'); }],
    [5.2, function () { estado('bad', L().incidente); log(3); }],
    [6.2, function () { ia(L().ia[0], 'ev0'); }],
    [7.0, function () { ia(L().ia[1], 'ev'); }],
    [7.6, function () { ia(L().ia[2], 'ev'); }],
    [8.2, function () { ia(L().ia[3], 'ev'); }],
    [9.0, function () { ia(L().causa, 'causa'); log(4); }],
    [10.4, function () { S.fase = 'fin'; ['bd', 'pagos'].forEach(function (k) { estadoNodo(k, 'ok'); }); rojo(false); S.latObj = 180; S.presObj = 58; estado('', L().resuelto); log(5); $('k-lat').classList.remove('bad'); $('k-slo').classList.remove('bad'); $('k-budget').classList.remove('bad'); }],
    [11.2, function () {
      // centrado entre las dos filas del mapa, sin tapar ningún servicio
      var f = $('sim-fin'); f.textContent = L().fin;
      f.style.top = (svg.offsetTop + svg.getBoundingClientRect().height * .5 - 16) + 'px'; f.classList.add('on');
    }]
  ];
  var DURA = 15.5;

  function pintar(dt) {
    // pulsos de tráfico: más lentos por las conexiones que fallan
    aristas.forEach(function (a) {
      var mal = a.linea.classList.contains('bad');
      a.pulsos.forEach(function (p) {
        p.o = (p.o + dt * (mal ? .18 : .45)) % 1;
        p.c.setAttribute('cx', a.a[0] + (a.b[0] - a.a[0]) * p.o);
        p.c.setAttribute('cy', a.a[1] + (a.b[1] - a.a[1]) * p.o);
      });
    });
    // latencia y presupuesto de error, suavizados hacia su objetivo
    var k = Math.min(1, dt * 2.2);
    S.lat += (S.latObj - S.lat) * k; S.presupuesto += (S.presObj - S.presupuesto) * Math.min(1, dt * .9);
    S.acum = (S.acum || 0) + dt;
    if (S.acum > .12) { S.acum = 0; S.serie.push(S.lat * (1 + (Math.random() - .5) * .12)); S.serie.shift(); }
    var max = Math.max(600, Math.max.apply(null, S.serie));
    $('k-path').setAttribute('d', S.serie.map(function (v, i) { return (i ? 'L' : 'M') + (i * 120 / 39).toFixed(1) + ' ' + (21 - v / max * 19).toFixed(1); }).join(' '));
    var en = document.documentElement.lang === 'en';
    var ms = Math.round(S.lat / 10) * 10;
    $('k-lat').textContent = ms >= 1000 ? (ms / 1000).toFixed(1).replace('.', en ? '.' : ',') + ' s' : ms + ' ms';
    $('k-budget').style.width = S.presupuesto.toFixed(1) + '%';
    $('k-slo').textContent = (99.9 + .07 * (S.presupuesto / 100)).toFixed(2).replace('.', en ? '.' : ',') + ' %';
  }

  var corriendo = false, ultimo = 0, visible = true;
  function bucle(t) {
    if (!corriendo) return;
    var dt = Math.min(.05, (t - ultimo) / 1000); ultimo = t;
    S.t += dt;
    GUION.forEach(function (g, i) { if (S.t >= g[0] && !S.hecho[i]) { S.hecho[i] = 1; g[1](); } });
    if (S.t > DURA) reset();
    pintar(dt);
    requestAnimationFrame(bucle);
  }
  function arrancar() { if (corriendo || quieto) return; corriendo = true; ultimo = performance.now(); requestAnimationFrame(bucle); }
  function parar() { corriendo = false; }

  function estatico() {
    // movimiento reducido: el incidente ya resuelto, con todo el razonamiento a la vista
    reset(); GUION.forEach(function (g, i) { S.hecho[i] = 1; g[1](); });
    S.lat = 180; S.presupuesto = 58; S.serie = S.serie.map(function (_, i) { return i > 14 && i < 30 ? 2200 : 190; });
    pintar(0);
    document.querySelectorAll('#sim .sim-log li, #sim .sim-ia p').forEach(function (e) { e.classList.add('on'); });
  }

  rotular(); reset(); pintar(0);
  if (quieto) estatico();
  else if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) arrancar(); else parar(); }, { threshold: .15 }).observe(sim);
  } else arrancar();
  document.addEventListener('visibilitychange', function () { if (document.hidden) parar(); else if (visible) arrancar(); });
  document.addEventListener('idioma', function () { rotular(); if (quieto) estatico(); else reset(); });
})();
