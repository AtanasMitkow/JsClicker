let player = {
    balance: 0,
    baseOnClickBalance: 1,
    BasePerSecBalance: 0.01,
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
        followerInfo.textContent = `${element.name}        Price: ${element.upgradePrice()}`;
        followerContainer.appendChild(followerInfo);
        let upgradeButton = document.createElement("span");
        upgradeButton.textContent = "Upgrade";
    
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

function calculatePerSecBalance(){
    let totalMultiplier = 1;
    player.followers.forEach(element => {
        totalMultiplier = totalMultiplier * element.multiplier();
    });
    console.log(totalMultiplier);
    player.perSecBalance = player.BasePerSecBalance * totalMultiplier
}

function updateFollowers(){

}

gameLoop = () => {
    setTimeout(() => {
        calculatePerSecBalance();
        player.balance+=player.perSecBalance/100;
        updateBalance();
        updateFollowers();
        
        window.requestAnimationFrame(gameLoop);
    }, 10);
}