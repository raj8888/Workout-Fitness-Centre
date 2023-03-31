import baseURL from "./baseURL.js"

let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
if(!loggedInUser){    
    window.location.assign("/frontend/pages/login.html");
}
let loggedInUserEmail = loggedInUser.email;

const urlParams = new URLSearchParams(window.location.search)
const classId = urlParams.get("id")
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
                alert("Trainer Not Fetched")
            }
    } catch (error) {
           console.log(error)
    }
}

let mainDiv=document.getElementById('renderallinfo')

async function  renderAllData(classes,trainerInfo){
    console.log(classes,trainerInfo)
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
                   <h4>Link/Location :</h4>
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
                   <h4>${classes.locationOrLink}</h4>
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
}


function renderTrainerProfile(){
    let prfileImg=["https://images.pexels.com/photos/733500/pexels-photo-733500.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/8173423/pexels-photo-8173423.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/38630/bodybuilder-weight-training-stress-38630.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/6975795/pexels-photo-6975795.jpeg?auto=compress&cs=tinysrgb&w=600",'https://images.pexels.com/photos/1978505/pexels-photo-1978505.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/2105493/pexels-photo-2105493.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/6551136/pexels-photo-6551136.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/9283300/pexels-photo-9283300.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/2085739/pexels-photo-2085739.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/207693/pexels-photo-207693.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg?auto=compress&cs=tinysrgb&w=600']

    let imgLink=getRandomItem(prfileImg)
    return imgLink
}

function rendermode(mode){
    mode=mode.toLowerCase()
    if(mode=="online"){
        return 'https://beta.classfit.com/images/zoom-img-cover.png'
    }else{
        return `https://e7.pngegg.com/pngimages/992/203/png-clipart-internet-t-shirt-9gag-online-and-offline-humour-t-shirt-text-logo.png`
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
        weighttraining:["https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1886487/pexels-photo-1886487.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600"]
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
        weighttraining:"Weight training is an important part of any fitness program. Combined with aerobic exercise, weight training can increase your strength and muscle tone, increase muscle mass, improve your bone density, help maintain weight, and help you lose fat."
    }
    activity=activity.toLowerCase()
    let desc=obj[`${activity}`]
    return desc
}