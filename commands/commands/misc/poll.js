const { Message } = require("discord.js");

const addReactions = (message) => {
    message.react('👍')

    setTimeout(() => {
        message.react('👎')
    }, 750)
}

module.exports = {
    commands: 'poll',
    callback: async (message, arguments, text, client) => {
        await message.delete()
        const fetched = await message.channel.messages.fetch({ limit: 1 })
        if (fetched && fetched.first()) {
            addReactions(fetched.first())
        }
    },
}