import TripList from "./TripList/TripList";
import styles from "./App.module.css";
import CurrentWeather from "./Aside/CurrentWeather";
import { useState } from "react";

function App() {
  const [tripStartDateInfo, setTripStartDateInfo] = useState({
    city: null,
    datetime: null,
    icon: "weather",
  });

  const getTripInfo = (city, { datetime, icon }) => {
    const infoForADay = {
      city,
      datetime,
      icon,
    };

    setTripStartDateInfo(infoForADay);
  };

  return (
    <div className={styles.bodyWrapper}>
      <div className={styles.headerAndMainWrapper}>
        <header>
          <a href="">
            Weather <span>Forecast</span>
          </a>
        </header>

        <main>
          <section>
            <h1 className="visually-hidden">Weather Forecast</h1>
            <TripList getTripInfo={getTripInfo} />
          </section>
        </main>
      </div>

      <CurrentWeather tripStartDateInfo={tripStartDateInfo} />
    </div>
  );
}

export default App;
