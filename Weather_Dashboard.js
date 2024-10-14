// ..........Light & Dark mood.........

let day_button = document.getElementById("day-btn");
let night_button = document.getElementById("night-btn");
let child = document.getElementsByClassName("information-ch");
child = Array.from(child);  // HTML collection to Array

let title = document.getElementsByClassName("card-title");
let data = document.getElementsByClassName("card-data");
title = Array.from(title);
data = Array.from(data);

day_button.addEventListener('click', () => {
    day_button.style.display = "none";
    night_button.style.display = "block";
    // document.body.style.background="#16167b";
    document.getElementsByClassName("div-container")[0].style.background = "white";
    child.forEach((elem) => {
        elem.style.background = "white";
    })
    document.getElementsByClassName("location")[0].style.color = "black";
    document.getElementsByClassName("time")[0].style.color = "#212529";
    document.getElementsByClassName("condition")[0].style.color = "#16167b";
    document.getElementsByClassName("temperature")[0].style.color = "black";
    document.getElementsByClassName("feel-like")[0].style.color = "#212529";
    title.forEach((e) => {
        e.style.color = "#16167b";
    })
    data.forEach((e) => {
        e.style.color = "#16167b";
    })
})

night_button.addEventListener('click', () => {
    day_button.style.display = "block";
    night_button.style.display = "none";
    // document.body.style.background="black";
    document.getElementsByClassName("div-container")[0].style.background = "black";
    child.forEach((elem) => {
        elem.style.background = "black";
    })
    document.getElementsByClassName("location")[0].style.color = "white";
    document.getElementsByClassName("time")[0].style.color = "white";
    document.getElementsByClassName("condition")[0].style.color = "white";
    document.getElementsByClassName("temperature")[0].style.color = "white";
    document.getElementsByClassName("feel-like")[0].style.color = "white";
    title.forEach((e) => {
        e.style.color = "white";
    })
    data.forEach((e) => {
        e.style.color = "white";
    })
})


// .....................Fetch the Weather API by a user define function.................

let fetch_weather = (url) => {
    let response = fetch(url);
    response.then((value) => {
        if (value.ok == false) {
            document.getElementById("input_box").style.color = "red";
            document.getElementById("input_box").value = "You search wrong location !";
            setTimeout(() => {
                document.getElementById("input_box").style.color = "#212529";
                document.getElementById("input_box").value = "";
            }, 1500)
        }
        else {
            return value.json();
        }
    }).then((value) => {

        // collect the data from API
        console.log(value);
        let location_name = value.name;
        let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurssday", "Friday", "Saturday"];
        let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let d = new Date();
        let current_week_day = week[d.getDay()];
        let current_month = months[d.getMonth()];
        let current_date = d.getDate();
        let c_temp = Math.round(((value.main.temp) - 273.15));
        let h_temp = Math.round(((value.main.temp_max) - 273.15));
        let l_temp = Math.round(((value.main.temp_min) - 273.15));
        let f_temp = Math.round(((value.main.feels_like) - 273.15));
        let climate = value.weather[0].main;
        let humidity = value.main.humidity;
        let pressure = value.main.pressure;
        let visibility = ((value.visibility) / 1000);
        let wind_speed = value.wind.speed;

        // Put the data in HTML
        let simpleText = location_name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        location_name = simpleText; // Bārāsat -> Barasat
        document.getElementById("place").innerText = location_name;
        document.getElementById("week-day").innerText = current_week_day + ",";
        document.getElementById("month-day").innerText = current_month + " " + current_date;
        document.getElementById("current-temperature").innerText = c_temp + "°C";
        document.getElementById("max-temperature").innerText = h_temp + "°";
        document.getElementById("min-temperature").innerText = l_temp + "°";
        document.getElementsByClassName("feel-like")[0].innerText = "Feel like " + f_temp + "°C";
        document.getElementById("climate-card").innerText = climate;
        document.getElementById("humidity-card").innerText = humidity + "%";
        document.getElementById("pressure-card").innerText = pressure;
        document.getElementById("visibility-card").innerText = visibility + "km";
        document.getElementById("wind-card").innerText = wind_speed + "km/h";

    })
}

// ........................ API function call in different situation ................

let url;
let searching_location = "New York";  //default search

let form = document.getElementById("myform");
let submit_btn = document.getElementById("submit-btn");

if (document.getElementById("input_box").value == "") {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${searching_location}&appid=20fd67ebd964c7affa2fb99c8d957b87`;
    fetch_weather(url);
}


form.addEventListener('submit', (event) => {
    event.preventDefault();  // prevent submit in order to prevent refresh the page 
    searching_location = document.getElementById("input_box").value;
    url = `https://api.openweathermap.org/data/2.5/weather?q=${searching_location}&appid=20fd67ebd964c7affa2fb99c8d957b87`;
    fetch_weather(url);
})