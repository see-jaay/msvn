<?php

 session_start();

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
