<?php

// $xml = simplexml_load_file('../xml/editor/page_list.xml');
// // echo '<div>Hello World</div>';
// echo $xml;


  // session_id('ADMIN_EDIT');
  session_start();

  require 'functions.php';


  if(isset($_SESSION['temp_edits']) && count($_SESSION['temp_edits']) > 10000000)
  {
    // ++$_SESSION[''];
    // echo $_SESSION['temp_edits'];
    echo json_encode($_SESSION['temp_edits']);
  }
  else {


    // $dom = new DOMDocument();
    // $dom->preserveWhiteSpace = false;
    //
    // $dom->Load($file);
    // $root = $dom->documentElement;

    $root = simplexml_load_file('../xml/pages.xml');

    // $xfiles[$name] = xml2js($x);
    // $xfiles[$name] = $root;

    //  $xml[0];
    $_SESSION['temp_edits'] = xml2js($root);
    echo json_encode($_SESSION['temp_edits']);
  }




?>
