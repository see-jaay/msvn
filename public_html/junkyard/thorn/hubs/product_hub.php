




<?php 
	session_start();

	require 'includes/dbmanager.php';

	$id = null;

	if($_SERVER["REQUEST_METHOD"] == "POST" && $_POST['prod_id'] != null)
	{
		$id=$_POST['prod_id'];
	}

	$sql = "SELECT * FROM Products WHERE ID = '".$id."';";
	$result = $conn->query($sql);

	while($row = $result->fetch_assoc()) {
		$product = $row;
	}

	$sql = "SELECT * FROM Popups WHERE PRODUCT = '".$id."';";
	$result = $conn->query($sql);

	while($row = $result->fetch_assoc()) {
		$popups[] = $row;
	}

	$sale_data = $product['Sale_Data'];
	$price = $product['Price'];
	$name = $product['Name'];
	$cat = $product['Cat'];



	$result->free();
 ?>





	<div class="nav-wrapper product">
		<ul class="menu add-c">
			<!-- <li class="disabled"><div onclick="window.location.hash = 'gallery';"><span>[</span>GALLERY<span>]</span></div></li> -->
			<!-- <li class="disabled"><div onclick="window.location.hash = 'info';"><span>[</span>MACHSEVN.INFO<span>]</span></div></li> -->
			<li><div onclick="hsh('home');"><span>[</span>machsevn<span>]</span> > </div></li>
			<li><div onclick="hsh('shop');"><span>[</span>shop<span>]</span> > </div></li>
			<li><div onclick="hsh('shop-<?php echo $cat; ?>');"><span>[</span><?php echo $cat; ?><span>]</span> > </div></li>

			<li class="current-page"></li>
			<script type="text/javascript">
				$('.current-page').html('<?php echo $name; ?>');

				$('.menu > li').each(function(){
					$(this).css('opacity', $(this).prev().css('opacity') * .7);
				});
			</script>
		</ul>
	</div>
<div id="content_wrapper" class="shop hud-grid">

	<div id="details_main" class="glass1 hg-pri hg-item">
		<div id="details_title" class="txt-vertical"><?php echo $name; ?></div>
		<div id="details_stock"><?php echo $sale_data; ?></div>
		<div id="details_price" >$<?php echo $price; ?></div>
		<div id="details_info"> Hand sewn fabrics assembled in a unique fashion</div>
		<div id="details_sideinfo"> 70% Cotton / 30% Polyester &nbsp&nbsp&nbsp&nbsp Nylon Coat - Felt Lining</div>
		<div class="section" id="form_color">choose a color</div>
		<div class="section" id="form_sizes">
			<div class="disabled">xs</div>
			<div>s</div>
			<div class="disabled">m</div>
			<div>l</div>
			<div>xl</div></div>
		<div id="form_like" class="form-button">&#10084</div>

		<div id="form_addtocart" class="form-button" onclick="updateCart(<?php echo $id; ?>, 1);">Add To Cart</div>
	</div>
<!-- 
	<div class="glass1 hg-sec hg-item">
		object 2
	</div> -->

	<div class="popup-holder">
	<?php include('includes/popups.php'); ?>
	</div>




 	<div id="details_wrapper" class="add-c add-dsh">
		<div id="details_container">
<!-- 			<div id="details_gallery">
				<div class="gallery-images" id="scroll_sml" onscroll="scrollSibling('scroll_sml', 'scroll_med');">
					<div class="gallery-container glass-children1" id="imgs_sml">
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
					</div>
				</div>
				<div class="gallery-images" id="scroll_med" onscroll="scrollSibling('scroll_med', 'scroll_sml');">
					<div class="gallery-container glass-children1" id="imgs_med">
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
						<div>IMG</div>
					</div>
				</div>
			</div> -->
			<!-- <div id="details_image_main" class="add-c cp glass1"> -->
				<!-- <img src="images/<?php //echo $product['Img']?>" id="details_image"> -->
<!-- 				<div id="details_barcode" class="add-c cp">
					<?php 
						//$hash = hash('adler32',$product['Name'].$product['ID'].$product['Price']);
						//$hash2 = hash('crc32',$product['Name'].$product['ID'].$product['Price']);


					?>
					<div id="barcode"><?php //echo $hash; ?></div>

					<div id="code">
						<span><?php //echo $hash2[5];?></span>
						<span style="margin-left: 2.5rem;"><?php //echo $hash[0];?></span>
						<span><?php //echo $hash[1];?></span>
						<span><?php //echo $hash[2];?></span>
						<span><?php //echo $hash[3];?></span>
						<span><?php //echo $hash[4];?></span>
						<span><?php //echo $hash[5];?></span>
						<span style="margin-left: 1.5rem;"><?php //echo $hash[7];?></span>
						<span><?php //echo $hash2[0];?></span>
						<span><?php //echo $hash2[1];?></span>
						<span><?php //echo $hash2[2];?></span>
						<span><?php //echo $hash2[3];?></span>
						<span style="margin-right:1.5rem"><?php //echo $hash2[4];?></span>

					</div>
				</div>
			</div>
 -->
		</div>


	</div>

	<script type="text/javascript">
		HG_Layout();
	</script>
</div>

<?php if(isset($_SESSION['useraccess']) && $_SESSION['useraccess'] == 0): ?>

	<div id="admin_add_popup" onclick="Admin_AddPopup(<?php echo $id; ?>);">
		Add
	</div>
	<div id="admin_save_popup" onclick="Admin_SavePopup();">
		Save
	</div>
	<form id="popup_data">
		
	</form>

<?php endif; ?>


<div id="util_wrapper">
	<?php include('includes/entities/util_nav.php'); ?>
</div>