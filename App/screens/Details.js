import React from 'react';
import Geolocation from '@react-native-community/geolocation';

const apiKey = '982b33b2128414182a9809fc4e83fc98';

export default class Details extends React.Component {
  state = {
    zipcode: null,
    coords: null,
  };

  componentDidMount() {
    Geolocation.getCurrentPosition(
        (position) => {
          this.getCurrentWeather({
            coords: {
              latitude: parseFloat(JSON.stringify(position.coords.latitude)),
              longitude: parseFloat(JSON.stringify(position.coords.longitude)),
            },
          });
          this.getForecast({
            coords: {
              latitude: parseFloat(JSON.stringify(position.coords.latitude)),
              longitude: parseFloat(JSON.stringify(position.coords.longitude)),
            },
          });
        },
        (error) => alert(error.message),
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 10000},
    )
  }

  getCurrentWeather = ({zipcode, coords}) => {
    let suffix = '';
    if (zipcode) suffix = `zip=${zipcode}`;
    else if (coords) suffix = `lat=${coords.latitude}&lon=${coords.longitude}`;
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&${suffix}`,
    )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  getForecast = ({zipcode, coords}) => {
    let suffix = '';
    if (zipcode) suffix = `zip=${zipcode}`;
    else if (coords) suffix = `lat=${coords.latitude}&lon=${coords.longitude}`;
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&${suffix}`,
    )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  render() {
    return null;
  }
}
