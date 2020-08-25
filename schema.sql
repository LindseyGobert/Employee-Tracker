DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO role (title, salary)
VALUES ("Accountant", 80000.00);

INSERT INTO role (title, salary)
VALUES ("Salesperson", 40000.00);

INSERT INTO role (title, salary)
VALUES ("Software Engineer", 100000.00);

INSERT INTO employee (first_name, last_name)
VALUES ("John", "Doe");

INSERT INTO employee (first_name, last_name)
VALUES ("Jane", "Doe");

INSERT INTO employee (first_name, last_name)
VALUES ("Ted", "Brown");