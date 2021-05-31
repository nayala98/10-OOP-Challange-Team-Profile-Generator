const ManagerExport = require("./lib/manager");
const EngineerExport = require("./lib/engineer");
const InternExport = require("./lib/intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function appMenu() {
    function createManager() {
        inquirer.prompt([{
            type: "input",
            name: "managerName",
            message: "Manager's Name:",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name:"
            }
        },
        {
            type: "input",
            name: "managerId",
            message: "Manager's ID:",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    if (idArray.includes(answer)) {
                        return "This ID is already being used. Please re-enter Manager's ID:"
                    }
                    else {
                        return true;
                    }
                }
                return "Please enter a number greater than zero:";
            }
        },
        {
            type: "input",
            name: "managerEmail",
            message: "Manager's Email:",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid email:"
            }
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "Manager's Office Number:",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a number greater than zero:"
            }
        }
    ])
        .then(answers => {
            const manager = new ManagerExport(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        })
    }
        //Creates Team
        function createTeam() {
            inquirer.prompt([{
                type: "list",
                name: "memberChoice",
                message: "Would you like to add another team member?",
                choices: [
                    "Engineer",
                    "Intern",
                    "No More Members"
                ]
            }]).then(userChoice => {
                switch (userChoice.memberChoice) {
                    case "Engineer":
                        addEngineer();
                        break;
                    case "Intern":
                        addIntern();
                        break
                    default:
                        buildTeam();
                }
            })
        }
        //Adds Engineer
        function addEngineer() {
            inquirer.prompt([{
                type: "input",
                name: "engineerName",
                message: "Engineer's Name:",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a name:"
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "Engineer's ID:",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "This ID is already being used. Please re-enter Manager's ID:"
                        }
                        else {
                            return true;
                        }
                    }
                    return "Please enter a number greater than zero:";
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "Engineer's Email:",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email:"
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "Engineer's GitHub Username:",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a username:"
                }
            }
            ]).then(answers => {
                const engineer = new EngineerExport(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
                teamMembers.push(engineer);
                idArray.push(answers.engineerId);
                createTeam();
            });
        }
        // Intern
    function addIntern() {
        inquirer.prompt([{
            type: "input",
            name: "internName",
            message: "Intern's Name:",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name:"
            }
        },
        {
            type: "input",
            name: "internId",
            message: "Intern's ID:",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    if (idArray.includes(answer)) {
                        return "This ID is already being used. Please re-enter Manager's ID:"
                    }
                    else {
                        return true;
                    }
                }
                return "Please enter a number greater than zero:";
            }
        },
        {
            type: "input",
            name: "internEmail",
            message: "Intern's Email:",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid email:"
            }
        },
        {
            type: "input",
            name: "internSchool",
            message: "Intern's School Name:",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a school name:"
            }
        }
        ]).then(answers => {
            const intern = new InternExport(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
            teamMembers.push(intern);
            idArray.push(answers.internId);
            createTeam();
        });
    }
    // Final Team Function and Export
    function buildTeam() {
        // Create Output if nonexistent
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }
    createManager();
}
appMenu();