


 	<div class="product-wrapper add-c cp glass1">
 		<div class="product-container add-c">
 			<div onclick="hsh('product-<?php echo $product['ID'];?>');" class="product-inner">
 				<div class="product-image">
					<div >
						 <!-- <img src="images/<?php //echo $product['Img'];?>"> -->
					</div>
				</div>
	 			 <div class="product-details">
	 				<span class="product-title"><?php //echo strtoupper($product['Name']); ?></span>

	 				<?php switch($product['Sale_Data']): 
	 					case "IN_STOCK":?>
	 					<!-- <span class="product-price info"><?php //echo '$ '.$product['Price']; ?></span> -->
	 				<?php break; case "SOLD_OUT":?>
						<div class="soldout-text">SOLD OUT</div>
						<svg class="soldout-pattern" width="100%" height="100%">
						    <defs>
						        <pattern id="x-pattern" x="9" y="0" width=".4in" height=".4in" patternUnits="userSpaceOnUse">
					            	<svg id="Layer_4" data-name="Layer 4" xmlns="http://www.w3.org/2000/svg" width=".4in" height=".4in" viewBox="0 0 100 100">
					            		  <style>
										    .st { stroke: var(--text-color); stroke-width:1.5px;}
										  </style>
						  				<title>thornPattern</title>
										<g>
											<path class ="st" d="M0,0 L15,15"></path>
											<path class ="st" d="M15,0 L0,15"></path>
											<path class ="st" d="M50,50 L65,65"></path>
											<path class ="st" d="M65,50 L50,65"></path>
										</g>
									</svg>
						        </pattern>
						    </defs>
						    <rect x="0" y="0" width="100%" height="100%" fill="url(#x-pattern)"/>
						</svg>

	 				<?php break; case "ON_SALE":?>
	 					<!-- <span class="product-price info"><?php //echo '$ '.$product['Price']; ?></span> -->
	 					<!-- <span class="product-sale"> - ON SALE</span> -->
	 				<?php break; case "COMING_SOON":?>
						<div class="comingsoon-text">COMING SOON</div>
						<svg class="comingsoon-pattern" width="100%" height="100%">
						    <defs>
						        <pattern id="thorn-pattern" x="0" y="0" width=".2191in" height=".1314in" patternUnits="objectBoundingBox">
					            	<svg id="Layer_4" data-name="Layer 4" xmlns="http://www.w3.org/2000/svg" width="1.7in" height="1.7in" viewBox="0 0 422.51 422.51">
						  				<title>thornPattern</title>
										<g>
										    <path d="M-1177.5-490.36a19.82,19.82,0,0,0-6.58-.26,38,38,0,0,0-4.07.76l-0.68.34h15.4l-2.56-.54Z" transform="translate(1201.1 612.03)" style="fill: none"/>
										    <path d="M-1090.89-489.53h12.3v-5.36l-1.75.68A97.21,97.21,0,0,0-1090.89-489.53Z" transform="translate(1201.1 612.03)"/>
										    <path d="M-1090.89-612a109.94,109.94,0,0,0-17.08,11,14.39,14.39,0,0,1-3,1.1c-1.36.32-2.93,0.59-4.2-.19s-2-2.37-3-3.5a1.91,1.91,0,0,0-.87-0.6c-1.55-.44-1.86,1.65-1.88,2.72s0,2.14-.09,3.21q0,0.82-.07,1.65a21,21,0,0,1-1.35,6.84,39.67,39.67,0,0,1-1.8,4.1,107.72,107.72,0,0,0-20.28,33.22,92.34,92.34,0,0,1-9.92,19.12,8.77,8.77,0,0,1-3.67,2.87c-1.32.46-2.86,0.9-4.19,0.26s-2.22-2.14-3.34-3.16a1.91,1.91,0,0,0-.92-0.5c-1.59-.27-1.67,1.84-1.58,2.9s0.18,2.13.25,3.2q0.06,0.82.11,1.65a21,21,0,0,1-.61,6.94,15.71,15.71,0,0,1-2.68,5.15,99.22,99.22,0,0,1-30,19.22v5.36h12.27l0.68-.34a38,38,0,0,1,4.07-.76,19.82,19.82,0,0,1,6.58.26l1.53,0.3,2.56,0.54h2.74a1,1,0,0,0,.58-1,1.8,1.8,0,0,0-.36-0.93c-0.81-1.18-2.09-2.12-2.56-3.51a5.22,5.22,0,0,1,.75-3.9,14.94,14.94,0,0,1,1.36-2.22,119.56,119.56,0,0,0,10.3-9.17A110,110,0,0,0-1135.16-549q0.47-1.26,1-2.52a15.93,15.93,0,0,1,4.19-4.63,20.25,20.25,0,0,1,6.12-2.77l1.53-.43,3-.79c1-.25,2.89-1,2.14-2.36a1.84,1.84,0,0,0-.75-0.68c-1.28-.7-2.88-1-3.94-2s-1.1-2.55-1.1-3.9a7.89,7.89,0,0,1,1.2-3.83,109.15,109.15,0,0,1,9.78-11.22,100.71,100.71,0,0,1,33.42-22.47V-612h-12.3Z" transform="translate(1201.1 612.03)"/>
										    <path d="M-1173-611.95a3.89,3.89,0,0,0,2.32-.08h-2.72Z" transform="translate(1201.1 612.03)"/>
										    <path d="M-1188.83-612h-12.27v5.37c0.58-.23,1.16-0.46,1.75-0.68A97.14,97.14,0,0,0-1188.83-612Z" transform="translate(1201.1 612.03)"/>
										</g>
									</svg>
						        </pattern>
						    </defs>
						    <rect x="0" y="0" width="100%" height="100%" fill="url(#thorn-pattern)"></rect>
						</svg>
	 				<?php break; endswitch;?>
				</div> 
			</div>
 		</div>
 	</div>

