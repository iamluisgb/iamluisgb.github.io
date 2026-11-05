(function () {
  var T = {
    en: {},
    es: {
      "ar.p": "Entrenamiento de fuerza y resistencia: siete dominios medidos con tests reales y un plan que se adapta.",
      "ar.tag": "Raiatech · app web",
      "br.p": "Un lector con IA que te explica lo que lees y te ayuda a recordarlo. Sin cuenta, en el navegador.",
      "br.tag": "Raiatech · app web",
      "c1.h": "Plataforma de automatización",
      "c1.p": "Unas 3.000 tareas al día, desplegada en Kubernetes con Ansible y Jenkins. Plugins propios para Splunk, ServiceNow y Vault.",
      "c2.p": "Una red neuronal clasifica los incidentes de ServiceNow y los asigna al técnico adecuado. Asignar un ticket pasó a llevar un 90 % menos de tiempo.",
      "c3.h": "Cambios en masa sin errores",
      "c3.p": "Automatizaciones para que los equipos actualicen cientos de cuentas de AWS de una vez, con guías y sesiones de demostración.",
      "con.h2": "¿Buscas a alguien para IA, SRE o plataforma?",
      "con.p": "Escríbeme o búscame en LinkedIn. Te cuento cualquiera de estos sistemas en detalle.",
      "con.tag": "Contacto",
      "cu.datos": "Datos",
      "cu1": "Python desde cero",
      "cu2": "Python avanzado",
      "cu3": "Análisis de datos",
      "cu4": "Análisis de datos avanzado",
      "eng.1": "Grafo de conocimiento operativo",
      "eng.1p": "Una ontología sobre sistemas de operaciones en vivo, abierta a agentes de IA por MCP. No almacena datos.",
      "eng.1r": "5.000+ consultas · p50 0,6 s",
      "eng.2p": "Un agente de lectura que corre en el navegador, con compartir cifrado de extremo a extremo, un servidor MCP de solo lectura y evaluaciones propias.",
      "eng.2r": "61 decisiones de arquitectura documentadas",
      "eng.3p": "Una red neuronal, entrenada con 18 meses de tickets, que asigna cada incidente al técnico adecuado.",
      "eng.3r": "de 45 min a menos de 5 min",
      "eng.h2": "Tres sistemas y cómo están hechos",
      "eng.p": "De cada uno: problema, arquitectura, decisiones y resultado medido. La página detallada está en inglés.",
      "f.cursos": "Cursos",
      "fnf.p": "El agricultor dicta lo que ha hecho y la IA lo convierte en una operación validada contra el registro oficial, con su coste por parcela.",
      "fnf.tag": "Agro · Premio Emilio Botín 2020",
      "hero.cta": "Ver la ingeniería",
      "hero.cta2": "Leer mi CV",
      "hero.h1": "IA para operaciones. <em>Respuestas que se pueden auditar.</em>",
      "hero.label": "AI Engineer · <b>Operaciones y fiabilidad</b>",
      "hero.sub": "Construyo grafos de conocimiento, agentes y sistemas de evaluación sobre sistemas en producción. Vengo del SRE, así que me importa lo que pasa después de la demo.",
      "met.1": "consultas al grafo de conocimiento, de 9 ingenieros",
      "met.2": "de esas consultas llegan a través de agentes de IA",
      "met.3": "respondidas con datos",
      "met.4": "de latencia p50 por consulta",
      "met.f": "Cifras reales de mi puesto actual en una farmacéutica global. <a href=\"engineering.html#graph\">Cómo funciona</a>",
      "met.t": "En producción · mi trabajo actual",
      "n1": "99,97 %",
      "n2": "−90 %",
      "nav.contacto": "Contacto",
      "nav.profesor": "Profesor",
      "nav.proyectos": "Proyectos",
      "o1": "Puestos de ingeniería",
      "o3": "Consultoría y formación",
      "o3p": "Para empresas, a través de Raiatech",
      "p1": "de disponibilidad en una plataforma con ~3.000 tareas automáticas al día",
      "p2": "de tiempo para asignar incidentes, con un clasificador de machine learning",
      "p3": "en 2020: <a href=\"https://www.ceia3.es/es/noticias/premios/el-proyecto-de-empresa-food-and-farm-analytics-ganador-de-los-premios-emilio-botin-2020-promovido-por-ceia3-y-santander-universidades/\" target=\"_blank\" rel=\"noopener\">Emilio Botín ↗</a> y <a href=\"https://www.uma.es/UMA-Empresa/noticias/el-copernicus-hackathon-malaga-pone-la-ciudad-en-el-mapa-del-ecosistema-de-copernicus-en-europa/\" target=\"_blank\" rel=\"noopener\">Copernicus Hackathon Málaga ↗</a>",
      "p3n": "2 premios",
      "p4": "enseñando Python, análisis de datos y DevOps",
      "p4n": "desde 2023",
      "prof.h2": "Enseño lo que uso cada día",
      "prof.p": "Python desde 2023, DevOps desde 2024 y ahora AIOps y agentes LLM. Cada curso tiene su repositorio abierto.",
      "prof.tag": "Profesor",
      "prof.todos": "Ver todos los cursos →",
      "proy.h2": "Productos con IA que mantengo en producción",
      "proy.p": "Míos, de principio a fin: el producto, la infraestructura y la parte de IA.",
      "rep.p": "Un pipeline que investiga, redacta y verifica sus fuentes. Publica un informe cada día desde mayo. Los textos los escribe la IA.",
      "rep.tag": "Pipeline de agentes · generado con IA",
      "sre.cv": "Ver el CV completo",
      "sre.h2": "Primero, fiabilidad: en el sector farmacéutico",
      "sre.l1": "Observabilidad e incidentes con Splunk ITSI y PagerDuty",
      "sre.l2": "Automatización con Rundeck, Ansible y Python",
      "sre.l3": "CI/CD y Kubernetes, con objetivos de disponibilidad medidos",
      "sre.l4": "IA aplicada a operaciones: clasificar, priorizar y diagnosticar",
      "sre.p": "De 2022 a 2025 lideré un equipo de SRE. Ahora trabajo como ingeniero de AIOps con sistemas del mismo tipo: tienen que aguantar, y tenemos que enterarnos antes que el usuario."
    }
  };
  // el inglés es el texto del HTML: se guarda al cargar para poder volver a él
  document.querySelectorAll('[data-i18n]').forEach(function (el) { T.en[el.getAttribute('data-i18n')] = el.textContent; });
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) { T.en[el.getAttribute('data-i18n-html')] = el.innerHTML; });
  var guarda = function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} };
  var lee = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };

  function idioma(l) {
    document.documentElement.lang = l; guarda('lang', l);
    document.querySelectorAll('[data-i18n]').forEach(function (el) { var v = T[l][el.getAttribute('data-i18n')]; if (v) el.textContent = v; });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { var v = T[l][el.getAttribute('data-i18n-html')]; if (v) el.innerHTML = v; });
    // portadas que cambian de idioma (p. ej. Bookreader: español / inglés)
    document.querySelectorAll('img[data-srcset-en]').forEach(function (img) {
      var s = img.getAttribute('data-src-' + l), ss = img.getAttribute('data-srcset-' + l);
      if (s) img.setAttribute('src', s);
      if (ss) img.setAttribute('srcset', ss);
    });
    document.getElementById('l-es').className = l === 'es' ? 'on' : '';
    document.getElementById('l-en').className = l === 'en' ? 'on' : '';
    document.dispatchEvent(new CustomEvent('idioma', { detail: l }));
  }
  document.getElementById('lang').addEventListener('click', function () { idioma(document.documentElement.lang === 'en' ? 'es' : 'en'); });
  idioma(lee('lang') === 'es' ? 'es' : 'en');

  function iconos() {
    var claro = document.documentElement.classList.contains('light');
    document.getElementById('i-sol').style.display = claro ? 'none' : 'block';
    document.getElementById('i-luna').style.display = claro ? 'block' : 'none';
  }
  document.getElementById('theme').addEventListener('click', function () {
    var claro = document.documentElement.classList.toggle('light'); guarda('theme', claro ? 'light' : 'dark'); iconos();
  });
  iconos();

  // aparición al bajar y cifras que cuentan hasta su valor
  var quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (quieto || !('IntersectionObserver' in window)) { document.querySelectorAll('.rev').forEach(function (el) { el.classList.add('on'); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.rev').forEach(function (el) { io.observe(el); });
  var cuenta = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return; cuenta.unobserve(e.target);
      var en = document.documentElement.lang === 'en', el = e.target, fin = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), suf = el.dataset.suf || '', txt = el.textContent, t0 = performance.now();
      if (!suf) return;   // las que llevan texto («2 premios») se quedan como están
      (function paso(t) {
        var k = Math.min(1, (t - t0) / 1100), v = fin * (1 - Math.pow(1 - k, 3));
        el.textContent = (v < 0 ? '−' : '') + Math.abs(v).toFixed(dec).replace('.', en ? '.' : ',') + (en ? suf.trim() : suf);
        if (k < 1) requestAnimationFrame(paso); else el.textContent = txt;
      })(t0);
    });
  }, { threshold: .6 });
  document.querySelectorAll('[data-count]').forEach(function (el) { cuenta.observe(el); });
})();
