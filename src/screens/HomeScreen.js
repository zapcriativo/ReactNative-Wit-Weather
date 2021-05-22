import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, ActivityIndicator, StatusBar, Animated } from 'react-native';
import Color from '../helpers/colors'
import API from '../helpers/api'
import Cities from '../helpers/cities.json'

import config from '../env'
import Card from '../components/Cards/card'
import Header from '../components/header'

const HomeScreen = ({ navigation }) => {

  const [loadingCities, setloadingCities] = useState(true)
  const [citiesWeather, setCitiesWeather] = useState()
  const [flatListScrollData, setflatListScrollData] = useState(new Animated.Value(0))

  useEffect(() => {
    loadCitiesList()
  }, [])

  // Function to call weather of cities in the openWeather API
  async function loadCitiesList() {
    let cities_ids = []
    await Cities.map((item) => { cities_ids.push(item.id) })
    await API.get('group?id=' + cities_ids + '&units=metric&appid=' + config.openWeatherKey).then(function (response) {
      setCitiesWeather(response.data.list)
    })
      .catch((error) => console.debug(error))
      .then(() => { setloadingCities(false) })
  }

  // Cities not found message container
  const renderEmptyContainer = () => (
    <View style={styles.containerEmpty}>
      <Text style={styles.city_notfound_text}>No cities found</Text>
    </View>
  );

  const scrollY = useRef(new Animated.Value(0)).current

  return (
    <View style={styles.container}>
      {loadingCities ? (
        <View style={styles.containerEmpty}>
          <ActivityIndicator size="large" color={Color.primary_lighter} />
        </View>
      ) : (
        <SafeAreaView>
          <Header scrollY={scrollY} navigation={navigation}/>
          <Animated.FlatList
            data={citiesWeather}
            onScroll={
              Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollY
                      }
                    }
                  }
                ], { useNativeDriver: false }
              )
            }
            renderItem={({ item }) => <Card item={item} navigation={navigation} />}
            keyExtractor={item => item.id}
            ListEmptyComponent={renderEmptyContainer}
            scrollEventThrottle={1}
            contentContainerStyle={{paddingBottom: 100}} 
          />

        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  container: {
    flex: 1,
    backgroundColor: '#e6edf0'
  },

  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
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