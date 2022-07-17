

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
		$result = $conn->query($sql);

		while($row = $result->fetch_assoc()) {
			$categories[] = $row;
		}

	}

	$result->free();
	$conn->close();
 ?>

<?php if($cat != null): ?>
 <div id="products_wrapper"> <?php 

 	foreach($products as $key=>$product):
 		include('entities/product_card.php');
 	endforeach; 

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
	<form action="shop.php" method="post" id=categories_wrapper>
		<?php foreach($categories as $key=>$cat): ?>
		<button id="category_<?php echo $cat['Name']; ?>" class="category-wrapper add-c cp"name="category" type="submit" value="<?php echo $cat['Name']; ?>">
			shop.<?php echo $cat['Name']; ?>
		</button>
			<?php endforeach;?> 
	</form>
<?php endif; ?>
