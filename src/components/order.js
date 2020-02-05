import React, { Component } from 'react'
import { View, Text, StyleSheet,  TouchableOpacity,Button } from 'react-native'
// import { Card, Button } from 'react-native-elements'

export default class Order extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const ctx = this;
        var { id, date, products, total, isCompleted } = this.props.order;
        let completeButton = null;
        let cancelButton = null;
        let hideButton = null;
        const orderName = () => {
            if (products.length > 0)
                if (products.length > 1)
                    return (<Text>{products[0].name} và {products.length - 1} sản phẩm khác</Text>)
                else
                    return (<Text>{products[0].name}</Text>)
        }
        console.log(orderName)
        if (!isCompleted) {
            completeButton = <Button title="Hoàn thành" buttonStyle={style.button} titleStyle={style.buttonTitle} onPress={() => ctx.props.completeOrder(ctx.props.orderId)} />;
            cancelButton = <Button title="Huỷ" buttonStyle={style.button} titleStyle={style.buttonTitle} onPress={() => ctx.props.cancelOrder(ctx.props.orderId)} />;
        }
        else {
            hideButton = <Button title="Ẩn" buttonStyle={style.button} titleStyle={style.buttonTitle} onPress={() => ctx.props.hideOrder(ctx.props.orderId)} />;
        }
        return (
            <View style={style.order} >
                <TouchableOpacity onPress={() => { ctx.props.viewDetail(products) }}>

                    <View >
                        <Text style={style.orderName}>{orderName()}</Text>
                        <Text>Mã đơn hàng: #{id}  </Text>
                        <Text>Ngày đặt hàng {date}  </Text>
                        <Text style={style.totalPrice}>Tổng giá: {total} </Text>
                    </View>
                    {completeButton}
                    {cancelButton}
                    {hideButton}
                    <View style={style.divider}></View>

                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    button: {
        marginTop: 20,
        backgroundColor: "rgb(33,150,243)",
    },
    buttonTitle: {
        color: 'white',
        fontSize: 20
    }
    ,
    divider: {
        marginTop: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    }
    ,
    order: {
        //backgroundColor: "rgba(191,222,241,1)",

        borderColor: "rgba(94,45,45,1)",
        borderWidth: 0,
        shadowOffset: {
            height: 5,
            width: 5
        },
        shadowColor: "rgba(0,0,0,1)",
        shadowOpacity: 0.44,
        overflow: "visible",
        margin: 12,
    },
    row: {
        flexDirection: 'row',
    },
    orderName: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,

    },
    totalPrice: {
        color: 'red',
        fontSize: 20,
        justifyContent: 'flex-end'
    },
    productName: {
        flex: 1,
    },
    productPrice: {
        flex: 1,
    },
    dropShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,

        elevation: 17,
    }
});