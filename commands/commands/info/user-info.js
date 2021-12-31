const { Message, MessageEmbed } = require("discord.js");
const { version } = require('@root/package.json')
const { prefix } = require('@root/config.json')

module.exports = {
    commands: 'userinfo',
    callback: async (message, arguments, text, client) => {
            const { guild, channel} = message

            const user = message.mentions.users.first() || message.member.user
            const member = guild.members.cache.get(user.id)


            const embed = new MessageEmbed()
            .setAuthor(`User information for ${user.username}`, (user.avatarURL({ dynamic:true })))
            .setThumbnail(user.avatarURL({ dynamic:true }))
            .addFields ({

                name: 'User tag',
                value: user.tag,
            },
            {
                name:'Is bot?',
                value: user.bot,
            },
            {
                name: 'Server nickname',
                value: member.nickname || 'None'
            },
            {
                name: 'Joined Server',
                value: new Date(member.joinedTimestamp).toLocaleDateString()
            },
            {
                name:'Joined Discord',
                value: new Date(user.createdTimestamp).toLocaleDateString()
            },
            {
                name: 'Role Count',
                value: member.roles.cache.size - 1,
            })
            
            
            message.channel.send(embed)
    },

}