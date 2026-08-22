const DailyWeatherData = ({data.days}) => {
    const days = data.days;

    {days.map(day => {
       return (
    <>
    <div>
        <h1>Daily Basis Weather Forecast</h1>
          <p>${day.}</p>
          <p>${day.}</p>
          <p>${day.}</p>
          <p>${day.}</p>
          <p></p>
    
    </div>

    </>
  ) 
}
    )}
  
}
export default DailyWeatherData
