const fs =require('fs');
const logger = require('../utils/logger').logger('audio');

function getAudioContent(audio) {
    return new Promise( (resolve, reject) => { 
        fs.readFile(audio, (err, data) => {
            if (err) {
                reject(err);
            } else {
                logger.debug('get the audio data success')
                resolve(data);
            }
        });
    });
}

var getAudio = async (ctx, next) => {
    var name = ctx.query.name;
    var audio = `static/audios/${name}.mp3`;
    logger.debug(`fetch audio ${audio}`);
    try {
        ctx.response.body = await getAudioContent(audio);
        ctx.response.type = "audio/mp3";
        ctx.response.status = 200;
    } catch (err) {
        logger.warn("file is un exsited");
        ctx.response.status = 404;
    }
};

module.exports = {
    'GET /audio': getAudio
};