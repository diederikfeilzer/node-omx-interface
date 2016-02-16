var exec = require('child_process').exec;
exec('mkfifo omxpipe');

module.exports = function(){

var cache = {
	path:{
		value:'',
		time:new Date(),
		valid:false
	},
	position:{
		value:false,
		time:new Date(),
		valid:false
	},
	duration:{
		value:0,
		time:new Date(),
		valid:false
	},
	isPlaying:{
		value:1,
		time:new Date(),
		valid:false
	}
};

var defaults = cache;

var playTryCount = 0;
var play = function() {
	exec('./dbus.sh playstatus',function(error, stdout, stderr) {
		if(error && playTryCount < 3){
			playTryCount++;
			play();
		} else if(error) {
			playTryCount = 0;
		} else {
			playTryCount = 0;
			if (stdout.indexOf("Paused")>-1) {
				togglePlay();
				cache.isPlaying.value = 1;
			}
		}
    });
}

var pauseTryCount = 0;
var pause = function() {
	exec('./dbus.sh playstatus',function(error, stdout, stderr) {
		if(error && stopTryCount < 3){
			pauseTryCount++;
			pause();
		} else if(error) {
			pauseTryCount = 0;
		} else {
			pauseTryCount = 0;
			if (stdout.indexOf("Playing")>-1) {
				togglePlay();
 				cache.isPlaying.value = 0;
			}
		}
    });
}

var stopTryCount = 0;
var stop = function() {
	exec('./dbus.sh stop',function(error, stdout, stderr) {
		if(error && stopTryCount < 3){
			stopTryCount++;
			stop();
		} else if(error) {
			stopTryCount = 0;
		} else {
			stopTryCount = 0;
			cache = defaults;
		}
    });
}

var quitTryCount = 0;
var quit = function() {
	exec('./dbus.sh quit',function(error, stdout, stderr) {
		if(error && quitTryCount < 3){
			quitTryCount++;
			quit();
		} else if(error) {
			quitTryCount = 0;
		} else {
			quitTryCount = 0;
			cache = defaults;
		}
    });
}

var togglePlayTryCount = 0;
var togglePlay = function() {
	exec('./dbus.sh playpause',function(error, stdout, stderr) {
		if(error && togglePlayTryCount < 4){
			togglePlayTryCount++;
			togglePlay();
		} else {
			togglePlayTryCount = 0
		}
    });
}

var volumeUpTryCount = 0;
var volumeUp = function() {
	exec('./dbus.sh volumeup',function(error, stdout, stderr) {
		if(error && volumeUpTryCount < 4){
			volumeUpTryCount++;
			volumeUp();
		} else {
			volumeUpTryCount = 0
		}
    });
}

var volumeDownTryCount = 0;
var volumeDown = function() {
	exec('./dbus.sh volumedown',function(error, stdout, stderr) {
		if(error && volumeDownTryCount < 4){
			volumeDownTryCount++;
			volumeDown();
		} else {
			volumeDownTryCount = 0
		}
    });
}

var seekTryCount = 0;
var seek = function(offset) {
	exec('./dbus.sh seek '+Math.round(offset*1000000),function(error, stdout, stderr) {
		if(error && seekTryCount < 4){
			seekTryCount++;
			seek(offset);
		} else {
			seekTryCount = 0
		}
    });
}

var setPositionTryCount = 0;
var setPosition = function(position) {
	exec('./dbus.sh setposition '+Math.round(position*1000000),function(error, stdout, stderr) {
		if(error && setPositionTryCount < 4){
			setPositionTryCount++;
			setPosition(position);
		} else {
			setPositionTryCount = 0
		}
    });
}

var toggleSubtitlesTryCount = 0;
var toggleSubtitles = function() {
	exec('./dbus.sh togglesubtitles',function(error, stdout, stderr) {
		if(error && toggleSubtitlesTryCount < 4){
			toggleSubtitlesTryCount++;
			toggleSubtitles(position);
		} else {
			toggleSubtitlesTryCount = 0
		}
    });
}

var hideSubtitlesTryCount = 0;
var hideSubtitles = function() {
	exec('./dbus.sh hidesubtitles',function(error, stdout, stderr) {
		if(error && hideSubtitlesTryCount < 4){
			hideSubtitlesTryCount++;
			hideSubtitles(position);
		} else {
			hideSubtitlesTryCount = 0
		}
    });
}

var showSubtitlesTryCount = 0;
var showSubtitles = function() {
	exec('./dbus.sh showsubtitles',function(error, stdout, stderr) {
		if(error && showSubtitlesTryCount < 4){
			showSubtitlesTryCount++;
			showSubtitles(position);
		} else {
			showSubtitlesTryCount = 0
		}
    });
}
	
var update_duration = function() {
	exec('./dbus.sh duration',function(error, stdout, stderr) {
		if (error) return false;
        var duration = Math.round(parseInt(stdout.substring((stdout.indexOf("int64")>-1 ? stdout.indexOf("int64")+6:0)))/10000)/100;
		cache.duration.value = duration;
		cache.duration.time = new Date();
		cache.duration.valid = true;
    });
}
	
var update_position = function() {
	exec('./dbus.sh position',function(error, stdout, stderr) {
		if (error) return false;
		var position = parseInt(stdout);
		cache.position.value = position;
		cache.position.time = new Date();
		cache.position.valid = true;
    });
}

var getCurrentPosition = function(){
	if((new Date()-cache.position.time)/1000 > 3) {
		cache.position.valid = false;
	}
	if(!cache.position.valid) {
		update_position();
	}
	return Math.min(Math.round((cache.position.value + cache.isPlaying.value*((new Date())-cache.position.time)*1000)/10000)/100,getCurrentDuration());
	//return cache.position.value;
}

var getCurrentDuration = function(){
	if(!cache.duration.valid || (cache.duration.value < 1)) {
		update_duration();
	}
	return cache.duration.value;
}

//var onProgress = function(){
//	setInterval(function(){console.log(getCurrentPosition(),getCurrentDuration());},500);
//}

var open = function (path, options) {
	var settings = options || {};
	var args = [];
	var command = 'omxplayer';
	
	cache.path.value = path;
	cache.path.valid = true;
	cache.duration.valid = false;
	update_duration();
    
	if (['hdmi','local','both'].indexOf(settings.audioOutput) != -1) {
		args.push('-o');
		args.push(settings.audioOutput);
	}

	if (settings.blackBackground !== false) {
		args.push('-b');
	}

	if (settings.disableKeys === true) {
		args.push('--no-keys')
	}

	if (settings.disableOnScreenDisplay === true) {
		args.push('--no-osd')
	}

	if (settings.disableGhostbox === true) {
		args.push('--no-ghost-box'); 
	}

	if (settings.subtitlePath && settings.subtitlePath != "" ){
		args.push('--subtitles'); 
		args.push('"'+settings.subtitlePath+'"'); 
	}
	
	args.push('--dbus_name');
	args.push('org.mpris.MediaPlayer2.omxplayer');
	
	args.push('"'+path+'"');

    exec(command+' '+args.join(' ')+' < omxpipe',function(error, stdout, stderr) {
        console.log(stdout);
    });
    exec(' . > omxpipe');

};

};
