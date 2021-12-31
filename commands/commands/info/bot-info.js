const {
    Message,
    MessageEmbed
} = require("discord.js");
const {
    version
} = require('@root/package.json')
const {
    prefix
} = require('@root/config.json')

module.exports = {
    commands: 'botinfo',
    callback: async (message, arguments, text, client) => {
        let totalMembers = 0

        for (const guild of client.guilds.cache) {
            totalMembers += (await guild[1].members.fetch()).size
        }
        const embed = new MessageEmbed()
            .setTitle(`Information about ${client.user.username}`)
            .setThumbnail(client.user.avatarURL({
                dynamic: true
            }))
            .addFields({
                name: 'Bot tag',
                value: client.user.tag,
            }, {
                name: 'Version',
                value: version,
            }, {
                name: "Server's command prefix",
                value: prefix
            }, {
                name: 'Uptime',
                value: `${process.uptime().toFixed(2)}s`
            }, {
                name: 'Server count',
                value: client.guilds.cache.size
            }, {
                name: 'Total members',
                value: totalMembers,
            })


        message.channel.send(embed)
    },

}