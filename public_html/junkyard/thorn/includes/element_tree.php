

<?php

require 'dbmanager.php';
require 'functions.php';

if($_SERVER["REQUEST_METHOD"] =="POST" && $_POST['pagename'] != null){

  $pagename = $_POST['pagename'];
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

$pagedata = simplexml_load_file("../pages/temp_page.xml");
// printf($pagedata);

 ?>

<div id="tree_container">

  <?php if($pagedata != null):
    // $dom = new domDocument;
    // $dom->loadXML($pagedata);
    // $headNode = simplexml_import_dom($dom);
    //
    $data = array();
    echo XMLasTREE($pagedata);

    // $xml = new SimpleXMLIterator( $pagedata->asXML() );
    // for( $xml->rewind(); $xml->valid(); $xml->next() ) {
    //   foreach($xml->getChildren() as $name => $data) {
    //     echo "The $name is '$data'";
    //     echo "<br>";
    //   }
    // }

    ?>

  <script type="text/javascript">
    var branches = document.getElementsByClassName("branch-title");
    var i;

    for (i = 0; i < branches.length; i++) {
      // branches[i].nextElementSibling.style.display = "none";
      branches[i].addEventListener("click", function(e) {
          this.parentElement.parentElement.classList.toggle("active");
          // var branchContent = this.nextElementSibling;
          // if (branchContent.style.display === "block") {
          // } else {
          // }

      });

      branches[i].nextElementSibling.addEventListener("mouseenter", function() {
        this.classList.toggle("show");
          // this.style.display = "block";
      });
      branches[i].nextElementSibling.addEventListener("mouseleave", function(){
        this.classList.toggle("show");
          // this.style.display = "none";
      });
    }
  </script>
  <style>
  .branch-handle {
    display: flex;
  }
  .branch-options {
    flex-grow: 100;
    height: 12px;
  }
  .branch-title {
    cursor: pointer;
  }
  .branch-options > * {
    float: right;
  }

  .branch-options:not(.show) > * {
    display: none;
  }
  .branch-options.show > *{
    display: block;
    float: right;
    padding: 1px 2px;
    transform: scale(.75) translateY(-25%);

  }
  .tree-branch.active > .branch-content{
    display: block;
    /* display: inline; */
  }
  .tree-branch:not(.active) > .branch-content{
    display: none;
  }
  /* .tree-branch:not(.active) > .branch-content {
    display: none;
  }
  .tree-branch.active > .branch-content {
    display: inline;
  } */
  </style>
  <?php endif; ?>
</div>
