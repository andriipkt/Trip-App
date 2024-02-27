import { useEffect, useState } from "react";
import { weatherIcons } from "../../data/weatherIcons";
import styles from "./CurrentWeather.module.css";
import { daysOfTheWeek } from "../../data/daysOfTheWeek";
import { fetchTodaysWeather } from "../../services/apiService";

const CurrentWeather = ({ tripStartDateInfo: { city, datetime, icon } }) => {
  const [remainingTime, setRemainingTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [infoForToday, setInfoForToday] = useState(null);
  console.log("infoForToday", infoForToday);

  useEffect(() => {
    if (!city) {
      return;
    }

    const getWeatherForToday = async (name) => {
      try {
        setIsLoading(true);
        const { days } = await fetchTodaysWeather(name);
        console.log(days);
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
    const timer = setInterval(() => {
      const now = new Date();
      const tripStart = new Date(datetime);
      const timeDiff = tripStart.getTime() - now.getTime();

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setRemainingTime("Trip started");
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [city, datetime]);

  return (
    <aside className={styles.currentWeatherWrapper}>
      <h2 className="visually-hidden">Today&apos;s weather</h2>

      <p>{daysOfTheWeek[new Date(datetime).getDay()]}</p>

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
          </p>{" "}
        </div>
      ) : (
        <p className={styles.error}>{error}</p>
      )}

      <p>{city}</p>

      <div>{remainingTime}</div>
    </aside>
  );
};

export default CurrentWeather;
