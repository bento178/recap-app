// FFmpeg integration for video generation.
const ffmpeg = require('fluent-ffmpeg');

function generateVideo(inputFile, outputFile) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputFile)
            .output(outputFile)
            .on('end', () => resolve())
            .on('error', (err) => reject(err))
            .run();
    });
}

module.exports = generateVideo;
