/* Проверка поддержки webp браузером */
export function isWebp() {
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	testWebP(function (support) {
		if (support == true) {
			document.querySelector("body").classList.add("webp");
		} else {
			document.querySelector("body").classList.add("no-webp");
		}
	});
}

export function stickyHeader() {
	const header = document.querySelector("header");

	let handleScroll = () => {
		if (window.scrollY > 0) {
			header.classList.add("header_fixed");
		} else {
			header.classList.remove("header_fixed");
		}
	};
	window.addEventListener("scroll", handleScroll);
	handleScroll();
}

export function isTouchDevice() {
	const touchClass = "is-touch";
	["load", "resize"].forEach((evt) =>
		window.addEventListener(evt, () => {
			let isTouch = false;
			if ((window.PointerEvent && "maxTouchPoints" in navigator) || (window.PointerEvent && "msMaxTouchPoints" in navigator)) {
				// if Pointer Events are supported, just check maxTouchPoints
				if (navigator.maxTouchPoints > 0) {
					isTouch = true;
				}
			} else {
				// no Pointer Events...
				if (window.matchMedia && window.matchMedia("(any-pointer:coarse)").matches) {
					// check for any-pointer:coarse which mostly means touchscreen
					isTouch = true;
				} else if (window.TouchEvent || "ontouchstart" in window) {
					// last resort - check for exposed touch events API / event handler
					isTouch = true;
				}
			}
			document.body.classList[isTouch ? "add" : "remove"](touchClass);
		})
	);
}

export function clickAndDrag() {
	document.addEventListener("mousedown", (e) => {
		const scroll_speed = 1.5,
			draggableClass = "js-draggable",
			draggingClass = "js-dragging", // flag for other functions
			el = e.target.closest(`.${draggableClass}`);

		if (!el) return;

		let isDown = false,
			startX,
			scrollLeft;

		e.preventDefault();

		isDown = true;
		startX = e.pageX - el.offsetLeft;
		scrollLeft = el.scrollLeft;

		// prevent default child behavior
		document.addEventListener("click", function (e) {
			if (el.contains(e.target)) {
				if (el.classList.contains(draggingClass)) {
					// оставляем возможность клика ссылок
					e.preventDefault();
				}
			}
		});

		el.addEventListener("mouseleave", () => {
			isDown = false;
		});

		el.addEventListener("mouseup", () => {
			isDown = false;

			// remove the dragging class after a short delay to prevent other click events
			setTimeout(() => {
				el.classList.remove(draggingClass);
			}, 250);
		});

		el.addEventListener("mousemove", (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - el.offsetLeft,
				walk = (x - startX) * scroll_speed; // scroll fast
			el.scrollLeft = scrollLeft - walk;

			if (scrollLeft !== el.scrollLeft) {
				el.classList.add(draggingClass);
			}
		});
	});
}

export function scrollHorisontallyByWheel() {
	const elements = document.querySelectorAll(".js-scroll-x");
	elements.forEach((el) => {
		el.addEventListener("wheel", (event) => {
			event.preventDefault();
			el.scrollBy({
				left: event.deltaY < 0 ? -200 : 200,
			});
		});
	});
}

export function closeMenuHandler() {
	const menuToggler = document.getElementById("menu-toggle"),
		menuWrapper = document.querySelector(".menu-wrapper"),
		linkClassName = "nav__link";
	if (!menuToggler || !menuWrapper) return;
	document.addEventListener("click", (e) => {
		if (menuToggler.checked) {
			if (!menuWrapper.contains(e.target) || e.target.classList.contains(linkClassName)) {
				menuToggler.click();
			}
		}
	});
}
