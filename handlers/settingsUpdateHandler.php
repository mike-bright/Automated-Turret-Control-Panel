<?php
class SettingsUpdateHandler{

	function __construct(){
		include_once('models/settingsModel.php');
	}
	function post(){
		include_once('models/settingsModel.php');
		$settings = new settingsModel();
		$settings->updateSettings($_POST);
	}
}