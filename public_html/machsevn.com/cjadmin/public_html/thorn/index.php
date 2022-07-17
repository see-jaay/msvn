
<?php 


	require 'includes/dbmanager.php';


	session_set_cookie_params ($guest_session_lifetime);
	session_start();


	if(!isset($_SESSION["cart"]))
		$_SESSION["cart"] = [];


	
	$sql = "SELECT * FROM Popups;";
	$result = $conn->query($sql);

	while($row = $result->fetch_assoc()) {
		$popups[] = $row;
	}

	$result->free();
?>


<!DOCTYPE html>
<html>
<head>
<link rel="shortcut icon" href="#">

	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
	<title></title>

	<link rel="stylesheet" type="text/css" href="css/main.css" />
	<link rel="stylesheet" type="text/css" href="css/navigation.css" />
	<link rel="stylesheet" type="text/css" href="css/flyout.css" />

	<link rel="stylesheet" type="text/css" href="css/product.css" />
	<link rel="stylesheet" type="text/css" href="css/shop.css" />
	<link rel="stylesheet" type="text/css" href="css/creative-solutions.css" />
	<link rel="stylesheet" type="text/css" href="css/admin.css" />
	<link rel="stylesheet" type="text/css" href="css/hud_grid.css" />



	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script src="plugins/jquery-cookie-master/src/jquery.cookie.js"></script>

	<script type="text/javascript" src="js/grid.js"></script>
	<script type="text/javascript" src="js/Effects/Global/utilities.js"></script>
	<script type="text/javascript" src="js/Effects/Global/Random.js"></script>

	<script type="text/javascript" src="js/Effects/Global/Random.js"></script>
	<script type="text/javascript" src="js/Effects/Global/Vector3.js"></script>
	<script type="text/javascript" src="js/Effects/Global/Math.js"></script>

	<!-- <script type="text/javascript" src="Effects/Vine_Art/VA_Node.js"></script> -->
	<!-- <script type="text/javascript" src="Effects/Vine_Art/VA_Vine.js"></script> -->
	<!-- <script type="text/javascript" src="Effects/Vine_Art/VA_Main.js"></script> -->

<!-- 	<script type="text/javascript" src="Effects/Vine_Art/Locals/Node-local.js"></script>
	<script type="text/javascript" src="Effects/Vine_Art/Locals/Vine-local.js"></script>
	<script type="text/javascript" src="Effects/Vine_Art/Locals/Main-local.js"></script> -->

	<script type="text/javascript" src="js/Effects/Vine_Art/Lite/Main.js"></script>

	<script type="text/javascript" src="js/Effects/CMD/CMD.js"></script>

	<script type="text/javascript" src="js/Effects/Loaders/Loader.js"></script>

	<script type="text/javascript" src="js/Effects/Text_Roll.js"></script>

	<script type="text/javascript" src="js/Effects/Desktop/Desktop_Main.js"></script>
	<script type="text/javascript" src="js/Effects/hud_grid.js"></script>


	<script type="text/javascript" src="js/Effects/Grid101/G101_Main.js"></script>

	<script type="text/javascript" src="js/navigation.js"></script>
	<script type="text/javascript" src="js/flyout.js"></script>
	<script type="text/javascript" src="js/transition.js"></script>

	<!-- <script type="text/javascript" src="js/admin/editor.js"></script> -->
	<script type="text/javascript" src="js/main.js"></script>


</head>
<body>

	<div id="load_flyout">
		<script type="text/javascript">
			$('#load_flyout').hide();
		</script>
		<?php include('images/thorn_scroll.php'); ?>

	</div>



	<div id="vineArt">
	<canvas id="VACanvas"></canvas>
		<script type="text/javascript">
			// SHOW VINE ANIMATIONS
			// InitializeVines();
		</script>
		<div></div>
	</div>

	<div id="pages_wrapper">
	</div>

