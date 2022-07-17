
<!-- login out -->
<div id="utilities_wrapper">
  <?php	if(isset($_SESSION['useraccess'])) : ?>
    <div id="loginout" onclick="Logout();">logout</div>
    <div id="search_bar">
      <input type="text" name="" value="" placeholder="">
      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="151.23" height="182.19" viewBox="0 0 151.23 182.19">
        <title>search</title>
        <g>
          <circle cx="464.93" cy="101.75" r="51.78" transform="matrix(0.82, -0.57, 0.57, 0.82, -374.88, 247.72)" style="fill: none;stroke: #231f20;stroke-miterlimit: 10;stroke-width: 25px"/>
          <line x1="95.99" y1="108.69" x2="138.73" y2="169.69" style="fill: none;stroke: #231f20;stroke-linecap: round;stroke-miterlimit: 10;stroke-width: 25px"/>
        </g>
      </svg>

    </div>
    <div id="cart">cart</div>
  <?php else: ?>
    <div id="loginout" onclick="flyout('login');">login</div>
  <?php endif; ?>

</div>

<?php
  require 'flyouts.php';
  require 'navigation.php';

  if($_SESSION['useraccess'] === 0):
    require 'admin_portal.php';
  endif;
?>
