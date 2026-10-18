/* blog.js — solo el conmutador de tema. El resto del blog es HTML estático. */
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme');
  var sol = document.getElementById('i-sol');
  var luna = document.getElementById('i-luna');

  function pintar() {
    var claro = root.classList.contains('light');
    if (btn) btn.setAttribute('aria-label', claro ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro');
    if (sol) sol.style.display = claro ? 'none' : '';
    if (luna) luna.style.display = claro ? '' : 'none';
  }

  if (btn) {
    btn.addEventListener('click', function () {
      var claro = root.classList.toggle('light');
      try { localStorage.setItem('theme', claro ? 'light' : 'dark'); } catch (e) {}
      pintar();
    });
  }

  pintar();
})();
