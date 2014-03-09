<?php

class debugHandler {
	
	public function get() {
		include_once('models/settingsModel.php');
		$settingsModel = new settingsModel();
		$settings = $settingsModel->fetchAllSettings();
		include_once('view/debug.php');
	}

	public function post() {
		include_once('models/settingsModel.php');
		$settingsModel = new settingsModel();
		$settings = $settingsModel->fetchAllSettings();
		include_once('view/debugAjax.php');
	}
}