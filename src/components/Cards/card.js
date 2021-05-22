import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, FlatList } from 'react-native'

import Color from '../../helpers/colors'

import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';

import WeatherIcons from '../weatherIcons'
import moment from 'moment-timezone';
import Forecast from './forecast'

SimpleLineIcons.loadFont();
Ionicons.loadFont();
Feather.loadFont();


const card = (props) => {
    const [showWeek, setShowWeek] = useState(false)
    const [animated, setAnimated] = useState(new Animated.Value(0))

    const data = props.item

    // Expand and collapse bottom weather card animation
    function ToggleDays() {
        Animated.spring(animated,
            {
                toValue: !showWeek ? 200 : 0,
                useNativeDriver: false,
                friction: 10
            }
        ).start()
        setShowWeek(!showWeek ? true : false)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.container_wheather} onPress={() => props.navigation.navigate('DetailScreen',{
                id: props.item.id,
            })}>
                {/* col1 */}
                <View style={[styles.grid_item, { minWidth: 150 }]}>
                    <Text style={styles.text_degree}>{parseInt(data.main.temp)}<Text style={styles.text_degree_symbol}>{'\u2103'}</Text></Text>
                    <Text style={styles.wheather_text}>{data.weather[0].description}</Text>
                    <Text style={styles.city_text}>{data.name}</Text>
                </View>

                {/* col2 */}
                <View style={[styles.grid_item, , { width: 100 }]}>
                    <WeatherIcons data={data.weather[0].main} size={80}/>
                </View>

                {/* col3 */}
                <View style={[styles.grid_item, { alignItems: 'center' }]}>
                    <View style={styles.humidity_container}>
                        <Ionicons name="rainy-outline" size={15} color='#fff' />
                        <Text style={styles.humidity_text}>{data.clouds.all} %</Text>
                    </View>


                    <View style={styles.sunrise_container}>
                        <Feather name="sunrise" size={15} color='#fff' />
                        <Text style={styles.sunset_text}>{moment.unix(data.sys.sunrise).tz("Europe/Lisbon").format('HH:mm')}</Text>
                    </View>

                    <View style={styles.sunset_container}>
                        <Feather name="sunset" size={15} color='#fff' />
                        <Text style={styles.sunset_text}>{moment.unix(data.sys.sunset).tz("Europe/Lisbon").format('HH:mm')}</Text>
                    </View>


                </View>
            </TouchableOpacity>
            <Animated.View style={[styles.seeDays_list, { height: animated }]}>
                {showWeek && (
                    <Forecast coords={data.coord} />
                )}
            </Animated.View>
            <TouchableOpacity style={styles.seeDays_button} onPress={() => ToggleDays()}>
                <SimpleLineIcons name={showWeek ? "arrow-up" : "arrow-down"} size={20} color={Color.secondary} />
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
    },
    container_wheather: {
        padding: 20,
        paddingBottom: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    grid_item: {
        // alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    text_degree: {
        color: '#575757',
        fontSize: 60,
        fontWeight: 'bold'
    },
    text_degree_symbol: {
        textAlignVertical: 'center',
        color: Color.primary_very_lighter,
    },
    wheather_text: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: Color.secondary
    },
    city_text: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: Color.primary_lighter
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

    sunrise_container: {
        width: 80,
        backgroundColor: Color.blue,
        flexDirection: 'row',
        borderRadius: 30,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
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

    humidity_text: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5
    },

    time_sys_text: {
        color: '#000'
    },

    day_month_number: {
        fontSize: 48,
        fontWeight: 'bold',
        color: Color.primary_lighter,
    },
    day_month: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Color.primary_very_lighter,
        marginTop: -10
    },
    seeDays_button: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e3e3e3',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10
    },
    seeDays_list: {
        backgroundColor: Color.primary_very_lighter,
    },
    day_item: {
        borderBottomColor: Color.primary_very_lighter_2,
        borderBottomWidth: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default card
