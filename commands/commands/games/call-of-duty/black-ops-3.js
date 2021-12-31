const cod_api = require('call-of-duty-api')();
const config = require('@root/config.json')
const Discord = require("discord.js");

module.exports = {
    commands: 'codbo3',
    expectedArgs: '<player tag> <platform>',
    minArgs: 1,
    maxArgs: 2,
    callback: async(message, arguments, text, client) => {
        if(!arguments[0]) return message.channel.send('Please enter a players tag')
        if(!arguments[1]) return message.channel.send('Please enter a platform \npsn \nsteam\nxbl\nbattle\nacti\nuno ( numerical identifier )')
        
        let username = config.COD_USERNAME
        let password = config.COD_PASSWORD
        
        try {
            await cod_api.login(username, password)
            let data = await cod_api.BO3mp(arguments[0], arguments[1])
            const embed = new Discord.MessageEmbed()
            .setColor('#CC3033k')
            .setTitle('Call of Duty Black Ops 3 multiplayer stats')
            .setDescription(`${arguments[0]}'s multiplayer stats on ${arguments[1]} platform`)
            .addFields(
                {name: 'Games Played', value: data.lifetime.all.properties.totalGamesPlayed, inline: true},
                {name: 'Wins', value: data.lifetime.all.properties.wins, inline:true},
                {name: 'Losses', value: data.lifetime.all.properties.losses, inline:true}, 
                {name: 'KD', value: data.lifetime.all.properties.kdratio, inline:true},
                {name: 'Kills', value: data.lifetime.all.properties.kills, inline:true},
                {name: 'Deaths', value: data.lifetime.all.properties.deaths, inline:true},
                {name: 'Longest Kill Streak', value: data.lifetime.all.properties.longestKillstreak, inline:true},
                {name: 'Total time played', value: parseFloat(data.lifetime.all.properties.timePlayedTotal / 3600).toFixed(2) + 'Hours', inline:true}

            )
            .setFooter('Call Of Duty Cold Black Ops 3 by thenono1')

            message.channel.send(embed)

        }catch(error){
            message.channel.send('There was a problem fetching this player');
            throw error;
        }
    },
    permissions: [],
    requiredRoles: [],
}