import React from 'react'
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
} from 'react-native'

const lockIcon = require('../../res//ic_lock.png');
const userIcon = require('../../res//ic_user.png');
const background = require('../../res//background.png');

export default class SignupScreen extends React.Component {
    state = {
        username: '', password: '', email: '', phone_number: '', reEnterPassword: '',
        isValidUsername: true, isValidPassword: true, isValidEmail: true, isValidPhone: true, isValidReEnterPassword: true,
    }
    onChangeText = (key, val) => {

        this.setState({ [key]: val })
    }
    validateUsername(userName) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var rePhone = /^\d{10,11}$/;
        console.log(this.state.username);
        this.setState({ isValidUsername: rePhone.test(userName) || re.test(((userName)).toLowerCase()) });
        this.setState({ username: userName });
        console.log(this.state.username);
    }
    validatePassword(password) {
        console.log(this.state.password);
        const passwordArr = password.split("", password.length);
        this.setState({ isValidPassword: passwordArr.length >= 8 && passwordArr.filter(p => p === p.toUpperCase()).length > 0 && passwordArr.filter(p => p === p.toLowerCase()).length > 0 });

        this.setState({ password });
        console.log(this.state.password);
    }
    validateReEnterPassword(reEnterPassword) {
        console.log(this.state.reEnterPassword);
        this.state.isValidReEnterPassword = this.state.password === reEnterPassword;
        this.setState({ reEnterPassword: reEnterPassword });
        console.log(this.state.reEnterPassword);
    }
    signUp = async () => {
        const { username, password, email, phone_number } = this.state;
        this.props.navigation.navigate("OrderScreen");
    }

    render() {
        return (
            <ImageBackground style={[styles.container, styles.background]}
                source={background} resizeMode="cover">
                <View style={styles.container} />

                <View style={styles.wrapper}>


                    <View style={styles.inputWrap}>

                        <View style={styles.iconWrap}>
                            <Image source={userIcon} resizeMode="contain" style={styles.icon} />
                        </View>

                        <TextInput style={styles.input} placeholder="Tên đăng nhập" onChangeText={(userName) => { this.validateUsername(userName); }} underlineColorAndroid="transparent" />

                    </View>
                    <Text style={styles.validateAlert}>{this.state.isValidUsername ? "" : "Vui lòng nhập email hoặc số điện thoại!"}</Text>


                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image source={lockIcon} resizeMode="contain" style={styles.icon} />
                        </View>


                        <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry={true} onChangeText={(password) => { this.validatePassword(password); }} underlineColorAndroid="transparent" />
                    </View>
                    <Text style={styles.validateAlert}>{this.state.isValidPassword ? "" : "Mật khẩu phải từ 8 kí tự, gồm chữ viết hoa và viết thường"}</Text>


                    <View style={styles.inputWrap}>

                        <View style={styles.iconWrap}>
                            <Image source={lockIcon} resizeMode="contain" style={styles.icon} />
                        </View>


                        <TextInput style={styles.input} placeholder="Nhập lại mật khẩu" secureTextEntry={true} onChangeText={(confirmPassword) => { this.validateReEnterPassword(confirmPassword); }} underlineColorAndroid="transparent" />
                    </View>
                    <Text style={styles.validateAlert}>{this.state.isValidReEnterPassword ? "" : "Mật khẩu xác nhận không trùng"}</Text>

                    <TouchableOpacity activeOpacity={.5} keyboardShouldPersistTaps={true}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}> Đăng ký</Text>
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

        )
    }
}


const styles = StyleSheet.create({
    validateAlert: {
        color: 'red',
        marginLeft: 35,
    },
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
    },
    input: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#FFF',
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