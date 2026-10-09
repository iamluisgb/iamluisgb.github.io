(function () {
  var T = {
    es: {},
    en: {
      'n1': '99.97%', 'n2': '−90%', 'nav.proyectos': 'Projects', 'nav.profesor': 'Teaching', 'nav.contacto': 'Contact',
      'hero.label': 'SRE · <b>AI Engineer</b> · teacher', 'hero.h1': 'Systems that stay up. <em>AI that fixes.</em>',
      'hero.sub': 'I keep systems running in production, build AI products and teach Python and DevOps. Based in Badajoz, working anywhere.',
      'hero.cta': 'Get in touch', 'hero.cta2': 'See projects',
      'sim.titulo': 'Simulation · production', 'sim.presupuesto': 'error budget', 'sim.latencia': 'p95 latency', 'sim.ia': 'AI · diagnosis',
      'p1': 'availability on a platform running ~3,000 automated jobs a day', 'p2': 'time to assign incidents, with a machine learning classifier',
      'p3n': '3 awards', 'p3': 'in 2020: Emilio Botín, Copernicus Hackathon and A3BT', 'p4n': 'since 2023', 'p4': 'teaching Python, data analysis and DevOps',
      'proy.h2': 'AI products, in production', 'proy.p': 'I build them end to end: the product, the infrastructure and the AI.',
      'fnf.tag': 'Agri · Emilio Botín Award 2020', 'fnf.p': 'Farmers dictate what they did and AI turns it into an operation checked against the official registry, with its cost per plot.',
      'rep.tag': 'Agent pipeline · AI-generated', 'rep.p': 'A pipeline that researches, writes and checks its sources. One report a day since May. The text is written by AI.',
      'br.tag': 'Raiatech · web app', 'br.p': 'An AI reader that explains what you read and helps you remember it. No account, in your browser.',
      'ar.tag': 'Raiatech · web app', 'ar.p': 'Strength and endurance training: seven domains measured with real tests and a plan that adapts.',
      'sre.h2': 'Stable production in pharma', 'sre.p': 'Since 2022 I lead an SRE team. I make sure systems hold up, that we find out before users do, and that repetitive work gets automated.',
      'sre.l1': 'Observability and incident response with Splunk ITSI and PagerDuty', 'sre.l2': 'Automation with Rundeck, Ansible and Python',
      'sre.l3': 'CI/CD and Kubernetes, with measured availability targets', 'sre.l4': 'AI for operations: classify, prioritise and diagnose', 'sre.cv': 'See the full CV',
      'c1.h': 'Automation platform', 'c1.p': 'About 3,000 jobs a day, deployed on Kubernetes with Ansible and Jenkins. Custom plugins for Splunk, ServiceNow and Vault.',
      'c2.p': 'A neural network classifies ServiceNow incidents and assigns them to the right engineer. Assigning a ticket now takes 90% less time.',
      'c3.h': 'Bulk changes without mistakes', 'c3.p': 'Automations so teams can update hundreds of AWS accounts at once, with guides and demo sessions.',
      'prof.tag': 'Teaching', 'prof.h2': 'I teach what I use every day', 'prof.p': 'Python since 2023 and DevOps since 2024. One-off classes, full courses and team training. Every course has its open repository.',
      'cu1': 'Python from scratch', 'cu2': 'Advanced Python', 'cu.datos': 'Data', 'cu3': 'Data analysis', 'cu4': 'Advanced data analysis', 'prof.todos': 'See all courses →',
      'con.tag': "Let's work together", 'con.h2': 'Got a system, a team or an idea?', 'con.p': 'Tell me in two lines what you need. I reply within 48 hours.',
      'o1': 'Consulting', 'o1p': 'SRE, observability and AI systems for your team', 'o2': 'Collaborations', 'o2p': 'Projects, content or talks',
      'o3': 'Classes and training', 'o3p': 'For individuals or teams: Python, DevOps and applied AI', 'f.cursos': 'Courses'
    }
  };
  // el español es el texto del HTML: se guarda al cargar para poder volver a él
  document.querySelectorAll('[data-i18n]').forEach(function (el) { T.es[el.getAttribute('data-i18n')] = el.textContent; });
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) { T.es[el.getAttribute('data-i18n-html')] = el.innerHTML; });
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
  document.getElementById('lang').addEventListener('click', function () { idioma(document.documentElement.lang === 'es' ? 'en' : 'es'); });
  var l0 = lee('lang') || ((navigator.language || 'es').slice(0, 2) === 'es' ? 'es' : 'en');
  if (l0 === 'en') idioma('en');

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
      if (!suf) return;   // las que llevan texto («3 premios») se quedan como están
      (function paso(t) {
        var k = Math.min(1, (t - t0) / 1100), v = fin * (1 - Math.pow(1 - k, 3));
        el.textContent = (v < 0 ? '−' : '') + Math.abs(v).toFixed(dec).replace('.', en ? '.' : ',') + (en ? suf.trim() : suf);
        if (k < 1) requestAnimationFrame(paso); else el.textContent = txt;
      })(t0);
    });
  }, { threshold: .6 });
  document.querySelectorAll('[data-count]').forEach(function (el) { cuenta.observe(el); });
})();
