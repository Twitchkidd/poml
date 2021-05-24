const { Command, flags } = require('@oclif/command');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');

const CUSTOM = 'CUSTOM';
const WORK = 'WORK';
const RECHARGE = 'RECHARGE';

class PomCommand extends Command {
	async run() {
		const { flags } = this.parse(PomCommand);
		const name = flags.name || 'world';
		// if arg1, find rest block length, or back out
		// if arg1 and arg2, go go go
		// else find work and recharge block lengths
		this.log(`hello ${name} from ./src/index.js`);
	}
}

PomCommand.description = `Describe the command here
...
Extra documentation goes here
`;

PomCommand.flags = {
	// add --version flag to show CLI version
	version: flags.version({ char: 'v' }),
	// add --help flag to show CLI version
	help: flags.help({ char: 'h' }),
	name: flags.string({ char: 'n', description: 'name to print' }),
};

module.exports = PomCommand;

const init = () => {
	console.log(chalk.red.bold('Pom: Pomodoro Timer!'));
};

const numOrCustom = val => {
	const p = parseInt(val.split(' ')[0], 10);
	p === NaN ? CUSTOM : p;
};

const askQuestions = () => {
	const questions = [
		{
			name: 'workTime',
			type: 'list',
			message: 'Primary block length?',
			choices: ['25 min', '30 min', '40 min', '45 min', 'Custom value'],
			filter: val => {
				return numOrCustom(val);
			},
		},
		{
			name: 'rechargeTime',
			type: 'list',
			message: 'Recharge time?',
			choices: ['5 min', '10 min', '15 min', '20 min', 'Custom value'],
			filter: val => {
				return numOrCustom(val);
			},
		},
	];
	return inquirer.prompt(questions);
};

const printMessage = type => {
	const message = type === WORK ? 'Allonz-y!' : 'Recharge!';
	const options = {
		font: 'Doh',
		horizontalLayout: 'Default',
		verticalLayout: 'Default',
	};
	if (type === WORK) {
		console.log(chalk.green(figlet.textSync(message, options)));
	} else if (type === RECHARGE) {
		console.log(chalk.blue(figlet.textSync(message, options)));
	}
	console.log(new Date());
};

const toMill = min => min * 60000;

const startTimer = (workTime, restTime) => {
	console.log(`Work ${workTime} minutes, rest ${restTime} minutes!`);
	const totalTime = toMill(workTime) + toMill(restTime);
	printMessage(WORK);
	var workTimer = setInterval(() => {
		printMessage(WORK);
	}, totalTime);
	const setRestTimer = () => {
		var restTimer = setInterval(() => {
			printMessage(RECHARGE);
		}, totalTime);
	};
	setTimeout(() => {
		printMessage(RECHARGE);
		setRestTimer();
	}, toMill(workTime));
};

const run = async () => {
	init();
	const answers = await askQuestions();
	const { workTime, restTime } = answers;
	startTimer(workTime, restTime);
};

run();
