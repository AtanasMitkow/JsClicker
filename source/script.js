let player = {
    balance: 0,
    baseOnClickBalance: 0.01,
    BasePerSecBalance: 0.01
};

let frameTime = 1000/30;

window.onload = function(){
    initiateClickableArea();

    updateBalance();
    setupClickableArea();

    window.requestAnimationFrame(gameLoop);
}

function initiateClickableArea(){
    let clickArea = document.getElementsByClassName("clickArea")[0];
    let bgImage = document.createElement('img');
    bgImage.setAttribute("src","img/background.jpg");
    bgImage.classList.add("clickImage");
    clickArea.appendChild(bgImage);
}

function updateBalance(){
    var balance = document.getElementsByClassName('balanceText')[0];
    balance.textContent = player.balance.toFixed(2);
}

function setupClickableArea(){
    let area = document.getElementsByClassName('clickImage')[0];
    area.addEventListener("click", function(){
        player.balance+=player.baseOnClickBalance;
        updateBalance();
    })
    
}

gameLoop = () => {
    setTimeout(() => {
        player.balance+=player.BasePerSecBalance/100;
        updateBalance();
        
        window.requestAnimationFrame(gameLoop);
    }, 10);
}