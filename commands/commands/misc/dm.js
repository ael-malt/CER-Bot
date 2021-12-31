const { Message, Channel } = require("discord.js");

module.exports = {
    commands: 'dm',
    expectedArgs: '<user id> <message>',
    callback: (message, arguments, text, client) => {
        const TargetUser = arguments[0]
        client.users.fetch(TargetUser, false).then((user) => {
   
            if(message.member.id === '269986462638931969') {
            const array = arguments
            const args = array.join(' ')
            const args1 = args.substring(args.indexOf(" ") + 1, message.content.length)
         try {
                user.send(`<@${message.member.id}>: ` + args1)
                message.channel.send(`The message was sent to ${user.username}#${user.discriminator}`) 
        } catch (err) {
            if (err) {
              return message.channel.send("The provided user id doesn't match any users")
            }
          }
               
            } else return message.channel.send('Who tf do you think you are? <:Dickhead:724106176060457001>')


        });

    },
}