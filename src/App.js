
import './App.css';
import React, { useState } from 'react';

import'../node_modules/bootstrap/dist/css/bootstrap.min.css';


const api = {
  key:"bf88ebbec8ca60e3a8591d385a42fc04",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }
  const search2 = evt => {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
  }
  

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date}th ${month} ${year}`
  }

  const backset = (d) => {
    let typec = 'app';
    if(d==='Mist')typec = 'app mist';
    else if(d==='Rain')typec = 'app rain';
    else if(d==='Haze')typec = 'app haze';
    else if(d==='Snow')typec = 'app snow';
    else if(d==='Clouds')typec = 'app cloud';
    else if(d==='Clear')typec = 'app clear';
    return `${typec}`
  }


  return (
  <div className={(typeof weather.main != "undefined") ? backset(weather.weather[0].main): 'app'}>
      <main>
      
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',color:'black',fontFamily:'monospace'}}><h1> Weather Pro </h1></div>
        <div className="row  r2 justify-content-center">
        
            <input 
              type="text"
              className="sb col-lg-8 col-md-6 col-auto "
              placeholder="Enter city/area name..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
            <button className='sb2 col-auto' onClick={search2}>Find</button>
       </div>
       
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}  
      </main>
    </div>
    
  );
}

export default App;
