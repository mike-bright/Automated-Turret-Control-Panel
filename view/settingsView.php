<?php
class settingsView {

	public $skip = array('id');
	public $numericConversions = array(
		'mode' => array(
			'0' => 'nothing',
			'1' => 'Fire at will',
			'2' => 'Alarm',
			'3' => 'Fire at will with alarm'
			),
		'motionDetection' => array(
			'0' => 'no',
			'1' => 'yes'
			),
		'alarm' => array(
			'0' => 'no',
			'1' => 'yes'
			),
		);

	public $formMappings = array(
		'mode' => 'select',
		'magazineSize' => 'number',
		'sweepRange' => 'number',
		'motionDetection' => 'checkbox',
		'alarm' => 'checkbox',
		'autoBurst' => 'number',
		'manualBurst' => 'number',
		'pusherSetPoint' => 'number'
		);

	public function settingsDisplay($allSettings) {

		foreach($allSettings as $name => $value){
			if(!in_array($name, $this->skip)){
				if(array_key_exists($name, $this->numericConversions))
					$value = $this->numericConversions[$name][$value];
				$name = ucwords($name);
				echo "<a href='' class='list-group-item'>
			                  <b>$name:</b> <span class='pull-right'>$value</span>
			          </a>";
	      }
		}
	}

	public function settingsForm($allSettings) {
		$checkboxes = "";
		foreach($allSettings as $name => $value){
			if(array_key_exists($name, $this->formMappings)){
				$capName = ucwords($name);

				switch ($this->formMappings[$name]) {
					case 'number':
						echo "<div class='form-group'>
							  <label class='control-label'>$capName:</label>
							  <input id='$name' name='$name' class='form-control' type='number' value='$value'>
							  </div>";
						break;
					case 'checkbox':
                  		$checkboxes .= "<div class='form-group checkboxGroup'>
                  							<label class='control-label checkboxLabel'>$capName: </label>
          					       			<input id='$name' name='$name' class='js-switch' type='checkbox'";
                  		$checkboxes .= ($value===1) ? "checked>" : ">";
                  		$checkboxes .= "</div>";
						break;
					case 'select':
						$input = "<div class='form-group'><label class='control-label'>$capName:</label>
								  <select id='$name' name='$name' class='selectpicker show-tick'>";
						if(array_key_exists($name, $this->numericConversions)){
							foreach ($this->numericConversions[$name] as $optionNumber => $optionName) {
								$input .= "<option value='$optionNumber' ";
								$input .= ($value == $optionNumber) ? "selected>" : ">";
								$input .= "$optionName</option>";
							}
						}
						$input .= "</select></div>";
						echo $input;
						break;
					default:
						break;
				}
	      	}
		}
		echo $checkboxes;
	}
}