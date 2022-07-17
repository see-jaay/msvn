<?php 
	session_start();
 ?>

<!DOCTYPE html>

<html>
	<head>
		<meta charset="utf-8">
		<meta name="description" content="machsevn.">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<title></title>
	</head>

	<body>

		<header>
			<nav>
				<div>
					<h4>Admin Portal</h4>
					<form action="includes/login.inc.php" method="post">
						<input type="text" name="username" placeholder="username">
						<input type="password" name="password" placeholder="password">
						<button type="submit" name="login-submit">Login</button>
					</form>
					<a href="signup.php">Signup</a>
				</div>
			</nav>
		</header>