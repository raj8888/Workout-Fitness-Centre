import baseURL from "./baseURL.js"

let create = document.querySelector("#create")
let form = document.querySelector("form");

create.addEventListener("click",(e)=>{
    e.preventDefault();

    date_time=form.date_time.value
    let obj = {
        title: form.title.value,
        price: form.price.value,
        activity: form.activity.value,
        seatTotal: form.seatTotal.value,
        venue: form.venue.value,
        locationOrLinkLocation: form.locationOrLinkLocation.value,
        duration: form.duration.value,
        role: form.role.value,
    }
    // userSaveInDB(obj);
})


async function userSaveInDB(obj){
    console.log(obj)
    try {
        let url = baseURL+"/user/register"
        let res = await fetch(url,{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(obj)
        });
        let data = await res.json();
        if(res.status==400){
            alert(data.error)
            window.location.assign("/frontend/pages/login.html");
        }else if(res.status==401){
            alert(data.message);
            console.log(data.error);
        }else{
            alert(data.message);
            console.log(data.user);
            window.location.assign("/frontend/pages/login.html");
        }
    } catch (error) {
        alert("Server not responding");
        console.log(error.message)
    }
}
