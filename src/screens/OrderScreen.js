import React, { Component } from 'react'
import { View, Text, Dimensions, Alert } from 'react-native'
import data from './import.json'
import OrderPanel from './../components/panel'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'


export default class OrderScreen extends Component {
    static navigationOptions = {
        title: 'Quản lý đơn hàng',
    };
    constructor(props) {
        super(props);
        const ctx = this;
        this.viewDetail = function (products) {
            ctx.props.navigation.navigate('DetailScreen', { products: products });
        }
        this.completeOrder = function (orderId) {
            Alert.alert(
                'Hoàn thành đơn hàng',
                'Bạn chắc chắn hoàn thành đơn hàng này ?',
                [
                    {
                        text: "Có",
                        onPress: () => {
                            ctx.state.orders.forEach(o => { if (o.id === orderId) o.isCompleted = true });
                            console.log(orderId);
                            ctx.setState({
                                orders: data.orders.filter(d => !d.isCompleted && !d.isCanceled),
                                completedOrder: data.orders.filter(d => d.isCompleted && !d.isHidden)
                            });
                        }
                    },
                    {
                        text: "Không",
                        onPress: () => { },
                        style: "cancel"
                    }
                ]
            );

        }
        this.cancelOrder = function (orderId) {
            Alert.alert(
                'Huỷ đơn hàng',
                'Bạn chắc chắn huỷ đơn hàng này ?',
                [
                    {
                        text: "Có",
                        onPress: () => {
                            ctx.state.orders.forEach(o => { if (o.id === orderId) o.isCanceled = true });
                            console.log(orderId);
                            ctx.setState({
                                orders: data.orders.filter(d => !d.isCompleted && !d.isCanceled),
                                completedOrder: data.orders.filter(d => d.isCompleted && !d.isHidden)
                            });
                        }
                    },
                    {
                        text: "Không",
                        onPress: () => { },
                        style: "cancel"
                    }
                ]
            );

        }


        this.hideOrder = function (orderId) {
            Alert.alert(
                'Ẩn đơn hàng',
                'Bạn chắc chắn ẩn đơn hàng này ?',
                [
                    {
                        text: "Có",
                        onPress: () => {
                            ctx.state.completedOrder.forEach(o => { if (o.id === orderId) o.isHidden = true });
                            ctx.state.orders.forEach(o => { console.log(o.id) });
                            console.log("Hide order " + orderId);
                            ctx.setState({
                                orders: data.orders.filter(d => !d.isCompleted && !d.isCanceled),
                                completedOrder: data.orders.filter(d => d.isCompleted && !d.isHidden)
                            });
                        }
                    },
                    {
                        text: "Không",
                        onPress: () => { },
                        style: "cancel"
                    }
                ]
            );

        }
        this.state = {
            index: 0,
            routes: [
                {
                    key: 'first',
                    title: 'Đơn hàng đang xử lý',
                },
                {
                    key: 'second',
                    title: 'Đơn hàng đã xong',
                }
            ],
            orders: [],
            completedOrder: []
        }
    }



    componentDidMount() {
        //Fetch data from server
        this.setState({
            orders: data.orders.filter(d => !d.isCompleted && !d.isCanceled),
            completedOrder: data.orders.filter(d => d.isCompleted && !d.isHidden)
        });

    }

    render() {
        if (this.state.orders.length == 0)
            return (<Text>Loading</Text>)
        this.FirstRoute = () => (<OrderPanel orders={this.state.orders} cancelOrder={this.cancelOrder} completeOrder={this.completeOrder} viewDetail={this.viewDetail} />)
        this.SecondRoute = () => (<OrderPanel orders={this.state.completedOrder} hideOrder={this.hideOrder} viewDetail={this.viewDetail} />)
        const initialLayout = { width: Dimensions.get('window').width };
        const renderScene = SceneMap({
            "first": this.FirstRoute,
            "second": this.SecondRoute,
        });
        var index = this.state.index;
        var routes = this.state.routes;
        return (
            <TabView
                renderTabBar={(props) => <TabBar {...props} activeColor='green' indicatorStyle={{ backgroundColor: 'blue', height: 2 }} labelStyle={{ color: 'gray', fontWeight: 'bold' }} style={{ backgroundColor: 'white' }} />}

                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={(index) => { this.setState({ index: index }) }}
            />
        );
    }
}
