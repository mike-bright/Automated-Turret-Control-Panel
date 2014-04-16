<div class="row">
  <div class="col-lg-10">
    <div class="page-header">
      <h1>Automated Turret<small>  Control Panel  </small></h1>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-md-6">
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-heading"><i class="glyphicon glyphicon-dashboard"></i> Sensor Status</div>
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
          <br>
          Magazine capacity:
          <br>
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
<div class="col-md-6">
  <div class="row">
    <div class="panel panel-default">
      <div class="panel-heading">
        Controls
        <button id="manualToggle" class="btn btn-warning">Manual</button>
        <button id="autoToggle" class="btn btn-success" style="display:none">Auto</button>
      </div>
      <div class="panel-body"> 
        <div id="autoControls" style="display:none"> 
          <div id="knobContainer2" class="col-sm-6" style="display:none">
            <label>Servo:</label>
            <input type="text" class="dialView" data-min="0" data-max="180">
          </div>
          <div class="col-sm-6">
            <button id="startMon" class="btn btn-danger" >Start Monitoring</button>
            <br><br>
            <button href="#" id="stopMon" class="btn btn-warning" >Stop Monitoring</button>
          </div>
        </div>
        <div id="manualControls">
          <br>
          <div id="knobContainer" class="col-sm-6" style="display:none">
            <label>Servo:</label>
            <input type="text" class="dial" data-min="0" data-max="180">
          </div>
          <div class="col-sm-6">
            <button class="btn btn-danger" id="shoot" >Shoot</button>
          </div>
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
        <a href='' class='list-group-item'>
          <b>Auto Burst:</b> <span class='pull-right autoburst'></span>
        </a>
        <a href='' class='list-group-item'>
          <b>Manual Burst:</b> <span class='pull-right manualburst'></span>
        </a>
        <a href='' class='list-group-item'>
          <b>VM Auto Duty:</b> <span class='pull-right vmautoduty'></span>
        </a>
        <a href='' class='list-group-item'>
          <b>VM Manual Duty:</b> <span class='pull-right vmmanduty'></span>
        </a>
        <a href='' class='list-group-item'>
          <b>PM Duty:</b> <span class='pull-right pmoutdutysp'></span>
        </a>
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