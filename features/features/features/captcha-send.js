const createCaptcha = require("./captcha.js");
const fs = require("fs").promises;
const guild = "335467864020615169"; //Guild ID
module.exports = (client) => {
  client.on("guildMemberAdd", async (member) => {
    if (member.guild.id === guild) {
      const captcha = await createCaptcha();
      try {
        const message = await member.send(
          "You have 5 minutes to solve the following captcha",
          {
            files: [
              {
                attachment: `./captchas/${captcha}.png`,
                name: `${captcha}.png`,
              },
            ],
          }
        );
        try {
          const filter = (m) => {
            if (m.author.bot) return;
            if (m.author.id === member.id && m.content === captcha) return true;
            else {
              m.channel.send("You entered the captcha incorrectly!");
              return false;
            }
          };
          const response = await message.channel.awaitMessages(filter, {
            max: 1,
            time: 300000,
            errors: ["time"],
          });
          if (response) {
            await message.channel.send(
              "You have verified yourself succesfully!\nYou were assigned the `Membre`role"
            );
            await member.roles.add("589182862780006415"); //Membre Role
            await fs
              .unlink(`./captchas/${captcha}.png`)
              .catch((err) => console.log(err));
          }
        } catch (err) {
          console.log(err);
          await message.channel.send("You didn't solve the captcha on time!");
          await member.kick();
          await fs
            .unlink(`./captchas/${captcha}.png`)
            .catch((err) => console.log(err));
        }
      } catch (err) {
        console.log(err);
      }
    } else return;
  });
};
