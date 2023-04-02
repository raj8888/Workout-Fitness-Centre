let email = document.querySelector("#email")
const password  = document.querySelector("#password")
let log = document.querySelector("#sign")
import baseURL from "./baseURL.js"

log.addEventListener("click",()=>{
  let obj ={
    email:email.value,password:password.value
  }
  // Admin login static from login page - if admin credentials not working - login with any user or trainer credentials then go to inspect- application-session storage- then copy (loggedInUser- value and add it in below loggedInUser -variable);
  if(obj.email=="admin@gmail.com" && obj.password=="admin"){
    let loggedInUser={"_id":"642974f8036361a9aeb7c805","name":"Sarvesh Gupta","email":"sarveshgupta14@gmail.com","password":"$2b$05$7.qjtv0YZCmy4Agp2jel2OmeXo61eddMG2HuCUbVuQFZayOqpuR/6","country":"India","sex":"Male","role":"client","healthProblem":[],"classes":["6429766b036361a9aeb7c81a","6429bc8128f1f73bb4ef160a","6429c2218611effb438e0258"],"createdDate":"2-4-2023","createdTime":"12:28:40"}
    sessionStorage.setItem("loggedInUser",JSON.stringify(loggedInUser))
    swal({text: "Admin Login Successful", icon: "success", button: "ok", timer:1000})
            .then(()=>{
                window.location.assign("/frontend/pages/adminDashboard.html");              
            })
  }else{
    // Normal user and trainer dyanamic login
    loginUser(obj)
  }

})

async function loginUser(obj){
  console.log(obj)
    try {
        let url = baseURL+"/user/login"
        let res = await fetch(url,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(obj)
        });
        let data = await res.json();
        if(res.status==400){
            // alert(data.error)
            swal({text: data.error, icon: "error", button: "ok", timer:1000})
        }else if(res.status==401){
            swal({text: data.error, icon: "error", button: "ok", timer:1000})
        }
        else{
            // alert(data.message); 
            swal({text: data.message, icon: "success", button: "ok", timer:1000})
            .then(()=>{
                sessionStorage.setItem("loggedInUser",JSON.stringify(data.user))
                if(data.user.role=="client"){
                  window.location.assign("/frontend/pages/userDashboard.html");
                }else{
                  window.location.assign("/frontend/pages/trainerDashboard.html");              
                }
            })

        }
    } catch (error) {
        // alert("Server not responding");
        swal({text: "Server not responding", icon: "error", button: "ok", timer:1000})
        console.log(error.message)
    }
}


document.querySelector("#signup").addEventListener("click",()=>{
    window.location="signup.html"
})


const togglePassword = document.querySelector('#togglePassword');
togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash');
});

