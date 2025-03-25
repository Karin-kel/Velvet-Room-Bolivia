const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.carousel-item');

/**
 * Al cargar la página, centramos la 4ta tarjeta (índice 3).
 * Luego actualizamos cuál está activa.
 */
window.addEventListener('load', () => {
  centerItem(3); // Centra la tarjeta 4
  setTimeout(() => {
    setActiveItem();
  }, 200);
});

/**
 * Al hacer scroll, determinamos cuál tarjeta está más cerca del centro
 * y le aplicamos la clase "active".
 */
carousel.addEventListener('scroll', () => {
  // Podemos hacer la detección en tiempo real
  setActiveItem();
});

/**
 * Centra la tarjeta de índice "index" en el carrusel.
 * Calcula su posición y ajusta scrollLeft.
 */
function centerItem(index) {
  const item = items[index];
  if (!item) return;

  // Ancho visible del carrusel
  const containerWidth = carousel.offsetWidth;
  // Posición horizontal de la tarjeta
  const itemLeft = item.offsetLeft;
  const itemWidth = item.offsetWidth;
  
  // Queremos que el centro de la tarjeta coincida con
  // el centro del contenedor
  const itemCenter = itemLeft + (itemWidth / 2);
  const scrollPosition = itemCenter - (containerWidth / 2);

  carousel.scrollLeft = scrollPosition;
}

/**
 * setActiveItem():
 * Busca la tarjeta cuyo centro esté más cerca
 * del centro visible del carrusel y la marca como .active
 */
function setActiveItem() {
  // Centro del contenedor
  const containerCenter = carousel.scrollLeft + (carousel.offsetWidth / 2);

  let closestIndex = 0;
  let minDistance = Infinity;

  items.forEach((item, i) => {
    // Centro de cada tarjeta
    const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
    const distance = Math.abs(containerCenter - itemCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = i;
    }
  });

  // Remover .active de todas
  items.forEach(item => item.classList.remove('active'));
  // Agregar .active a la más cercana
  items[closestIndex].classList.add('active');
}
