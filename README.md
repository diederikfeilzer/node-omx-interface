# omx-interface (Node.js)
An interface between nodejs and the omxplayer via dbus.

# Important
This project is in beta. Many functionalities work but I'm working on many more!

# Syntax
```
var omx = require('omx-interface');

omx.open('test.h624',{audioOutput:'hdmi', blackBackground:true, disableKeys:true, disableOnScreenDisplay:true})

omx.setPosition(60*5); //set position to 5 minutes in to the movie
```
# remote
The "omx-interface" package comes with an optional remote for your mobile phone. In the remote app you can browse files and control the player over your local network. Unlike other OMX middleware, GET and SET methods are supported rather than just emulating keypresses. So the current time, duration and volume are available!

<img src="https://raw.githubusercontent.com/diederikfeilzer/node-omx-interface/master/Screenshot.png" alt="Screenshot" width=300>

Since the remote is more of a showcase of the capabilities of the middleware it is optional and has to be initiated before use.

```
var omx = require('omx-interface');
omx.init_remote({port:8000});
```

The remote can be located from any browser on the local network. The webpage can be added to the home screen for a more app like experiance.

# options
## general options
audioOutput:             'hdmi' | 'local' | 'both'

blackBackground:         false | true | default: true

## communication options (since dbus replaces these features)

disableKeys:             false | true | default: false

disableOnScreenDisplay:  false | true | default: false

## subtitle options

disableGhostbox:         false | true | default: false

subtitlePath:            default: ""

# properties
## Get duration of current track/movie in seconds
``omx.getCurrentDuration();``

## Get position of current track/movie in seconds
`omx.getCurrentPosition();``

This function can be called many times per second without bothering the DBus since the position is extrapolated from the short term cached paying status.

## Get volume as fraction of max (0.0 - 1.0)
``omx.getCurrentVolume();``

# methods

## jump to point in file/seek relative to current position (-Inf to +Inf)
``omx.seek(seconds);``

## jump to point in file/seek relative to start point (absolute)
``omx.setPosition(seconds);``

## stop playing
``omx.stop();``

## quit omxplayer
``omx.quit();``

## pause omxplayer
``omx.pause();``

Note: Unlike hitting the spacebar, this method pauses only when playing and remains paused when allready paused.

## resume playing
``omx.play();``

Note: Unlike hitting the spacebar, this method starts playing only when paused and remains playing when allready playing.

## toggle pause/play
``omx.togglePlay();``

Note: Same as spacebar function of omxplayer.

## volume up
``omx.volumeUp();``

Note: Same as "+" key in omxplayer.

## volume down
``omx.volumeDown();``

Note: Same as "-" key in omxplayer.

## set volume to a fraction of the max volume (0.0 - 1.0)
``omx.setVolume(vol);``
