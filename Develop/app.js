const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const chalk = require("Chalk");

const render = require("./lib/htmlRenderer");

const employees = [];

const employeeQuestions = [
    {
        message: "Add Employee Name",
        name: "name"
    },
    {
        message: "Add Employee ID",
        name: "id"
    },
    {
        message: "Add Employee Email",
        name: "email"
    }
]

const roleQuestion = [
    {
        type: 'list', name: 'role', message:"Choose Employee's Role", choices: ["Engineer", "Intern"]
    }
]

const managerQuestions = [ 
    {
        message: "What is this Managers office number?",
        name: "officeNumber"
    }
]

const engineerQuestions = [
    {
        message: "What is the Engineers GitHub Username?",
        name: "github"
    }
]

const internQuestions = [
    {
        message: "What school is the Intern from?",
        name: "school"
    }
]

const continueQuestion = [
    {
        type: 'list', name: 'add', message:'Would You Like To Add Another Employee', choices: ["Yes", "No"]
    }
]


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function init() {
    try {
    console.log(chalk.blue("Start Building Your Team!"));
    console.log(chalk.blue("Start With Adding The Teams Manager"));
    const manager = await inquirer.prompt(employeeQuestions);
    let name = manager.name;
    let id = manager.id
    let email = manager.email;
    newManager(name, id, email)
    } catch (error) {
        console.log("Error")
        }
}

async function chooseEmployeeRole(employees) {
    try {
        const employeeRole = await inquirer.prompt(roleQuestion)
        let role = employeeRole.role;

        if (role === "Engineer") {
            newEngineer(employees);
        } else if (role === "Intern") {
            newIntern(employees);
        } 
    } catch (error) {
        console.log("Error")
        }
}

    

async function newManager(name, id, email) {
    const office = await inquirer.prompt(managerQuestions);
    let officeNumber = office.officeNumber;

    const newManger = new Manager(name, id, email, officeNumber)
    console.log(newManger);
    employees.push(newManger);

    // 
    console.log(chalk.red("Manager Added!"))
    // 

    chooseEmployeeRole(employees);
}

async function newEngineer(employees) {
    try {
        const employeeInfo = await inquirer.prompt(employeeQuestions)
        // console.log(employeeInfo);
        let name = employeeInfo.name;
        let id = employeeInfo.id
        let email = employeeInfo.email;
    

    const account = await inquirer.prompt(engineerQuestions);
    let github = account.github;
    
    const newEngineer = new Engineer(name, id, email, github)
    console.log(newEngineer);
    employees.push(newEngineer);

    // 
    console.log(chalk.yellow("Engineer Added!"))
    // 

} catch (error) {
    console.log("Error")
    }

    contQuestion(employees);
}

async function newIntern(employees) {
    try { 
        const employeeInfo = await inquirer.prompt(employeeQuestions)
        // console.log(employeeInfo);
        let name = employeeInfo.name;
        let id = employeeInfo.id
        let email = employeeInfo.email;

        
    const education = await inquirer.prompt(internQuestions);
    let school = education.school;

    const newIntern = new Intern(name, id, email, school)
    console.log(newIntern);
    employees.push(newIntern);

    // 
    console.log(chalk.green("Intern Added"))
    // 
    } catch (error) {
        console.log("Error")
        }
    contQuestion(employees);
}

async function contQuestion(employees) {
    
    const done = await inquirer.prompt(continueQuestion);

    if (done.add !== "Yes") {
    const html = render(employees);
    writeToFile(html);

    } else {
        chooseEmployeeRole(employees);
    }
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

function writeToFile(html) {
    fs.writeFile("output/team.html", html, (err) => {
        if (err) throw err;
        console.log('Team HTML Page Generated! Check "output" folder');
      });
}

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

init();