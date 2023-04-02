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
