const Employee = require("./employee.js");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
        this.role = "Intern"
    }
    getRole() {
        return "Engineer"
        return "Intern"
    }
    getSchool() {
        return this.school;
    }
}
module.exports = Intern;