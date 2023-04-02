import baseURL from "./baseURL.js"

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
if(!loggedInUser){    
    window.location.assign("/frontend/pages/login.html");
}
let loggedInUserEmail = loggedInUser.email;

getAllClass();
let newData;
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


let allclassescard=document.getElementById("allclassescard")
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
            <button class="joinclassbutton" data-id=${elem._id}>Join Class</button>
        </div>
    </div><hr>`
    })
    allclassescard.innerHTML=map_allData.join("")

    let joicClassbtn=document.querySelectorAll('.joinclassbutton')
   joicClassbtn.forEach(elem=>{
    elem.addEventListener('click',(event)=>{
        let id = event.target.dataset.id;
        window.location.assign(`./bookClass.html?id=${id}`)
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
        yoga:["https://drive.google.com/file/d/1emSUc95Ms33BvWx2-8Wu8I_4QmHEsufb/view?usp=share_link","https://drive.google.com/file/d/14zFIuQZPW8uA6MT-FCB7FOv6_ImgjHoS/view?usp=share_link","https://drive.google.com/file/d/1cRgRZLeUYjWUwcdnzOP9ydVo2J4un4LF/view?usp=share_link"],
        cardio:["https://drive.google.com/file/d/1Sxm8c777LPUeew6wCsK8k5bBIAdH6Z0G/view?usp=sharing","https://drive.google.com/file/d/1GVnmFNE9Qxm3as19WFRXje5Kxvwe221F/view?usp=share_link","https://drive.google.com/file/d/19-9Sx1H2VBXtfntVa-Vxaw_8JV5fepgk/view?usp=share_link"],
        swimming:["https://drive.google.com/file/d/1J_VVjXaroZdH3RAAl_RB6YjvZz-Mnb9S/view?usp=share_link","https://drive.google.com/file/d/1QWfk32ZntKUnYbwyYIiKQnXZ16h_4DTB/view?usp=share_link","https://drive.google.com/file/d/1wBZDtqXwtmFQ6RkgGj2iEak7WviJrpkL/view?usp=share_link"],
        running:["https://drive.google.com/file/d/19-9Sx1H2VBXtfntVa-Vxaw_8JV5fepgk/view?usp=share_link","https://drive.google.com/file/d/161Al8gMQ4EV_CHZXYXM-BaG73KeIM7oq/view?usp=share_link","https://drive.google.com/file/d/1czhS-gADet-u0IOyBOsu6w46ddOEGVXe/view?usp=share_link"],
        zumba:["https://drive.google.com/file/d/1ZbNhZGjLZKjiRQ4lJxs_mlml_g0rRB5r/view?usp=share_link","https://drive.google.com/file/d/1P8XcLdd8FP2s4CCeBqxMvQcBKjvRS8dB/view?usp=share_link","https://drive.google.com/file/d/1pA3n8ne4E1rpzHCaQdVHod6IH0_soVvV/view?usp=share_link"],
        aerobics:["https://drive.google.com/file/d/1Sxm8c777LPUeew6wCsK8k5bBIAdH6Z0G/view?usp=sharing","https://drive.google.com/file/d/1t6e-571wbWMl6hhLCCezW0xwBvbN5JYv/view?usp=share_link","https://drive.google.com/file/d/1dhGXOggX3vr_GfiExwoSxOrH55WnUshp/view?usp=share_link"],
        ballet:["https://drive.google.com/file/d/1DLyCal_5GOTZkem9TdyVn6KerT-kT_QN/view?usp=share_link","https://drive.google.com/file/d/1wN4Xf027201YvUTSA6jybIhL7arW79AS/view?usp=share_link","https://drive.google.com/file/d/1jtS659fvSj9M_6xs3VA2Nkxbu4wgiTjV/view?usp=share_link"],
        basketball:["https://drive.google.com/file/d/1pxL1PBSwQ6LooLwt9KziOgwzBIJyXJcX/view?usp=share_link","https://drive.google.com/file/d/1EZi_1A7bIKaVXo09obhz0WIuU5h9Pr0n/view?usp=share_link","https://drive.google.com/file/d/1YUilB_3TzfbqKVKjnyrlEeUiu0aoCIgC/view?usp=share_link"],
        boxing:["https://drive.google.com/file/d/1GVnmFNE9Qxm3as19WFRXje5Kxvwe221F/view?usp=share_link","https://drive.google.com/file/d/1WEJn-NVWAXW512AqHlIzmyU0Tr_fleQP/view?usp=share_link","https://drive.google.com/file/d/1qKNYNtrTMv6WjR97zj3pBE0FMSwNtD0p/view?usp=share_link"],
        crossfit:["https://drive.google.com/file/d/1AAxdK2gsPqM-aS2BNwza9JGANtLwuIJ5/view?usp=share_link","https://drive.google.com/file/d/1Ctr7emvn2bk0Le8Qzulz9G9vajleihv0/view?usp=share_link","https://drive.google.com/file/d/1iFO_-NJCcxaABIgRyx4S3O-nDqQif5dP/view?usp=share_link"],
        cycling:["https://drive.google.com/file/d/1tFuPpiSG7epqu1V8V2ellUKmgjdq1iFL/view?usp=sharing","https://drive.google.com/file/d/16BWcKjQjagv9bBvN7tXlRNnsan3Z4k5J/view?usp=share_link","https://drive.google.com/file/d/16qdwJkb-9aZgwgsEHanmkaMRMjapBSlq/view?usp=share_link"],
        football:["https://drive.google.com/file/d/19-9Sx1H2VBXtfntVa-Vxaw_8JV5fepgk/view?usp=share_link","https://drive.google.com/file/d/161Al8gMQ4EV_CHZXYXM-BaG73KeIM7oq/view?usp=share_link","https://drive.google.com/file/d/1czhS-gADet-u0IOyBOsu6w46ddOEGVXe/view?usp=share_link"],
        kickboxing:["https://drive.google.com/file/d/1PASgPH_T777Ou1tJyJ_8KR2wkSprQ8GC/view?usp=share_link","https://drive.google.com/file/d/119TwDrzF_wwhnOsHvZXSVQiB_OnjPgiQ/view?usp=share_link","https://drive.google.com/file/d/19-9Sx1H2VBXtfntVa-Vxaw_8JV5fepgk/view?usp=share_link"],
        singing:["https://drive.google.com/file/d/1Cu6wEyAj0APBzc_hMnX26tCO5MEP2rBO/view?usp=share_link","https://drive.google.com/file/d/1vxj0FfeJQp1SExqIHhCUQI4qjPNYuM5B/view?usp=share_link","https://drive.google.com/file/d/1z4PNOF1oMGlga_qosyC1N8Jcza-8P_N3/view?usp=share_link"],
        weighttraining:["https://drive.google.com/file/d/1iorRCNQEc_iA7SsarxH-7GQdWl0xU9xG/view?usp=share_link","https://drive.google.com/file/d/1rvrvPus9EgND4pBneSECKERqCSSU2O8d/view?usp=share_link","https://drive.google.com/file/d/1BUPuwM9wrA_9li3YepB64Jk1Qycy03mI/view?usp=share_link"],
        dance:["https://drive.google.com/file/d/1h6xbZtit2_C_q452YgDj_lLvp_4ArFYD/view?usp=share_link","https://drive.google.com/file/d/1loxeLy8DLaGFKvgYU__h7fOOf-rz7RtQ/view?usp=share_link","https://drive.google.com/file/d/1loxeLy8DLaGFKvgYU__h7fOOf-rz7RtQ/view?usp=share_link"]
    }
    // let allImagesData={
    //     yoga:["https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/5384538/pexels-photo-5384538.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/6698513/pexels-photo-6698513.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     cardio:["https://images.pexels.com/photos/3764011/pexels-photo-3764011.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/853247/pexels-photo-853247.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/853247/pexels-photo-853247.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     swimming:["https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/73760/swimming-swimmer-female-race-73760.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/260598/pexels-photo-260598.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     running:["https://images.pexels.com/photos/3621183/pexels-photo-3621183.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/5038818/pexels-photo-5038818.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4719931/pexels-photo-4719931.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     zumba:["https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4090009/pexels-photo-4090009.jpeg?auto=compress&cs=tinysrgb&w=600","https://media.istockphoto.com/id/535496960/photo/fit-young-women-dancing-and-exercising.jpg?b=1&s=612x612&w=0&k=20&c=uKsgbASv7eOmkp3CZUersB7wAO53Xcp58TEjJzr96Kw="],
    //     aerobics:["https://images.pexels.com/photos/863926/pexels-photo-863926.jpeg?auto=compress&cs=tinysrgb&w=1600","https://images.pexels.com/photos/866021/pexels-photo-866021.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/903171/pexels-photo-903171.jpeg?auto=compress&cs=tinysrgb&w=1600"],
    //     ballet:["https://images.pexels.com/photos/358010/pexels-photo-358010.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/46158/ballet-ballerina-performance-don-quixote-46158.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/209948/pexels-photo-209948.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     basketball:["https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1080884/pexels-photo-1080884.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     boxing:["https://images.pexels.com/photos/4761792/pexels-photo-4761792.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4754146/pexels-photo-4754146.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4761671/pexels-photo-4761671.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     crossfit:["https://images.pexels.com/photos/28080/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/116079/pexels-photo-116079.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     cycling:["https://images.pexels.com/photos/2158963/pexels-photo-2158963.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/5312233/pexels-photo-5312233.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/5807576/pexels-photo-5807576.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     football:["https://images.pexels.com/photos/918798/pexels-photo-918798.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/3148452/pexels-photo-3148452.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/3041176/pexels-photo-3041176.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     kickboxing:["https://images.pexels.com/photos/598686/pexels-photo-598686.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/9302141/pexels-photo-9302141.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4804077/pexels-photo-4804077.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     singing:["https://images.pexels.com/photos/236149/pexels-photo-236149.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/3388899/pexels-photo-3388899.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1456642/pexels-photo-1456642.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     weighttraining:["https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1886487/pexels-photo-1886487.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600"],
    //     dance:["https://images.pexels.com/photos/358010/pexels-photo-358010.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/46158/ballet-ballerina-performance-don-quixote-46158.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/209948/pexels-photo-209948.jpeg?auto=compress&cs=tinysrgb&w=600"]
    // }
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