
<div id="utilities_wrapper">
  <?php	if(isset($_SESSION['useraccess'])) : ?>
    <div id="loginout" onclick="Logout();">logout</div>
  <?php else: ?>
    <div id="loginout" onclick="flyout('login');">login</div>
  <?php endif;?>
  <?php require 'flyouts.php'; ?>
</div>

<?php

?>
