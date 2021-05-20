
import React from 'react'
import Color from '../helpers/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

SimpleLineIcons.loadFont();
Ionicons.loadFont();

const WeatherIcons = (props) => {
    switch (props.data) {
        case 'Thunderstorm':
            return <Ionicons name={'thunderstorm-outline'} size={80} color={Color.secondary} />
            break;
        case 'Drizzle':
            return <Ionicons name={'rainy-outline'} size={80} color={Color.secondary} />
            break;
        case 'Rain':
            return <Ionicons name={'rainy-outline'} size={80} color={Color.secondary} />
            break;
        case 'Snow':
            return <Ionicons name={'snow-outline'} size={80} color={Color.secondary} />
            break;
        case 'Atmosphere':
            return <Ionicons name={'partly-sunny-outline'} size={80} color={Color.secondary} />
            break;
        case 'Clear':
            return <Ionicons name={'sunny-outline'} size={80} color={Color.secondary} />
            break;
        case 'Clouds':
            return <Ionicons name={'cloud-outline'} size={80} color={Color.secondary} />
            break;
        default:
            return <Ionicons name={'rainy-outline'} size={80} color={Color.secondary} />
            break;
    }
}

export default WeatherIcons