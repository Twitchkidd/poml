const readline = require('readline');
const { Command, flags } = require('@oclif/command');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const format = require('date-fns/format');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
// https://thisdavej.com/making-interactive-node-js-console-apps-that-listen-for-keypress-events/

const FONT = 'Doh';
const CUSTOM = 'CUSTOM';
const WORK = 'WORK';
const WORK_MESSAGE = 'Allons-y!';
const RECHARGE = 'RECHARGE';
const RECHARGE_MESSAGE = 'Recharge!';

const MESSAGE_OPTIONS = {
	font: FONT,
	horizontalLayout: 'Default',
	verticalLayout: 'Default',
};

const numOrCustom = val => {
	const p = parseInt(val.split(' ')[0], 10);
	if (p === NaN) {
		return CUSTOM;
	}
	return p;
};

const questions = [
	{
		name: 'workTime',
		type: 'list',
		message: 'Primary block length?',
		// choices: ['25 min', '30 min', '40 min', '45 min', 'Custom value'],
		choices: ['25 min', '30 min', '40 min', '45 min'],
		filter: val => {
			return numOrCustom(val);
		},
	},
	{
		name: 'rechargeTime',
		type: 'list',
		message: 'Recharge time?',
		// choices: ['5 min', '10 min', '15 min', '20 min', 'Custom value'],
		choices: ['5 min', '10 min', '15 min', '20 min'],
		filter: val => {
			return numOrCustom(val);
		},
	},
];

const ms = min => min * 60000;

class PomrCommand extends Command {
	printMessage(type) {
		const message = type === WORK ? WORK_MESSAGE : RECHARGE_MESSAGE;
		if (type === WORK) {
			this.log(chalk.green(figlet.textSync(message, MESSAGE_OPTIONS)));
		} else if (type === RECHARGE) {
			this.log(chalk.blue(figlet.textSync(message, MESSAGE_OPTIONS)));
		}
		this.log(format(new Date(), 'EEEE MMM do, h:mm bbb'));
		/*
		 * EEEE = Monday
		 *	MMM = Jan
		 * do = 1st
		 * h = 1
		 * mm = 08
		 * bbb = am (inc noon & midnight)
		 */
	}
	go(workTime, rechargeTime) {
		// if (workTime === NaN || rechargeTime === NaN) {
		// 	this.error('Not implemented yet!');
		// }
		this.log(
			`Work ${workTime} minutes, rest ${rechargeTime} minutes!\nCtrl + Shift + C to close! (On my machine! ~Gareth)`
		);
		const totalTime = ms(workTime) + ms(rechargeTime);
		this.printMessage(WORK);
		setInterval(() => {
			this.printMessage(WORK);
		}, totalTime);
		const setrechargeTimer = () => {
			setInterval(() => {
				this.printMessage(RECHARGE);
			}, totalTime);
		};
		setTimeout(() => {
			this.printMessage(RECHARGE);
			setrechargeTimer();
		}, ms(workTime));
	}
	async run() {
		// const { flags } = this.parse(PomCommand);
		// const name = flags.name || 'world';
		// if arg1, find rest block length, or back out
		// if arg1 and arg2, go go go
		// else find work and recharge block lengths
		// this.log(`hello ${name} from ./src/index.js`);
		this.log(chalk.red.bold('Pomr: Pomodoro Timer!'));
		const { workTime, rechargeTime } = await inquirer.prompt(questions); // this can come back out to a fn for MESSAGE_OPTIONS
		this.go(workTime, rechargeTime);
	}
}

PomrCommand.description = `Pomodoro timer CLI!
...
Fire this baby up with \`pomr\` and pick a
work time and recharge time! Customization
coming soon!
`;

PomrCommand.flags = {
	// add --version flag to show CLI version
	version: flags.version({ char: 'v' }),
	// add --help flag to show CLI version
	help: flags.help({ char: 'h' }),
	// name: flags.string({ char: 'n', description: 'name to print' }),
};

module.exports = PomrCommand;
