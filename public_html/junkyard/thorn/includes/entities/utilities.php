
<?php //switch between root utilities and page utilities depending on page prefrences ?>

<div id="util_wrapper">
	<div id="loginout_container">

		<?php if(!isset($_SESSION["username"])): ?>

		<div class="loginout" id="login_container" onclick="flyout('login');">login</div>

		<?php else : ?>

		<form class="loginout" action="includes/logout.php" method="post">
			<button type="submit" name="logout-submit">Logout</button>
		</form>

		<?php endif; ?>

	</div>

	<div id="cart_container" onclick="flyout('cart');">
		<div>cart</div>
		<script type="text/javascript">
			updateCart(0, null);
		</script>
		<div id="cart_count"><div></div></div>
	</div>
	<div id="search_container" onclick="flyout('search');">
		<div>search</div>
	</div>
</div>
