import React, {useState} from 'react';
import {View,SafeAreaView,Image,StyleSheet,KeyboardAvoidingView, TouchableNativeFeedbackBase,Text, ScrollView,TouchableOpacity } from "react-native";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backButtonStyle: {
        marginBottom: 20,
    },
    footer: {
      flex: 2,
      backgroundColor: '#1C843B',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
    },
    headerWhite: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF'
    },
    bodyWhite: {
        fontSize: 16,
        color: '#FFFFFF'
    },
    signInForm: {
        marginTop: 20,
    },
    header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
    },
    dropDowncontainerStyle:{
        flex:1,
        flexDirection:'row',
        borderRadius:6,
        borderWidth:1,
        borderColor:'white'
    },

        dropDownButtonStyle:{
        justifyContent:'center',
        marginStart:2
    },
    loaderModalStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#000000',
        opacity:0.1
    },
    loaderViewStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0, 0, 0, .1)'
    },
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20, flex: 1, justifyContent: 'space-evenly' },
    cell: {
        width: 50,
        height: 50,
        lineHeight: 45,
        fontSize: 28,
        borderWidth: 2,
        color: '#fff',
        borderColor: '#fff',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#fff',
    }
});

const CELL_COUNT = 6;

const ConfirmOTPScreen = ({ route, navigation }) => {

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const handleContinueButtonPress = () => {
        console.log(value);
    };
    const handleBackPress = () => {
        navigation.goBack()
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            <Image
                source={require('../assets/logo.png')}
            />
            </View>
            <View style={styles.footer}>
                <ScrollView>
                    <TouchableOpacity activeOpacity={0.9} onPress={handleBackPress}>
                    <Image
                    style={styles.backButtonStyle}
                    source={require('../assets/back_button.png')}
                    />
                    </TouchableOpacity>
                    <Text style={styles.headerWhite}>OTP Verification</Text>
                    <Text style={styles.bodyWhite}>Please enter OTP that you have received on your registered mobile number</Text>
                    <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({index, symbol, isFocused}) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                        )}
                    />
                    <Button 
                    icon={require('../assets/continue.png')}
                    mode="contained"
                    style ={{width: '100%',height: 50, borderRadius: 10, backgroundColor: '#FFC600', padding:5, marginTop: 20}}
                    onPress = {handleContinueButtonPress}
                    ><Text style={{alignItems:'center'}}>Continue</Text>
                    </Button>
                    <Button 
                    icon={require('../assets/btn_resend_otp.png')}
                    mode="contained"
                    style ={{width: '100%',height: 50, borderRadius: 10, backgroundColor: '#1C843B', padding:5, marginTop: 20, borderWidth: 2, borderColor:'#fff'}}
                    onPress = {handleContinueButtonPress}
                    ><Text style={{alignItems:'center'}}>Resend</Text>
                    </Button>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
export default ConfirmOTPScreen;