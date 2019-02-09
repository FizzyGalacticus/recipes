#!/usr/bin/env node

const os = require('os');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

(async () => {
    const platform = os.platform();
    let pid;

    try {
        if (platform === 'linux') {
            const { stdout } = await exec('ss -tunap | grep 3001');
            pid = stdout.split('pid=')[1].split(',')[0];
        } else if (platform === 'darwin') {
            ({ stdout: pid } = await exec(`lsof -nP -i4TCP:3001 | grep LISTEN | awk '{print $2}'`));
        }

        await exec(`sudo kill -9 ${pid}`);
    } catch (err) {
        // eslint-ignore-next-line
        console.log('No process to kill.');
    }
})();
