module.exports = function getMastery(championLevel) {
    if(championLevel === 1) return '<:mastery1:807783138599763978>'
    if(championLevel === 2) return '<:mastery2:807783160447369256>'
    if(championLevel === 3) return '<:mastery3:807783166328569867>'
    if(championLevel === 4) return '<:mastery4:807783167041470524>'
    if(championLevel === 5) return '<:mastery5:807783166722965506>'
    if(championLevel === 6) return '<:mastery6:807783166776573974>'
    if(championLevel === 7) return '<:mastery7:807783172334288946>'
    if(championLevel === null) return '<:Mastery0:808377312735002665>'
}