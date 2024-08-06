/**
 * Копировать favicon в build
 */
export const favicons = () => {
	return copyLegacyFavicon(), copyModernFavicons();
};

function copyLegacyFavicon() {
	return app.gulp.src(app.path.src.faviconIco, { encoding: false }).pipe(app.gulp.dest(app.path.build.faviconIco));
}

function copyModernFavicons() {
	return app.gulp.src(app.path.src.faviconsOther, { encoding: false }).pipe(app.gulp.dest(app.path.build.faviconsOther));
}
