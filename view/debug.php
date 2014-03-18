<html xmlns="http://www.w3.org/1999/xhtml">
<?php require_once("head.php"); ?>
<body>
<script>
  var currentPage = "Debug";
  var ajax = false;
  var sweepRange = <?php echo $settings['sweepRange']; ?>
</script>
<div class="container">
  <div class="row">
    <div class="col-lg-2">
      <?php require_once("menu.php"); ?>
    </div>
    <div id="mainContent" class="col-lg-10">
      <?php require_once('debugAjax.php'); ?>
    </div>
</div>
<?php require_once('settingsModal.php'); ?>
</body>
<?php require_once('js.php'); ?>
<script data-no-instant>InstantClick.init();</script>
</html>
