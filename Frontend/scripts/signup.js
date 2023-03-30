let FirstName = document.querySelector('#firstName')
let LastName = document.querySelector('#lastName')
let Email = document.querySelector('#Email')
const password = document.querySelector('#password1')
const password2 = document.querySelector('#password2')
let country = document.querySelector('#countryName')

let submit = document.querySelector("#sign")

submit.addEventListener("click",()=>{
    let gender = document.querySelector("#gender").value
    if(FirstName.value=="" || LastName.value=="" || Email.value=="" || password.value == "" || password2.value =="" || country.value ==""){
        alert("All fields are mandatory")
    }
    else if(password.value !== password2.value){
        alert("Both passworf should be similar")
    }else{
        alert("Your account created succesfully")
    }
})

document.querySelector("#login").addEventListener("click",()=>{
    window.location="login.html"
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

