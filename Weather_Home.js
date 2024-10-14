let day_button = document.getElementById("day-btn");
let night_button = document.getElementById("night-btn");


day_button.addEventListener('click',()=>{
    day_button.style.display="none";
    night_button.style.display="block";
    document.body.style.background="#16167b";
    document.getElementsByClassName("div-container")[0].style.background="#16167b";
})

night_button.addEventListener('click',()=>{
    day_button.style.display="block";
    night_button.style.display="none";
    document.body.style.background="black";
    document.getElementsByClassName("div-container")[0].style.background="black";
})
