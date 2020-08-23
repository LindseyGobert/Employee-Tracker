var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    employeeTracker();
});

async function employeeTracker() {
    let choice = await inquirer.prompt({
        name: "selection",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Add Department", "Add Role", "Update Employee Role"],
        type: "list"
    })

}