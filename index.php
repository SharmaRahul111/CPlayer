<!DOCTYPE html>
<html>
<head>
<title>CPlayer</title>

<meta name="theme-color" content="#00f0ff">
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0">
<link rel="stylesheet" href="includes/fa-icons/css/all.min.css">
<link rel="stylesheet" href="includes/style.css">
<link rel="apple-touch-icon" href="includes/fa-icons/.ico/logo.png">
<link rel="shortcut icon" href="includes/fa-icons/.ico/logo.png">
<link rel="manifest" href="manifest.json" />
</head>
<body><!--//////////////////////////////-->
<!--loading...--><div id="loader"><img src="includes/fa-icons/.ico/logo.png"><p style="color:black;font-size:20px;position:relative;top:-20px;font-family:Courier new,monospace;">PLEASE WAIT...</p></div>
<!--directory listing--><main id="dirlist"><header><span id="navBtn"><i class="fa fa-bars"></i></span><span>CPlayer</span><span id="search1"><i class="fas fa-search"></i></span></header><div id="dirs" style="margin-top:55px;"></div></main>
<div id="player">
	<div id="playerShortcut">
		<div id="songname"><marquee></marquee></div>
		<div id="controls">
			<a href="#player" id="launchplayer" class="player-tab"><i class="fas fa-angle-up"></i></a>
			<marquee style="width:70%;display:flex;justify-content:center;font-size:13px;font-family:arial;"></marquee>
			<a class="playlistV playlist-tab"><i class="fas fa-list"></i></a>
		</div>
	</div>
	<div id="launchedcontrols"><span class="repeatBtn"><i class="fas fa-retweet"></i></span><span class="mute"><i class="fas fa-volume-up"></i></span></div>
	<div class="slider-container slidecontainer">
		<span class="bar"><span class="fill"></span></span>
		<input id="slider" class="slider" type="range" min="0" max="500" value="0">
	</div>
	<div id="duration"><span></span><span></span></div>
	<div id="background"><i class="fas fa-headphones"></i></div>
</div>
</div>
<nav></nav>
<!--music option like add to queue-->
<div id="optContainer"><div id="optList"><span>Play next</span><span>Add to queue</span><span>Add to playlist</span></div></div>
<!--playlist container--><div id="playlist"><div id="playlistHeader"></div><div id="list"><br><br><br><h3 style="text-align:center;font-family:Arial;">No songs playing, <br> yet.</h3></div></div>
<!--Main audio control like play/pause--><div id="audiocontrol"><span class="step"><i class="fas fa-step-backward"></i></span><span class="fast"><i class="fas fa-fast-backward"></i></span><span id="playpause"><i class="fas fa-play"></i></span><span class="fast"><i class="fas fa-fast-forward"></i></span><span class="step"><i class="fas fa-step-forward"></i></span></div>
<!--Song loop container--><div id="repeat"><div><label><span>One song and stop</span><span><input type="radio" name="repeat" value="onceOne"></span></label><label><span>One song loop</span><span><input type="radio" name="repeat" value="repeatOne"></span></label><label><span>One folder and stop</span><span><input type="radio" name="repeat" value="onceAll"></span></label><label><span>One folder loop</span><span><input type="radio" name="repeat" value="repeatAll"></span></label></div></div>
<!--songlist--><div id="songlist"><header style="font-size:22px;" ><span id="closeSong"><i class="fa fa-arrow-left"></i></span><span></span><span id="search2"><i class="fas fa-search"></i></span></header><div id="song" style="margin-top:55px;"></div>
<script src="includes/index.js"></script>
</body>
</html>