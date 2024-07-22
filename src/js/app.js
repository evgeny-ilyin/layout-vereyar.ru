import * as fn from "./modules/functions.js";
import { useDynamicAdapt } from "./modules/dynamicAdapt.js";

addEventListener("DOMContentLoaded", () => {
	useDynamicAdapt();

	fn.isTouchDevice();
	fn.clickAndDrag();
	fn.scrollHorisontallyByWheel();
	// functions.isWebp();
	// functions.stickyHeader();
});

// import "./modules/cookies.js";

import "./modules/fancyapps.js";
import "./modules/swiper.js";
import "./modules/yandex-map.js";
