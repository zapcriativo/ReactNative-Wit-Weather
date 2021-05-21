import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createAppContainer, } from "react-navigation";
import { createStackNavigator, Header, TransitionPresets } from 'react-navigation-stack';
import Color from '../helpers/colors'

import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";

const AppNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
    },
    DetailScreen: {
      screen: DetailScreen,
    },
  },
  {
    defaultNavigationOptions: (navigation) => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Color.primary_lighter,
      },
    }),
    initialRouteName: "HomeScreen",
  }
)

const Stack = createAppContainer(AppNavigator)
export default Stack