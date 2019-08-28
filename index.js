#!/usr/bin/env node

const inquirer = require("inquirer");
const schedule = require("node-schedule");
const chalk = require("chalk");
const figlet = require("figlet");

const init = () => {
  console.log(chalk.magenta.bold("Pomodoro timer!"));
};

const askQuestions = () => {
  const questions = [
    {
      name: "WORK",
      type: "list",
      message: "How long shall we set the work timer for?",
      choices: [
        "15 min",
        "20 min",
        "25 min",
        "30 min",
        "40 min",
        "45 min",
        "60 min"
      ],
      filter: function(val) {
        return parseInt(val.split(" ")[0], 10);
      }
    },
    {
      name: "REST",
      type: "list",
      message: "How long shall we set the rest time for?",
      choices: ["5 min", "10 min", "15 min", "20 min", "30 min"],
      filter: function(val) {
        return parseInt(val.split(" ")[0], 10);
      }
    }
  ];
  return inquirer.prompt(questions);
};

const startTimer = (work, rest) => {
  function workMessage() {
    console.log(
      chalk.green(
        figlet.textSync("Go, go, go!", {
          font: "Doh",
          horizontalLayout: "Default",
          verticalLayout: "Default"
        })
      )
    );
  }
  function restMessage() {
    console.log(
      chalk.cyan(
        figlet.textSync("Charge up!", {
          font: "Doh",
          horizontalLayout: "Default",
          verticalLayout: "Default"
        })
      )
    );
  }
  function addMinutesFromNow(minutes) {
    let now = new Date();
    return new Date(now.getTime() + minutes * 60000);
  }
  function restFn() {
    restMessage();
    var k = schedule.scheduleJob(addMinutesFromNow(rest), function() {
      workFn();
    });
  }
  function workFn() {
    workMessage();
    var l = schedule.scheduleJob(addMinutesFromNow(work), function() {
      restFn();
    });
  }
  workMessage();
  var j = schedule.scheduleJob(addMinutesFromNow(work), function() {
    restFn();
  });
};

const run = async () => {
  init();
  const answers = await askQuestions();
  const { WORK, REST } = answers;
  startTimer(WORK, REST);
};

run();
