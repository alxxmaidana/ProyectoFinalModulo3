document.addEventListener('DOMContentLoaded', () => {
  const filas = document.querySelectorAll('.rowmain');

  filas.forEach((fila) => {
    fila.addEventListener('click', () => {
      const targetId = fila.getAttribute('data-target');
      const detail = document.getElementById(targetId);
      const arrowId = targetId.replace('det-', 'arrow-');
      const arrow = document.getElementById(arrowId);

      detail.classList.toggle('open');
      arrow.classList.toggle('arrow-open');
    })
  })
});