import React from 'react';

const apiKey = '982b33b2128414182a9809fc4e83fc98';

export default class Details extends React.Component {
  componentDidMount() {
    let zipCode = 10457;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&zip=${zipCode}&units=metric`,
    )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log('error', err);
      });

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&zip=${zipCode}&units=metric`,
    )
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }

  render() {
    return null;
  }
}
