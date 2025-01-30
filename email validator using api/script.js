submitbtn.addEventListener("click",async (e)=>{
    e.preventDefault();
    let key="ema_live_y1H6X5IYzqixAbJDbYw4X4qw5sZAL7xCfAUq3qPp";
    let email=document.getElementById("username").value;
    let url=`https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;
    let res=await fetch(url);
    let result=await res.json();
    let str=``;
    for(key of Object.keys(result)){
        if(result[key]!==""){
            str=str+`<div>${key}:${result[key]}</div>`;
        }
    }
    
    resultcontainer.innerHTML=str;
})