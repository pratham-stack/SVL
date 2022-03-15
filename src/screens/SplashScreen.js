import React from 'react';
import { View,Image,StyleSheet } from "react-native";
import { StackActions } from '@react-navigation/native';

const logo = require('../assets/logo.png');
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      },

})

const SplashScreen = ({navigation}) => {
    console.log("Splash Screen");
    setTimeout(()=>{
        navigation.dispatch(StackActions.replace('Drawer Navigation'))
        },10);
    return(
        <View style={styles.container}>
            <Image source={logo} />
        </View>
    );
}


export default SplashScreen