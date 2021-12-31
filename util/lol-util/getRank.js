module.exports = function getRank(tier) {
    if(tier === 'IRON') return '<:Iron:808336447609765889> Iron'
    if(tier === 'BRONZE') return '<:Bronze:808336463649177600> Bronze'
    if(tier === 'SILVER') return '<:Silver:808336474206502922> Silver'
    if(tier === 'GOLD') return '<:Gold:808336537770917948> Gold'
    if(tier === 'PLATINUM') return '<:Platinum:808336549598986250> Platinum'
    if(tier === 'DIAMOND') return '<:Diamond:808336577385463858> Diamond'
    if(tier === 'MASTER') return '<:Master:808336588995297290> Master'
    if(tier === 'GRANDMASTER') return '<:Grandmaster:808336597849997373> GMaster'
    if(tier === 'CHALLENGER') return '<:Challenger:808336633266307084> Chall'
}