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
    ImageBackground,
    ToastAndroid,
} from 'react-native';

const BASE_URL = "http://ec2-52-27-149-161.us-west-2.compute.amazonaws.com";

const background = require('../../res/background.png');
const lockIcon = require('../../res/ic_lock.png');
const userIcon = require('../../res/ic_user.png');
var STORAGE_KEY = 'key_access_token';
export default class LoginScreen extends Component {
    constructor(props) {
        super(props);

        // CHU Y XOA DATA MAU!!!!!!!
        this.state = {
            userName: '0335455824',
            password: 'Aj1234567as',
            alertTenDangNhap:'',
            alertMatKhau: '',
        };
    }
    componentDidMount() {
    }
    _onPressLogin(event) {
        if (this.validateTenDangNhap(this.state.userName)==false){
            return;
        }
        
        if(this.validateMatKhau(this.state.password)==false){
            this.setState({ alertMatKhau: 'Mật khẩu không hợp lệ' });
            return;
        }
        console.log(this.state.validPassword);
        if(this.state.validPassword!=undefined||this.state.validUsername!=undefined){
            return;
        }
        ToastAndroid.show('Đăng nhập thành công!', ToastAndroid.SHORT);    
        this.props.navigation.navigate('Profile');
        //this.props.navigation.navigate('Main');
        let serviceUrl = BASE_URL + "/oauth2/token";
        let userName = this.state.userName;
        let password = this.state.password;
        var access_token = '';


        let postData = "grant_type=password&username=" + userName + "&password=" + password;

        fetch(serviceUrl, {
            method: "POST",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: postData
        })
            .then((response) => response.json())
            .then((responseJSON) => {

                var { navigate } = this.props.navigation;
                access_token = responseJSON.access_token;
                if (access_token != undefined) {
                    try {
                        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(responseJSON));
                        //navigate('MainPage');
                        this.props.navigation.navigate('Main');
                    } catch (error) {
                        console.log('AsyncStorage error: ' + error.message);
                    }


                }
                else {
                    Alert.alert('Login failure');
                }

            })
            .catch((error) => {
                console.warn(error);
            });


    }
    static navigationOptions = {
        title: 'Login',
        header: null,
    };

    validateTenDangNhap(userName){
        this.setState({ userName });
        var nameRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var rePhone = /^\d{10,11}$/;
        var validUsername = userName.match(nameRegex);
        var validUsernamePhone = userName.match(rePhone);
        //console.log(validUsername);
        if(userName=='')
        {
            let alertTenDangNhap = 'Tên đăng nhập không được để trống!';
            this.setState({ alertTenDangNhap });
            return false;
        }
        else if (validUsername == null && validUsernamePhone==null) {
            let alertTenDangNhap ='Vui lòng nhập email hoặc số điện thoại!';
            this.setState({alertTenDangNhap});
            return false;
        }
        else{
            let alertTenDangNhap = ' ';
            this.setState({ alertTenDangNhap });
            return true;
        }        
    }
    validateMatKhau(password){
        this.setState({ password });
        const passwordArr = password.split("", password.length);
        let isValidPassword= passwordArr.length >= 8 && passwordArr.filter(p => p === p.toUpperCase()).length > 0 && passwordArr.filter(p => p === p.toLowerCase()).length > 0 ;

        if(!isValidPassword){
            //this.setState({ alertMatKhau: 'Mật khẩu không hợp lệ' });
            return false;
        }            
        else{
            this.setState({ alertMatKhau: '' });
            return true;
        }
            

        // var passRegex = /^[a-zA-Z0-9\-\.\@\_]+$/;
        // var validPassword = password.match(passRegex);
        // //console.log(validPassword);
        // if (userName == '') {
        //     let alertMatKhau = 'Tên đăng nhập không được để trống!';
        //     this.setState({ alertMatKhau });
        // }
        // else if (validUsername == null) {
        //     let alertMatKhau = 'Tên đăng nhập có các ký tự không hợp lệ!';
        //     this.setState({ alertMatKhau });
        // }
        // else {
        //     let alertMatKhau = ' ';
        //     this.setState({ alertMatKhau });
        // }
    }

    render() {
        var { navigate } = this.props.navigation;
        return (
            <ImageBackground style={[styles.container, styles.background]}
                source={background} resizeMode="cover">
                <View style={styles.container} />

                <View style={styles.wrapper}>

                    {/* Tên đăng nhập */}
                    <View style={styles.inputWrap}>

                        <View style={styles.iconWrap}>
                            <Image source={userIcon} resizeMode="contain" style={styles.icon} />
                        </View>

                        <TextInput style={styles.input} placeholder="Tên đăng nhập" onChangeText={(userName) => this.validateTenDangNhap(userName)} underlineColorAndroid="transparent" />
                        
                    </View>
                    {/* warning tendangnhap */}
                    <Text style={styles.validateAlert}>{this.state.alertTenDangNhap}</Text>

                    {/* Mat khau */}
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image source={lockIcon} resizeMode="contain" style={styles.icon} />
                        </View>
                        <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry={true} onChangeText={(password) => this.validateMatKhau(password)} underlineColorAndroid="transparent" />
                    </View>
                    {/* warning mat khau */}
                    <Text style={styles.validateAlert}>{this.state.alertMatKhau}</Text>


                    <TouchableOpacity activeOpacity={.5} onPress={this._onPressLogin.bind(this)} keyboardShouldPersistTaps={true}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}> Đăng nhập</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('ForgotPass')}>
                        <View >
                            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity activeOpacity={.5} onPress={() =>this.props.navigation.navigate('Signup')} keyboardShouldPersistTaps={true}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}> Đăng ký</Text>
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
        marginTop: 5,
        height: 45,
        backgroundColor: "transparent",
        borderRadius:5,
    },
    input: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#FFF',    
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2e86de",
        borderTopLeftRadius:5,
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
        borderRadius:5,
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
    validateAlert:{
        color:'red',
        marginLeft:35,
    },
});