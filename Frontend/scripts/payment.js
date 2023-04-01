import baseURL from "./baseURL.js";

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
if (!loggedInUser) {
  window.location.assign("/frontend/pages/login.html");
}
let loggedInUserEmail = loggedInUser.email;

let classDetailsForOrder = JSON.parse(sessionStorage.getItem("classDetailsForOrder")) || {}; 
document.getElementById("price").innerText = "₹" + (classDetailsForOrder.price||0);


async function orderClass(obj){
    // console.log(obj)
    try {
        let url = baseURL+"/order/create"
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
                alert(data.message)
                console.log(data.error)
            }else{
                // alert(data.message);                          
                swal({text: data.message, icon: "success", button: "ok", timer:1000})
                .then(()=>{
                    window.location.assign("/frontend/pages/userdashboard.html");
                })
            }
    } catch (error) {
      // alert("Server not responding");
      swal({text: "Server not responding", icon: "error", button: "ok", timer:1000})
        console.log(error.message);
    }
}


let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  let cardnumber = document.querySelector(".card-number-input");
  let cardholder = document.querySelector(".card-holder-input");
  let month = document.querySelector(".month-input");
  let year = document.querySelector(".year-input");
  let cvv = document.querySelector(".cvv-input");

  if (
    cardnumber.value == "" ||
    cardholder.value == "" ||
    month.value == "" ||
    year.value == "" ||
    cvv.value == ""
  ) {
    // alert("Please fill all the details");
    swal({text: "Please fill all the details", icon: "warning", button: "ok", timer:1000})
  } else {
    orderClass(classDetailsForOrder);
  }

  event.preventDefault();
});

document.querySelector(".card-number-input").oninput = () => {
  document.querySelector(".card-number-box").innerText =
    document.querySelector(".card-number-input").value;
};

document.querySelector(".card-holder-input").oninput = () => {
  document.querySelector(".card-holder-name").innerText =
    document.querySelector(".card-holder-input").value;
};

document.querySelector(".month-input").oninput = () => {
  document.querySelector(".exp-month").innerText =
    document.querySelector(".month-input").value;
};

document.querySelector(".year-input").oninput = () => {
  document.querySelector(".exp-year").innerText =
    document.querySelector(".year-input").value;
};

document.querySelector(".cvv-input").onmouseenter = () => {
  document.querySelector(".front").style.transform =
    "perspective(1000px) rotateY(-180deg)";
  document.querySelector(".back").style.transform =
    "perspective(1000px) rotateY(0deg)";
};

document.querySelector(".cvv-input").onmouseleave = () => {
  document.querySelector(".front").style.transform =
    "perspective(1000px) rotateY(0deg)";
  document.querySelector(".back").style.transform =
    "perspective(1000px) rotateY(180deg)";
};

document.querySelector(".cvv-input").oninput = () => {
  document.querySelector(".cvv-box").innerText =
    document.querySelector(".cvv-input").value;
};
