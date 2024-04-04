const inputElem = document.querySelector("input");
const notfoundElem = document.querySelector('.notLocation')


let apiData = {
  url: "https://api.openweathermap.org/data/2.5/weather?q=",
  key: "8682f624c1bd9c8be1cf54ac808551f6",
};

function fetchData() {
  let countryValue = inputElem.value;

  fetch(`${apiData.url}${countryValue}&appid=${apiData.key}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('City not found');
      }
      return res.json();
    })
    .then((data) => {
      showData(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      notfoundElem.classList.add('show');

      setTimeout( () => {
        notfoundElem.classList.remove('show');
      },5000)
    });
}

function showData(data) {
  let cityElem = document.querySelector(".city");

  let dateElem = document.querySelector(".date");
  dateElem.innerHTML = showDate();

  cityElem.innerHTML = `${data.name},${data.sys.country}`;

  let tempElem = document.querySelector(".temp");
  tempElem.innerHTML = `${Math.floor(data.main.temp - 273.15)}°c`;

  let weatherElem = document.querySelector(".weather");
  weatherElem.innerHTML = `${data.weather[0].main}`;

  let hiLowElem = document.querySelector(".hi-low");
  hiLowElem.innerHTML = `${Math.floor(
    data.main.temp_min - 273.15
  )}°c / ${Math.floor(data.main.temp_max - 273.15)}°c`;
}

function showDate() {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let now = new Date();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let date = now.getDate();

  return `${day} ${date} ${month} ${year}`;
}
window.addEventListener("load",()=> {
  showDate()
})

inputElem.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    fetchData();
    setTimeout( ()=> {
        inputElem.value= ''
    },400)
  }
});

