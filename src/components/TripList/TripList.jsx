import { useEffect, useState } from "react";
// import { fetchFromToWeather } from "../../services/apiService";
import TripItem from "../TripItem/TripItem";
import Modal from "../Modal/Modal";
import topCities from "../../data/topCities.json";
import styles from "./TripList.module.css";
import { PlusIcon } from "../Icons/Icons";
import WeatherForecast from "../WeatherForecast/WeatherForecast";

const staticTrip = {
  name: "Kyiv",
  imgSrc:
    "https://cdn.pixabay.com/photo/2020/05/21/21/49/city-5202950_1280.jpg",
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
};

const TripList = () => {
  const [showModal, setShowModal] = useState(false);
  const [showForecast, setShowForecast] = useState(true);
  const [tripList, setTripList] = useState(() => {
    const savedTripList = localStorage.getItem("tripList");

    return savedTripList ? JSON.parse(savedTripList) : [staticTrip];
  });

  useEffect(() => {
    localStorage.setItem("tripList", JSON.stringify(tripList));
  }, [tripList]);

  const saveTrip = (cityName, startDate, endDate) => {
    const city = topCities.find((city) => city.name === cityName);
    if (city) {
      const { name, imgSrc } = city;
      const newTrip = {
        name,
        imgSrc,
        startDate,
        endDate,
      };
      setTripList([...tripList, newTrip]);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleForecastDisplay = () => {
    setShowForecast(!showForecast);
  };

  // useEffect(() => {
  //   const getWeatherFromTo = async () => {
  //     try {
  //       const res = await fetchFromToWeather(
  //         "Kyiv",
  //         "2024-02-24",
  //         "2024-02-28"
  //       );
  //       console.log("res in list", res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getWeatherFromTo();
  // }, []);

  return (
    <>
      <h2>TripList</h2>

      <div className={styles.tripWrapper}>
        <ul className={styles.tripList}>
          {tripList.map(({ name, startDate, endDate, imgSrc }) => (
            <TripItem
              key={name}
              name={name}
              startDate={startDate}
              endDate={endDate}
              imgSrc={imgSrc}
              toggleForecast={toggleForecastDisplay}
            />
          ))}
        </ul>
        <button onClick={toggleModal} className={styles.addBtn}>
          <PlusIcon />
          <span>Add trip</span>
        </button>
      </div>

      {showModal && <Modal toggle={toggleModal} onSave={saveTrip} />}
      {showForecast && <WeatherForecast />}
    </>
  );
};

export default TripList;

// <input list="brow" />
// <datalist id="brow">
//   <option value="Internet Explorer" />
//   <option value="Firefox" />
//   <option value="Chrome" />
//   <option value="Opera" />
//   <option value="Safari" />
// </datalist>

// 2024-02-24 / 2024-02-28;
