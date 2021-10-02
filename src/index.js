const { Command, flags } = require('@oclif/command');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const format = require('date-fns/format');

class PomrCommand extends Command {
	static description = `
	Pick working and recharging times to make sure you're taking breaks!
	`;
	static flags = {
		// todo: what's this?: add --version flag to show CLI version
		version: flags.version({ char: 'v' }),
		help: flags.help({ char: 'h' }),
	};
	async run() {
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
		const printMessage = type => {
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
		};
		const go = (workTime, rechargeTime) => {
			this.log(
				`Work ${workTime} minutes, rest ${rechargeTime} minutes!\nCtrl + Shift + C to close! (On my machine! ~Gareth)`
			);
			const totalTime = ms(workTime) + ms(rechargeTime);
			printMessage(WORK);
			setInterval(() => {
				printMessage(WORK);
			}, totalTime);
			const setrechargeTimer = () => {
				setInterval(() => {
					printMessage(RECHARGE);
				}, totalTime);
			};
			setTimeout(() => {
				printMessage(RECHARGE);
				setrechargeTimer();
			}, ms(workTime));
		};
		this.log(chalk.red.bold('Pomr: Pomodoro Timer!'));
		const { workTime, rechargeTime } = await inquirer.prompt(questions);
		go(workTime, rechargeTime);
	}
}

module.exports = PomrCommand;
