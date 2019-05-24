window.onload = function(){
    const roulette = document.getElementById("roulette");
    const result = document.getElementById("result");
    const colors = [
        "VERMELHO",
        "VERDE",
        "AMARELO",
        "AZUL",
        "VERMELHO",
        "VERDE",
        "AMARELO",
        "AZUL"
    ]

    var degrees = 0;
    var speed = 20 + parseInt(Math.random() * 100 % 20)
    var decelleration = 2;
    var cycles = 0;
    var spinning = false;
    var prizeAmount = 8;
    var prizeAngle = 360 / prizeAmount;

    function spin() {
        spinning = true;

        var interval = setInterval(function(){
            roulette.style.transform = "translate(-50%, -50%) " + toTransformRotate(degrees);
            degrees += speed;
            cycles++;
            if(degrees > 359) degrees = 0;
            if(cycles > 20 && speed > 0) {
                cycles = 0;
                speed -= decelleration;
            } else if(speed <= 0) {
                spinning = false;
                speed = 15 + parseInt(Math.random() * 100 % 15)
                cycles = 0;
                calcPrize(degrees);
                clearInterval(interval);
            }
        }, 25)
    }

    function toTransformRotate(degrees){
        return("rotate(" + degrees + "deg)");
    }

    function calcPrize(degrees) {
        let resultIndex = parseInt(degrees / prizeAngle);
        if(resultIndex === 0 || resultIndex === 4) result.innerHTML = "Prêmio: <red>" + colors[resultIndex] + "</red>";
        if(resultIndex === 1 || resultIndex === 5) result.innerHTML = "Prêmio: <green>" + colors[resultIndex] + "</green>";
        if(resultIndex === 2 || resultIndex === 6) result.innerHTML = "Prêmio: <yellow>" + colors[resultIndex] + "</yellow>";
        if(resultIndex === 3 || resultIndex === 7) result.innerHTML = "Prêmio: <blue>" + colors[resultIndex] + "</blue>";
    }

    var shakeEvent = new Shake({threshold: 15});
    shakeEvent.start();

    window.addEventListener("shake", function(){
        if(!spinning) spin();
    }, false)

    roulette.addEventListener("touchmove", function(){
        if(!spinning) spin();
    }, false)
}