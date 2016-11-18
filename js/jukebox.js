// The whole Jukebox should be backed by an object called Jukebox with 
// methods to play, stop, and load songs. Needs the ability to stop, play,
// load different songs. Can add playlist and shuffle functionalities.
//Class - blueprint for creating an obj called Jukebox
function Jukebox(songs) {
    //this ={}; comes for free
    //array of songs
    this.songs = songs;

    //start at 0 index when you call new jukebox
    this.currentSongIndex = 0;

    //making audio obj allowing you to do anything you could do with audio element, going into array and getting first song
    this.currentSong = new Audio(this.songs[this.currentSongIndex]);
    // this.currentSong = new Audio("music/Highwayman.mp3");

    this.seeking = false;

    //sets to play current song and calls next song function when it ends
    this.play = function() {
        this.currentSong.play();

        var jb = this;
        this.currentSong.addEventListener('ended', function() {
            jb.playNextSong();
        });
    };

    //tells if playing or paused
    this.playing = function() {
        return false === this.currentSong.paused;
    };

    //resets track *not used*
    this.reset = function() {
        this.playPause();
        this.audio.currentTime = 0;
    };

    //tells if muted or unmuted
    this.unmuted = function() {
        return false === this.currentSong.muted;
    };

    //controls auto playlist
    this.playNextSong = function() {
        //switches to the next track or resets playlist if it's on the last track
        var isLastSong = this.currentSongIndex === this.songs.length - 1;

        if (isLastSong) {
            this.restartPlaylist();
        } else {
            this.nextTrack();
        }

        this.currentSong.src = this.songs[this.currentSongIndex];
        this.currentSong.play();
    };

    this.songButton = function() {
        var songSrc = event.target.dataset.src;
        this.currentSong.src = songSrc;
        this.currentSong.play();
        this.currentSongIndex = this.songs.indexOf(songSrc);
    };


    //function for restarting playlist
    this.restartPlaylist = function() {
        this.currentSongIndex = 0;
    };

    //function for moving up one track
    this.nextTrack = function() {
        this.currentSongIndex = this.currentSongIndex + 1;
    };

    //function for seeing current song
    this.getCurrentTrack = function() {
        return this.songs[this.currentSong];
    };

    //pauses and plays the audio
    this.playPause = function() {
        if (this.currentSong.paused) {
            this.currentSong.play();
        } else {
            this.currentSong.pause();
        }
    };


    //mutes and unmutes volume
    this.mute = function() {
        if (this.currentSong.muted) {
            this.currentSong.muted = false;
        } else {
            this.currentSong.muted = true;
        }
    };

    //Volume control
    this.volume = function(event, volumeslider) {
        this.volume = volumeslider.value / 100;
    };

    this.setVolume = function(volume) {
        this.currentSong.volume = volume;
    };

}
