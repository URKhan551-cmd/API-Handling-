Start with HourlyDataWeather

This is your highest-level component:

const HourlyDataWeather = ({ hours }) => {
    const { previous24Hour, next24Hour } = hours;
    const { previous24Hour, next24Hour } = hours;

// is simply extracting those two arrays.

// It's equivalent to:

// const previous24Hour = hours.previous24Hour;
// const next24Hour = hours.next24Hour;

    return (
        <div className="flex flex-col gap-6">

            <HourSection
                title="⏪ Previous 24 Hours"
                hours={[...previous24Hour].reverse()}
            />

            <HourSection
                title="⏩ Next 24 Hours"
                hours={next24Hour}
            />

        </div>
    )
};

// just imagine i ahve 
hours = {
    previous24Hour: [
        {
            date: "2026-08-24",
            time: "18:00",
            temperature: 31,
            feelsLike: 33,
            rainProbability: 20,
            windSpeed: 12,
            icon: "partly-cloudy"
        },
        {
            date: "2026-08-24",
            time: "19:00",
            temperature: 30,
            feelsLike: 32,
            rainProbability: 10,
            windSpeed: 10,
            icon: "clear-day"
        }
    ],

     next24Hour: [
        {
            date: "2026-08-25",
            time: "16:00",
            temperature: 34,
            feelsLike: 36,
            rainProbability: 5,
            windSpeed: 15,
            icon: "clear-day"
        }
    ]
}


// <HourSection
//     title="⏪ Previous 24 Hours"
//     hours={[...previous24Hour].reverse()}
// />

// This is basically saying:

// "React, create an HourSection component and give it these two pieces of information."

// You're passing props:

// {
//     title: "⏪ Previous 24 Hours",
//     hours: [...]
// }

// So React essentially calls your component like:
