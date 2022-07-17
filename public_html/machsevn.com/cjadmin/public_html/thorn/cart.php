

<?php 

	session_set_cookie_params ($session_lifetime);
	session_start();


	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		$add = $_POST['add'];
		$id = $_POST['id'];

		if($add == "null")
		{

		}
		else if($add)
			$_SESSION["cart"][$id]["count"] += 1;
		else
		{

			$_SESSION["cart"][$id]["count"] -= 1;
			if($_SESSION["cart"][$id]["count"] < 1)
			{
				unset($_SESSION["cart"][$id]);
			}
		}
	}
?>


<?php 

$mysqli = new mysqli('localhost', 'cjadmin', 'password', 'MachSevn_Data');

if($mysqli->connect_errorno)
{
	echo 'Connection Error:' . $mysqli->connect_error;
}


foreach($_SESSION["cart"] as $key=>$item): 


	$sql = "SELECT * FROM Products WHERE ID LIKE '".$key."';";
	$result = $mysqli->query($sql);

	$product = $result->fetch_assoc();

	$result->free(); ?>
	<div class="cart-item">
		<?php echo $product["Name"];?>
		<div id="item_qty">
			<div class="count-adjust" onclick="updateCart(<?php echo $key; ?>,1)">+</div>
			<div><?php echo $item["count"]; ?></div>
			<div class="count-adjust" onclick="updateCart(<?php echo $key; ?>,0)">-</div>
		</div>
		<div id="total_price"><?php echo (floatval($product["Price"]) * floatval($item["count"])); ?></div>
	</div>
<?php endforeach;

$mysqli->close();?>