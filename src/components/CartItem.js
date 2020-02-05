import React, { Component } from 'react';
import {
    View, Dimensions, StyleSheet, Text, Image,
    Button, TextInput,
} from 'react-native';
import MenuScreen from '../screens/MenuScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class CartItem extends Component {
    soLuong = 0;
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
        }
        this.state = {
            soLuong: 0
        }
        this.setState({ soLuong: 1 });
    };
    componentDidMount(){
        this.setState({ soLuong: (this.props.soLuong) });
    }
    render() {
        var maxLenghthMoTa = 55;
        var moTaRutGon = this.props.moTa;
        
        

        if (this.props.moTa.length > maxLenghthMoTa) {
            moTaRutGon = this.props.moTa.substring(0, maxLenghthMoTa - 3) + '...';
        }

        return (
            <View style={[styles.container, { backgroundColor: 'white' }]}>
                <Image loadingIndicatorSource={require('../../res/user-icon.png')}
                    style={styles.imageStyle} source={this.props.image === 'url' || this.state.isError ? require('../../res/user-icon.png') : { uri: this.props.image }}
                    onError={(e) => this.setState({ isError: true })}></Image>
                <View style={{  width: '67%',}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.tenSPStyle}>{this.props.ten + ''}</Text>
                        <View style={{ position: 'absolute', right: 0}}>
                            <TouchableOpacity style={{ backgroundColor: '#fff', width: 20, height: 20, marginTop: 5, alignSelf: 'flex-end' }}>
                                <Text style={{ color: 'rgb(10,99,171)', textAlign: 'center', textAlignVertical: 'center' }}>X</Text>
                            </TouchableOpacity>

                        </View>
                        
                    </View>
                    

                    <Text style={styles.moTaStyle}>{moTaRutGon}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.giaSPStyle}>{(this.props.gia == null ? "0" : this.props.gia) + ' VNĐ'}</Text>
                        <View style={styles.buttonsContainer}>
                            <Button title='-' onPress={() => {
                                this.giamSoLuong();
                            }}></Button>

                            <TextInput style={styles.textInputStyle}
                                keyboardType='numeric'
                                maxLength={3}
                                value={this.state.soLuong + ''}
                                onChangeText={() => { }}>

                            </TextInput>

                            <Button title='+' onPress={() => {
                                this.tangSoLuong();
                            }}></Button>

                        </View>
                    </View>
                    
                    
                </View>

            </View>
        );
    }

    tangSoLuong() {

        if (this.state.soLuong < 998) {
            this.setState({ soLuong: (this.state.soLuong + 1) })
        }
    }
    giamSoLuong() {
        if (this.state.soLuong > 0)
            this.setState({ soLuong: (this.state.soLuong - 1) })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        flexDirection:'row',
        height:100,
    },
    
    imageStyle: {
        backgroundColor:'black',
        width:'30%',
        height:'95%',
        margin: 3,
        resizeMode: 'center'
    },
    tenSPStyle: {
        marginLeft: 3, marginTop: 5, fontStyle: 'normal', fontWeight: 'bold', fontSize: 15,
        color: "rgb(10,99,171)"
    },
    moTaStyle: {
        alignItems: 'flex-start',
        marginLeft: 3,
        marginTop: 1, fontStyle: 'normal', fontSize: 12,
        height:'40%',
        
        color: "#7191a3",
    },
    giaSPStyle: {
        width:'67%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        textAlignVertical:"center",
        marginLeft: 3, marginTop: 0, fontStyle: 'normal', fontWeight: 'bold', fontSize: 15,
        color: "rgb(202,47,253)",
    },
    buttonsContainer: {
        marginTop: 0, marginBottom: 3,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        resizeMode: 'center',
        height: 30,

    },
    textInputStyle: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 0,
        width: 30,
        textAlign: 'center',

    }
    
});