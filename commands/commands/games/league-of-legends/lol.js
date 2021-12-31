const Discord = require("discord.js");

const config = require('@root/config.json')
const TeemoJS = require('teemojs');
let api = TeemoJS(config.RG_API);

//importing functions

const getChampName = require('@util/lol-util/getChampName');
const getRuneName = require("@util/lol-util/getRuneName");
const getPlatform = require("@util/lol-util/getPlatform");
const getMastery = require("@util/lol-util/getMastery");
const getRank = require("@util/lol-util/getRank");
const getGameType = require("@util/lol-util/getGameType");
const getMap = require("@util/lol-util/getMap");
const getQueue = require("@util/lol-util/getQueue");

module.exports = {
  commands: 'lol',
  expectedArgs: '<server> <username>',
  minArgs:'2',
  callback: async (message, arguments, text, client) => {

    const region = getPlatform(arguments[0].toLowerCase())
    if(region == undefined)
    //Check for server argument
    
    if (!region) {
        return message.reply('Invalid syntax! Please use !lol <server> <username>')
    }
    let servers = ['BR1', 'EUN1', 'EUW1', 'JP1', 'KR', 'LA1', 'LA2', 'NA1', 'OC1', 'TR1', 'RU']
    if (servers.indexOf(region) >= 0) {

    } else {
        return message.channel.send('Please specify a valid server: \n**BR** (Brazil) - **EUN** (EU Nordic & East) - **EUW** (EU West) - **JP** (Japan) -  **KR** (Korea) - **LA1** (Latin America North) - **LA** (Latin America South) - **NA** (North America) - **OC** (Oceania) - **TR** (Turkey) - **RU** (Russia)')
    }

    //make user name a single argument

    const args = [arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]].join('')

    //get summoner ID

    try {
      var summonerdata = await api.get(region, 'summoner.getBySummonerName', `${args}`)
      var summonerId = summonerdata.id
    } catch (err) {
      if (err) {
        return message.channel.send(`**${args}** Is not a valid username!`)
      }
    }
    //get summoner live game

    const gameInfo = await api.get(region, 'spectator.getCurrentGameInfoBySummoner', summonerId)
    if (gameInfo === null) return message.channel.send(`**${summonerdata.name}** Is not in an active game`)
    var bans = gameInfo.bannedChampions

    if(!bans[0]) bans = [{ championId: -1, teamId: 100, pickTurn: 1 },{ championId: -1, teamId: 100, pickTurn: 2 },{ championId: -1, teamId: 100, pickTurn: 3 },{ championId: -1, teamId: 100, pickTurn: 4 },{ championId: -1, teamId: 100, pickTurn: 5 },{ championId: -1, teamId: 200, pickTurn: 6 },{ championId: -1, teamId: 200, pickTurn: 7 },{ championId: -1, teamId: 200, pickTurn: 8 },{ championId: -1, teamId: 200, pickTurn: 9 },{ championId: -1, teamId: 200, pickTurn: 10 }]
    console.log(bans[0])
    const user = gameInfo.participants
    const gameType = getGameType(gameInfo.gameMode)
    const mapName = getMap(gameInfo.mapId)
    const queueConfigId = getQueue(gameInfo.gameQueueConfigId)

    var date = new Date(0);
    date.setSeconds(gameInfo.gameStartTime); // specify value for SECONDS here
    var dateResult = date.toTimeString().replace(/.*(\d{2}:\d{2})(:\d{2}).*/, "$1")

    // GET RANKS

    var rank = [];
    try {
      for (var i = 0; i < 10; i++) {
        rank.push(await api.get(region, 'league.getLeagueEntriesForSummoner', user[i].summonerId))
      }
    }catch (err) {
      return message.channel.send(`There was an error fetching **${summonerdata.name}**'s game`)
    }

    var playerRank = [];
    var playerLP = [];
    var playerGames = [];
    var playerWR = [];
    var promos = [];

    var playerLvL = [];
    var playerLvl = [];

    var player = [];
    var WR = [];
    var series = [];

      for (var i = 0; i < rank.length; i++ ) {
        try{
          if (rank[i][0].queueType === 'RANKED_SOLO_5x5') {
            playerRank[i] = `${getRank(rank[i][0].tier)}` + ` ${rank[i][0].rank}`
   
            playerLP[i] = rank[i][0].leaguePoints + ' LP'
            playerGames[i] = rank[i][0].wins + rank[i][0].losses
            playerWR[i] = Math.floor(rank[i][0].wins / playerGames[i] * 100)
            promos[i] = rank[i][0].miniSeries
          }
          if (rank[i][1].queueType === 'RANKED_SOLO_5x5') {
            playerRank[i] = `${getRank(rank[i][1].tier)}` + ` ${rank[i][1].rank}`
   
            playerLP[i] = rank[i][1].leaguePoints + ' LP'
            playerGames[i] = rank[i][1].wins + rank[i][1].losses
            playerWR[i] = Math.floor(rank[i][1].wins / playerGames[i] * 100)
            promos[i] = rank[i][1].miniSeries
          }
        }catch (err) {
          if(err) {
            playerLvl[i] = await api.get(region, 'summoner.getBySummonerName', user[0].summonerName)
            playerLvL[i] = playerLvl[i].summonerLevel
          }
        }    
        if (playerRank[i] === undefined) {
          player[i] = `Level ${playerLvL[i]}`
          WR[i] =`0% 0G`
        } else {
          player[i] = (`${playerRank[i]} (${playerLP[i]})`)
          WR[i] = (`${playerWR[i]}% ${playerGames[i]}G`)
        }
        if(promos[i] === undefined) {
          series[i] = '| **-**'
        } else {
          series[i] = (`| **${promos[i].wins}W/ ${promos[i].losses}L**`)
        }
      }

    //Get mastery Levels
      var masteryLvL = []
      var mastery = []  
    for (var i = 0; i < 10; i++) {
      try{
      masteryLvL[i] = await api.get(region, 'championMastery.getChampionMastery', user[i].summonerId, user[i].championId)
      mastery[i] = masteryLvL[i].championLevel
      }catch (err) {
      return mastery[i] = null
      }
    }
    //Get winrate on champ
    const embed = new Discord.MessageEmbed()
      .setTitle(`<:LeagueofLegends:757675995133116576> Information about ${summonerdata.name}'s live League of Legends game!`)
      .setURL(`https://euw.op.gg/summoner/userName=${args}`)
      .setColor('#22c4d6')
      .setDescription(`${mapName} | ${dateResult}`)
      .setFooter(`Region: ${arguments[0].toUpperCase()}`)
      .addFields(
        {
          name: '<:Runes:807759961706070026>        <:Mastery0:808377312735002665><:NoBan:807703851246682132> 🔵 Blue Team',
          value:
            `${getRuneName(user[0].perks.perkStyle)} ${getRuneName(user[0].perks.perkSubStyle)} ${getMastery(mastery[0])} ${getChampName(user[0].championId)} ${user[0].summonerName}
          ${getRuneName(user[1].perks.perkStyle)} ${getRuneName(user[1].perks.perkSubStyle)} ${getMastery(mastery[1])} ${getChampName(user[1].championId)} ${user[1].summonerName}
          ${getRuneName(user[2].perks.perkStyle)} ${getRuneName(user[2].perks.perkSubStyle)} ${getMastery(mastery[2])} ${getChampName(user[2].championId)} ${user[2].summonerName}
          ${getRuneName(user[3].perks.perkStyle)} ${getRuneName(user[3].perks.perkSubStyle)} ${getMastery(mastery[3])} ${getChampName(user[3].championId)} ${user[3].summonerName}
          ${getRuneName(user[4].perks.perkStyle)} ${getRuneName(user[4].perks.perkSubStyle)} ${getMastery(mastery[4])} ${getChampName(user[4].championId)} ${user[4].summonerName}`,
          inline: true,
        },
        {
          name: 'Rank',
          value:
            `${player[0]}
            ${player[1]}
            ${player[2]}
            ${player[3]}
            ${player[4]}`,
          inline: true,
        },
        {
          name: 'Ranked/ Promos',
          value:
            `${WR[0]} ${series[0]}
            ${WR[1]} ${series[1]}
            ${WR[2]} ${series[2]}
            ${WR[3]} ${series[3]}
            ${WR[4]} ${series[4]}`
          ,
          inline: true,
        },
        {
          name: '<:Runes:807759961706070026>        <:Mastery0:808377312735002665><:NoBan:807703851246682132> 🔴 Red Team',
          value:
            `${getRuneName(user[5].perks.perkStyle)} ${getRuneName(user[5].perks.perkSubStyle)} ${getMastery(mastery[5])} ${getChampName(user[5].championId)} ${user[5].summonerName}
          ${getRuneName(user[6].perks.perkStyle)} ${getRuneName(user[6].perks.perkSubStyle)} ${getMastery(mastery[6])} ${getChampName(user[6].championId)} ${user[6].summonerName}
          ${getRuneName(user[7].perks.perkStyle)} ${getRuneName(user[7].perks.perkSubStyle)} ${getMastery(mastery[7])} ${getChampName(user[7].championId)} ${user[7].summonerName}
          ${getRuneName(user[8].perks.perkStyle)} ${getRuneName(user[8].perks.perkSubStyle)} ${getMastery(mastery[8])} ${getChampName(user[8].championId)} ${user[8].summonerName}
          ${getRuneName(user[9].perks.perkStyle)} ${getRuneName(user[9].perks.perkSubStyle)} ${getMastery(mastery[9])} ${getChampName(user[9].championId)} ${user[9].summonerName}`,
          inline: true,
        },
        {
          name: 'Rank',
          value:
            `${player[5]}
          ${player[6]}
          ${player[7]}
          ${player[8]}
          ${player[9]}`,
          inline: true,
        },
        {
          name: 'Ranked / Promos',
          value:
            `${WR[5]} ${series[5]}
            ${WR[6]} ${series[6]}
            ${WR[7]} ${series[7]}
            ${WR[8]} ${series[8]}
            ${WR[9]} ${series[9]}`,
          inline: true,
        },
        {
          name: 'Bans',
          value:
            `🔵 ${getChampName(bans[0].championId)} ${getChampName(bans[1].championId)} ${getChampName(bans[2].championId)} ${getChampName(bans[3].championId)} ${getChampName(bans[4].championId)} 🔴 ${getChampName(bans[5].championId)} ${getChampName(bans[6].championId)} ${getChampName(bans[7].championId)} ${getChampName(bans[8].championId)} ${getChampName(bans[9].championId)}`,
          inline: false,
        })
    message.channel.send(embed)
    console.log("Done!")
  },
}