



<?php 
	session_start();

	$mysqli = new mysqli('localhost', 'cjadmin', 'password', 'MachSevn_Data');

	if($mysqli->connect_errorno)
	{
		echo 'Connection Error:' . $mysqli->connect_error;
	}


	$id = null;

	if($_SERVER["REQUEST_METHOD"] == "POST" && $_POST['prod_id'] != null)
	{
		$id=$_POST['prod_id'];
	}

	$sql = "SELECT * FROM Products WHERE ID = '".$id."';";

	$result = $mysqli->query($sql);

	while($row = $result->fetch_assoc()) {
		$product = $row;
	}

	$result->free();
	$mysqli->close();

 ?>
	<div id="details_wrapper" class="add-c add-dsh">
		<div id="details_container">
			<div id="details_gallery">
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
			</div>
			<div id="details_image_main" class="add-c cp glass1">
				<!-- <img src="images/<?php //echo $product['Img']?>" id="details_image"> -->
				<div id="details_barcode" class="add-c cp">
					<?php 
						$hash = hash('adler32',$product['Name'].$product['ID'].$product['Price']);
						$hash2 = hash('crc32',$product['Name'].$product['ID'].$product['Price']);


					?>
					<div id="barcode"><?php echo $hash; ?></div>

					<div id="code">
						<span><?php echo $hash2[5];?></span>
						<span style="margin-left: 2.5rem;"><?php echo $hash[0];?></span>
						<span><?php echo $hash[1];?></span>
						<span><?php echo $hash[2];?></span>
						<span><?php echo $hash[3];?></span>
						<span><?php echo $hash[4];?></span>
						<span><?php echo $hash[5];?></span>
						<span style="margin-left: 1.5rem;"><?php echo $hash[7];?></span>
						<span><?php echo $hash2[0];?></span>
						<span><?php echo $hash2[1];?></span>
						<span><?php echo $hash2[2];?></span>
						<span><?php echo $hash2[3];?></span>
						<span style="margin-right:1.5rem"><?php echo $hash2[4];?></span>

					</div>
				</div>
			</div>
			<div id="details_main" class="glass1">
				<div id="details_title" class="txt-vertical"><?php echo $product["Name"]; ?></div>
				<div id="details_stock"><?php echo $product["Sale_Data"]; ?></div>
				<div id="details_price" >$<?php echo $product["Price"]; ?></div>
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

				<div id="form_addtocart" class="form-button" onclick="updateCart(<?php echo $product["ID"]; ?>, 1);">Add To Cart</div>
			</div>
		</div>
	</div>


	<div id="details_wrapper_mobile" class="add-c add-dsh">
		<div id="details_container" class="glass1">
			<div id="details_inner">
				<div id="details_main">
					<div id="details_title" class="txt-vertical"><?php echo $product["Name"]; ?></div>

					<!-- <img src="images/<?php //echo $product['Img']?>" id="details_image"> -->
					<div id="details_barcode" class="add-c cp">
						<?php 
							$hash = hash('adler32',$product['Name'].$product['ID'].$product['Price']);
							$hash2 = hash('crc32',$product['Name'].$product['ID'].$product['Price']);


						?>
						<div id="barcode"><?php echo $hash; ?></div>

						<div id="code">
							<span><?php echo $hash2[5];?></span>
							<span style="margin-left: 2.5rem;"><?php echo $hash[0];?></span>
							<span><?php echo $hash[1];?></span>
							<span><?php echo $hash[2];?></span>
							<span><?php echo $hash[3];?></span>
							<span><?php echo $hash[4];?></span>
							<span><?php echo $hash[5];?></span>
							<span style="margin-left: 1.5rem;"><?php echo $hash[7];?></span>
							<span><?php echo $hash2[0];?></span>
							<span><?php echo $hash2[1];?></span>
							<span><?php echo $hash2[2];?></span>
							<span><?php echo $hash2[3];?></span>
							<span style="margin-right:1.5rem"><?php echo $hash2[4];?></span>

						</div>
					</div>











					<div id="details_stock"><?php echo $product["Sale_Data"]; ?></div>
					<div id="details_price" >$<?php echo $product["Price"]; ?></div>
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

					<div id="form_addtocart" class="form-button" onclick="updateCart(<?php echo $product["ID"]; ?>, 1);">Add To Cart</div>
				</div>
			</div>
		</div>
	</div>