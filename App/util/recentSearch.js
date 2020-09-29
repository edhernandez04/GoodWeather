import AsyncStorage from '@react-native-community/async-storage';

const KEY = '@GoodWeather/searchHistory';

export const getRecentSearch = () =>
// AsyncStorage.removeItem(KEY);
  AsyncStorage.getItem(KEY).then(str => {
    if (str) {
      return JSON.parse(str);
    }
    return [];
  });

export const addRecentSearch = item =>
  getRecentSearch().then(history => {
    const oldHistory = history.filter(
      existingItem => existingItem.name != item.name
    );

    const newHistory = [item, ...oldHistory];

    return AsyncStorage.setItem(KEY, JSON.stringify(newHistory));
  });