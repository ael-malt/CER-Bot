module.exports = (client) => {
  const channelId = "782746162951094282"; // leavers channel
  const guild = "335467864020615169"; //Guild ID

  client.on("guildMemberRemove", (member) => {
    if (member.guild.id === guild) {
      const message = `<@${member.id}> has left the server!`;

      const channel = member.guild.channels.cache.get(channelId);
      channel.send(message);
    } else return;
  });
};
