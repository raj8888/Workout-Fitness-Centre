
getAllClass()
let newData;
async function getAllClass(){
    try{
     let dataFetch=await fetch("http://localhost:4500/class/all",{
        headers:{
            authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDI1OTdkZWIzN2ViMjkyMjcxYTg0NDciLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjgwMTg1MzE3LCJleHAiOjE2ODA3OTAxMTd9.TWO_WHEZ27A4Vpx0t9XJovW13yV_2xaimWfRtf6QxwM`
        }
    })
    if(dataFetch.ok){
        let temp=dataFetch.json()
        .then(res=>{
            newData=res.classes
            renderAllData(res.classes)})
       }else{
        alert("Classes Not Fetched")
       }
       } catch (error) {
        console.log(error)
       }
}


let allclassescard=document.getElementById("allclassescard")
function renderAllData(data){
    let allData=data
    // console.log(allData)
    allclassescard.innerHTML=""
    let map_allData=allData.map(elem=>{
        return` <div class="classcard">
                    
        <div class="imgandins">
                <div class="imgclassdiv">
                    <img src=${elem.image} alt=${elem.activity} class="classimages">
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
            <button class="joinclassbutton" data-id=${elem._id}>Join Class</button>
        </div>
    </div><hr>`
    })
    allclassescard.innerHTML=map_allData.join("")
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

async function getTrainerInfo(){

}