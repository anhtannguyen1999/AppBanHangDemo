import React, { Component } from 'react';
import { 
    View, Dimensions, StyleSheet, Text,Image,
    Button, TextInput,
} from 'react-native';
import MenuScreen from '../screens/MenuScreen';


export default class MenuItem extends Component{
    soLuong=0;
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
    render(){
        var maxLenghthMoTa=55;
        var moTaRutGon=this.props.moTa;
        
        if (this.props.moTa.length > maxLenghthMoTa){
            moTaRutGon = this.props.moTa.substring(0, maxLenghthMoTa - 3) + '...';
        }
      
        return (
            <View style={[styles.container, { backgroundColor: 'white' }]}>
                <View style={{height:'71%'}}>
                    <Image loadingIndicatorSource={require('../../res/user-icon.png')}
                        style={styles.imageStyle} source={this.props.image === 'url' || this.state.isError ? require('../../res/user-icon.png') : { uri: this.props.image }}
                        onError={(e) => this.setState({ isError: true })}></Image>
                    <Text style={styles.tenSPStyle}>{this.props.ten + ''}</Text>
                    <Text style={styles.giaSPStyle}>{(this.props.gia == null ? "0" : this.props.gia) + ' VNĐ'}</Text>
                    <Text style={[styles.moTaStyle, ]}>{moTaRutGon}</Text>
                </View>
                
                <View style={{flexDirection:'column'}}>
                    
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
                            this.setState({ numOfSp: 1 });
                        }}></Button>
                        
                    </View>
                    <Button title='Thêm'></Button>
                </View>
                
            </View>
        );
    }

    tangSoLuong(){
        
        if (this.state.soLuong<998){
            this.setState({ soLuong: (this.state.soLuong+1) })
        }
    }
    giamSoLuong(){
        if (this.state.soLuong>0)
            this.setState({ soLuong: (this.state.soLuong - 1) })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    tenSPStyle: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,marginTop: 5, fontStyle: 'normal', fontWeight: 'bold', fontSize: 15,
        color: "blue"
    },
    giaSPStyle: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10, marginTop: 0, fontStyle: 'normal', fontWeight: 'bold', fontSize: 15,
        color: "#0067ab",
    },
    moTaStyle:{
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft:10,
        marginTop: 10, fontStyle: 'normal', fontSize: 12,
        
        color:"#0067ab",
        
    },
    imageStyle: {
        flex:1,
        height: 120,
        margin: 3,
        resizeMode: 'center'
    },
    buttonsContainer:{
        marginTop: 7, marginBottom: 7,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        resizeMode: 'center',
        height:30,
        
    },
    textInputStyle:{
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding:0,
        width:30,
        textAlign:'center',
        
    }
});