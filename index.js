var mysql = require("mysql");
var inquirer = require("inquirer");
var util = require("util");
const { allowedNodeEnvironmentFlags } = require("process");

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

connection.query = util.promisify(connection.query);

connection.connect(function(err) {
    if (err) throw err;
    employeeTracker();
});

const allEmployees = () => {
    return connection.query(`
    select
    a.id,
    a.first_name,
    a.last_name,
    b.title,
    d.name as department,
    b.salary,
    concat(c.first_name , " " , c.last_name) as manager
    from employee a
    left join role b on a.role_id=b.id
    left join department d on b.department_id=d.id
    left join employee c on a.manager_id=c.id;`);
    
};

const allRoles = () => {
    return connection.query(`
    select * from role;
    `);
    
};

const allDepartments = () => {
    return connection.query(`
    SELECT * FROM employee_trackerDB.department;
    `);
};

async function employeeTracker() {
    let choice = await inquirer.prompt({
        name: "selection",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Add Department", "Add Role", "Update Employee Role", "Exit"],
        type: "list"
    });
    switch (choice.selection) {
        case "View All Employees":
            allEmployees().then((data) => {
                console.table(data);
                employeeTracker();
            });
            break;

        case "View All Departments":
            allDepartments().then((data) => {
                console.table(data);
                employeeTracker();
            });
            break;

        case "Add Employee":
            let roles = await allRoles();
            let titles = roles.map(item => ({name: item.title, value: item.id}));
            const employees = await allEmployees();
            const employeeList = employees.map(item => ({name: `${item.last_name}, ${item.first_name}`, value: item.id}))
            employeeList.unshift({name: "No Manager", value: null});
            let userInput = await inquirer.prompt([{
                name: "first_name",
                message: "First Name: ",
                type: "input"
            },
            {
                name: "last_name",
                message: "Last Name: ",
                type: "input"

            },
            {
                name: "role_id",
                message: "Role: ",
                choices: titles,
                type: "list"

            },
            {
                name: "manager_id",
                message: "Manager: ",
                choices: employeeList,
                type: "list"

            },
        
        ]);
            console.log("userInput", userInput)
            connection.query(`insert into employee set ?`, userInput)
            employeeTracker();

            break;

        case "Add Department":
            connection.query("SELECT * FROM employee", function(err,data){
                if (err) throw err;
                console.table(data);
            })

            break;

        case "Add Role":
            connection.query("SELECT * FROM employee", function(err,data){
                if (err) throw err;
                console.table(data);
            })

            break;

        case "Update Employee Role":
            connection.query("SELECT * FROM employee", function(err,data){
                if (err) throw err;
                console.table(data);
            })

            break;
    }

}