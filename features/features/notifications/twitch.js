const { prefix } = require('@root/config.json');
const channelId = '824282219912626236' //Notifs CER Bot server //#Twitch

module.exports = (client,) => {
    client.on('message', (message) => {
        const { guild, content } = message

        const arguments = content.split(/[ ]+/)
        arguments.shift()

        const array = arguments
        const args = array.join(' ')

        if(content.startsWith(`${prefix}t-w-i-t-c-h`)) {
            if(!channelId)
            return;
    
            console.log(content);
        
            const targetGuild = client.guilds.cache.get('335467864020615169'); //CER Team
            if (!guild) return console.log("Couldn't get the guild.");
    
            const targetChannel = targetGuild.channels.cache.get('553948527307259934'); //#Yt-twitch
    
            targetChannel.send(args);
            return
        }else return
      })
}