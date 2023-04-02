import baseURL from "./baseURL.js"

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
if(!loggedInUser){    
    window.location.assign("/frontend/pages/login.html");
}
let loggedInUserEmail = loggedInUser.email;

let newData;

getAllClass();
async function getAllClass(){
    try{
     let dataFetch=await fetch(baseURL+"/class/all",{
        headers:{   
            authorization:`Bearer ${loggedInUserEmail}`
        }
    })
    if(dataFetch.ok){
        let temp=dataFetch.json()
        .then(res=>{
            newData=res.classes
            renderAllData(res.classes)})
       }else{
        // alert("Classes Not Fetched")
        swal({text: "Classes Not Fetched", icon: "error", button: "ok", timer:1000})
       }
       } catch (error) {
        // alert("Server not responding");
        swal({text: "Server not responding", icon: "error", button: "ok", timer:1000})
        console.log(error.message)
       }
}

getAllUsers();
async function getAllUsers(){
    try{
     let dataFetch=await fetch(baseURL+"/user/all",{
        headers:{   
            authorization:`Bearer ${loggedInUserEmail}`
        }
    })
    if(dataFetch.ok){
        let temp=dataFetch.json()
        .then(res=>{
            newData=res.users
            renderAllUsersData(res.users)})
       }else{
        // alert("users Not Fetched")
        swal({text: "Users Not Fetched", icon: "error", button: "ok", timer:1000})
       }
       } catch (error) {
        // alert("Server not responding");
        swal({text: "Server not responding", icon: "error", button: "ok", timer:1000})
        console.log(error.message)
       }
}

getAllOrders();
async function getAllOrders(){  
    try{
     let dataFetch=await fetch(baseURL+"/order/all",{
        headers:{   
            authorization:`Bearer ${loggedInUserEmail}`
        }
    })
    if(dataFetch.ok){
        let temp=dataFetch.json()
        .then(res=>{
            newData=res.orders
            renderAllOrdersData(res.orders)})
       }else{
        // alert("orders Not Fetched")
        swal({text: "orders Not Fetched", icon: "error", button: "ok", timer:1000})
       }
       } catch (error) {
        // alert("Server not responding");
        swal({text: "Server not responding", icon: "error", button: "ok", timer:1000})
        console.log(error.message)
       }
}



let allClassesNav=document.getElementById("allClassesNav")
let allUsersNav=document.getElementById("allUsersNav")
let allOrdersNav=document.getElementById("allOrdersNav")

let allclassesdiv=document.getElementById("allclassediv")
let allusersdiv=document.getElementById("allusersdiv")
let allordersdiv=document.getElementById("allordersdiv")


allusersdiv.style.display="none";
allordersdiv.style.display="none";

// Toggle Visibility of divs
allClassesNav.addEventListener("click",()=>{
    allclassesdiv.style.display="block";
    allusersdiv.style.display="none";
    allordersdiv.style.display="none";
})
allUsersNav.addEventListener("click",()=>{
    allusersdiv.style.display="block";
    allclassesdiv.style.display="none";
    allordersdiv.style.display="none";
})
allOrdersNav.addEventListener("click",()=>{
    allordersdiv.style.display="block";
    allusersdiv.style.display="none";
    allclassesdiv.style.display="none";
})

let allclassescard=document.getElementById("allclassescard")
let alluserscard=document.getElementById("alluserscard")
let allorderscard=document.getElementById("allorderscard")

function renderAllUsersData(data){
    let allData=data
    // console.log(data)
    alluserscard.innerHTML=""
    let map_allData=allData.map(elem=>{
        return` <div class="classcard">
                    
        <div class="imgandins">
                <div class="imgclassdiv">
                    <img src=${renderTrainerProfile()} alt=${elem.name} class="classimages">
                     <a class="singleclasslink" >${elem.name}</a>
                    
                </div>
                <div class=insnameandmode>
                    <p><b>Role: </b>${elem.role}</p>
                    <p><b>Country: </b>${elem.country}</p> 
                </div>
        </div>
        <div class="actandseat">
                <div style="margin-left:-70px">
                    <p><b>User ID: </b>${elem._id}</p>
                    <p><b>User Email: </b>${elem.email}</p>   
                </div>
                <div>
                    <p><b>No of class enrolled in: </b>${elem.classes.length}</p>
                    <p><b>User active since: </b>${elem.createdDate}</p>
                </div>
        </div>
        <div class="joinclassdiv">
            <button class="joinclassbutton" data-id=${elem._id}>View User Details</button>
        </div>
    </div><hr>`
    })
    alluserscard.innerHTML=map_allData.join("")

}

