<?php

require 'dbmanager.php';
//
session_start();
//
if(isset($_POST['action'])){
  if( $_POST['action'] == 'load')
  {

    $sql = "SELECT * FROM `site_data` ORDER BY ID DESC LIMIT 1";
    //
    if($result = $conn->query($sql) ){
    //
    	while($row = $result->fetch_assoc()){
        $data = $row;
      }


      echo json_encode($data['data']);

    }
  }
  else if( $_POST['action'] == 'save')
  {
    $sql = "INSERT INTO site_data (data) VALUES (?)";
    $stmt = mysqli_stmt_init($conn);

    mysqli_stmt_prepare($stmt, $sql);

    mysqli_stmt_bind_param($stmt, 's', $_POST['data']);

    mysqli_stmt_execute($stmt);

  }
}
?>
