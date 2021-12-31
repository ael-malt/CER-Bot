const Discord = require('discord.js');
const fetch = require('node-fetch')

const subreddits = [
	'memes',
	'DeepFriedMemes',
	'bonehurtingjuice',
	'surrealmemes',
	'dankmemes',
	'meirl',
	'me_irl',
	'funny'
];

module.exports = {
    commands: 'meme',
    callback: async (message) => {

        const data = await fetch(`https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`)
			.then(response => response.json())
			.then(body => body.data);
		const selected = data[Math.floor(Math.random() * data.length)];
        const embed = new Discord.MessageEmbed()
            .setImage(`https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`);

        message.channel.send(embed)
    },
}