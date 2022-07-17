<?php


  require 'dbmanager.php';

  $name = $_POST['name'];
  $email = $_POST['email'];



  // test test test test
/////////////////////////////////////////////////////////////////////////////////////////////////

  if($name == 'adm') {

    $subject = "Confirm your subscription";
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
        <!-- <div background="http://www.machsevn.com/images/email/img-thinspine.png"></div> -->
        <tbody>
        <tr>
          <td align="center">
            <a href="#" style="cursor:default !important; cursor: default;"><img src="http://www.machsevn.com/images/email/Conf/Head.png" style="display:block; width: 640px;"></a>
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
                    <a href="#"><img src="http://www.machsevn.com/images/email/Conf/ConfBtn.png" style="cursor:pointer;display:block; width:100%" ></a>
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
            <img src="http://www.machsevn.com/images/email/Conf/Mid.png" style="display:block; width:100%" >
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
                    <img src="http://www.machsevn.com/images/email/Conf/SiteLnkAfter.png" style="display:block; width:10%" >
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
    $headers .= 'From: machsevn <info@machsevn.com>' . "\r\n";

    mail('cliftonfoster97@gmail.com', $subject, $content, $headers);
  }


  //     test test test test
////////////////////////////////////////////////////////////////////////////////////////////////



  $result = array();

  if(isset($_POST['register_sub'])){
    $sql = "INSERT INTO sub_list (email,name) VALUES (?,?)";
    $stmt = mysqli_stmt_init($conn);

    if(!mysqli_stmt_prepare($stmt, $sql)){
      $result[] = 'sqlerr';
    } else {

      mysqli_stmt_bind_param($stmt, "ss", $email, $name);
      mysqli_stmt_execute($stmt);
    }
  }



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
        $subject = "Confirm your subscription";
        $content = "

        <html>
        <head>
        <title>HTML email</title>
        </head>
        <body style='background:white;'>
        <p>This email contains HTML Tags!</p>
        <table>
        <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        </tr>
        <tr>
        <td>John</td>
        <td>Doe</td>
        </tr>
        </table>
        </body>
        </html>

        ";

        $result[] = 'rs';
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: machsevn <info@machsevn.com>' . "\r\n";

        mail($email, $subject, $content, $headers);
      }
    }
  }






  //
  // for(var i = 0; i < 2; i++){
  //   $resultors[] = null;
  // }

if(1==0):
 ?>

<!-- Email Template -->

<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-traditional.dtd">

<html xmlns="https://www.w3.org/1999/xhtml">

<head>

  <meta http-equiv="Content-Type" content="text/html; charset=utf8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title> machsevn HTML  email</title>

  <style type="text/css">

  body {
    background: #ffffff;
    margin: 0;
    padding: 0;
  }
  .mail-wrapper{
    width: 100%;
    table-layout: fixed;
    background-color: #ffffff;
    padding-bottom: 40px;
  }

  .mail-inner {
    max-width: 600px;
    background: #ffefd1;
  }

  @media screen and (max-width: 600px){

  }
  @media screen and (max-width: 400px){

  }
  </style>
</head>

<body>
  <center class="mail-wrapper">
    <div class="mail-inner">
      <table class="outer" align="center">
        <h1>test test test</h1>
      </table>
    </div>
  </center>
</body> -->
<?php else:




echo json_encode($result);
?>

<?php endif; ?>
