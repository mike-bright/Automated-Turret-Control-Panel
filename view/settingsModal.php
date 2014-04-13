<div class="modal fade" id="settingsModal">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      <h4 class="modal-title"><i class="glyphicon glyphicon-wrench"></i> Settings</h4>
    </div>
    <div class="modal-body" id="settingsBody">
      <div class="panel">
        <div class="list-group">
          <form action="/settings/update" id="settingsForm">
            <div href="" class="form-group">
              <label for="burst">Auto Burst:</label>
              <input id="burst" name="burst" class="form-control" type="number" value="2">
              <label for="burst">Man Burst:</label>
              <input id="burst" name="burst" class="form-control" type="number" value="2">
            </div>
            <div href="" class="form-group">
              <div class="half">
                <label for="motion1">Motion Sensor 1:</label>
                <input id="motion1" name="motion1" class="form-control switchery" type="checkbox">
              </div>
              <div class="half">
                <label for="motion2">Motion Sensor 2:</label>
                <input id="motion2" name="motion2" class="form-control switchery" type="checkbox">
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
