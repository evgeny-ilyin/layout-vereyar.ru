import Swiper from "swiper";
import { Pagination } from "swiper/modules";

// init swiper-press Swiper
let swiperPressInit = false,
	swiperPress;

function swiperPressHandler() {
	if (window.outerWidth < 1024) {
		if (!swiperPressInit) {
			swiperPressInit = true;
			swiperPress = new Swiper(".swiper-press", {
				modules: [Pagination],
				slidesPerView: 1,
				spaceBetween: 20,
				breakpoints: {
					768: {
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
				},
				pagination: {
					el: ".swiper-press .swiper-pagination",
					clickable: true,
				},
			});
		}
	} else if (swiperPressInit) {
		swiperPress.disable();
		swiperPress.destroy();
		swiperPressInit = false;
	}
}

["load", "resize"].forEach((evt) =>
	window.addEventListener(evt, () => {
		swiperPressHandler();
	})
);

// addEventListener("DOMContentLoaded", () => {
	// window.matchMedia("(orientation: portrait)").addEventListener("change", (e) => {
		// swiperPressHandler();
		// const portrait = e.matches;
		// if (portrait) {}
// 	});
// });
