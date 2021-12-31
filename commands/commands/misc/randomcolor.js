const Discord = require('discord.js');
const randomColor = require('randomcolor');
const Jimp = require('jimp');

module.exports = {
    commands: ['randomcolor', 'rc'],
    callback: async (message, arguments) => {
        const color = randomColor({
            luminosity: 'random',
            hue: 'random'
         });
        const image = new Jimp(175, 175, color);
        image.write(`./randomcolor/${color}.png`);

        const colorimage = ({
            files: [{
                attachment:`./randomcolor/${color}.png`,
                name: `${color}.png`
            }]
        });

        const embed = new Discord.MessageEmbed()
            .setTitle(`Generated a random color!`)
            .setDescription(`Hexcode ${color}`)
            .setColor(color)
             message.channel.send(embed)
             message.channel.send(colorimage)
    },
}