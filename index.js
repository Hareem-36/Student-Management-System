#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const generateStudentID = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
};
let myBalance = 10000;
let answer = await inquirer.prompt([
    {
        name: "students",
        type: "input",
        message: chalk.magentaBright("Enter Student Name :"),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a name :";
        },
    },
    {
        name: "age",
        type: "input",
        message: chalk.magentaBright("Enter Student Age :"),
        validate: function (value) {
            const age = parseInt(value, 10);
            if (!isNaN(age) && age > 0) {
                return true;
            }
            return "Please enter a valid age :";
        },
    },
    {
        name: "courses",
        type: "list",
        message: chalk.magentaBright("Please Select The Course To Enrolled"),
        choices: ["HTML", "CSS", "JavaScript", "TypeScript", "Python"],
    },
]);
const tutionFees = {
    "HTML": 2000,
    "CSS": 3200,
    "JavaScript": 5700,
    "TypeScript": 4500,
    "Python": 7999,
};
const studentID = generateStudentID();
console.log(chalk.bold.greenBright(`<<<<<<<<<<<<< Courses Fees >>>>>>>>>>>>>>>>>.`));
console.log(chalk.greenBright(`\n\t Tuition Fees : ${tutionFees[answer.courses]}`));
console.log(chalk.greenBright(`\n\t Balance : ${myBalance}`));
console.log(chalk.greenBright(`\n\t Your Student ID : ${studentID}\n`));
console.log(chalk.bold.greenBright(`<<<<<<<<<<<<< Courses Fees >>>>>>>>>>>>>>>>>.`));
const paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: chalk.magenta("Select Payment Method"),
        choices: ["Bank Transfer", "EasyPaisa", "JazzCash"],
    },
    {
        name: "amount",
        type: "input",
        message: chalk.magenta("Transfer Money :"),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please Enter a Non-Empty Value.";
        },
    },
]);
console.log(chalk.bold.greenBright(`\nYou Selected Payment Method ${paymentType.payment}`));
const tuitionFee = tutionFees[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);
if (paymentAmount >= tuitionFee) {
    console.log(chalk.bold.greenBright(`\nCongratulations, You Have Successfully Enrolled in ${answer.courses}.\n`));
    let info = await inquirer.prompt([
        {
            name: "select",
            type: 'list',
            message: chalk.magenta("What Would You Like To Do Next?"),
            choices: ["View Status", "Exit"],
        },
    ]);
    if (info.select === "View Status") {
        console.log(chalk.bold.blueBright(`\n************ STATUS ************\n`));
        console.log(chalk.bold.greenBright(`\nStudent Name : ${answer.students}\n`));
        console.log(chalk.bold.greenBright(`Student ID : ${studentID}\n`));
        console.log(chalk.bold.greenBright(`Age : ${answer.age}\n`));
        console.log(chalk.bold.greenBright(`Course : ${answer.courses}\n`));
        console.log(chalk.bold.greenBright(`Tuition Fees Paid : ${paymentAmount}\n`));
        console.log(chalk.bold.greenBright(`Remaining Balance : ${myBalance -= paymentAmount}\n`));
        console.log(chalk.bold.greenBright(`Your Payment Status : Paid\n`));
    }
    else {
        console.log(chalk.redBright(`\n<<<<<<<<< Exiting Student Management System >>>>>>>>>>>>\n`));
    }
}
else {
    console.log(chalk.bold.redBright(`Invalid Amount Due To Course.`));
}
