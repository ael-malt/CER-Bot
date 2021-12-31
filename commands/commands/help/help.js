const Discord = require('discord.js');
const { prefix } = require('@root/config.json')
module.exports = {
    commands: 'help',
    callback: (message, arguments, text, client) => {
        const embed = new Discord.MessageEmbed()
            .setTitle(`My prefix is "${prefix}" and these are my supported commands:`)
            .setColor('#22c4d6')
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .addFields({
                name: '<:IconPin:840623741377708053> __Help__',
                value:
                    `**${prefix}help** - Displays the help menu\n**${prefix}ticket** - Create a ticket if you need help for anything`
                ,
                inline: false,
            },
                {
                    name: '<:IconRole:840623763879886908> __Information__',
                    value:
                        `**${prefix}botinfo** - Displays information about ${client.user.username}\n**${prefix}serverinfo** - Displays information about this server\n**${prefix}userinfo <@member>** - Displays information about the member\n**${prefix}membercount** - Displays this servers member count\n**${prefix}servers** - Displays a list of all my servers and their member count\n**${prefix}ping** - Pong! Displays Bot and API latencies`,
                    inline: false,
                },
                {
                    name: '<:IconActivity:840623786545643531> __Games__',
                    value:
                        `**${prefix}codcw - codmw - codbo4 - codbo3 <tag> <platform>** -\nDisplays your Multiplayer stats from the Call of Duty game of your choice`,
                    inline: false,
                },
                {
                    name: '<:IconStoreChannel:840623774684020737> __Miscellaneous__',
                    value:
                        `**${prefix}poll** - Create a poll on the last message sent\n**${prefix}hi/hello** - Hi! :grin:\n**${prefix}rolldice** - Roll a dice!\n**${prefix}meme** - Generate a random meme!\n**${prefix}randomcolor/rc** - Generate a random color!`,
                    inline: false,
                },
                {
                    name: '<:fx:840635607264657428> __Maths__',
                    value:
                        `**${prefix}add/sub\n<n1> <n2>**\n**${prefix}multiply/divide\n<n1> <n2>**`,
                    inline: true,
                },
                {
                    name: '<a:ItemModBan:840626477635731457> __Moderation__',
                    value:
                        `**${prefix}kick <@membre>**\n**${prefix}ban <@membre>**\n**${prefix}clear <quantité>**\n**${prefix}mute <@membre> <mute time>**\n**${prefix}unmute <@membre>**`,
                    inline: true,
                },
                {
                    name: '🎶 __Music__',
                    value:
                        `**${prefix}music** - Displays all the music commands`,
                    inline: true,
                },
                // {
                //     name:'',
                //     value:
                // `**${prefix}**`,
                //     inline:false,
                // },
            )
        message.channel.send(embed)
    },
}