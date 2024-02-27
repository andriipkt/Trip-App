import { weatherIcons } from "../../data/weatherIcons";
import styles from "./WeatherForecast.module.css";
import { daysOfTheWeek } from "../../data/daysOfTheWeek";

const WeatherForecast = ({ dailyWeather }) => {
  return (
    <>
      <h2 className={styles.title}>Week</h2>
      <ul className={styles.iconsList}>
        {dailyWeather.map(({ tempmin, tempmax, icon, datetime }, index) => {
          const WeatherIcon = weatherIcons[icon] || null;

          return (
            <li key={index} className={styles.iconsListItem}>
              <p className={styles.day}>
                {daysOfTheWeek[new Date(datetime).getDay()]}
              </p>

              {WeatherIcon && (
                <img src={WeatherIcon} alt={icon} width="100" height="100" />
              )}

              <p>
                {Math.round(tempmin)}°/{Math.round(tempmax)}°
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default WeatherForecast;

//rain
//snow
//cloudy
//partly-cloudy-day
//clear-day
