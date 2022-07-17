


<?php $_SESSION["location"] = "home"; ?>





<div class="popup-wrapper rotate layer-container">
<div class="none"><div>
</div>

<!-- <div id="footer_wrapper"> -->
	<!-- <div id="copyright"> c machsevn ~ llc | all.rights.reserved </div> -->
	<!-- <div id="version"> v.1.71.04 </div> -->
<!-- </div> -->


<div id="content_wrapper" class="layer-container">
	<div class="lyr home" data-name="home"><?php include('layers/home.php');?></div>
	<div class="lyr shop" data-name="shop"><?php include('layers/shop.php');?></div>
	<div class="lyr gallery" data-name="gallery"><?php include('layers/gallery.php'); ?></div>
	<div class="lyr info" data-name="info"><?php include('layers/info.php'); ?></div>
	<!-- <div> test</div> -->

	<!-- <div class="layer roadmap disabled" data-name="roadmap"><?php include('layers/roadmap.php'); ?></div> -->
</div>



<script type="text/javascript">
		SetLayout('layer-scroll');
</script>