function renderAllOrdersData(data){
    let allData=data
    // console.log(data)
    allorderscard.innerHTML=""
    let map_allData=allData.map(elem=>{
        return` <div class="classcard">
                    
        <div class="imgandins">
                <div class="imgclassdiv">
                    <img src=${renderTrainerProfile()} alt=${elem.name} class="classimages">
                     <a class="singleclasslink" >${elem._id.substring(8)}</a>
                    
                </div>
                <div class=insnameandmode>
                    <p><b>Order Date: </b>${elem.createdDate}</p>
                    <p><b>Order Time: </b>${elem.createdTime}</p> 
                </div>
        </div>
        <div class="actandseat">
                <div style="margin-left:-70px">
                    <p><b>Order ID: </b>${elem._id}</p>
                    <p><b>User ID: </b>${elem.userID}</p>
                    <p><b>class  ID: </b>${elem.classID}</p>  
                </div>
                <div>
                    <p><b>Order Date: </b>${elem.selectedDate_Time.split("T")[0]}</p>
                    <p><b>Order Time: </b>${elem.selectedDate_Time.split("T")[1]}</p>
                </div>
        </div>
        <div class="joinclassdiv">
            <button class="joinclassbutton" data-id=${elem._id}>View Order Details</button>
        </div>
    </div><hr>`
    })
    allorderscard.innerHTML=map_allData.join("")

}


function renderAllData(data){
    let allData=data
    // console.log(data)
    allclassescard.innerHTML=""
    let map_allData=allData.map(elem=>{
        return` <div class="classcard">
                    
        <div class="imgandins">
                <div class="imgclassdiv">
                    <img src=${renderImages(elem.activity)} alt=${elem.activity} class="classimages">
                     <a href=./classDetails.html?id=${elem._id} class="singleclasslink" >${elem.title}</a>
                    
                </div>
                <div class=insnameandmode>
                    <p>${elem.activity}</p>
                    <p>${checkvenue(elem.venue,elem.locationOrLink)}</p>
                </div>
        </div>
        <div class="actandseat">
                <div>
                    <p>${elem.classDate}</p>
                    <p>${elem.classTime}</p>
                </div>
                <div>${elem.seatOccupied}/${elem.seatTotal}</p>
                    <p>${elem.price}₹</p>
                </div>
        </div>
        <div class="joinclassdiv">
            <button class="joinclassbutton" data-id=${elem._id}>View Class Details</button>
        </div>
    </div><hr>`
    })
    allclassescard.innerHTML=map_allData.join("")

    let joicClassbtn=document.querySelectorAll('.joinclassbutton')
   joicClassbtn.forEach(elem=>{
    elem.addEventListener('click',(event)=>{
        let id = event.target.dataset.id;
        window.location.assign(`./classDetails.html?id=${id}    `)
    })
   })
}



function checkvenue(venue,locationOrLink){
   if(venue==="online"){
    return 'Online-via Zoom'
   }else{
    return `Venue - At ${locationOrLink}`
   }
}

let searchbar=document.getElementById("searchBox")
searchbar.addEventListener('input',(event)=>{
   let searchdata=searchalldata(event)
  renderAllData(searchdata)
})

function searchalldata(event){
    let searchdata=event.target.value
    // console.log(newData)
   let temp=newData.filter(function(elem){
    let ans=elem.locationOrLink.toLowerCase().includes(searchdata.toLowerCase())||elem.title.toLowerCase().includes(searchdata.toLowerCase())||elem.activity.toLowerCase().includes(searchdata.toLowerCase())||elem.venue.toLowerCase().includes(searchdata.toLowerCase())
    return ans;
  })
return temp;
}

let activitiname=document.getElementById('acttype')
activitiname.addEventListener("change",(event)=>{
    let searchactivity=searchactivityfun(event.target.value)
    if(searchactivity){
       return renderAllData(searchactivity)
    }else{
        allclassescard.innerHTML=`<h2>Data Not Found</h3>`
    }
})

function searchactivityfun(activity){
   if(activity=="all"){
    getAllClass()
   }else{
    let temp=newData.filter(function(elem){
        let ans=elem.activity.toLowerCase().includes(activity.toLowerCase())||elem.venue.toLowerCase().includes(activity.toLowerCase())
        return ans
    })
    return temp;
   }
}

