console.log("Welcome to spotify");
//initialize the variables
let songIndex=0;
let audioElement= new Audio('song/0.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItem=Array.from(document.getElementsByClassName('songItem'))
let masterSongName=document.getElementById('masterSongName');


let songs=[
    {songName:"Mayavi",filePath:"song/0.mp3",coverPath:"covers/MAYAVI.jpg"},
    {songName:"Arere avala naguva",filePath:"song/1.mp3",coverPath:"covers/ARERE.jpg"},
    {songName:"Hello hello heloo",filePath:"song/2.mp3",coverPath:"covers/HELLO.jpg"},
    {songName:"Bangle Bangari",filePath:"song/3.mp3",coverPath:"covers/BANGLE.jpg"},
    {songName:"Dwapara",filePath:"song/4.mp3",coverPath:"covers/DWAPARA.jpg"},
    {songName:"Lulluby-Rajakumari",filePath:"song/5.mp3",coverPath:"covers/LULLUBY.jpg"},
    {songName:"Mugaru Maleyalli",filePath:"song/6.mp3",coverPath:"covers/MUNGARU.jpg"},
    {songName:"Nanage neenu",filePath:"song/7.mp3",coverPath:"covers/NANAGE.jpg"},
    {songName:"Bombe helutaite",filePath:"song/8.mp3",coverPath:"covers/BOMBE.jpg"},
    {songName:"Anuraga Aralo samaya",filePath:"song/9.mp3",coverPath:"covers/ANURAGA.jpg"}
]

songItem.forEach((element,i)=>{
    console.log(element,i);
    
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

// audioElement.play();

//handle play pause
masterPlay.addEventListener('click',()=>{
    const currentSongIcon = document.getElementById(songIndex);
    if (audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity=1;

        makeAllPlays(); // reset all first
        currentSongIcon.classList.remove('fa-circle-play');
        currentSongIcon.classList.add('fa-circle-pause');
    }else{
         audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity=0;

          currentSongIcon.classList.remove('fa-circle-pause');
        currentSongIcon.classList.add('fa-circle-play');
    }
})
//listen to events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
   let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
   myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
                element.classList.remove('fa-circle-pause');
                element.classList.add('fa-circle-play');
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id);

        // If clicking the same song that's already playing
        if (songIndex === clickedIndex && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        } else {
            songIndex = clickedIndex;
            makeAllPlays(); // Reset all icons to play
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');

            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;

            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
    });
});


document.getElementById('next').addEventListener('click',()=>{
    makeAllPlays();
    if (songIndex>=songs.length-1) {
        songIndex=0;
    }else{
        songIndex+=1;
    }
    audioElement.src=`song/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    const currentSongIcon = document.getElementById(songIndex);
    currentSongIcon.classList.remove('fa-circle-play');
    currentSongIcon.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    makeAllPlays();
    if (songIndex<=0) {
        songIndex=0;
    }else{
        songIndex-=1;
    }
    audioElement.src=`song/${songIndex}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    const currentSongIcon = document.getElementById(songIndex);
    currentSongIcon.classList.remove('fa-circle-play');
    currentSongIcon.classList.add('fa-circle-pause');
})

audioElement.addEventListener('ended', () => {
    // Move to next song
    if (songIndex >= songs.length - 1) {
        songIndex = 0; // Go back to first song
    } else {
        songIndex += 1;
    }

    // Load and play next song
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    // Update icons
    makeAllPlays();
    const currentIcon = document.getElementById(songIndex);
    currentIcon.classList.remove('fa-circle-play');
    currentIcon.classList.add('fa-circle-pause');

    // Master play button and gif
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
});
