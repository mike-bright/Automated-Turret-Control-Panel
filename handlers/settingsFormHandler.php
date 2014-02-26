<?php

class settingsFormHandler {

	public function post(){
		include_once('models/settingsModel.php');
		include_once('view/settingsView.php');
		$settings = new settingsModel();
		$allSettings = $settings->fetchAllSettings();
		$view = new settingsView();
		$view->settingsForm($allSettings);
	}	
}