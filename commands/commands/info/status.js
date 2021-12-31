const { Message } = require("discord.js");
module.exports = {
    commands: 'status',
    expectedArgs: '<status>',
    minArgs: 1,
    callback: (message, arguments, text, client) => {
        const content = message.content.replace(`,status`, '')
        client.user.setPresence({
            activity: {
                name: content,
                type: 0
            }
        })
    },
    permissions: ['ADMINISTRATOR'],
}