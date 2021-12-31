const { Message } = require("discord.js");

module.exports = {
    commands: ['sub', 'subtract'],
    expectedArgs: '<num1> <num2>',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text, client) => {
        const num1 = +arguments[0]
        const num2 = +arguments[1]
        message.reply(`The subtraction is ${num1 - num2}`)
    },
}