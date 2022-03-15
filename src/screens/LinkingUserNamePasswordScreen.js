
import React from 'react';
import { Modal,View,Text,StyleSheet,SafeAreaView,Image,ScrollView,TouchableOpacity, Alert} from "react-native";
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import LinkingService from '../service/LinkingService';
import Spinner from 'react-native-spinkit';

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
  }
});

const textInputWhiteBorder = {
    colors: { 
        text: "#FFFFFF",
        background: "#1C843B",
        placeholder: "white",
        primary: "white"
    }
};

const showAlert = () =>
  Alert.alert(
    "Alert",
    "Something went wrong",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
    ],
);

const Loader = ({loading,loaderColor}) =>{
    return (
        <Modal style={styles.loaderModalStyle}
        animationType="slide"
        transparent={true}
        visible={loading}>
        <View style={styles.loaderViewStyle}>
         <Spinner isVisible={true} size={100} type={"Circle"} color={loaderColor ? loaderColor : '#1C843B'}/>
        </View>
      </Modal>
    );
}

const LinkingUserNamePasswordScreen = ({navigation, route}) => {

    const handleContinueButtonPress = async () => {
        try {
            setIsLoading(true);
              const args = {
                id: route.params.id,
                mobile: route.params.mobile,
                username: username,
                password: password,
              }
              console.log(args);
              const response = await LinkingService.linkUserNamePassword(args);
              if (response.data.message != null) {
                console.log(JSON.stringify(response.data));
                if (response.data.message.successMessage.length > 0) {
                  navigation.navigate('Confirm OTP', {
                    temp_id: response.data.temp_id,
                    mobile: response.data.mobile,
                    username: username,
                    // otpId: route.params.id,
                    password: password,
                  });
                } else {
                    showAlert();
                }
              }
          } catch (e) {
            console.log(e);
          } finally {
            setIsLoading(false);
          }
    };

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] =React.useState('');
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);
    const [loading, setIsLoading] = React.useState(false);

    const handleBackPress = () => {
        navigation.goBack();
    };

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
                    <Text style={styles.headerWhite}>Account Details</Text>
                    <Text style={styles.bodyWhite}>Please enter the following details.</Text>
                    <ScrollView>
                        <View style={styles.signInForm}>
                        <TextInput 
                            label= "Username"
                            mode = "outlined"
                            style={{ marginBottom: 10 }}
                            left={
                                <TextInput.Icon
                                name={require('../assets/avatar.png')}
                                color='#fff'
                                />
                            }
                            keyboardType={'default'}
                            important={true}
                            theme={textInputWhiteBorder}
                            text={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            label="Password"
                            mode="outlined"
                            theme={textInputWhiteBorder}
                            style={{marginBottom: 10}}
                            left={
                                <TextInput.Icon
                                name={require('../assets/lock_icon.png')}
                                color='#fff'
                                />
                            }
                            right={
                                <TextInput.Icon
                                name={
                                    passwordVisible
                                    ? require('../assets/password_visible.png')
                                    : require('../assets/password_hide.png')
                                }
                                color="#fff"
                                onPress={() => setPasswordVisible(!passwordVisible)}
                                />
                            }
                            secureTextEntry={!passwordVisible}
                            text={password}
                            // error={!passwordError.isValid}
                            // errorMessage={passwordError.errorMessage}
                            onChangeText={setPassword}
                        />
                        <TextInput
                            label="Confirm Password"
                            mode="outlined"
                            theme={textInputWhiteBorder}
                            style={{marginBottom: 10}}
                            left={
                                <TextInput.Icon
                                name={require('../assets/lock_icon.png')}
                                color='#fff'
                                />
                            }
                            right={
                                <TextInput.Icon
                                name={
                                    confirmPasswordVisible
                                    ? require('../assets/password_visible.png')
                                    : require('../assets/password_hide.png')
                                }
                                color='#fff'
                                onPress={() =>
                                    setConfirmPasswordVisible(!confirmPasswordVisible)
                                }
                                />
                            }
                            secureTextEntry={!confirmPasswordVisible}
                            text={confirmPassword}
                            // error={!confirmPasswordError.isValid}
                            // errorMessage={confirmPasswordError.errorMessage}
                            onChangeText={setConfirmPassword}
                        />
                        </View>
                        <Button 
                            icon={require('../assets/continue.png')}
                            mode="contained"
                            style ={{width: '100%',height: 50, borderRadius: 10, backgroundColor: '#FFC600', padding:5}}
                            onPress = {handleContinueButtonPress}
                            ><Text style={{alignItems:'center'}}>Continue</Text></Button>
                    </ScrollView>
                    <Loader loading={loading} loaderColor={'#FFC600'}/>
                </ScrollView>   
            </View> 
        </SafeAreaView>    
    );
};

export default LinkingUserNamePasswordScreen;