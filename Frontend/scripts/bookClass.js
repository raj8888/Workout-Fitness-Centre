import baseURL from "./baseURL.js"

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
if(!loggedInUser){    
    window.location.assign("/frontend/pages/login.html");
}
let loggedInUserEmail = loggedInUser.email;
let orderDetailObj={};

let form = document.querySelector("form");
let checkAvailablity_btn = document.querySelector(".checkAvailablity_btn");
let next_btn = document.querySelector(".next_btn");
next_btn.style.display="none";  

let left_img_part=document.querySelector("#left_img_part img");


const urlParams = new URLSearchParams(window.location.search)
const classId = urlParams.get("id");

getClass(classId)
async function getClass(classId){
    try {
        let res = await fetch(`${baseURL}/class/${classId}`,{
            method:"GET",
            headers: {
              authorization:`Bearer ${loggedInUserEmail}`
            }
        });
        let data = await res.json();
        if(res.status==400){
            // alert(data.message)
            swal({text: data.message, icon: "error", button: "ok", timer:1000})
            console.log(data.error);
        }else{    
            displayDataInForm(data.classes);        
            // console.log(data.classes);
            // window.location.assign("/frontend/pages/login.html");
        }
    } catch (error) {
        // alert("Server not responding");        
        swal({text: "Server not responding", icon: "error", button: "ok", timer:1000})
        console.log(error.message)
    }
}

function displayDataInForm(classes){
    // console.log(classes)    

    let date_time= classes.classDate+"T"+classes.classTime;
    form.title.value = classes.title; 
    form.price.value  = classes.price; 
    form.activity.value = classes.activity; 
    form.seatTotal.value = classes.seatTotal; 
    form.venue.value = classes.venue; 
    form.duration.value = classes.duration; 
    form.trainerName.value = classes.trainerName;   
    form.date_time.value = date_time;   
    form.date_time.min = date_time;   
    form.date_time.max = classes.classDate+"T"+"22:59:59";   
    if(classes.venue=="online"){
        form.locationOrLink.value = "Complete booking to  get class link"; 
    }else{
        form.locationOrLink.value = classes.locationOrLink; 
    }
    left_img_part.src=renderImages(classes.activity)
}       



form.addEventListener("submit",(e)=>{
    e.preventDefault();

    let obj = {
        price: form.price.value,  
        selectedDate_Time:form.date_time.value,
        classID:classId
    }
    checkAvailablity(obj);
})


async function checkAvailablity(obj){
    // console.log(obj)
    try {
        let url = baseURL+"/order/checkAvailablity"
        let res = await fetch(url,{ 
            method:"POST",
            headers: {
              authorization:`Bearer ${loggedInUserEmail}`,
              "Content-Type": "application/json"
            },
            body:JSON.stringify(obj)
        });
            let data = await res.json();
            if(res.status==400){
                // alert(data.message)
                swal({text: data.message, icon: "error", button: "ok", timer:1000})
                // console.log(data.error)
            }else if(res.status==401){
                // alert(data.message)
                swal({text: data.message, icon: "error", button: "ok", timer:1000})
            }else{
                // alert(data.message);
                swal({text: data.message+"\n", icon: "success", button: "ok", timer:1000})
                .then(()=>{                    
                    orderDetailObj=obj;
                    checkAvailablity_btn.style.display="none";
                    next_btn.style.display="block";
                })
            }
    } catch (error) {
        // alert("Server not responding");        
        swal({text: "Server not responding", icon: "error", button: "ok", timer:1000})
        console.log(error.message);
    }
}

next_btn.addEventListener("click",(e)=>{
    // console.log(orderDetailObj)
    sessionStorage.setItem("classDetailsForOrder",JSON.stringify(orderDetailObj));    
    window.location.assign("/frontend/pages/payment.html");
})


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
   let randomIndex = Math.floor(Math.random() * 2);
   let item = arr[randomIndex];
  return item;
}