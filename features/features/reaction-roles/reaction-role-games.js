const Discord = require('discord.js');
const firstMessage = require('@util/first-message')

module.exports = client => {
  const channelId = '786211027242713138'

  const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName)

  const emojis = {
    LeagueofLegends: '757675696368779435',
    valorant: '757674181163876472',
    Minecraft: '757674191615950969',
    AmongUs: '757674186297835692',
    rocketleague: '760161693736239134',
    CSGO: '757675697266491472',
    XboxOneController: '758068671514935507'

  }

  const reactions = []

  let emojiText = 'React to claim a role.\n\n'
  for (const key in emojis) {
    const emoji = getEmoji(key)
    reactions.push(emoji)

    const role = emojis[key]
    emojiText += `${emoji} <a:pinkarrow:839528900862541835> <@&${role}>\n\n`
  }

  const embed = new Discord.MessageEmbed().setDescription(emojiText)

  firstMessage(client, channelId, embed, reactions)

  const handleReaction = (reaction, user, add) => {
    if (user.id === client.user.id) {
      return
    }

    const emoji = reaction._emoji.name

    const { guild } = reaction.message

    const roleName = emojis[emoji]
    if (!roleName) {
      return
    }

    const role = guild.roles.cache.find((role) => role.id === roleName)
    const member = guild.members.cache.find((member) => member.id === user.id)

    if (add) {
      member.roles.add(role)
    } else {
      member.roles.remove(role)
    }
  }

  client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, true)
    }
  })

  client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, false)
    }
  })
}