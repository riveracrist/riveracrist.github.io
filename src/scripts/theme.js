function initializeTheme() {
  const themeKey = 'guide-theme';
  function setTheme(theme) {
    document.body.classList.toggle('light-mode', theme === 'light');
    for (const button of document.querySelectorAll('#theme-toggle, #mobile-theme-toggle')) {
      button.setAttribute('aria-label', theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
      const label = button.querySelector('.theme-label');
      if (label) label.textContent = theme === 'light' ? 'Modo oscuro' : 'Modo claro';
    }
  }
  let saved;
  try { saved = localStorage.getItem(themeKey); } catch {}
  setTheme(saved || 'dark');
  for (const button of document.querySelectorAll('#theme-toggle, #mobile-theme-toggle')) {
    button.addEventListener('click', () => {
      const theme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
      setTheme(theme);
      try { localStorage.setItem(themeKey, theme); } catch {}
    });
  }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeTheme, { once: true });
else initializeTheme();
