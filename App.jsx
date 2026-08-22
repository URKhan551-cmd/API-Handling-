import { useState } from "react";
import SearchBar from "./Component/SearchBar.jsx";
import MainPage from "./Component/MainPage.jsx";
import { apiResponse } from "./Api/apiResponse.js";
import Button from "./Component/Button.jsx"
import DailyWeatherData from "./Component/DailyWeatherData.jsx";
import HourlyDataWeather from "./Component/HourlyDataWeather.jsx";

function App() {
  const [start, setStart] = useState(false);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();
  const [isDaily, setIsDaily] = useState(false); 
  const [isHourly, setIsHourly] = useState(false); 

function showScreen(){
  setStart(true);

}
const getLocation = async () => {
  setLoading(true);
  setError(null);
  try {
    let data = await apiResponse(location);
    setData(data);
    console.log(data.currentCondition)
  } catch(error){
   
    setError(error.message);
  } finally {
    setLoading(false);
  }
}



{isDaily && (
  <DailyWeatherData days={data.days}/>
  <HourlyDataWeather data={data}/>
)}

if (start) {
  return (
    <>
      <div>Box 
      <p>What you paste you will get the data </p>
      <div>
        <label htmlFor="searchBar">Enter City Name</label>
        <SearchBar value={location} onChange={(e) => setLocation(e.target.value)} />
        <Button onClick={getLocation} />
        </div>

        {loading && <p>Loading... walla wait a bit we are looking for your data</p>}
        {error && <p>{error}: error is showing in getLocation func</p>}

      
        {data && (
          <div>
            <h2>Current Weather Condition</h2>
            <h3>${data.address}</h3>
            <p>Temprature: ${data.currentCondition.temp}°C</p>
            <p>Feels Like: ${data.currentCondition.feelslike}</p>
            <p>Humidity: ${data.currentCondition.humidity}</p>
            <p>Rain Probability: ${data.currentCondition.precipprob}%</p>
            <p>Dew: ${data.currentCondition.dew}</p> 
            <p>Windspeed: ${data.currentCondition.windspeed}</p> 
            <p>Pressure: ${data.currentCondition.pressure}</p> 
            <p>Visibility: ${data.currentCondition.visibility}</p> 
            <p>Solar Energy: ${data.currentCondition.solarenergy}</p> 
            <p>Condition: ${data.currentCondition.condition}</p> 
          </div>
        )}

        <Button onClick={() => setIsDaily(true)}/>
        
        
      </div>
    </>
  )
}


  return (
    <MainPage onClick={showScreen}/>
  )


}
  export default App
