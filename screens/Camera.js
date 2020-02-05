import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert, PermissionsAndroid} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { NavigationEvents } from 'react-navigation';

export default class app_Camera extends React.Component {
    state = {
        hasPermission: null,
        cameraType: Camera.Constants.Type.back,
    }

    async componentDidMount() {
        this.getPermissionAsync()
    }

    getPermissionAsync = async () => {
        // Camera roll Permission 
        if (Platform.OS === 'ios') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        // Camera Permission
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
        //external storage permissions
        // const { status1 } = await Permissions.askAsync(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        // this.setState({ hasPermission: status1 === 'granted' });

    }

    handleCameraType = () => {
        const { cameraType } = this.state

        this.setState({
            cameraType:
                cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
        })
    }

    //   takePicture = async () => {
    //     if (this.camera) {
    //       let photo = await this.camera.takePictureAsync();

    //     }
    //   }

    // takePicture = async () => {
    //     console.log('tpaca');
    //     const { uri } = await this.camera.takePictureAsync();
    //     console.log('uri', uri);
    //     const asset = await MediaLibrary.createAssetAsync(uri);
    //     console.log('asset', asset);
    //     MediaLibrary.createAlbumAsync('Expo', asset)
    //         .then(() => {
    //             Alert.alert('Album created!')
    //         })
    //         .catch(error => {
    //             Alert.alert('An Error Occurred!')
    //         });
    // };

    takePicture = async () => {

        const {navigate} = this.props.navigation;        

        const { uri } = await this.camera
          .takePictureAsync({
            base64: true
          })
          .then(data => {
            this.setState({
              data
            }),
              console.log("data", data);
            return data;
          })
          .catch(err => {
            throw error;
          });
        console.log(uri);
        // const asset = await MediaLibrary.saveToLibraryAsync(uri);
        // const DCIM_id = toString(asset.albumId);
        // const ALBUM_NAME = "Expo";
        const asset = await MediaLibrary.createAssetAsync(uri)
        .then(() => {
            console.log(asset);
          })
          .catch(error => {
            console.log(error);
          });
        // await MediaLibrary.createAlbumAsync(asset);
        // await MediaLibrary.removeAssetsFromAlbumAsync([asset], DCIM_id);
        // MediaLibrary.createAlbumAsync("Expo", asset)
        //   .then(() => {
        //     Alert.alert("Album created!");
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
        navigate('UseImage',{uri: uri});
        //return uri;
      };

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });
        console.log(result);
    }


    render() {
        const { hasPermission } = this.state;

        if (hasPermission === null) {
            return <View />;
        } else if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => { this.camera = ref }}>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 30 }}>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent'
                                }}
                                onPress={() => {
                                    this.pickImage()
                                    // navigate('UseImage',{uri: uri})
                                }}>
                                <Ionicons
                                    name="ios-photos"
                                    style={{ color: "#fff", fontSize: 40 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }}
                                onPress={() => {
                                    const url = this.takePicture()
                                    
                                }}>
                                <FontAwesome
                                    name="camera"
                                    style={{ color: "#fff", fontSize: 40 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }}
                                onPress={() => this.handleCameraType()}
                            >
                                <MaterialCommunityIcons
                                    name="camera-switch"
                                    style={{ color: "#fff", fontSize: 40 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }

}