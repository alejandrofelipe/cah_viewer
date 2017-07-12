import squirrel from './squirrel';
// import path from 'path';
import {app} from 'electron';
import __mainWindow from './frames/index';

let mainWindow;

function onClosed() {
	mainWindow = null;
}

if (!squirrel()) {
	let shouldQuit = app.makeSingleInstance(function () {
		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.focus();
		}
	});

	if (shouldQuit) {
		app.isQuiting = true;
		app.quit();
	}

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});

	app.on('activate', () => {
		if (!mainWindow) {
			mainWindow = __mainWindow(1000, 700, onClosed);
		}
	});

	app.on('ready', () => {
		mainWindow = __mainWindow(1000, 700, onClosed);

		if (process.env.TEST)
			mainWindow.openDevTools();
	});
}
