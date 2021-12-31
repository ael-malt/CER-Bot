const { Message } = require("discord.js");

module.exports = {
    commands: 'servers',
    callback: async (message, arguments, text, client) => {
        let totalMembers = 0

        for (const guild of client.guilds.cache) {
            totalMembers += (await guild[1].members.fetch()).size
        }

        message.channel.send(`${client.user} is in ${client.guilds.cache.size} server(s) and has a total of ${totalMembers} members`)
    },
}