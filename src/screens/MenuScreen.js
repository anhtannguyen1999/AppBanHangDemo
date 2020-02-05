import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import MenuItem from '../components/MenuItem'
export default class MenuScreen extends Component{
    constructor(props) {
        super(props);
    };
    onClick = () => {
        this.MenuItem.method() // do stuff
    }
    render(){
        var DSMenuItem = [
            {
                ten: 'Sản phẩm 1',
                moTa:'Mô tả 1',
                gia:10000,
                image: 'https://icon2.cleanpng.com/20181109/svb/kisspng-t-shirt-vector-graphics-clothing-computer-icons-clothing-icons-free-vector-icons-commercial-use-5be6357fb5b484.8227927115418136317443.jpg',
                trangThai: 1,
            },
            {
                ten: 'Sản phẩm 2',
                moTa: 'As long as the container of the Text element has a Flex value (I use, 1), the text will be truncated within the container.',
                gia: 10000,
                image: 'https://icon2.cleanpng.com/20181109/svb/kisspng-t-shirt-vector-graphics-clothing-computer-icons-clothing-icons-free-vector-icons-commercial-use-5be6357fb5b484.8227927115418136317443.jpg',
                trangThai: 1,
            },
            {
                ten: 'Sản phẩm 3',
                moTa: 'Mô tả 1',
                gia: 10000,
                image: 'https://icon2.cleanpng.com/20181109/svb/kisspng-t-shirt-vector-graphics-clothing-computer-icons-clothing-icons-free-vector-icons-commercial-use-5be6357fb5b484.8227927115418136317443.jpg',
                trangThai: 0,
            },
            {
                ten: 'Sản phẩm 4',
                moTa: 'Mô tả 1',
                gia: 10000,
                image: 'https://icon2.cleanpng.com/20181109/svb/kisspng-t-shirt-vector-graphics-clothing-computer-icons-clothing-icons-free-vector-icons-commercial-use-5be6357fb5b484.8227927115418136317443.jpg',
                trangThai: 1,
            },
            {
                ten: 'Sản phẩm 5',
                moTa: 'Mô tả 3',
                gia: 10000,
                image: 'https://icon2.cleanpng.com/20181109/svb/kisspng-t-shirt-vector-graphics-clothing-computer-icons-clothing-icons-free-vector-icons-commercial-use-5be6357fb5b484.8227927115418136317443.jpg',
                trangThai: 1,
            },
            {
                ten: 'Sản phẩm 6',
                moTa: 'Mô tả 1',
                gia: 10000,
                image: 'https://icon2.cleanpng.com/20181109/svb/kisspng-t-shirt-vector-graphics-clothing-computer-icons-clothing-icons-free-vector-icons-commercial-use-5be6357fb5b484.8227927115418136317443.jpg',
                trangThai: 0,
            },
            {
                ten: 'Sản phẩm 7',
                moTa: 'Mô tả 1',
                gia: 10000,
                image: 'https://icon2.cleanpng.com/20181109/svb/kisspng-t-shirt-vector-graphics-clothing-computer-icons-clothing-icons-free-vector-icons-commercial-use-5be6357fb5b484.8227927115418136317443.jpg',
                trangThai: 1,
            },
            {
                ten: 'Sản phẩm 8',
                moTa: 'Mô tả 3',
                gia: 10000,
                image: 'https://icon2.cleanpng.com/20181109/svb/kisspng-t-shirt-vector-graphics-clothing-computer-icons-clothing-icons-free-vector-icons-commercial-use-5be6357fb5b484.8227927115418136317443.jpg',
                trangThai: 1,
            }, {
                ten: 'Sản phẩm 8',
                moTa: 'Mô tả 3',
                gia: 10000,
                image: 'https://icon2.cleanpng.com/20181109/svb/kisspng-t-shirt-vector-graphics-clothing-computer-icons-clothing-icons-free-vector-icons-commercial-use-5be6357fb5b484.8227927115418136317443.jpg',
                trangThai: 1,
            },]
        return (
            <View>
                <View style={{ marginBottom: "3%", backgroundColor:'#deedff' }}>
                    <FlatList style={{ margin: 5, backgroundColor:'#deedff'}}
                        extraData={this.state}
                        data={DSMenuItem}
                        numColumns={2}
                        renderItem={({ item }) =>
                            <View style={[styles.containerRow]}>
                                <MenuItem ten={item.ten} moTa={item.moTa} image={item.image} trangThai={item.trangThai} gia={item.gia}></MenuItem>
                            </View>

                        }
                        keyExtractor={item => item.ten}

                    />
                    
                </View>
            </View>
            
            

        );
    }
}

const styles = StyleSheet.create({
    containerRow: {
        flex: .5,
        margin: 5,
    },
    menuItem:{
        flex:.2,
    },
    blueText:{
        color:"#0073ff",
        textAlign:'center',
        width: "49%", textAlignVertical: "center", fontSize: 23, marginLeft: 10
    }
});

//<View style={[styles.menuItem, { backgroundColor: '#ff9081' }]}></View>