import inquirer from "inquirer";
import chalk from "chalk";
//api link coversion
let apiLink = " https://v6.exchangerate-api.com/v6/723d3a12f6cb61ae4ededfbd/latest/PKR";
//Fetching data
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(apiLink);
// object to array
let countries = Object.keys(data);
// user input first country
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting from",
    choices: countries,
});
// irst country money
let userMoney = await inquirer.prompt({
    type: "number",
    name: "currency",
    message: `Please enter the amount in ${chalk.greenBright.bold(firstCountry.name)}:`,
});
// covert country
let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting to",
    choices: countries,
});
// conversion rate
let cnv = `https://v6.exchangerate-api.com/v6/723d3a12f6cb61ae4ededfbd/pair/${firstCountry.name}/${secondCountry.name}`;
// fetching data for conversion rate
let cnvData = async (data) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};
let conversionRate = await cnvData(cnv);
let convertedRate = userMoney.currency * conversionRate;
console.log(`Your ${chalk.bold.greenBright(firstCountry.name)} ${chalk.bold.greenBright(userMoney.currency)} in ${chalk.bold.greenBright(secondCountry.name)} is ${chalk.bold.greenBright(convertedRate)}`);
