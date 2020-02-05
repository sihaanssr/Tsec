import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert, PermissionsAndroid, Image} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { NavigationEvents } from 'react-navigation';

export default class UseImage extends React.Component{
    render(){
        console.log("asdsd");
        const { navigation } = this.props;  
        const uri = navigation.getParam('uri');  
        console.log(uri);
        return(
            <View>
                <Image 
                    style={{width: 400, height: 800}}
                    source={{ uri }} 
                    resizeMode={'cover'}
                />
            </View>
        );
    }
}