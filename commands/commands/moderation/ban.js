const { Message } = require("discord.js");

module.exports = {
    commands: 'ban',
    expectedArgs: '<[@member]>',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, cl) => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        const target = mentions.users.first()
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.ban()
            message.channel.send(`<@${target.id}> has been banned!`)
        } else {
            message.channel.send(`${tag} Please specify someone to ban!`)
        }
    },
    permissions: ['BAN_MEMBERS'],
}