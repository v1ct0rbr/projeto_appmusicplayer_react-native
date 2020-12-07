import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react'
import React from 'react';
import { ScrollView, StyleSheet, Text, View, LogBox } from 'react-native';
import { Audio } from 'expo-av'
import MusicDataTable from './components/MusicDataTable'

import compareByName, { compareByArtist, replaceMusic, searchMusicById, searchNextMusicById, searchPreviousMusicById } from './utils'
import PlayingItem from './components/PlayingItem'
import MusicModal from './components/MusicModal'
import Spinner from 'react-native-loading-spinner-overlay'


export default function App() {

  const [modalVisible, setModalVisible] = useState(false);
  const [audio, setAudio] = useState(null);
  const [sortColumn, setSortColumn] = useState(0);
  const [sortType, setSortType] = useState('ascending');
  const [track, setTrack] = useState(null)
  const [random, setRandom] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [loading, setLoading] = useState(false)
  const [playingMusic, setPlayingMusic] = useState({
    id: 0,
    name: '',
    artist: '',
    playing: false,
    file: '',
  });


  const [musicas, setMusicas] = useState([
    {
      id: 1,
      name: 'SoundHelix Song 1',
      artist: 'T. Schürger',
      playing: 0,
      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    },
    {
      id: 2,
      name: 'SoundHelix Song 2',
      artist: 'T. Schürger',
      playing: 0,

      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    },
    {
      id: 3,
      name: 'SoundHelix Song 3',
      artist: 'T. Schürger',
      playing: 0,

      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    },
    {
      id: 4,
      name: 'SoundHelix Song 4',
      artist: 'T. Schürger',
      playing: 0,

      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    },
    {
      id: 5,
      name: 'SoundHelix Song 5',
      artist: 'T. Schürger',
      playing: 0,

      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    },
    {
      id: 6,
      name: 'SoundHelix Song 6',
      artist: 'T. Schürger',
      playing: 0,

      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    },
    {
      id: 7,
      name: 'SoundHelix Song 7',
      artist: 'T. Schürger',
      playing: 0,

      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
    },
    {
      id: 8,
      name: 'SoundHelix Song 8',
      artist: 'T. Schürger',
      playing: 0,

      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
    },
    {
      id: 9,
      name: 'SoundHelix Song 9',
      artist: 'T. Schürger',
      playing: 0,

      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
    },
    {
      id: 10,
      name: 'SoundHelix Song 10',
      artist: 'T. Schürger',
      playing: 0,

      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
    },
    {
      id: 11,
      name: 'SoundHelix Song 11',
      artist: 'T. Schürger',
      playing: 0,

      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' },
    },
    {
      id: 12,
      name: 'SoundHelix Song 12',
      artist: 'T. Schürger',
      playing: 0,

      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' },
    },
    {
      id: 13,
      name: 'SoundHelix Song 13',
      artist: 'T. Schürger',
      playing: 0,

      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3' },
    },
    {
      id: 14,
      name: 'SoundHelix Song 14',
      artist: 'T. Schürger',
      playing: 0,

      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3' },
    },
    {
      id: 15,
      name: 'SoundHelix Song 15',
      artist: 'T. Schürger',
      playing: 0,

      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3' },
    },
    {
      id: 16,
      name: 'SoundHelix Song 16',
      artist: 'T. Schürger',
      playing: 0,
      // file: require('./music/audio2.mp3'),
      file: { uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3' },
    },

  ]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);


  }, [playingMusic])

  LogBox.ignoreAllLogs(true);

  const handleModal = () => {
    if (modalVisible)
      setModalVisible(false);
    else
      setModalVisible(true);
  }

  const clearPlayingMusic = () => {
    setPlayingMusic({
      id: 0,
      name: '',
      artist: '',
      playing: 0,
      file: '',

    });
    let tempMusicas = musicas.filter((elem, idx) => {
      elem[idx].playing = 0
    });
    setMusicas(tempMusicas);
  }
  const fillPlayingMusic = (music) => {
    setPlayingMusic({
      id: music.id,
      name: music.name,
      artist: music.artist,
      playing: music.playing,
      file: music.file
    });
  }

  const handleSorting = (col) => {
    setSortColumn(col);
    let musicasTemp = [...musicas];
    if (sortType == 'ascending')
      setSortType('descending');
    else {
      setSortType('ascending')
    }
    if (col == 0) {
      if (sortType == 'ascending')
        musicasTemp.sort(compareByName);
      else
        musicasTemp.sort(compareByName).reverse();

    } else {
      if (sortType == 'ascending')
        musicasTemp.sort(compareByArtist);
      else
        musicasTemp.sort(compareByArtist).reverse();

    }
    setMusicas(musicasTemp)

  }

  /* const updateMusicList = (id, statusFinal) => {
    let tempMusicas = musicas.filter(async (elem, idx) => {
      if (elem.id == id) {
        musicas[idx].playing = statusFinal
        setPlayingMusic(musicas[idx]);
      } else {
        musicas[idx].playing = 0
      }
      return musicas[idx];
    })
    setMusicas(tempMusicas)
  } */

  const play = async (id) => {

    setLoading(true)
    var tempMusic = searchMusicById(musicas, id);
    var musicasTemp = [...musicas];
    try {
      // console.log('starting process.');

      if (playingMusic.id != 0) {
        if (playingMusic.id != id) {
          if (audio != null) {
            //console.log('stop song and unload..')
            await audio.stopAsync();
            await audio.unloadAsync();

            musicasTemp = replaceMusic(musicas, { ...playingMusic, playing: 0 })
          }

          if (tempMusic != null) {
            //console.log('searching completed: result 1');
            // console.log('trying to play..');
            tempMusic.playing = 1;

            musicasTemp = replaceMusic(musicas, tempMusic)
            fillPlayingMusic(tempMusic)
            playFile(tempMusic.file)


          } else {
            clearPlayingMusic();
          }


        } else {
          if (playingMusic.playing == 1) {
            //console.log('pausing song..')
            tempMusic.playing = 2
            musicasTemp = replaceMusic(musicas, tempMusic)
            fillPlayingMusic(tempMusic);
            await audio.pauseAsync();

          }
          else if (playingMusic.playing == 2) {
            //console.log('undo pause ...')
            tempMusic.playing = 1;
            musicasTemp = replaceMusic(musicas, tempMusic)
            fillPlayingMusic(tempMusic);
            await audio.playAsync();
          }
        }
      }
      else {
        if (tempMusic != null) {
          //console.log('searching completed: result 1');
          //console.log('trying to play..');
          tempMusic.playing = 1;
          fillPlayingMusic(tempMusic)
          musicasTemp = replaceMusic(musicas, tempMusic)
          playFile(tempMusic.file)

        }
      }


    } catch (e) { } finally {
      setMusicas(musicasTemp)
    }

  }
  const playNext = (id, random = false) => {
    var index = 0
    if (index < (musicas.length)) {
      if (random) {
        index = randomArbitrary(0, musicas.length - 1)
        play(musicas[index].id);
      }
      else {
        index = searchNextMusicById(musicas, id);
        play(musicas[index].id);
      }
    }
  }
  const playPrevious = (id) => {
    var index = searchPreviousMusicById(musicas, id);
    if (index > -1) {
      play(musicas[index].id);
    }
  }

  const randomArbitrary = (min, max) => {
    /* min = Math.ceil(min);
    max = Math.floor(max); */
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



  /*  const pause = async (id) => {
   
     try {
       if (audio != null) {
         if (playingMusic.playing == 1) {
           //console.log('pausing song..')
           await audio.pauseAsync();
           updateMusicList(playingMusic.id, 2);
         }
         else if (playingMusic.playing == 2) {
           //console.log('undo pause ...')
           await audio.playAsync();
           updateMusicList(playingMusic.id, 1);
         }
   
       }
     } catch (e) { }
     //console.log('Put your error')
   } */
  /*  const stop = async () => {
     try {
       if (audio != null) {
         await audio.stopAsync();
         updateMusicList(playingMusic.id, 0);
   
       }
   
     } catch (e) { }
   } */

  /*  const handlePlay = (id) => {
     // console.log('Starting process....')
     play(id);
   } */


  const playFile = async (file) => {
    var currAudio = new Audio.Sound();
    try {
      const currTrack = await currAudio.loadAsync(file);
      //currAudio.getStatusAsync().then(res => res.)
      setTrack(currTrack);
      await currAudio.playAsync();
      setAudio(currAudio);
    } catch (e) { console.log(e); }


  }

  return (
    <View style={{ height: '100%' }}>
      <Spinner visible={loading}>

      </Spinner>
      <ScrollView styles={styles.container}>
        <StatusBar hidden />
        <View style={styles.header}>
          <Text style={{ textAlign: "center", color: 'white', fontSize: 25 }}>App Música</Text>
        </View>
        <MusicDataTable musicas={musicas} sortColumn={sortColumn} handleSorting={handleSorting} sortType={sortType} handlePlay={play} />
        <View style={{ height: height }}></View>
      </ScrollView>
      <PlayingItem height={height} handleModal={handleModal} music={playingMusic}></PlayingItem>
      <MusicModal track={track} audio={audio} play={play} random={random} setRandom={setRandom} repeat={repeat} setRepeat={setRepeat} playNext={playNext} playPrevious={playPrevious} handleModal={handleModal} modalVisible={modalVisible} music={playingMusic}></MusicModal>
    </View>
  );
}

const height = 50
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',

  },
  header: {
    backgroundColor: '#1DB954',
    width: '100%',
    padding: 20
  },

});
