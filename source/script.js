let player = {
    balance: 0,
    baseOnClickBalance: 1,
    BasePerSecBalance: 1.00,
    perSecBalance: 0,
    onClickBalance: 0,
    followers: []
};

let frameTime = 1000/30;


window.onload = function(){
    initiateClickableArea();
    setupPlayerFollowers();

    setFollowers();

    updateBalance();
    setupClickableArea();

    window.requestAnimationFrame(gameLoop);
}

function setupPlayerFollowers(){
    for(let i=0; i<10; i++){
        let current = {
            id: i+1,
            level: 0,
            name: `Follower ${i+1}`,
            upgradePrice: function() {return (this.level+1)*10},
            multiplier: function() { if(this.level === 0){
                return 1;
            }else{
                return 1+ this.level/10}
            }
        }

        player.followers.push(current);
    }
}

function setFollowers(){
    let leftNav = document.getElementsByClassName("left-sidenav")[0];
    
    player.followers.forEach((element) => {
        let followerContainer = document.createElement("div");
        let followerInfo = document.createElement("div");
        followerInfo.textContent = `${element.name}`;
        followerInfo.classList.add("followerInfo");
        let followerPrice = document.createElement("div");
        followerPrice.textContent = `Price: ${element.upgradePrice()}`;
        followerPrice.classList.add("followerPrice");
        followerContainer.appendChild(followerInfo);
        followerContainer.appendChild(followerPrice);
        let upgradeButton = document.createElement("span");
        upgradeButton.textContent = "Level Up";
        upgradeButton.classList.add("upgrade");
    
        upgradeButton.addEventListener("click", function(){
            if(player.balance >= element.upgradePrice()){
                player.balance -= element.upgradePrice();
                element.level+=1;
            }
        })
    
        followerContainer.appendChild(upgradeButton);
        leftNav.appendChild(followerContainer);
    })
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

function IncreaseBalance(){
    let totalMultiplier = 1;
    player.followers.forEach(element => {
        totalMultiplier = totalMultiplier * element.multiplier();
    });

    /*Debug Log
    console.log({
        base: player.BasePerSecBalance,
        multi: totalMultiplier,
        perSec: player.BasePerSecBalance * totalMultiplier
    });
    */

    if(totalMultiplier===0){
    }else{
        player.perSecBalance = player.BasePerSecBalance * totalMultiplier;
    }

    player.balance+=player.perSecBalance/100;
}

function updatePrice(node, i){
        let price = node.getElementsByClassName("followerPrice")[0];
        price.textContent = `Price: ${player.followers[i].upgradePrice()}`;
}

function updateButton(node, i){
    let button = node.getElementsByClassName("upgrade")[0];
        
    if(!button.classList.contains("upgradeButton") && !button.classList.contains("unavailableUpgrade")){
        button.classList.add("unavailableUpgrade");
    }else{
        let price = player.followers[i].upgradePrice();
        console.log(price);
        if(player.balance < price){
        if(button.classList.contains("upgradeButton")){
            button.classList.replace("upgradeButton", "unavailableUpgrade");
        }
    }else
        if(button.classList.contains("unavailableUpgrade")){
            button.classList.replace("unavailableUpgrade","upgradeButton");
        }
    }
}

function updateFollowers(){
    let followerNodes = document.getElementsByClassName("left-sidenav")[0].childNodes;

    for(let i=0; i<followerNodes.length; i++){
        updatePrice(followerNodes[i], i);
        updateButton(followerNodes[i], i);
        
    }
}


gameLoop = () => {
    setTimeout(() => {
        IncreaseBalance();

        updateBalance();
        updateFollowers();
        
        window.requestAnimationFrame(gameLoop);
    }, 10);
}