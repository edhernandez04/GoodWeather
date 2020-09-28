import React from 'react';
import {ActivityIndicator, ScrollView, SafeAreaView, View, Image, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {format} from 'date-fns';
import {weatherApi} from '../util/weatherApi';
import {Container} from '../components/Container';
import {WeatherIcon} from '../components/WeatherIcon';
import {BasicRow} from '../components/List';
import {H1, H2, P} from '../components/Text';
import { getWeatherIcon } from "../util/icons";

const groupForecastByDay = (list) => {
  const data = {};
  list.forEach((item) => {
    const [day] = item.dt_txt.split(' ');
    if (data[day]) {
      if (data[day].temp_max < item.main.temp_max) data[day].temp_max = item.main.temp_max;
      if (data[day].temp_min > item.main.temp_min) data[day].temp_min = item.main.temp_min;
      if (data[day].icon) data[day].icon = item.weather[0].icon;
      if (data[day].description) data[day].description = item.weather[0].description
    } else {
      data[day] = {
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
      };
    }
  });

  const formattedList = Object.keys(data).map((key) => ({
    day: key,
    ...data[key],
  }));

  return formattedList;
};

export default class Details extends React.Component {
  state = {
    currentWeather: {},
    loadingCurrentWeather: true,
    forecast: [],
    loadingForecast: true,
  };

  componentDidMount() {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      (position) => {
        this.getCurrentWeather({coords: position.coords});
        this.getForecast({coords: position.coords});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 10000},
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.route.params && prevProps.route.params.zipcode) {
      const oldZipcode = prevProps.route.params.zipcode
      const zipcode = this.props.route.params.zipcode;
      if (zipcode && oldZipcode !== zipcode) {
        this.getCurrentWeather({ zipcode });
        this.getForecast({ zipcode });
      }
    }
  }

    handleError = () => {
    Alert.alert('No location data found!', 'Please try again', [
      {
        text: 'Okay',
        onPress: () => this.props.navigation.navigate('Search'),
      },
    ]);
  };

  getCurrentWeather = ({zipcode, coords}) =>
    weatherApi('/weather', {zipcode, coords})
      .then((response) => {
        this.props.navigation.setParams({title: response.name});
        this.setState({
          currentWeather: response,
          loadingCurrentWeather: false,
        });
      })
      .catch((err) => {
        console.log('current error', err);
      });

  getForecast = ({zipcode, coords}) =>
    weatherApi('/forecast', {zipcode, coords})
      .then((response) => {
        this.setState({
          loadingForecast: false,
          forecast: groupForecastByDay(response.list),
        });
      })
      .catch((err) => {
        console.log('forecast error', err);
      });

  render() {
    if (this.state.loadingCurrentWeather || this.state.loadingForecast) {
      return (
        <Container>
          <ActivityIndicator color="#fff" size="large" />
        </Container>
      );
    }

    const {weather, main} = this.state.currentWeather;

    return (
      <Container>
        <ScrollView>
          <SafeAreaView>
            <WeatherIcon icon={weather[0].icon} />
            <H1>{`${Math.round(main.temp)}°`}</H1>
            <BasicRow>
              <H2>{`Humidity: ${main.humidity}%`}</H2>
            </BasicRow>
            <BasicRow>
              <H2>{`Low: ${Math.round(main.temp_min)}°`}</H2>
              <H2>{`High: ${Math.round(main.temp_max)}°`}</H2>
            </BasicRow>

            <View style={{paddingHorizontal: 10, marginTop: 20}}>
              {this.state.forecast.map((day) => (
                <>
                <BasicRow
                  key={day.day}
                  style={{justifyContent: 'space-between', alignItems: 'center'}}>
                  <P>{format(new Date(day.day), 'EEEE MMM d')}</P>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <P>{day.description}</P>
                  <Image
                    source={getWeatherIcon(day.icon)}
                    style={{ width: 20, height: 20, tintColor: "#fff", margin: 10 }}
                    resizeMode="contain"
                  />
                    <P style={{fontWeight: '700', marginRight: 10}}>
                      {Math.round(day.temp_max)}
                    </P>
                    <P>{Math.round(day.temp_min)}</P>
                  </View>
                </BasicRow>
                </>
              ))}
            </View>
          </SafeAreaView>
        </ScrollView>
      </Container>
    );
  }
}
