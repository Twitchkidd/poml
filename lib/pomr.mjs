import chalk from 'chalk';

const INPUT = 'input';
const TIMER = 'timer';

export const pom = function () {
	let mode = INPUT;
	console.log(
		chalk.white.bgRed.bold(`
	pomr - simple pomodoro timer
	`)
	);
	if (mode === INPUT) {
		console.log(
			chalk.gray(`
		Escape clears input or exits
		`)
		);
	}
	console.log(
		chalk.redBright(`
	Please set times and mode names or pick defaults
	(25 minutes focus, 5 minutes recharge.)
	`)
	);
	/*
	 * Questions
	 */
	// Whoops, you're thinking it's going to be reactive lol
	if (mode === TIMER) {
		console.log(
			chalk.gray(`
		Space pauses/plays
		R resets
		Escape ends timer
		`)
		);
	}
};
