

	
<?php $_SESSION["location"] = "home"; ?>


<div id="nav_wrapper" class="nav-wrapper home">
	<ul id="menu_main" class=" menu add-c">
		<!-- <li class="disabled"><div onclick="window.location.hash = 'gallery';"><span>[</span>GALLERY<span>]</span></div></li> -->
		<!-- <li class="disabled"><div onclick="window.location.hash = 'info';"><span>[</span>MACHSEVN.INFO<span>]</span></div></li> -->
		<li class="trh" data-trh="shop"><div onclick="hsh('shop');"><span>[</span>machsevn.shop<span>]</span></div></li>
		<li class="disabled trh" data-trh="coming.soon"><div><span>[</span>.gallery<span>]</span></div></li>
		<li class="disabled trh" data-trh="coming.soon"><div><span>[</span>.info<span>]</span></div></li>

	</ul>
</div>

<div id="secondary_nav_wrapper">
	<ul id="secondary_menu_main">
		<!-- <li class="disabled"><div onclick="window.location.hash = 'gallery';"><span>[</span>GALLERY<span>]</span></div></li> -->
		<!-- <li class="disabled"><div onclick="window.location.hash = 'info';"><span>[</span>MACHSEVN.INFO<span>]</span></div></li> -->
		<li class="disabled" data-trc="00000000" ><div onclick="hsh('creative-solutions');"><span>[</span>need a website?<span>]</span></div></li>
	</ul>
</div>

<div class="popup-wrapper rotate">
	
</div>

<div id="footer_wrapper">
	<div id="copyright"> c machsevn ~ llc | all.rights.reserved </div>
	<div id="version"> v.1.71.04 </div>
</div>


<div id="content_wrapper">
	<div id="home_title" class="title ctr-hor ctr-vert">
		<a href="#" id="home_title_inner" class="title-inner roll-text">MACHSEVN</a>
		<script type="text/javascript">
			//TRInit();
		</script>
	</div>
</div>


<div id="util_wrapper"> 

	<?php include ('includes/entities/util_nav.php');?>
</div>