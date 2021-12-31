module.exports = (client) => {
  const channelId = "782737795386966038"; // welcome channel
  const targetChannelId = "760225312994099260"; // rules channel
  const guild = "335467864020615169"; //Guild ID

  client.on("guildMemberAdd", (member) => {
    if (member.guild.id === guild) {
      const message = `Welcome <@${
        member.id
      }> to the server! Please check out ${member.guild.channels.cache
        .get(targetChannelId)
        .toString()}`;

      const channel = member.guild.channels.cache.get(channelId);
      channel.send(message);
    } else return;
  });
};
