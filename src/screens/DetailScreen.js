import React, {Component} from 'react';
import { View, Dimensions ,StyleSheet,Text} from 'react-native';
import { TabView, SceneMap} from 'react-native-tab-view';
import MenuScreen from './MenuScreen';
import CartScreen from './CartScreen';
import OrderScreen from './OrderScreen';
const FirstRoute = () => (
  <MenuScreen></MenuScreen>
);

const SecondRoute = () => (
  <CartScreen></CartScreen>
);

const ThirdRoute = () => (
  <OrderScreen></OrderScreen>
);

export class DetailScreen extends Component{
  // static navigationOptions = ({ navigation }) => ({
  //   title: `${navigation.state.params.title} `,
  //   // headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
  //   // headerStyle: {
  //   //   backgroundColor: 'white',
  //   // },
  // });
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    console.log(navigation);
    return {
      title: `${state.params.title}`,
    };
  };
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Menu' },
      { key: 'second', title: 'Giỏ hàng' },
      { key:'third', title: 'Đơn hàng'},
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={{fontSize:20, textAlign:'center', color:'blue'}}>{this.props.navigation.state.params.item.ten}</Text> */}
        
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute,
            third: ThirdRoute,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
      </View>
      
    );
  }  
}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  }, 
  container: {
    flex: 1,
  },
});