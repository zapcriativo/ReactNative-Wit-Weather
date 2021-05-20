import React from 'react';
import { View } from 'react-native';

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

const components = () => {
    return <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
    />;
}

export default components;