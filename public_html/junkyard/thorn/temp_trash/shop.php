

<?php 

		
	require 'includes/dbmanager.php';

	$cat = null;

	if($_SERVER["REQUEST_METHOD"] == "POST" && $_POST['category'] != null)
	{
		$cat = $_POST['category'];
		
		$sql = "SELECT * FROM Products WHERE Cat = '".$cat."';";
		$result = $conn->query($sql);

		while($row = $result->fetch_assoc()) {
			$products[] = $row;
		}
	}
	else{
		$sql = "SELECT * FROM Categories";
		$result = $mysqli->query($sql);

		while($row = $result->fetch_assoc()) {
			$categories[] = $row;
		}

	}

	$result->free();
	$conn->close();
 ?>

<script type="text/javascript">
	siteColors('255,247,230','255,133,102');
</script>

<?php if($cat != null): ?>

 <div id="products_wrapper"> <?php 

	foreach ($products as $key => $value) {
		include('entities/product_card.php');
	}

 	if(count($products) < 1)
 	{
 		echo "Sorry Nothing Here Yet :(";
 	}
 	?>

 	<div class="loadmore">
 		<div>Load More</div>
 	</div>
 </div>
	<?php else:?>
	<div id="categories_wrapper">
		<?php foreach($categories as $key=>$cat): ?>
			<div id="category_<?php echo $cat['Name']; ?>" class="category-wrapper category-<?php echo $cat['Name']; ?> add-c cp glass1" onclick="hsh('shop-<?php echo $cat['Name'];?>');">
				<div class="category-title">shop.<?php echo $cat['Name']; ?></div>
			</div>
		<?php endforeach;?> 
	</div>
<?php endif; ?>
