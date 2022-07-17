





<div id="loading_screen">

  <div id="site_loader" class="" data-fclpt="2">
    <div class="loader-wrapper"> loading...
      <?php //include('junkyard/thorn/images/thorn_scroll.php')?>
    </div>
    <div class="loader-aside">&#169; Machsevn 2021</div>
    <!-- <div class="loader-aside">Ver.0.17</div> -->

  </div>
</div>


<footer>
  <canvas id="UICanvas" class="uiCanvas"></canvas>
  <div id="UILayers">
  </div>
  <div id="bkrnd">
    <div id="vin"></div>
  </div>

  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>




  <script type="text/javascript" src="js/locals/MSVN_Layouts.js"></script>


  <script type="text/javascript" src="js/locals/utilities/Navigation.js"></script>
  <script type="text/javascript" src="js/locals/utilities/SystemUI.js"></script>
  <script type="text/javascript" src="js/locals/utilities/SystemUX.js"></script>
  <script type="text/javascript" src="js/locals/utilities/SiteManager.js"></script>
  <script type="text/javascript" src="js/locals/Effects/main.js"></script>
  <script type="text/javascript" src="js/locals/forms.js"></script>
  <script type="text/javascript" src="js/locals/utilities.js"></script>
  <script type="text/javascript" src="js/locals/Math.js"></script>



  <?php if($_SESSION['useraccess'] === 0):?>
  <script type="text/javascript" src="js/Editor/Main.js"></script>
  <?php endif; ?>



  <script type="text/javascript" src="js/locals/main.js"></script>

  <?php if($_SESSION['useraccess'] === 0):?>
  <script type="text/javascript">
    AdminAccess();
  </script>

  <?php endif; ?>

</footer>
</body>
</html>
