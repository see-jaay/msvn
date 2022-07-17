<div id="util_nav" class="nav-container">
		

	<form id="util_search" class="util-item" autocomplete="off">
		<input id="util_search_input" name="search" onsubmit="OnSubmit()" type="text" placeholder="Search...">
		<button>
			<?php include('images/search_icon.svg') ?>
		</button>
		<div id="search_close" class="close">X</div>
	</form>

	<div id="search_flyout"></div>


	<form id="util_cart" class="util-item" data-flyout="cart">
		<div id="cart_container">
			<?php include('images/cart_icon.svg') ?>
			<div id="cart_info">
				<span>0 Items</span>
				<span>$0.00</span>
			</div>
		</div>
		<!-- <a href="#">CART</a> -->
	</form>
<!-- 	<div id="search_blkout" class="blackout"></div>
	<div id="cart_blkout" class="blackout"></div> -->

</div>