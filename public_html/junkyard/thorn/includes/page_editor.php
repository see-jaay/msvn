<?php

require 'dbmanager.php';
require 'functions.php';

if(isset($_POST['action']))
{

  if($_POST['action'] == 'add'){

    $pageName = $_POST['pagename'];
    $pageID = hash('adler32', $pageName);

    $xmlObj = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><root>'.$_POST['pagename'].'</root>', null, false);
    $xml = $xmlObj->asXML();

    $findDups = "SELECT * FROM Pages WHERE pageid = '".$pageID."';";
    $result = $conn->query($findDups);

    if($result->num_rows == 0)
    {
      $addpage = "INSERT INTO `Pages`(`pageid`,`name`,`xml`) VALUES ('$pageID','$pageName','$xml');";
      $conn->query($addpage);
    }
    else {
      echo "page already exists";
    }

  }
  else if($_POST['action'] == 'list') {
    $listdata = simplexml_load_file("../pages/page_list.xml");
  }

}

$getpages = "SELECT * FROM `Pages`";
$result = $conn->query($getpages);

while($row = $result->fetch_assoc()) {
  $pages[] = $row;
}

$result->free();

?>

<?php if( !isset($_POST['action']) ): ?>

<div class="editor-panel-primary">
  <div id="page_block_container">
    <?php foreach($pages as $key=>$page): ?>
      <div class="panel-block">
        <?php echo $page['name'].' page';?>
      </div>
    <?php endforeach; ?>
  </div>

  <div id="add_page_block">
    <input id="add_page_name" type="text">
    <div class="adm-button" onClick="AddPage();">Add Page</div>
  </div>
</div>

<?php elseif($_POST['action'] == 'list'):

  ?>


<?php elseif($_POST['action'] == 'update'): ?>



<?php endif; ?>

 <!-- <div class="" id="page_edit_toggle">
   page_editor
 </div> -->
