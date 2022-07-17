<?php
// switch between root navigation and path navigation depending on page prefrences;
?>


<!-- <div id="nav_wrapper" class="nav-wrapper home"> -->
	<ul id="menu_main" class="menu primary">
		<!-- <li class="disabled"><div onclick="window.location.hash = 'gallery';"><span>[</span>GALLERY<span>]</span></div></li> -->
		<!-- <li class="disabled"><div onclick="window.location.hash = 'info';"><span>[</span>MACHSEVN.INFO<span>]</span></div></li> -->
		<!-- <li class="trh" data-trh="shop"><div onclick="hsh('shop');"><span>[</span>machsevn.shop<span>]</span></div></li> -->
		<!-- <li class="disabled trh" data-trh="coming.soon"><div><span>[</span>.gallery<span>]</span></div></li> -->
		<!-- <li class="disabled trh" data-trh="coming.soon"><div><span>[</span>.info<span>]</span></div></li> -->
	</ul>
<!-- </div> -->


<div id="secondary_nav_wrapper" class="menu secondary">
	<ul id="secondary_menu_main">
		<!-- <li class="disabled"><div onclick="window.location.hash = 'gallery';"><span>[</span>GALLERY<span>]</span></div></li> -->
		<!-- <li class="disabled"><div onclick="window.location.hash = 'info';"><span>[</span>MACHSEVN.INFO<span>]</span></div></li> -->
		<li class="" data-trc="00000000" ><div onclick="hsh('creative-solutions');"><span>[</span>need a website?<span>]</span></div></li>
	</ul>
</div>


<?php if(1 == 0): ?>
<div class="nav-wrapper shop ui">
	<ul class="menu add-c">
		<li class="home"><div onclick="hsh('home');"><span>[</span>machsevn<span>]</span> > </div></li>
		<li class="current-page"></li>
		<script type="text/javascript">
			$('.current-page').html(window.location.hash.split('-')[1] || window.location.hash.substr(1));

			$('.menu > li').each(function(){
				$(this).css('opacity', $(this).prev().css('opacity') * .7);
			});
		</script>
	</ul>
</div>
<?php endif; ?>
