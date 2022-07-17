<?php

  session_start();
  //
  require 'includes/dbmanager.php';
  //
  if($_SERVER["REQUEST_METHOD"] =="POST" && $_POST['page'] != null){

    $pagename = $_POST['page'];
  //
    $pageid = hash('adler32', $pagename);
    $getpage = "SELECT * FROM Pages WHERE name = '".$pagename."';";
    $result = $conn->query($getpage);


    if($row = mysqli_fetch_assoc($result)) {
      $page = $row;
      $pagedata = $page['xml'];
    }
    $result->free();
  }


  function XMLtoHTML($node) {

    $html = '<div class="temp-element">';

    $html .= $node;
    // foreach ($node->attributes() as $key => $val) {
    //   $data .= 'data-'.$key.' = "'.$val.'" ';
    // }
    // echo $data;
    // echo '<div class="temp-element" '.$data.'>';

    foreach($node->children() as $child){
      $html .= XMLtoHTML($child);
    }
  //
    $html .= '</div>';

    return $html;
  //
  }

  $pagename = "temp";

  $pagedata = simplexml_load_file("pages/".$pagename."_page.xml");

?>


<?php

if($pagedata != null){
  // echo "page xml goes here";

  // $dom=new domDocument;
  // $dom->loadXML($pagedata);
  // $x=simplexml_import_dom($dom);





  echo XMLtoHTML($pagedata);

  // $xml = new SimpleXMLElement($pagedata);
  //
  // // Add a child element to the body element
  // // $xml->root->addChild("date","2014-01-01");
  //
  // // Add a child element after the last element inside note
  // // $footer = $xml->addChild("footer","Some footer text");
  //
  // foreach($xml->children() as $child){
  //   echo "child :" . $child;
  // }

  // $root = $xml->root;
  // echo $root->getChildren();

  // echo $xml->asXML();

}

  /* echo 'error 404.php';
  $xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><root>root node</root>', null, false);
  $updatepage = "UPDATE `Pages` SET `xml` = '".$xml->asXML()."' WHERE `Pages`.`pageid` = '".$pageid."';";
  $conn->query($updatepage);*/


?>
