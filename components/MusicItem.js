import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper'
import TextTicker from 'react-native-text-ticker'
// import { black } from 'react-native-paper/lib/typescript/src/styles/colors';

export default function MusicItem(props) {
    return (
        <React.Fragment>

            <DataTable.Cell style={{ flex: 4 }}>




                <Text style={[(props.music.playing ? styles.textActive : styles.textDefault), styles.text]}>
                    {props.music.name}
                </Text>

            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 4 }}>

                <Text style={props.music.playing ? styles.textActive : styles.textDefault}>

                    {props.music.artist}
                </Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1, justifyContent: 'center' }}>

                <TouchableOpacity onPress={() => { props.handlePlay(props.music.id) }}>
                    {props.music.playing == 1
                        ?
                        <Icon name="play-circle" color={'red'} size={20}></Icon>
                        :
                        (
                            props.music.playing == 0 ?
                                <Icon name="stop-circle" color={'black'} size={20}></Icon> :
                                <Icon name="pause-circle" color={'red'} size={20}></Icon>
                        )
                    }
                </TouchableOpacity>
            </DataTable.Cell>

        </React.Fragment>
    )
}
const colorActive = 'red'

const styles = StyleSheet.create({
    text: {

        display: 'flex',


    },

    textActive: {
        color: 'red',
        fontWeight: '500',
    },
    icon: {
        marginRight: 30,

    },
    textDefault: {
        fontWeight: '300',
        color: 'black'
    }
})