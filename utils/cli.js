const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: false,
		desc: `Clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		desc: `Print CLI version`
	},
	git: {
		type: `boolean`,
		desc: `is used to create a git tag for the release and commit to push to the remote`,
		default: true
	},
	branch: {
		type: `string`,
		alias: `b`,
		default: 'main',
		desc: `The name of the branch to push to`
	},
	minor: {
		type: `boolean`,
		default: false,
		desc: `Print minor version`
	},
	major: {
		type: `boolean`,
		default: false,
		desc: `Print major version`
	},
	patch: {
		type: `boolean`,
		default: false,
		desc: `Print patch version`
	}
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `nur`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
