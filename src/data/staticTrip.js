export const staticTrip = {
  name: "Kyiv",
  imgSrc:
    "https://cdn.pixabay.com/photo/2020/05/21/21/49/city-5202950_1280.jpg",
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
};
