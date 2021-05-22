import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Image, Dimensions, ScrollView } from 'react-native'
import Cities from '../helpers/cities.json'
import Color from '../helpers/colors'

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';

import API from '../helpers/api'
import config from '../env'

import moment from 'moment-timezone';
import WeatherIcons from '../components/weatherIcons'

const windowWidth = Dimensions.get('window').width;

SimpleLineIcons.loadFont();
Ionicons.loadFont();
Feather.loadFont();

const DetailScreen = (props) => {
    const [cityForecast, setcityForecast] = useState(null)
    const [cityDetails, setCityDetails] = useState(null)
    const [loadingCity, setloadingCity] = useState(true)
    const { params } = props.navigation.state;

    useEffect(() => {
        let cities_array = Cities
        setCityDetails(params.type == 'current' ? { coord: { lon: params.lon, lat: params.lat } } : cities_array.find(x => x.id === params.id))
    }, [])

    useEffect(() => {
        loadCityForecast()
    }, [cityDetails])

    async function loadCityForecast() {
        console.log(cityDetails)
        await API.get('onecall?lat=' + cityDetails.coord.lat + '&lon=' + cityDetails.coord.lon + '&exclude=hourly,minutely&units=metric&appid=' + config.openWeatherKey).then(function (response) {
            setcityForecast(response.data)
            console.log(response.data.current.weather[0].main)
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
                <WeatherIcons data={item.item.weather[0].main} size={25} />
                <Text style={styles.temp_day}>{parseInt(item.item.temp.eve)}{'\u2103'}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {loadingCity ? (
                <View style={styles.containerEmpty}>
                    <ActivityIndicator size="large" color={Color.primary_lighter} />
                </View>
            ) : (
                <ScrollView>
                    <Image source={{ uri: cityDetails.picture ? cityDetails.picture : 'https://cdn.statically.io/img/wallpaperaccess.com/full/236200.jpg' }} style={styles.picture_card} />
                    <View style={styles.container_context}>
                        <View style={styles.container_title}>

                            <Text style={styles.city_title}>{params.cityName ? params.cityName : cityDetails.name}</Text>

                            <View style={styles.container_weather}>
                                <WeatherIcons data={cityForecast.current.weather[0].main} size={35} />
                                <Text style={styles.text_degree}>{parseInt(cityForecast.current.temp)}<Text style={styles.text_degree_symbol}>{'\u2103'}</Text></Text>
                            </View>
                        </View>

                        <View style={styles.container_widgets}>
                            <View style={styles.sunrise_container}>
                                <Feather name="sunrise" size={15} color='#fff' />
                                <Text style={styles.sunset_text}>{moment.unix(cityForecast.current.sunrise).tz("Europe/Lisbon").format('HH:mm')}</Text>
                            </View>

                            <View style={styles.sunset_container}>
                                <Feather name="sunset" size={15} color='#fff' />
                                <Text style={styles.sunset_text}>{moment.unix(cityForecast.current.sunset).tz("Europe/Lisbon").format('HH:mm')}</Text>
                            </View>

                            <View style={styles.rain_container}>
                                <Ionicons name="rainy-outline" size={15} color='#fff' />
                                <Text style={styles.sunset_text}>{cityForecast.rain ? parseInt(cityForecast.rain) : '0'} %</Text>
                            </View>

                            <View style={styles.wind_container}>
                                <Feather name="wind" size={15} color='#fff' />
                                <Text style={styles.sunset_text}>{parseInt(cityForecast.current.wind_speed)}</Text>
                            </View>
                        </View>


                        <Text style={styles.text_description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</Text>

                        <Text style={[styles.text_description, { paddingTop: 10, fontWeight: 'bold', color: Color.secondary, textAlign: 'center' }]}>Next Days Forecast</Text>

                        {cityForecast.daily.map((item) => <RenderItem item={item} />)}

                    </View>
                </ScrollView>
            )}
        </View>
    )
}

export default DetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6edf0',
    },
    containerEmpty: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    picture_card: {
        width: windowWidth,
        height: 300,
        resizeMode: 'cover',
        backgroundColor: Color.primary_very_lighter,
    },
    container_context: {
        top: -100,
        backgroundColor: '#fff',
        // height: 300, 
        margin: 20,
        padding: 20,

    },
    city_title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#575757',
        textTransform: 'uppercase',
    },
    text_degree: {
        color: '#575757',
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: 10
    },
    text_degree_symbol: {
        textAlignVertical: 'center',
        color: Color.primary_very_lighter,
    },
    container_title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#dadada',
        paddingBottom: 10,
        marginBottom: 10
    },
    container_weather: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text_description: {
        borderBottomWidth: 1,
        borderBottomColor: '#dadada',
        paddingBottom: 10,

        color: '#575757',
        textAlign: 'justify'
    },
    container_widgets: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#dadada',
        paddingBottom: 10,
        marginBottom: 10,
    },
    sunrise_container: {
        width: 75,
        backgroundColor: Color.blue,
        flexDirection: 'row',
        borderRadius: 30,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    sunset_container: {
        width: 80,
        backgroundColor: Color.orange,
        flexDirection: 'row',
        borderRadius: 30,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },


    rain_container: {
        width: 75,
        backgroundColor: Color.secondary,
        flexDirection: 'row',
        borderRadius: 30,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    wind_container: {
        width: 75,
        backgroundColor: '#51a11b',
        flexDirection: 'row',
        borderRadius: 30,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    sunset_text: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5
    },

    sunrise_text: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5
    },
    day_item: {
        borderBottomColor: '#dadada',
        borderBottomWidth: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    week_data: {
        flexDirection: 'row',
        color: '#000',
        alignItems: 'center',
        alignContent: 'center'
    },
    temp_day: {
        color: '#575757',
        fontWeight: 'bold',
        fontSize: 17,
        marginLeft: 10
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

    date: {
        color: '#575757',
        fontWeight: 'bold',
        fontSize: 17,
        marginRight: 10
    },
    sunrise_text: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5
    },

    humidity_text: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5
    },

    time_sys_text: {
        color: '#000'
    },
})
