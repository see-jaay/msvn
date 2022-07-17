<footer>


<!-- <div id='logger'></div> -->
<!-- <canvas id="glcanvas" class="glcnv" width="300" height="300"></canvas> -->
<!-- <canvas id="bsodcanv" class="cnv" data-efct="bsod"></canvas> -->
<!-- <canvas id="cmd_canvas"></canvas> -->

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>


<!-- <script type="text/javascript" src="js/utils/random.js"></script> -->
<!-- <script type="text/javascript" src="js/utils/utilities.js"></script> -->
<!-- <script type="text/javascript" src="js/utils/Navigation.js"></script> -->
<!-- <script type="text/javascript" src="js/local/main.js"></script> -->
<!-- <script type ="text/javascript" src="js/Effects/BSOD/main.js"></script> -->

<!-- <script type="text/javascript" src="../../js_common/Renderer/RNDR_main.js"></script> -->

<?php
if(isset($access) == false):
  $access = 100;
endif;

if(isset($access) && $access === 0) :?>
  <!-- <link rel="stylesheet" href="../js_common/Editor/style.css"> -->

<!-- <script type="text/javascript" src="../js_common/Editor/Editor_Main.js"></script> -->
<?php
endif;
?>


<!-- <script type="module" src="js/local/core.js" onload="Core.Init(<?php // $access;?>)"></script> -->
<!-- <script type="module" src="js/local/core.js" onload="(async (axs) => { -->
  <!-- const {default: core, frames} = await import('../../testing/js/local/core.js') -->
  <!-- .then( (core) => {core.Init(<?php //$access; ?>) ); -->
<!-- })();"></script> -->

<!-- <script type="module" src="js/local/core.js" onload="load()"></script> -->

<script type="module">
(async (axs) => {
  const {default: init} = await import('../../../js_common/core.js');
  return await { i:(() => init(axs))() };
})(<?php echo $access ?>);
</script>
<!-- <script type="text/javascript" src="../junkyard/thorn/js/Effects/Global/Random.js"></script> -->
<!-- <script type="text/javascript" src="../junkyard/thorn/js/Effects/Global/Math.js"></script> -->
<!-- <script type="text/javascript" src="../js_common/CMD_text_effect/CMD.js"></script> -->
<!-- <script type="module" src="../js_common/core.js"></script> -->
</footer>

</body>
</html>
