import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, Text, StyleSheet, Dimensions, PermissionsAndroid, Alert, TouchableOpacity } from 'react-native';
import Color from '../helpers/colors'

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
SimpleLineIcons.loadFont();
Ionicons.loadFont();

import WeatherIcons from '../components/weatherIcons'
import Geolocation from '@react-native-community/geolocation';

import config from '../env'
import API from '../helpers/api'

let deviceWidth = Dimensions.get('window').width

const Header = (props) => {
    const moveCalc = props.scrollY

    const irHeightView = 60
    const orHeightView = 150

    let heightView = moveCalc.interpolate({
        inputRange: [0, orHeightView],
        outputRange: [orHeightView, irHeightView],
        extrapolate: 'clamp'
    });

    let fontSizeNumber = moveCalc.interpolate({
        inputRange: [0, orHeightView],
        outputRange: [70, 30],
        extrapolate: 'clamp'
    });

    let fontSize = moveCalc.interpolate({
        inputRange: [0, orHeightView],
        outputRange: [25, 20],
        extrapolate: 'clamp'
    });

    let marginLeftContainer = moveCalc.interpolate({
        inputRange: [0, orHeightView],
        outputRange: [0, -deviceWidth + 150],
        extrapolate: 'clamp'
    });

    let marginRightContainer = moveCalc.interpolate({
        inputRange: [0, orHeightView],
        outputRange: [0, -deviceWidth + +120],
        extrapolate: 'clamp'
    });

    let marginRightContainerTop = moveCalc.interpolate({
        inputRange: [0, orHeightView],
        outputRange: [-20, -30],
        extrapolate: 'clamp'
    });

    let marginLeftContainerTop = moveCalc.interpolate({
        inputRange: [0, orHeightView],
        outputRange: [-10, 5],
        extrapolate: 'clamp'
    });

    // GET CURRENT LOCATION WEATHER
    const [locationWeather, setlocationWeather] = useState(null)
    const [userLocation, setuserLocation] = useState(null)

    useEffect(() => {
        Geolocation.getCurrentPosition(userLocation => getsetUserLocationWeather(userLocation))
    }, [])

    async function getsetUserLocationWeather(userLocation) {
        setuserLocation(userLocation)
        await API.get('weather?lat=' + userLocation.coords.latitude + '&lon=' + userLocation.coords.longitude + '&units=metric&appid=' + config.openWeatherKey)
            .then(function (response) {
                setlocationWeather(response.data)
            })
            .catch((error) => console.debug(error))
    }

    return (
        <>
            {locationWeather ? (
                <TouchableOpacity style={styles.container_wheather} onPress={() => props.navigation.navigate('DetailScreen',{
                    lat: userLocation.coords.latitude,
                    lon: userLocation.coords.longitude,
                    cityName: locationWeather.name,
                    type: 'current'
                })}>
                    <Animated.View style={[styles.header, { backgroundColor: Color.primary_very_lighter, height: heightView }]}>
                        <Animated.View style={[styles.weather_number_container, { top: marginLeftContainerTop, marginLeft: marginLeftContainer, marginTop: Platform.OS === 'ios' ? 24 : 15 }]}>
                            <WeatherIcons data={'Clouds'} size={45} color={Color.primary_dark} />
                            <Animated.Text style={{ fontWeight: 'bold', paddingLeft: 10, color: Color.primary_dark, fontSize: fontSizeNumber }}>{parseInt(locationWeather.main.temp)}{'\u2103'}</Animated.Text>
                        </Animated.View>

                        <Animated.View style={{ alignItems: 'center', flexDirection: 'row', marginRight: marginRightContainer, marginTop: Platform.OS === 'ios' ? 24 : 0, top: marginRightContainerTop }}>
                            <Ionicons name={'md-location-outline'} size={20} color={'#fff'} />
                            <Animated.Text style={[styles.currentLocation_text, { fontSize: fontSize, marginLeft: 2 }]}>
                                {locationWeather.name}
                            </Animated.Text>
                        </Animated.View>
                    </Animated.View>
                </TouchableOpacity>
            ) : (
                <View>
                    <Text>jfeoajfiea</Text>
                </View>
            )}

        </>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Color.primary_dark
    },
    weather_number_container: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    image: {
        resizeMode: 'contain'
    },
    currentLocation_text: {
        color: '#fff',
    }
})

export default Header;