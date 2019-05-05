#!/usr/bin/env node

const spawn = require('child_process').spawn;
const logger = require('node-color-log');

const exec = (cmdStr, { outputToConsole = false } = {}) => {
	return new Promise((resolve, reject) => {
		const [cmd, ...args] = cmdStr.split(' ');
		const proc = spawn(cmd, args, { stdio: outputToConsole ? 'inherit' : 'pipe' });

		let stderr;
		let stdout;

		if (!outputToConsole) {
			stderr = '';
			stdout = '';

			proc.stdout.on('data', data => {
				stdout += data.toString();
			});

			proc.stderr.on('data', data => {
				stderr += data.toString();
			});
		}

		proc.on('error', err => {
			stderr = err;
		});

		proc.on('exit', code => {
			if (code !== 0) {
				reject(stderr);
			} else {
				resolve(stdout);
			}
		});
	});
};

const info = msg => {
	logger.fontColorLog('blue', msg);
};

const warn = msg => {
	logger.fontColorLog('yellow', msg);
};

const error = msg => {
	logger.fontColorLog('red', msg);
};

const getJavascriptFiles = (files = []) => {
	return files.filter(file => file.substring(file.length - 3) === '.js');
};

const getFilesToBeCommitted = async () => {
	const filesStr = await exec(`git diff --name-only --cached`);

	return filesStr.split('\n');
};

const getConfigFilesToBeCommitted = async () => {
	const files = await getFilesToBeCommitted();

	return files.filter(file => file.includes('config/'));
};

const containsDistFile = (files = []) => {
	return files.some(file => file.includes('docs/'));
};

// const writeTempFile = data => {
// 	return writeFile(path.join(os.tmpdir(), 'recipesprecommit'), JSON.stringify(data));
// };

const resetConfigFiles = files => {
	warn(`You have added config files. Removing from commit: (${files.join(', ')})`);

	return Promise.all(files.map(file => exec(`git reset ${file}`)));
};

const lint = (files = []) => {
	info('Linting...');

	const jsFiles = getJavascriptFiles(files);

	return exec(`yarn lint-files --no-ignore ${jsFiles.length ? jsFiles.join(' ') : 'src/**/*.js'}`, {
		outputToConsole: true,
	});
};

const build = () => {
	info('Building...');

	return exec(`yarn build`, { outputToConsole: true });
};

const addFilesToCommit = (files = []) => {
	const filesToAdd = files.filter(file => file !== '');
	if (!filesToAdd.length) {
		return Promise.resolve();
	}

	return exec(`git add ${filesToAdd.join(' ')}`);
};

(async () => {
	try {
		const files = await getFilesToBeCommitted();
		const configFiles = await getConfigFilesToBeCommitted();

		// Do not commit config files without explictly not running hooks
		if (configFiles.length) {
			await resetConfigFiles(configFiles);
		}

		await lint(files);

		if (containsDistFile(files)) {
			await build();
		}

		await addFilesToCommit(files.filter(file => !file.includes('config/')));
	} catch (err) {
		error(err);

		process.exit(1);
	}
})();
