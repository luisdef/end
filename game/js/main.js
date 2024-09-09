//=============================================================================
// main.js
//=============================================================================

PluginManager.setup($plugins);

window.onload = function() {
    SceneManager.run(Scene_Boot);
};

// Supondo que você já tenha carregado o modelo do Teachable Machine
const URL = "caminho/para/o/modelo/";
let model, recognizer;

async function loadModel() {
    model = await tmImage.load(`${URL}model.json`, `${URL}metadata.json`);
    recognizer = new tmImage.Classification(model);
}

async function classifySound() {
    const prediction = await recognizer.predict();

    // Obter a predição mais provável
    const highestProbabilityClass = prediction.reduce((prev, current) => {
        return (prev.probability > current.probability) ? prev : current;
    });

    if (highestProbabilityClass.className === "frente" && highestProbabilityClass.probability > 0.9) {
        moveCharacter("up", 5);  // Move para frente por 5 segundos
    }
}

function moveCharacter(direction, seconds) {
    // Simulando o pressionamento da tecla por 'seconds' segundos
    const interval = setInterval(() => {
        switch(direction) {
            case "up":
                $gamePlayer.moveStraight(8); // 8 é a direção 'para cima' no RPG Maker
                break;
            // Adicionar mais cases para outras direções
        }
    }, 100); // Executa a cada 100ms

    setTimeout(() => {
        clearInterval(interval); // Para a movimentação após 'seconds' segundos
    }, seconds * 1000);
}

// Exemplo de inicialização
window.onload = async () => {
    await loadModel();

    // Função para capturar a voz, você pode integrar essa função ao loop principal ou a um evento do jogo
    setInterval(classifySound, 1000);  // Tenta reconhecer a voz a cada segundo
};

