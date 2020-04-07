#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");

const init = () => {
  console.log(chalk.magenta.bold("Pomodoro timer!"));
};

const askQuestions = () => {
  const questions = [
    {
      name: "workTime",
      type: "list",
      message: "How long shall we set the work timer for?",
      choices: [
        "15 min",
        "20 min",
        "25 min",
        "30 min",
        "40 min",
        "45 min",
        "60 min",
      ],
      filter: function (val) {
        return parseInt(val.split(" ")[0], 10);
      },
    },
    {
      name: "restTime",
      type: "list",
      message: "How long shall we set the rest time for?",
      choices: ["5 min", "10 min", "15 min", "20 min", "30 min"],
      filter: function (val) {
        return parseInt(val.split(" ")[0], 10);
      },
    },
  ];
  return inquirer.prompt(questions);
};

const printMessage = (type) => {
  const message = type === "WORK" ? "Go, go, go!" : "Charge up!";
  const options = {
    font: "Doh",
    horizontalLayout: "Default",
    verticalLayout: "Default",
  };
  if (type === "WORK") {
    console.log(chalk.green(figlet.textSync(message, options)));
  } else if (type === "REST") {
    console.log(chalk.cyan(figlet.textSync(message, options)));
  }
  console.log(new Date());
};

const minutesToMilliseconds = (minutes) => minutes * 60000;

const startTimer = (workTime, restTime) => {
  console.log(
    `Working for ${workTime} minutes, resting for ${restTime} minutes!`
  );
  const totalTime =
    minutesToMilliseconds(workTime) + minutesToMilliseconds(restTime);
  printMessage("WORK");
  var workTimer = setInterval(() => {
    printMessage("WORK");
  }, totalTime);
  const setRestTimer = () => {
    var restTimer = setInterval(() => {
      printMessage("REST");
    }, totalTime);
  };
  setTimeout(() => {
    printMessage("REST");
    setRestTimer();
  }, minutesToMilliseconds(workTime));
};

const run = async () => {
  init();
  const answers = await askQuestions();
  const { workTime, restTime } = answers;
  startTimer(workTime, restTime);
};

run();
