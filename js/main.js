// Make Splash Screen
let screen =document.querySelector(".splash-screen");
let screenBtn=document.querySelector(".splash-screen button");
let playerName=document.querySelector(".player-name span");
// Action of click the screen button
screenBtn.onclick=function(){
    let yourName= prompt("what is your name?");
    if(yourName==null||yourName==''){
playerName.innerHTML="Unknown"
    }
    else{
        playerName.innerHTML=yourName;
    }
// add audio start the game
    document.querySelector("#start").play();
    // remove the splash screen to begin the game
    screen.remove()
}
// main variables
// the time in flipped the card
let duration = 1000; 
let mainBlock = document.querySelector('.memory-blocks');
let theBlocks=Array.from(mainBlock.children );
// make Array with number of blocks  such Array[10], keys=> 0-19
let orderNum=Array.from (Array(theBlocks.length).keys());
shuffle(orderNum);
// add ordernumber to blocks by css property "order"
theBlocks.forEach(function(block ,index){
block.style.order=orderNum[index];
block.onclick=function(){
    flipped(block) 
}
})
// shuffle function
function shuffle(arr){
    let current=arr.length;
    let temp;
    let random;
    while(current>0){
        random=Math.floor(Math.random()*current);
        current--;
        temp= arr[current];
        arr[current]=arr[random];
        arr[random]=temp
        
    }
    return arr;
}

// flipped function 
function flipped(selectedBlock){
    // flipped the current block
    selectedBlock.classList.add('isRotate');
    // collect flipped blocks
    let flippedBlocks=theBlocks.filter(flBlock=>flBlock.classList.contains("isRotate"));
    if(flippedBlocks.length==2) {
        // stop click function 
        stopClicking()
        // check matching
        // the index 0,1 because the length is 2
        checkMatching(flippedBlocks[0],flippedBlocks[1])
    }
}
// stop clicking function
function stopClicking(){
    mainBlock.classList.add("not-clicked");
    setTimeout(()=>{
        mainBlock.classList.remove("not-clicked");
    },duration)
}
// checkMatching function
function checkMatching(firstSelect,secondSelect){
// select the tries counter
let tries=document.querySelector(".tries-count span")
if(firstSelect.dataset.tech===secondSelect.dataset.tech){

    firstSelect.classList.remove("isRotate");
    secondSelect.classList.remove("isRotate");

    firstSelect.classList.add("isMatch");
    secondSelect.classList.add("isMatch");
    document.querySelector("#succes").play()
}
else{
    // increase the num of tries
    tries.innerHTML=parseInt(tries.innerHTML)+1;
    // to wait the blocks to show first
    setTimeout(()=>{
        firstSelect.classList.remove("isRotate");
        secondSelect.classList.remove("isRotate");
    
    },duration)
    document.querySelector("#fail").play()

}
}




