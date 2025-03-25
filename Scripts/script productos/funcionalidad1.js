const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.carousel-item');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

/**
 * Centra la tarjeta de índice "index" en el carrusel usando scroll animado.
 */
function centerItem(index) {
  const item = items[index];
  if (!item) return;
  const containerWidth = carousel.offsetWidth;
  const itemLeft = item.offsetLeft;
  const itemWidth = item.offsetWidth;
  const itemCenter = itemLeft + (itemWidth / 2);
  const scrollPosition = itemCenter - (containerWidth / 2);
  smoothScrollTo(carousel, scrollPosition, 500);
}

/**
 * Determina la tarjeta más cercana al centro y le asigna la clase .active.
 */
function setActiveItem() {
  const containerCenter = carousel.scrollLeft + (carousel.offsetWidth / 2);
  let closestIndex = 0;
  let minDistance = Infinity;
  items.forEach((item, i) => {
    const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
    const distance = Math.abs(containerCenter - itemCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = i;
    }
  });
  items.forEach(item => item.classList.remove('active'));
  items[closestIndex].classList.add('active');
}

/**
 * Función de scroll animado con interpolación lineal.
 */
function smoothScrollTo(element, target, duration) {
  const start = element.scrollLeft;
  const change = target - start;
  const startTime = performance.now();
  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    element.scrollLeft = start + change * progress;
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else {
      setActiveItem();
    }
  }
  requestAnimationFrame(animateScroll);
}

window.addEventListener('load', () => {
  centerItem(3);
  setTimeout(() => {
    setActiveItem();
  }, 200);
});

carousel.addEventListener('scroll', () => {
  setActiveItem();
});

leftArrow.addEventListener('click', () => {
  const target = carousel.scrollLeft - 300;
  smoothScrollTo(carousel, target, 500);
});

rightArrow.addEventListener('click', () => {
  const target = carousel.scrollLeft + 300;
  smoothScrollTo(carousel, target, 500);
});
