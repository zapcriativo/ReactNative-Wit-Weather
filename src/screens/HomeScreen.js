import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Header } from 'react-navigation-stack';
import Color from '../helpers/colors'

import API from '../helpers/api'
import config from '../env'

import Card from '../components/card'
import Cities from '../helpers/cities.json'

const HomeScreen = ({navigation}) => {

  const [loadingCities, setloadingCities] = useState(true)
  const [citiesWeather, setCitiesWeather] = useState()

  useEffect(() => {
    loadCitiesList()
  }, [])

  async function loadCitiesList() {
    let cities_ids = []

    await Cities.map((item) => {
      cities_ids.push(item.id)
    })

    await API.get('group?id=' + cities_ids + '&units=metric&appid=' + config.openWeatherKey).then(function (response) {
      setCitiesWeather(response.data.list)
    })
      .catch((error) => console.debug(error))
      .then(() => { setloadingCities(false) })
  }

  const renderEmptyContainer = () => (
    <View style={styles.containerEmpty}>
      <Text style={styles.city_notfound_text}>No cities found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loadingCities ? (
        <View style={styles.containerEmpty}>
          <ActivityIndicator size="large" color={Color.primary_lighter} />
        </View>
      ) : (
        <FlatList
          data={citiesWeather}
          renderItem={({ item }) => <Card item={item} navigation={navigation}/>}
          keyExtractor={item => item.id}
          ListEmptyComponent={renderEmptyContainer}
          nestedScrollEnabled={true}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6edf0'
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  containerEmpty: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  city_notfound_text: {
    fontSize: 30,
    color: Color.primary_lighter,
  },
});

export default HomeScreen;