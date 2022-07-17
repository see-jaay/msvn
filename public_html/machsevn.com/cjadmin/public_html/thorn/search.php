



<?php 

	$mysqli = new mysqli('localhost', 'cjadmin', 'password', 'MachSevn_Data');
	// $conn = mysqli_connect('localhost', 'cjadmin', 'Ilikegames1', 'test');

	if($mysqli->connect_errorno)
	{
		echo 'Connection Error:' . $mysqli->connect_error;
	}

	$product = null;

	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		$product = htmlspecialchars($_POST['query']);
		
		$sql = "SELECT * FROM Products WHERE Name LIKE '%".$product."%';";
		$result = $mysqli->query($sql);

		while($row = $result->fetch_assoc()) {
			$products[] = $row;
		}

	}
	$result->free();
	$mysqli->close();
 ?>

<?php if(count($products) < 1): ?>
	<div id="no_results">No results found for "<?php echo $product; ?>"</div>
<?php endif; ?>

<?php foreach($products as $key=>$product):?>
	<div id="search_item"><?php echo $product['Name'];?></div>
<?php endforeach;?>
