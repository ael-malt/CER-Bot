const { Message } = require("discord.js");

module.exports = {
    commands: ['hello', 'hi', 'yo'],
    callback: (message, arguments, text, client) => {
        const user = message.member.user
        message.channel.send(`Hi ${user}! :grin:`)
    },
}