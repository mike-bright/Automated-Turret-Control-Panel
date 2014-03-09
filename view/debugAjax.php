<div class="row">
  <div class="col-lg-10">
    <div class="page-header">
      <h1>Automated Turret<small>  Debug menu  </small></h1>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-md-7">
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Debug Menu</h3>
        </div>
        <div class="panel-body debugPanel">
          <div id="knobContainer" class="col-sm-4">
            <label>Rotation:</label>
            <input type="text" class="dial" data-min="0" data-max="180">
          </div>
          <div class="col-sm-3 spacer"></div>
          <div class="col-sm-5">
            <button class="btn btn-danger" id="shoot">Shoot</button>
            <button class="btn btn-success" id="refresh">Refresh</button><br><br>
            <label>Magazine capacity:</label>
            <div class="progress">
              <div id="magazineProgress" class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="<?php echo $settings['magazineSize']; ?>" aria-valuemin="0" aria-valuemax="<?php echo $settings['magazineSize']; ?>" style="width: 100%">
                <span><?php echo $settings['magazineSize']; ?></span>
              </div>
          </div>
          </div>
        </div>
      </div>
      </div>
      <div class="row">
        <div class="panel panel-default logPanel">
          <div class="panel-heading">Log:</div>
          <div class="panel-body">
            sentry ready...
          </div>
        </div>
      </div>
    </div>
  <div class="col-md-4 col-md-offset-1">
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-heading"><i class="glyphicon glyphicon-wrench"></i> Current Configuration
          <span class="pull-right"><a href="#"  data-toggle="modal" data-target="#settingsModal" class="btn btn-default">Edit</a></span>
        </div>
        <div class="list-group settingsContainer">
          <?php //settings echoed here by settingsview. ?>
        </div>
      </div>
    </div>
  </div>
</div>