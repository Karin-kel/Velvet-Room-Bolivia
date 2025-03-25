// 1) Seleccionamos los elementos principales
const track = document.querySelector('.slider-track');
const items = document.querySelectorAll('.slider-item');

// 2) Variables de control
// Hemos añadido 4 clones al final, así que hay 9 (reales) + 4 (clones) = 13 items totales
// Queremos empezar mostrando el item en índice 0 (que a su vez muestra items 0..3 en escritorio)
let currentIndex = 0;
let intervalTime = 3000; // 3 segundos entre transiciones

// 3) Función para mover el slider
function moveSlider() {
  // Calcula el ancho de un item (en píxeles), con base en la ventana actual
  const itemWidth = items[currentIndex].clientWidth;
  // Desplaza el track
  track.style.transform = `translateX(${-itemWidth * currentIndex}px)`;
}

// 4) Avanzar a la siguiente posición
function nextSlide() {
  currentIndex++;
  track.style.transition = 'transform 0.5s ease-in-out';
  moveSlider();
}

// 5) Evento al terminar la transición
track.addEventListener('transitionend', () => {
  // Número total de items
  const totalItems = items.length; // 13 en este ejemplo

  // Si currentIndex es 9, significa que estamos mostrando
  // (índice 9) -> items[9..12], que son clones de las 4 primeras imágenes
  // Tras esa vista, debemos saltar sin transición a la posición 0 (imágenes reales)
  // para que el slider parezca infinito.
  if (currentIndex === 9) {
    track.style.transition = 'none'; // quita la animación
    currentIndex = 0;                // vuelve al inicio real
    moveSlider();                    // re-posiciona instantáneamente
  }
});

// 6) Iniciar carrusel automático
let sliderInterval = setInterval(nextSlide, intervalTime);

// 7) Ajustar el carrusel si cambia el tamaño de la ventana (responsivo)
window.addEventListener('resize', () => {
  // Quitamos la transición momentáneamente
  track.style.transition = 'none';
  // Recalcula la posición
  moveSlider();
});

// (Opcional) Si quieres pausar el slider al pasar el mouse:
// track.addEventListener('mouseenter', () => clearInterval(sliderInterval));
// track.addEventListener('mouseleave', () => sliderInterval = setInterval(nextSlide, intervalTime));