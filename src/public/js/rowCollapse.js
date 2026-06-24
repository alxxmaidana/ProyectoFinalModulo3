document.addEventListener('DOMContentLoaded', () => {
	const filas = document.querySelectorAll('.rowmain');
	
	filas.forEach((fila) => {
		fila.addEventListener('click', (e) => {
			const elemento = e.target;
			const padre = elemento.parentElement;

			if (!padre.classList.contains('rowaction')) {
				const targetId = fila.getAttribute('data-target');
				const detail = document.getElementById(targetId);
				const chevId = targetId.replace('det-', 'chev-');
				const chevron = document.getElementById(chevId);
				
				detail.classList.toggle('open');
				chevron.classList.toggle('open')
			}
		}) 
	})
})