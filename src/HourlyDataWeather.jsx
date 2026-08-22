const HourlyDataWeather = ({data.days}) => {
     const days = data.days;
     let hours = days.map(day => day.hours);

   {hours.map(hour => {
    return (
        <div><span>Hourly Data ForeCast</span></div>
    )
   })}
}
export default HourlyDataWeather
