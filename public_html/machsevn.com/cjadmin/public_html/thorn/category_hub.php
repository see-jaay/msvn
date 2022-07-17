




<?php 

	$_SESSION["location"] = "categories";

	require 'includes/dbmanager.php';

	$cat = null;

	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		$cat = $_POST['category'];
		
		$sql = "SELECT * FROM Products WHERE Cat = '".$cat."';";
		$result = $conn->query($sql);

		while($row = $result->fetch_assoc()) {
			$products[] = $row;
		}
	}

	$result->free();

 ?>



<div class="nav-wrapper categories">
	<ul class="menu add-c">
		<li><div onclick="hsh('home');"><span>[</span>machsevn<span>]</span> > </div></li>
		<li><div onclick="hsh('shop');"><span>[</span>shop<span>]</span> > </div></li>
		<li class="current-page"></li>
		<script type="text/javascript">
			$('.current-page').html(window.location.hash.split('-')[1] || window.location.hash.substr(1));

			$('.menu > li').each(function(){
				$(this).css('opacity', $(this).prev().css('opacity') * .7);
			});
		</script>
	</ul>
</div>

<!-- <div id="secondary_nav_wrapper"> -->
	<!-- <ul id="secondary_menu_main"> -->
		<!-- <li class="disabled"><div onclick="window.location.hash = 'gallery';"><span>[</span>GALLERY<span>]</span></div></li> -->
		<!-- <li class="disabled"><div onclick="window.location.hash = 'info';"><span>[</span>MACHSEVN.INFO<span>]</span></div></li> -->
		<!-- <li class="disable"><div onclick="window.location.hash = 'info';"><span>[</span>machsevn.info<span>]</span></div></li> -->
		<!-- <li class="disable"><div onclick="window.location.hash = 'creative-solutions';"><span>[</span>need a website?<span>]</span></div></li> -->
	<!-- </ul> -->
<!-- </div> -->


<div id="content_wrapper" class="shop">
	<div id="products_wrapper"> 
	 	<?php 

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
</div>

<div id="util_wrapper">
	<?php include('includes/entities/util_nav.php'); ?>
</div>