import baseURL from "./baseURL.js"

let FirstName = document.querySelector('#firstName')
let LastName = document.querySelector('#lastName')
let Email = document.querySelector('#Email')
const password = document.querySelector('#password1')
const password2 = document.querySelector('#password2')
let country = document.querySelector('#country')
let role = document.querySelector('#role')
let gender = document.querySelector("#gender")
let submit = document.querySelector("#sign")

// let form = document.querySelector("form");
submit.addEventListener("click",(e)=>{
    // if(FirstName.value=="" || LastName.value=="" || Email.value=="" || password.value == "" || password2.value =="" || country.value ==""){
    //     alert("All fields are mandatory")
    // }
    e.preventDefault();
    if(password.value !== password2.value){
        alert("Both passwords should be similar.")
    }else{
        let obj = {
            name: FirstName.value+" "+LastName.value,
            email: Email.value,
            password: password.value,
            country: country.value,
            sex: gender.value,
            role: role.value
        }
        userSaveInDB(obj);
        // alert("Your account created succesfully")

    }
})

document.querySelector("#login").addEventListener("click",()=>{
    window.location.assign("/frontend/pages/login.html");
})


const togglePassword = document.querySelector('#togglePassword1');

togglePassword.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash');
});
const togglePassword2 = document.querySelector('#togglePassword2');

togglePassword2.addEventListener('click', function (e) {
  // toggle the type attribute
  const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
  password2.setAttribute('type', type);
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash');
});


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
            // alert(data.error)
            swal({text: data.error, icon: "error", button: "ok", timer:1000})
            .then(()=>{
                window.location.assign("/frontend/pages/login.html");
            })
        }else if(res.status==401){
            // alert(data.message);
            swal({text: data.message, icon: "error", button: "ok", timer:1000})
            console.log(data.error);
        }else{
            // alert(data.message);
            console.log(data.user);            
            swal({text: data.message, icon: "success", button: "ok", timer:1000})
            .then(()=>{
                window.location.assign("/frontend/pages/login.html");
            })
        }
    } catch (error) {
        // alert("Server not responding");
        swal({text: "Server not responding", icon: "error", button: "ok", timer:1000})
        console.log(error.message)
    }
}
