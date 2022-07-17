<?php require "header.php"; ?>

<div id="demos_panel" class="panel">
  <div class="panel-tab" onclick="$('#demos_panel > .panel-inner').toggleClass('show');">code demos</div>
  <div class="panel-inner">
    <ul class="demo-list">
      <li onclick="load_demo('cgol')">Conway's game of life (sandbox) </li>
      <li onclick="load_demo('mask')">Dynamic Masking</li>
      <li onclick="load_demo('rend')">3d Rendering</li>
    </ul>
  </div>
</div>

<div id="demo_ui">

</div>


<!-- <div id="options_panel" class="panel">
  <div class="panel-tab" onclick="$('#options_panel > .panel-inner').toggleClass('show');" title="demo options">options</div>

  <div class="panel-inner">
    load a demo to show its options
  </div>
</div> -->

<?php require "footer.php"; ?>
