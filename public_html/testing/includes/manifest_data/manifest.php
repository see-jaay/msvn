<?php

// function getManifest($theme, $ver){
//     $manifestPath = $theme . "/".$ver.".txt";
//
//     return dirname(dirname(__FILE__)).$manifestPath;
// }

function lastver($dir, $theme)
{
  $history = array();
  if($handle = opendir($dir.$theme)){
    while(false !== ($file = readdir($handle))){
      if($file != "." && $file != ".."){
        $history[filemtime($file)] = $file;
      }
    }
    closedir($handle);
    ksort($history);

    $last = end($history);
    // $data = @file_get_contents($dir.$theme);

    // echo $last;
    return $last;

  }

}


  $action = $_POST['action'];
  $theme = $_POST['theme'];
  $serial = $_POST['ser'];


  //
  $dir = dirname(__FILE__)."/";
  //
  //
  if($action == "load"){
    $last = lastver($dir, $theme);
    $path = $theme."/".$last;

    echo '{"action":"'.$action.'","data":'.@file_get_contents($path).'}';

  }
  else if($action == "save"){ // save current state of theme
    $last = lastver($dir, $theme);
    $path = $theme."/".$last;


    // echo @file_get_contents('victoria/v3.0.4.txt');
    $f = fopen($path, 'w');
    // echo $serial;
    fwrite($f, $serial);
    fclose($f);

    echo '{"action":"'.$action.'","data":'.@file_get_contents($path).'}';
  }
  else if($action == "saveas"){

  }
  else if($action == "new"){

    if(!is_dir($dir.$theme)){
      mkdir($dir.$theme);
      $data = new stdClass();
      $data->action = 'new';
      $data->theme = $theme;

      $file = fopen($dir.$theme."/v.0.1.1.txt", "x");
      echo json_encode($data);
    }
  }
  else if($action == "delete"){
    $data = new stdClass();
    $data->action = 'delete';
    $data->data = $dir;

    echo json_encode($data);
  }



  // $manifest = getManifest($theme, $version);


  // echo $manifest;



 ?>
