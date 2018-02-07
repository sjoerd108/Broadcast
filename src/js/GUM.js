//jshint esversion: 6

module.exports = {
    getStream: (fps, screenId, audio, onStream, onError) => {
        let constraints = {
            video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: screenId,
                    minFrameRate: fps
                }
            }
        };
        if (audio) {
            constraints.audio = {
                mandatory: {
                    chromeMediaSource: 'desktop'
                }
            };
        }
        navigator.mediaDevices.getUserMedia(constraints)
            .then(onStream)
            .catch(onError);
    }
};
