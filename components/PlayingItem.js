import React from 'react'
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import TextTicker from 'react-native-text-ticker'

export default function PlayingItem(props) {
   
    const styles = StyleSheet.create({
        container: {
            position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', height: props.height, backgroundColor: '#303030',
    
        },
        button: {
            flex: 10, flexDirection: 'row', width: '100%', textAlignVertical: "center", alignItems: 'center'
        }
    
    })

    if (props.music.id > 0) {
        return (

            <View style={styles.container} >
                <TouchableOpacity style={styles.button} onPress={() => props.handleModal()}>

                    <View style={{ width: '10%', alignItems: 'center', flex: 1 }}>
                        {props.music.playing == 1
                            ?
                            <Icon name="play-circle" color={'white'} size={20}></Icon>
                            :
                            (
                                props.music.playing == 0 ?
                                    <Icon name="stop-circle" color={'white'} size={20}></Icon> :
                                    <Icon name="pause-circle" color={'white'} size={20}></Icon>
                            )
                        }
                    </View>
                    <View style={{ width: '90%', flex: 9 }}>
                        {/* <Text style={{ color: 'white', fontSize: 25 }}></Text> */}
                        <TextTicker style={{ color: 'white', fontSize: 20, width: '100%' }} duration={4000} loop bounce={true} >
                            {props.music.name + ' - ' + props.music.artist}
                        </TextTicker>


                    </View>
                </TouchableOpacity>
            </View>

        )
    } else {
        return (
            <View></View>
        )
    }
    
}

