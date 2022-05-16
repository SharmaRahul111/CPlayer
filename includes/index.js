function inMin(sec){var min = Math.floor((sec/60));sec = Math.floor(sec%60);if(min < 10){min = "0"+min}if(sec < 10){sec = "0"+sec}if(min+":"+sec != "NaN:NaN"){return min+":"+sec;}else{return "00:00"}}
function id(id){return document.getElementById(id)}function qry(query){return document.querySelector(query)}function qryAll(query){return document.querySelectorAll(query)}
//load directory list on window load
function quickxhr(url,callback){var xhr = new XMLHttpRequest();xhr.open("GET",url,true);xhr.onload = function(){id("dirs").innerHTML = this.responseText;id("loader").style.opacity = "0";setTimeout(function(){id("loader").style.display = "none";},1000);};xhr.send();}
//scan songs of particular directory
function scansong(url9){var xhr = new XMLHttpRequest();xhr.open("GET","scanner.php?songs="+url9,true);xhr.onload = function(){if(id("song").innerHTML != this.responseText){id("song").innerHTML = "";id("song").innerHTML = this.responseText;
let moreBtnSong = qryAll(".more-btn");
moreBtnSong.forEach(function(moreBtn){
	moreBtn.onclick = function(){
		var height = getComputedStyle(id("optContainer")).height.substr(0,getComputedStyle(id("optContainer")).height.length - 2);
		if(moreBtn.offsetTop + 120 > height - 75){
			id("optList").style.top = height-(120 + 75)+"px";
		}else{
			id("optList").style.top = moreBtn.offsetTop+"px";
		}
		qry("#optList span:nth-child(2)").setAttribute("data-url",moreBtn.getAttribute("data-url"));
		qry("#optList span:nth-child(1)").setAttribute("data-url",moreBtn.getAttribute("data-url"));
		id("optContainer").style.display = "block";
		};
	});
}//if case ends
};xhr.send();qry("#songlist span:nth-child(2)").innerHTML = url9.split("/")[url9.split("/").length - 1];id("songlist").style.left = 0+"px";}
function loadsong2(url2){if(playlist[currIndex] !== url2){var xhr = new XMLHttpRequest();xhr.open("GET","ajax.php?load="+encodeURIComponent(url2),true);xhr.onload = function(){audio.source(this.responseText);};xhr.send();}}
function next(){if(currIndex >= playlist.length - 1){if(loopS === 'repeatAll'){loadsong2(playlist[0]);currIndex = 0;}else if(loopS === 'repeatOne'){audio.source(audio.src);}else if(loopS === 'onceOne' || loopS === 'onceAll'){audio.source(false);}else{audio.source(false);}}else if(playlist.length == 0){audio.source(false);}else{if(loopS === 'repeatAll' || loopS === 'onceAll'){loadsong2(playlist[currIndex+1]);currIndex++;}else if(loopS === 'repeatOne'){audio.source(audio.src);}else if(loopS === 'onceOne'){audio.source(false);}}}
function prev(){if(currIndex <= 0){if(loopS === 'repeatAll'){loadsong2(playlist[playlist.length -1]);currIndex = playlist.length -1;}else if(loopS === 'repeatOne'){audio.source(audio.src);}else if(loopS === 'onceOne' || loopS === 'onceAll'){}else{audio.source(false);}}else if(playlist.length == 0){audio.source(false);}else{if(loopS === 'repeatAll' || loopS === 'onceAll'){loadsong2(playlist[currIndex - 1]);currIndex--;}else if(loopS === 'repeatOne'){audio.source(audio.src);}else if(loopS === 'onceOne'){audio.source(false);}}}
//css animation functions
function hide(elm,index){elm.style.transition = ".4s";elm.style.height = 0;if(index == playlist.length -1){playlist.pop();}else{playlist.splice(index,1);}if(currIndex >= index && currIndex != 0){currIndex -=1;}setTimeout(function(){elm.style.display = "none";updatePlaylist();},450);}
/*slider functions*/
function setBar(){fill.style.setProperty("width", (slider.value / 5) + "%");}
function setAudTime(){setBar();audio.currentTime = (slider.value/500)*audio.duration;}
function resize(){
	id("audiocontrol").style.top = innerHeight-49+"px";
	qry(".slidecontainer").style.top = innerHeight-((49*4)- 30)+"px";
	id("launchedcontrols").style.top = innerHeight-(49*2)+"px";
	id("playlist").style.height = innerHeight-(49*2)-1+"px";
	id("duration").style.top = innerHeight-(49*4.20)+"px";
	id("dirlist").style.height = innerHeight-70+"px";
	id("songlist").style.height = innerHeight-70+"px";
	id("player").style.top = innerHeight-65+"px";
}
resize()
id("playlist").style.opacity = 0;
id("playlist").style.display = 'none';
qry('input[value="repeatAll"]').click();
var launcher = id("launchplayer");

