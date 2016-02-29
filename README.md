# node-omx-interface
An interface between nodejs and the omxplayer via dbus.

# IMPORTANT
This project is in beta. Many functionalities work but I'm working on many more!

# Syntax
var omx = require('omx-interface');

omx.open('test.h624',{audioOutput:'hdmi',blackBackground:true,disableKeys:true,disableOnScreenDisplay:true})

# remote
The "omx-interface" package comes with an optional remote for your mobile phone. In the remote app you can browse files and control the player over your local network. Unlike other omx middleware get methods are supported. So the current time and duration are available!
Screenshot yet to come.

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
omx.getCurrentDuration();

## Get position of current track/movie in seconds
omx.getCurrentPosition();

This function can be called many times per second without bothering the dbus since the position is extrapolated from the short term cached paying status. 

## Get volume in mili db
omx.getCurrentVolume(); //NOT YET IMPLEMENTED

# methods

## jump to point in file/seek ralative to current position
omx.seek(seconds); //UNTESTED

## jump to point in file/seek ralative to start point (absolute)
omx.setPosition(seconds); //UNTESTED

## stop playing
omx.stop();

## quit omxplayer
omx.quit();

## pause omxplayer
omx.pause();
Note: Unlike hitting the spacebar, this method pauses only when playing and remains paused when allready paused.

## resume playing
omx.play();
Note: Unlike hitting the spacebar, this method starts playing only when paused and remains playing when allready playing.

## toggle pause/play
omx.togglePlay();
Note: Same as spacebar function of omxplayer.

## volume up
omx.volumeUp();
Note: Same as "+" key in omxplayer.

## volume down
omx.volumeDown();
Note: Same as "-" key in omxplayer.

## set volume to a disired decibel level.
omx.setVolume(vol); //NOT YET IMPEMENTED
