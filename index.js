require("module-alias/register");

//Requiered commands imports

const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
//Required paths

const config = require("@root/config.json");
const loadCommands = require("@root/commands/load-commands");
const loadFeatures = require("@root/features/load-features.js");

const command = require("@util/command");
const firstMessage = require("@util/first-message");
//BOT loader

client.on("ready", () => {
  console.log(`${client.user.username} is ready!`);
  const { prefix } = config;
  client.user.setActivity(`${prefix}help`, { type: "PLAYING" });

  //Importing addons

  loadCommands(client);
  loadFeatures(client);

  //Please verify message

  const welcomeEmbed = new Discord.MessageEmbed().setDescription(
    `Welcome to CER Team, please verify you're a human by completing the captcha sent to your DM's`
  );

  firstMessage(client, "730028337078075473", welcomeEmbed, ["✅"]);
});
//Pass token to bot

client.login(config.token);
