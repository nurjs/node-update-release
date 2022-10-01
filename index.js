#!/usr/bin/env node

/**
 * nurjs
 * Helps to create and version releases of NPM packages
 *
 * @author nurjs <https://github.com/nurjs>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const directoryPath = path.join(__dirname);

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);

	if (flags.minor) {
		console.log('Updating minor version');
		var versionUpdate = [0, 1, 0];

		updatePackage(versionUpdate);
	}
	if (flags.major) {
		console.log('Updating major version');
		var versionUpdate = [1, 0, 0];
		updatePackage(versionUpdate);
	}
	if (flags.patch) {
		console.log('Updating patch version');
		var versionUpdate = [0, 0, 1];
		updatePackage(versionUpdate);
	}
})();
function handleVersions(version, versionUpdate) {
	var major = parseInt(versionUpdate[0]),
		minor = parseInt(versionUpdate[1]),
		patch = parseInt(versionUpdate[2]);
	if (major != 0 || minor != 0) {
		version[2] = '0';
	}
	if (major != 0) {
		version[1] = '0';
		version[0] = (parseInt(version[0]) + major).toString();
	}
	if (minor != 0) {
		version[1] = (parseInt(version[1]) + minor).toString();
	}
	if (patch != 0) {
		version[2] = (parseInt(version[2]) + patch).toString();
	}
	return version.join('.');
}
function updatePackage(versionUpdate) {
	fs.readdir(directoryPath, function (err, files) {
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		}
		files.forEach(async function (file) {
			if (file === 'package.json') {
				var content = fs.readFileSync(file, 'utf8');
				var content = JSON.parse(content);
				var oldVersion = content.version.split('.');
				var newVersion = await handleVersions(
					oldVersion,
					versionUpdate
				);
				console.log(
					`updating from version ${content.version} to ${newVersion}`
				);
				content.version = newVersion;
				fs.writeFileSync(
					file,
					JSON.stringify(content, null, 4),
					'utf8'
				);

				exec('npm install --save');
				await publishToGit(newVersion);
			}
		});
	});
}
async function publishToGit(version) {
	if (flags.git) {
		console.log('Publishing to git');
		await sleep(2000);
		await exec('git add .');
		await sleep(1000);
		await exec(`git commit -m "Release ${version}"`);
		await sleep(1000);
		await exec(`git push -u origin ${flags.branch}`);
		console.log(`successfully pushed code, waiting for tag`);
		await sleep(1000);
		await exec(`git tag -a ${version} -m "Release ${version}"`);
		sleep(2000);
		await exec(`git push --tags`);
		sleep(5000);
		await exec(`git push --tags`);
	}
}
function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}
