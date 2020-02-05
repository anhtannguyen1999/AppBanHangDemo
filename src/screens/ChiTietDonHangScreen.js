import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class ChiTietDonHangScreen extends Component {
    static navigationOptions = {
        title: 'Đơn hàng',
    };
    constructor(props) {
        super(props);

    }
    render() {
        const products = this.props.navigation.getParam("products", {});
        return (
            <View>
                <Text style={style.productTitle}>Sản phẩm:</Text>
                
                <View style={style.break}></View>
                {
                    products.map(product => {
                        return (
                            <View>
                                <View style={style.row}>
                                    <Text style={style.productName}>
                                        {product.name}
                                    </Text>
                                    <Text style={style.productPrice}>
                                        {product.price}
                                    </Text>
                                </View> 
                                <View style={style.break}></View>
                            </View>
                        );
                    })
                }
            </View>

        )
    }
}


const style = StyleSheet.create({
    productTitle: {
        color: 'blue',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20
    },
    row: {
        flexDirection: 'row',
        margin: 10,
        marginLeft: 20
    },
    orderName: {
        color: 'blue',
        fontSize: 30
    },
    totalPrice: {
        color: 'red',
        fontSize: 20,
        justifyContent: 'flex-end'
    },
    productName: {
        flex: 1,
        fontSize: 15
    },
    productPrice: {
        flex: 1,
        color: 'maroon',
        fontWeight: 'bold'
    },
    break: {
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
        margin: 20
    }
});