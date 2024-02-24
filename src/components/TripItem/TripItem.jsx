/* eslint-disable react/prop-types */
import styles from "./TripItem.module.css";
import imgPlaceholder from "../../assets/images/placeholder-image.png";
import { isValidURL } from "../../helpers/isValidURL";
import { fetchFromToWeather } from "../../services/apiService";
import { useEffect, useState } from "react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TripItem = ({ name, startDate, endDate, imgSrc, toggleForecast }) => {
  const [dailyWeather, setDailyWeather] = useState([]);

  useEffect(() => {
    const getWeatherForTrip = async () => {
      try {
        const { days } = await fetchFromToWeather(name, startDate, endDate);
        setDailyWeather(days);
      } catch (error) {
        console.log(error);
      }
    };

    getWeatherForTrip(name, startDate, endDate);
  }, [name, startDate, endDate]);

  return (
    <>
      <li className={styles.tripItemWrapper} onClick={toggleForecast}>
        <img
          src={imgSrc && isValidURL(imgSrc) ? imgSrc : imgPlaceholder}
          alt={name}
          loading="lazy"
        />

        <div className={styles.tripItemLabels}>
          <h3>{name}</h3>

          <p>
            {startDate} - {endDate}
          </p>

          <div className={styles.weatherList}>
            {dailyWeather.map((day) => (
              <div key={day.datetime} className={styles.weatherItem}>
                {/* Use date object to get correct day of the week */}
                <p>{daysOfWeek[new Date(day.datetime).getDay()]}</p>
                <p>{day.datetime}</p>
                <p>Max: {day.tempmax}°C</p>
                <p>Min: {day.tempmin}°C</p>
              </div>
            ))}
          </div>
        </div>
      </li>
    </>
  );
};

export default TripItem;
