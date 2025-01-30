let turn="X";
let won=false;
//function to change turn.
const ChangeTurn =()=>{
    return turn==="X"?"O":"X";
}
//function to check winner.
const checkWin=()=>{
     let boxtexts=document.getElementsByClassName("boxtext");
     let wins=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
     ]
    wins.forEach(e=>{
        if(boxtexts[e[0]].innerText===boxtexts[e[1]].innerText&&boxtexts[e[1]].innerText===boxtexts[e[2]].innerText&&boxtexts[e[0]].innerText!==''){
            document.getElementById('textturn').innerText=boxtexts[e[0]].innerText +" WON";
            won=true;
            setTimeout(()=>{
                alert('Want to play again? Restart');
            },1000)
            
        }
    })
}

//game logic
let boxes=document.getElementsByClassName("boxes");
let cnt=0;
Array.from(boxes).forEach((element)=>{
       let boxtext=element.querySelector('.boxtext');
       element.addEventListener('click',()=>{
           cnt++;
           if(boxtext.innerText===''&&!won){
            boxtext.innerText=turn;
            turn =ChangeTurn();
            checkWin();
           if(cnt<9&& !won){
            document.getElementById('textturn').innerText='Turn For '+turn;
           }
           
           }
           if(cnt>=9&& !won){
            document.getElementById('textturn').innerText='No More Turns -Match Tied';
           }
           

       })

    
})
//restart the game.
reset.addEventListener('click',()=>{
     let boxtexts=document.getElementsByClassName('boxtext');
     Array.from(boxtexts).forEach(element=>{
        element.innerText='';
     })
     turn="X";
     won=false;
     cnt=0;
     document.getElementById('textturn').innerText='Turn For '+turn;


})



