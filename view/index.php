<html xmlns="http://www.w3.org/1999/xhtml">
<?php require_once("head.php"); ?>
<body>
<script>
  currentPage = "Index";
  var ajax = true;
  <?php 
  foreach ($settings as $key => $value) {
    echo "var $key = '$value';\n";
  }
   ?>
</script>
<div class="container">
  <div class="row">
      <?php //require_once("menu.php"); ?>
  </div>
  <div class="row">
    <div id="mainContent" class="col-lg-12">
      <?php require_once('indexBody.php'); ?>
    </div>
  </div>
</div>
</body>
<?php require_once('settingsModal.php');
      require_once('js.php'); ?>
</html>
