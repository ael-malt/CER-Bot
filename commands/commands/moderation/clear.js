const { Message } = require("discord.js");

module.exports = {
    commands: 'clear',
    expectedArgs: '<quantity>',
    maxArgs: 1,
    callback: async (message, arguments, text, client) => {
        message.delete().then()

        if (!arguments[0]) return message.reply(`Please enter the amount of messages you want to clear!`)
        if (isNaN(arguments[0])) return message.reply(`Please enter a valid number!`)

        if (arguments[0] > 100) return message.reply(`You can't delete more than 100 messages!`)
        if (arguments[0] < 1) return message.reply(`You must delete at least 1 message!`)

        await message.channel.messages.fetch({ limit: arguments[0]}).then(messages => {
            message.channel.bulkDelete(messages, true)
            .then(deleted => message.channel.send(`I have deleted \`${deleted.size}\` message(s)!`))
            .then(message => message.delete({ timeout: 3000 }))
            .catch(err => message.reply(`Something went wrong ${err}`))
        })

    },
    permissions: ['MANAGE_MESSAGES'],
}