#!/usr/bin/env node

const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const os = require('os');
const path = require('path');
const writeFile = promisify(require('fs').writeFile);
const logger = require('node-color-log');

const info = msg => {
	logger.fontColorLog('blue', msg);
};

const warn = msg => {
	logger.fontColorLog('yellow', msg);
};

const error = msg => {
	logger.fontColorLog('red', msg);
};

const getFilesToBeCommitted = async () => {
	const { stdout: filesStr } = await exec(`git diff --name-only --cached`);

	return filesStr.split('\n');
};

const getConfigFilesToBeCommitted = async () => {
	const files = await getFilesToBeCommitted();

	return files.filter(file => file.includes('config/'));
};

const writeTempFile = data => {
	return writeFile(path.join(os.tmpdir(), 'recipesprecommit'), JSON.stringify(data));
};

const resetConfigFiles = files => {
	warn(`You have added config files. Removing from commit: (${files.join(', ')})`);

	return Promise.all(files.map(file => exec(`git reset ${file}`)));
};

const lint = () => {
	info('Linting...');

	return exec(`yarn lint`);
};

const build = () => {
	info('Building...');

	return exec(`yarn build`);
};

const addFilesToCommit = files => {
	return exec(`git add docs/js/app.js ${files.join(' ')}`);
};

(async () => {
	try {
		const files = await getFilesToBeCommitted();
		const configFiles = await getConfigFilesToBeCommitted();

		// Do not commit config files without explictly not running hooks
		if (configFiles.length) {
			await resetConfigFiles(configFiles);
		}

		await lint();
		await build();

		await addFilesToCommit(files.filter(file => !file.includes('config/')));
	} catch (err) {
		error(err);

		process.exit(1);
	}
})();
