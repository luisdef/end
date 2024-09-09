async function createModel() {
    const recognizer = speechCommands.create("BROWSER_FFT", "directional4w");
    await recognizer.ensureModelLoaded();
    return recognizer;
}

async function init() {
    const recognizer = await createModel();
    const classLabels = recognizer.wordLabels();
    
    document.getElementById("voice").style.backgroundColor = 'green';

    recognizer.listen((result) => {
        const scores = result.scores;
        
        let bestMatch = [];
        for (let i = 0; i < classLabels.length; i++) {
            if (i==0)
                bestMatch = [classLabels[i], Number(result.scores[i])];
            
            if (Number(result.scores[i]) > bestMatch[1]) {
                bestMatch = [classLabels[i], Number(result.scores[i])];
            }
        }
        if (bestMatch[0] !== '_background_noise_' && bestMatch[0] !== '_unknown_') {
            console.log(bestMatch[0] + '->' + bestMatch[1]);
            switch (bestMatch[0]) {
                case 'up':
                    if ($gamePlayer)
                        $gamePlayer.moveStraight(8);
                    console.log('move up');
                    break;
                case 'down':
                    if ($gamePlayer)
                        $gamePlayer.moveStraight(2);
                    console.log('move down');
                    break;
                case 'right':
                    if ($gamePlayer)
                        $gamePlayer.moveStraight(6);
                    console.log('move right');
                    break;
                case 'left':
                    if ($gamePlayer)
                        $gamePlayer.moveStraight(4);
                    console.log('move left');
                    break;
            }
        }
    }, {
        includeSpectrogram: true,
        probabilityThreshold: 0.7,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.50
    });
}