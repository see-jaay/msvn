<?php

require 'dbmanager.php';
require 'functions.php';

if($_SERVER["REQUEST_METHOD"] == "POST" && $_POST['action'] == "get") {

  if($_POST['pagename'] != null
  && $_POST['nodePath'] != null
  && $_POST['elementDetails'] != null)
  {
    $pagename = $_POST['pagename'];
    $nodePath = $_POST['nodePath'];
    $elementDetails = $_POST['elementDetails'];

    $pagedata = simplexml_load_file("../pages/".$pagename."_page.xml");
    echo XMLnodeDetails($pagedata, $nodePath, $elementDetails);

  }
  else
  {
    echo "required post data: pagename / nodePath / elementDetails";
  }
}

 ?>
