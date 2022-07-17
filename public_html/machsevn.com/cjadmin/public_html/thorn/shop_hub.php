




<?php 

	$_SESSION["location"] = "shop";

	require 'includes/dbmanager.php';

	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		$sql = "SELECT * FROM Categories";
		$result = $conn->query($sql);

		while($row = $result->fetch_assoc()) {
			$categories[] = $row;
		}

	}

	$result->free();
	// $conn->close();
 ?>




<div class="nav-wrapper shop">
	<ul class="menu add-c">
		<li class="home"><div onclick="hsh('home');"><span>[</span>machsevn<span>]</span> > </div></li>
		<li class="current-page"></li>
		<script type="text/javascript">
			$('.current-page').html(window.location.hash.split('-')[1] || window.location.hash.substr(1));

			$('.menu > li').each(function(){
				$(this).css('opacity', $(this).prev().css('opacity') * .7);
			});
		</script>
	</ul>
</div>

<div id="content_wrapper" class="shop" >
	<div id="categories_wrapper" class="grd">
		<?php foreach($categories as $key=>$cat): ?>
			<div id="category_<?php echo $cat['Name']; ?>" class="category-wrapper category-<?php echo $cat['Name']; ?> add-c cp glass1" onclick="hsh('category-<?php echo $cat['Name'];?>');">
				<div class="category-title">shop.<?php echo $cat['Name']; ?></div>
			</div>
		<?php endforeach;?>
	</div>
</div>


<div id="util_wrapper"> 
	<?php include ('includes/entities/util_nav.php');?>
</div>