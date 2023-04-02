import baseURL from "./baseURL.js"

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
if(!loggedInUser){    
    window.location.assign("/frontend/pages/login.html");
}
let loggedInUserEmail = loggedInUser.email;

let form = document.querySelector("form");

let venue=document.getElementById("venue");
let locationOrLink=document.getElementById("locationOrLink");
let date_time=document.getElementById("date_time");
locationOrLink.readOnly = true;

venue.addEventListener("change",()=>{
    if(venue.value=="offline"){
        locationOrLink.readOnly = false;
        locationOrLink.placeholder= "Enter City name";
    }else{
        locationOrLink.readOnly = true;
        locationOrLink.placeholder= "Select Class Date & Time to generate class link";
        locationOrLink.value= "Select Class Date & Time to generate class link";
    }
})

date_time.addEventListener("change",()=>{
    if(venue.value=="online"){
        locationOrLink.value= "https://us06web.zoom.us/j/9314210793";
    }
})

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    let date_time= form.date_time.value.split("T");
    
    let obj = {
        title: form.title.value,
        price: form.price.value,  
        activity: form.activity.value,
        seatTotal: form.seatTotal.value,
        venue: form.venue.value,
        locationOrLink: form.locationOrLink.value,
        duration: form.duration.value,
        classDate: date_time[0],
        classTime: date_time[1]
    }
    classSaveInDB(obj);
})


async function classSaveInDB(obj){
    // console.log(obj)
    try {
        let url = baseURL+"/class/create"
        let res = await fetch(url,{
            method:"POST",
            headers: {
              authorization:`Bearer ${loggedInUserEmail}`,
              "Content-Type": "application/json",
            },
            body:JSON.stringify(obj)
        });
        let data = await res.json();
        if(res.status==400){
            // alert(data.message)            
            swal({text: data.message, icon: "error", button: "ok", timer:1000})
            console.log(data.error)
        }else{
            // alert(data.message);
            swal({text: data.message, icon: "success", button: "ok", timer:1000})
            .then(()=>{ 
                window.location.assign("/frontend/pages/trainerDashboard.html");
            })
            console.log(data.classes);
        }
    } catch (error) {
        // alert("Server not responding");
        swal({text: "Server not responding", icon: "error", button: "ok", timer:1000})
        console.log(error.message)
    }
}
