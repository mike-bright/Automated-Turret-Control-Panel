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
    <div class="col-lg-2">
      <?php require_once("menu.php"); ?>
    </div>
    <div id="mainContent" class="col-lg-10">
      <?php require_once('indexAjax.php'); ?>
    </div>
  </div>
</div>
</body>
<?php require_once('settingsModal.php');
      require_once('js.php'); ?>
</html>
