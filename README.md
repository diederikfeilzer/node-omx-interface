<img src="https://raw.githubusercontent.com/diederikfeilzer/node-omx-interface/master/hero.png" alt="hero" width="100%">

# omx-interface (Node.js)
An interface between nodejs and the omxplayer via dbus.

# Syntax (Do it yourself)
```
var omx = require('omx-interface');

var options = {
	audioOutput:'hdmi', 
	blackBackground:true, 
	disableKeys:true, 
	disableOnScreenDisplay:true
};

omx.open('test.mp4',options); //open file

omx.onProgress(function(track){ //subscribe for track updates (every second while not paused for now)
	console.log(track.position);
	console.log(track.duration);
});

omx.setPosition(60*5); //set position to 5 minutes into the movie
```
# Syntax (Out of the box with web-socket remote)
```
var omx = require('omx-interface');
omx.init_remote({port:8000}); //streams a remote on localhost:8000
```

The "omx-interface" package comes with an optional remote for your mobile phone. In the remote app you can browse files and control the player over your local network. Unlike other OMX middleware, GET and SET methods are supported rather than just emulating keypresses. So the current time, duration and volume are available!

<img src="https://raw.githubusercontent.com/diederikfeilzer/node-omx-interface/master/Screenshot.png" alt="Screenshot" width=300>

Since the remote is more of a capability showcase it is optional and has to be initiated before use. calling node example.js on your pi will showcase this.

The remote can be located from any browser on the local network. The webpage can be added to the home screen for a more app like feeling. The remote address is logged to the console after initialization.

# Options
## general options
audioOutput:             'hdmi' | 'local' | 'both'

blackBackground:         boolean, true by default

## Communication options

disableKeys:             boolean, false by default (true when using remote)

disableOnScreenDisplay:  boolean, false by default (true when using remote)


## Subtitle options

disableGhostbox:         boolean, false by default

subtitlePath:            string, '' or false disables subtitles as is done by default

# Properties
## Get duration of current track/movie in seconds
``omx.getCurrentDuration();``

## Get position of current track/movie in seconds
``omx.getCurrentPosition();``

This function can be called many times per second without bothering the DBus since the position is extrapolated from the short term cached paying status.

## Get volume as fraction of max (0.0 - 1.0)
``omx.getCurrentVolume();``

# Methods

## Jump to point in file/seek relative to current position (-Inf to +Inf)
``omx.seek(seconds);``

## Jump to point in file/seek relative to start point (absolute)
``omx.setPosition(seconds);``

## Stop playing
``omx.stop();``

## Quit omxplayer
``omx.quit();``

## Pause omxplayer
``omx.pause();``

Note: Unlike hitting the spacebar, this method pauses only when playing and remains paused when allready paused.

## Resume playing
``omx.play();``

Note: Unlike hitting the spacebar, this method starts playing only when paused and remains playing when allready playing.

## Toggle pause/play
``omx.togglePlay();``

Note: Same function as hitting spacebar in omxplayer.

## Volume up
``omx.volumeUp();``

Note: Same function as "+" key in omxplayer.

## Volume down
``omx.volumeDown();``

Note: Same function as "-" key in omxplayer.

## Set volume to a fraction of the max volume (0.0 - 1.0)
``omx.setVolume(vol);``
