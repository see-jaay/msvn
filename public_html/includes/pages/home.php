<?php

session_start();

?>




<div id="homepage" class="page">


<?php if($_SESSION['useraccess'] === 0) : ?>
  <div id="center-text" class="tscrl cntr-txt" style="width: max-content; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); margin-left: .4rem; letter-spacing:10;" data-tscrl="machsevn,coming soon/17,7"></div>

  <div id="sub_wrapper" class="outrfrm-2" data-frmdes="msvn.content/apparel">
    <!-- <div class="outer-frame-1 tl"></div>
    <div class="outer-frame-1 br"></div> -->

    <div class="wrapper">
      <div class="inner-wrapper form">
        <div class="title-wrapper">
          <div class="short clp">Subscribe to our Newsletter</div>
          <div class="med clp">and be notified when we go live</div>
        </div>
        <div class="form-wrapper">
          <form class="sub-form form" action="includes/email_interface.php" method="post" autocomplete="off">
            <div class="input-field name"><span class="str">*</span><input class="clp" type="text" name="name" placeholder="First & Last Name"><span class="prompt"></span></div>
            <div class="input-field email"><span class="str">*</span><input class="clp" type="text" name="email" placeholder="E-Mail"><span class="prompt"></span></div>
            <div class="clp err"></div>
            <div class="submit btn clp" onclick="Subscribe(this)">Subscribe</div>
          </form>
        </div>
      </div>
      <div class="inner-wrapper req">
        <div class="title-wrapper">
          <div class="short clp">Thank you for subscribing !</div>
          <div class="lrg clp">a verification e-mail is on the way!</div>
        </div>
      </div>
      <div class="inner-wrapper conf">
        <div class="title-wrapper">
          <div class="short clp">You're All Set !</div>
          <div class="lrg clp">Expect the latest News and deals From Machsevn.</div>
        </div>
      </div>
    </div>
  </div>

<?php else:?>
  <?php if(0):?>
  <div class="fclpt" style="z-index: 3;" data-fclpt="1" data-dir="1,0">
    <div id="sub_wrapper" class="outrfrm-2" data-frmdes="msvn.content/apparel">
      <!-- <div class="outer-frame-1 tl"></div>
      <div class="outer-frame-1 br"></div> -->

      <div class="wrapper">
        <div class="inner-wrapper form">
          <div class="title-wrapper">
            <div class="short clp">Subscribe to our Newsletter</div>
            <div class="med clp">and be notified when we go live</div>
          </div>
          <div class="form-wrapper">
            <form class="sub-form form" action="includes/email_interface.php" method="post" autocomplete="off">
              <div class="input-field name"><span class="str">*</span><input class="clp" type="text" name="name" placeholder="First & Last Name"><span class="prompt"></span></div>
              <div class="input-field email"><span class="str">*</span><input class="clp" type="text" name="email" placeholder="E-Mail"><span class="prompt"></span></div>
              <div class="clp err"></div>
              <div class="submit btn clp" onclick="Subscribe(this)">Subscribe</div>
            </form>
          </div>
        </div>
        <div class="inner-wrapper req">
          <div class="title-wrapper">
            <div class="short clp">Thank you for subscribing !</div>
            <div class="lrg clp">a verification e-mail is on the way!</div>
          </div>
        </div>
        <div class="inner-wrapper conf">
          <div class="title-wrapper">
            <div class="short clp">You're All Set !</div>
            <div class="lrg clp">Expect the latest News and deals From Machsevn.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
<?php endif;?>
  <div class="fclpt" data-fclpt="0">
    <div id="center-text" class="tscrl cntr-txt" style="width: max-content; position: absolute; transform: translate(-50%, -50%); margin-left: .4rem; letter-spacing:10;" data-tscrl="machsevn,coming soon/17,7"></div>
  </div>
  <div class="fclp" data-fclpt="3" style="display:none;">
    <div id="inq_wrapper" class="svg-brdr1 svg-brdrflr1">
      <div class="outer-frame-2">
        <svg width="100%" height="100%">
          <!-- <rect width="100%" height="100%"></rect> -->
          <mask class="of2msk" id="of2msk2">
            <rect class="r1" width="100%" height="100%" style="fill:white;" x="0" y="0"></rect>
            <rect class="r2" width="100%"></rect>
            <rect class="r3" width="100%"></rect>
            <rect class="r4" width="100%"></rect>
          </mask>
          <g mask="url(#of2msk2)">
            <line class="l1" x1="0%" x2="100%" y1="0%" y2="0%"></line>
            <line class="l2" x1="100%" x2="100%" y1="0%" y2="100%"></line>
            <line class="l3" x1="0%" x2="100%" y1="100%" y2="100%"></line>
            <line class="l4" x1="0" x2="0" y1="0%" y2="100%"></line>
          </g>
        </svg>
        <div class="pnldpt">msvn.creative_solutions</div>
      </div>
      <div class="inner-wrapper">
        <div class="title-wrapper">
          <div class="short clp">Need a website or other branding solutions?</div>
        </div>
        <div class="txt-field">
          <div>
            make a lasting impression that embodies your brands design language and captivates your userbase with a tailored, front-end experience, because the face of your brand deserves more than a template.
          </div>
          <div style="margin-top:2rem;">
            services include but are not limited to:
            <ul class="blist" style="text-align: left;">
              <li>website design + development</li>
              <li>graphic design</li>
              <li>branding</li>
            </ul>
          </div>
          <div class="contact">
            Contact <span style="user-select:text;">crvtsltns<span>@</span>machsevn.com</span> for details and inquiries.
          </div>
        </div>
      </div>
    </div>
  </div>
<?php endif; ?>



</div>
