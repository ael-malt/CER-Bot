const { Message, MessageEmbed } = require("discord.js");

const channelId = '705108668215197778' //Target Announce channel

module.exports = {
    commands: 'announce',
    expectedArgs: '<announcement>',
    permissionError: '',
    minArgs: 1,
    callback: (message, arguments, client) => {

        message.delete()
        const args = arguments.join(' ')

        const member = message.member
        const channel = member.guild.channels.cache.get(channelId);


        const embed = new MessageEmbed()
            .setAuthor('New announcement!')
            .setFooter(`Announcement created by ${member.user.username}`)
            .setDescription(`${args}`)
        channel.send(`@everyone`, {
            embed: embed
        })


    },
    permissions: ['ADMINISTRATOR']
}