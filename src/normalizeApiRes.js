// NORMALIZATION OF AN API RESPONSE 
export function getDailyWeather(data){
  return data.days.map(day => ({  // here object has been return
    date:  day.datetime,
    temprature: day.temp,
    maxTemprature: day.tempmax,
    minTemprature: day.tempmin,
    humidity:  day.humidity,
    rainProbability: day.precipprob,
    windSpeed: day.windspeed,
    conditions: day.conditions,
    description: day.description,
    icon: day.icon,
    sunrise: day.sunrise,
    sunset: day.sunset,
    uvIndex: day.uvindex,
    feelsLike: day.feelslike,
  }));
};

// this func also return an  object
export function getAllHourlyData(data){
    return data.days.flatMap(day => 
        day.hours.map(hour => ({
            date: day.datetime,
            time: hour.datetime,
            temprature: hour.temp,
            feelsLike: hour.feelslike,
            humidity: hour.humidity,
            rainProbability: hour.precipprob,
            windSpeed: hour.windspeed,
            conditions: hour.conditions,
            icon: hour.icon,
            uvIndex: hour.uvindex,
            visibility: hour.visibility,
        }))
    );

}

//What it does: It takes all the hourly data points and looks at the 
// separate date (e.g., "2026-08-23") and time (e.g., "14:00") strings.
// Why it does this: JavaScript cannot easily compare plain text times. 
// By merging them into a real JavaScript new Date() object, 
// the computer can now accurately measure exactly how far apart two times are.
// It sorts all the weather data from the oldest time to the furthest future time. 
// This ensures the timeline is in a perfect, straight chronological line.

export get24HourWeather(data){
    const allHours = getAllHourlyData(data); // hours 
    const now = new Date();     // present time 
    const hoursWithDate = allHours.map(hour => ({     //this will retuen an object 
        ...hour,
        dateTime: new Date(`${hour.date}T ${hour.time}`),
    }));

    const sorted = hoursWithDate.sort((a, b) => a.dateTime - b.dateTime); // which one is greater will come on first place like 1, 2, 3 4
    const currentIndex = sorted.findIndex(hour => hour.dateTime >= now); // here we will get the index position of just present time api call
//Analogy: Imagine a long film strip of weather data. This line drops a pin on the frame representing the current hour.
    if(currentIndex === -1) {  // What it does: If findIndex returns -1, it means every single piece of data in your list is in the past, and there is no future data.The result: It returns the last 24 items in the list as previous24Hour and leaves next24Hour completely empty.
        return {
            previous24Hour: sorted.slice(-24),
            next24Hour: []
        };
    }

    return {
        previous24Hour: sorted.slice(Math.max(0, currentIndex - 24), currentIndex),
        next24Hour: sorted.slice(currentIndex, currentIndex + 24),
    }
}



export function getWeatherEmoji(icon){
    // here map is an object of icons with key value pairs
    const map = {
       "clear-day":           "☀️",
    "clear-night":         "🌙",
    "cloudy":              "☁️",
    "fog":                 "🌫️",
    "partly-cloudy-day":   "⛅",
    "partly-cloudy-night": "🌤",
    "rain":                "🌧️",
    "showers-day":         "🌦️",
    "showers-night":       "🌧️",
    "sleet":               "🌨️",
    "snow":                "❄️",
    "snow-showers-day":    "🌨️",
    "thunder":             "⛈️",
    "thunder-rain":        "⛈️",
    "thunder-showers-day": "⛈️",
    "wind":                "💨",
    };


    return map[icon] || "🌡️" ;     // here whenever this function get a parameter so called cloudy, snow , etc 
}                                // this func will imediately return  that specific icon to that perticular key.



          // Format "2026-08-23" → "Today" / "Tomorrow" / "Sat, 23 Aug"
export function formatDate(dateStr) {
  const date     = new Date(dateStr + "T00:00:00");
  const today    = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
 
  if (date.toDateString() === today.toDateString())    return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return date.toLocaleDateString("en-AE", {
    weekday: "short", month: "short", day: "numeric",
  });
}


xport function formatTime(timeStr){
    const [h, m] = timeStr.split(":");  // this will return an arr we destruccture it
    const hour = parseInt(h, 10);
    const suffix = hour >=12 ? "pm" : "am";
    const display = hour % 12 || 12;
    return `${display}:${m} ${suffix}`;
}
