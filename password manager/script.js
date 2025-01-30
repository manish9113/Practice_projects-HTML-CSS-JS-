//logic to delete password from the table.
const deletePassword=(website)=>{
    let data=localStorage.getItem('passwords');
    let arr=JSON.parse(data);
    arrupdated=arr.filter((e)=>{
        // console.log(e);
        // console.log(typeof(e));
        return e.website!=website;
    })
    localStorage.setItem("passwords",JSON.stringify(arrupdated));
    showPassword();
}
//function to copy to the clipboard.
const copytext=(text)=>{
    navigator.clipboard.writeText(text);
    alert("copied to the clipboard");
}
//function to mask password
function maskPassword(pass){
    let str="";
    for(let i=0;i<pass.length;i++){
        str+="*";
    }
    return str;
}






//logic to fill the table.
const showPassword=()=>{

let tb=document.getElementById("tb");
let data=localStorage.getItem("passwords");
if(data==null ||JSON.parse(data).length==0){
    tb.innerHTML="No passwords saved Yet";
}
else{
    tb.innerHTML=`
                <tr>
                    <th>Website</th>
                    <th>UserName</th>
                    <th>Password</th>
                    <th>Delete</th>
                </tr>
    `
    let arr=JSON.parse(data);
    let str="";
    for(let i=0;i<arr.length;i++){
        const element=arr[i];
    

    str +=` <tr>
    <td>${element.website}</td>
    <td>${element.username}</td>
    <td>${maskPassword(element.password)}<img src="copy.svg" onclick="copytext(${element.password})"></td>
    <td><button onclick="deletePassword('${element.website}')">Delete</button></td>
    </tr>`
    }
    tb.innerHTML=tb.innerHTML+str;

}
  website.value="";
  username.value="";
  password.value="";
}
showPassword();



//logic to store the password in the local storage.

    let button=document.getElementById("savebtn");
    button.addEventListener("click",(e)=>{
         e.preventDefault();
        // console.log(website.value,username.value,password.value);
        let passwords=localStorage.getItem("passwords");
        console.log(passwords);
       
        // console.log(typeof(json));
        if(!passwords){
        let json=[];
        if(website.value&&username.value&&password.value){
        json.push({website:website.value,username:username.value,password:password.value});
        alert("password saved");
        }
        localStorage.setItem("passwords",JSON.stringify(json));
       
        }
        else{
           let json=JSON.parse(localStorage.getItem("passwords"));
           if(website.value&&username.value&&password.value){
           json.push({website:website.value,username:username.value,password:password.value});
           alert("password saved");
           }
           localStorage.setItem("passwords",JSON.stringify(json));
          
        }
        
       showPassword();
    })


