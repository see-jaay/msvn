
<?php

	if(isset($_POST['signup-submit']))
	{
		require 'dbmanager.php';

		$username = $_POST['un'];
		$password = $_POST['pwd'];
		$passwordrpt = $_POST['pwdrpt'];
		$email = $_POST['mail'];

		if(empty($username) || empty($password) || empty($passwordrpt) || empty($email)) {
			header("Locaiton: ../index.php?error=emptyfields&un=".$username."&mail=".$email);
			exit();
		} else if (!filter_var($email, FILTER_VALIDATE_EMAIL) && !preg_match("/^[a-zA-Z0-9]*$/", $username)) {
			header("Locaiton: ../index.php?error=invalidmailun");
			exit();
		} 

		else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			header("Locaiton: ../index.php?error=invalidmail&un=".$username);
			exit();
		} 
		else if (!preg_match("/^[a-zA-Z0-9]*$/", $username)) {
			header("Locaiton: ../index.php?error=invalidun&mail=".$email);
			exit();
		}
		else if($password !== $passwordrpt) {
			header("Locaiton: ../index.php?error=passwordcheck&un=".$username."&mail=".$email);
			exit();
		}
		else{
			$sql = "SELECT usrName FROM users Where usrName=?;";
			$stmt = mysqli_stmt_init($conn);

			if(!mysqli_stmt_prepare($stmt, $sql)) {
				header("Location: ../index.php?error=sqlerror");
				exit();
			}
			else {
				mysqli_stmt_bind_param($stmt, "s", $username);
				mysqli_stmt_execute($stmt);

				mysqli_stmt_store_result($stmt);

				$resultCheck = mysqli_stmt_num_rows($stmt);

				if($resultCheck > 0)
				{
					header("Location: ../index.php?error=usertaken&mail=".$email);
					exit();
				}
				else
				{
					$sql = "INSERT INTO users (usrName, usrEmail, usrPwd) VALUES (?,?,?)";
					$stmt = mysqli_stmt_init($conn);

					if(!mysqli_stmt_prepare($stmt, $sql)) {
						header("Location: ../index.php");
						exit();
					} else {

						$hashedPwd = password_hash($password, PASSWORD_DEFAULT);

						$un = $username;

						mysqli_stmt_bind_param($stmt, "sss", $username, $email, $hashedPwd);
						mysqli_stmt_execute($stmt);


						$sql = "SELECT * FROM users WHERE usrName=?";
						$stmt = mysqli_stmt_init($conn);

						if(!mysqli_stmt_prepare($stmt, $sql))
						{
							header("Locaiton: ../index.php?signin=failed");
							exit();
						}
						else
						{
							mysqli_stmt_bind_param($stmt, "s", $un);
							mysqli_stmt_execute($stmt);

							$rslt = mysqli_stmt_get_result($stmt);
							$row = mysqli_fetch_assoc($rslt);

							session_set_cookie_params($usr_session_lifetime);
							session_start();

							$_SESSION["userid"] = $row['usrID'];
							$_SESSION["username"] = $row['usrName'];
							$_SESSION["useraccess"] = $row['usrAccess'];

						}





						header("Location: ../index.php?signup=success");
						exit();

					}

				}

			}
		}
		mysqli_stmt_close($stmt);
		msqli_close($conn);

	} else {
		header("Location: ../index.php?noaccess");
		exit();
	}