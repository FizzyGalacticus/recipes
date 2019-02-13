#!/usr/bin/env node

const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const os = require('os');
const path = require('path');
const writeFile = promisify(require('fs').writeFile);

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
	console.warn(`You have added config files. Removing from commit: (${files.join(', ')})`);

	return Promise.all(files.map(file => exec(`git reset ${file}`)));
};

const lint = () => {
	console.log('Linting...');

	return exec(`yarn lint`);
};

const build = () => {
	console.log('Building...');

	return exec(`yarn build`);
};

const addFilesToCommit = files => {
	return exec(`git add ${files.join(' ')}`);
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
		console.error(err);

		process.exit(1);
	}
})();
