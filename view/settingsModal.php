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
              <label for="autoburst">Auto Burst:</label>
              <input id="autoburst" name="autoburst" class="form-control" type="number">
              <label for="manualburst">Manual Burst:</label>
              <input id="manualburst" name="manualburst" class="form-control" type="number">
              <label for="vmautoduty">VM Auto Duty:</label>
              <input id="vmautoduty" name="vmautoduty" class="form-control" type="number">
              <label for="vmmanduty">VM Manual Duty:</label>
              <input id="vmmanduty" name="vmmanduty" class="form-control" type="number">
            </div>
            <div href="" class="form-group">
              <label for="pmoutdutysp">PM Duty:</label>
              <input id="pmoutdutysp" name="pmoutdutysp" class="form-control" type="number">
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
