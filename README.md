# node-omx-interface
An interface between nodejs and the omxplayer via dbus.

# Syntax
var omx = require('omx-interface'); //not yet added to npm.

omx.open('test.h624',{audioOutput:'hdmi',blackBackground:true,disableKeys:true,disableOnScreenDisplay:true})

# options
## general options
audioOutput:             'hdmi' | 'local' | 'both'  \
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
This function can be called many times per second without bothering the dbus since the position is extrapolated from last paying status.

## Get volume in mili db
... to be added

# methods

## jump to point in file/seek ralative to current position
//omx.seek(seconds);

## jump to point in file/seek ralative to start point (absolute)
//omx.setPosition(seconds);

## stop playing
omx.stop();

## quit omxplayer
omx.quit();

## pause omxplayer (unlike the spacebar)
omx.pause();

## resume playing
omx.play();

## toggle pause/play
omx.togglePlay();

## volume up
...

## volume down
...

## ... to be documented later
