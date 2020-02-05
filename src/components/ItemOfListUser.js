import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import { Dimensions, Modal } from "react-native";
import PropTypes from 'prop-types';

const screenWidth = Math.round(Dimensions.get('window').width);

export default class ItemOfListUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            menuPopup:false,
        }
    };

   
    render() {
        console.log("a");
        return (
            <View style={this.props.colorItem == 0 ? styles.container : styles.container1}>
                <Image loadingIndicatorSource={require('../../res/user-icon.png')}
                    style={styles.imageStyle} source={this.props.image === 'url' || this.state.isError ? require('../../res/user-icon.png') : { uri: this.props.image }}
                    onError={(e) => this.setState({ isError: true })}></Image>
                
                <Text style={styles.inforStyle}>{this.props.ten + ''}</Text>
                {/* <TouchableOpacity onPress={() => this.setState({ menuPopup: true })}> */}
                <TouchableOpacity>
                    <Image style={{ width: 30, height: 60, marginRight: 10, resizeMode: 'center' }} source={require('../../res/threeDot.png')}></Image>
                </TouchableOpacity>
                {/* <Modal
                    style={{width:50,height:50 ,backgroundColor:'red'}}
                    isVisible={this.state.menuPopup}
                    onBackdropPress={() => {
                        this.setState({ menuPopup: false });
                    }}>
                    <View style={{ backgroundColor: '#fff',width:50,height:50 }}>
                        
                        <View style={{ flexDirection: 'row', margin: 20 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ menuPopupAdd: true });
                                }}>
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: 10,
                                    }}>
                                    <Text>Xóa</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal> */}
               
            </View>
        );
    };
    // https://facebook.github.io/react-native/docs/flatlist

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F0FDFF',
        flexDirection: 'row',
        width: screenWidth,
    },
    container1: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#D9EDF0',
        flexDirection: 'row',
        width: screenWidth,
    },
    inforStyle: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 5, fontStyle: 'normal', fontWeight: 'bold', fontSize: 15
    },
    imageStyle: {
        width: 60,
        height: 60,
        margin: 3,
        resizeMode: 'center'
    }
});
