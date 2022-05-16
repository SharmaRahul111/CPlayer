<?php
if(isset($_GET["load"])){
	$nm = $_GET["load"];
	$arr = array_diff(scandir("audio/"),[".",".."]);
	foreach($arr as $ar){
		unlink("audio/".$ar);
	}
	copy($nm,"audio/".pathinfo($nm)["basename"]);
	echo "audio/".pathinfo($nm)["basename"];
}
?>