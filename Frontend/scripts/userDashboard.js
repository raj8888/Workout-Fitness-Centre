import baseURL from "./baseURL.js"

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
if(!loggedInUser){    
    window.location.assign("/frontend/pages/login.html");
}
let loggedInUserEmail = loggedInUser.email;
// console.log(loggedInUser)


let totallength;
getClasslength(loggedInUser._id)
async function getClasslength(id){
    try {
        let fetchingData=await fetch(baseURL+`/class/searchByUserID/${id}`,{
            method:"GET",
            headers:{   
                authorization:`Bearer ${loggedInUserEmail}`
            }
        })
        let temp= await fetchingData.json()
        if(fetchingData.ok){
           totallength=temp.classes.length
           renderUserInfo(totallength)
        }else{
            console.log(temp)
            alert(fetchingData.message)
        }
    } catch (error) {
        alert('Server Error')
        console.log(error.message)
    }

}

let allclientinfo=document.getElementById("clientinfo")

function renderUserInfo(totallength){
allclientinfo.innerHTML=''
allclientinfo.innerHTML=`<div id="clientname">
<div id="profimgdiv">
    <img src=${renderProfileImg()} alt="" id="profileimg">
</div>
<div id="clientnamediv">
    <p>Hi, ${loggedInUser.name}</p>
    <p>Welcome back - Let's get Started! </p>
</div>
</div>
<div id="clineclass">
 <div id="notclassdiv">
   ${renderTotalClass(totallength)}
</div> 
</div>`
}


function renderTotalClass(count){
if(count<=0){
return ` <p class="notclassrender">You didn't join any class.</p>
<p class="notclassrender">For join class <a id='searchanc' href="./userSearchClass.html">click here.</a></p>`
}else{
    return `<div id="notclassdiv">
    <p class="notclassrender">Total classes joind by you is ${count}.</p>
<p class="notclassrender">For join more class <a id='searchanc' href="./userSearchClass.html">click here.</a></p>
</div>`
}
}




getClass(loggedInUser._id)
async function getClass(id){
    try {
        let fetchingData=await fetch(baseURL+`/class/searchByUserID/${id}`,{
            method:"GET",
            headers:{   
                authorization:`Bearer ${loggedInUserEmail}`
            }
        })
        let temp= await fetchingData.json()
        if(fetchingData.ok){
            // console.log(temp)
            renderderAllData(temp.classes)
        }else{
            console.log(temp)
            alert(fetchingData.message)
        }
    } catch (error) {
        alert('Server Error')
        console.log(error.message)
    }

}



let divForRender=document.getElementById("allclassescard")

async function renderderAllData(allData){
    // console.log(allData)
    divForRender.innerHTML=""
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
            <button class="joinclassbutton" data-id=${elem._id}>Class Details</button>
        </div>
    </div><hr>`
    })
    divForRender.innerHTML=map_allData.join("")

    let joicClassbtn=document.querySelectorAll('.joinclassbutton')
    joicClassbtn.forEach(elem=>{
     elem.addEventListener('click',(event)=>{
         let id = event.target.dataset.id;
         window.location.assign(`./classDetails.html?id=${id}`)
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

 
function renderImages(actname){
    let allImagesData={
        yoga:["https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/5384538/pexels-photo-5384538.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/6698513/pexels-photo-6698513.jpeg?auto=compress&cs=tinysrgb&w=600"],
        cardio:["https://images.pexels.com/photos/3764011/pexels-photo-3764011.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/853247/pexels-photo-853247.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/853247/pexels-photo-853247.jpeg?auto=compress&cs=tinysrgb&w=600"],
        swimming:["https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/73760/swimming-swimmer-female-race-73760.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/260598/pexels-photo-260598.jpeg?auto=compress&cs=tinysrgb&w=600"],
        running:["https://images.pexels.com/photos/3621183/pexels-photo-3621183.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/5038818/pexels-photo-5038818.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4719931/pexels-photo-4719931.jpeg?auto=compress&cs=tinysrgb&w=600"],
        zumba:["https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4090009/pexels-photo-4090009.jpeg?auto=compress&cs=tinysrgb&w=600","https://media.istockphoto.com/id/535496960/photo/fit-young-women-dancing-and-exercising.jpg?b=1&s=612x612&w=0&k=20&c=uKsgbASv7eOmkp3CZUersB7wAO53Xcp58TEjJzr96Kw="],
        aerobics:["https://images.pexels.com/photos/863926/pexels-photo-863926.jpeg?auto=compress&cs=tinysrgb&w=1600","https://images.pexels.com/photos/866021/pexels-photo-866021.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/903171/pexels-photo-903171.jpeg?auto=compress&cs=tinysrgb&w=1600"],
        ballet:["https://images.pexels.com/photos/358010/pexels-photo-358010.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/46158/ballet-ballerina-performance-don-quixote-46158.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/209948/pexels-photo-209948.jpeg?auto=compress&cs=tinysrgb&w=600"],
        basketball:["https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1080884/pexels-photo-1080884.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg?auto=compress&cs=tinysrgb&w=600"],
        boxing:["https://images.pexels.com/photos/4761792/pexels-photo-4761792.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4754146/pexels-photo-4754146.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4761671/pexels-photo-4761671.jpeg?auto=compress&cs=tinysrgb&w=600"],
        crossfit:["https://images.pexels.com/photos/28080/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/116079/pexels-photo-116079.jpeg?auto=compress&cs=tinysrgb&w=600"],
        cycling:["https://images.pexels.com/photos/2158963/pexels-photo-2158963.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/5312233/pexels-photo-5312233.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/5807576/pexels-photo-5807576.jpeg?auto=compress&cs=tinysrgb&w=600"],
        football:["https://images.pexels.com/photos/918798/pexels-photo-918798.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/3148452/pexels-photo-3148452.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/3041176/pexels-photo-3041176.jpeg?auto=compress&cs=tinysrgb&w=600"],
        kickboxing:["https://images.pexels.com/photos/598686/pexels-photo-598686.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/9302141/pexels-photo-9302141.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4804077/pexels-photo-4804077.jpeg?auto=compress&cs=tinysrgb&w=600"],
        singing:["https://images.pexels.com/photos/236149/pexels-photo-236149.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/3388899/pexels-photo-3388899.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1456642/pexels-photo-1456642.jpeg?auto=compress&cs=tinysrgb&w=600"],
        weighttraining:["https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1886487/pexels-photo-1886487.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600"],
        dance:["https://images.pexels.com/photos/358010/pexels-photo-358010.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/46158/ballet-ballerina-performance-don-quixote-46158.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/209948/pexels-photo-209948.jpeg?auto=compress&cs=tinysrgb&w=600"]
    }
    let newactname=actname.toLowerCase()
    let name=allImagesData[`${newactname}`]
    
    let imgLink=getRandomItem(name)
   return(imgLink)
}

function getRandomItem(arr) {
   let randomIndex = Math.floor(Math.random() * arr.length);
   let item = arr[randomIndex];
  return item;
}

function renderProfileImg(){
    let arr=["https://images.pexels.com/photos/10929340/pexels-photo-10929340.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/5094997/pexels-photo-5094997.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4401806/pexels-photo-4401806.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/16015725/pexels-photo-16015725.jpeg?auto=compress&cs=tinysrgb&w=600"]

   let imgLink= getRandomItem(arr)
   return imgLink
}