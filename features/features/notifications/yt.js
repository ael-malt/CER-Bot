const { prefix } = require('@root/config.json');
const channelId = '824280867375546398' //Notifs CER Botserver //#Youtube

module.exports = (client,) => {
    client.on('message', (message) => {
        const { guild, content } = message

        const arguments = content.split(/[ ]+/)
        arguments.shift()

        const array = arguments
        const args = array.join(' ')

        if(content.startsWith(`${prefix}y-o-u-t-u-b-e`)) {
            if(!channelId)
            return;
    
            console.log(content);
        
            const targetGuild = client.guilds.cache.get('335467864020615169'); //CER Team
            if (!guild) return console.log("Couldn't get the guild.");
    
            const targetChannel = targetGuild.channels.cache.get('553948527307259934'); //#Yt-insta
    
            targetChannel.send(args);
            return
        }else return
      })
}