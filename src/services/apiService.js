const BASE_URL = "https://api.example.com";
// const API_KEY = "ETMLSHD5HLTPKAPC2YZ42XPSV";

export const fetchTripList = () => {
  return fetch(`${BASE_URL}/trips`).then((response) => response.json());
};
