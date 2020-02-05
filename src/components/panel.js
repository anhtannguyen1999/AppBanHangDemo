import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import Order from './order.js'

export default class Panel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FlatList
                style={{ backgroundColor: '' }}
                data={this.props.orders}
                renderItem={({ item }) => <Order order={item} completeOrder={this.props.completeOrder} hideOrder={this.props.hideOrder} cancelOrder={this.props.cancelOrder} orderId={item.id} viewDetail={this.props.viewDetail} />}
                keyExtractor={item => item.id}
            />
        );
    }
}