const {
				app,
				Menu,
				Tray,
				nativeImage,
			} = require('electron');
const path = require('path');
const Util = request('./Util');
const appPath = path.join(app.getPath('home'), '.ls');

let tray;

if (app.makeSingleInstance((argv, workingDirectory) => {})) {
	Util.showError('すでに起動してるっぽいdёsц☆');
	app.quit();
}

class App {
	static get path() {
		return appPath;
	}

	static trayInit() {
		tray = new Tray(nativeImage.createFromPath(path.join(__dirname, '/icon/icon.png')));
		tray.setContextMenu(Menu.buildFromTemplate([{
			label: '終了',
			click: () => { app.quit(); }
		}]));
		tray.setToolTip('LiveSupport');
	}
}

module.exports = App;
