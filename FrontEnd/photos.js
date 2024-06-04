function genererPhoto(works) {
	for (let i = 0; i < works.length; i++) {

		const sectionPortfolio = document.querySelector(".gallery");
		const portfolioElement = document.createElement("figure");
		const photoElement = document.createElement("img");
		photoElement.src = works[i].imageUrl;
		const textElement = document.createElement("figcaption");
		textElement.innerText = works[i].title;

		sectionPortfolio.appendChild(portfolioElement);
		portfolioElement.appendChild(photoElement);
		portfolioElement.appendChild(textElement);
	}
}
fetch("http://localhost:5678/api/works")
	.then(response => {
		return response.json();
	}).then((works) => {
		genererPhoto(works);
	})