const apiKey = '982b33b2128414182a9809fc4e83fc98'
export const weatherApi = (path, {zipcode, coords}) => {
  let suffix = '';

  if (zipcode) {
    suffix = `zip=${zipcode}`;
  } else if (coords) {
    suffix = `lat=${coords.latitude}&lon=${coords.longitude}`;
  }

  return fetch(
    `https://api.openweathermap.org/data/2.5${path}?appid=${apiKey}&units=imperial&${suffix}`,
  ).then((response) => response.json());
};
