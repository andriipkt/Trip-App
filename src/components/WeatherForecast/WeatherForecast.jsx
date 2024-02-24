import ClearDay from "../../assets/icons/clear-day.svg";

const WeatherForecast = () => {
  return (
    <>
      <h2>Week</h2>
      <img src={ClearDay} alt="Clear Day" width="300px" height="300px" />
      <ul></ul>
    </>
  );
};

export default WeatherForecast;

//rain
//snow
//cloudy
//partly-cloudy-day
//clear-day
