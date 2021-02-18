const fs = require('fs');
const inquirer = require('inquirer');
const validate = require('./html/validate');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const managerTemplate = require('./html/managerTemplate');
const engineerTemplate = require('./html/engineerTemplate');
const internTemplate = require('./html/internTemplate');
const finalTemplate = require('./html/finalTemplate');

const membersArr = [];
let teamName = "";

const startPrompt = () => {

  inquirer.prompt([{
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
  inquirer.prompt([{
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
    membersArr.push(newManager);
    employeeAddition();


  });

}

const employeeAddition = () => {
  inquirer.prompt([{
    type: 'list',
    message: 'Select from the options below to add members to your team. Want to add more members?',
    name: 'addOrEnd',
    choices: ['Yes, I would like to add an engineer',
      'Yes, I would like to add an intern',
      'Nope, I am finished.']
  }

  ]).then(function (choices) {
    const addOrEnd = choices.addOrEnd;
    if (addOrEnd.includes('intern')) {
      internAddition()
    }
    if (addOrEnd.includes('engineer')) {
      engineerAddition()
    }
    if (addOrEnd.includes('finished')) {

      const finishHTML = finalTemplate(teamName, addEmployeeCard());
      fs.writeFileSync('./html/new.html', finishHTML);
    };
  });
}

const engineerAddition = () => {
  inquirer.prompt([{
    type: 'input',
    message: 'What is the engineer\'s name?',
    name: 'name',
    validate: validate.notEmpty
  },
  {
    type: 'input',
    message: 'What is the engineer\'s employee ID?',
    name: 'id',
    validate: validate.numbersOnly
  },
  {
    type: 'input',
    message: 'What is the engineer\'s email address?',
    name: 'email',
    validate: validate.email
  },
  {
    type: 'input',
    message: 'What is the engineers\'s Github username?',
    name: 'github',
    validate: validate.notEmpty
  },

  ]).then(function ({ name, id, email, github }) {
    let newEngineer;
    newEngineer = new Engineer(name, id, email, github);
    membersArr.push(newEngineer);

    employeeAddition();
  });

}

const internAddition = () => {
  inquirer.prompt([{
    type: 'input',
    message: 'What is the intern\'s name?',
    name: 'name',
    validate: validate.notEmpty
  },
  {
    type: 'input',
    message: 'What is the intern\'s employee ID?',
    name: 'id',
    validate: validate.numbersOnly
  },
  {
    type: 'input',
    message: 'What is the intern\'s email address?',
    name: 'email',
    validate: validate.email
  },
  {
    type: 'input',
    message: 'What school does the intern attend?',
    name: 'school',
    validate: validate.notEmpty
  },

  ]).then(function ({ name, id, email, school }) {
    let newIntern;
    newIntern = new Intern(name, id, email, school);
    membersArr.push(newIntern);
    employeeAddition();

  });

}

const addEmployeeCard = () => {

  let cards = "";
  membersArr.forEach(member => {

    if (member.getRole() === 'Manager') {
      cards += managerTemplate(member)
    }
    if (member.getRole() === 'Engineer') {
      cards += engineerTemplate(member)
    }
    if (member.getRole() === 'Intern') {
      cards += internTemplate(member)
    }
  })
  return cards;
}

function init() {
  startPrompt();
}
init()