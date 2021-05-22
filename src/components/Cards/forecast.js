import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import API from '../../helpers/api'
import config from '../../env'

import Color from '../../helpers/colors'
import WeatherIcons from '../weatherIcons'

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';

import moment from 'moment-timezone';

SimpleLineIcons.loadFont();
Ionicons.loadFont();
Feather.loadFont();



const forecast = (props) => {

    const [cityForecast, setcityForecast] = useState(null)
    const [loadingCity, setloadingCity] = useState(true)

    useEffect(() => {
        loadCityForecast()
    }, [])

    async function loadCityForecast() {
        await API.get('onecall?lat=' + props.coords.lat + '&lon=' + props.coords.lon + '&exclude=hourly,minutely&units=metric&appid=' + config.openWeatherKey).then(function (response) {
            setcityForecast(response.data.daily)
            console.log(response.data.daily)
        })
            .catch((error) => console.debug(error))
            .then(() => { setloadingCity(false) })
    }


    let RenderItem = (item) => (
        <View style={styles.day_item}>
            <View style={styles.week_data}>
                <Text style={styles.date}>{moment.unix(item.item.dt).tz("Europe/Lisbon").format('DD/MM')}</Text>
                <View style={styles.humidity_container}>
                    <Ionicons name="rainy-outline" size={15} color='#fff' />
                    <Text style={styles.humidity_text}>{item.item.rain ? parseInt(item.item.rain) : '0'}%</Text>
                </View>
            </View>
            <View style={styles.week_data}>
                <WeatherIcons data={item.item.weather[0].main} size={25}/>
                <Text style={styles.temp_day}>{parseInt(item.item.temp.eve)}{'\u2103'}</Text>
            </View>
        </View>
    );

    return (
        <ScrollView nestedScrollEnabled style={{ height: 200 }}>
            {cityForecast ? (
                <View>
                    {cityForecast.map((item) => <RenderItem item={item} />)}
                </View>

            ) : (
                <View style={styles.containerEmpty}>
                    <ActivityIndicator size="large" color={Color.primary_lighter} />
                </View>
            )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerEmpty: {
        height: 200,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    city_notfound_text: {
        fontSize: 30,
        color: Color.primary_lighter,
    },
    day_item: {
        borderBottomColor: Color.primary_very_lighter_2,
        borderBottomWidth: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    humidity_container: {
        width: 80,
        backgroundColor: Color.secondary,
        flexDirection: 'row',
        borderRadius: 30,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    humidity_text: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5
    },
    week_data: {
        flexDirection: 'row',
        color: '#000', 
        alignItems: 'center',
        alignContent: 'center'
    },
    temp_day: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
        marginLeft: 10
    },
    date: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
        marginRight: 10
    }

});

export default forecast;