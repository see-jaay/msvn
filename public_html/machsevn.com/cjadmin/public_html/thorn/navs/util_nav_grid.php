<div id="util_nav_wrapper">

	<div id="util_search" class="util-item add-c">
		<input id="util_search_input" name="search" action="search.php" onsubmit="OnSubmit()" type="text" placeholder="Search..." autocomplete="off">
		<button>
			<?php include dirname(__FILE__).'/../images/search_icon.svg' ?>
		</button>
		<div id="search_close" class="close">X</div>
	</div>

	<div id="search_flyout"></div>


	<div id="util_cart" class="util-item" data-flyout="cart">
		<div id="cart_container">
			<?php include dirname(__FILE__).'/../images/cart_icon.svg'; ?>
			<div id="cart_info" class="add-c">
				<span>0 Items</span>
				<span>$0.00</span>
			</div>
		</div>
		<!-- <a href="#">CART</a> -->
	</div>
<!-- 	<div id="search_blkout" class="blackout"></div>
	<div id="cart_blkout" class="blackout"></div> -->
</div>
