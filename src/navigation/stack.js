import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator, Header } from 'react-navigation-stack';
import LinearGradient from 'react-native-linear-gradient';

import HomeScreen from "../screens/HomeScreen";

const GradientHeader = props => (
  <LinearGradient colors={['#55b5d9', '#0f91bf']} style={[StyleSheet.absoluteFill, { height: Header.HEIGHT }]}>
    <Header {...props} />
  </LinearGradient>
)

const AppNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        header: props => <GradientHeader {...props} />,
        headerTintColor: '#fff',
        headerTitle: 'Forecasts',
        headerStyle: {
          backgroundColor: 'transparent',
          borderBottomWidth: 2,
          borderBottomColor: '#066e94',
        },
      }),
    },
  },
  {
    initialRouteName: "HomeScreen",
  }
)

const Stack = createAppContainer(AppNavigator)
export default Stack