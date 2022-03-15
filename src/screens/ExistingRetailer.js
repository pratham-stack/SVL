import React from 'react';
import { Modal,View,SafeAreaView,Image,StyleSheet,KeyboardAvoidingView, TouchableNativeFeedbackBase,Text, ScrollView,TouchableOpacity, Alert } from "react-native";
import { Button } from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';
import { TextInput } from 'react-native-paper';
import LinkingService from '../service/LinkingService';
import Spinner from 'react-native-spinkit';

// import TextInput from '../TextInput';
// import theme, { textInputWhiteBorder } from '../theme';

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
  dropdownStyle: {
    borderWidth: 1.2,
    height: 55,
    marginTop: 8,
    borderColor: '#fff',
    marginRight: 6,
    padding:8
  }

});
// const TextInput = ({label,mode,style,leftIcon,text,important,theme,keyboardType,onChangeText}) => {
//     return(
//         <View>
//             <PaperTextInput
//             label={<Text>{label} {important && <Text>*</Text>}</Text>}
//             mode={mode} 
//             style={style} 
//             left={leftIcon} 
//             value={text}
//             theme={theme}
//             keyboardType={keyboardType}
//             onChangeText={onChangeText}
//             />
//         </View>
//     );
// }
const showAlert = () =>
  Alert.alert(
    "Alert",
    "Record Not Found",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
    ],
  );

const textInputWhiteBorder = {
    colors: { 
        text: "#FFFFFF",
        background: "#1C843B",
        placeholder: "white",
        primary: "white"
    }
   }

const ExistingRetailer = ({ navigation }) => {

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleContinueButtonPress = () => {
          submitRetailerLinkingData();
    };

    const [businessName, setBusinessName] = React.useState('');
    const [retailerId, setRetailerId] = React.useState('');
    const [ccpNumber, setCCPNumber] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [loading, setIsLoading] = React.useState(false);

    const submitRetailerLinkingData = async () => {
     
        try{
            setIsLoading(true);
            const args = {
                business_name: businessName,
                business_phone: '91' + phoneNumber,
                retailer_ccp_number: ccpNumber,
                retailer_id: retailerId,
              };
            console.log(args);
            const response = await LinkingService.linkRetailer(args);
            console.log(response.data)
            if (response.data.message != null) {
                if (response.data.message.successMessage.length > 0) {
                  navigation.navigate(
                    'Link Username Password',
                    {
                      id: response.data.id,
                      mobile: response.data.mobile,
                      email: response.data.email
                    }
                  )
                console.log("I m inside");
                } else {
                    showAlert();
                }
              }
            }
        catch(e){
            console.error('Error', e);
        }
        finally{
          setIsLoading(false);
        }
    };

    // const validateBusinessName = businessName => {
    //     const result = {
    //       isBusinessNameValid: true,
    //       errorMessage: '',
    //     };
    //     if (businessName == '') {
    //       result.errorMessage = 'Business Name cannot be empty';
    //       result.isBusinessNameValid = false;
    //     }
    //     console.log(result);
    //     return result;
    // };

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
                <Text style={styles.headerWhite}>Existing Retailer</Text>
                <Text style={styles.bodyWhite}>Please provide the following details to link your account</Text>
                <ScrollView>
                <View style={styles.signInForm}>
                    <TextInput label= "Business Name*"
                        mode = "outlined"
                        style={{ marginBottom: 10 }}
                        left={
                            <TextInput.Icon
                            name={require('../assets/business_name.png')}
                            color='#fff'
                            />
                        }
                        keyboardType={'default'}
                        important={true}
                        theme={textInputWhiteBorder}
                        text={businessName}
                        onChangeText={setBusinessName}
                        // error={!businessError.isBusinessNameValid}
                        // errorMessage={businessError.errorMessage}
                        />
                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'center' }}>
                        <View style={styles.dropdownStyle}>
                            <ModalDropdown 
                            defaultValue='+91' 
                            options={['+91','+92','+93']}
                            dropdownTextStyle={{fontSize: 16}}
                            textStyle={{fontSize:16, color:'white', alignItems:'center',alignContent:'center'}}
                            />
                        </View>    
                            <View style={{ flex: 3, width: "100%" }}>
                                <TextInput label= "Registered Mobile Number"
                                    mode = "outlined"
                                    style={{ marginBottom: 10 }}
                                    keyboardType={'default'}
                                    left={
                                        <TextInput.Icon
                                          name={require('../assets/phone.png')}
                                          color='#fff'
                                        />
                                    }
                                    important={true}
                                    theme={textInputWhiteBorder}
                                    text={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                />
                            </View>
                        </View>
                        <TextInput label= "CPP Number"
                        mode = "outlined"
                        style={{ marginBottom: 10 }}
                        left={
                            <TextInput.Icon
                              name={require('../assets/hashtag.png')}
                              color='#fff'
                            />
                        }
                        important={true}
                        theme={textInputWhiteBorder}
                        text={ccpNumber}
                        onChangeText={setCCPNumber}
                        />
                        <TextInput label= "Retailer ID"
                        mode = "outlined"
                        style={{ marginBottom: 10 }}
                        left={
                            <TextInput.Icon
                              name={require('../assets/hashtag.png')}
                              color='#fff'
                            />
                        }
                        important={true}
                        theme={textInputWhiteBorder}
                        text={retailerId}
                        onChangeText={setRetailerId}
                        />
                </View>
                <Button 
                    icon={require('../assets/continue.png')}
                    mode="contained"
                    style ={{width: '100%',height: 50, borderRadius: 10, backgroundColor: '#FFC600', padding:5}}
                    onPress = {handleContinueButtonPress}
                    ><Text style={{alignItems:'center'}}>Continue</Text>
                </Button>
                </ScrollView>
                <Loader loading={loading} loaderColor={'#FFC600'}/>
            </ScrollView>
        </View>
        </SafeAreaView>
    );
}
export default ExistingRetailer;

