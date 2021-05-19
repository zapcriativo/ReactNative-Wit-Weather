import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AnimatedSplash from "react-native-animated-splash-screen";
import Stack from "./src/navigation/stack";

const App = () => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    loadingFunction()
  }, [])

  function loadingFunction() {
    setTimeout(() => {
      setLoading(true)
    }, 2000);
  }
  
  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={loading}
      logoImage={require("./src/assets/images/logo.png")}
      backgroundColor={"#00A5DF"}
      logoWidht={200}
      logoHeight={200}
    >
      <Stack />
    </AnimatedSplash>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
