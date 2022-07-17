

<?php


if(isset($_SESSION['useraccess']) && $_SESSION['useraccess'] == 0):



?>


<div id="edit_mode_toggle" onclick="EditMode();">
  &#9998;
</div>

<div id="edtr_wrapper">
</div>

<script type="text/javascript">
AdminAccess();
</script>

<?php endif;?>
