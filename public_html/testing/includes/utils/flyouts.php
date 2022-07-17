<div id="login_flyout" class="flyout form full">
  <div id="login_close" class="close" onclick="flyout('login')">
    <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <line class="l1" x1="20%" y1="0" x2="80%" y2="0" />
      <line class="l2" x1="20%" y1="0" x2="80%" y2="0" />
    </svg>
  </div>
  <div class="inner">
    <div class="form-wrapper">
      <form class="login-form form" action="includes/utils/loginout.php" method="post" autocomplete="off">
        <div class="input-field username"><span class="str">*</span><input class="clp" type="text" name="name" placeholder="Username"><span class="prompt"></span></div>
        <div class="input-field password"><span class="str">*</span><input class="clp" type="password" name="email" placeholder="Password"><span class="prompt"></span></div>
        <div class="clp err"></div>
        <div class="submit btn clp" onclick="Login(this);">Login</div>
      </form>
    </div>
  </div>
</div>
