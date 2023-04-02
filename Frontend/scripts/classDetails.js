import baseURL from "./baseURL.js"

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
if(!loggedInUser){    
    window.location.assign("/frontend/pages/login.html");
}
let loggedInUserEmail = loggedInUser.email;


const urlParams = new URLSearchParams(window.location.search)
const classId = urlParams.get("id")


function toggleClassLinkVisibility(){
    if(!loggedInUser.classes.includes(classId)) {
        // linkH4Value
        document.getElementById("linkH4Value").innerText="Class not booked yet.";
        // document.getElementById("linkH4Key").style.display="none";
    }
}

getAllClass(classId)
async function getAllClass(classId){
    try{
     let dataFetch=await fetch(`${baseURL}/class/${classId}`,{
        headers:{
            authorization:`Bearer ${loggedInUserEmail}`
        }
    })
    if(dataFetch.ok){
        let temp=dataFetch.json()
        .then(res=>{
           let trainerID=res.classes.trainerID
           let trainerInfo=getTrainer(trainerID)
           trainerInfo.then((temp)=>{renderAllData(res.classes,temp)})
        })
       }else{
        alert("Classes Not Fetched")
        swal({text: "Classes Not Fetched", icon: "error", button: "ok", timer:1000})        
       }    
       } catch (error) {
        console.log(error)
       }
}

async function getTrainer(trainerID){
    try{
        let dataFetch=await fetch(`${baseURL}/user/${trainerID}`,{
           headers:{
               authorization:`Bearer ${loggedInUserEmail}`
           }
       })
            if(dataFetch.ok){
                let temp= await dataFetch.json()
               return (temp.user)
            }else{
                // alert("Trainer Not Fetched")       
                swal({text: "Trainer Not Fetched", icon: "error", button: "ok", timer:1000})
            }
    } catch (error) {
           console.log(error)
    }
}

let mainDiv=document.getElementById('renderallinfo')

async function  renderAllData(classes,trainerInfo){
    // console.log(classes,trainerInfo)
   mainDiv.innerHTML=`
   <img src=${renderImages(classes.activity)} alt="" id="activityimg">

   <div id="classalldesc">
      <div id="imgandjoinbtn">
       <div id="descimg">
           <img src="https://classfit-assets-live.s3.amazonaws.com/backup/images/upload/ply/f58349d961a4faa8a6190157fe35b14d.jpg" alt="" id="trainerimg">
       </div>
       <div id="descjoin">
           <button id="joinclassdesc" data-id=${classes._id}>Join Class</button>
       </div>
      </div>
       <div id="descdesc">
           <p>${rederActDesc(classes.activity)}</p>
       </div>
   </div>

   <div id="infoall">
       <div id="infoclass">
           <h3 id="classdetailid">Class Details</h3>
           <div id="onlyclassinfo">
               <div id="classheads">
                   <h4>Name :</h4>
                   <h4>Activity :</h4>
                   <h4>Date :</h4>
                   <h4>Time :</h4>
                   <h4>Mode:</h4>
                   <h4 id="linkH4Key">Link/Location :</h4>
                   <h4>Duration:</h4>
                   <h4>Total Seats :</h4>
                   <h4>Seats Occupied :</h4>
               </div>
               <div id="classinfos">
                   <h4>${classes.title}</h4>
                   <h4>${classes.activity}</h4>
                   <h4>${classes.classDate}</h4>
                   <h4>${classes.classTime}</h4>
                   <h4>${classes.venue}</h4>
                   <h4 id="linkH4Value">${classes.locationOrLink}</h4>
                   <h4>${classes.duration}</h4>
                   <h4>${classes.seatTotal}</h4>
                   <h4>${classes.seatOccupied}</h4>
               </div>
           </div>
       </div>
       <div id="infomode">
           <h3 id="modetitle">Mode of Class</h3>
           <img src=${rendermode(classes.venue)} alt="" id="modeimg">
       </div>
       <div id="infotrainer">
           <h3 id="tainertitle" >Trainer Information</h3>
           <div id="trainermaininfo">
               <img src=${renderTrainerProfile()} alt="" id="trainerimg">
               <div id="trainerdetails">
                   <div id="trainerhead">
                       <h4>Trainer:</h4>
                       <h4>Coutry:</h4>
                       <h4>Contact:</h4>
                       <h4>Email:</h4>
                   </div>
                   <div id="trainerheadinfo">
                       <h4>${trainerInfo.name}</h4>
                       <h4>${trainerInfo.country}</h4>
                       <h4>${trainerInfo.phone?trainerInfo.phone:"Not Provided"}</h4>
                       <h4>${trainerInfo.email}</h4>
                   </div>
               </div>
           </div>
       </div>

   </div>
   `

   let joinbtn=document.querySelector('#joinclassdesc')

    joinbtn.addEventListener('click',(event)=>{
    let id = event.target.dataset.id;
    window.location.assign(`./bookClass.html?id=${id}`)
    })
    toggleClassLinkVisibility()
}


function renderTrainerProfile(){
    let prfileImg=["https://images.pexels.com/photos/733500/pexels-photo-733500.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/8173423/pexels-photo-8173423.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/38630/bodybuilder-weight-training-stress-38630.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/6975795/pexels-photo-6975795.jpeg?auto=compress&cs=tinysrgb&w=600",'https://images.pexels.com/photos/1978505/pexels-photo-1978505.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/2105493/pexels-photo-2105493.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/6551136/pexels-photo-6551136.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/9283300/pexels-photo-9283300.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/2085739/pexels-photo-2085739.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/207693/pexels-photo-207693.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg?auto=compress&cs=tinysrgb&w=600']

    let imgLink=getRandomItem(prfileImg)
    return imgLink
}

