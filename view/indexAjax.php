<div class="row">
  <div class="col-lg-10">
    <div class="page-header">
      <h1>Automated Turret<small>  Control Panel  </small></h1>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-md-5">
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-heading">Sensor Status</div>
        <div class="panel-body">
          Infrared:
          <table id="infraredArray">
          </table>
          <br>
          Motion:
          <table id="motionArray">
            <tbody>
              <tr>
                <td id="m1"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td id="m2"></td>
              </tr>
            </tbody>
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
          Magazine capacity:
          <div class="progress">
            <div id="magazineProgress" class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="20" style="width: 100%">
              <span></span>
            </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="panel panel-default logPanel" id="logPanel">
      <div class="panel-heading">Log: <span class="glyphicon glyphicon-chevron-down"></span></div>
      <div class="panel-body">
      </div>
    </div>
  </div>
</div>
<div class="col-md-6 col-md-offset-1">
  <div class="row">
    <div class="panel panel-default">
      <div class="panel-heading">
        Controls
        <button id="manualToggle" class="btn btn-warning">Manual</button>
        <button id="autoToggle" class="btn btn-success" style="display:none">Auto</button>
      </div>
      <div class="panel-body"> 
        <div id="autoControls" style="display:none"> 
          <div id="knobContainer2" class="col-sm-4" style="display:none">
            <label>Servo:</label>
            <input type="text" class="dialView" data-min="0" data-max="180">
          </div>
          <div class="clearfix"></div>
          <button id="startSweep" class="btn btn-danger" >Start Monitoring</button>
          <button href="#" id="stopSweep" class="btn btn-warning" >Stop Monitoring</button>
        </div>
        <div id="manualControls">
          <br>
          <div id="knobContainer" class="col-sm-4" style="display:none">
            <label>Servo:</label>
            <input type="text" class="dial" data-min="0" data-max="180">
          </div>
          <div class="clearfix"></div>
          <button class="btn btn-danger" id="shoot" >Shoot</button>
          
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="panel panel-default">
      <div class="panel-heading"><i class="glyphicon glyphicon-wrench"></i> Current Configuration
        <span class="pull-right"><a href="#"  data-toggle="modal" data-target="#settingsModal" class="btn btn-default" >Edit</a></span>
      </div>
      <div class="list-group settingsContainer">
        <?php //settings echoed here by settingsview. ?>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="connectingModal" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-body">
      <h1>Connecting to turret...</h1>
      <div class="progress progress-striped active">
        <div class="progress-bar"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
        </div>
      </div>
  </div>
</div>
    </div>
</div>