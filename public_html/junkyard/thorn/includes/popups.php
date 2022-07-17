

<?php

	session_start();
	
	require 'dbmanager.php';

	$action = $_POST['action'];

	switch ($action) {
		case 'add':

			$product = $_POST['product'];
			$sql = "INSERT INTO `Popups`(`PRODUCT`) VALUES ('$product')";
			$conn->query($sql);

			break;
		case 'save':
			# code...
			break;
		case 'get':
			break;
		case 'unbind':

		default:
			break;
	}



		$sql = "SELECT * FROM Popups WHERE PRODUCT = '".$product."';";
		$result = $conn->query($sql);

		while($row = $result->fetch_assoc()) {
			$popups[] = $row;
		}

		$result->free();

		foreach($popups as $key=>$popup):?>

		<div class="popup-wrapper glass1" data-popid="<?php echo $popup['ID']; ?>">
			<?php if(isset($_SESSION['useraccess']) && $_SESSION['useraccess'] == 0):?>
				<div class="popup-unbind popup-ctrl">/</div>
				<div class="popup-move popup-ctrl"></div>
				<div class="popup-width popup-ctrl"></div>
				<div class="popup-height popup-ctrl"></div>

			<?php endif; ?>
			<div class="popup-container">
				popup temporary placeholder
			</div>
		</div>

		<?php endforeach; ?>