//references
const playpause = id("playpause");
const timestamp = qryAll("#duration span");
const seekslider = id("slider");
const fast = qryAll(".fast");
const nextprev = qryAll(".step");
const mute = qry(".mute");
const repeatBtn = qry(".repeatBtn");
const repeatOp = qryAll('input[name="repeat"]');
const plistBtn = qry(".playlistV");
const slider = qry("#slider");
const fill = qry(".bar .fill");
var audio = new Audio();
var playlist = new Array();
var currIndex = null;
var lastElmNodePlaylist = [];
var playlistElm = qryAll("#playlist #list .playlist-list");
var loopS = 'repeatAll'; // repeatOne onceAll onceOne
var touchStartPlDiv = 0;
var touchEndPlDiv = 0;
var seeking = false; //to prevent timeupdate while seeking
function removeURL(str){let newStr = str.split("/")[str.split("/").length - 1];newStr = newStr.split(".");newStr.pop();return newStr.join(".");}
function updatePlaylist(){
	qry("#list").innerHTML = "";
	playlist.forEach(function(song){
		var eelm = document.createElement("div");
		eelm.className = "playlist-list";
		eelm.innerHTML = '<a><i class="fas fa-arrows-alt-v"></i></a><a><i class="fas fa-music"></i></a><a class="name" onclick="loadsong2(`'+song+'`)">'+removeURL(song)+'</a><a class="i-btn"><i class="fas fa-ellipsis-v"></i></a>';
		qry("#list").appendChild(eelm);
		slideUI();
	});
}
function slideUI(){
	playlistElm = qryAll("#playlist #list .playlist-list");
	playlistElm.forEach(function(elm,index){
		elm.ontouchstart=function(e){touchStartPlDiv = e.touches[0].clientX;touchEndPlDiv = e.touches[0].clientX;};
		elm.ontouchmove=function(e){elm.style.left = Number(touchStartPlDiv - e.touches[0].clientX).toFixed(2)*(-1)+"px";touchEndPlDiv = e.touches[0].clientX;};
		elm.ontouchend=function(e){var width = getComputedStyle(elm).width.substr(0,getComputedStyle(elm).width.length - 2);var x = touchEndPlDiv;if(touchStartPlDiv - 50 >= x){elm.style.left -= width;hide(elm,index);}else{elm.style.left = 0+"px";}};
	
	});
}
function loadsong(url2,playlist5,i){
		var xhr = new XMLHttpRequest();
		xhr.open("GET","ajax.php?load="+encodeURIComponent(url2),true);
		xhr.onload = function(){
			playlist = playlist5.split("{|}");
			currIndex = i;
			updatePlaylist();
			audio.source(this.responseText);
		}
		xhr.send();
	}

onload = function(){
	quickxhr("scanner.php?dirs");
	
	
	}

/*audio play btn handling while doing with bulit in controls*/
setInterval(function(){if(true){if(audio.paused){id("playpause").querySelector("i").className = "fas fa-play";}else{id("playpause").querySelector("i").className = "fas fa-pause";}}},650);

