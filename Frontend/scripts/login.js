let email = document.querySelector("#email")
const password  = document.querySelector("#password")
let log = document.querySelector("#sign")
import baseURL from "./baseURL.js"

log.addEventListener("click",()=>{
  let obj ={
    email:email.value,password:password.value
  }
  loginUser(obj)
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

