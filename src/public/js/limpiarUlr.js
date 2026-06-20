window.addEventListener('load', () => {
	const url = new URL(window.location.href);
	// Si la URL tiene la cadena de consulta la limpia
	if (url.search.length > 0) {
		url.search = '';
		window.history.replaceState({}, document.title, url.pathname);
	}
});
