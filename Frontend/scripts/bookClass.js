import baseURL from "./baseURL.js"

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
if(!loggedInUser){    
    window.location.assign("/frontend/pages/login.html");
}
let loggedInUserEmail = loggedInUser.email;

let form = document.querySelector("form");

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
            alert(data.message)
            console.log(data.error);
        }else{    
            displayDataInForm(data.classes);        
            // console.log(data.classes);
            // window.location.assign("/frontend/pages/login.html");
        }
    } catch (error) {
        alert("Server not responding");
        console.log(error.message)
    }
}

function displayDataInForm(classes){
    console.log(classes)

    let date_time= classes.classDate+"T"+classes.classTime;
    console.log(date_time)
    form.title.value = classes.title; 
    form.price.value  = classes.price; 
    form.activity.value = classes.activity; 
    form.seatTotal.value = classes.seatTotal; 
    form.venue.value = classes.venue; 
    form.locationOrLink.value = classes.locationOrLink; 
    form.duration.value = classes.duration; 
    form.trainerName.value = classes.trainerName;   
    form.date_time.value = date_time;   
    form.date_time.min = date_time;   
    form.date_time.max = date_time;   
    // form.date_time.max = classes.trainerName;   
    // document.getElementById("myLocalDate").min = "2006-05-05T16:15:23";
    // document.getElementById("myLocalDate").value = "2014-01-02T11:42:13.510";
}       



// form.addEventListener("submit",(e)=>{
//     e.preventDefault();

//     let date_time= form.date_time.value.split("T");
    
//     let obj = {
//         title: form.title.value,
//         price: form.price.value,  
//         activity: form.activity.value,
//         seatTotal: form.seatTotal.value,
//         venue: form.venue.value,
//         locationOrLinkLocation: form.locationOrLink.value,
//         duration: form.duration.value,
//         classDate: date_time[0],
//         classTime: date_time[1]
//     }
//     // classSaveInDB(obj);
// })


// async function classSaveInDB(obj){
//     // console.log(obj)
//     try {
//         let url = baseURL+"/class/create"
//         let res = await fetch(url,{
//             method:"POST",
//             headers: {
//               authorization:`Bearer ${loggedInUserEmail}`,
//               "Content-Type": "application/json",
//             },
//             body:JSON.stringify(obj)
//         });
//         let data = await res.json();
//         if(res.status==400){
//             alert(data.message)
//             console.log(data.error)
//             // window.location.assign("/frontend/pages/login.html");
//         }else{
//             alert(data.message);
//             console.log(data.classes);
//             // window.location.assign("/frontend/pages/login.html");
//         }
//     } catch (error) {
//         alert("Server not responding");
//         console.log(error.message)
//     }
// }
