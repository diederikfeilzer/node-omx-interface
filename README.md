# node-omx-interface
An interface between nodejs and the omxplayer via dbus.

# Syntax
var omx = require('omx-interface'); //not yet added to npm.

omx.open('test.h624',{audioOutput:'hdmi',blackBackground:true,disableKeys:true,disableOnScreenDisplay:true})

# options
## general options
audioOutput             'hdmi' | 'local' | 'both'

blackBackground         false | true | default: true

## communication options (since dbus replaces these features)

disableKeys             false | true | default: false

disableOnScreenDisplay  false | true | default: false

## subtitle options

disableGhostbox         false | true | default: false

subtitlePath            default: ""
