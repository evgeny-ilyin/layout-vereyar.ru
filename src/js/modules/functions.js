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

export function collapseHeaderElements() {
	const isCollapsedClass = "is-collapsed";

	let elements = ["header__slogan", "header__support"],
		mediaTo = 768,
		mq = window.matchMedia(`(max-width: ${mediaTo - 1}px)`);

	["load", "resize"].forEach((evt) =>
		window.addEventListener(evt, () => {
			elements.forEach((el) => {
				if (mq.matches) {
					document.querySelector(`.${el}`).classList.add(isCollapsedClass);
					// document.querySelector(`.${el}`).style.height = 0;
					// document.querySelector(`.${el}`).style.marginTop = 0;
				} else {
					document.querySelector(`.${el}`).classList.remove(isCollapsedClass);
					// document.querySelector(`.${el}`).style.height = "";
					// document.querySelector(`.${el}`).style.marginTop = "";
				}
			});
		})
	);
}

export function fetchModalChunks() {
	let url = "/ajax/modal-chunks.php";

	(async () => {
		try {
			let response = await fetch(url);
			if (!response.ok) return;
			let result = await response.json();
			if (result.status !== true) return;
			updateModalChunks(result.chunks);
		} catch (e) {
			console.error(e);
			return;
		}
	})();
}

let updateModalChunks = (obj, where = document) => {
	if (typeof obj === "object" && obj !== null) {
		// text
		if (obj.text) {
			Object.entries(obj.text).forEach(([key]) => {
				let target = where.querySelector(`[data-fancybox=${key}]`);
				if (!target) return;
				target.href = `/ajax/modal.php?m=${key}`;
				target.dataset.type = "ajax";
			});
		}

		// quote
		if (obj.quote) {
			Object.entries(obj.quote).forEach(([key]) => {
				let target = where.querySelector(`[data-fancybox=${key}]`);
				if (!target) return;
				target.href = `/ajax/modal.php?m=${key}`;
				target.dataset.type = "ajax";
			});
		}

		// gallery
		if (obj.gallery) {
			Object.entries(obj.gallery).forEach(([key, obj2]) => {
				let target = where.querySelector(`[data-fancybox=${key}]`);
				if (!target) return;
				target.setAttribute("aria-label", obj2.name);

				let mainImage = obj2.images.shift();
				if (!mainImage) return;
				target.href = mainImage;

				if (obj2.images.length > 0) {
					let galleryImages = obj2.images,
						galleryDiv = document.createElement("div");

					galleryDiv.style.display = "none";

					galleryImages.forEach((path) => {
						galleryDiv.innerHTML += `<a href="${path}" data-fancybox="${key}"></a>`;
					});
					document.body.append(galleryDiv);
				}
			});
		}

		// video
		if (obj.video) {
			Object.entries(obj.video).forEach(([key, obj2]) => {
				let target = where.querySelector(`[data-fancybox=${key}]`);
				if (!target || !obj2.link) return;
				target.href = obj2.link;
				target.setAttribute("aria-label", obj2.name);
			});
		}

		// file
		if (obj.file) {
			Object.entries(obj.file).forEach(([key, link]) => {
				let target = where.querySelector(`[data-fancybox=${key}]`);
				if (!target || !link) return;
				target.href = link;
				target.removeAttribute("data-fancybox");
			});
		}
	} else {
		console.error("Chunk list is not an object");
	}
};
