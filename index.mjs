#!/usr/bin/env zx
import 'zx/globals';

$.verbose = false;

await $`clear`;
echo(chalk.white.bgRed.bold('\npomr - pomodoro timer\n'));

const work_for = await question('How long to work for?', {
	choices: ['10 min', '15 min'],
});
await sleep(160);
echo(work_for);

// await $`pwd`;
// const str = 'Hey!';
// await $`echo ${str}`;
// pomr - pomodoro timer

// $ pwd
// /home/gareth/Code/pomr
// $ echo $'Hey!'
// Hey!

sleep(90000);
