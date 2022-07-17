<?php
require 'dbmanager.php';

function sub_conf($name, $email, $hshkey){
  $subject = "Confirm Your Subscription";
  $content = '
  <html>
  <head>
  <title>machsevn test email</title>
  <style type="text/css">
    body {
      background-color: red;
    }
    @font-face {
      font-family: \'courier_prime_code\';
      font-style: normal;
      font-weight: normal;
      src: local(\'courier_prime_code\'),url(\'https://www.machsevn.com/thorn/fonts/courier_prime_code.woff2\') format(\'woff2\'),
           url(\'https://www.machsevn.com/thorn/fonts/courier_prime_code.woff\') format(\'woff\');
    }

    @media screen and (max-width: 600px);
    {

    }

    @media screen and (max-width: 600px){

    }

  </style>
  </head>
  <body style="margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;background-color:#f7e701;background-image:none;background-repeat:repeat;background-position:20deg,;background-attachment:scroll;" >
  <center class="wrapper" style="table-layout:fixed;" >
    <table class="main-container" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;height:260px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;background-color:#f6e700;background-image:none;background-repeat:repeat;background-position:top left;background-attachment:scroll;" >
      <tbody>
      <tr>
        <td align="center">
         <a href="#"><img src="http://www.machsevn.com/images/email/Conf/Head.png" style="display:block; width: 640px;"></a>
        </td>
      </tr>
      <tr>
        <td align="center">
          <a href="#"><img src="http://www.machsevn.com/images/email/Conf/Lead.png" style="display:block; width: 100%;"></a>
        </td>
      </tr>
      <tr>
        <td align="center">
          <a href="#"><img src="http://www.machsevn.com/images/email/Conf/Follow.png" style="display:block; width: 100%;"></a>
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr>
                <td>
                  <img src="http://www.machsevn.com/images/email/Conf/ConfBtnBefore.png" style="display:block; width:100%" >
                </td>
                <td>
                  <a href="https://www.machsevn.com?sub-conf:'.$hshkey.'"><img src="http://www.machsevn.com/images/email/Conf/ConfBtn.png" style="cursor:pointer;display:block; width:100%" ></a>
                </td>
                <td>
                  <img src="http://www.machsevn.com/images/email/Conf/ConfBtnAfter.png" style="display:block; width:100%" >
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <img src="http://www.machsevn.com/images/email/Conf/ConfBtnBrk.png" style="display:block; width:100%" >
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr>
                <td>
                  <img src="http://www.machsevn.com/images/email/Conf/SiteLnkBefore.png" style="display:block; width:100%" >
                </td>
                <td>
                  <a href="http://www.machsevn.com">
                    <img src="http://www.machsevn.com/images/email/Conf/SiteLnk.png" style="cursor:pointer;display:block; width:100%" >
                  </a>
                </td>
                <td>
                  <img src="http://www.machsevn.com/images/email/Conf/SiteLnkAfter.png" style="display:block; width:100%" >
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <img src="http://www.machsevn.com/images/email/Conf/Foot.png" style="display:block; width:100%;" >
        </td>
      </tr>
    </tbody>
    </table>
  </center>
  </body>
  </html>
  ';


  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $headers .= 'From: Machsevn - Content/Apparel <info@machsevn.com>' . "\r\n";

  mail($email, $subject, $content, $headers);
}


if($_POST['action'] == 'sub-req'){

  $name = $_POST['name'];
  $email = $_POST['email'];

  $hshval = hash('md5', $fname.'-'.$lname.'-'.$email);

    // test test test test
  /////////////////////////////////////////////////////////////////////////////////////////////////

    if($name == 'adm')
    {
      sub_conf($name, 'cliftonfoster97@gmail.com', $hshval);
    }


    //     test test test test
  ////////////////////////////////////////////////////////////////////////////////////////////////

  $result = array();

  if($_POST['name'] == null || $_POST['email'] == null){
    $result[] = 'ef';

    if($_POST['name'] == null)
      $result[] = 'enf';
    if($_POST['email'] == null)
      $result[] = 'emf';

  } else if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $result[] = 'ie';
  } else {
    $sql = "SELECT email FROM sub_list Where email=?;";
    $stmt = mysqli_stmt_init($conn);

    if(!mysqli_stmt_prepare($stmt, $sql)){
      $result[] = 'sqlerr';
    }
    else {
      mysqli_stmt_bind_param($stmt, "s", $email);
      mysqli_stmt_execute($stmt);
      mysqli_stmt_store_result($stmt);

      $emailInstances = mysqli_stmt_num_rows($stmt);
      if($emailInstances > 0)
      {
        $result[] = 'et';
      }
      else {

        $sql = 'INSERT INTO sub_list(name, email, hashval) VALUES (?,?,?)';
        $stmt = mysqli_stmt_init($conn);

        if(!mysqli_stmt_prepare($stmt, $sql)) {
          $result[] = 'sqlerr';
        } else {
          mysqli_stmt_bind_param($stmt, "sss", $name, $email, $hshval);
          mysqli_stmt_execute($stmt);
        }

        sub_conf($name, $email, $hshval);

        $result[] = 'rs';
      }
    }
  }

  echo json_encode($result);

}
else if($_POST['action'] == 'sub-conf'){


  $subhash = $_POST['subhash'];

  $result = array();


  if(isset($subhash)){
    $sql = "UPDATE sub_list SET `confirmed` = 1 WHERE `hashval` = '".$subhash."';";
    $result[] = $sql;
    $stmt = mysqli_stmt_init($conn);

    if(!mysqli_stmt_prepare($stmt, $sql)) {
      $result[] = 'sqlerr';

    }
    else {
      // mysqli_stmt_bind_param($stmt, "s", $subhash);
      mysqli_stmt_execute($stmt);
      $result[] = 'success';
      // mysqli_stmt_execute($stmt);
    }
  }


  echo json_encode($result);
}
?>
