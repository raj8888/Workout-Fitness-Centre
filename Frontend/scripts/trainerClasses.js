
import baseURL from "./baseURL.js"

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
if(!loggedInUser){    
    window.location.assign("/frontend/pages/login.html");
}
let loggedInUserEmail = loggedInUser.email;

getAllClass()

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
               let getTrainerInfo=JSON.parse(sessionStorage.getItem("loggedInUser"))
              let trainerID=getTrainerInfo._id
              let trainerClasses=findClass(res.classes,trainerID)
              renderAllData(trainerClasses)
            })
          }else{
        //    alert("Classes Not Fetched")
          }
          } catch (error) {
        //    alert("Server not responding");
           console.log(error.message)
          }
}
let allclassescard=document.getElementById("allcallesdiv")

function renderAllData(data){
    if(data.length<=0){
        allclassescard.innerHTML=`
        <p>Class not created yet</p>
        `
    }else{
    let allData=data
    // allclassescard.innerHTML=""
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
            <button class="joinclassbutton" data-id=${elem._id}>Delete Class</button>
        </div>
    </div><hr>`
    })
    allclassescard.innerHTML=map_allData.join("")
    
    let deletclass=document.querySelectorAll('.joinclassbutton')
    deletclass.forEach(elem=>{
        elem.addEventListener('click',(event)=>{
            let classid=event.target.dataset.id
            deleteClass(classid)
        })
    })
}
}

async function deleteClass(classid){
    try {
        let data=await fetch(baseURL+`/class/delete/${classid}`,{
            method:"DELETE",
            headers:{   
                authorization:`Bearer ${loggedInUserEmail}`
            }
        })
        if(data.ok){
            // alert("Class Deleted Successfully")
            swal({text: "Class Deleted Successfully", icon: "success", button: "ok", timer:1000})
            getAllClass()
        }else{
            // alert("Class not deleted")
            swal({text: "Class not deleted", icon: "error", button: "ok", timer:1000})
        }
    } catch (error) {
        // alert("Server not responding");
        swal({text: "Server not responding", icon: "error", button: "ok", timer:1000})
        console.log(error.message)
    }
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
    let newactname=actname.toLowerCase()
    let name=allImagesData[`${newactname}`]
    let imgLink=getRandomItem(name)
   return(imgLink)
}

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}

function findClass(arr,id){
    
    let allClass=arr.filter(elem=>{
        if(elem.trainerID==id){
            return elem
        }
    })
    return allClass
}