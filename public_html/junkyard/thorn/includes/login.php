

<?php

if(isset($_POST['login-submit']))
{
	require 'dbmanager.php';

	$username = $_POST['un'];
	$password = $_POST['pwd'];

	if(empty($username) || empty($password))
	{
		header("Location: ../index.php?error=emptyfields");
		exit();
	}
	else
	{

		$sql = "SELECT * FROM users WHERE usrName=? OR usrEmail=?";
		$stmt = mysqli_stmt_init($conn);

		if(!mysqli_stmt_prepare($stmt, $sql)) {
			header("Location: ../index.php?error=stmtfail");
			exit();
		}
		else
		{
			mysqli_stmt_bind_param($stmt, "ss", $username, $username);
			mysqli_stmt_execute($stmt);

			$rslt = mysqli_stmt_get_result($stmt);

			if($row = mysqli_fetch_assoc($rslt)){

				$pwdCheck = password_verify($password, $row['usrPwd']);
				if($pwdCheck == false)
				{
					header("Location: ../index.php?error=wrongpwd");
					exit();
				}
				else if($pwdCheck == true)
				{
					session_id($row['usrName']);
					session_start();

					if($row['usrAccess'] == 0)
						session_set_cookie_params (0);
					else
						session_set_cookie_params($user_session_lifetime);


					$_SESSION["userid"] = $row['usrID'];
					$_SESSION["username"] = $row['usrName'];
					$_SESSION["useraccess"] = $row['usrAccess'];

					header("Location: ../index.php?login=success");
					// header("Location: " . $_SERVER['HTTP_REFERER']);

					exit();
				}
				else
				{
					header("Location: ../index.php?error=sqlerror");
					exit();
				}

			}
			else
			{
				header("Location: ../index.php?error=nouser");
				exit();
			}
		}

	}


}
else
{
	header("Location: ../index.php?noaccess");
	exit();
}
