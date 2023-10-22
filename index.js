import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
// Create a list of random users
const createUser = () => {
    const users = [];
    for (let i = 0; i < 50; i++) {
        const user = {
            id: i,
            PIN: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(1000 * Math.random() * 900000),
            balance: 1000000 * i,
        };
        users.push(user);
    }
    return users;
};
// ATM machine function
const atmMachine = async (users) => {
    const pinResponse = await inquirer.prompt({
        type: "number",
        message: "Enter your PIN",
        name: "PIN",
    });
    const user = users.filter((user) => user.PIN === pinResponse.PIN)[0];
    if (user) {
        console.log(`Welcome ${user.name}`);
        await atmFunc(user);
    }
    else {
        console.log("Invalid PIN. Try again.");
    }
};
// ATM function
const atmFunc = async (user) => {
    const actionResponse = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "What do you want to do?",
        choices: ["Withdraw", "Balance", "Exit"],
    });
    switch (actionResponse.select) {
        case "Withdraw": {
            const amount = await inquirer.prompt({
                type: "number",
                message: "Enter amount to withdraw",
                name: "amount",
            });
            if (amount.amount > user.balance) {
                console.log("Insufficient balance.");
                return;
            }
            user.balance -= amount.amount;
            console.log(`Withdrawal amount: ${amount.amount}`);
            console.log(`Balance: ${user.balance}`);
            break;
        }
        case "Balance": {
            console.log(`Balance: ${user.balance}`);
            break;
        }
        case "Exit": {
            console.log("Thank you!");
            return;
        }
        default: {
            console.log("Invalid option.");
            break;
        }
    }
};
// Start the ATM machine
const users = createUser();
atmMachine(users);
