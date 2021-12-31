const googleTTS = require('google-tts-api');
const EventClock = require('event-clock');
module.exports = (client) => {
    const Guild = client.guilds.cache.get("335467864020615169"); // CER Team

    var cb = function () {
        const Amine = Guild.members.cache.get('269986462638931969').voice.channel
        const Adam = Guild.members.cache.get('325380997170331648').voice.channel
        const Zoubeir = Guild.members.cache.get('325312090632093710').voice.channel

        function dateFnc(voiceChannel) {
            const date = new Date()

            if (date.getHours() <= 12) var hour = date.getHours()
            if (date.getHours() == 0) var hour = 12
            if (date.getHours() > 12) var hour = Math.floor(date.getHours() / 2)

            if (date.getHours() <= 12) var ampm = ' a m'
            if (date.getHours() > 12) var ampm = ' p m'

            var time = 'it is ' + hour + ' oclock ' + ampm

            // get audio URL
            const url = googleTTS.getAudioUrl(time, {
                lang: 'en',
                slow: false,
                host: 'https://translate.google.com',
            });

            voiceChannel.join().then(connection => {
                const dispatcher = connection.play(url);
                dispatcher.on("finish", end => {
                    voiceChannel.leave()
                });
            }).catch(err => console.log(err))
        }
        if (Amine != null) {
            var voiceChannel = Amine
            return dateFnc(Amine)
        } else if (Adam != null) {
            var voiceChannel = Adam
            return dateFnc(Adam)
        } else if (Zoubeir != null) {
            var voiceChannel = Zoubeir
            return dateFnc(Zoubeir)
        } else {
            return
        }




    }
    EventClock.on('00:00:00', cb);
    EventClock.on('01:00:00', cb);
    EventClock.on('02:00:00', cb);
    EventClock.on('03:00:00', cb);
    EventClock.on('04:00:00', cb);
    EventClock.on('05:00:00', cb);
    EventClock.on('06:00:00', cb);
    EventClock.on('07:00:00', cb);
    EventClock.on('08:00:00', cb);
    EventClock.on('09:00:00', cb);
    EventClock.on('10:00:00', cb);
    EventClock.on('11:00:00', cb);
    EventClock.on('12:00:00', cb);

    EventClock.on('13:00:00', cb);
    EventClock.on('14:00:00', cb);
    EventClock.on('15:00:00', cb);
    EventClock.on('16:00:00', cb);
    EventClock.on('17:00:00', cb);
    EventClock.on('18:00:00', cb);
    EventClock.on('19:00:00', cb);
    EventClock.on('20:00:00', cb);
    EventClock.on('21:00:00', cb);
    EventClock.on('22:00:00', cb);
    EventClock.on('23:00:00', cb);
}