//Use this as template
const { Message } = require("discord.js");

module.exports = {
    commands: ['add', 'addition'],
    expectedArgs: '<num1> <num2>',
    permissionError: '',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text, client) => {
        const num1 = +arguments[0]
        const num2 = +arguments[1]

        message.reply(`The sum is ${num1 + num2}`)
    },
    permissions: [],
    requiredRoles: [],
}