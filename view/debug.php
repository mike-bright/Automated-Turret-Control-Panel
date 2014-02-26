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
            <h1>Automated Turret<small>  Debug menu  </small></h1>
          </div>
        </div>
      </div>
    <div class="row">
      <div class="col-lg-10">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Debug Menu</h3>
          </div>
          <div class="panel-body debugPanel row">
            <div id="knobContainer" class="col-sm-4">
              <label>Rotation:</label>
              <input type="text" class="dial" data-min="0" data-max="180">
            </div>
            <div class="col-sm-4 spacer"></div>
            <div class="col-sm-4">
              <button class="btn btn-danger" id="shoot">Shoot</button>
              <button class="btn btn-success" id="refresh">Refresh</button><br><br>
              <label>Magazine capacity:</label>
              <div class="progress">
                <div id="magazineProgress" class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="12" style="width: 0%">
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="panel panel-default logPanel">
          <div class="panel-heading">Log:</div>
          <div class="panel-body">
            sentry ready...
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
</body>
<script src="/components/sass-bootstrap/dist/js/bootstrap.js"></script>
<script src="/js/jquery.knob.js"></script>
<script src="/js/app.js"></script>
<script src="/js/debug.js"></script>
</html>