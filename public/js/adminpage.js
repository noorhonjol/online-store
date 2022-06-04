const buttonaddform=document.getElementById("show-add-form");
const buttonshowtable=document.getElementById("show-table-users")
const toshowform= document.getElementsByClassName("insert-data")[0]
const toshowtable=document.getElementsByClassName("users-table")[0]

const delbtn = document.getElementsByClassName("delbtn");

for(var i=0; i<delbtn.length; i++){
    
    delbtn[i].addEventListener("click",(e)=>{
        
        const btn = e.target;
        axios.delete(`http://localhost:3200/admin-page/${btn.value}`).then((response)=>{
            btn.parentNode.parentNode.remove()
        }).catch((error)=>{
            console.log(error)
        })

    })
}


buttonaddform.addEventListener("click",()=>{
    buttonaddform.classList.add("dash-active")

    buttonshowtable.classList.remove("dash-active");
    
    toshowform.style.display="flex"
    toshowtable.style.display="none";


})

buttonshowtable.addEventListener("click",()=>{
    
    buttonshowtable.classList.add("dash-active")
    buttonaddform.classList.remove("dash-active");

    toshowform.style.display="none"
    toshowtable.style.display="flex";
})