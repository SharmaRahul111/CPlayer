<?php
function scanwholedir($url){
	$dirs = [];
	$mydirs = [];
	$files = [];
	$filesanddirs = [];
	$lists7 = scandir($url);
	$lists = array_diff($lists7,[".",".."]);
	foreach($lists as $list){
	$list2 = $url."/".$list;
	if(is_dir($list2)){
	array_push($dirs,$list2);
	array_push($mydirs,$list2);
	}else{
	array_push($files,$list2);
	}//if else ends
	array_push($filesanddirs,$list2);
	}//foreach ends
	$i = 0;
	while(count($dirs) > 0 && $i<1000){
	$scanurl = array_pop($dirs);
	$newdirs7 = scandir($scanurl);
	$newdirs = array_diff($newdirs7,[".",".."]);
	foreach($newdirs as $newdir){
	$newdir2 = $scanurl."/".$newdir;
	if(is_dir($newdir2)){
	array_push($dirs,$newdir2);
	array_push($mydirs,$newdir2);
	}else{
	array_push($files,$newdir2);
	}//if else ends
	array_push($filesanddirs,$newdir2);
	}//foreach ends
	$i++;
	}//while ends
	natsort($files);
	natsort($filesanddirs);
	natsort($mydirs);
	return array_values($files); //,array_values($filesanddirs),array_values($mydirs)];
	
	//return $filesanddirs;
}//function ends
	
function filterAudio($urlLists){
	$nameAndUrl = [];
	foreach($urlLists as $urlList){
	$urlParts = explode("/",$urlList);
	$fileName = array_pop($urlParts);
	$fileExt = explode(".",$fileName);
	$ext = array_pop($fileExt);
	if($ext == "mp3" || $ext == "ogg"){
	$nameAndUrl[$fileName] = implode("/",$urlParts);
	}
	}
	//ksort($nameAndUrl);
	return $nameAndUrl;
}
	function rmext($nm){
		$e = explode(".",$nm);
		array_pop($e);
		return implode(".",$e);
}
function giveName($url){
		$arr = explode("/",$url);
		return array_pop($arr);
}
function sizeofdir($url){
		$files = array_diff(scandir($url),[".",".."]);
		$size = 0;
		foreach($files as $file){
			$format = explode(".",$file);
			$form = array_pop($format);
			if($form == "mp3" || $form == "ogg"){
				$size += stat($url.'/'.$file)["size"];
			}
		}
		return (round($size/(1024*102.4))/10)."MB";
}
	if(isset($_GET["dirs"])){
		$myList = scanwholedir("file:///sdcard");
		$newlist = scanwholedir("file:///storage/5B60-0F04");
		foreach($newlist as $n){
			array_push($myList,$n);
		}
		$filteredAudio = filterAudio($myList);
		$sameDir = array_count_values($filteredAudio);
		$dirnames = array_keys($sameDir);
		$dirnames = array_diff($dirnames,["file:///storage/sdcard0/htdocs/cplayer","file:///storage/sdcard0/htdocs/cplayer/audio"]);
		natsort($dirnames);
		foreach($dirnames as $dirname){
		$loc = explode("/",$dirname);
		$loc2 = ($loc[4]=="sdcard0")?"Internal storage":"SD card";
		echo '<a href="#songlist" onclick="scansong(\''.$dirname.'\')" class="dir songlist-tab"><span><i class="fas fa-folder"></i></span><span data-url="'.$dirname.'" data-location="'.$loc2.'" data-size="'.sizeofdir($dirname).'" data-items="'.$sameDir[$dirname].' items">'.giveName($dirname).'</span><span><i class="fas fa-ellipsis-v"></i></span></a>';
		}
	}
		
		if(isset($_GET["songs"])){
			$audios = array_diff(scandir($_GET["songs"]),[".",".."]);
			$pl = array_diff(scandir($_GET["songs"]),[".",".."]);
			
			foreach($pl as $p){
			$pm = explode(".",$p);
			$anyt = array_pop($pm);
			if($anyt == "mp3" || $anyt == "ogg"){
			$pk = "";
			$pk .= $_GET["songs"]."/".$p."{|}";
			}
			}
			$pk = explode("{|}",$pk);
			array_pop($pk);
			$pk = implode("{|}",$pk);
			$i = 0;
			foreach($audios as $audio){
				$format = explode(".",$audio);
				$form = array_pop($format);
				if($form == "mp3" || $form == "ogg"){
				$nm = stat($_GET["songs"]."/".$audio)["size"];
				$size = (round($nm/(1024*102.4))/10)."MB";
				
				echo "<a class=\"song\"><span><i class=\"fas fa-music\"></i></span><button onclick=\"loadsong(`".$_GET["songs"]."/".$audio."`,`".$pk."`,".$i.")\" class=\"bttn\" data-size=\"".$size."\">".rmext(giveName($audio))."</button><span class=\"more-btn\" data-url=\"".$_GET["songs"]."/".$audio."\"><i class=\"fas fa-ellipsis-v\"></i></span></a>";
				$i += 1;
				}
			}
		}

?>