audio.source = function(url){
	if(url===false){}
	else{
		this.src = url;
		this.play();
		var elm = qryAll("marquee");
		let audnm3 = url.split("/")[url.split("/").length-1];let audnm2 = audnm3.split(".");audnm2.pop();var audnm = audnm2.join(".");
		elm[0].innerHTML = audnm;elm[1].innerHTML = audnm;document.title = audnm;
		id("playpause").querySelector("i").className = "fas fa-pause";qry("#player").style.display = "block";
		//qry("#audiocontrol").style.display = "flex";
	}//else ends
}
//code
repeatOp.forEach(function(rpOp){
	rpOp.addEventListener("input",function(){loopS = this.value;id("repeat").style.display = "none";});
	rpOp.parentElement.parentElement.parentElement.parentElement.addEventListener("click",function(){id("repeat").style.display = "none";});
});
addEventListener("hashchange",function(){
	if(location.hash !== "#songlist"){id("songlist").style.left = 100+"vw";}
	else{id("songlist").style.left = 0+"vw";}
	if(location.hash !== "#player"){
		var player = id("player");var i = launcher.querySelector("i");player.style.top = innerHeight-65+"px";i.className = "fas fa-angle-up";	
	}else{
		var player = id("player");var i = launcher.querySelector("i");
		player.style.top = -16+"px";
		i.className = "fas fa-angle-down";	
	
	}
});
id("closeSong").addEventListener("click",function(){id("songlist").style.left = 100+"vw";id("song").innerHTML = null;});
id("optContainer").addEventListener("click",function(){setTimeout(function(){id("optContainer").style.display = "none";},120)},true);
qry("#optList span:nth-child(1)").addEventListener("click",function(){let urlw = qry("#optList span:nth-child(1)").getAttribute("data-url");playlist.splice(currIndex+1,0,urlw);updatePlaylist();});
qry("#optList span:nth-child(2)").addEventListener("click",function(){let nurl = qry("#optList span:nth-child(2)").getAttribute("data-url");if(nurl){playlist.push(nurl);updatePlaylist();}});
launcher.addEventListener("click",function(){var player = id("player");var i = launcher.querySelector("i");var num = -16;if(player.style.top == num+"px"){player.style.top = innerHeight-65+"px";i.className = "fas fa-angle-up";if(location.hash == "#player"){/*location.hash = '';*/}}else{player.style.top = num+"px";i.className = "fas fa-angle-down";}});
audio.addEventListener("timeupdate",function(){timestamp[1].innerHTML = inMin(audio.duration,1);timestamp[0].innerHTML = inMin(audio.currentTime,0);if(!seeking){slider.value = Math.round((audio.currentTime/audio.duration)*500);setBar();}});
playpause.addEventListener("click",function(){if(audio.paused){if(audio.src){playpause.querySelector("i").className = "fas fa-pause";audio.play();}else if(playlist.length !== 0){loadsong2(playlist[0]);currIndex = 0;playpause.querySelector("i").className = "fas fa-pause";}}else{audio.pause();playpause.querySelector("i").className = "fas fa-play";}});
repeatBtn.addEventListener("click",function(){id("repeat").style.display = "flex";});
mute.addEventListener("click",function(){if(audio.muted){audio.muted = false;mute.querySelector("i").className = "fas fa-volume-up";}else{audio.muted = true;mute.querySelector("i").className = "fas fa-volume-mute";}});
plistBtn.addEventListener("click",function(){var plist = id("playlist");if(plist.style.display == "none"){plist.style.display = "block";var i = 0;var intervalId = setInterval(function(){plist.style.opacity = i;if(plist.style.opacity >= 0.98){clearInterval(intervalId);}i += 0.1;},10);}else{plist.style.opacity = 0;setTimeout(function(){plist.style.display = "none";},190);}});
audio.addEventListener("ended",next);
nextprev[0].addEventListener("click",prev);
nextprev[1].addEventListener("click",next);
fast[0].addEventListener("click", function(){if(audio.currentTime >= 10 && playlist.length != 0){audio.currentTime -= 10;setBar();}});
fast[1].addEventListener("click", function(){if(audio.currentTime <= 10+audio.duration && playlist.length != 0){audio.currentTime += 10;setBar();}});
slider.addEventListener("change", setAudTime);
slider.addEventListener("touchstart", function(){seeking = true;});
slider.addEventListener("touchend", function(){seeking = false;});
window.addEventListener("resize", resize)
window.addEventListener("load", resize)
slideUI();
setBar();