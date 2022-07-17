<div>






<div id="search_flyout" class="flyout">
  <div id="search_close" onclick="flyout('search');">x</div>

  <form id="search_form" action="search.php">
    <input id="search_bar" type="text" placeholder="Search...">
  </form>

  <div id="search_results">
  </div>
</div>

<div id="login_flyout" class="flyout form">
  <div id="login_close" onclick="flyout('login');">x</div>

  <form action="includes/login.php" id="login_form" method="post">
    <input class="input" type="text" placeholder="Username" name="un">
    <input class="input" type="password" placeholder="Password" name="pwd">
    <button class="button" type="submit" name="login-submit"> > </button>
  </form>
  <div id="signup_container" onclick="flyout('signup');">create an account</div>
</div>

<div id="signup_flyout" class="flyout form">
  <div id="signup_close" onclick="flyout('signup');">x</div>

  <form action="includes/signup.php" id="signup_form" method="post">
    <input class="input" type="text" placeholder="Username" name="un">
    <input class="input" type="text" placeholder="Email" name="mail">
    <input class="input" type="password" placeholder="Password" name="pwd">
    <input class="input" type="password" placeholder="Repeat your password" name="pwdrpt">

    <button class="button" type="submit" name="signup-submit"> > </button>
  </form>

  <div id="search_results">
  </div>
</div>

<div id="cart_flyout" class="flyout">
  <div id="cart_wrapper">
    <div id="cart_close" onclick="flyout('cart');">x</div>

    <div id="cart_items">
    </div>

    <div id="cart_checkout" onclick="checkoutFlyout(1);">Proceed to checkout</div>
  </div>

  <div id="checkout_wrapper">
    <div id="exit_checkout" onclick="checkoutFlyout(0);"> < Back</div>
  </div>
</div>

<div id="creasolu_flyout" class="flyout">
</div>

</div>
