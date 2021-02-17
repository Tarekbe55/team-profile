const fs = require('fs');
const inquirer = require('inquirer');
const validate = require('./src/validate');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const managerHTML = require('./html/managerTemplate');
const engineerHTML = require('./html/engineerTemplate');
const internHTML = require('./html/internTemplate');
const renderHTML = require('./html/finalTemplate');

const MembersArr = [];
let teamName = "";

const startPrompt = () => {

  inquirer.prompt([
    {
      type: 'input',
      message: 'Hello. what is your team\'s name?',
      name: 'teamname',
      validate: validate.notEmpty
    }
  ])
    .then((data) => {
      teamName = data.teamname;
      managerAddition()
    })
}

const managerAddition = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the manager\'s name?',
      name: 'name',
      validate: validate.notEmpty
    },
    {
      type: 'input',
      message: 'What is the manager\'s employee ID?',
      name: 'id',
      validate: validate.numbersOnly
    },
    {
      type: 'input',
      message: 'What is the manager\'s email address?',
      name: 'email',
      validate: validate.email
    },
    {
      type: 'input',
      message: 'What is the manager\'s office number?',
      name: 'officeNumber',
      validate: validate.numbersOnly
    },

  ]).then(function ({ name, id, email, officeNumber }) {
    let newManager;
    newManager = new Manager(name, id, email, officeNumber);
    teamMembersArr.push(newManager);
    addEmployee();


  });

}