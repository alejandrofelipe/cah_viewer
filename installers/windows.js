const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');
const pack = require('../package.json');
getInstallerConfig()
	.then(createWindowsInstaller)
	.catch((error) => {
		console.error(error.message || error);
		process.exit(1);
	});

function getInstallerConfig() {
	const rootPath = path.resolve('./');
	const outPath = path.join(rootPath, 'dist');
	return Promise.resolve({
		appDirectory: path.join(outPath, pack.name + '-win32-x64/'),
		description: pack.productName,
		outputDirectory: path.join(outPath, 'release'),
		setupExe: 'CAHInstaller.exe',
		authors: pack.author.name,
		loadingGif: path.join(rootPath, 'app', 'images', 'gifsSESCUP.gif'),
		exe: pack.name + '.exe',
		noMsi: true,
	});
}
