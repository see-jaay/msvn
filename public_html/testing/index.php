<?php  //require "header.php";
$access = $_SESSION['useraccess'];
$action = $_POST['action'];

// if(isset($action) && $action === 'core.verify'){
//   $data = new stdClass();
//
//   $data->access = $access;
//
//   echo json_encode($data);
//   exit();
// }

if(isset($access)){

  if($access <= 1){
    require //'includes/utils/admin_portal.php';

    $data->access = 0;

  }
}else {?>

  <!-- <div id="site_wrapper"> -->
    <?php //require "includes/utils/utilities.php"; ?>
  <!-- </div> -->

  <?php
}
//require "footer.php";
?>
