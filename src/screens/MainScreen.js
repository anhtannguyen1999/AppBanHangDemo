import React, {Component} from 'react'
import {
    StyleSheet,
    Button,
    View,
    ScrollView, Text,
    FlatList,
    TouchableOpacity, Image,
}from 'react-native'
import { Dimensions } from "react-native";
const screenWidth = Math.round(Dimensions.get('window').width);
import ItemOfListUser from '../components/ItemOfListUser';
import Swipeout from 'react-native-swipeout';
export default class MainScreen extends Component{
    render(){
        var DSUser = [
            {
                ten: 'Nguyễn Văn A',
                image: 'https://icon2.cleanpng.com/20181109/svb/kisspng-t-shirt-vector-graphics-clothing-computer-icons-clothing-icons-free-vector-icons-commercial-use-5be6357fb5b484.8227927115418136317443.jpg',
                colorItem: 0,
            },
            {
                ten: 'Lê Văn B',
                image: 'url',
                colorItem: 1,
            },
            {
                ten: 'Nguyễn Văn C',
                image: 'url',
                colorItem: 0,
            },
            {
                ten: 'Lê Văn D',
                image: 'url',
                colorItem: 1,
            },
            {
                ten: 'Nguyễn Văn E',
                image: 'url',
                colorItem: 0,
            },
            {
                ten: 'Lê Văn F',
                image: 'url',
                colorItem: 1,
            },
            {
                ten: 'Nguyễn Văn G',
                image: 'url',
                colorItem: 0,
            },
            {
                ten: 'Lê Văn H',
                image: 'url',
                colorItem: 1,
            },
            {
                ten: 'Lê Văn I',
                image: 'url',
                colorItem: 0,
            },
            {
                ten: 'Lê Văn K',
                image: 'url',
                colorItem: 1,
            },
            {
                ten: 'Lê Văn L',
                image: 'url',
                colorItem: 0,
            },
        ];

        
        return(
            <View style={styles.container}>
                <ScrollView horizontal={false} pagingEnabled={false}>
                    {/* Top song */}
                    <View style={styles.container}>
                        <Text style={styles.tieuDe}>Danh sách User</Text>
                        
                        <FlatList 
                            data={DSUser}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', { item, title: item.ten })} style={{ width: screenWidth }}>
                                        <ItemOfListUser ten={item.ten} image={item.image} colorItem={item.colorItem} />
                                    </TouchableOpacity>
                                
                            }
                            keyExtractor={item => item.ten}

                        />
                    </View>
                </ScrollView>
                
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
        width:'100%'
    },
    tieuDe:{
        fontSize:20,
    },
});

/*
const swipeSetting={
            autoClose=true,
            onClose:(secId,rowId,direction)=>{

            },
            onOpen: (secId, rowId, direction) => {

            },
            right:[
                {
                    onPress:()=>{

                    },
                    text:'Xóa',type:'delete'
                }
            ],
            rowId:this.props.index,
            sectionId:1

        }*/