const Discord = require("discord.js");
const googleTTS = require('google-tts-api');

module.exports = {
    commands: 'time',
    callback: (message, arguments, text, client) => {
        const date = new Date()

        //get Hour in am pm
        if (date.getHours() <= 12) var hour = date.getHours()
        if (date.getHours() == 0) var hour = 12
        if (date.getHours() > 12) var hour = Math.floor(date.getHours() / 2)

        //say am or pm
        if (date.getHours() <= 12) var ampm = ' a m'
        if (date.getHours() > 12) var ampm = ' p m'

        if (date.getMinutes() < 10) var minutes = '0' + date.getMinutes()
        if (date.getMinutes() >= 10) var minutes = date.getMinutes()


        if (date.getMinutes() == 00) {
            var time = 'it is ' + hour + " oclock" + ampm
        } else if (date.getMinutes() == 15) {
            var time = 'it is a quarter past ' + hour + ampm
        } else if (date.getMinutes() == 30) {
            var time = 'it is half past ' + hour + ampm
        } else if (date.getMinutes() == 45) {
            var time = 'it is a quarter to ' + hour + 1 + ampm
        } else {
            var time = 'it is ' + hour + ' ' + minutes + ampm
        }

        // get audio URL
        const url = googleTTS.getAudioUrl(time, {
            lang: 'en',
            slow: false,
            host: 'https://translate.google.com',
        });

        const voiceChannel = message.member.voice.channel;
        console.log(voiceChannel)
        if (!voiceChannel) return message.channel.send('You must be in a voice channel to do this!')
        voiceChannel.join().then(connection => {
            const dispatcher = connection.play(url);
            dispatcher.on("finish", end => {
                voiceChannel.leave()
            });
        }).catch(err => console.log(err))
    },
}