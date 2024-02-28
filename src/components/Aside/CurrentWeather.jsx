import { useEffect, useState } from "react";
import { weatherIcons } from "../../data/weatherIcons";
import styles from "./CurrentWeather.module.css";
import { daysOfTheWeek } from "../../data/daysOfTheWeek";
import { fetchTodaysWeather } from "../../services/apiService";
import CountdownTimer from "../CountdownTimer/CountdownTimer";

const CurrentWeather = ({
  tripStartDateInfo: { city, datetime: startTripDate, icon },
}) => {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [infoForToday, setInfoForToday] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) {
      return;
    }

    const getWeatherForToday = async (name) => {
      try {
        setIsLoading(true);
        const { days } = await fetchTodaysWeather(name);
        setInfoForToday(days[0]);
        setError(null);
      } catch (error) {
        console.dir(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getWeatherForToday(city);
  }, [city]);

  useEffect(() => {
    if (!infoForToday) {
      return;
    }

    const timer = setInterval(() => {
      const now = new Date();
      const tripStart = new Date(startTripDate);
      const timeDiff = tripStart.getTime() - now.getTime();

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setRemainingTime({ days, hours, minutes, seconds });
      } else {
        setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [city, startTripDate, infoForToday]);

  return (
    <aside className={styles.currentWeatherWrapper}>
      <h2 className="visually-hidden">Today&apos;s weather</h2>

      <p className={styles.weekDay}>{daysOfTheWeek[new Date().getDay() - 1]}</p>

      {infoForToday && (
        <>
          {isLoading ? (
            <div>loading...</div>
          ) : !error ? (
            <div className={styles.weatherInfo}>
              <img
                src={weatherIcons[icon]}
                alt="Weather Icon"
                width="100"
                height="100"
              />
              <p>
                {infoForToday.temp}
                <span>&#8451;</span>
              </p>
            </div>
          ) : (
            <p className={styles.error}>{error}</p>
          )}
          <p className={styles.cityName}>{city}</p>
        </>
      )}

      <div style={{ marginTop: "120px", width: "100%" }}>
        <CountdownTimer remainingTime={remainingTime} />
      </div>
    </aside>
  );
};

export default CurrentWeather;
