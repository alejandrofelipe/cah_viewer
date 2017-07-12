import ChildProcess from 'child_process';
// import Sudoer from 'electron-sudo';
import {app} from 'electron';
import path from 'path';

module.exports = () => {
	if (process.argv.length === 1)
		return false;

	const appFolder = path.resolve(process.execPath, '..');
	const rootAtomFolder = path.resolve(appFolder, '..');
	const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
	const exeName = path.basename(process.execPath);

	const spawn = function (command, args) {
		let spawnedProcess;

		try {
			spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
		} catch (error) {
			throw new Error(error);
		}

		return spawnedProcess;
	};

	const spawnUpdate = function (args) {
		return spawn(updateDotExe, args);
	};

	const squirrelEvent = process.argv[1];
	switch (squirrelEvent) {
		case '--squirrel-install':
		case '--squirrel-updated':{
			// let sudo = new Sudoer({name: 'Atualizador SESC'});
			// sudo.spawn('start $PARAM', {env: {PARAM: 'powershell'}}).then(() => {});
			spawnUpdate(['--createShortcut', exeName]);
			setTimeout(app.quit, 1000);
			return true;
		}
		case '--squirrel-uninstall':
			spawnUpdate(['--removeShortcut', exeName]);
			setTimeout(app.quit, 1000);
			return true;

		case '--squirrel-obsolete':
			app.quit();
			return true;
	}
};
