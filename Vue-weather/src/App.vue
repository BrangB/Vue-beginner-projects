

<template>
  <div id="app" :class="(typeof weather.main != 'undefined' && weather.main.temp > 20 ? 'warm' : '')">
    <main>
      <div class="search-box">
        <input type="text" class="search-bar" placeholder="Search..." v-model="query" v-on:keypress="fetchWeather">
      </div>
      <div class="weather-wrap" v-if="(typeof weather.main != 'undefined')">
        <div class="location-box">
          <div class="location">{{weather.name}}, {{ weather.sys.country }}</div>
          <div class="date">{{dateBuilder()}}</div>
        </div>
        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }}°C</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  export default{
    name: "app",
    data(){
      return{
        api_key: "1db8c7ec08f082b3d547517c49b1a916",
        url_base: "https://api.openweathermap.org/data/2.5/",
        query: '',
        weather: {}
      }
    },
    methods: {
      fetchWeather(e){
        if(e.key == "Enter"){
          fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
          .then(res => {
            return res.json()
          }).then(result => {
            this.weather = result
            console.log(this.weather)
          })
        }
      },
      dateBuilder () {
        let d = new Date();
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
      }
    }
  }
</script>

<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body{
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }
  #app{
    background-image: url("assets/cold-bg.jpg");
    background-size: cover;
    background-position: bottom;
    transition: .4s;
  }
  #app.warm{
    background-image: url("assets/warm-bg.jpg");
  }
  main{
    min-height: 100vh;
    padding: 25px;

    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
  }
  .search-box{
    width: 100%;
    margin-bottom: 30px;
  }
  .search-box .search-bar{
    display: block;
    width: 100%;
    padding: 8px 15px;
    color: #313131;
    font-size: 20px;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    background-color: rgba(225, 225, 225, 0.5);
    border-radius: 0 16px 0 16px;
    transition: .4s;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  }
  .search-box .search-bar:focus{
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
    background-color: rgba(225, 225, 225, 0.75);
    border-radius: 16px 0 16px 0;
  }
  .location-box .location{
    font-size: 32px;
    font-weight: 600;
    color: white;
    text-align: center;
    text-shadow: 1px 3px  rgba(0, 0, 0, 0.25);
    margin-bottom: 10px;
  }
  .location-box .date{
    font-size: 20px;
    font-weight: 400;
    color: white;
    text-align: center;
    font-style: italic;
  }
  .weather-box{
    text-align: center;
  }
  .weather-box .temp{
    display: inline-block;
    font-size: 102px;
    padding: 10px 25px;
    color: white;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    background-color: rgba(225, 225, 225, 0.5);
    border-radius: 10px;
    box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    margin: 30px 0;
  }
  .weather-box .weather{
    font-size: 48px;
    font-style: italic;
    font-weight: 700;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    color: white;
  }
</style>
