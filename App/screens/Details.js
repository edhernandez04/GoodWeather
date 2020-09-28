import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import { weatherApi } from '../util/weatherApi';

export default class Details extends React.Component {
  componentDidMount() {
    Geolocation.getCurrentPosition(
        (position) => {
          this.getCurrentWeather({ coords: position.coords });
          this.getForecast({ coords: position.coords });
        }, (error) => alert(error.message),
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 10000},
    )
  }

  getCurrentWeather = ({ zipcode, coords }) =>
    weatherApi('/weather', { zipcode, coords })
      .then(response => {
        console.log('current response', response);
      })
      .catch(err => {
        console.log('current error', err);
      });

  getForecast = ({ zipcode, coords }) =>
    weatherApi('/forecast', { zipcode, coords })
      .then(response => {
        console.log('forecast response', response);
      })
      .catch(err => {
        console.log('forecast error', err);
      });

  render() {
    return null;
  }
}
