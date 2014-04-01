<div class="row">
  <div class="col-lg-10">
    <div class="page-header">
      <h1>Automated Turret<small>  Control Panel  </small></h1>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-md-7">
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-heading">Infrared Status</div>
        <div class="panel-body">
          <table class="infraredArray">
          </table>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-heading">
          <i class="glyphicon glyphicon-dashboard"></i> Turret Status
        </div>
        <div class="panel-body">
          Scanning status:
          <div class="progress">
            <div id="scanningProgress" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
              <span>0</span>%
            </div>
          </div>
          Magazine capacity:
          <div class="progress">
            <div id="magazineProgress" class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="<?php echo "4" ?>" aria-valuemin="0" aria-valuemax="<?php echo $settings['magazineSize']; ?>" style="width: 100%">
              <span><?php echo $settings['magazineSize']; ?></span>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="col-md-4 col-md-offset-1">
  <div class="row">
    <div class="panel panel-default">
      <div class="panel-heading">Controls</div>
      <div class="panel-body">
        <button id="startSweep" class="btn btn-danger" data-no-instant>Start Sweep</button>
        <button href="#" id="stopSweep" class="btn btn-warning" data-no-instant>Stop Sweep</button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="panel panel-default">
      <div class="panel-heading"><i class="glyphicon glyphicon-wrench"></i> Current Configuration
        <span class="pull-right"><a href="#"  data-toggle="modal" data-target="#settingsModal" class="btn btn-default" data-no-instant>Edit</a></span>
      </div>
      <div class="list-group settingsContainer">
        <?php //settings echoed here by settingsview. ?>
      </div>
    </div>
  </div>
</div>