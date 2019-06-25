let player = {
    balance: 0
};

let frameTime = 1000/30;

window.onload = function(){
    updateBalance();
    setupClickableArea();

    gameLoop();
}

function updateBalance(){
    var balance = document.getElementsByClassName('balanceText')[0];
    balance.textContent = player.balance;
}

function setupClickableArea(){
    let area = document.getElementsByClassName('clickArea')[0];
    area.addEventListener("click", function(){
        player.balance+=1;
        updateBalance();
    })
    
}

gameLoop = () => {
    setTimeout(() => {
        player.balance+=1;
        updateBalance();
        
        window.requestAnimationFrame(gameLoop);
    }, 1000);
}