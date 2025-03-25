document.querySelectorAll('.carousel-section').forEach(section => {
  const carousel = section.querySelector('.carousel-container');
  const items = carousel.querySelectorAll('.carousel-item');
  const leftArrow = section.querySelector('.left-arrow');
  const rightArrow = section.querySelector('.right-arrow');

  // Función de scroll animado (lineal)
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

  // Función para centrar el item de índice index
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

  // Función para determinar el item activo
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

  // Al cargar la sección, centramos el 4to item (índice 3)
  centerItem(3);
  setTimeout(() => {
    setActiveItem();
  }, 200);

  // Actualizar el item activo al hacer scroll
  carousel.addEventListener('scroll', () => {
    setActiveItem();
  });

  // Flecha izquierda
  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      const target = carousel.scrollLeft - 300;
      smoothScrollTo(carousel, target, 500);
    });
  }
  // Flecha derecha
  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      const target = carousel.scrollLeft + 300;
      smoothScrollTo(carousel, target, 500);
    });
  }
});
