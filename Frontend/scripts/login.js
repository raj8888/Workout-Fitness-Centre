let email = document.querySelector("#email")
const password  = document.querySelector("#password")
let log = document.querySelector("#sign")


log.addEventListener("click",()=>{
   if(password.value == "" || email.value==""){
    alert("All fields are manadatory")
   }else{
    alert("Logged in")
   }
})

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

