import React from 'react';
import { createAppContainer, } from "react-navigation";
import { createStackNavigator, Header, TransitionPresets } from 'react-navigation-stack';
import Color from '../helpers/colors'

import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";

const AppNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Cities Forecast',
      }
    },
    DetailScreen: {
      screen: DetailScreen,
      navigationOptions: {
        title: 'City Details',
      }
    },
  },
  {
    defaultNavigationOptions: (navigation) => ({
      title: 'Centered',
      headerTitleAlign: 'center',
      ...TransitionPresets.SlideFromRightIOS,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: Color.primary_lighter,
      },
      headerLayoutPreset: 'center'
    }),
    initialRouteName: "HomeScreen",
  }
)

const Stack = createAppContainer(AppNavigator)
export default Stack