// All songs
const mySongs = [
    {
        songName: "Warriyo - Mortals (feat. Laura Brehm)",
        soundPath: "./songs/1.mp3",
        coverPath: "./images/covers/1.jpg"
    }, 
    {
        songName: "Cielo - Huma-Huma",
        soundPath: "./songs/2.mp3",
        coverPath: "./images/covers/2.jpg"
    }, 
    {
        songName: "DEAF KEV - Invincible",
        soundPath: "./songs/3.mp3",
        coverPath: "./images/covers/3.jpg"
    }, 
    {
        songName: "Different Heaven & EH!DE - My Heart",
        soundPath: "./songs/4.mp3",
        coverPath: "./images/covers/4.jpg"
    }, 
    {
        songName: "Janji - Heroes Tonight (feat. Johnning)",
        soundPath: "./songs/5.mp3",
        coverPath: "./images/covers/5.jpg"
    }, 
    {
        songName: "Cartoon - On & On (feat. Daniel Levi)",
        soundPath: "./songs/6.mp3",
        coverPath: "./images/covers/6.jpg"
    }, 
    {
        songName: "NEFFEX - Cold",
        soundPath: "./songs/7.mp3",
        coverPath: "./images/covers/7.jpg"
    }, 
    {
        songName: "NEFFEX - Grateful",
        soundPath: "./songs/8.mp3",
        coverPath: "./images/covers/8.jpg"
    }, 
    {
        songName: "Lost Sky - Dreams pt. II",
        soundPath: "./songs/9.mp3",
        coverPath: "./images/covers/9.jpg"
    }, 
    {
        songName: "Julius Dreisig - Invisible",
        soundPath: "./songs/10.mp3",
        coverPath: "./images/covers/10.jpg"
    }, 
];

// Variable inits
let songIndex = 0;
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progress-bar");
let clickedButton;
const audioElement = new Audio('./songs/1.mp3');
const songItems = Array.from(document.getElementsByClassName('song-items'));
const playSongs = Array.from(document.getElementsByClassName("songItemPlay"));
let songText = document.querySelector('.song-info');
songText.textContent = mySongs[0].songName;


// Set all song names and cover pages

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = mySongs[i].coverPath;
    element.getElementsByTagName("span")[0].textContent = mySongs[i].songName;
});


// Make all buttons into pause button
const makeAllPause = () => {
    playSongs.forEach(element => {
        element.src = './images/pause.png';
    })
}

playSongs.forEach((element, i) => {
    element.addEventListener("click", () => {
        // If the same button is clicked again,
        // don't reset the song, continue playing
        // Also, reset border of older song
        if (element !== clickedButton) {
            audioElement.src = mySongs[i].soundPath;
            songItems[songIndex].style.backgroundColor = 'white';
            songItems[songIndex].getElementsByClassName('songName')[0].style.color = 'black';
            songItems[songIndex].getElementsByClassName('timestamp')[0].style.color = 'black';
        }
        
        songIndex = i;
        // Change name of song being displayed.
        songText.textContent = mySongs[i].songName;
        
        makeAllPause();

        // Save current button press to clickedButton
        clickedButton = element;
        
        if (audioElement.paused || audioElement.currentTime === 0) {
            audioElement.play();
            element.src = './images/play.png';
            masterPlay.src = './images/play.png';
            songItems[i].style.backgroundColor = '#118845';
            songItems[i].getElementsByClassName('songName')[0].style.color = 'white';
            songItems[i].getElementsByClassName('timestamp')[0].style.color = 'white';
        }
        else {
            audioElement.pause();
            element.src = './images/pause.png';
            masterPlay.src = './images/pause.png';
        }
    });
});

// Plays previous song on clicking previous button on bottom
document.getElementById("prev").addEventListener('click', () => {
    // Reset background of older song
    songItems[songIndex].style.backgroundColor = 'white';
    songItems[songIndex].getElementsByClassName('songName')[0].style.color = 'black';
    songItems[songIndex].getElementsByClassName('timestamp')[0].style.color = 'black';
    
    if (songIndex >= 0) {
        songIndex -= 1;
    }
    else{
        songIndex = 0;
    }
    audioElement.src = mySongs[songIndex].soundPath;
    audioElement.play();
    makeAllPause();

    songItems[songIndex].style.backgroundColor = '#118845';
    songItems[songIndex].getElementsByClassName('songName')[0].style.color = 'white';
    songItems[songIndex].getElementsByClassName('timestamp')[0].style.color = 'white';
    
    playSongs[songIndex].src = './images/play.png';
    masterPlay.src = './images/play.png';
})

// Plays next song on clicking previous button on bottom
document.getElementById("next").addEventListener('click', () => {
    songItems[songIndex].style.backgroundColor = 'white';
    songItems[songIndex].getElementsByClassName('songName')[0].style.color = 'black';
    songItems[songIndex].getElementsByClassName('timestamp')[0].style.color = 'black';
    
    if (songIndex < 10) {
        songIndex += 1;
    }
    else{
        songIndex = 0;
    }
    audioElement.src = mySongs[songIndex].soundPath;
    audioElement.play();
    makeAllPause();

    songItems[songIndex].style.backgroundColor = '#118845';
    songItems[songIndex].getElementsByClassName('songName')[0].style.color = 'white';
    songItems[songIndex].getElementsByClassName('timestamp')[0].style.color = 'white';
    
    playSongs[songIndex].src = './images/play.png';
    masterPlay.src = './images/play.png';
})

// Plays/Pauses song on clicking bottom play button
masterPlay.addEventListener('click', (e) => {
    // Playing and pausing
    if (audioElement.paused || audioElement.currentTime === 0) {
        audioElement.play();
        clickedButton.src = './images/play.png';
        masterPlay.src = './images/play.png';
    }
    else {
        audioElement.pause();
        makeAllPause();
        masterPlay.src = './images/pause.png';
    }
});


audioElement.addEventListener('timeupdate', () => {
    // Updating the seekbar

    // Get percentage of song played
    progressBar.value = parseFloat((audioElement.currentTime / audioElement.duration) * 100);
});


// If bar progress is changed by a click/drag, then change the song accordingly.
progressBar.addEventListener('click', () => {

    // Below equation is derived from line 79
    audioElement.currentTime = (parseInt(progressBar.value) * audioElement.duration) / 100;
});
