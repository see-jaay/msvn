<!-- animation speed -->

<style>
  .option-name{
  }
  .option-wrapper {
    float:left;
  }

  .option-wrapper > * {
    float:left;
    margin-left: 10px;
  }

  .button {
    padding: 2px 4px;
    border: 2px black solid;
    border-radius: 5px;
    font-weight: bold;
    font-family: 'courier prime code';
    font-size: 11;

    cursor: pointer;

    margin: 0 10px;
    display: inline-block;
    height: 13px;
  }

  #button_row {
    position: absolute;
    margin: 4px 0px;
    height: auto;
    padding-top: 5px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

</style>



<div id="button_row">
  <div class="button" onclick="action('play')">play</div>
  <div class="button" onclick="action('pause')">pause</div>
  <div class="button" onclick="action('stop')">stop</div>
  <div class="button" onclick="action('clear')">clear</div>
</div>


<div id="options_panel">
  <div class="panel-tab" onclick="$('#options_panel > .panel-inner').toggleClass('show');" title="demo options">options</div>

  <div class="panel-inner">
  <div class="option-wrapper">
    <div class="option-name" style="float:left; margin-left:5px;">Simulation Speed :</div>
    <span style="margin-left:5px;"> .0001 </span>
    <input type="range" name="demo-option" data-name="simspeed" min=".0001" max=".5" step=".0001" tyle="float:left;" >
    <span style="margin-left:5px;"> .5 </span>
  </div>
</div>
</div>
