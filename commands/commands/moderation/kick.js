const { Message } = require("discord.js");

module.exports = {
    commands: 'kick',
    expectedArgs: '<[@member]>',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        const target = mentions.users.first()
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.kick()
            message.channel.send(`<@${target.id}> has been kicked!`)
        } else {
            message.channel.send(`${tag} Please specify someone to kick!`)
        }
    },
    permissions: ['KICK_MEMBERS'],
}