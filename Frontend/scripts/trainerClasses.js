
import baseURL from "./baseURL.js"

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
if(!loggedInUser){    
    window.location.assign("/frontend/pages/login.html");
}
let loggedInUserEmail = loggedInUser.email;

getAllClass()

async function getAllClass(){
    try{
        let dataFetch=await fetch(baseURL+"/class/all",{
           headers:{   
               authorization:`Bearer ${loggedInUserEmail}`
           }
       })
       if(dataFetch.ok){
           let temp=dataFetch.json()
           .then(res=>{
               let getTrainerInfo=JSON.parse(sessionStorage.getItem("loggedInUser"))
              let trainerID=getTrainerInfo._id
              let trainerClasses=findClass(res.classes,trainerID)
              console.log(trainerClasses)
            })
          }else{
        //    alert("Classes Not Fetched")
          }
          } catch (error) {
           alert("Server not responding");
           console.log(error.message)
          }
}

function findClass(arr,id){
    
    let allClass=arr.filter(elem=>{
        if(elem.trainerID==id){
            return elem
        }
    })
    return allClass
}