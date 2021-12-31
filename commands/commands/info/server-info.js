const Discord = require('discord.js');
const {
    prefix
} = require('@root/config.json')
module.exports = {
    commands: 'serverinfo',
    callback: (message, arguments, text) => {
        const {
            guild
        } = message

        const {
            name,
            region,
            memberCount,
            owner,
            afkTimeout
        } = guild

        const embed = new Discord.MessageEmbed()
            .setTitle(`Server info for "${name}"`)
            .setThumbnail(guild.iconURL())
            .setColor('#22c4d6')
            .addFields({
                name: 'Region',
                value: region,
            }, {
                name: 'Members',
                value: memberCount,
            }, {
                name: 'Owner',
                value: owner.user.tag,
            }, {
                name: 'AFK Timeout',
                value: afkTimeout / 60,
            })
        message.channel.send(embed)

    }
}