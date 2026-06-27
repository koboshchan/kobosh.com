(function() {
  // 1. Dynamic Year Stamp
  var year = document.getElementById('year-stamp');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  // 2. Dark/Light Theme Manager
  var themeToggle = document.querySelector('.theme-toggle');
  
  function getTheme() {
    var stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }

  // Initial Apply
  var initialTheme = getTheme();
  applyTheme(initialTheme);

  // Attach listener if toggle exists
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      var current = document.body.classList.contains('dark') ? 'dark' : 'light';
      var nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // Sync with System Preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // 3. Interactive 3D Perspective Card Tilt
  var shell = document.querySelector('.page-shell');
  if (shell) {
    var isMobile = window.matchMedia('(max-width: 900px)');
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function handleMouseMove(event) {
      if (isMobile.matches || prefersReducedMotion.matches) {
        shell.style.transform = 'none';
        return;
      }
      var px = (event.clientX / window.innerWidth - 0.5) * 2;
      var py = (event.clientY / window.innerHeight - 0.5) * 2;
      shell.style.transform =
        'perspective(1200px) rotateX(' + (-py * 1.5).toFixed(2) + 'deg) rotateY(' + (px * 1.5).toFixed(2) + 'deg)';
    }

    function handleMouseLeave() {
      shell.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
  }

  // 4. Accordion Toggle Handler with Dynamic Height
  document.addEventListener('click', function(event) {
    var header = event.target.closest('.accordion-header');
    if (!header) return;
    
    var item = header.closest('.accordion-item');
    if (!item) return;
    
    var accordion = item.closest('.accordion');
    var isActive = item.classList.contains('active');
    
    // Close other items in the same accordion group
    if (accordion) {
      var items = accordion.querySelectorAll('.accordion-item');
      items.forEach(function(el) {
        el.classList.remove('active');
        var content = el.querySelector('.accordion-content');
        if (content) content.style.maxHeight = null;
      });
    }
    
    // If it wasn't active, open it
    if (!isActive) {
      item.classList.add('active');
      var content = item.querySelector('.accordion-content');
      if (content) {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    }
  });
})();
