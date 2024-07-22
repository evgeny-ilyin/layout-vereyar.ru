import { Fancybox } from "@fancyapps/ui";
import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";

addEventListener("DOMContentLoaded", () => {
	// Модальные окна
	Fancybox.bind("[data-fancybox]", {});

	// Карусели
	Carousel.defaults = {
		...Carousel.defaults,
		infinite: false,
		adaptiveHeight: true,
	};

	// Карусели в модальных окнах
	const modalCarousels = document.querySelectorAll(".modal_carousel .f-carousel");
	modalCarousels.forEach((el) => {
		let carousel = document.getElementById(el.id);
		if (carousel) {
			new Carousel(carousel);
		}
	});
});