let attendacesearch=document.getElementById('atttype')
attendacesearch.addEventListener("change",(event)=>{
    let searchattendace=searchactivityfun(event.target.value)
    if(searchattendace){
     renderAllData(searchattendace) 
    }else{
        allclassescard.innerHTML=`<h2>Data Not Found</h3>`
    }
})

let pricecomp=document.getElementById('location')
pricecomp.addEventListener("change",(event)=>{
    let searchlocation=event.target.value
    if(searchlocation=="low"){
        let lowtohigh=newData.sort(function(a,b){
            return a.price - b.price
        })
     renderAllData(lowtohigh)
    }else if(searchlocation=="high"){
        let lowtohigh=newData.sort(function(a,b){
            return b.price - a.price
        })
         renderAllData(lowtohigh)
    }else{
        getAllClass()
    }
})


function renderImages(actname){
    let allImagesData={
        yoga:["../Images/Classes_Images/yoga1.jpg","../Images/Classes_Images/yoga2.jpg","../Images/Classes_Images/yoga3.jpg"],
        cardio:["../Images/Classes_Images/boxing1.jpg","../Images/Classes_Images/aerobics2.jpg","../Images/Classes_Images/crossfit1.jpg"],
        swimming:["../Images/Classes_Images/swimming1.jpg","../Images/Classes_Images/swimming2.jpg","../Images/Classes_Images/swimming3.jpg"],
        running:["../Images/Classes_Images/football1.jpg","../Images/Classes_Images/football2.jpg","../Images/Classes_Images/football3.jpg"],
        zumba:["../Images/Classes_Images/zumba1.jpg","../Images/Classes_Images/zumba2.jpg","../Images/Classes_Images/zumba3.jpg"],
        aerobics:["../Images/Classes_Images/aerobics1.jpg","../Images/Classes_Images/aerobics2.jpg","../Images/Classes_Images/aerobics3.jpg"],
        ballet:["../Images/Classes_Images/ballet1.jpg","../Images/Classes_Images/ballet2.jpg","../Images/Classes_Images/ballet3.jpg"],
        basketball:["../Images/Classes_Images/basketball1.jpg","../Images/Classes_Images/basketball2.jpg","../Images/Classes_Images/basketball3.jpg"],
        boxing:["../Images/Classes_Images/boxing1.jpg","../Images/Classes_Images/boxing3.jpg","../Images/Classes_Images/boxing2.jpg"],
        crossfit:["../Images/Classes_Images/crossfit1.jpg","../Images/Classes_Images/crossfit3.jpg","../Images/Classes_Images/crossfit2.jpg"],
        cycling:["../Images/Classes_Images/cycling1.jpg","../Images/Classes_Images/cycling2.jpg","../Images/Classes_Images/cycling3.jpg"],
        football:["../Images/Classes_Images/football1.jpg","../Images/Classes_Images/football2.jpg","../Images/Classes_Images/football3.jpg"],
        kickboxing:["../Images/Classes_Images/kickboxing1.jpg","../Images/Classes_Images/kickboxing2.jpg","../Images/Classes_Images/kickboxing3.jpg"],
        singing:["../Images/Classes_Images/singing1.jpg","../Images/Classes_Images/singing3.jpg","../Images/Classes_Images/singing2.jpg"],
        weighttraining:["../Images/Classes_Images/weighttraining1.jpg","../Images/Classes_Images/weighttraining2.jpg","../Images/Classes_Images/weighttraining3.jpg"],
        dance:["../Images/Classes_Images/dance1.jpg","../Images/Classes_Images/dance2.jpg","../Images/Classes_Images/dance3.jpg"]
    }
    let newactname=actname.toLowerCase()
    let name=allImagesData[`${newactname}`]
    
    let imgLink=getRandomItem(name)
   return(imgLink)
}

function getRandomItem(arr) {
   let randomIndex = Math.floor(Math.random() * 2);
   let item = arr[randomIndex];
  return item;
}

function renderTrainerProfile(){
    let prfileImg=["../Images/Profile_Images/1680420864318.png","../Images/Profile_Images/1680420887007.png","../Images/Profile_Images/1680420927232.png","../Images/Profile_Images/1680420953188.png","../Images/Profile_Images/1680420980976.png","../Images/Profile_Images/1680421002568.png","../Images/Profile_Images/1680421096922.png"]

    let imgLink=getRandomItem(prfileImg)
    return imgLink
}
