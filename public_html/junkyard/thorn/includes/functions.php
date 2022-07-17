<?php

declare(strict_types=1);

/**
* @param SimpleXMLElement $xml
* @return array
*/

function XMLasTREE($node, $rootPath = "0")
{

  if($node->getName() == "root")
  {
    $tree .= '<div class="tree-branch pg-root">';
  }
  else {
    $tree .= '<div class="tree-branch" data-root="'. $rootPath .'">';
  }

  $tree .= '<div class="branch-handle"> <div class="branch-title">'.$nodePath.'</div> <div class="branch-options"> <div class="adm-button node-prompt-edit">Delete</div>';
  $tree .= '<div class="adm-button node-prompt-edit">insert</div>';
  $tree .= '<div class="adm-button node-prompt-edit" onClick="EditNode(\''.$rootPath.'\');">Edit</div></div></div>';

  $tree .= '<div class="branch-content" style="padding-left: 1rem;">';




  $childRoot = 0;
  $sibs = array();

  foreach($node->children() as $child=>$val)
  {
    if(in_array($child, $sibs)){
      $childRoot++;
    }else{
      $childRoot = 0;
    }
    $sibs[] = $child;

    $tree .= XMLasTREE($val, $rootPath.strval($childRoot));

  }

  // foreach($node->children() as $child){
  //   $tree .= XMLasTREE($child);
  // }
  $tree .= '</div>';


  $tree .= '</div>';

  return $tree;

}

function SiteTree($node, $tag, $rootPath = "0")
{

    $tree .= '<div class="edtr-page" data-root="'. $rootPath .'">';

      $tree .= '<div class="page-handle">';
      $tree .= '<div class="page-selected"> <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> <circle cx="50" cy="50" r="45"/> </svg> </div>';

        $tree .= '<div class="page-title">'. $node->getElementsByTagName("name")[0]->nodeValue . '</div>';

        $tree .= '<div class="page-options">';
        $childNodes = $node->getElementsByTagName($tag);

        if($childNodes->length > 0)
          $tree .= '<div class="show-children-opt node-prompt-edit"> <svg viewBox="0 25 100 40" xmlns="http://www.w3.org/2000/svg"> <circle cx="16.5" cy="50" r="10"/> <circle cx="49.5" cy="50" r="10"/> <circle cx="82.5" cy="50" r="10"/>  </svg> </div>';


          $tree .= '<div class="adm-button node-prompt-edit" onClick="EditNode(\''.$rootPath.'\');">Edit</div>';
        $tree .= '</div>';
      $tree .= '</div>';


      $tree .= '<div class="page-children branch" style="padding-left: 1rem;">';

      $childRoot = 0;
      $sibs = array();

      // $tree .= '<div class="add-page"> <svg viewBox="0 0 50 10" xmlns="http://www.w3.org/2000/svg"> <line x1="50" y1="0" x2="50" y2="100"/> </svg></div>';

      foreach($node->childNodes as $child=>$val) {
        if($val->nodeName == $tag)
        {
          if(in_array($child, $sibs))
          {
            $childRoot++;
          }
          else
          {
            $childRoot = 0;
          }

          $sibs[] = $child;

          $tree .= SiteTree($val,$tag, $rootPath.strval($childRoot));
        }
      }
      $tree .= '</div>';
    $tree .= '</div>';


  // foreach($node->children() as $child){
  //   $tree .= XMLasTREE($child);
  // }


  // $tree .= '</div>';

  return $tree;

}


function NodeinTree($xml, $path, $depth)
{

  $rootIndex = 0;
  $targetIndex = substr($path, $depth, 1);
  // $targetIndex = 0;


  foreach($xml->children() as $child)
  {
    // echo $child;
    if($rootIndex == $targetIndex){
      // if($child->hasChildren())
      // {
        // return NodeInTree($child, $path, $depth++);
      // }
      // else {

      // echo $depth ." - ". strlen($path).", " ;
      // echo $child;
      if($depth < strlen($path)-1)
      {
        return NodeInTree($child, $path, ++$depth);
      }

      return XMLasTREE($child);

      // }
    // }
    // else {
    }
    $rootIndex++;
    // else {
    //     if(substr($child->getName(),0,1) != "#")
    //     {
    //       $rootIndex++;
    //     }
    // }
    // $rootIndex++;
  }

  // $iterator->next();
  // $iterator->next();


  // var_dump($iterator->current());

  // foreach($nodes as $child){
     // && $child == substr($root, $rootIndex, 1)
    // if($rootIndex < strlen($root))
    // {
    //   // echo substr($root, $rootIndex++, 1);
    //   echo $rootIndex;
    //   return NodeInTree($val, $root, ++$rootIndex);
    // // }
    // // else if($rootIndex >= strlen($root)) {
    // //   return $val;
    // }
    // else {
    //   return $val->getName();
  //   echo $child;
  // }
}

function XMLnodeDetails($xml, $nodePath, $elementDetails){

  $selectedNode = NodeinTree($xml, $nodePath, 1);
  $details = json_decode($elementDetails, $assoc = true);

  $html = '<div id="element_css"><form>';

  foreach($details as $property=>$value)
  {
    $html .= "detail";
  }

  $html .= '</form></div>';
   // $details['background'];

  // for($i = 0; $i < strlen($nodePath); $i++){
  //   echo substr($nodePath, $i, 1);
  // }

  // return $selectedNode;

  // return $nodePath;

  return $html;

}



function xml2j($node) {
    // $root = (func_num_args() > 1 ? false : true);
    // $jsnode = array();
    $xmlArray = array();


    foreach($node->children() as $child){
      $xmlArray[$child->getName()] = array();
      array_push($xmlArray[$child->getName()], xml2js($child));
    }

    return json_encode($xmlArray);

    // if (!$root) {
    //     if (count($xmlnode->attributes()) > 0){
    //         $jsnode["$"] = array();
    //         foreach($xmlnode->attributes() as $key => $value)
    //             $jsnode["$"][$key] = (string)$value;
    //     }
    //
    //     $textcontent = trim((string)$xmlnode);
    //     if (count($textcontent) > 0)
    //         $jsnode["_"] = $textcontent;
    //
    //     foreach ($xmlnode->children() as $childxmlnode) {
    //         $childname = $childxmlnode->getName();
    //         if (!array_key_exists($childname, $jsnode))
    //             $jsnode[$childname] = array();
    //         array_push($jsnode[$childname], xml2js($childxmlnode, true));
    //     }
    //     return $jsnode;
    // } else {
    //     $nodename = $xmlnode->getName();
    //     $jsnode[$nodename] = array();
    //     array_push($jsnode[$nodename], xml2js($xmlnode, true));
    //     return json_encode($jsnode);
    // }
}

function xml2js(SimpleXMLElement $xml): array
{
    $parser = function (SimpleXMLElement $xml, array $collection = []) use (&$parser) {
        $nodes = $xml->children();
        $attributes = $xml->attributes();

        if (0 !== count($attributes)) {
            foreach ($attributes as $attrName => $attrValue) {
                $collection['atr'][$attrName] = strval($attrValue);
            }
        }

        if (0 === $nodes->count() && strval($xml) !== '') {
            $collection['txt'] = strval($xml);
            return $collection;
        }

        foreach ($nodes as $nodeName => $nodeValue) {
            if (count($nodeValue->xpath('../' . $nodeName)) < 2) {
                $collection[$nodeName] = $parser($nodeValue);
                continue;
            }

            $collection[$nodeName][] = $parser($nodeValue);
        }

        return $collection;
    };

    return [
        $xml->getName() => $parser($xml)
    ];
}
