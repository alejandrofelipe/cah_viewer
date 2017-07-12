import {ipcMain, BrowserWindow} from 'electron';
import path from 'path';

export default function (width, height, onClosed) {
	const win = new BrowserWindow({
		show: false,
		height: height,
		minHeight: height,
		maxHeight: height,
		width: width,
		minWidth: width,
		maxWidth: width
	});

	win.setMenu(null);

	win.loadURL(`file://${path.resolve(__dirname + '/../views/index.html')}`);

	win.on('closed', onClosed);

	win.once('ready-to-show', () => {
		win.show();
	});

	ipcCalls(win);

	return win;
}


function ipcCalls(win) {
	ipcMain.on('dev', () => {
		win.openDevTools();
	});
}
