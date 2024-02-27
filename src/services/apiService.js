const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const API_KEY = "ETMLSHD5HLTPKAPC2YZ42XPSV";

export const fetchFromToWeather = (city, dateFrom, dateTo) => {
  return fetch(
    `${BASE_URL}/${city}/${dateFrom}/${dateTo}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
  ).then((response) => response.json());
};

export const fetchTodaysWeather = (city) => {
  return fetch(
    `${BASE_URL}/${city}/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
  ).then((response) => response.json());
};
