const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(drop => {
  const toggle = drop.querySelector('.dropdown-toggle');
  const content = drop.querySelector('.dropdown-content');
  const arrow = drop.querySelector('.arrow');

  toggle.addEventListener('click', () => {
    content.classList.toggle('open');
    if (content.classList.contains('open')) {
      arrow.textContent = '▲';
    } else {
      arrow.textContent = '▼';
    }
  });
});