#!/usr/bin/env node
// @flow

const spawn = require('child_process').spawn;
const logger = require('node-color-log');

type FileList = Array<string>;
type MessageList = Array<string>;

const info = (...msgs: MessageList) => {
	logger.fontColorLog('blue', msgs.join(' '));
};

const warn = (...msgs: MessageList) => {
	logger.fontColorLog('yellow', msgs.join(' '));
};

const error = (...msgs: MessageList) => {
	logger.fontColorLog('red', msgs.join(' '));
};

const exec = (
	cmdStr: string,
	{ outputToConsole = false }: { outputToConsole?: boolean } = {}
): Promise<string | undefined> => {
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

const getJavascriptFiles = (files: FileList = []) => {
	return files.filter(file => file.substring(file.length - 3) === '.js');
};

const getFilesToBeCommitted = async () => {
	const filesStr = await exec(`git diff --name-status --cached`);

	const filesWithStatus = filesStr.split('\n');

	return filesWithStatus
		.filter(str => str !== '')
		.reduce(
			(acc, fileWithStatusStr) => {
				const [status, file] = fileWithStatusStr
					.split('\t')
					.map(str => str.trim())
					.filter(str => str !== '');

				switch (status.toUpperCase()) {
					case 'A':
						acc.added.push(file);
						break;
					case 'M':
						acc.modified.push(file);
						break;
					case 'D':
						acc.deleted.push(file);
						break;
					default:
						warn(`Received unknown status for git file: ${status}`);
				}

				acc.all.push(file);

				return acc;
			},
			{ added: [], modified: [], deleted: [], all: [] }
		);
};

const getConfigFiles = (files: FileList = []) => {
	return files.filter(file => file.includes('config/'));
};

const containsDistFile = (files: FileList = []) => {
	return files.some(file => file.includes('docs/'));
};

const resetConfigFiles = (files: FileList = []) => {
	warn(`You have added config files. Removing from commit: (${files.join(', ')})`);

	return Promise.all(files.map(file => exec(`git reset ${file}`)));
};

const prettier = (files: FileList = []) => {
	info('Prettifying...');

	const jsFiles = getJavascriptFiles(files);

	return exec(`yarn prettier-files ${jsFiles.length ? jsFiles.join(' ') : 'src/**/*.js'}`);
};

const lint = (files: FileList = []) => {
	info('Linting...');

	const jsFiles = getJavascriptFiles(files).filter(file => !file.startsWith('docs/'));

	return exec(`yarn lint --no-ignore ${jsFiles.length ? jsFiles.join(' ') : 'src/**/*.js'}`, {
		outputToConsole: true,
	});
};

const build = () => {
	info('Building...');

	return exec(`yarn build`, { outputToConsole: true });
};

const addFilesToCommit = (files: FileList = []) => {
	const filesToAdd = files.filter(file => file !== '');
	if (!filesToAdd.length) {
		return Promise.resolve();
	}

	return exec(`git add ${filesToAdd.join(' ')}`);
};

(async () => {
	try {
		const { added, modified, /* deleted, */ all } = await getFilesToBeCommitted();
		const configFiles = getConfigFiles(all);

		// Do not commit config files without explictly not running hooks
		if (configFiles.length) {
			await resetConfigFiles(configFiles);
		}

		await lint([...added, ...modified]);
		await prettier([...added, ...modified]);

		if (containsDistFile([...added, ...modified])) {
			await build();
		}

		await addFilesToCommit(all.filter(file => !file.includes('config/')));
	} catch (err) {
		error(err);

		process.exit(1);
	}
})();