<!-- 	<div id="body_wrapper">
		

	</div> -->

<!-- 	<div class="body-wrapper home active">

	</div>

	<div class="body-wrapper shop"></div>
	<div class="body-wrapper info"></div>
	<div class="body-wrapper crtvsltns"></div> -->


	<div id="search_flyout" class="flyout">
		<div id="search_close" onclick="flyout('search');">x</div>

		<form id="search_form" action="search.php">
			<input id="search_bar" type="text" placeholder="Search...">
		</form>

		<div id="search_results">
		</div>
	</div>

	<div id="login_flyout" class="flyout form">
		<div id="login_close" onclick="flyout('login');">x</div>

		<form action="includes/login.php" id="login_form" method="post">
			<input class="input" type="text" placeholder="Username" name="un">
			<input class="input" type="password" placeholder="Password" name="pwd">
			<button class="button" type="submit" name="login-submit"> > </button>
		</form>
		<div id="signup_container" onclick="flyout('signup');">create an account</div>
	</div>

	<div id="signup_flyout" class="flyout form">
		<div id="signup_close" onclick="flyout('signup');">x</div>

		<form action="includes/signup.php" id="signup_form" method="post">
			<input class="input" type="text" placeholder="Username" name="un">
			<input class="input" type="text" placeholder="Email" name="mail">
			<input class="input" type="password" placeholder="Password" name="pwd">
			<input class="input" type="password" placeholder="Repeat your password" name="pwdrpt">

			<button class="button" type="submit" name="signup-submit"> > </button>
		</form>

		<div id="search_results">
		</div>
	</div>

	<div id="cart_flyout" class="flyout">
		<div id="cart_wrapper">
			<div id="cart_close" onclick="flyout('cart');">x</div>

			<div id="cart_items">
			</div>

			<div id="cart_checkout" onclick="checkoutFlyout(1);">Proceed to checkout</div>
		</div>

		<div id="checkout_wrapper">
			<div id="exit_checkout" onclick="checkoutFlyout(0);"> < Back</div>
		</div>
	</div>

	<div id="creasolu_flyout" class="flyout">
	</div>

	<?php if(isset($_SESSION['useraccess']) && $_SESSION['useraccess'] == 0){

		echo '<script type="text/javascript">',
				'AdminAccess();',
				'</script>';
		}
		else if(isset($_SESSION['useraccess']) && $_SESSION['useraccess'] == -1): ?>


	<canvas id="ui_canvas">no support</canvas>

	<div style="z-index: 20; position: absolute; opacity: .5; pointer-events: none; top: 100px;"> 
		User_Data : index.php:footer <br>
		<?php echo var_dump($_SESSION); ?>
	</div>

	<div style="z-index: 20; position: absolute; opacity: .5; pointer-events: none; bottom: 100px; left: 500px;" id="element_hover"></div>

	<div class="admin-page showadm" id="admin_panel">
		<div class="page-tab" id="admin_panel_tab" onclick="toggleAdmin();">admin panel</div>
		<div id="page_wrapper">
			<div id="page_tabs">
				<div class="page-tab selected" onclick="admin_controls(this, 'pe');">page editor</div>
				<div class="page-tab" onclick="admin_controls(this, 'et');">element tree</div>
			</div>
			<div id="page_container">
				<?php include('admin/page_editor.php'); ?>
			</div>
		</div>

		<!-- <div id="getsetElement" onclick="getsetElement(true);">get element</div> -->
	</div>

	<script type="text/javascript">


	var admin_toggled = false;
	var getElement = false;

	var adminPanel = document.getElementById('admin_panel');

	function toggleAdmin() {
		if(admin_toggled)
		{
			adminPanel.classList.toggle("showadm");
			admin_toggled = false;
		}
		else 
		{
			adminPanel.classList.toggle("showadm");
			admin_toggled = true;
		}
	}

	</script>

	<?php endif;?>






</body>

</html>

