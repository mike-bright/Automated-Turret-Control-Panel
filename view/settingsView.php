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

		foreach($allSettings as $name => $value){
			if(array_key_exists($name, $this->formMappings)){
				switch ($this->formMappings[$name]) {
					case 'number':
						$input = "<input id='$name' name='$name' class='form-control' type='number' value='$value'>";
						break;
					case 'checkbox':
                  		$input = "<input id='$name' name='$name' class='form-control' type='checkbox'";
                  		$input .= ($value===1) ? "checked>" : ">";
						break;
					case 'select':
						$input = "<select id='$name' name='$name' class='form-control'>";
						if(array_key_exists($name, $this->numericConversions)){
							foreach ($this->numericConversions[$name] as $optionNumber => $optionName) {
								$input .= "<option value='$optionNumber' ";
								$input .= ($value == $optionNumber) ? "selected>" : ">";
								$input .= "$optionName</option>";
							}
						}

						$input .= "</select>";
						break;
					default:
						break;
				}
				$capName = ucwords($name);
             	echo "<div class='form-group list-group-item'>
						<label for='$name'>$capName:</label> 
						$input
					</div>
             	";
	      }
		}
	}
}