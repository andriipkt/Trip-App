import { useEffect, useRef, useState } from "react";
import { fetchFromToWeather } from "../../services/apiService";
import TripItem from "../TripItem/TripItem";
import Modal from "../Modal/Modal";
import topCities from "../../data/topCities.json";
import styles from "./TripList.module.css";
import { LeftArrowIcon, PlusIcon, RightArrowIcon } from "../Icons/Icons";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import { staticTrip } from "../../data/staticTrip.js";
import TripsFilter from "../TripsFilter/TripsFilter.jsx";

const TripList = ({ getTripInfo }) => {
  const [showModal, setShowModal] = useState(false);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [tripList, setTripList] = useState(() => {
    const savedTripList = localStorage.getItem("tripList");
    return savedTripList ? JSON.parse(savedTripList) : [staticTrip];
  });
  const tripListContainerRef = useRef(null);
  const [filterValue, setFilterValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

    setTimeout(() => {
      if (tripListContainerRef.current) {
        tripListContainerRef.current.scrollLeft =
          tripListContainerRef.current.scrollWidth;
      }
    }, 100);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const fetchWeatherForTheWeekDay = async (name, startDate, endDate) => {
    try {
      setIsLoading(true);
      const { days } = await fetchFromToWeather(name, startDate, endDate);
      setDailyWeather(days);
      getTripInfo(name, days[0]);
      setError(null);
    } catch (error) {
      console.dir(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollLeft = () => {
    if (tripListContainerRef.current) {
      tripListContainerRef.current.scrollLeft -= 600;
    }
  };
  const scrollRight = () => {
    if (tripListContainerRef.current) {
      tripListContainerRef.current.scrollLeft += 600;
    }
  };

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  const getFilteredTrips = () => {
    return tripList
      .filter((trip) =>
        trip.name.toLowerCase().includes(filterValue.toLowerCase())
      )
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  };
  const filteredTrips = getFilteredTrips();

  return (
    <>
      <h2 className="visually-hidden">TripList</h2>

      <TripsFilter onFilter={handleFilter} value={filterValue} />

      <div
        className={styles.tripsWrapper}
        style={filteredTrips.length === 0 ? { gap: 0 } : {}}
      >
        <div>
          <ul className={styles.tripList} ref={tripListContainerRef}>
            {filteredTrips.map(
              ({ name, startDate, endDate, imgSrc }, index) => (
                <TripItem
                  key={index}
                  name={name}
                  startDate={startDate}
                  endDate={endDate}
                  imgSrc={imgSrc}
                  fetchWeatherForTheWeekDay={fetchWeatherForTheWeekDay}
                />
              )
            )}
          </ul>

          {filteredTrips.length > 3 && (
            <div className={styles.navBtnsWrapper}>
              <button className={styles.arrowBtn} onClick={scrollLeft}>
                <LeftArrowIcon />
              </button>
              <button className={styles.arrowBtn} onClick={scrollRight}>
                <RightArrowIcon />
              </button>
            </div>
          )}
        </div>

        <button onClick={toggleModal} className={styles.addBtn}>
          <PlusIcon />
          <span>Add trip</span>
        </button>
      </div>

      {showModal && <Modal toggle={toggleModal} onSave={saveTrip} />}

      {isLoading ? (
        <div>loading...</div>
      ) : !error ? (
        dailyWeather.length > 0 && (
          <WeatherForecast dailyWeather={dailyWeather} />
        )
      ) : (
        <p className={styles.error}>{error}</p>
      )}
    </>
  );
};

export default TripList;
