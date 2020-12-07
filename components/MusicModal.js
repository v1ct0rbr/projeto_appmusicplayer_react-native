import React, { useEffect, useState } from "react";
import {

    LogBox,
    Modal,
    StyleSheet,
    Text,

    TouchableOpacity,
    View,

} from "react-native";
import { ProgressBar, Colors } from 'react-native-paper'
import TextTicker from "react-native-text-ticker";
import Icon from 'react-native-vector-icons/FontAwesome5'
import Slider from '@react-native-community/slider';


const MusicModal = (props) => {
    const [currTime, setCurrTime] = useState("")
    const [sliderTime, setSliderTime] = useState(0)

    useEffect(() => {

        const timer = setInterval(() => {
            /*  if(props.audio != null){
                 setCurrTime(millisToMinutesAndSeconds(props.audio.getStatusAsync().then((res)=>res.playableDurationMillis)));
             } */
            if (props.audio != null) {
                props.audio.getStatusAsync().then((res) => {
                    setCurrTime(millisToMinutesAndSeconds(res.positionMillis));
                    var timeAudio = res.positionMillis;
                    setSliderTime(res.positionMillis)


                    if (timeAudio >= props.track.durationMillis) {

                        if (props.repeat) {


                            props.audio.replayAsync();


                        } else {

                            if (props.random) {
                                props.playNext(props.music.id, true);
                            } else {
                                props.playNext(props.music.id);
                            }
                        }

                    }



                });

            }
            // console.log(props.audio.positionMillis)

        }, 1000)
        return () => clearInterval(timer);

    })
    

    /*  const currentDuration = async () => {
         const Mill = props.audio.getStatusAsync().then((res) => res.positionMillis);
         console.log(props.track.durationMillis + ' - ' + sliderTime)
 
         return mill;
     };
  */
    const handleSlide = async (newPos) => {
        await props.audio.setPositionAsync(newPos)
    }
    const millisToMinutesAndSeconds = (millis) => {
        var millisTemp = millis == null?100000:millis
        var minutes = Math.floor(millisTemp / 60000);
        var seconds = ((millisTemp % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const randomize = () => {
        if (props.random)
            props.setRandom(false)
        else {
            props.setRandom(true)
            props.setRepeat(false)
        }
    }
    const setRepeat = () => {
        if (props.repeat)
            props.setRepeat(false)
        else {
            props.setRepeat(true)
            props.setRandom(false)
        }
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={() => {
                    props.handleModal();

                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <TouchableOpacity onPress={() => {
                            props.handleModal();
                        }} style={{ position: 'absolute', left: 0, top: 0, margin: 20 }}>
                            <Icon name="chevron-down" color={'white'} size={20}></Icon>
                        </TouchableOpacity>
                        <View>
                            <TextTicker style={styles.textStyle} duration={8000} loop bounce={false} marqueeDelay={2000}>
                                {props.music.name + ' - ' + props.music.artist}
                            </TextTicker>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', }}>
                            <TouchableOpacity style={[styles.icon, props.repeat ? styles.iconActive : styles.iconDefault]} onPress={() => {
                                setRepeat()
                            }} >
                                <Icon name="redo-alt" color={'white'} size={15}></Icon>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.icon} onPress={() => {
                                props.playPrevious(props.music.id);
                            }} >
                                <Icon name="step-backward" color={'white'} size={30}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.icon} onPress={() => {
                                props.play(props.music.id)
                            }} >
                                <Icon name={props.music.playing == 1 ? "pause" : "play"} color={'white'} size={40}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.icon} onPress={() => {
                                props.playNext(props.music.id);
                            }} >
                                <Icon name="step-forward" color={'white'} size={30}></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.icon, props.random ? styles.iconActive : styles.iconDefault]} onPress={() => {
                                randomize();
                            }} >
                                <Icon name="random" color={'white'} size={15}></Icon>
                            </TouchableOpacity>


                        </View>
                        <View style={{ alignItems: 'center', width: '100%' }}>
                            {props.audio != null && props.track != null
                                ?
                                <React.Fragment>

                                    <Slider
                                        style={{ width: '90%', height: 40 }}
                                        minimumValue={0}
                                        maximumValue={props.track.durationMillis}
                                        minimumTrackTintColor="#FFFFFF"
                                        maximumTrackTintColor="#000000"
                                        value={sliderTime}
                                        onValueChange={(value) => setSliderTime(value)}
                                        onSlidingComplete={(v) => { handleSlide(v) }}


                                    />
                                    <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
                                        {currTime}
                                    </Text>
                                </React.Fragment>

                                :
                                <Text >No audio</Text>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
    },

    modalView: {
        //margin: 20,
        height: '100%',
        width: '100%',
        backgroundColor: "#6d6d6d",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        //shadowOpacity: 0.25,
        //shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 25,
        margin: 20
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
    , icon: {
        width: '21%',
        paddingLeft: '2%',
        paddingRight: '2%',
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30

    }
    , iconActive: {
        backgroundColor: 'red',
        borderRadius: 20
    },
    iconDefault: {
        backgroundColor: '#6d6d6d'
    }
});

export default MusicModal;

/* CurrentDuration = async () => {
    const Mill = await this.soundObject.getStatusAsync();
    let p = Mill.positionMillis;
return {curr:p};
}; */

/* const sound = new Audio.Sound();

try {

   const track = await sound.loadAsync(require('../../models/smw_bonus_game_end.mp3'));

   console.log(track.durationMillis); // Prints the duration in milliseconds

  } catch (err) {
   console.log(err);
  }; */