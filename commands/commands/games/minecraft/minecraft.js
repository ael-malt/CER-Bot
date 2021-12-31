//Use this as template
const Discord = require("discord.js");
const util = require('minecraft-server-util')

module.exports = {
    commands: 'serveur',
    expectedArgs: '<server ip> <port>',
    callback: (message, arguments, text, client) => {
        util.status('Le-refuge.minesr.com', {port: 25573}).then((response) => {
            console.log(response)
            const embed = new Discord.MessageEmbed()
            .setColor('#4a6f28')
            .setTitle('Minecraft server Status')
            .addFields({
                name: 'Server IP',
                value:response.host
            },
            {
                name: 'Port',
                value:response.port
            },
            {
                name: 'Version',
                value:response.version
            },
            {
                name: 'Online Players',
                value:response.onlinePlayers + '/' + response.maxPlayers
            },
            )
            message.channel.send(embed)
        })
        .catch((error) =>{
            message.channel.send('There was an error finding this minecraft server');
            throw error;
        })
    },
}