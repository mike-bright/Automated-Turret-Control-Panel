<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Automated Turret</title>
  <link rel="icon" href="images/gun.gif" type="image/gif">
  <link href="/css/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
  <link href="/css/print.css" media="print" rel="stylesheet" type="text/css" />
  <!--[if IE]>
      <link href="/css/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
  <![endif]-->
  <link rel="stylesheet" href="/css/app.css">
  <script src="/components/jquery/jquery.js"></script>
</head>
<body>

<div class="container">
  <div class="row">
    <div class="col-lg-2">
      <?php require_once("menu.php"); ?>
    </div>
    <div class="col-lg-10">
      <div class="row">
        <div class="col-lg-10">
          <div class="page-header">
            <h1>Automated Turret<small>  Control Panel  </small></h1>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
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
                <div id="magazineProgress" class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="12" aria-valuemin="0" aria-valuemax="12" style="width: 100%">
                  <span>12</span>
                </div>
              </div>
            </div>
          </div> 
        </div>
        <div class="col-lg-6">
          <div class="panel panel-default">
            <div class="panel-heading">Infrared Status</div>
            <div class="panel-body">
              <table class="infraredArray">
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <div class="panel panel-default">
            <div class="panel-heading">Controls</div>
            <div class="panel-body">
              <button id="startSweep" class="btn btn-danger">Start Sweep</button>
              <button href="#" id="stopSweep" class="btn btn-warning">Stop Sweep</button>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
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
  </div>
</div>
<div class="modal fade" id="settingsModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title"><i class="glyphicon glyphicon-wrench"></i> Settings</h4>
      </div>
      <div class="modal-body">
        <div class="panel panel-default">
          <!-- <div class="panel-heading"><i class="glyphicon glyphicon-wrench"></i> Settings</div> -->
          <div class="list-group">
            <form action="/settings/update" id="settingsForm">
              <div href="" class="form-group list-group-item">
                <label for="mode">Mode:</label> 
                <select id="mode" name="mode" class="form-control">
                  <option value="nothing">Do nothing</option>
                  <option value="fire" selected>Fire at will</option>
                  <option value="alarm">Alarm</option>
                  <option value="firealarm">Fire at will w/ alarm</option>
                </select>
              </div>
              <div href="" class="form-group list-group-item">
                <label for="magazineSize">Magazine size:</label> 
                <input id="magazineSize" name="magazineSize" class="form-control" type="number" value="16">
              </div>
              <div href="" class="form-group list-group-item">
                <label for="sweepRange">Sweep Range:</label> 
                <input id="sweepRange" name="sweepRange" class="form-control" type="number" value="180">
              </div>
              <div href="" class="form-group list-group-item">
                <div class="half">
                  <label for="motionDetection">Motion Detection:</label> 
                  <input id="motionDetection" name="motionDetection" class="form-control" type="checkbox">
                </div>
                <div class="half">
                  <label for="alarm">Alarm:</label> 
                  <input id="alarm" name="alarm" class="form-control" type="checkbox">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick="updateSettings()">Save changes</button>
      </div>
    </div>
  </div>
</div>
</body>
<script src="/components/sass-bootstrap/dist/js/bootstrap.js"></script>
<script src="/js/app.js"></script>
</html>