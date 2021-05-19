import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, FlatList } from 'react-native'
import Color from '../helpers/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

SimpleLineIcons.loadFont();
Ionicons.loadFont();

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const Item = ({ title }) => (
    <View style={styles.day_item}>
        <View>
            <View style={styles.humidity_container}>
                <Ionicons name="rainy-outline" size={15} color='#fff' />
                <Text style={styles.humidity_text}>76%</Text>
            </View>
        </View>
        <View style={styles.week_data}>
            <Text>feafaef</Text>
        </View>
    </View>
);

const renderItem = ({ item }) => (
    <Item title={item.title} />
);

const card = () => {

    const [showWeek, setShowWeek] = useState(false)
    const [animated, setAnimated] = useState(new Animated.Value(0))

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
            <View style={styles.container_wheather}>
                {/* col1 */}
                <View>
                    <Text style={styles.text_degree}>86<Text style={styles.text_degree_symbol}>°</Text></Text>
                    <Text style={styles.wheather_text}>CLOUDY</Text>
                    <Text style={styles.city_text}>LISBOA PT</Text>
                </View>

                {/* col2 */}
                <View>
                    <Ionicons name="rainy-outline" size={70} color={Color.secondary} style={{ marginTop: 10 }} />
                </View>

                {/* col3 */}
                <View>
                    <View style={styles.humidity_container}>
                        <Ionicons name="rainy-outline" size={15} color='#fff' />
                        <Text style={styles.humidity_text}>76%</Text>
                    </View>
                    <Text style={styles.day_month_number}>30</Text>
                    <Text style={styles.day_month}>MON</Text>
                </View>
            </View>
            <Animated.View style={[styles.seeDays_list, { height: animated }]}>
                {showWeek && (
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
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
    text_degree: {
        color: '#575757',
        fontSize: 70,
        fontWeight: 'bold'
    },
    text_degree_symbol: {
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
