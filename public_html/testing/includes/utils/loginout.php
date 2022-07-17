<?php require 'dbmanager.php';

if($_POST['action'] === 'login'){

  $result = array();

	$username = $_POST['un'];
	$password = $_POST['pw'];

	if($username == null || $password == null){
    $result[] = 'empty_fields';

    if($username == null)
      $result[] = 'empty_un';
    if($password == null)
      $result[] = 'empty_pw';

  }
	else
	{

		$sql = "SELECT * FROM users WHERE usrName=? OR usrEmail=?";
		$stmt = mysqli_stmt_init($conn);

		if(!mysqli_stmt_prepare($stmt, $sql)) {
			$result[] = 'system_err';
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
					$result[] = 'invalid_pw';
				}
				else if($pwdCheck == true)
				{
					session_id($row['usrName']);
					session_start();

					if($row['usrAccess'] == 0)
						session_set_cookie_params(0);
					else
						session_set_cookie_params($user_session_lifetime);


					$_SESSION["userid"] = $row['usrID'];
					$_SESSION["username"] = $row['usrName'];
					$_SESSION["useraccess"] = $row['usrAccess'];

					$result[] = 'successful_login';
					// header("Location: ../index.php");
					// header("Location: " . $_SERVER['HTTP_REFERER']);

				}
				else
				{
					$result[] = 'system_err';
				}

			}
			else
			{
				$result[] = 'invalid_un';
			}
		}

	}

  echo json_encode($result);
}
else if($_POST['action'] === 'logout'){
  session_start();
  session_unset();
  session_destroy();
  header("Location: ../../index.php");
  exit();
}
