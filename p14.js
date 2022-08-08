const Outbox = document.querySelector(".outbox"),
Inputpart = Outbox.querySelector(".inputpart"),
Infotext = Inputpart.querySelector(".infotext"),
Inputfield = Inputpart.querySelector("input");
Locationbtn = Inputpart.querySelector("button"),
Icon = document.querySelector(".weatherpart img"),
Arrow = Outbox.querySelector("header i");

Inputfield.addEventListener("keyup", e=>{
    if(e.key=="Enter" && Inputfield.value!=""){
        // console.log("Hello");
        requestApi(Inputfield.value);
    }
});

let api;

Locationbtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else{
        alert("Your Browser does not support geolocation api");
    }
});

function onSuccess(position){
    // console.log(position);
    const {latitude, longitude} = position.coords;
    api =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=0546970edd2b1d3d3db59e3c555027e6`;
    fetchdata();
}

function onError(error){
    // console.log(error);
    Infotext.innerText = error.message;
    Infotext.classList.add("error");

}

function requestApi(city){
    api =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0546970edd2b1d3d3db59e3c555027e6`;
    fetchdata();
}

function fetchdata(){
    Infotext.innerText="Getting Weather Details..."
    Infotext.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));

}

function weatherDetails(info){
    Infotext.classList.replace("pending", "error");
    if(info.cod=="404"){

        Infotext.innerText=`${Inputfield.value} is not a valid city name`;
    }
    else{
        const city=info.name;
        const country= info.sys.country;
        const {description,id}=info.weather[0];
        const {feels_like, humidity, temp}=info.main;



        Outbox.querySelector(".temp .number").innerText=`${temp}°C`;
        Outbox.querySelector(".weather").innerText=description;
        Outbox.querySelector(".location .place").innerText=`${city},${country}`;
        Outbox.querySelector(".temp1 .number2").innerText=`${feels_like}°C`;
        Outbox.querySelector(".humidity .number3").innerText=`${humidity}%`;


        if(id==800){
            Icon.src="clear.svg";
        }
        else if(id>=200 && id<=232){
            Icon.src="storm.svg";
        }
        else if(id>=600 && id<=622){
            Icon.src="snow.svg";
        }
        else if(id>=701 && id<=781){
            Icon.src="haze.svg";
        }
        else if(id>=801 && id<=804){
            Icon.src="cloud.svg";
        }
        else if((id>=500 && id<=531) || (id>=300 && id<=321)){
            Icon.src="rain.svg";
        }
        

        Infotext.classList.remove("pending", "error");
        Outbox.classList.add("active");
        // console.log(info);
    }
}

Arrow.addEventListener("click", ()=>{
    Outbox.classList.remove("active");
})
