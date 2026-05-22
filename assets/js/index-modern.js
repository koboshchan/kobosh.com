(function() {
  var year = document.getElementById('year-stamp');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  var shell = document.querySelector('.page-shell');
  if (!shell) return;

  document.addEventListener('mousemove', function(event) {
    var px = (event.clientX / window.innerWidth - 0.5) * 2;
    var py = (event.clientY / window.innerHeight - 0.5) * 2;
    shell.style.transform =
      'perspective(1200px) rotateX(' + (-py * 1.5).toFixed(2) + 'deg) rotateY(' + (px * 1.5).toFixed(2) + 'deg)';
  });
})();
