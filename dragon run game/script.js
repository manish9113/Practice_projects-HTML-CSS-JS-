score=0;
cross=true;
audio=new Audio("music.mp3");
audiogo=new Audio("gameover.mp3");
setTimeout(()=>{
    audio.play();
},1000)
window.addEventListener("keydown",checkkey);
function checkkey(event){
    console.log(event.key);
    if(event.key=="ArrowUp"){
        dino=document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(()=>{
            dino.classList.remove('animateDino');
        },1000);
    }
    if(event.key=="ArrowRight"){
        dino=document.querySelector('.dino');
        dinox=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=dinox+112+"px";
    }
    if(event.key=="ArrowLeft"){
        dino=document.querySelector('.dino');
        dinox=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left=(dinox-112)+"px";
    }
}
setInterval(()=>{
   dino=document.querySelector('.dino');
   gameover=document.querySelector('.gameover');
   obstacle=document.querySelector('.obstacle');
   dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
   dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));
   ox=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
   oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));
   offsetx=Math.abs(dx-ox);
   offsety=Math.abs(dy-oy);
   console.log(offsetx,offsety);
   if(offsetx<93 && offsety<52){
    gameover.style.visibility='visible';
    obstacle.classList.remove('obstacleAni');
    audiogo.play();
    setTimeout(()=>{
        audiogo.pause();
        audio.pause();
    },1000);
   }
   else if(offsetx<145 && cross){
    score+=1;
    updatescore(score);
    cross=false;
    setTimeout(()=>{
        cross=true;
    },1000);
    setTimeout(()=>{
         anidur=parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
         newdur=anidur-0.001;

         obstacle.style.animationDuration=newdur+"s";
    },500);
   }


},100);
function updatescore(score){
    scorecnt.innerHTML="your Score :"+ score;
}
