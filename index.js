const Manager = require("./lib/manager.js");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const teamMembers = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer.js");
const Choice = require("inquirer/lib/objects/choice");
const employees = [];

function questions() {
    inquirer.prompt([{
        message: "Enter team member's name",
        name: "name"
    },
    {
        type: "list",
        message: "What is the role of the team member you would like to add?",
        choices: [
            "Intern",
            "Manager",
            "Engineer"
        ],
        name: "role"
    },
    {
        message: "Enter team member's Id",
        name: "id"
    },
    {
        message: "Enter team member's email address",
        name: "email"
    }])
    .then(function ({ name, role, id, email }) {
        let roleInfo = "";
        if (roleInfo === Engineer) {
            roleInfo = "github username";
        }
        else if (roleInfo === Intern) {
            roleInfo = "school name"
        }
        else {
            roleInfo = "office phone number"
        }
        inquirer.prompt([{
            message: "Enter team member's role information.",
            name: "roleInfo"
        },
        {
            type: "checkbox",
            message: "Would you like to add another team member?",
            name: "moreMembers",
            choices: ["Yes", "No"]
            }])
            .then(function ({ roleInfo, moreMembers }) {
                let newMember;
                if (role === "Engineer") {
                    newMember = new Engineer(name, id, email, roleInfo);
                    employees.push (newMember)
                } else if (role === "Intern") {
                    newMember = new Intern(name, id, email, roleInfo);
                    employees.push (newMember)
                } else if (role === "Manager") {
                    newMember = new Manager(name, id, email, roleInfo)
                    employees.push (newMember)
                };
                console.log(moreMembers)
                console.log(roleInfo)
                if (moreMembers === "Yes") {
                    questions () 
                } else {
                    var fs = require('fs')

                    fs.writeFileSync (outputPath, render (employees), "utf8")
                }
            })
    })
}

questions ()