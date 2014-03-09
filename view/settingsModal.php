<div class="modal fade" id="settingsModal">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      <h4 class="modal-title"><i class="glyphicon glyphicon-wrench"></i> Settings</h4>
    </div>
    <div class="modal-body">
      <div class="panel panel-default">
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