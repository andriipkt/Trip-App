import styles from "./TripItem.module.css";
import imgPlaceholder from "../../assets/images/placeholder-image.png";
import { isValidURL } from "../../helpers/isValidURL";

const TripItem = ({
  name,
  startDate,
  endDate,
  imgSrc,
  fetchWeatherForTheWeekDay,
}) => {
  const getTripInfo = (name, startDate, endDate) => {
    fetchWeatherForTheWeekDay(name, startDate, endDate);
  };

  return (
    <>
      <li
        className={styles.tripItemWrapper}
        onClick={() => getTripInfo(name, startDate, endDate)}
      >
        <img
          src={imgSrc && isValidURL(imgSrc) ? imgSrc : imgPlaceholder}
          alt={name}
          loading="lazy"
        />

        <div className={styles.tripItemLabels}>
          <h3>{name}</h3>

          <p>
            {startDate.replace(/-/g, ".")} - {endDate.replace(/-/g, ".")}
          </p>
        </div>
      </li>
    </>
  );
};

export default TripItem;
