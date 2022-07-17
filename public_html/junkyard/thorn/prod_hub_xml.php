<?php

  session_start();
  //
  require 'includes/dbmanager.php';
  //
  if($_SERVER["REQUEST_METHOD"] =="POST" && $_POST['prod_id'] != null){
    $prodid = $_POST['prod_id'];
  }
  //
  $pagename = 'product_page_'.$prodid;
  $pageid = hash('adler32', $pagename);
  $getpage = "SELECT * FROM Pages WHERE NAME = '".$pagename."';";
  $result = $conn->query($getpage);


  if($row = mysqli_fetch_assoc($result)) {
    // $page = $row;
    // echo "page found";
  }
  else {
    // $addpage = "INSERT INTO `Pages` (`pageid`, `name`) VALUES ('$pageid', '$pagename')";
    // $conn->query($addpage);
    // echo $addpage;
  }
//
  // $result->free();

?>
