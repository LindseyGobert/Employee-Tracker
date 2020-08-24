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

const allEmployees = () => new Promise((res, req) => {
    connection.query(`
    select
    a.ID,
    a.first_name,
    a.last_name,
    b.title,
    b.salary,
    concat(c.first_name , " " , c.last_name) as manager
    from employee a
    left join role b on a.role_id=b.ID
    left join employee c on a.manager_id=c.ID;
    `, function(err, data){
        if (err) throw err; 
        res(data);
    })
});

async function employeeTracker() {
    let choice = await inquirer.prompt({
        name: "selection",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employee", "Add Department", "Add Role", "Update Employee Role"],
        type: "list"
    });
    switch (choice.selection) {
        case "View All Employees":
            allEmployees().then((data) => {
                console.table(data);
                employeeTracker();
            });
            break;

        case "Add Employee":
            if (err) throw err;
            const titles = data.map(item => item.title);
            const employees = await allEmployees();
            const employeeList = employees.map(item => `${item.last_name}, ${item.first_name}`)
            employeeList.push("null");
            inquirer.prompt([{
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
                name: "role_title",
                message: "Role: ",
                choices: titles,
                type: "list"

            },
            {
                name: "manager_name",
                message: "Manager: ",
                choices: employeeList,
                type: "list"

            },
        
        ])

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