function rendermode(mode){
    mode=mode.toLowerCase()
    if(mode=="online"){
        return 'https://img.freepik.com/free-vector/flat-design-online-yoga-class_23-2148533685.jpg?w=740&t=st=1680414651~exp=1680415251~hmac=a791e4c418b3b87a3c821274b4fd5e98ae8bfc2d8176b40799a2826cd4123ca6https://img.freepik.com/free-vector/flat-design-online-yoga-class_23-2148533685.jpg?w=740&t=st=1680414651~exp=1680415251~hmac=a791e4c418b3b87a3c821274b4fd5e98ae8bfc2d8176b40799a2826cd4123ca6'
        // return 'https://img.freepik.com/free-vector/hand-drawn-online-yoga-class-concept_23-2148563475.jpg?w=740&t=st=1680414196~exp=1680414796~hmac=13a91aae4059df3bf5e76c9b55b4bd885aa21c7503f9225439c450615ff0481a'
        // return 'https://img.freepik.com/free-vector/flat-design-online-yoga-class-style_23-2148549504.jpg?w=740&t=st=1680414576~exp=1680415176~hmac=1e9847c8f673dc0edf5d0ad6c24cf364830518e86dec7bdb71dd1dd56d575ca4'
        // return 'https://beta.classfit.com/images/zoom-img-cover.png'
    }else{
        return `https://img.freepik.com/free-vector/pregnant-women-doing-exercises-with-big-ball-cartoon-illustration_74855-14492.jpg?w=740&t=st=1680414881~exp=1680415481~hmac=ad34b4302c74a73603a5534be8a88d00b0ec9e2c6633babb1d4a3318868db729`
        // return `https://e7.pngegg.com/pngimages/992/203/png-clipart-internet-t-shirt-9gag-online-and-offline-humour-t-shirt-text-logo.png`
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

function rederActDesc(activity){
    let obj={
        yoga:"Yoga is an accessible form of exercise that benefits physical and mental health. Most people are able to start with beginner yoga poses from the comfort of their own home. In addition to improving flexibility, strength, and balance, yoga can also reduce stress levels and aid in weight management.",
        cardio:"Cardiovascular exercise is any vigorous activity that increases heart rate and respiration and raises oxygen and blood flow throughout the body while using large muscle groups of the body repetitively and rhythmically.",
        swimming:"Swimming is a great workout because you need to move your whole body against the resistance of the water. Swimming is a good all-round activity because it: keeps your heart rate up but takes some of the impact stress off your body.",
        running:"Running is a method of terrestrial locomotion allowing humans and other animals to move rapidly on foot. Running is a type of gait characterized by an aerial phase in which all feet are above the ground.",
        zumba:"Zumba is a powerful exercise with a 600 to 1,000-calorie burn in just an hour. Tones your entire body. You may feel sore in places you never knew existed, but it gets results. Zumba targets lots of different muscle groups at once for total body toning.",
        aerobics:"What is aerobic exercise? Aerobic exercise provides cardiovascular conditioning. The term aerobic actually means 'with oxygen,' which means that breathing controls the amount of oxygen that can make it to the muscles to help them burn fuel and move.",
        ballet:"Barre and Stretch VIRTUAL is a hybrid of pilates, stretch, strength and core training .High reps  and low weights. No Impact . Light weights, towel and ,mat required",
        basketball:"While not renowned as an aerobic sport, it is still a great workout that can help you: burn calories (an hour of basketball can burn 630–750 calories) build endurance. improve balance and coordination.",
        boxing:"Boxing requires speed, agility, strength, power, and cardiovascular fitness. The focus of strength training workouts is usually on improving coordination, power, and speed of force development rather than on building muscle mass and gaining size.",
        crossfit:"A form of high intensity interval training, CrossFit is a strength and conditioning workout that is made up of functional movement performed at a high intensity level. These movements are actions that you perform in your day-to-day life, like squatting, pulling, pushing etc.",
        cycling:"Cycling is mainly an aerobic activity, which means that your heart, blood vessels and lungs all get a workout. You will breathe deeper, perspire and experience increased body temperature, which will improve your overall fitness level. ",
        football:"Playing football is equivalent to muscular strength exercises (anaerobic) such as running at high speed and lifting weights. As these types of exercises help to burn body fat as much as possible, the risk of heart disease and the accumulation of fat in the blood vessels are eliminated.",
        kickboxing:"Just like other cardio workouts, kickboxing offers all the benefits of a high-intensity routine, including better coordination, mobility and strength. You'll not only knock your muscles into high gear, but you'll squash the stress of the day.",
        singing:"By exercising your voice beforehand, you may be able to strengthen your speaking or singing voice. Warm up your voice by breathing deeply, moving your tongue around and pretending to chew. To strengthen your speaking or singing voice, trill your lips and practice saying tongue twisters.",
        weighttraining:"Weight training is an important part of any fitness program. Combined with aerobic exercise, weight training can increase your strength and muscle tone, increase muscle mass, improve your bone density, help maintain weight, and help you lose fat.",
        dance:"Zumba is a powerful exercise with a 600 to 1,000-calorie burn in just an hour. Tones your entire body. You may feel sore in places you never knew existed, but it gets results. Zumba targets lots of different muscle groups at once for total body toning."
        
    }
    activity=activity.toLowerCase()
    let desc=obj[`${activity}`]
    return desc
}