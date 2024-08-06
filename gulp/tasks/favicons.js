/**
 * Копировать favicon в build
 */
export const favicons = () => {
	return copyLegacyFavicon(), copyModernFavicons();
};

function copyLegacyFavicon() {
	return app.gulp.src(app.path.src.faviconLegacy, { encoding: false }).pipe(app.gulp.dest(app.path.build.faviconLegacy));
}

function copyModernFavicons() {
	return app.gulp.src(app.path.src.faviconsModern, { encoding: false }).pipe(app.gulp.dest(app.path.build.faviconsModern));
}
