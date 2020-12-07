export default function compareByName(a, b) {
    return a.name.localeCompare(b.name)

}

export function compareByArtist(a, b) {

    return a.artist.localeCompare(b.artist)

}

export function searchMusicById(array, id) {

    /*  var result = array.find(obj => {
         return obj.id == id;
     }) */
    var index = array.map((e) => e.id).indexOf(id)

    return array[index];


}

export function searchPreviousMusicById(array, id) {

    /*  var result = array.find(obj => {
         return obj.id == id;
     }) */
    var index = array.map((e) => e.id).indexOf(id)

    return index > 0 ? (index - 1) : (array.length - 1);
}

export function searchNextMusicById(array, id) {

    /*  var result = array.find(obj => {
         return obj.id == id;
     }) */
    var index = array.map((e) => e.id).indexOf(id)

    return (index + 1) < array.length ? (index + 1) : 0;

}


export function searchIndexById(array, id) {

    var result = array.map((e) => e.id).indexOf(id)

    return result;

}

export function replaceMusic(arrayMusics, newMusic) {
    var result = searchIndexById(arrayMusics, newMusic.id);
    arrayMusics[result] = newMusic;
    return arrayMusics;

}