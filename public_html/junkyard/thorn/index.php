
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


	include('includes/header.php');

?>

<!-- <script type="text/javascript">
	var ui = new Interface();
</script> -->

<body>
	<div id="site_wrapper">
		<div class="inner live-site-wrapper">
		<?php include('includes/entities/utilities.php');?>



		<div id="pages_wrapper">
			<!-- pages go here  *Might Change the mechanics of this to encompass xml editing -->
		</div>

		<div id="hub_wrapper">

		</div>

		<div id="bkrnd">

		</div>

		<?php include('includes/entities/navigation.php'); ?>
		<?php include('includes/footer.php'); ?>
	</div>

	</div>

	<?php //include('includes/admin.php'); ?>








	</body>


	</html>
