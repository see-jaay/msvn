
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width"/>

 	<link rel="stylesheet" type="text/css" href="css/style.css" />


</head>

<body>


 	<div id="nav_wrapper">
		
		<?php include('util_nav.php') ?>
		<div id="cart_float_container " class="">
			<?php //include('cart_flyout.php'); ?>
		</div>

		<div id="menu_item_right" class="menu-item right"><a href="#"></a></div>
		<div id="menu_item_left" class="menu-item left"><a href="#"></a></div>

	</div>

	<div class="center-width anchor" id="menu_arrow" style="width:15px; position: absolute;" data-pos="bottom" data-offset="20" data-hover="up,30px;scale,1.1"><?php //include('images/arrow_icon.svg'); ?></div>



	<div id="page_wrapper" data-pos="0">




		<div id="home_page_container" class="aside-page-container" data-pgid="0" data-page="home">

			<video id="video_overlay2" autoplay="true" muted="muted" loop="true">
				<source src="videos/video_overlay8.mp4" type="video/mp4">
			</video>

<!-- 		<video id="video_overlay2" autoplay="true" muted="muted" loop="true">
				<source src="videos/video_overlay7.mp4" type="video/mp4">
			</video> -->
			<!-- SHOW VINE ANIMATIONS -->
			<div id="vineArt"></div>
			<div class="center-text center-width center-height" id="center_text">MACHSEVN</div>

		</div>
		<!-- <div id="background_color_box"></div>	 -->

		<div id="shop_page_container" class="aside-page-container" data-pgid="-1"  data-page="shop"></div>
		<div id="abt_page_container" class="aside-page-container" data-pgid="1"  data-page="abt"></div>
		<div id="cart_page_container" class="aside-page-container" data-pgid="2"  data-page="cart"></div>


		 



		<!-- SHOW TEXT GRID -->
		<div id="textGrid" style="position: absolute; left: 6%;"></div>


	</div>



<!-- <object id="vines" data="Effects/Vine_Art/Vines.svg" type="image/svg+xml" height="500" width="840" onload="VinesInit()">
	
</object> -->


</body>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script type="text/javascript" src="Effects/Global/Math.js"></script>
<script type="text/javascript" src="Effects/Global/Random.js"></script>
<script type="text/javascript" src="Effects/Global/Vector3.js"></script>
<script type="text/javascript" src="Effects/Vine_Art/VA_Node.js"></script>
<script type="text/javascript" src="Effects/Vine_Art/VA_Vine.js"></script>
<script type="text/javascript" src="Effects/Vine_Art/VA_Main.js"></script>


<script type="text/javascript" src="Effects/Text_Effects/Text_Object.js"></script>
<script type="text/javascript" src="Effects/Text_Effects/roll_effect.js"></script>
<script type="text/javascript" src="Effects/Text_Effects/shift_effect.js"></script>
<script type="text/javascript" src="Effects/Text_Effects/Text_Grid.js"></script>
<script type="text/javascript" src="Effects/Text_Effects/main.js"></script>



<script type="text/javascript" src="js/search.js"></script>
<script type="text/javascript" src="js/main.js"></script>

<!-- <footer>
	
</footer> -->
</html>
