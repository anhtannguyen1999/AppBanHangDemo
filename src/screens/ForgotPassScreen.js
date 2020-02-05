import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    Button,
    View,
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    AsyncStorage,
    ToastAndroid,
    ImageBackground,
} from 'react-native';


const BASE_URL = "http://ec2-52-27-149-161.us-west-2.compute.amazonaws.com";
const background = require('../../res//background.png');
const lockIcon = require('../../res//ic_lock.png');
const userIcon = require('../../res//ic_user.png');

export default class ForgotPassScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
            confirmPassword: '',
            secureText:'',
        };
    }
    componentWillMount() {
        console.log("componentWillMount");
    }
    _onPressLogin(event) {
        let serviceUrl = BASE_URL + "/api/account/register";
        let userName = this.state.userName;
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;
        // kiem tra o day  
        fetch(serviceUrl, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': userName,
                'password': password,
                'confirmPassword': confirmPassword
            })



        })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.message == "Success") {
                    var { navigate } = this.props.navigation;
                    navigate('LoginPage');
                    ToastAndroid.show(responseJSON.message, ToastAndroid.SHORT)
                }
            })
            .catch((error) => {
                console.warn(error);
            });


    }
    static navigationOptions = {
        title: 'Sign Up',
        header: null,
    };
    render() {
        var { navigate } = this.props.navigation;
        return (
            <ImageBackground style={[styles.container, styles.background]}
                source={background} resizeMode="cover">
                <View style={styles.container} />

                <View style={styles.wrapper}>


                    <View style={styles.inputWrap}>

                        <View style={styles.iconWrap}>
                            <Image source={userIcon} resizeMode="contain" style={styles.icon} />
                        </View>

                        <TextInput style={styles.input} placeholder="Tên đăng nhập" onChangeText={(userName) => this.setState({ userName })} underlineColorAndroid="transparent" />
                    </View>

                    <View style={styles.inputWrap}>

                        <View style={styles.iconWrap}>
                            <Image source={userIcon} resizeMode="contain" style={styles.icon} />
                        </View>

                        <TextInput style={styles.input} placeholder="Mã xác thực" onChangeText={(secureText) => this.setState({ secureText })} underlineColorAndroid="transparent" />
                    </View>

                    <View style={styles.inputWrap}>

                        <View style={styles.iconWrap}>
                            <Image source={lockIcon} resizeMode="contain" style={styles.icon} />
                        </View>


                        <TextInput style={styles.input} placeholder="Mật khẩu mới" secureTextEntry={true} onChangeText={(password) => this.setState({ password })} underlineColorAndroid="transparent" />
                    </View>

                    <View style={styles.inputWrap}>

                        <View style={styles.iconWrap}>
                            <Image source={lockIcon} resizeMode="contain" style={styles.icon} />
                        </View>


                        <TextInput style={styles.input} placeholder="Nhập lại mật khẩu mới" secureTextEntry={true} onChangeText={(confirmPassword) => this.setState({ confirmPassword })} underlineColorAndroid="transparent" />
                    </View>

                    <TouchableOpacity activeOpacity={.5} onPress={this._onPressLogin.bind(this)} keyboardShouldPersistTaps={true}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}> Gửi</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('Login')}>
                        <View >
                            <Text style={styles.forgotPasswordText}>Hủy</Text>
                        </View>
                    </TouchableOpacity>




                </View>


                <View style={styles.container} />




            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    background: {
        width: null,
        height: null,
    },
    wrapper: {
        paddingHorizontal: 15,
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 5,
        height: 45,
        backgroundColor: "transparent",
        borderRadius: 5,
    },
    input: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#FFF',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,

    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2e86de",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    icon: {
        width: 20,
        height: 20,
    },
    button: {
        backgroundColor: "#2e86de",
        paddingVertical: 8,
        marginVertical: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },


    buttonText: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',

    },
    forgotPasswordText: {
        color: '#341f97',
        backgroundColor: "transparent",
        textAlign: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});