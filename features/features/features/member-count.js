module.exports = (client) => {
  const channelId = "784225718615408640"; //Members:
  const guild = "335467864020615169"; //Guild ID

  const updateMembers = (guild) => {
    const channel = guild.channels.cache.get(channelId);
    channel.setName(`Members: ${guild.memberCount.toLocaleString()}`);
  };

  client.on("guildMemberAdd", (member) => {
    if (member.guild.id === guild) {
      updateMembers(member.guild);
    } else {
      return;
    }
  });
  client.on("guildMemberRemove", (member) => {
    if (member.guild.id === guild) {
      updateMembers(member.guild);
    } else {
      return;
    }
  });
};
