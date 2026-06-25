const form = document.querySelector('#deleteForm');

form.addEventListener('submit', (e) => {
    // evitar el envío del formulario
    e.preventDefault();

    const confirmacion = confirm('Esta seguro de eliminar este país?. Esta acción no se puede deshacer.');
    if (confirmacion) {
        form.submit();
    }
});