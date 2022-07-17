<div id="hub_container">
		<div class="cmdb">
			<div class="container">
				<div class="title">Minimal Design</div>
				<div class="image"></div>
				<ul class="list">
					<li>basic layouts</li>
					<li>captivating color pallettes</li>
				</ul>
				<div class="price">* from $250 to $500<br>* <span>+</span>$125/page</div>
			</div>
		</div>
		<div class="cmdb">
			<div class="container">
				<div class="title">Unique design</div>
				<div class="image"></div>
				<ul class="list">
					<li>unique layouts</li>
					<li>dynamic color pallettes</li>
				</ul>
				<div class="details"></div>
				<div class="price">* from $500 to $1000<br>* <span>+</span>$250/page</div>
			</div>

		</div>
		<div class="cmdb">
			<div class="container">
				<div class="title">Complex Design</div>
				<div class="image"></div>
				<ul class="list">
					<li>immersive interfaces and layouts</li>
					<li>dynamic effects</li>
					<li>unlimited possibilities (unless impossible)</li>
				</ul>
				<div class="details"></div>
				<div class="price">* from $1000 and up<br>* <span>+</span>$500/page</div>
			</div>
		</div>
	<div class="disclosure">* pricing may vary depending on your demands.<!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** pricing may vary --></div>
</div>

<div class="nav-wrapper product">
	<ul class="menu add-c">
		<!-- <li class="disabled"><div onclick="window.location.hash = 'gallery';"><span>[</span>GALLERY<span>]</span></div></li> -->
		<!-- <li class="disabled"><div onclick="window.location.hash = 'info';"><span>[</span>MACHSEVN.INFO<span>]</span></div></li> -->
		<li><div onclick="hsh('home');"><span>[</span>machsevn<span>]</span> > </div></li>
		<li><div onclick="hsh('creative-solutions');"><span>[</span>inquiries<span>]</span></div></li>

		<li class="current-page"></li>
		<script type="text/javascript">
			$('.current-page').html('<?php echo $product['Name']; ?>');

			$('.menu > li').each(function(){
				$(this).css('opacity', $(this).prev().css('opacity') * .7);
			});
		</script>
	</ul>
</div>
