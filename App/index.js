import React from 'react';
import {TouchableOpacity, Image, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Details from './screens/Details';
import Search from './screens/Search';

const HeaderRightButton = ({onPress, style, icon}) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={icon}
      resizeMode="contain"
      style={[
        {
          marginRight: 20,
          width: 20,
          height: 20,
          tintColor: '#fff',
        },
        style,
      ]}
    />
  </TouchableOpacity>
);

const Stack = createStackNavigator();

const GoodWeatherStack = () => {
  return (
    <Stack.Navigator mode='modal'>
      <Stack.Screen
        name={"Details"}
        component={Details}
        options={({route, navigation}) => ({
          headerTitle: route.params?.title,
          headerRight: () => (
            <React.Fragment>
              <StatusBar barStyle="light-content" />
              <HeaderRightButton
                icon={require('./assets/search.png')}
                onPress={() => navigation.navigate('Search')}
              />
            </React.Fragment>
          ),
          headerStyle: {
            backgroundColor: '#3145b7',
            borderBottomColor: '#3145b7',
          },
          headerTintColor: '#fff',
        })}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={({navigation}) => ({
          headerTitle: 'Search',
          headerRight: () => (
            <React.Fragment>
              <StatusBar barStyle="dark-content" />
              <HeaderRightButton
                icon={require('./assets/close.png')}
                onPress={() => navigation.pop()}
                style={{tintColor: '#000'}}
              />
            </React.Fragment>
          ),
          headerLeft: null,
        })}
      />
    </Stack.Navigator>
  );
};
export default function App() {
  return <NavigationContainer>{GoodWeatherStack()}</NavigationContainer>;
}
