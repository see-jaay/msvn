

<?php
	
	// 1 == 2 Days
	$day = 3600 * 24;
	$guest_session_lifetime = $day;
	$user_session_lifetime = $day * 2;
	$admin_session_lifetime = $day * 15;


	$svrName = "localhost";
	$svrUsername = "cjadmin";
	$svrPassword = "password";
	$dbName = "MachSevn_Data";

	$conn = mysqli_connect($svrName, $svrUsername, $svrPassword, $dbName);

	if(!$conn) {
		die("Connection failed: ". mysqli_connection_error());
	}


