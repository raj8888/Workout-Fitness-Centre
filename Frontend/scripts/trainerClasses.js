
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
              renderAllData(trainerClasses)
            })
          }else{
        //    alert("Classes Not Fetched")
          }
          } catch (error) {
        //    alert("Server not responding");
           console.log(error.message)
          }
}
let allclassescard=document.getElementById("allcallesdiv")

function renderAllData(data){
    if(data.length<=0){
        allclassescard.innerHTML=`
        <p>Class not created yet</p>
        `
    }else{
    let allData=data
    // allclassescard.innerHTML=""
    let map_allData=allData.map(elem=>{
        return` <div class="classcard">
                    
        <div class="imgandins">
                <div class="imgclassdiv">
                    <img src=${renderImages(elem.activity)} alt=${elem.activity} class="classimages">
                     <a href=./classDetails.html?id=${elem._id} class="singleclasslink" >${elem.title}</a>
                    
                </div>
                <div class=insnameandmode>
                    <p>${elem.activity}</p>
                    <p>${checkvenue(elem.venue,elem.locationOrLink)}</p>
                </div>
        </div>
        <div class="actandseat">
                <div>
                    <p>${elem.classDate}</p>
                    <p>${elem.classTime}</p>
                </div>
                <div>${elem.seatOccupied}/${elem.seatTotal}</p>
                    <p>${elem.price}₹</p>
                </div>
        </div>
        <div class="joinclassdiv">
            <button class="joinclassbutton" data-id=${elem._id}>Delete Class</button>
        </div>
    </div><hr>`
    })
    allclassescard.innerHTML=map_allData.join("")
    
    let deletclass=document.querySelectorAll('.joinclassbutton')
    deletclass.forEach(elem=>{
        elem.addEventListener('click',(event)=>{
            let classid=event.target.dataset.id
            deleteClass(classid)
        })
    })
}
}

async function deleteClass(classid){
    try {
        let data=await fetch(baseURL+`/class/delete/${classid}`,{
            method:"DELETE",
            headers:{   
                authorization:`Bearer ${loggedInUserEmail}`
            }
        })
        if(data.ok){
            // alert("Class Deleted Successfully")
            swal({text: "Class Deleted Successfully", icon: "success", button: "ok", timer:1000})
            getAllClass()
        }else{
            // alert("Class not deleted")
            swal({text: "Class not deleted", icon: "error", button: "ok", timer:1000})
        }
    } catch (error) {
        // alert("Server not responding");
        swal({text: "Server not responding", icon: "error", button: "ok", timer:1000})
        console.log(error.message)
    }
}
function checkvenue(venue,locationOrLink){
    if(venue==="online"){
     return 'Online-via Zoom'
    }else{
     return `Venue - At ${locationOrLink}`
    }
 }

function renderImages(actname){
    let allImagesData={
        yoga:["../Images/Classes_Images/yoga1.jpg","../Images/Classes_Images/yoga2.jpg","../Images/Classes_Images/yoga3.jpg"],
        cardio:["../Images/Classes_Images/boxing1.jpg","../Images/Classes_Images/aerobics2.jpg","../Images/Classes_Images/crossfit1.jpg"],
        swimming:["../Images/Classes_Images/swimming1.jpg","../Images/Classes_Images/swimming2.jpg","../Images/Classes_Images/swimming3.jpg"],
        running:["../Images/Classes_Images/football1.jpg","../Images/Classes_Images/football2.jpg","../Images/Classes_Images/football3.jpg"],
        zumba:["../Images/Classes_Images/zumba1.jpg","../Images/Classes_Images/zumba2.jpg","../Images/Classes_Images/zumba3.jpg"],
        aerobics:["../Images/Classes_Images/aerobics1.jpg","../Images/Classes_Images/aerobics2.jpg","../Images/Classes_Images/aerobics3.jpg"],
        ballet:["../Images/Classes_Images/ballet1.jpg","../Images/Classes_Images/ballet2.jpg","../Images/Classes_Images/ballet3.jpg"],
        basketball:["../Images/Classes_Images/basketball1.jpg","../Images/Classes_Images/basketball2.jpg","../Images/Classes_Images/basketball3.jpg"],
        boxing:["../Images/Classes_Images/boxing1.jpg","../Images/Classes_Images/boxing3.jpg","../Images/Classes_Images/boxing2.jpg"],
        crossfit:["../Images/Classes_Images/crossfit1.jpg","../Images/Classes_Images/crossfit3.jpg","../Images/Classes_Images/crossfit2.jpg"],
        cycling:["../Images/Classes_Images/cycling1.jpg","../Images/Classes_Images/cycling2.jpg","../Images/Classes_Images/cycling3.jpg"],
        football:["../Images/Classes_Images/football1.jpg","../Images/Classes_Images/football2.jpg","../Images/Classes_Images/football3.jpg"],
        kickboxing:["../Images/Classes_Images/kickboxing1.jpg","../Images/Classes_Images/kickboxing2.jpg","../Images/Classes_Images/kickboxing3.jpg"],
        singing:["../Images/Classes_Images/singing1.jpg","../Images/Classes_Images/singing3.jpg","../Images/Classes_Images/singing2.jpg"],
        weighttraining:["../Images/Classes_Images/weighttraining1.jpg","../Images/Classes_Images/weighttraining2.jpg","../Images/Classes_Images/weighttraining3.jpg"],
        dance:["../Images/Classes_Images/dance1.jpg","../Images/Classes_Images/dance2.jpg","../Images/Classes_Images/dance3.jpg"]
    }
    let newactname=actname.toLowerCase()
    let name=allImagesData[`${newactname}`]
    let imgLink=getRandomItem(name)
   return(imgLink)
}

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}

function findClass(arr,id){
    
    let allClass=arr.filter(elem=>{
        if(elem.trainerID==id){
            return elem
        }
    })
    return allClass
}