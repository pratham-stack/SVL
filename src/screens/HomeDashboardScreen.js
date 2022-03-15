import {View, Text,SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    mainStyle: {
        flexDirection: 'column',
        flex: 1
    },
    card: {
        paddingTop: 30,
        paddingBottom: 30,
        borderRadius: 5,
        width: '49%',
        height: 200,
        backgroundColor: '#fff',
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
    }

});

const HomeDashboardScreen = () => {
    console.log("Home DAsh");
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <Text>Hello</Text> 
        </View>
    );
}

export default HomeDashboardScreen