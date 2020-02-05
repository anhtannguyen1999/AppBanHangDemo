import React, {Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    Image,
    TextInput,
    ToastAndroid,
} from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome5';
import RNFetchBlob from 'rn-fetch-blob';
import { Alert, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';
const options = {
    title: 'Select Avatar',
    customButtons: [],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

export default class ProfileScreen extends Component{
    static navigationOptions = {
        title:'Thông tin cá nhân'
    };
    constructor(props) {
        super(props);
        this.state = {
            onEditName: false,
            name:'Nguyễn Văn A',
            tempName: 'Nguyễn Văn A',
            onEditPhone: false,
            tempPhone: '0333333333',
            phoneNumber: '0333333333',
            onRePass: false,
            pass: '',
            newPass: '',
            re_newPass: '',
            avatarSource: 'https://anhnendep.net/wp-content/uploads/2018/10/hinh-anh-chibi-nam-cute-lanh-lung-de-thuong-02.jpg',
            email: 'abc@gmail.com',
            tempEmail:'abc@gmail.com',
            onEditEmail:false,
            birth: '01/01/1999',
            id:'ID01',
            onEditDiaChi: false,
            tinh:'Phú Yên',
            quanHuyen:'Đông Hòa',
            phuongXa:'xã Hòa Xuân Tây',
            diaChi:'aaa',
            tempTinh: '',
            tempQuanHuyen: '',
            tempPhuongXa: '',
            tempDiaChi: '',
            listTinhThanh:[],
            listQuanHuyen: [],
            listPhuongXa: [],
        };
        this.setState({ tempDiaChi: this.state.diaChi });
    }
    render(){

        return (
            <View style={styles.container} >
                <View style={{ width: '96%', height: '98%', margin: '2%', marginTop: '2%', backgroundColor: '#ffffffaa', borderRadius: 8 }}>
                    <ScrollView>
                        <View style={[styles.container]} >
                            <View
                                style={{
                                    margin: 10,
                                    flex: 1.2,
                                    alignItems: 'center',
                                    borderWidth: 2,
                                    borderColor: "#0984e3",
                                    borderRadius: 5,
                                    width: '95%',
                                    padding: 5
                                }}>
                                <TouchableOpacity onPress={() => { this._upload() }}>
                                    <Image style={styles.conAvatar} resizeMode={'cover'} source={{ uri: this.state.avatarSource }}></Image>
                                </TouchableOpacity>
                                
                                {/* <Button title="Upload image" onPress={() => { this._upload() }} style={{borderRadius:5}}></Button> */}
                            </View>

                            <View
                                style={{
                                    margin: 10,
                                    justifyContent: 'flex-start',
                                    flex: 2,
                                    width: '100%',
                                }}>
                                <View style={styles.conItem}>
                                    <Text> </Text>
                                    <Icon name="id-card" size={20}></Icon>
                                    <Text> ID: {this.state.id}</Text>
                                </View>

                                <View style={styles.conItem}>
                                    <Text> </Text>
                                    <Icon name="signature" size={20}></Icon>
                                    <Text> Tên:   </Text>
                                    <TextInput
                                        style={{ height: 45, width: '45%',color:'black' }}
                                        value={this.state.onEditName == false ? this.state.name : this.state.tempName}
                                        placeholder={'Chưa có'}
                                        editable={this.state.onEditName}
                                        onChangeText={(text) => { if (this.state.onEditName) this.setState({ tempName: text }) }}
                                        disableFullscreenUI={false}></TextInput>
                                    {this._renderEdit('updateName')}
                                    
                                </View>

                                <View style={styles.conItem}>
                                    <Text> </Text>
                                    <Icon name="envelope" size={20}></Icon>
                                    <Text> E-mail: </Text>
                                    <TextInput
                                        style={{ height: 45, width: '45%', color: 'black' }}
                                        value={this.state.onEditEmail == false ? this.state.email : this.state.tempEmail}
                                        placeholder={'Chưa có'}
                                        editable={this.state.onEditEmail}
                                        onChangeText={(text) => { if (this.state.onEditEmail) this.setState({ tempEmail: text }) }}
                                        disableFullscreenUI={false}></TextInput>
                                    {this._renderEdit('updateEmail')}
                                </View>

                                <View style={styles.conItem}>
                                    <Text> </Text>
                                    <Icon name="phone" size={20}></Icon>
                                    <Text> SĐT: </Text>
                                    <TextInput
                                        style={{ height: 45, width: '45%', color: 'black' }}
                                        value={this.state.onEditPhone == false ? this.state.phoneNumber : this.state.tempPhone}
                                        placeholder={'Chưa có'}
                                        keyboardType='numeric'
                                        editable={this.state.onEditPhone}
                                        onChangeText={(text) => { if (this.state.onEditPhone) this.setState({ tempPhone: text }) }}
                                        disableFullscreenUI={false}></TextInput>

                                    {this._renderEdit('updatePhone')}
                                </View>
                                {this._renderLocation()}
                                {this._renderRePass()}
                                <TouchableOpacity onPress={() => { this._signout() }}>
                                    <View style={styles.conItem}>



                                        <Text> </Text>
                                        <Icon name="sign-out-alt" size={20}></Icon>
                                        <Text> Đăng xuất</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }


    //KHAC
    _renderEdit(type) {
        if (type == 'updateName') {
            if (this.state.onEditName == false) {
                return (
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            alignItems:'flex-end',
                            justifyContent: 'space-evenly',
                            
                        }}>
                        <TouchableOpacity onPress={() => this.setState({ onEditName: true })}>
                            <Icon name="edit" size={20}></Icon>
                        </TouchableOpacity>
                    </View>
                );
            } else {
                return (
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            alignItems: 'center',
                            
                            //justifyContent: 'space-evenly',
                            alignSelf:'center'
                        }}>
               
                        <TouchableOpacity onPress={() => { this._updateName() }} style={{flex:.5,alignItems:'flex-end'}}>
                            <Icon name="check" size={20}></Icon>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.setState({ onEditName: false })} style={{ marginLeft: 10, flex: .5, }}>
                            <Icon name="window-close" size={20}></Icon>
                        </TouchableOpacity>
                    </View>
                );
            }

        }
        else if (type == 'updatePhone') {
                if (this.state.onEditPhone == false) {
                    return (

                        <View
                            style={{
                                flexDirection: 'row',
                                flex: 1,
                                alignItems: 'flex-end',
                                justifyContent: 'space-evenly',
                            }}>
                            <TouchableOpacity onPress={() => this.setState({ onEditPhone: true })}>
                                <Icon name="edit" size={20}></Icon>
                            </TouchableOpacity>
                        </View>
                    );
                } else {
                    return (
                        <View
                            style={{
                                flexDirection: 'row',
                                flex: 1,
                                alignItems: 'flex-start',
                                //justifyContent: '',
                            }}>
                            <TouchableOpacity onPress={() => { this._updatePhone() }} style={{ flex: .5, alignItems: 'flex-end' }}>
                                <Icon name="check" size={20}></Icon>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.setState({ onEditPhone: false })} style={{ marginLeft: 10, flex: .5,  }}>
                                <Icon name="window-close" size={20}></Icon>
                            </TouchableOpacity>

                        </View>

                    );
                }
        }
        else if (type =='updateEmail'){
            if (this.state.onEditEmail == false) {
                return (
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'space-evenly',
                        }}>
                        <TouchableOpacity onPress={() => this.setState({ onEditEmail: true })}>
                            <Icon name="edit" size={20}></Icon>
                        </TouchableOpacity>
                    </View>
                );
            } else {
                return (
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            alignItems: 'flex-end',
                                                        
                            //justifyContent: 'space-evenly',
                        }}>
                        <TouchableOpacity onPress={() => { this._updateEmail() }} style={{ flex: .5, alignItems: 'flex-end' }} >
                            <Icon name="check" size={20}></Icon>
                        </TouchableOpacity>
                        <Text> </Text>
                        <TouchableOpacity onPress={() => this.setState({ onEditEmail: false })} style={{ marginLeft: 10, flex: .5, }}>
                            <Icon name="window-close" size={20}></Icon>
                        </TouchableOpacity>
                    </View>
                );
            }
        }
    }

    _renderRePass() {
        if (!this.state.onRePass)
            return (
                <TouchableOpacity onPress={() => { this.setState({ onRePass: true }) }}>
                    <View style={styles.conItem}>
                        <Text> </Text>
                        <Icon name="lock" size={20}></Icon>
                        <Text> Đổi mật khẩu </Text>
                        <TextInput
                            secureTextEntry={true}
                            style={{ height: 45, width: '65%' }}
                            value={"aaaaaaaaaaaaaaaaaaaaaa"}
                            placeholder={'null'}
                            editable={false}
                            onChangeText={(text) => { if (this.state.onEditPhone) this.setState({ tempPhone: text }) }}
                            disableFullscreenUI={false}></TextInput>
                    </View>
                </TouchableOpacity>
            )
        else {
            return (
                <View style={{ borderColor: '#ffffff02', borderWidth: 3, width: '96%', borderRadius: 5 }}>
                    <View style={styles.conPass}>
                        <Text> </Text>
                        <Icon name="lock" size={20}></Icon>
                        <Text> Mật khẩu hiện tại: </Text>
                        <TextInput
                            ref={'currentPass'}
                            secureTextEntry={true}
                            style={{ height: 45, width: '65%' }}
                            placeholder={'******'}
                            editable={true}
                            onChangeText={(text) => { if (this.state.onRePass) this.setState({ pass: text }) }}
                            disableFullscreenUI={false}></TextInput>
                    </View >
                    <View style={styles.conPass}>
                        <Text> </Text>
                        <Icon name="unlock" size={20}></Icon>
                        <Text> Mật khẩu mới: </Text>
                        <TextInput
                            ref={'newPass1'}
                            secureTextEntry={true}
                            style={{ height: 45, width: '65%' }}
                            placeholder={'******'}
                            editable={true}
                            onChangeText={(text) => { if (this.state.onRePass) this.setState({ newPass: text }) }}
                            disableFullscreenUI={false}></TextInput>
                    </View>
                    <View style={styles.conPass}>
                        <Text> </Text>
                        <Icon name="unlock-alt" size={20}></Icon>
                        <Text> Nhập lại mật khẩu mới: </Text>
                        <TextInput
                            ref={'newPass2'}
                            secureTextEntry={true}
                            style={{ height: 45, width: '65%' }}
                            placeholder={'******'}
                            editable={true}
                            onChangeText={(text) => { if (this.state.onRePass) this.setState({ re_newPass: text }) }}
                            disableFullscreenUI={false}></TextInput>
                    </View>

                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Button style={{ margin: 5 }}
                            title="Ok" onPress={() => { this._changePassword(this.state.pass, this.state.newPass) }} style={{}}></Button>
                        <Button style={{ margin: 5,marginTop:10 }}
                            title="Hủy" onPress={() => { this.setState({ onRePass: false }) }}></Button>

                    </View>

                </View>
            )
        }
    }

    _renderLocation() {
        if (!this.state.onEditDiaChi)
            return (
                    <View style={styles.conItem}>
                        <Text> </Text>
                        <Icon name="dumpster" size={20}></Icon>
                        <Text> Địa chỉ: </Text>
                        <TextInput
                            style={{ height: 45, width: '65%',color:'black' }}
                            value={''+this.state.diaChi+','+this.state.phuongXa+','+this.state.quanHuyen+','+this.state.tinh}
                            placeholder={'null'}
                            editable={true}
                            
                            disableFullscreenUI={false}></TextInput>
                    <TouchableOpacity onPress={() => { this.setState({ onEditDiaChi: true }); }}>
                            <Icon name="edit" size={20}></Icon>
                        </TouchableOpacity>
                    </View>
            )
        else {
            
            var listTinhThanh=[];
            //await
            fetch('https://thongtindoanhnghiep.co/api/city').then(response => {
                    return response.json();
                }).then(response => {
                    response.LtsItem.forEach(element => {
                        listTinhThanh.push({ label: element.Title, value: element.ID});
                        
                    });
                    this.setState({listTinhThanh});
                    //console.log(this.state.listTinhThanh);
            });
            //console.log(listTinhThanh);
            return (
                <View style={{ borderColor: '#ffffff02', borderWidth: 3, width: '96%', borderRadius: 5 }}>
                    
                    <View style={styles.conPass}>
                        <Text> </Text>
                        <Icon name="dumpster" size={20}></Icon>
                        <Text> Địa chỉ: </Text>
                    </View >
                    <RNPickerSelect
                        style={{color:'black'}}
                        placeholderTextColor='black'
                        onValueChange={async (value, index) => { 
                            await this.setState({ tempTinh: this.state.listTinhThanh[index-1].label}); 
                            await this.setState({ listQuanHuyen:[]});
                            await this.setState({ listPhuongXa: [] });
                            await this._getQuanHuyen(value)}}
                        placeholder={{label: 'Chọn tỉnh/thành phố'}}
                        items={this.state.listTinhThanh}
                    />
                    <RNPickerSelect
                        style={{ color: 'black' }}
                        placeholderTextColor='black'
                        onValueChange={async (value, index) => { 
                            await this.setState({ tempQuanHuyen : this.state.listQuanHuyen[index-1].label });
                            await this.setState({ listPhuongXa: [] });
                            this._getPhuongXa(value)}}
                        placeholder={{ label: 'Chọn quận/huyện' }}
                        items={this.state.listQuanHuyen}
                    />
                    <RNPickerSelect
                        style={{ color: 'black' }}
                        placeholderTextColor='black'
                        onValueChange={(value,index) => this.setState({ tempPhuongXa: this.state.listPhuongXa[index-1].label })}
                        placeholder={{ label: 'Chọn phường/xã' }}
                        items={this.state.listPhuongXa}
                    />
                    
                    <View style={{flexDirection:'row',marginBottom:2}}>
                        <Text> </Text>
                        <Text style={{textAlignVertical:"center"}}> Địa chỉ: </Text>
                        <TextInput
                            style={{minWidth:'65%'}}
                            placeholder={this.state.tempDiaChi}
                            value={this.state.tempDiaChi}
                            editable={true}
                            onChangeText={(text) => { if (this.state.onEditDiaChi) this.setState({ tempDiaChi: text }) }}
                            disableFullscreenUI={false}></TextInput>
                            
                    </View>
                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Button style={{ margin: 5 }}
                            title="Ok" onPress={() => { this._changeDiaChi(); this.setState({ onEditDiaChi: false }) }} style={{}}></Button>
                        <Button style={{ margin: 5, marginTop: 10 }}
                            title="Hủy" onPress={() => { this.setState({ onEditDiaChi: false }) }}></Button>

                    </View>

                </View>
            )
        }
    }



    _signout(){
        ToastAndroid.show('Đã đăng xuất!', ToastAndroid.SHORT);
        this.props.navigation.navigate('Login');
    }

    _updateName(){
        this.setState({ name: this.state.tempName });
        this.setState({ onEditName: false });
        ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
    }

    _updateEmail(){
        this.setState({ email: this.state.tempEmail });
        this.setState({ onEditEmail: false });
        ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
    }
    _updatePhone(){
        this.setState({ phoneNumber: this.state.tempPhone });
        this.setState({ onEditPhone: false });
        ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
    }
    _changePassword(){
        this.setState({ onRePass: false });
        ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
    }

    _upload() {
        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                //console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            } else {


                const source = { uri: response.uri };
                this.uploadImage(response.uri).then(url => {
                    // FirebaseApp.auth().currentUser.updateProfile({ photoURL: url }), this.setState({
                    //     avatarSource: url,
                    // }), console.log(this.state.avatarSource)
                })
                    ;
            }
        });
    }

    uploadImage(uri, mime = 'image/jpeg', name) {
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        return new Promise((resolve, reject) => {
            let imgUri = uri; let uploadBlob = null;
            const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
            //const { currentUser } = FirebaseApp.auth();
           // const imageRef = FirebaseApp.storage().ref("images").child(`${currentUser.uid}.jpg`)

            fs.readFile(uploadUri, 'base64')
                .then(data => {
                    return Blob.build(data, { type: `${mime};BASE64` });
                })
                .then(blob => {
                    uploadBlob = blob;
                    return imageRef.put(blob, { contentType: mime, name: name });
                })
                .then(() => {
                    uploadBlob.close()
                   // console.log("link" + imageRef.getDownloadURL())

                    //return imageRef.getDownloadURL();
                    return 'https://anhnendep.net/wp-content/uploads/2018/10/hinh-anh-chibi-nam-cute-lanh-lung-de-thuong-02.jpg';

                })
                .then(url => {
                    resolve(url);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
    _getQuanHuyen(ID){
        
        var listQuanHuyen = [];
        //await
        fetch('https://thongtindoanhnghiep.co/api/city/'+ID+'/district').then(response => {
            return response.json();
        }).then(response => {
            response.forEach(element => {
                if (!element.Title.startsWith('Số '))
                    listQuanHuyen.push({ label: element.Title, value: element.ID });
            });
            this.setState({ listQuanHuyen });
            //console.log(this.state.listQuanHuyen);
        });
    }
    _getPhuongXa(ID){
        var listPhuongXa = [];
        //await
        fetch('https://thongtindoanhnghiep.co/api/district/'+ID+'/ward').then(response => {
            return response.json();
        }).then(response => {
            response.forEach(element => {
                listPhuongXa.push({ label: element.Title, value: element.ID });
            });
            this.setState({ listPhuongXa });
            //console.log(this.state.listPhuongXa);
        });
    }

    _changeDiaChi(){
        this.setState({tinh:this.state.tempTinh});
        this.setState({ quanHuyen: this.state.tempQuanHuyen });
        this.setState({ phuongXa: this.state.tempPhuongXa });
        this.setState({ diaChi: this.state.tempDiaChi });
        ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff66',
        flexDirection: 'column',
        borderRadius: 8,
    },
    conAvatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#81ecec',
        borderColor: '#0984e3',
        borderWidth: 5,
    },
    conItem: {
        height: 45,
        flexDirection: 'row',
        width: '95%',
        borderColor: '#0984e3',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        margin: 2,
        alignContent: 'center',
    },
    conPass: {
        height: 45,
        flexDirection: 'row',
        width: '99%',
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        margin: 2,
        alignContent: 'center',

    },

    input: { maxHeight: 45 },
    inputContainer: {
        flex: 1,
        display: 'flex',
        flexShrink: 0,
        flexGrow: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#0984e3',
        paddingVertical: 13,
        paddingLeft: 12,
        paddingRight: '5%',
        width: '100%',
        justifyContent: 'flex-start',
        borderRadius: 8,
    },
});
