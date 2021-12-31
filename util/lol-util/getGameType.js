module.exports = function getGameMode(gameMode) {
    if(gameMode === 'CLASSIC') return "Summoner's Rift"
    if(gameMode === 'ODIN') return 'Dominion/Crystal Scar'
    if(gameMode === 'ARAM') return 'Howling Abyss '
    if(gameMode === 'TUTORIAL') return 'Tutorial'
    if(gameMode === 'URF') return "Summoner's Rift Urf"
    if(gameMode === 'DOOMBOTSTEEMO') return 'Doom Bots'
    if(gameMode === 'ONEFORALL') return 'One for All'
    if(gameMode === 'ASCENSION') return 'Ascension'
    if(gameMode === 'FIRSTBLOOD') return 'Snowdown Showdown games'
    if(gameMode === 'SIEGE') return 'Nexus Siege'
    if(gameMode === 'ASSASSINATE') return 'Blood Hunt Assassin'
    if(gameMode === 'ARSR') return "All Random Summoner's Rift games"
    if(gameMode === 'DARKSTAR') return 'Dark Star: Singularity'
    if(gameMode === 'STARGUARDIAN') return 'Star Guardian Invasion'
    if(gameMode === 'PROJECT') return 'PROJECT: Hunters'
    if(gameMode === 'GAMEMODEX') return 'Nexus Blitz'
    if(gameMode === 'ODYSSEY') return 'Odyssey: Extraction'
    if(gameMode === 'NEXUSBLITZ') return 'Nexus Blitz'
}