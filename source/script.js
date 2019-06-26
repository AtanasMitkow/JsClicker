let player = {
    balance: 0,
    baseOnClickBalance: 1,
    BasePerSecBalance: 1.00,
    perSecBalance: 0,
    onClickBalance: 0,
    followers: []
};

let frameTime = 1000/30;


function setupPlayerFollowers(){
    for(let i=0; i<20; i++){
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
        let info = document.createElement("div");
        let level = document.createElement("div");
        let avatar = document.createElement("div");
        let avatarImg = document.createElement("img");
        avatarImg.setAttribute("src", "img/avatar.jpg");
        avatarImg.classList.add("avatar");
        avatar.appendChild(avatarImg);
        avatar.classList.add("avatarContainer");
        followerContainer.appendChild(avatar);
        
        let followerInfo = document.createElement("div");
        followerInfo.textContent = `${element.name}`;
        followerInfo.classList.add("followerInfo");
        let followerPrice = document.createElement("div");
        followerPrice.textContent = `Price: ${element.upgradePrice()}`;
        followerPrice.classList.add("followerPrice");
        info.appendChild(followerInfo);
        info.appendChild(followerPrice);
        info.classList.add("followerInfoBox");
        followerContainer.appendChild(info);
        let upgradeButton = document.createElement("span");
        upgradeButton.textContent = "Level Up";
        upgradeButton.classList.add("upgrade");
    
        upgradeButton.addEventListener("click", function(){
            if(player.balance >= element.upgradePrice()){
                player.balance -= element.upgradePrice();
                element.level+=1;
            }
        })
        let levelInfo = document.createElement("div");
        levelInfo.textContent = `Level: ${element.level}`;
        level.appendChild(levelInfo);
        level.appendChild(upgradeButton);
        level.classList.add("followerLevelBox");

        followerContainer.appendChild(level);
        followerContainer.classList.add("followerCard");
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

window.onload = function(){
    initiateClickableArea();
    setupPlayerFollowers();

    setFollowers();

    updateBalance();
    setupClickableArea();

    window.requestAnimationFrame(gameLoop);
}